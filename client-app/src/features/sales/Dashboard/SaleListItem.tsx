import { Grid, GridRow, Icon, List, ListContent, ListItem } from "semantic-ui-react";
import { Sale } from "../../../app/models/sale";

interface Props {
  sale: Sale
}

function convertToPtBrDate(dateStr: string): string {
  // Divide a string da data em ano, mês e dia
  const [year, month, day] = dateStr.split('-');

  // Cria a data no formato brasileiro
  const ptBrDate = `${day}/${month}/${year}`;

  return ptBrDate;
}

export default function SaleListItem({sale}: Props) {
  return (
    <>
      <List>
        <ListItem icon='user' content={sale.sellerName} />
        <ListItem icon='dollar' content={sale.salePrice.toLocaleString('pt-br', { minimumFractionDigits: 2 })} />
        <ListItem icon='tag' content={sale.productName} />
        <ListItem icon='file alternate outline' content={sale.projectName} />
        <ListItem>
          <GridRow>

            <Icon name="calendar" /> {convertToPtBrDate((sale.saleDate).split("T")[0])} / <Icon name="clock" /> {(sale.saleDate).split("T")[1]}
          </GridRow>
        </ListItem>
      </List>
    </>
  )
}