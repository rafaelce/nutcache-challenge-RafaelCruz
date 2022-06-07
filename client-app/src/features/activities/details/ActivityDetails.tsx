import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

export default observer(function ActivityDetails() {
  const { employeeStore } = useStore();
  const {
    selectedEmployee: employee,
    loadEmployee,
    loadingInitial,
  } = employeeStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadEmployee(id);
  }, [id, loadEmployee]);

  if (loadingInitial || !employee) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityDetailedHeader employee={employee} />
        <ActivityDetailedInfo employee={employee} />
        <ActivityDetailedChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
});
