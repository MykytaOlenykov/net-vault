import { Grid, Paper, Text } from "@mantine/core";
import { Table } from "../../../shared/ui/table";
import type { Backup } from "../types";
import { backupColumns } from "./backupColumns";
import { BackupStatsCard } from "./BackupStatsCard";

interface Props {
  backups: Backup[];
}

export const BackupHistoryTab = ({ backups }: Props) => {
  if (!backups.length) {
    return <Text c="dimmed">No backups available</Text>;
  }

  return (
    <Grid>
      <Grid.Col span={4}>
        <BackupStatsCard backups={backups} />
      </Grid.Col>

      <Grid.Col span={8}>
        <Paper radius="md">
          <Table items={backups} columns={backupColumns} />
        </Paper>
      </Grid.Col>
    </Grid>
  );
};
