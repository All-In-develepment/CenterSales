import { TableCell, TableRow } from "semantic-ui-react";
import { SalePerformanceTeam } from "../../../app/models/salePerformanceTeam";

interface Props {
  sale: SalePerformanceTeam
}

function convertToPtBrDate(dateStr: string): string {
  // Divide a string da data em ano, mês e dia
  const [year, month, day] = dateStr.split('-');

  // Cria a data no formato brasileiro
  const ptBrDate = `${day}/${month}/${year}`;

  return ptBrDate;
}

export default function SPTListItem({sale}: Props) {
  return (
    <TableRow>
      <TableCell icon='user' content={ sale.sptSellerName } />
      <TableCell icon='users' content={ sale.sptTotalLeads } />
      <TableCell content={ sale.sptTotalSales } />
      {/* <TableCell icon='dollar' content={ sale.sptTotalSalesAmont.toLocaleString('pt-br', { minimumFractionDigits: 2 })} /> */}
      <TableCell content={ sale.sptTotalRegister } />
      <TableCell content={ sale.sptTotalRedeposit } />
      <TableCell icon='dollar' content={ sale.sptTotalSalesAmont.toLocaleString('pt-br', { minimumFractionDigits: 2 }) } />
      <TableCell icon='dollar' content={ (sale.sptTotalRedepositAmont + sale.sptTotalRegisterAmont).toLocaleString('pt-br', { minimumFractionDigits: 2 }) } />
      <TableCell icon='percent' content={`${ sale.sptavgConvertion }`} />
      <TableCell icon='file alternate outline' content={ sale.sptProjectName } />
    </TableRow>
  )
}