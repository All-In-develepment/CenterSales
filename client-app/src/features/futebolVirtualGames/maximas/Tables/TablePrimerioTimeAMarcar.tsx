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

export default observer(function TablePrimerioTimeAMarcar({ casaAtual, casaMaxima, empateAtual, empateMaxima, foraAtual, foraMaxima }: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell align="center" colSpan={3} className="table_detail_header">PRIMEIRO TIME A MARCAR</StyledTableCell>
        </TableRow>
        <TableRow className="table_exact_score_row">
          <StyledTableCell align="center">CASA</StyledTableCell>
          <StyledTableCell align="center">EMPATE</StyledTableCell>
          <StyledTableCell align="center">VISITANTE</StyledTableCell>
        </TableRow>
      </TableHead>

      <TableBody className="tablesMax">
        <StyledTableRow>
          <StyledTableCell align="center" className="table_detail_body">
            MÁX: {casaAtual} / {casaMaxima}
          </StyledTableCell>
          <StyledTableCell align="center" className="table_detail_body">
            MÁX: {empateAtual} / {empateMaxima}
          </StyledTableCell>
          <StyledTableCell align="center" className="table_detail_body">
            MÁX: {foraAtual} / {foraMaxima}
          </StyledTableCell>
        </StyledTableRow>
      </TableBody>
    </Table>
  )
});