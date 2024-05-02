import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import BookmakerListItemPlaceholder from "./BookmakerListItemPlaceholder";
import InfiniteScroll from "react-infinite-scroller";
import BookmakerList from "./BookmakerList";

export default observer(function BookmakerDashboard() {
  const { bookmakerStore } = useStore();
  const { loadBookmakers, setPagination, pagination } = bookmakerStore;
  const [loadingNext, setLoadingNext] = useState(false);
  const navigate = useNavigate();

  function handleGetNext() {
    setLoadingNext(true);
    setPagination({ ...pagination!, currentPage: pagination!.currentPage + 1 });
    loadBookmakers().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    loadBookmakers();
  }, [loadBookmakers]);

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width="10">
            <h1>Bookmaker Dashboard</h1>
          </Grid.Column>
          <Grid.Column width="6" textAlign="right">
            <button
              onClick={() => navigate("/bookmakers/save")}
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
          {bookmakerStore.loadingInitial && !loadingNext ? (
            <BookmakerListItemPlaceholder />
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
              <BookmakerList />
            </InfiniteScroll>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
});