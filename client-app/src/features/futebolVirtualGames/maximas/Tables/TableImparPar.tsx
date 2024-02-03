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
  parAtual: number;
  parMaxima: number;
  imparAtual: number;
  imparMaxima: number;
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

export default observer(function TableImparPar({
  parAtual,
  parMaxima,
  imparAtual,
  imparMaxima,
}: Props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table" >
        <TableHead>
          <TableRow>
            <StyledTableCell className="table_detail_header" colSpan={2} align="center" >
              GOLS IMPAR / PAR
            </StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody className="tablesMax">
          <StyledTableRow>
            <StyledTableCell width={8}>
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header">
                      IMPAR<span className="span_detail"> (sem sair) </span>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_body">
                      {imparAtual}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header">
                      MÁXIMA: {imparMaxima}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </StyledTableCell>
            <StyledTableCell width={8}>
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header">
                      PAR<span className="span_detail"> (sem sair) </span>
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_body">
                      {parAtual}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header">
                      MÁXIMA: {parMaxima}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </StyledTableCell>
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
});
