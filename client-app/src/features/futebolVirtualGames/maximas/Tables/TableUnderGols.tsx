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
  under05Atual: number;
  under05Maxima: number;
  under15Atual: number;
  under15Maxima: number;
  under25Atual: number;
  under25Maxima: number;
  under35Atual: number;
  under35Maxima: number;
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

export default observer(function TableUnderGols({ under05Atual, under05Maxima, under15Atual, under15Maxima, under25Atual, under25Maxima, under35Atual, under35Maxima }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align="center" colSpan={4} className="table_detail_header">UNDER GOLS</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody className="tablesMax">
          <StyledTableRow>
            <StyledTableCell>
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header">
                      UNDER 0.5
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_body">
                      {under05Atual}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header">MÁXIMA: {under05Maxima}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header">
                      UNDER 1.5
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_body">
                      {under15Atual}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header">MÁXIMA: {under15Maxima}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header">
                      UNDER 2.5
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_body">
                      {under25Atual}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header">MÁXIMA: {under25Maxima}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </StyledTableCell>
            <StyledTableCell align="center">
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header">
                      UNDER 3.5
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_body">
                      {under35Atual}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align="center" className="table_detail_header">MÁXIMA: {under35Maxima}</StyledTableCell>
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