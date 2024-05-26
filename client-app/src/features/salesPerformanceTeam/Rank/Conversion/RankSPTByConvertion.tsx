import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";
import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import RankSPTByConvertionList from "./RankSPTByConvertionList";

interface Props {
  initialDate?: Date | null;
  finalDate?: Date | null;
}

export default observer(function RankSPTByConvertion({ initialDate, finalDate }: Props) {
  const { salePerformanceTeamStore } = useStore();
  const { getRankByConversion, setPagination, pagination } = salePerformanceTeamStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagination({ ...pagination!, currentPage: pagination!.currentPage + 1 });
    getRankByConversion().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    getRankByConversion();
  }, [getRankByConversion]);

  return (
    <>
    <Grid>
      <Grid.Row>
        <Grid.Column width='10'>
          <h1>Rank de CONVERSÃO</h1>
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
            <RankSPTByConvertionList />
          </InfiniteScroll>
        )}
      </Grid.Column>
    </Grid>
      
    </>
  );
});