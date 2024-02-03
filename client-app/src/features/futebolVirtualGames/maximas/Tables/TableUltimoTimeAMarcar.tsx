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
  casaAtual: number;
  casaMaxima: number;
  empateAtual: number;
  empateMaxima: number;
  foraAtual: number;
  foraMaxima: number;
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

export default observer(function TableUltimoTimeAMarcar({ casaAtual, casaMaxima, empateAtual, empateMaxima, foraAtual, foraMaxima }: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell colSpan={3} className="table_detail_header" align="center">ÚLTIMO TIME A MARCAR</StyledTableCell>
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
            <span className="span_max">MÁX: {casaAtual} / {casaMaxima}</span>
          </StyledTableCell>
          <StyledTableCell align="center" className="table_detail_body">
            <span className="span_max">MÁX: {empateAtual} / {empateMaxima}</span>
          </StyledTableCell>
          <StyledTableCell align="center" className="table_detail_body">
            <span className="span_max">MÁX: {foraAtual} / {foraMaxima}</span>
          </StyledTableCell>
        </StyledTableRow>
      </TableBody>
    </Table>
  )
});