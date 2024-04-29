import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import RankList from "./RankList";

export default observer(function RankSale() {
  const { saleStore } = useStore();
  const { getGroupedSales, setPagination, pagination } = saleStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagination({ ...pagination!, currentPage: pagination!.currentPage + 1 });
    getGroupedSales().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    getGroupedSales();
  }, [getGroupedSales]);
  
  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width='10'>
            <h1>General Rank</h1>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Column width='16'>
          {saleStore.loadingInitial && !loadingNext ? (
            <h1>Loading...</h1>
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={handleGetNext}
              hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
              initialLoad={false}
            >
              <RankList />
            </InfiniteScroll>
          )}
        </Grid.Column>
      </Grid>
    </>
  )
});