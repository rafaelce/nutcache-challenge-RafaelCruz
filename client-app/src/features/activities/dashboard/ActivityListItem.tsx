import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Segment } from "semantic-ui-react";
import { format } from "date-fns";
import { Employee } from "../../../app/models/employee";

interface Props {
  employee: Employee;
}

export default function ActivityListItem({ employee }: Props) {
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              style={{ marginBottom: 3 }}
              size="tiny"
              circular
              src={"/assets/user.png"}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/employees/${employee.id}`}>
                {employee.name}
              </Item.Header>
              <Item.Description>Hosted by Bob</Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <span>
          <Icon name="clock" />{" "}
          {format(employee.birthDate!, "dd MMM yyyy h:mm aa")}
          <Icon name="marker" /> {employee.gender}
        </span>
      </Segment>
      <Segment>Attendees go here</Segment>
      <Segment clearing>
        <span>{employee.email}</span>
        <Button
          as={Link}
          to={`/exploy/${employee.id}`}
          color="teal"
          floated="right"
          content="View"
        />
      </Segment>
    </Segment.Group>
  );
}
