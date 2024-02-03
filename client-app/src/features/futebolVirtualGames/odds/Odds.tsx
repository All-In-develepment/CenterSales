import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { IOdd } from "../../../app/models/odds";
import { Grid, Tab, Table, TableHeader } from "semantic-ui-react";

export default observer(function Odds({ leagueId }: { leagueId: string }) {
  const { Odds } = useStore();
  const { loadOdds } = Odds;

  const [selectedLeague, setSelectedLeague] = useState<IOdd>();

  async function handleEffect(leagueId: string) {
    const odds = await loadOdds(leagueId);

    odds ? setSelectedLeague(odds) : console.log("ihh rapaz");
  }

  useEffect(
    () => {
      handleEffect(leagueId);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      {selectedLeague && 
        <Grid columns={1} textAlign="center" size={16}>
          <Grid.Row>
            {selectedLeague.teamHome} x {selectedLeague.teamAway}
          </Grid.Row>
          <Grid.Row>
            <Table>
              <TableHeader>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.HeaderCell colSpan="6">TIME VENCEDOR</Table.HeaderCell>
                </Table.Row>
              </TableHeader>
              <Table.Body>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.Cell>{selectedLeague.teamHome}</Table.Cell>
                  <Table.Cell>{selectedLeague.partidaVencedor_Casa}</Table.Cell>
                  <Table.Cell>Empate</Table.Cell>
                  <Table.Cell>{selectedLeague.partidaVencedor_Empate}</Table.Cell>
                  <Table.Cell>{selectedLeague.teamAway}</Table.Cell>
                  <Table.Cell>{selectedLeague.partidaVencedor_Casa}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Table>
              <TableHeader>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.HeaderCell colSpan="6">DUPLA HIPOSTE</Table.HeaderCell>
                </Table.Row>
              </TableHeader>
              <Table.Body>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.Cell>{selectedLeague.teamHome} ou Empate</Table.Cell>
                  <Table.Cell>{selectedLeague.duplaHipotese_CasaOuEmpate}</Table.Cell>
                  <Table.Cell>Empate ou {selectedLeague.teamAway}</Table.Cell>
                  <Table.Cell>{selectedLeague.duplaHipotese_EmpateOuVisitante}</Table.Cell>
                  <Table.Cell>{selectedLeague.teamHome} ou {selectedLeague.teamAway}</Table.Cell>
                  <Table.Cell>{selectedLeague.duplaHipotese_CasaOuVisitante}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Table>
              <TableHeader>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.HeaderCell colSpan="6">Resultado Correto</Table.HeaderCell>
                </Table.Row>
              </TableHeader>
              <Table.Body>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.Cell colSpan="2">{selectedLeague.teamHome}</Table.Cell>
                  <Table.Cell colSpan="2">Empate</Table.Cell>
                  <Table.Cell colSpan="2">{selectedLeague.teamAway}</Table.Cell>
                </Table.Row>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.Cell>1x0</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorreto_Casa_1x0}</Table.Cell>
                  <Table.Cell>0x0</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorreto_Empate_0x0}</Table.Cell>
                  <Table.Cell>0x1</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorreto_Visitante_1x0}</Table.Cell>
                </Table.Row>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.Cell>2x0</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorreto_Casa_2x0}</Table.Cell>
                  <Table.Cell>1x1</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorreto_Empate_1x1}</Table.Cell>
                  <Table.Cell>0x2</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorreto_Visitante_2x0}</Table.Cell>
                </Table.Row>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.Cell>2x1</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorreto_Casa_2x1}</Table.Cell>
                  <Table.Cell>2x2</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorreto_Empate_2x2}</Table.Cell>
                  <Table.Cell>1x2</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorreto_Visitante_2x1}</Table.Cell>
                </Table.Row>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.Cell>3x0</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorreto_Casa_3x0}</Table.Cell>
                  <Table.Cell>Qualquer outro</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorreto_Empate_QualquerOutro}</Table.Cell>
                  <Table.Cell>0x3</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorreto_Visitante_3x0}</Table.Cell>
                </Table.Row>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.Cell>3x1</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorreto_Casa_3x1}</Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell>1x3</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorreto_Visitante_3x1}</Table.Cell>
                </Table.Row>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.Cell>4x0</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorreto_Casa_4x0}</Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell>0x4</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorreto_Visitante_4x0}</Table.Cell>
                </Table.Row>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.Cell>Qualquer outro</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorreto_Casa_QualquerOutro}</Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell></Table.Cell>
                  <Table.Cell>Qualquer outro</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorreto_Visitante_QualquerOutro}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Table>
              <TableHeader>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.HeaderCell colSpan="6">Resultado Correto - Grupo</Table.HeaderCell>
                </Table.Row>
              </TableHeader>
              <Table.Body>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.Cell>{selectedLeague.teamHome} 1-0, 2-0, 2-1</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorretoGrupo_Casa_1x0_2x0_2x1}</Table.Cell>
                  <Table.Cell>{selectedLeague.teamHome} 3-0, 3-1, 4-0</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorretoGrupo_Casa_3x0_3x1_4x0}</Table.Cell>
                  <Table.Cell>{selectedLeague.teamAway} 1-0, 2-0, 2-1</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorretoGrupo_Visitante_1x0_2x0_2x1}</Table.Cell>
                </Table.Row>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.Cell>{selectedLeague.teamAway} 3-0, 3-1, 4-0</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorretoGrupo_Visitante_3x0_3x1_4x0}</Table.Cell>
                  <Table.Cell>Empate com Gols</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorretoGrupo_EmpateComGols}</Table.Cell>
                  <Table.Cell>Qualquer Outro Resultado</Table.Cell>
                  <Table.Cell>{selectedLeague.resultadoCorretoGrupo_QualquerOutroResultado}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            <Table>
              <TableHeader>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.HeaderCell colSpan="6">Intervalo / Final Do Jogo</Table.HeaderCell>
                </Table.Row>
              </TableHeader>
              <Table.Body>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.Cell>{selectedLeague.teamHome} - {selectedLeague.teamHome}</Table.Cell>
                  <Table.Cell>{selectedLeague.intervaloFinalJogo_CasaCasa}</Table.Cell>
                  <Table.Cell>{selectedLeague.teamHome} - Empate</Table.Cell>
                  <Table.Cell>{selectedLeague.intervaloFinalJogo_CasaEmpate}</Table.Cell>
                  <Table.Cell>{selectedLeague.teamHome} - {selectedLeague.teamAway}</Table.Cell>
                  <Table.Cell>{selectedLeague.intervaloFinalJogo_CasaVisitante}</Table.Cell>
                </Table.Row>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.Cell>Empate - {selectedLeague.teamHome}</Table.Cell>
                  <Table.Cell>{selectedLeague.intervaloFinalJogo_EmpateCasa}</Table.Cell>
                  <Table.Cell>Empate - Empate</Table.Cell>
                  <Table.Cell>{selectedLeague.intervaloFinalJogo_EmpateEmpate}</Table.Cell>
                  <Table.Cell>Empate - {selectedLeague.teamAway}</Table.Cell>
                  <Table.Cell>{selectedLeague.intervaloFinalJogo_EmpateVisitante}</Table.Cell>
                </Table.Row>
                <Table.Row textAlign="center" className="table_exact_score_row">
                  <Table.Cell>{selectedLeague.teamAway} - {selectedLeague.teamHome}</Table.Cell>
                  <Table.Cell>{selectedLeague.intervaloFinalJogo_VisitanteCasa}</Table.Cell>
                  <Table.Cell>{selectedLeague.teamAway} - Empate</Table.Cell>
                  <Table.Cell>{selectedLeague.intervaloFinalJogo_VisitanteEmpate}</Table.Cell>
                  <Table.Cell>{selectedLeague.teamAway} - {selectedLeague.teamAway}</Table.Cell>
                  <Table.Cell>{selectedLeague.intervaloFinalJogo_VisitanteVisitante}</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Grid.Row>
        </Grid>
      }
    </>
  );
});
