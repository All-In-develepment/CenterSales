import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import DatePicker from 'react-datepicker';
import { format } from 'date-fns'; // Importe a função format
import { Grid } from "semantic-ui-react";
import RankSPTByConvertion from "./Conversion/RankSPTByConvertion";
import RankSPTByDeposit from "./Depoist/RankSPTByDeposit";
import RankSPTByTotalSales from "./Sales/RankSPTByTotalSales";

export default observer(function RankSPTDashBoard() {
  const [initialDate, setInitalDate] = useState<Date | null>();
  const [finalDate, setFinalDate] = useState<Date>();
  const [currentRank, setCurrentRank] = useState<string>('RankByProject');

  // Trate a mudança de data
  const handleChangeInitalaDate = (initialDate: Date) => {
    console.log(format(initialDate, 'yyyy/MM/dd\'T\'00:00:00'));
    setInitalDate(initialDate);
  }
  const handleChangeFinalDate = (finalDate: Date) => {
    console.log(format(finalDate, 'yyyy/MM/dd\'T\'23:59:59'));
    setFinalDate(finalDate);
  }

  const handleChangeRank = (rank: string) => {
    console.log(rank)
    setCurrentRank(rank);
  }

  useEffect(() => {
    handleChangeInitalaDate;
  }, [initialDate, finalDate]);

  useEffect(() => {
    handleChangeRank;
  }, [currentRank]);

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width='5'>
            <p>
              Data Inicial
              <DatePicker
                selected={initialDate} // Use o estado para controlar a data selecionada
                onChange={(date: Date) => handleChangeInitalaDate(date)} // Atualize o estado quando a data for alterada
                dateFormat="dd/MM/yyyy" // Formato da data exibida
              />
            </p>
          </Grid.Column>
          <Grid.Column width='5'>
            <p>
              Data Final
              <DatePicker
              selected={finalDate} // Use o estado para controlar a data selecionada
              onChange={(date: Date) => handleChangeFinalDate(date)} // Atualize o estado quando a data for alterada
              dateFormat="dd/MM/yyyy" // Formato da data exibida
            />
            </p>
          </Grid.Column>
          <Grid.Column width='6'>
            <p>
              Rank
              <select
                value={currentRank}
                onChange={(e) => handleChangeRank(e.target.value)}
              >
                <option value="RankByDeposit">Rank por Deposito</option>
                <option value="RankByConversion">Rank por conversão</option>
                <option value="RankBySales">Rank por Vendas</option>
              </select>
            </p>
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