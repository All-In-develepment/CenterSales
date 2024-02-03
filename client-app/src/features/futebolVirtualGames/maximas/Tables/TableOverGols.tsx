import { observer } from "mobx-react-lite";
// import { Table, TableHeader } from "semantic-ui-react";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface Props {
  over05Atual: number;
  over05Maxima: number;
  over15Atual: number;
  over15Maxima: number;
  over25Atual: number;
  over25Maxima: number;
  over35Atual: number;
  over35Maxima: number;
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

export default observer(function TableOverGols({
  over05Atual,
  over05Maxima,
  over15Atual,
  over15Maxima,
  over25Atual,
  over25Maxima,
  over35Atual,
  over35Maxima,
}: Props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" colSpan={4} className="table_detail_header">
              OVER GOLS
            </StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody className="tablesMax">
          <StyledTableRow>
            <StyledTableCell align="center">
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header" width={4}>
                      OVER 0.5
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_body">
                      {over05Atual}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header">
                      MÁXIMA: {over05Maxima}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header" width={4}>
                      OVER 1.5
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_body">
                      {over15Atual}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header">
                      MÁXIMA: {over15Maxima}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header" width={4}>
                      OVER 2.5
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_body">
                      {over25Atual}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header">
                      MÁXIMA: {over25Maxima}
                    </StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header" width={4}>
                      OVER 3.5
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_body">
                      {over35Atual}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header">
                      MÁXIMA: {over35Maxima}
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
