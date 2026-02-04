import { Card, Text, Stack, Paper, Group, Badge } from '@mantine/core';

export default function RecentActivityCard() {
  return (
    <Card padding="lg" radius="md" className="bg-[#1a1b26] border border-[rgba(139,92,246,0.15)]">
      <Text fw={500} mb="md">Recent Activity</Text>
      <Stack gap="md">
        <Paper p="md" className="bg-[#24253a]" radius="sm">
          <Group justify="space-between" mb={4}>
            <Text size="sm" fw={500}>Config Changes</Text>
            <Badge color="violet" variant="light" size="sm">+15</Badge>
          </Group>
          <Text size="xs" c="dimmed">Last 24 hours</Text>
        </Paper>
        <Paper p="md" className="bg-[#24253a]" radius="sm">
          <Group justify="space-between" mb={4}>
            <Text size="sm" fw={500}>Backups Completed</Text>
            <Badge color="teal" variant="light" size="sm">892</Badge>
          </Group>
          <Text size="xs" c="dimmed">Last 24 hours</Text>
        </Paper>
        <Paper p="md" className="bg-[#24253a]" radius="sm">
          <Group justify="space-between" mb={4}>
            <Text size="sm" fw={500}>New Devices</Text>
            <Badge color="indigo" variant="light" size="sm">+8</Badge>
          </Group>
          <Text size="xs" c="dimmed">Last 7 days</Text>
        </Paper>
        <Paper p="md" className="bg-[#24253a]" radius="sm">
          <Group justify="space-between" mb={4}>
            <Text size="sm" fw={500}>Alerts Triggered</Text>
            <Badge color="red" variant="light" size="sm">23</Badge>
          </Group>
          <Text size="xs" c="dimmed">Last 24 hours</Text>
        </Paper>
      </Stack>
    </Card>
  );
}
