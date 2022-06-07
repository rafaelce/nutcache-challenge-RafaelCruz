import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import { Segment, Grid, Icon } from "semantic-ui-react";
import { Employee } from "../../../app/models/employee";

interface Props {
  employee: Employee;
}

export default observer(function ActivityDetailedInfo({ employee }: Props) {
  return (
    <Segment.Group>
      <Segment attached="top">
        <Grid>
          <Grid.Column width={1}>
            <Icon size="large" color="teal" name="info" />
          </Grid.Column>
          <Grid.Column width={15}>
            <p>{employee.name}</p>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="calendar" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={15}>
            <span>{format(employee.birthDate!, "dd MMM yyyy h:mm aa")}</span>
          </Grid.Column>
        </Grid>
      </Segment>
      <Segment attached>
        <Grid verticalAlign="middle">
          <Grid.Column width={1}>
            <Icon name="marker" size="large" color="teal" />
          </Grid.Column>
          <Grid.Column width={11}>
            <span>
              {employee.email}, {employee.cpf}
            </span>
          </Grid.Column>
        </Grid>
      </Segment>
    </Segment.Group>
  );
});
