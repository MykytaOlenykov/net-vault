import { Grid, Paper, Text } from "@mantine/core";
import { Table } from "../../../shared/ui/table";
import type { Backup } from "../../../types/backup";
import { getBackupsColumns } from "./backupColumns";
import { BackupStatsCard } from "./BackupStatsCard";
import { useDownloadConfig } from "../hooks/useDownloadConfig";

interface Props {
  backups: Backup[] | undefined;
}

export const BackupHistoryTab = ({ backups }: Props) => {
  const { downloadText } = useDownloadConfig();
  if (!backups?.length) {
    return <Text c="dimmed">No backups available</Text>;
  }
  const handleDownload = (backup: Backup) => {
    if (!backup.configText) return;
    downloadText(backup.configText, `backup_v${backup.versionNumber}.txt`);
  };

  return (
    <Grid>
      <Grid.Col span={4}>
        <BackupStatsCard backups={backups} />
      </Grid.Col>

      <Grid.Col span={8}>
        <Paper radius="md">
          <Table items={backups} columns={getBackupsColumns(handleDownload)} />
        </Paper>
      </Grid.Col>
    </Grid>
  );
};
