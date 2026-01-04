import { Badge, Button, Text } from "@mantine/core";
import type { TableColumn } from "../../../shared/ui/table";
import type { Backup } from "../types";
import { Download } from "lucide-react";

export const backupColumns: TableColumn<Backup>[] = [
  {
    key: "version",
    header: "Version",
    render: (b) => <Text>v{b.version_number}</Text>,
  },
  {
    key: "status",
    header: "Status",
    render: (b) => (
      <Badge variant="light" color={b.status === "SUCCESS" ? "teal" : "red"}>
        {b.status}
      </Badge>
    ),
  },
  {
    key: "finished",
    header: "Finished",
    render: (b) =>
      b.finished_at ? new Date(b.finished_at).toLocaleString() : "-",
  },
  {
    key: "changes",
    header: "Changes",
    render: (b) => b.changed_lines,
  },
  {
    key: "actions",
    header: "Actions",
    stopRowClick: true,
    render: () => (
      <Button variant="light" size="xs" leftSection={<Download size="16" />}>
        Download
      </Button>
    ),
  },
];
