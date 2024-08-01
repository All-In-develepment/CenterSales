import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { Form, Grid } from "semantic-ui-react";
import { ProjectWeight } from "../../../app/models/projectWeight";
import { useStore } from "../../../app/stores/store";
import WeightSPT from "./Weight/WeightSPT";
import { SalePerformanceTeam } from "../../../app/models/salePerformanceTeam";

export interface IWeightedData {
  projectName: string;
  month: string;
  salesValueWeight: number;
  conversionWeight: number;
  registrationWeight: number;
  depositWeight: number;
}

export default observer(function RankSPTDashBoard() {
  const [initialDate, setInitalDate] = useState<Date | null>(null);
  const [finalDate, setFinalDate] = useState<Date | null>(null);
  const [currentRank, setCurrentRank] = useState<string>("");
  const [selectedWeight, setSelectedWeight] = useState<string>("");

  const { projectWeightStore, salePerformanceTeamStore } = useStore();
  const { loadProjectWeights, allProjectWeights } = projectWeightStore;
  const { loadSalePerformanceTeams, allSalePerformanceTeams } =
    salePerformanceTeamStore;

  const handleChangeInitalaDate = (date: Date | null) => {
    setInitalDate(date);
  };
  const handleChangeFinalDate = (date: Date | null) => {
    setFinalDate(date);
  };

  const handleChangeRank = (rank: string) => {
    setCurrentRank(rank);
    setSelectedWeight(rank);
  };

  const requestSPT = async (startDate: string, finaleDate: string) => {
    await loadSalePerformanceTeams(startDate, finaleDate);
  };

  useEffect(() => {
    loadProjectWeights();
  }, [loadProjectWeights]);

  useEffect(() => {
    if (initialDate && finalDate) {
      const startDate = initialDate.toISOString();
      const finaleDate = finalDate.toISOString();
      requestSPT(startDate, finaleDate);
    }
  }, [initialDate, finalDate]);

  const months = allProjectWeights.reduce((uniqueMonths: string[], project) => {
    const month = project.month.slice(0, 7);
    if (!uniqueMonths.includes(month)) {
      uniqueMonths.push(month);
    }
    return uniqueMonths;
  }, []);

  const aggregatedData = allSalePerformanceTeams.reduce(
    (acc: SalePerformanceTeam[], current) => {
      const {
        sptSellerName,
        sptTotalSales,
        sptavgConvertion,
        sptTotalRegister,
        sptTotalRedeposit,
      } = current;

      const existing = acc.find((item) => item.sptSellerName === sptSellerName);

      if (existing) {
        existing.sptTotalSales += sptTotalSales;
        existing.sptavgConvertion += sptavgConvertion;
        existing.sptTotalRegister += sptTotalRegister;
        existing.sptTotalRedeposit += sptTotalRedeposit;
      } else {
        acc.push({ ...current });
      }

      return acc;
    },
    []
  );

  const projectWeightsMap: { [key: string]: ProjectWeight } =
    allProjectWeights.reduce(
      (map: { [key: string]: ProjectWeight }, project: ProjectWeight) => {
        map[project.projectId] = project;
        return map;
      },
      {}
    );

  const weightedData: IWeightedData[] = aggregatedData
    .filter((team) => {
      const projectWeight = projectWeightsMap[team.sptProjectId];
      return (
        projectWeight && projectWeight.month.slice(0, 7) === selectedWeight
      );
    })
    .map((team) => {
      const projectWeight = projectWeightsMap[team.sptProjectId];
      return {
        projectName: team.sptSellerName,
        month: projectWeight.month,
        salesValueWeight: team.sptTotalSales * projectWeight.salesValueWeight,
        conversionWeight:
          team.sptavgConvertion * projectWeight.conversionWeight,
        registrationWeight:
          team.sptTotalRegister * projectWeight.registrationWeight,
        depositWeight: team.sptTotalRedeposit * projectWeight.depositWeight,
      };
    });

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width="5">
            <Form>
              <Form.Field>
                <label>Data Inicial</label>
                <DatePicker
                  selected={initialDate}
                  onChange={(date: Date | null) =>
                    handleChangeInitalaDate(date)
                  }
                  dateFormat="dd/MM/yyyy"
                />
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column width="5">
            <Form>
              <Form.Field>
                <label>Data Final</label>
                <DatePicker
                  selected={finalDate}
                  onChange={(date: Date | null) => handleChangeFinalDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column width="6">
            <Form>
              <Form.Field>
                <label>Pesos</label>
                <select
                  value={currentRank}
                  onChange={(e) => handleChangeRank(e.target.value)}
                >
                  <option value="" disabled>
                    Escolha o peso
                  </option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Row>
          <Grid.Column width="10">
            <h1>Rank por PESOS</h1>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Column width="16">
          {/* {currentRank == "RankByConversion" ? (
            <RankSPTByConvertion
              initialDate={initialDate}
              finalDate={finalDate}
            />
          ) : currentRank == "RankByDeposit" ? (
            <RankSPTByDeposit initialDate={initialDate} finalDate={finalDate} />
          ) : (
            <RankSPTByTotalSales
              initialDate={initialDate}
              finalDate={finalDate}
            />
          )} */}
          {weightedData.map((weight, index) => (
            <WeightSPT weight={weight} key={index++} />
          ))}
        </Grid.Column>
      </Grid>
    </>
  );
});
