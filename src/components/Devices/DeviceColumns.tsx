import type { TableColumn } from "../../shared/ui/table/types/table-column";
import type { Device } from "../../types/device";
import { DeviceActionsMenu } from "./DeviceActionsMenu";
import { Badge, Flex, Text } from "@mantine/core";

export const deviceColumns: TableColumn<Device>[] = [
  {
    key: "name",
    header: "Name",
    render: (d) => d.name,
  },
  {
    key: "ip_address",
    header: "IP Address",
    render: (d) => (
      <Badge radius="sm" variant="light">
        {d.ipAddress}
      </Badge>
    ),
  },
  {
    key: "port",
    header: "Port",
    render: (d) => <Text variant="light">{d.port}</Text>,
  },
  {
    key: "deviceType",
    header: "Type",
    render: (d) => (
      <Badge radius="xl" variant="light">
        {d.deviceType.vendor}
      </Badge>
    ),
  },
  {
    key: "isActive",
    header: "Status",
    render: ({ isActive }) => (
      <Badge variant="light" color={isActive ? "teal" : "red"}>
        {isActive ? "online" : "offline"}
      </Badge>
    ),
  },
  {
    key: "tags",
    header: "Tags",
    render: (d) => (
      <Flex gap={4} wrap={"wrap"}>
        {d.deviceTags.length > 0
          ? d.deviceTags.map(({ tag }, index) => (
              <Badge key={tag.name || index} variant="light">
                {tag.name}
              </Badge>
            ))
          : "—"}
      </Flex>
    ),
  },
  {
    key: "backup_schedule",
    header: "Backup Schedule",
    render: (d) => (
      <span style={{ color: "var(--mantine-color-dimmed)" }}>
        {d.backupSchedule ?? "—"}
      </span>
    ),
  },
  {
    key: "last_backup_at",
    header: "Last Backup",
    render: (d) => (
      <span style={{ color: "var(--mantine-color-dimmed)" }}>
        {new Date(d.lastBackup).toLocaleString() ?? "—"}
      </span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    stopRowClick: true,
    render: (d) => <DeviceActionsMenu device={d} />,
  },
];
