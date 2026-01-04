import { Paper, Text } from "@mantine/core";
import type { ChangeHistoryItem } from "../types";
import { Table } from "../../../shared/ui/table";
import { changeHistoryColumns } from "./changeHistoryColumns";
interface Props {
  changes: ChangeHistoryItem[];
}

export const ChangeHistoryTab = ({ changes }: Props) => {
  if (!changes.length) {
    return <Text c="dimmed">No change history</Text>;
  }

  return (
    <Paper radius="md">
      <Table items={changes} columns={changeHistoryColumns}></Table>
    </Paper>
  );
};
