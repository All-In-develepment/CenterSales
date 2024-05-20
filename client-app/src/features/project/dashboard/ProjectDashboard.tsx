import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import ProjectListItemPlaceHolder from "./ProjectListItemPlaceHolder";
import InfiniteScroll from "react-infinite-scroller";
import ProjectList from "./ProjectList";
import ProjectForm from "../form/ProjectForm";
import { useNavigate } from "react-router-dom";
import { yellow } from "@mui/material/colors";

export default observer(function ProjectDashboard() {
  const { projectStore } = useStore();
  const { loadProjects, setPagination, pagination } = projectStore;
  const [loadingNext, setLoadingNext] = useState(false);

  const navigate = useNavigate();

  function handleGetNext() {
    setLoadingNext(true);
    setPagination({ ...pagination!, currentPage: pagination!.currentPage + 1 });
    loadProjects().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width="10">
            <h1>Projetos</h1>
          </Grid.Column>
          <Grid.Column width="6" textAlign="right">
            <button
              onClick={() => navigate("/projects/save")}
              className="ui primary button"
              style={{ 
                marginTop: "1.5em",
                backgroundColor:'#E0B672'
              }}
            >
              Criar projeto
            </button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Column width="16">
          {projectStore.loadingInitial && !loadingNext ? (
            <ProjectListItemPlaceHolder />
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
              <ProjectList />
            </InfiniteScroll>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
});
