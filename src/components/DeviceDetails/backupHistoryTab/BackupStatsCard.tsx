import { Card, Text, Group, Box, RingProgress, ThemeIcon } from "@mantine/core";
import type { Backup } from "../../../types/backup";

interface Props {
  backups: Backup[];
}

export const BackupStatsCard = ({ backups }: Props) => {
  const total = backups.length;

  const successCount = backups.filter((b) => b.status === "Success").length;

  const failedCount = total - successCount;

  const successRate = total ? Math.round((successCount / total) * 100) : 0;

  return (
    <Card padding="xl" radius="md">
      <Text fw={500} mb="xl">
        Backup Success Rate
      </Text>

      <Group justify="center">
        <RingProgress
          size={160}
          thickness={14}
          sections={[
            { value: successRate, color: "teal" },
            { value: 100 - successRate, color: "red" },
          ]}
          label={
            <Text ta="center" size="xl" fw={700}>
              {successRate}%
            </Text>
          }
        />
      </Group>

      <Box mt="xl">
        <Group justify="space-between" mb="xs">
          <Group gap="xs">
            <ThemeIcon size={12} radius="xl" color="teal" variant="filled" />
            <Text size="sm" c="dimmed">
              Successful
            </Text>
          </Group>
          <Text size="sm" fw={500}>
            {successCount}
          </Text>
        </Group>

        <Group justify="space-between">
          <Group gap="xs">
            <ThemeIcon size={12} radius="xl" color="red" variant="filled" />
            <Text size="sm" c="dimmed">
              Failed
            </Text>
          </Group>
          <Text size="sm" fw={500}>
            {failedCount}
          </Text>
        </Group>
      </Box>
    </Card>
  );
};
