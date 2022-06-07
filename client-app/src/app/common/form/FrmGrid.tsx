import { observer } from "mobx-react-lite";
import { Fragment } from "react";
import { Table } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import FrmGridRow from "./FrmGridRow";

export default observer(function FrmGrid() {
  const { employeeStore } = useStore();
  const { groupedEmployees } = employeeStore;

  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>E-mail</Table.HeaderCell>
          <Table.HeaderCell>Start Date</Table.HeaderCell>
          <Table.HeaderCell>Team</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {groupedEmployees.map(([group, employees]) => (
          <Fragment key={group}>
            {employees.map((employee) => (
              <FrmGridRow key={employee.id} employee={employee} />
            ))}
          </Fragment>
        ))}
      </Table.Body>
    </Table>
  );
});
