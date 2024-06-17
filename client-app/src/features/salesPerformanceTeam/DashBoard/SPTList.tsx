import { observer } from "mobx-react-lite";
import { Header, Table, TableBody } from "semantic-ui-react";
import { Fragment } from "react/jsx-runtime";
import { useStore } from "../../../app/stores/store";
import SPTListItem from "./SPTListItem";

export default observer(function SPTList() {
  const { salePerformanceTeamStore } = useStore();
  const { allSalePerformanceTeams } = salePerformanceTeamStore;

  return (
    <>
      <Fragment>
        <Table celled inverted selectable striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Vendedor</Table.HeaderCell>
              <Table.HeaderCell>Leads</Table.HeaderCell>
              <Table.HeaderCell>Vendas</Table.HeaderCell>
              <Table.HeaderCell>Cadastro</Table.HeaderCell>
              <Table.HeaderCell>Redeposito</Table.HeaderCell>
              <Table.HeaderCell>Total em vendas</Table.HeaderCell>
              <Table.HeaderCell>Cadastros + Redepositos</Table.HeaderCell>
              <Table.HeaderCell>Conversão Geral</Table.HeaderCell>
              <Table.HeaderCell>Projeto</Table.HeaderCell>
              <Table.HeaderCell>Data</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {allSalePerformanceTeams.map(sale => (
            <TableBody>
              <SPTListItem sale={sale} />
            </TableBody>
          ))}
        </Table>
      </Fragment>
    </>
  )
});