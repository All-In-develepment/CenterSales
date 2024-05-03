import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import InfiniteScroll from "react-infinite-scroller";
import EventList from "./EventList";

export default observer(function EventDashboard() {
  const { eventStore } = useStore();
  const { loadEvents, setPagination, pagination } = eventStore;
  const [loadingNext, setLoadingNext] = useState(false);
  const navigate = useNavigate();

  function handleGetNext() {
    setLoadingNext(true);
    setPagination({ ...pagination!, currentPage: pagination!.currentPage + 1 });
    loadEvents().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width="10">
            <h1>Event Dashboard</h1>
          </Grid.Column>
          <Grid.Column width="6" textAlign="right">
            <button
              onClick={() => navigate("/events/save")}
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
          {eventStore.loadingInitial && !loadingNext ? (
            <EventListItemPlaceholder />
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
              <EventList />
            </InfiniteScroll>
          )}
        </Grid.Column>
      </Grid>
    </>
  )
})