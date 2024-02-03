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
  gols0Atual: number;
  gols0Maxima: number;
  gols1Atual: number;
  gols1Maxima: number;
  gols2Atual: number;
  gols2Maxima: number;
  gols3Atual: number;
  gols3Maxima: number;
  gols4Atual: number;
  gols4Maxima: number;
  gols5Atual: number;
  gols5Maxima: number;
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

export default observer(function TableGolsExato({ gols0Atual, gols0Maxima, gols1Atual, gols1Maxima, gols2Atual, gols2Maxima, gols3Atual, gols3Maxima, gols4Atual, gols4Maxima, gols5Atual, gols5Maxima }: Props) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center' colSpan={6} className="table_detail_header">GOLS EXATOS</StyledTableCell>
          </TableRow>
        </TableHead>

        <TableBody className="tablesMax">
          <StyledTableRow>
            <StyledTableCell align='center'>
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_header font_small" width={4}>
                      0<br />
                      GOLS
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_body">
                      {gols0Atual}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_header font_small">MÁX: {gols0Maxima}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_header font_small" width={4}>
                      1<br />
                      GOL
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_body">
                      {gols1Atual}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_header font_small">MÁX: {gols1Maxima}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_header font_small" width={4}>
                      2<br />
                      GOLS
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_body">
                      {gols2Atual}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_header font_small">MÁX: {gols2Maxima}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_header font_small" width={4}>
                      3<br />
                      GOLS
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_body">
                      {gols3Atual}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_header font_small">MÁX: {gols3Maxima}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_header font_small" width={4}>
                      4<br />
                      GOLS
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_body">
                      {gols4Atual}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_header font_small">MÁX: {gols4Maxima}</StyledTableCell>
                  </StyledTableRow>
                </TableBody>
              </Table>
            </StyledTableCell>
            <StyledTableCell align='center'>
              <Table>
                <TableBody>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_header font_small" width={4}>
                      5<br />
                      GOLS
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_body">
                      {gols5Atual}
                    </StyledTableCell>
                  </StyledTableRow>
                  <StyledTableRow>
                    <StyledTableCell align='center' className="table_detail_header font_small">MÁX: {gols5Maxima}</StyledTableCell>
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