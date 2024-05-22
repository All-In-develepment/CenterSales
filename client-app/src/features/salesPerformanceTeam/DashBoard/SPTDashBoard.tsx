import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { Grid, Icon } from "semantic-ui-react";
import InfiniteScroll from "react-infinite-scroller";
import { useNavigate } from "react-router-dom";
import SPTList from "./SPTList";

export default observer(function SPTDashBoard() {
  const { salePerformanceTeamStore } = useStore();
  const { loadSalePerformanceTeams, setPagination, pagination } = salePerformanceTeamStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const navigate = useNavigate();

  function handleGetNext() {
    setLoadingNext(true);
    setPagination({ ...pagination!, currentPage: pagination!.currentPage + 1 });
    loadSalePerformanceTeams().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    loadSalePerformanceTeams();
  }, [loadSalePerformanceTeams]);

  return (
    <>
      <Grid>
      <Grid.Row>
          <Grid.Column width="8">
            <h1>Painel de cadastro de performance</h1>
          </Grid.Column>
          <Grid.Column width="8" textAlign="right">
            <a
              className="ui primary button"
              style={{ marginTop: "1.5em" }}
              target="_blank"
              href="sales/rank"
            >
              <Icon name="list ol" /> Rank por vendedor
            </a>
            <a
              className="ui primary button"
              style={{ marginTop: "1.5em" }}
              target="_blank"
              href="sales/rankProject"
            >
              <Icon name="list ol" /> Rank por projeto
            </a>
            <button
              onClick={() => navigate("/spt/save")}
              className="ui green button"
              style={{ marginTop: "1.5em" }}
            >
              Criar
            </button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Column width="16">
          {salePerformanceTeamStore.loadingInitial && !loadingNext ? (
            <h1>Loading...</h1>
          ) : (
            <InfiniteScroll
              pageStart={1}
              loadMore={handleGetNext}
              hasMore={
                !loadingNext &&
                !!pagination &&
                pagination.currentPage < pagination.totalPages
              }
              initialLoad={false}
            >
              <SPTList />
            </InfiniteScroll>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
});