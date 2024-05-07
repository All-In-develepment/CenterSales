import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Fragment } from "react/jsx-runtime";
import RankListItem from "./RankListItem";

export default observer(function RankList() {
  const { saleStore } = useStore();
  const { groupedSaler } = saleStore;

  return(
    <>
      {groupedSaler.map(sale => (
        <Fragment key={sale.saleId}>
          <RankListItem sale={sale} />
        </Fragment>
      ))}
    </>
  )
});