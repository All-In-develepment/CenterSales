import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import ProductListItemPlaceHolder from "./ProductListItemPlaceHolder";
import InfiniteScroll from "react-infinite-scroller";
import ProductList from "./ProductList";

export default observer(function ProductDashboard() {
  const { productStore } = useStore();
  const { loadProducts, setPagination, pagination } = productStore;
  const [loadingNext, setLoadingNext] = useState(false);
  const navigate = useNavigate();

  function handleGetNext() {
    setLoadingNext(true);
    setPagination({ ...pagination!, currentPage: pagination!.currentPage + 1 });
    loadProducts().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width="10">
            <h1>Product Dashboard</h1>
          </Grid.Column>
          <Grid.Column width="6" textAlign="right">
            <button
              onClick={() => navigate("/products/save")}
              className="ui primary button"
              style={{ marginTop: "1.5em" }}
            >
              Criar
            </button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Column width="16">
          {productStore.loadingInitial && !loadingNext ? (
            <ProductListItemPlaceHolder />
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={handleGetNext}
              hasMore={
                !loadingNext &&
                !!pagination &&
                pagination.currentPage < pagination.totalPages
              }
              initialLoad={false}
            >
              <ProductList />
            </InfiniteScroll>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
});
