import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Fragment } from "react/jsx-runtime";
import RegisterListItem from "./RegisterListItem";

export default observer(function RegisterList() {
  const { registerStore } = useStore();
  const { allRegisters } = registerStore;

  return (
    <>
      {allRegisters.map(register => (
        <Fragment key={register.registerId}>
          <RegisterListItem register={register} />
        </Fragment>
      ))}
    </>
  )
});