import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Fragment } from "react/jsx-runtime";
import EventListItem from "./EventListItem";

export default observer(function EventList() {
  const { eventStore } = useStore();
  const { allEvents } = eventStore;

  return (
    <>
      {allEvents.map(event => (
        <Fragment key={event.eventsId}>
          <EventListItem originEvent={event} />
        </Fragment>
      ))}
    </>
  )
})