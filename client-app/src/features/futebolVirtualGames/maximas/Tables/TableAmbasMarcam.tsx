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
  ambasMarcamMaxima: number;
  ambasMarcamAtual: number;
  ambasNaoMarcamMaxima: number;
  ambasNaoMarcamAtual: number;
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

export default observer(function TableAmbasMarcam({ ambasMarcamMaxima, ambasMarcamAtual, ambasNaoMarcamMaxima, ambasNaoMarcamAtual }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center' colSpan={2} className="table_detail_header">AMBAS MARCAM</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody className="tablesMax">
          <StyledTableRow>
            <StyledTableCell align='center'>
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_header" width={4}>
                      SIM
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_body">
                      {ambasMarcamAtual}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_header">MÁXIMA: {ambasMarcamMaxima}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_header" width={4}>
                      NÃO
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_body">
                      {ambasNaoMarcamAtual}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_header">MÁXIMA: {ambasNaoMarcamMaxima}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
});