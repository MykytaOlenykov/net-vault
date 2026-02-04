import { Badge, Button, Text } from "@mantine/core";
import type { TableColumn } from "../../../shared/ui/table";
import type { Backup } from "../../../types/backup";
import { Download } from "lucide-react";

export const backupColumns: TableColumn<Backup>[] = [
  {
    key: "version",
    header: "Version",
    render: (b) => <Text>v{b.versionNumber}</Text>,
  },
  {
    key: "status",
    header: "Status",
    render: (b) => (
      <Badge variant="light" color={b.status === "Success" ? "teal" : "red"}>
        {b.status}
      </Badge>
    ),
  },
  {
    key: "finished",
    header: "Finished",
    render: (b) =>
      b.finishedAt ? new Date(b.finishedAt).toLocaleString() : "-",
  },
  {
    key: "changes",
    header: "Changes",
    render: (b) => b.changedLines,
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
