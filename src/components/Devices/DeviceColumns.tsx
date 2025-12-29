import type { TableColumn } from "../../shared/ui/table/types/table-column";
import type { Device } from "./types";

import { DeviceActionsMenu } from "./DeviceActionsMenu";
import { DeviceStatusCell } from "./DeviceStatusCell";
import { Badge } from "@mantine/core";

export const deviceColumns: TableColumn<Device>[] = [
  {
    key: "id",
    header: "ID",
    render: (d) => d.id,
  },
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
        {d.ip_address}
      </Badge>
    ),
  },
  {
    key: "device_type",
    header: "Type",
    render: (d) => (
      <Badge radius={"xl"} variant="light">
        {d.device_type}
      </Badge>
    ),
  },
  {
    key: "last_backup_status",
    header: "Status",
    render: (d) => <DeviceStatusCell status={d.last_backup_status} />,
  },
  {
    key: "last_backup_at",
    header: "Last Backup",
    render: (d) => d.last_backup_at ?? "—",
  },
  {
    key: "actions",
    header: "Actions",
    stopRowClick: true,
    render: (d) => <DeviceActionsMenu device={d} />,
  },
];
