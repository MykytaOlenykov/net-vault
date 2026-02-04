import { Text, Grid, Stack } from "@mantine/core";
import MetricCard from "../../components/Dashboard/MetricCard";
import BackupSuccessChart from "../../components/Dashboard/BackupSuccessChart";
import DevicesConfigChangesTable from "../../components/Dashboard/DevicesConfigChangesTable/DevicesConfigChangesTable";
import { useDashboardAnalytics } from "../../components/Dashboard/hooks/useDashboardAnalytics";

export default function DashboardPage() {
  const { metrics, backupStats, deviceConfigChanges, isLoading } =
    useDashboardAnalytics();

  if (isLoading) {
    return <Text>Loading dashboard analytics...</Text>;
  }

  return (
    <Stack gap="xl">
      <Grid gutter="lg">
        <Grid.Col span={"auto"}>
          <Grid gutter="lg">
            {metrics.map((metric) => (
              <Grid.Col span={6} key={metric.label}>
                <MetricCard metric={metric} />
              </Grid.Col>
            ))}
          </Grid>
        </Grid.Col>

        <Grid.Col span={4}>
          {backupStats && <BackupSuccessChart stats={backupStats} />}
        </Grid.Col>
      </Grid>

      <DevicesConfigChangesTable devices={deviceConfigChanges ?? []} />
    </Stack>
  );
}
