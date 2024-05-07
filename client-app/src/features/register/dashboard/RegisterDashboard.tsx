import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Icon } from "semantic-ui-react";
import EventListItemPlaceholder from "../../event/dashboard/EventListItemPlaceholder";
import InfiniteScroll from "react-infinite-scroller";
import RegisterList from "./RegisterList";

export default observer(function RegisterDashboard() {
  const { registerStore } = useStore();
  const { allRegisters } = registerStore;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function handleGetNext() {
    setLoading(true);
    registerStore.setPagination({
      ...registerStore.pagination!,
      currentPage: registerStore.pagination!.currentPage + 1,
    });
    registerStore.loadRegisters().then(() => setLoading(false));
  }

  useEffect(() => {
    registerStore.loadRegisters();
  }, [registerStore]);

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width="8">
            <h1>Register Dashboard</h1>
          </Grid.Column>
          <Grid.Column width="8" textAlign="right">
            <a
              className="ui primary button"
              style={{ marginTop: "1.5em" }}
              target="_blank"
              href="registers/rankseller"
            >
              <Icon name="list ol" /> Rank por vendedor
            </a>
            <a
              className="ui primary button"
              style={{ marginTop: "1.5em" }}
              target="_blank"
              href="registers/rankProject"
            >
              <Icon name="list ol" /> Rank por projeto
            </a>
            <button
              onClick={() => navigate("/registers/save")}
              className="ui primary button"
              style={{ marginTop: "1.5em" }}
            >
              Create
            </button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Grid>
        <Grid.Column width="16">
          {registerStore.loadingInitial && !loading ? (
            <EventListItemPlaceholder />
          ) : (
            <InfiniteScroll
              pageStart={0}
              loadMore={handleGetNext}
              hasMore={
                !loading &&
                !!registerStore.pagination &&
                registerStore.pagination.currentPage <
                  registerStore.pagination.totalPages
              }
            >
              <RegisterList />
            </InfiniteScroll>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
});
