import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";
import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import RankSPTByTotalSalesList from "./RankSPTByTotalSalesList";
import { format } from "date-fns";

interface Props {
  initialDate?: null | Date | undefined;
  finalDate?: null | Date | undefined;
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

  let newInitialDate = undefined;
  if (initialDate) {
    newInitialDate = format(initialDate!, 'yyyy/MM/dd\'T\'00:00:00');
  }else{
    newInitialDate = undefined;
  }
  let newFinalDate = undefined;
  if (finalDate) {
    newFinalDate = format(finalDate!, 'yyyy/MM/dd\'T\'23:59:59');
  }else{
    newFinalDate = undefined;
  }

  useEffect(() => {
    getRankBySale(newInitialDate, newFinalDate);
  }, [getRankBySale, initialDate, finalDate]);

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width='10'>
            <h1>Rank por VENDAS</h1>
          </Grid.Column>
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