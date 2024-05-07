import { TableCell, TableRow } from "semantic-ui-react";
import { Register } from "../../../app/models/register";
import { useStore } from "../../../app/stores/store";
import RegisterDetail from "./RegisterDetail";

interface Props {
  register: Register;
}

export default function RegisterListItem({ register }: Props) {
  const { modalStore } = useStore();
  return (
    <TableRow
      onClick={() => modalStore.openModal(<RegisterDetail registerObj={register} />, 'small')} 
      key={register.registerId}
    >
      <TableCell>{register.registerDate.split('T')[0]}</TableCell>
      <TableCell>{register.registerLeads}</TableCell>
      <TableCell>{register.registerTotal}</TableCell>
      <TableCell>{register.registerAVGConversion}%</TableCell>
      <TableCell>R${register.registerAmount}</TableCell>
      <TableCell>R${register.registerAVG}</TableCell>
      <TableCell>{register.eventsName}</TableCell>
    </TableRow>
  );
}