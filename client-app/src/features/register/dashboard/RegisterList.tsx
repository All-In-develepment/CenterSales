import { observer } from "mobx-react-lite";
import { useStore } from "../../../app/stores/store";
import { Fragment } from "react/jsx-runtime";
import RegisterListItem from "./RegisterListItem";
import { Table, TableBody } from "semantic-ui-react";

export default observer(function RegisterList() {
  const { registerStore } = useStore();
  const { allRegisters } = registerStore;

  return (
    <>
      {
        <Fragment>
          <Table celled inverted selectable striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Data</Table.HeaderCell>
                <Table.HeaderCell>Total de leads</Table.HeaderCell>
                <Table.HeaderCell>Leads convertidos</Table.HeaderCell>
                <Table.HeaderCell>Média de conversão</Table.HeaderCell>
                <Table.HeaderCell>Total depositado</Table.HeaderCell>
                <Table.HeaderCell>Média de depósito</Table.HeaderCell>
                <Table.HeaderCell>Evento de origem</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {allRegisters.map(register => (
                <TableBody>
                  <RegisterListItem register={register} />
                </TableBody>
            ))}
          </Table>
        </Fragment>
      }
    </>
  )
});