import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Fragment } from "react/jsx-runtime";
import { Header } from "semantic-ui-react";
import SellerListItem from "./SellerListItem";

export default observer(function SellerList() {
  const { sellerStore } = useStore();
  const { allSellers } = sellerStore;

  return (
    <>
      {allSellers.map(seller => (
        <Fragment key={seller.sellerId}>
          <Header sub color='teal'>
            {seller.sellerName}
          </Header>
          <SellerListItem seller={seller} />
        </Fragment>
      ))}
    </>
  )
})