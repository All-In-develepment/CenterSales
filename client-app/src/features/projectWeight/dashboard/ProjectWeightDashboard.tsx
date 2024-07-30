import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import ProjectWeightListItemPlaceHolder from "./ProjectWeightListItemPlaceHolder";
import InfiniteScroll from "react-infinite-scroller";
import ProjectWeightList from "./ProjectWeightList";
import { useNavigate } from "react-router-dom";

export default observer(function ProjectWeightDashboard() {
  const { projectWeightStore } = useStore();
  const { loadProjectWeights, setPagination, pagination } = projectWeightStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const navigate = useNavigate();

  function handleGetNext() {
    setLoadingNext(true);
    setPagination({ ...pagination!, currentPage: pagination!.currentPage + 1 });
    loadProjectWeights().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    loadProjectWeights();
  }, [loadProjectWeights]);

  return(
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width="10">
            <h1>Painel de pesos</h1>
          </Grid.Column>
          <Grid.Column width="6" textAlign="right">
            <button
              onClick={() => navigate("/projectweight/save")}
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
          {projectWeightStore.loadingInitial && !loadingNext ? (
            <ProjectWeightListItemPlaceHolder />
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
              <ProjectWeightList />
            </InfiniteScroll>
          )}
        </Grid.Column>
      </Grid>
    </>
  )
});