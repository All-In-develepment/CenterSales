import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";
import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import RankSPTByConvertionList from "./RankSPTByConvertionList";
import { format } from 'date-fns';
import PlaceHolderRank from "../PlaceHolderRank";

interface Props {
  initialDate?: null | Date | undefined | string;
  finalDate?: null | Date | undefined | string;
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
    getRankByConversion(newInitialDate, newFinalDate);
  }, [getRankByConversion, initialDate, finalDate]);

  return (
    <>
    <Grid>
      <Grid.Row>
        <Grid.Column width='10'>
          <h1>Rank de CONVERSÃO</h1>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    <Grid>
      <Grid.Column width='16'>
        {salePerformanceTeamStore.loadingInitial && !loadingNext ? (
          <PlaceHolderRank />
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