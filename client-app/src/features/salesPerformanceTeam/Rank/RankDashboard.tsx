import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import { Form, Grid } from "semantic-ui-react";
import RankSPTByConvertion from "./Conversion/RankSPTByConvertion";
import RankSPTByDeposit from "./Depoist/RankSPTByDeposit";
import RankSPTByTotalSales from "./Sales/RankSPTByTotalSales";

export default observer(function RankSPTDashBoard() {
  const [initialDate, setInitalDate] = useState<Date | null>();
  const [finalDate, setFinalDate] = useState<Date | null>();
  const [currentRank, setCurrentRank] = useState<string>('RankByProject');

  // Trate a mudança de data
  const handleChangeInitalaDate = (initialDate: Date) => {
    setInitalDate(initialDate);
  }
  const handleChangeFinalDate = (finalDate: Date) => {
    setFinalDate(finalDate);
  }

  const handleChangeRank = (rank: string) => {
    console.log(rank)
    setCurrentRank(rank);
  }

  useEffect(() => {
    handleChangeInitalaDate;
  }, [initialDate]);

  useEffect(() => {
    handleChangeFinalDate;
  }, [finalDate]);

  useEffect(() => {
    handleChangeRank;
  }, [currentRank]);

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width='5'>
            <Form>
              <Form.Field>
                <label>Data Inicial</label>
                <DatePicker
                  selected={initialDate} // Use o estado para controlar a data selecionada
                  onChange={(date: Date) => handleChangeInitalaDate(date)} // Atualize o estado quando a data for alterada
                  dateFormat="dd/MM/yyyy" // Formato da data exibida
                />
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column width='5'>
            <Form>
              <Form.Field>
                <label>Data Final</label>
                <DatePicker
                selected={finalDate} // Use o estado para controlar a data selecionada
                onChange={(date: Date) => handleChangeFinalDate(date)} // Atualize o estado quando a data for alterada
                dateFormat="dd/MM/yyyy" // Formato da data exibida
              />
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column width='6'>
            <Form>
              <Form.Field>
                <label>Rank</label>
                <select
                  value={currentRank}
                  onChange={(e) => handleChangeRank(e.target.value)}
                >
                  <option value="RankByDeposit">Rank por Deposito</option>
                  <option value="RankByConversion">Rank por conversão</option>
                  <option value="RankBySales">Rank por Vendas</option>
                </select>
              </Form.Field>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Column width='16'>
          {
            currentRank == 'RankByConversion' ?
              <RankSPTByConvertion 
                initialDate={initialDate}
                finalDate={finalDate}
              /> : currentRank == 'RankByDeposit' ?
                <RankSPTByDeposit 
                  initialDate={initialDate}
                  finalDate={finalDate}
                /> :
                <RankSPTByTotalSales 
                  initialDate={initialDate}
                  finalDate={finalDate}
                />
          }
        </Grid.Column>
      </Grid>
    </>
  );
});