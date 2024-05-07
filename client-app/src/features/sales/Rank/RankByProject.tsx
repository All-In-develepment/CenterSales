import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import RankByProjectList from "./RankByProjectList";

export default observer(function RankByProject() {
  const { saleStore } = useStore();
  const { getGroupedSalesByProject, setPagination, pagination } = saleStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagination({ ...pagination!, currentPage: pagination!.currentPage + 1 });
    getGroupedSalesByProject().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    getGroupedSalesByProject();
  }, [getGroupedSalesByProject]);
  
  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width='10'>
            <h1>Rank por projeto</h1>
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
              <RankByProjectList />
            </InfiniteScroll>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
});