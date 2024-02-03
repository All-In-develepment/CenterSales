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

export default observer(function TableResultadoHT({ casaAtual, casaMaxima, empateAtual, empateMaxima, foraAtual, foraMaxima }: Props) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <StyledTableCell align="center" colSpan={3} className="table_detail_header">RESULTADO INTERVALO / HT</StyledTableCell>
        </TableRow>
      </TableHead>

      <TableBody  className="tablesMax">
        <StyledTableRow>
          <StyledTableCell align="center">
            <Table>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell align="center" className="table_detail_header" width={4}>
                    CASA
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell align="center" className="table_detail_body">
                    {casaAtual}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell align="center" className="table_detail_header">MÁXIMA: {casaMaxima}</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </StyledTableCell>
          <StyledTableCell align="center">
            <Table>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell align="center" className="table_detail_header" width={4}>
                    EMPATE
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell align="center" className="table_detail_body">
                    {empateAtual}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell align="center" className="table_detail_header">MÁXIMA: {empateMaxima}</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </StyledTableCell>
          <StyledTableCell align="center">
            <Table>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell align="center" className="table_detail_header" width={4}>
                    FORA
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell align="center" className="table_detail_body">
                    {foraAtual}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell align="center" className="table_detail_header">MÁXIMA: {foraMaxima}</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </StyledTableCell>
        </StyledTableRow>
      </TableBody>
    </Table>
  )
});