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
  score1x0Atual: number;
  score1x0Maxima: number;
  score0x0Atual: number;
  score0x0Maxima: number;
  score0x1Atual: number;
  score0x1Maxima: number;
  score2x0Atual: number;
  score2x0Maxima: number;
  score1x1Atual: number;
  score1x1Maxima: number;
  score0x2Atual: number;
  score0x2Maxima: number;
  score2x1Atual: number;
  score2x1Maxima: number;
  score2x2Atual: number;
  score2x2Maxima: number;
  score1x2Atual: number;
  score1x2Maxima: number;
  score3x0Atual: number;
  score3x0Maxima: number;
  score3x3Atual: number;
  score3x3Maxima: number;
  score0x3Atual: number;
  score0x3Maxima: number;
  score3x1Atual: number;
  score3x1Maxima: number;
  score4x4Atual: number;
  score4x4Maxima: number;
  score1x3Atual: number;
  score1x3Maxima: number;
  score3x2Atual: number;
  score3x2Maxima: number;
  score2x3Atual: number;
  score2x3Maxima: number;
  score4x0Atual: number;
  score4x0Maxima: number;
  score0x4Atual: number;
  score0x4Maxima: number;
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

export default observer(function TableResultadoExatoFT({ score1x0Atual,
  score1x0Maxima,
  score0x0Atual,
  score0x0Maxima,
  score0x1Atual,
  score0x1Maxima,
  score2x0Atual,
  score2x0Maxima,
  score1x1Atual,
  score1x1Maxima,
  score0x2Atual,
  score0x2Maxima,
  score2x1Atual,
  score2x1Maxima,
  score2x2Atual,
  score2x2Maxima,
  score1x2Atual,
  score1x2Maxima,
  score3x0Atual,
  score3x0Maxima,
  score3x3Atual,
  score3x3Maxima,
  score0x3Atual,
  score0x3Maxima,
  score3x1Atual,
  score3x1Maxima,
  score4x4Atual,
  score4x4Maxima,
  score1x3Atual,
  score1x3Maxima,
  score3x2Atual,
  score3x2Maxima,
  score2x3Atual,
  score2x3Maxima,
  score4x0Atual,
  score4x0Maxima,
  score0x4Atual,
  score0x4Maxima, }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" colSpan={3} className="table_detail_header">PLACAR EXATO FT</StyledTableCell>
          </TableRow>
          <TableRow className="table_detail_body">
            <StyledTableCell align="center">CASA</StyledTableCell>
            <StyledTableCell align="center">EMPATE</StyledTableCell>
            <StyledTableCell align="center">VISITANTE</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody className="tablesMax">
          <StyledTableRow className="table_exact_score_row">
            <StyledTableCell align="center" className="table_detail_body">
              1x0<br />
              <span className="span_max">MÁX: {score1x0Atual} / {score1x0Maxima}</span>
            </StyledTableCell>
            <StyledTableCell align="center" className="table_detail_body">
              0x0<br />
              <span className="span_max">MÁX: {score0x0Atual} / {score0x0Maxima}</span>
            </StyledTableCell>
            <StyledTableCell align="center" className="table_detail_body">
              0x1<br />
              <span className="span_max">MÁX: {score0x1Atual} / {score0x1Maxima}</span>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow className="table_exact_score_row">
            <StyledTableCell align="center" className="table_detail_body">
              2x0<br />
              <span className="span_max">MÁX: {score2x0Atual} / {score2x0Maxima}</span>
            </StyledTableCell>
            <StyledTableCell align="center" className="table_detail_body">
              1x1<br />
              <span className="span_max">MÁX: {score1x1Atual} / {score1x1Maxima}</span>
            </StyledTableCell>
            <StyledTableCell align="center" className="table_detail_body">
              0x2<br />
              <span className="span_max">MÁX: {score0x2Atual} / {score0x2Maxima}</span>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow className="table_exact_score_row">
            <StyledTableCell align="center" className="table_detail_body">
              2x1<br />
              <span className="span_max">MÁX: {score2x1Atual} / {score2x1Maxima}</span>
            </StyledTableCell>
            <StyledTableCell align="center" className="table_detail_body">
              2x2<br />
              <span className="span_max">MÁX: {score2x2Atual} / {score2x2Maxima}</span>
            </StyledTableCell>
            <StyledTableCell align="center" className="table_detail_body">
              1x2<br />
              <span className="span_max">MÁX: {score1x2Atual} / {score1x2Maxima}</span>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow className="table_exact_score_row">
            <StyledTableCell align="center" className="table_detail_body">
              3x0<br />
              <span className="span_max">MÁX: {score3x0Atual} / {score3x0Maxima}</span>
            </StyledTableCell>
            <StyledTableCell align="center" className="table_detail_body">
              3x3<br />
              <span className="span_max">MÁX: {score3x3Atual} / {score3x3Maxima}</span>
            </StyledTableCell>
            <StyledTableCell align="center" className="table_detail_body">
              0x3<br />
              <span className="span_max">MÁX: {score0x3Atual} / {score0x3Maxima}</span>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow className="table_exact_score_row">
            <StyledTableCell align="center" className="table_detail_body">
              3x1<br />
              <span className="span_max">MÁX: {score3x1Atual} / {score3x1Maxima}</span>
            </StyledTableCell>
            <StyledTableCell align="center" className="table_detail_body">
              4x4<br />
              <span className="span_max">MÁX: {score4x4Atual} / {score4x4Maxima}</span>
            </StyledTableCell>
            <StyledTableCell align="center" className="table_detail_body">
              1x3<br />
              <span className="span_max">MÁX: {score1x3Atual} / {score1x3Maxima}</span>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow className="table_exact_score_row">
            <StyledTableCell align="center" className="table_detail_body">
              3x2<br />
              <span className="span_max">MÁX: {score3x2Atual} / {score3x2Maxima}</span>
            </StyledTableCell>
            <StyledTableCell align="center" className="table_detail_body"></StyledTableCell>
            <StyledTableCell align="center" className="table_detail_body">
              2x3<br />
              <span className="span_max">MÁX: {score2x3Atual} / {score2x3Maxima}</span>
            </StyledTableCell>
          </StyledTableRow>
          <StyledTableRow className="table_exact_score_row">
            <StyledTableCell align="center" className="table_detail_body">
              4x0<br />
              <span className="span_max">MÁX: {score4x0Atual} / {score4x0Maxima}</span>
            </StyledTableCell>
            <StyledTableCell align="center" className="table_detail_body"></StyledTableCell>
            <StyledTableCell align="center" className="table_detail_body">
              0x4<br />
              <span className="span_max">MÁX: {score0x4Atual} / {score0x4Maxima}</span>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
});