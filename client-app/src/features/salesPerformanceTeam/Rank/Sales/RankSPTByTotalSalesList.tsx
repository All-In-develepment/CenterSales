import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";
import { Fragment } from "react/jsx-runtime";
import RankSPTByTotalSalesListItem from "./RankSPTByTotalSalesListItem";

export default observer(function RankSPTByTotalSalesList() {
  const { salePerformanceTeamStore } = useStore();
  const { groupedBySele } = salePerformanceTeamStore;

  console.log(`Rank List: ${groupedBySele}`)

  return(
    <>
      {groupedBySele.map(sale => (
        <Fragment key={sale.sptId}>
          <RankSPTByTotalSalesListItem sale={sale} />
        </Fragment>
      ))}
    </>
  )
});