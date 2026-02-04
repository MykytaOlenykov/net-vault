import { Badge, Paper, Group, Text } from "@mantine/core";
import { Table } from "../../../shared/ui/table";
import type { DeviceConfigChange } from "../../../types/dashboardAnalytics";
import { DeviceConfigChangeColumns } from "./DeviceConfigChangeColumns";

interface DevicesConfigChangesTableProps {
  devices: DeviceConfigChange[];
}

export default function DevicesConfigChangesTable({
  devices,
}: DevicesConfigChangesTableProps) {
  return (
    <Paper radius="md" p="md">
      <Group justify="space-between" mb="md">
        <Text fw={500}>Devices with Config Changes (last 24h)</Text>

        <Badge variant="light" color="violet">
          {devices.length} devices
        </Badge>
      </Group>

      <Table<DeviceConfigChange>
        items={devices}
        columns={DeviceConfigChangeColumns}
      />
    </Paper>
  );
}
