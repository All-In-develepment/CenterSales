import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { GameTimes } from "../../../app/models/gameTimes";

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import {Grid, TableRow} from '@mui/material';
import { styled } from '@mui/material/styles';
import GridRow from "semantic-ui-react/dist/commonjs/collections/Grid/GridRow";
import { Grid as GridSemantic } from "semantic-ui-react";
import { GridColumn, Tab } from "semantic-ui-react";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


export default observer(function TimesDashboard() {
  var keyLine = 0;
  var keyCell = 0;
  const { FutebolVirtualStore } = useStore();
  const { loadFutebolVirtualGames } = FutebolVirtualStore;

  const [selectedHours, setSelectedHours] = useState("12");
  const [selectedMarket, setSelectedMarket] = useState("GOLSPAR");
  const [selectedTournament, setSelectedTournament] = useState("20700663");
  const [games, setGames] = useState<GameTimes>();

  async function handleTournamentButtonClick() {
    const gamesData = await loadFutebolVirtualGames(
      selectedTournament,
      selectedMarket,
      selectedHours
    );
    gamesData ? setGames(gamesData) : console.log("ihh rapaz");
  }

  const handleChangeTime = (event: SelectChangeEvent) => {
    setSelectedHours(event.target.value);
  };

  const handleChangeMarket = (event: SelectChangeEvent) => {
    setSelectedMarket(event.target.value);
  };

  useEffect(
    () => {
      handleTournamentButtonClick();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedTournament, selectedMarket, selectedHours]
  );

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <Grid container spacing={1} className="gridLigas">
        <Grid md={3} onClick={() => setSelectedTournament("20700663")} className="bannerEuroCopa">
          <img src="/assets/banners/euro_cup.jpg" alt="Euro Cup" className="leagues_buton" /> 
        </Grid>

        <Grid md={3} onClick={() => setSelectedTournament("20120650")} className="bannerCopaDoMundo">
          <img src="/assets/banners/copa_do_mundo.jpg" alt="Copa do Mundo" className="leagues_buton" />
        </Grid>

        <Grid md={3} onClick={() => setSelectedTournament("20120653")} className="bannerPremierShip">
          <img src="/assets/banners/premiership.jpg" alt="Premier League" className="leagues_buton" />
        </Grid>

        <Grid md={3} onClick={() => setSelectedTournament("20849528")} className="bannerSuperLeague">
          <img src="/assets/banners/superleague.jpg" alt="Sul-Americana" className="leagues_buton" />
        </Grid>
      </Grid>


      <GridSemantic>
        <GridRow columns={2}>
          <GridColumn md={8} sm={8}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="time-analyzer">Tempo de Analise</InputLabel>
                <Select
                  labelId="time-analyzer"
                  id="time-analyzer"
                  value={selectedHours}
                  label="Tempo de Analise"
                  onChange={handleChangeTime}
                  className="selectTempo"
                >
                  <MenuItem value={3}>3 horas</MenuItem>
                  <MenuItem value={6}>6 horas</MenuItem>
                  <MenuItem value={9}>9 horas</MenuItem>
                  <MenuItem value={12}>12 horas</MenuItem>
                  <MenuItem value={24}>24 horas</MenuItem>
                  <MenuItem value={72}>72 horas</MenuItem>
                  <MenuItem value={96}>96 horas</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </GridColumn>

          <GridColumn md={8}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="market-analyzer">Mercado</InputLabel>
                <Select
                  labelId="market-analyzer"
                  id="market-analyzer"
                  value={selectedMarket}
                  label="Mercado"
                  onChange={handleChangeMarket}
                >
                  <MenuItem value={"GOLSPAR"}>GOLS PAR</MenuItem>
                  <MenuItem value={"GOLSIMPAR"}>GOLS IMPAR</MenuItem>
                  <MenuItem value={"OVER05"}>OVER 0,5</MenuItem>
                  <MenuItem value={"OVER15"}>OVER 1,5</MenuItem>
                  <MenuItem value={"OVER25"}>OVER 2,5</MenuItem>
                  <MenuItem value={"OVER35"}>OVER 3,5</MenuItem>
                  <MenuItem value={"UNDER05"}>UNDER 0,5</MenuItem>
                  <MenuItem value={"UNDER15"}>UNDER 1,5</MenuItem>
                  <MenuItem value={"UNDER25"}>UNDER 2,5</MenuItem>
                  <MenuItem value={"UNDER35"}>UNDER 3,5</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </GridColumn>
        </GridRow>
      </GridSemantic>
      <br />


      <Paper sx={{width: '100%', overflow: 'hidden'}}>
        <TableContainer sx={{ maxHeight: 700}}>
          

            {games && FutebolVirtualStore.loadingInitial === false ? (
            <Table stickyHeader aria-label="sticky tabel" className="tableHorarios">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  {games.minutes.map((minute) => {
                    return (
                      <TableCell className="table_header cellHorario" key={keyLine++} align="center">
                        {minute.number} min 
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              {games.lines.map((line) => {
                return (
                  <TableBody>
                    <TableCell className="coluna_esquerda" key={keyLine++}>{line.hora}</TableCell>
                    {line.cells.map((cell) => {
                      return (
                        <TableCell                    
                          key={keyCell++}
                          className={
                            
                            cell.isGreen === true
                              ? "green cellHorario"
                              : cell.tooltip !== null
                              ? "red cellHorario"
                              : "gray cellHorario"
                          }
                          //textAlign="center"
                          //size="large"
                        >
                          {cell.result}
                        </TableCell>
                      );
                    })}
                  </TableBody>
                );
              })}
            </Table>
          ) : (
            <></>
          )}

          

        </TableContainer>

      </Paper>

      

      
    </>
  );
});
