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

export default observer(function TablePlcarExatoHT({ score1x0Atual,
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
  score0x2Maxima }: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell colSpan={3} className="table_detail_header">PLACAR EXATO HT</StyledTableCell>
        </TableRow>
        <TableRow className="table_detail_body">
          <StyledTableCell align="center">CASA</StyledTableCell>
          <StyledTableCell align="center">EMPATE</StyledTableCell>
          <StyledTableCell align="center">VISITANTE</StyledTableCell>
        </TableRow>
      </TableHead>

      <TableBody className="tablesMax">
        <TableRow>
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
        </TableRow>
        <TableRow>
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
        </TableRow>
      </TableBody>
    </Table>
  )
});