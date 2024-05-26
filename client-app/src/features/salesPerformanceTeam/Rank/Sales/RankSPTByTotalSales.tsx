import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";
import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import RankSPTByTotalSalesList from "./RankSPTByTotalSalesList";

interface Props {
  initialDate?: Date | null;
  finalDate?: Date | null;
}

export default observer(function RankSPTByTotalSales({ initialDate, finalDate }: Props) {
  const { salePerformanceTeamStore } = useStore();
  const { getRankBySale, setPagination, pagination } = salePerformanceTeamStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagination({ ...pagination!, currentPage: pagination!.currentPage + 1 });
    getRankBySale().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    getRankBySale();
  }, [getRankBySale]);

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width='10'>
            <h1>Rank por VENDAS</h1>
          </Grid.Column>
          {initialDate?.toString()}
          {finalDate?.toString()}
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Column width='16'>
          {salePerformanceTeamStore.loadingInitial && !loadingNext ? (
            <h1>Carregando...</h1>
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={handleGetNext}
              hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
              initialLoad={false}
            >
              <RankSPTByTotalSalesList />
            </InfiniteScroll>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
});