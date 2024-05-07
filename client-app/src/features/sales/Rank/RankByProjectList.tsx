import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Fragment } from "react/jsx-runtime";
import RankByProjectListItem from "./RankByProjectListItem";

export default observer(function RankByProjectList() {
  const { saleStore } = useStore();
  const { groupedProject } = saleStore;

  console.log(`Rank List: ${groupedProject}`)

  return(
    <>
      {groupedProject.map(sale => (
        <Fragment key={sale.saleId}>
          <RankByProjectListItem sale={sale} />
        </Fragment>
      ))}
    </>
  )
});