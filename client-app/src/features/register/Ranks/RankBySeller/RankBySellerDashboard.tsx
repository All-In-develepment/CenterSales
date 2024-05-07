import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";
import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import RankBySellerList from "./RankBySellerList";

export default observer(function RankBySellerDashboard() {
  const { registerStore } = useStore();
  const { getGroupedBySeller, setPagination, pagination } = registerStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagination({ ...pagination!, currentPage: pagination!.currentPage + 1 });
    getGroupedBySeller().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    getGroupedBySeller();
  }, [getGroupedBySeller]);

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width='10'>
            <h1>Rank de cadastro por vendor</h1>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Column width='16'>
          {registerStore.loadingInitial && !loadingNext ? (
            <h1>Loading...</h1>
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={handleGetNext}
              hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
              initialLoad={false}
            >
              <RankBySellerList />
            </InfiniteScroll>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
});