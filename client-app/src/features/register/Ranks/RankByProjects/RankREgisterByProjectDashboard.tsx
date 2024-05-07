import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";
import { useState } from "react";
import { Grid } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import RankRegiterList from "./RankRegiterList";

export default observer(function RankREgisterByProjectDashboard() {
  const { registerStore } = useStore();
  const { getGroupedByProject, setPagination, pagination } = registerStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagination({ ...pagination!, currentPage: pagination!.currentPage + 1 });
    getGroupedByProject().then(() => setLoadingNext(false));
  }

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width='10'>
            <h1>Rank por Projeto</h1>
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
              <RankRegiterList />
            </InfiniteScroll>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
});