import { observer } from "mobx-react-lite";
import { Header } from "semantic-ui-react";
import SaleListItem from "./SaleListItem";
import { Fragment } from "react/jsx-runtime";
import { useStore } from "../../../app/stores/store";

export default observer(function SaleList() {
  const { saleStore } = useStore();
  const { allSales } = saleStore;

  return (
    <>
      {allSales.map(sale => (
        <Fragment key={sale.saleId}>
          <Header sub color='teal'>
            {sale.saleId}
          </Header>
          <SaleListItem sale={sale} />
        </Fragment>
      ))}
    </>
  )
});