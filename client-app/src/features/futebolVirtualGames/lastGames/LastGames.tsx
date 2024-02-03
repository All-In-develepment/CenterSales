import { useEffect, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { ILastGames, Match } from "../../../app/models/lastGames";
import moment from "moment-timezone";
import { Grid, GridColumn, GridRow, Table } from "semantic-ui-react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TableBody, TableCell, TableRow } from "@mui/material";

export default observer(function LastGames() {
  type AccordionData = {
    title: string;
    content: string;
  };

  type AccordionProps = {
    data: AccordionData[]; // Um array de objetos com título e conteúdo
  };
  
  const { LastGames } = useStore();
  const { loadLastGames } = LastGames;

  const [data, setData] = useState<ILastGames[]>();

  let lastGameEuroCup: Match[];
  let lastGameSulAmericana: Match[];
  let lastGamePremier: Match[];
  let lastGameWorldCup: Match[];

  async function handleEffect() {
    const date = moment().format("YYYY-MM-DD");

    const lastGamesData = await loadLastGames(date);

    lastGamesData ? setData(lastGamesData) : console.log("ihh rapaz");
    if (lastGamesData?.length) {
      lastGameWorldCup = lastGamesData[0].matches.slice(0, 20); 
      lastGameEuroCup = lastGamesData[1].matches.slice(0, 20); 
      lastGameSulAmericana = lastGamesData[2].matches.slice(0, 20); 
      lastGamePremier = lastGamesData[3].matches.slice(0, 20); 
    }
    if (lastGamesData?.length) {
      const test: ILastGames[] = lastGamesData.map((games) => ({
        ...games,
        matches: games.matches.slice(0, 20),
      }));
      console.log(test);
      setData(test);
    } else {
      console.log("ihh rapaz");
    }
  }


  useEffect(
    () => {
      handleEffect();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  let larguraDaTela = window.innerWidth;

  return (
    <>
      <Grid textAlign="center">
        <GridRow columns={larguraDaTela > 980 ? 4 : 1}>
          {data &&
            data.map((game) => (
              <GridColumn key={game.id}>
                <Accordion>

                  <AccordionSummary className="table_detail_header"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                  >
                    {game.competition}
                  </AccordionSummary>

                  <AccordionDetails className="tablesMax">
                    <Table>
                      <TableBody className="tablesMax">
                        {game.matches.map((match, index) => (

                          <TableRow key={index} className="table_detail_body">

                            <TableCell align="center">
                              <GridRow width={16} textAlign="center">
                                <img src={`/assets/flags/${match.homeImg}`} alt={match.homeImg} width={60}/>
                              </GridRow>
                              <GridRow width={16} textAlign="center">
                                {match.teamHome}
                              </GridRow>
                            </TableCell>

                            <TableCell align="center">
                              {match.finalTimeResult}
                            </TableCell>

                            <TableCell align="center">
                              <GridRow width={16} textAlign="center">
                                <img src={`/assets/flags/${match.awayImg}`} alt={match.awayImg} width={60}/>
                              </GridRow>
                              <GridRow width={16} textAlign="center">
                                {match.teamAway}
                              </GridRow>
                            </TableCell>
                            
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </AccordionDetails>
                </Accordion>
              </GridColumn>
            ))
          }
        </GridRow>
      </Grid>
    </>
  );
});
