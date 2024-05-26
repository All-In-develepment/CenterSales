import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";
import { Fragment } from "react/jsx-runtime";
import RankSPTByConvertionListItem from "./RankSPTByConvertionListItem";

export default observer(function RankSPTByConvertionList() {
  const { salePerformanceTeamStore } = useStore();
  const { groupedByConvertion } = salePerformanceTeamStore;

  console.log(`Rank List: ${groupedByConvertion}`)

  return(
    <>
      {groupedByConvertion.map(sale => (
        <Fragment key={sale.sptId}>
          <RankSPTByConvertionListItem sale={sale} />
        </Fragment>
      ))}
    </>
  )
});