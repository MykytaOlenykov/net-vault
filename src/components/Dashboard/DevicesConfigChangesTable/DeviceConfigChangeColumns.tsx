import { Badge, Text } from "@mantine/core";
import type { TableColumn } from "../../../shared/ui/table";
import type { DeviceConfigChange } from "../../../types/dashboardAnalytics";
import { DeviceConfigChangeActionsMenu } from "../DeviceConfigChangeActionsMenu";

export const DeviceConfigChangeColumns: TableColumn<DeviceConfigChange>[] = [
  {
    key: "device",
    header: "Device",
    render: (device) => device.deviceName,
  },
  {
    key: "changes",
    header: "Config Changes",
    render: (device) => (
      <Badge color="violet" variant="light">
        {device.changesCount} changes
      </Badge>
    ),
  },
  {
    key: "lastBackup",
    header: "Last Backup",
    render: (device) => (
      <Text size="sm" c="dimmed">
        {new Date(device.lastBackupAt).toLocaleString()}
      </Text>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    stopRowClick: true,
    render: (d) => <DeviceConfigChangeActionsMenu device={d} />,
  },
];
