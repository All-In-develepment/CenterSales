import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import SellerListItemPlaceHolder from "./SellerListItemPlaceHolder";
import InfiniteScroll from "react-infinite-scroller";
import SellerList from "./SellerList";
import { useNavigate } from "react-router-dom";

export default observer(function SellerDashboard() {
  const { sellerStore } = useStore();
  const { loadSellers, setPagination, pagination } = sellerStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const navigate = useNavigate();

  function handleGetNext() {
    setLoadingNext(true);
    setPagination({ ...pagination!, currentPage: pagination!.currentPage + 1 });
    loadSellers().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    loadSellers();
  }, [loadSellers]);
  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width="10">
            <h1>Seller Dashboard</h1>
          </Grid.Column>
          <Grid.Column width="6" textAlign="right">
            <button
              onClick={() => navigate("/sellers/save")}
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
          {sellerStore.loadingInitial && !loadingNext ? (
            <SellerListItemPlaceHolder />
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
              <SellerList />
            </InfiniteScroll>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
});
