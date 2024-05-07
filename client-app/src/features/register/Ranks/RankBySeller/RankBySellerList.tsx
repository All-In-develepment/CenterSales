import { observer } from "mobx-react-lite";
import { useStore } from "../../../../app/stores/store";
import { Fragment } from "react/jsx-runtime";
import RankListItemBySeller from "./RankListItemBySeller";

export default observer(function RankBySellerList() {
  const { registerStore } = useStore();
  const { groupedBySeller } = registerStore;

  groupedBySeller.map((register) => {
    console.log(register.bookmakerId)
  });

  return (
    <>
      {groupedBySeller.map((register) => (
        <Fragment key={register.registerId}>
          <RankListItemBySeller register={register} />
        </Fragment>
      ))}
    </>
  );
});