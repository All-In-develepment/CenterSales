import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Fragment } from "react/jsx-runtime";
import BookmakerListItem from "./BookmakerListItem";

export default observer( function BookmakerList() {
  const { bookmakerStore } = useStore();
  const { allBookmakers } = bookmakerStore;

  console.log(allBookmakers)

  return (
    <>
      {allBookmakers.map(bookmaker => (
        <Fragment key={bookmaker.bookmakerId}>
          <BookmakerListItem bookmaker={bookmaker} />
        </Fragment>
      ))}
    </>
  )
})