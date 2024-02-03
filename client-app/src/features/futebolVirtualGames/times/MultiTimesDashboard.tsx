import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import {
  Grid,
  GridColumn,
  GridRow,
  Label,
  TableBody,
  TableHeader,
  TableHeaderCell,
} from "semantic-ui-react";
import {
  GameTimes,
  LoadGamesResult,
  TournamentNames,
} from "../../../app/models/gameTimes";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Paper, TableContainer, TableHead, TableRow, TableCell, Table} from "@mui/material";

export default observer(function MultiTimesDashboard() {
  var keyLine = 0;
  var keyCell = 0;
  const { FutebolVirtualStore } = useStore();
  const { loadFutebolVirtualGames } = FutebolVirtualStore;

  const [selectedHours, setSelectedHours] = useState("12");
  const [selectedMarket, setSelectedMarket] = useState("GOLSPAR");

  const initialGamesData: Record<keyof TournamentNames, GameTimes | undefined> =
    {
      "Euro Cup": undefined,
      "Copa do Mundo": undefined,
      "Premier League": undefined,
      "Sul-Americana": undefined,
    };

  const [games, setGames] =
    useState<Record<keyof TournamentNames, GameTimes | undefined>>(
      initialGamesData
    );

  const tournamentNames: TournamentNames = {
    "Euro Cup": "20700663",
    "Copa do Mundo": "20120650",
    "Premier League": "20120653",
    "Sul-Americana": "20849528",
  };

  const loadGamesForTournament = async (
    tournament: string,
    market: string,
    hours: string
  ) => {
    return await loadFutebolVirtualGames(tournament, market, hours);
  };

  async function handleTournamentButtonClick() {
    const gamesData = await loadAllGames();

    gamesData ? setGames(gamesData) : console.log("ihh rapaz");
  }

  const loadAllGames = async () => {
    try {
      const promises = Object.entries(tournamentNames).map(
        ([name, tournament]) =>
          loadGamesForTournament(tournament, selectedMarket, selectedHours)
            .then((result) => ({ name, result } as LoadGamesResult))
            .catch((error) => {
              console.error(
                `Erro ao carregar jogos para o torneio ${name}:`,
                error
              );
              return { name, error } as LoadGamesResult;
            })
      );

      const results = await Promise.allSettled(promises);

      const consolidatedGamesData: Record<
        keyof TournamentNames,
        GameTimes | undefined
      > = results.reduce((acc, result) => {
        if (result.status === "fulfilled" && result.value.result) {
          const { name, result: games } = result.value;
          acc[name] = games;
        } else if (result.status === "rejected") {
          const { name, error } = result.reason;
          console.error(
            `Erro ao carregar jogos para o torneio ${name}:`,
            error
          );
        }
        return acc;
      }, {} as Record<keyof TournamentNames, GameTimes | undefined>);

      return consolidatedGamesData;
    } catch (error) {
      console.error("Erro ao carregar jogos:", error);
    }
  };

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
    [selectedMarket, selectedHours]
  );

  return (
    <>
      <Grid>
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
      </Grid>

      <Grid>
        {Object.entries(games).map(([tournament, gameData]) => (
          <GridRow>
            <GridColumn md={8} sm={16}>
              <h2 className="titulo-mercado">{tournament}</h2>
              {gameData && FutebolVirtualStore.loadingInitial === false ? (
                <TableContainer component={Paper}>
                  <Table key={tournament} stickyHeader aria-label="sticky tabel" className="tableHorarios">
                    <TableHead>
                      <TableRow>
                        <TableCell></TableCell>
                        {gameData.minutes.map((minute) => (
                          <TableCell key={keyLine++}>
                            {minute.number}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    {gameData.lines.map((line) => (
                      <TableBody key={keyLine++}>
                        <TableRow>
                          <TableCell className="coluna_esquerda" key={keyLine++}>{line.hora}</TableCell>
                          {line.cells.map((cell) => (
                            <TableCell
                              key={keyCell++}
                              className={
                                cell.isGreen === true
                                  ? "green cellHorario"
                                  : cell.tooltip !== null
                                  ? "red cellHorario"
                                  : "gray cellHorario"
                              } align="center"
                            >
                              {cell.result}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    ))}
                  </Table>
                </TableContainer>
              ) : (
                <></>
              )}
            </GridColumn>
          </GridRow>
        ))}
      </Grid>
    </>
  );
});
