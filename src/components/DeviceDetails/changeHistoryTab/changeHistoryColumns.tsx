import { Button, Text } from "@mantine/core";
import type { TableColumn } from "../../../shared/ui/table";
import type { ChangeHistoryItem } from "../types";

export const changeHistoryColumns: TableColumn<ChangeHistoryItem>[] = [
  {
    key: "timestamp",
    header: "Timestamp",
    render: (c) => (
      <Text c="dimmed" size="sm">
        {new Date(c.timestamp).toLocaleString()}
      </Text>
    ),
  },
  {
    key: "user",
    header: "User",
    render: (c) => (
      <Text c="dimmed" size="sm">
        {c.user}
      </Text>
    ),
  },
  {
    key: "description",
    header: "Description",
    render: (c) => <Text size="xs">{c.description}</Text>,
  },
  {
    key: "actions",
    header: "Actions",
    stopRowClick: true,
    render: () => (
      <Button variant="light" size="xs">
        View Diff
      </Button>
    ),
  },
];
