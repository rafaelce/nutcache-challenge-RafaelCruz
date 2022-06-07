import React, { useEffect } from "react";
import { Button, Modal, Table } from "semantic-ui-react";
import { format } from "date-fns";
import { Employee } from "../../../app/models/employee";
import { useStore } from "../../stores/store";
import ActivityForm from "../../../features/activities/form/ActivityForm";

interface Props {
  employee: Employee;
}

export default function FrmGridRow({ employee }: Props) {
  const { modalStore, employeeStore } = useStore();
  const { deleteEmployee } = employeeStore;

  function exampleReducer(state: any, action: any) {
    switch (action.type) {
      case "close":
        return {
          open: false,
          id: action.id,
        };
      case "closef":
        return {
          open: false,
          id: null,
        };
      case "open": {
        return {
          open: true,
          size: action.size,
        };
      }

      default:
        throw new Error("Unsupported action...");
    }
  }

  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    size: undefined,
    id: undefined,
  });
  const { open, size } = state;

  useEffect(() => {
    if (state.id) {
      deleteEmployee(state.id);
      dispatch({ type: "close", id: null });
    }
  }, [state, deleteEmployee]);

  return (
    <>
      <Table.Row>
        <Table.Cell>{employee.name}</Table.Cell>
        <Table.Cell>{employee.email}</Table.Cell>
        <Table.Cell>{format(employee.startDate!, "dd/MM/yyyy")}</Table.Cell>
        <Table.Cell>{employee.team}</Table.Cell>
        <Table.Cell textAlign="center">
          <Button.Group>
            <Button
              color="blue"
              onClick={() =>
                modalStore.openModal(<ActivityForm employee={employee} />)
              }
            >
              Edit
            </Button>
            <Button.Or />
            <Button
              negative
              name={employee.id}
              onClick={() => dispatch({ type: "open", size: "mini" })}
              floated="right"
              color="red"
            >
              Delete
            </Button>
          </Button.Group>
        </Table.Cell>
      </Table.Row>

      <Modal
        size={size}
        open={open}
        onClose={() => dispatch({ type: "closef" })}
      >
        <Modal.Header>Delete an Employee</Modal.Header>
        <Modal.Content>
          <p>
            Are you sure you want to delete <b>{employee.name} ?</b>
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button negative onClick={() => dispatch({ type: "close" })}>
            No
          </Button>
          <Button
            positive
            onClick={() => dispatch({ type: "close", id: employee.id })}
          >
            Yes
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
}
