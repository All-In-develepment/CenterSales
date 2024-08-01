// import { observer } from "mobx-react-lite";
// import { useStore } from "../../../../app/stores/store";
// import { Fragment } from "react/jsx-runtime";
// import RankSPTByDepositListItem from "./RankSPTByDepositListItem";

// export default observer(function RankSPTByDepositList() {
//   const { salePerformanceTeamStore } = useStore();
//   const { groupedByDeposit } = salePerformanceTeamStore;

//   console.log(`Rank List: ${groupedByDeposit}`)

//   return(
//     <>
//       {groupedByDeposit.map(sale => (
//         <Fragment key={sale.sptId}>
//           <RankSPTByDepositListItem sale={sale} />
//         </Fragment>
//       ))}
//     </>
//   )
// });
