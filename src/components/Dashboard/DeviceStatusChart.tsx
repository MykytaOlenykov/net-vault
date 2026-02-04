import { Card, Text, Group, RingProgress, Stack, Box } from '@mantine/core';

export default function DeviceStatusChart() {
  return (
    <Card padding="xl" radius="md" className="bg-[#1a1b26] border border-[rgba(139,92,246,0.15)]">
      <Text fw={500} mb="xl">Device Status</Text>
      <Group justify="center">
        <RingProgress
          size={180}
          thickness={16}
          sections={[
            { value: 82, color: 'teal' },
            { value: 12, color: 'yellow' },
            { value: 6, color: 'red' },
          ]}
          label={
            <Text ta="center" size="xl" fw={700}>
              1,247
            </Text>
          }
        />
      </Group>
      <Stack gap="xs" mt="xl">
        <Group justify="space-between">
          <Group gap="xs">
            <Box className="w-3 h-3 rounded-full bg-teal-500" />
            <Text size="sm" c="dimmed">Online</Text>
          </Group>
          <Text size="sm" fw={500}>1,023</Text>
        </Group>
        <Group justify="space-between">
          <Group gap="xs">
            <Box className="w-3 h-3 rounded-full bg-yellow-500" />
            <Text size="sm" c="dimmed">Warning</Text>
          </Group>
          <Text size="sm" fw={500}>149</Text>
        </Group>
        <Group justify="space-between">
          <Group gap="xs">
            <Box className="w-3 h-3 rounded-full bg-red-500" />
            <Text size="sm" c="dimmed">Offline</Text>
          </Group>
          <Text size="sm" fw={500}>75</Text>
        </Group>
      </Stack>
    </Card>
  );
}
