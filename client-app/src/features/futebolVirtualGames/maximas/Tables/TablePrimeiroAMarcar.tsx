import { observer } from "mobx-react-lite";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Props {
  semMarcadorAtual: number;
  semMarcadorMaxima: number;
  centroAvanteCasaAtual: number;
  centroAvanteCasaMaxima: number;
  centroAvanteVisitanteAtual: number;
  centroAvanteVisitanteMaxima: number;
  pontaDireitaCasaAtual: number;
  pontaDireitaCasaMaxima: number;
  pontaDireitaVisitanteAtual: number;
  pontaDireitaVisitanteMaxima: number;
  pontaEsquerdaCasaAtual: number;
  pontaEsquerdaCasaMaxima: number;
  pontaEsquerdaVisitanteAtual: number;
  pontaEsquerdaVisitanteMaxima: number;
  meiaAtacanteCasaAtual: number;
  meiaAtacanteCasaMaxima: number;
  meiaAtacanteVisitanteAtual: number;
  meiaAtacanteVisitanteMaxima: number;
  outroJogadorCasaAtual: number;
  outroJogadorCasaMaxima: number;
  outroJogadorVisitanteAtual: number;
  outroJogadorVisitanteMaxima: number;
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default observer(function TableResultadoHT({semMarcadorAtual,
  semMarcadorMaxima,
  centroAvanteCasaAtual,
  centroAvanteCasaMaxima,
  centroAvanteVisitanteAtual,
  centroAvanteVisitanteMaxima,
  pontaDireitaCasaAtual,
  pontaDireitaCasaMaxima,
  pontaDireitaVisitanteAtual,
  pontaDireitaVisitanteMaxima,
  pontaEsquerdaCasaAtual,
  pontaEsquerdaCasaMaxima,
  pontaEsquerdaVisitanteAtual,
  pontaEsquerdaVisitanteMaxima,
  meiaAtacanteCasaAtual,
  meiaAtacanteCasaMaxima,
  meiaAtacanteVisitanteAtual,
  meiaAtacanteVisitanteMaxima,
  outroJogadorCasaAtual,
  outroJogadorCasaMaxima,
  outroJogadorVisitanteAtual,
  outroJogadorVisitanteMaxima } : Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell align="center" colSpan={2} className="table_detail_header">PRIMEIRO A MARCAR</StyledTableCell>
        </TableRow>
        <TableRow  className="table_detail_body">
          <StyledTableCell align="center" width={8}>CASA</StyledTableCell>
          <StyledTableCell align="center" width={8}>VISITANTE</StyledTableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        <StyledTableRow>
          <StyledTableCell align="center" colSpan={2} className="table_detail_body">
            SEM MARCADOR<br />
            <span className="span_max">MÁX: {semMarcadorAtual} / {semMarcadorMaxima}</span>
          </StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell align='center' width={8} className="table_detail_body">
            CENTRO AVANTE CASA<br />
            <span className="span_max">MÁX: {centroAvanteCasaAtual} / {centroAvanteCasaMaxima}</span>
          </StyledTableCell>
          <StyledTableCell align='center' width={8} className="table_detail_body">
            CENTRO AVANTE VISITANTE<br />
            <span className="span_max">MÁX: {centroAvanteVisitanteAtual} / {centroAvanteVisitanteMaxima}</span>
          </StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell align='center' className="table_detail_body">
            PONTA DIREITA CASA<br />
            <span className="span_max">MÁX: {pontaDireitaCasaAtual} / {pontaDireitaCasaMaxima}</span>
          </StyledTableCell>
          <StyledTableCell align='center' className="table_detail_body">
            PONTA DIREITA VISITANTE<br />
            <span className="span_max">MÁX: {pontaDireitaVisitanteAtual} / {pontaDireitaVisitanteMaxima}</span>
          </StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell align='center' className="table_detail_body">
            PONTA ESQUERDA CASA<br />
            <span className="span_max">MÁX: {pontaEsquerdaCasaAtual} / {pontaEsquerdaCasaMaxima}</span>
          </StyledTableCell>
          <StyledTableCell align='center' className="table_detail_body">
            PONTA ESQUERDA VISITANTE<br />
            <span className="span_max">MÁX: {pontaEsquerdaVisitanteAtual} / {pontaEsquerdaVisitanteMaxima}</span>
          </StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell align='center' className="table_detail_body">
            MEIA ATACANTE CASA<br />
            <span className="span_max">MÁX: {meiaAtacanteCasaAtual} / {meiaAtacanteCasaMaxima}</span>
          </StyledTableCell>
          <StyledTableCell align='center' className="table_detail_body">
            MEIA ATACANTE VISITANTE<br />
            <span className="span_max">MÁX: {meiaAtacanteVisitanteAtual} / {meiaAtacanteVisitanteMaxima}</span>
          </StyledTableCell>
        </StyledTableRow>
        <StyledTableRow>
          <StyledTableCell align='center' className="table_detail_body">
            OUTRO JOGADOR CASA<br />
            <span className="span_max">MÁX: {outroJogadorCasaAtual} / {outroJogadorCasaMaxima}</span>
          </StyledTableCell>
          <StyledTableCell align='center' className="table_detail_body">
            OUTRO JOGADOR VISITANTE<br />
            <span className="span_max">MÁX: {outroJogadorVisitanteAtual} / {outroJogadorVisitanteMaxima}</span>
          </StyledTableCell>
        </StyledTableRow>
      </TableBody>
    </Table>
  )
});