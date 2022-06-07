import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { useStore } from "../../../app/stores/store";
import ActivityList from "./ActivityList";

export default observer(function ActivityDashboard() {
  const { employeeStore } = useStore();
  const { loadEmployees, employeeRegistry } = employeeStore;

  useEffect(() => {
    if (employeeRegistry.size <= 1) loadEmployees();
  }, [employeeRegistry.size, loadEmployees]);

  if (employeeStore.loadingInitial)
    return <LoadingComponent content="Loading employees..." />;

  return (
    <Grid>
      <Grid.Column>
        <ActivityList />
      </Grid.Column>
    </Grid>
  );
});
