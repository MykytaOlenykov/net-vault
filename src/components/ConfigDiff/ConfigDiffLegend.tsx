import { Group, Box, Text } from "@mantine/core";

export function ConfigDiffLegend() {
  return (
    <Group gap="xl">
      <Group gap="xs">
        <Box
          style={{
            width: 16,
            height: 16,
            backgroundColor: "rgba(239, 68, 68, 0.3)",
            border: "1px solid rgba(239, 68, 68, 0.5)",
            borderRadius: 4,
          }}
        />
        <Text size="sm" c="dimmed">
          Removed
        </Text>
      </Group>
      <Group gap="xs">
        <Box
          style={{
            width: 16,
            height: 16,
            backgroundColor: "rgba(16, 185, 129, 0.3)",
            border: "1px solid rgba(16, 185, 129, 0.5)",
            borderRadius: 4,
          }}
        />
        <Text size="sm" c="dimmed">
          Added
        </Text>
      </Group>
      <Group gap="xs">
        <Box
          style={{
            width: 16,
            height: 16,
            backgroundColor: "rgba(245, 158, 11, 0.3)",
            border: "1px solid rgba(245, 158, 11, 0.5)",
            borderRadius: 4,
          }}
        />
        <Text size="sm" c="dimmed">
          Modified
        </Text>
      </Group>
    </Group>
  );
}

