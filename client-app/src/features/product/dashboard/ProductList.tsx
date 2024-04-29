import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Fragment } from "react/jsx-runtime";
import { Header } from "semantic-ui-react";
import ProductListItem from "./ProductListItem";

export default observer( function ProductList() {
  const { productStore } = useStore();
  const { allProducts } = productStore;

  return (
    <>
      {allProducts.map(product => (
        <Fragment key={product.productId}>
          <ProductListItem product={product} />
        </Fragment>
      ))}
    </>
  )
})