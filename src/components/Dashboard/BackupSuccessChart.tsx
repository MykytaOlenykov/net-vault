import { Card, Text, Group, RingProgress, Stack } from "@mantine/core";
import type { BackupStats } from "./types";

interface Props {
  stats: BackupStats;
}

export default function BackupSuccessChart({ stats }: Props) {
  return (
    <Card padding="xl" radius="md" h="100%">
      <Text fw={500} size="lg" mb="xl">
        Backup Success Rate
      </Text>

      <Group justify="center">
        <RingProgress
          size={200}
          thickness={18}
          sections={[
            { value: stats?.successRate, color: "teal" },
            { value: 100 - stats?.successRate, color: "red" },
          ]}
          label={
            <Text ta="center" size="xl" fw={700}>
              {stats?.successRate ?? 0}%
            </Text>
          }
        />
      </Group>

      <Stack gap="xs" mt="xl">
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Successful
          </Text>
          <Text size="sm" fw={500}>
            {stats?.success}
          </Text>
        </Group>
        <Group justify="space-between">
          <Text size="sm" c="dimmed">
            Failed
          </Text>
          <Text size="sm" fw={500} c="red">
            {stats?.failed}
          </Text>
        </Group>
      </Stack>
    </Card>
  );
}
