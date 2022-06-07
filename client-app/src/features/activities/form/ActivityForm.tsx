import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { store, useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import * as Yup from "yup";
import FrmTextInput from "../../../app/common/form/FrmTextInput";
import FrmSelectInput from "../../../app/common/form/FrmSelectInput";
import {
  categoryOptions,
  genderOptions,
} from "../../../app/common/options/categoryOptions";
import FrmDateInput from "../../../app/common/form/FrmDateInput";
import { Employee } from "../../../app/models/employee";
import { Form, Formik } from "formik";

interface Props {
  employee?: Employee;
}
export default observer(function ActivityForm({ employee: epl }: Props) {
  const history = useHistory();
  const { employeeStore } = useStore();
  const {
    createEmployee,
    updateEmployee,
    loading,
    loadEmployee,
    loadingInitial,
  } = employeeStore;

  const [employee, setEmployee] = useState<Employee>({
    id: "",
    name: "",
    birthDate: null,
    gender: "",
    email: "",
    cpf: "",
    startDate: null,
    team: "",
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("The employee name is required"),
    email: Yup.string().required("The employee email is required"),
    birthDate: Yup.string().required("Date is required").nullable(),
    gender: Yup.string().required("The employee gender is required"),
    cpf: Yup.string().required("The employee cpf is required"),
    startDate: Yup.string().required("Date is required").nullable(),
    team: Yup.string().required("The employee team is required"),
  });

  useEffect(() => {
    if (epl) loadEmployee(epl!.id).then((employee) => setEmployee(employee!));
  }, [epl, loadEmployee]);

  function handleFormSubmit(employee: Employee) {
    if (employee.id.length === 0) {
      let newEmployee = {
        ...employee,
        id: uuid(),
      };
      createEmployee(newEmployee).then(() => history.push(`/employees`));
    } else {
      updateEmployee(employee).then(() => history.push(`/employees`));
    }
  }

  if (loadingInitial) return <LoadingComponent content="Loading activity..." />;

  return (
    <Segment clearing>
      <Header content="Employee Details" sub color="teal" />
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={employee}
        onSubmit={(values) => handleFormSubmit(values)}
      >
        {({ handleSubmit, isValid, isSubmitting, dirty }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <FrmTextInput name="name" placeholder="Name" />

            <FrmTextInput name="email" placeholder="Email" />

            <FrmDateInput
              placeholderText="Birth Date"
              name="birthDate"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />

            <FrmSelectInput
              options={genderOptions}
              placeholder="Gender"
              name="gender"
            />
            <FrmTextInput name="cpf" placeholder="CPF" />

            <Header content="Team Details" sub color="teal" />
            <FrmDateInput
              placeholderText="Start Date"
              name="startDate"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />

            <FrmSelectInput
              options={categoryOptions}
              placeholder="Team"
              name="team"
            />

            <Button
              disabled={isSubmitting || !dirty || !isValid}
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to={`/employees`}
              floated="right"
              type="button"
              content="Cancel"
              onClick={() => {
                store.modalStore.closeModal();
              }}
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
});
