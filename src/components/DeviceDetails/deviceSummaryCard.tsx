import { Paper, Group, Text, Badge, Grid, Code, Button } from "@mantine/core";
import { IconEdit, IconRefresh } from "@tabler/icons-react";
import type { Device } from "../Devices";

interface Props {
  device: Device;
  onEdit?: (deviceId: string) => void;
  onTriggerBackup?: () => void;
  isPending?: boolean;
}

export const DeviceSummaryCard = ({
  device,
  onEdit,
  onTriggerBackup,
  isPending,
}: Props) => {
  return (
    <>
      <Paper p="lg" radius="md" mb="xl">
        <Group justify="space-between" mb="md">
          <Group>
            <Text fw={600}>{device.name}</Text>
            <Badge variant="light" color={device.isActive ? "teal" : "red"}>
              {device.isActive ? "online" : "offline"}
            </Badge>
          </Group>

          <Group>
            <Button
              variant="default"
              leftSection={<IconEdit size={16} />}
              onClick={() => onEdit?.(device.id)}
            >
              Edit Device
            </Button>

            <Button
              leftSection={<IconRefresh size={16} />}
              disabled={!device.isActive || isPending}
              onClick={onTriggerBackup}
            >
              Trigger Backup
            </Button>
          </Group>
        </Group>

        <Grid>
          <Grid.Col span={3}>
            <Text size="xs" c="dimmed">
              IP Address
            </Text>
            <Code>{device.ipAddress}</Code>
          </Grid.Col>

          <Grid.Col span={3}>
            <Text size="xs" c="dimmed">
              Vendor
            </Text>
            <Text>{device.deviceType.vendor}</Text>
          </Grid.Col>

          <Grid.Col span={3}>
            <Text size="xs" c="dimmed">
              Backup schedule
            </Text>
            <Text>{device.backupSchedule}</Text>
          </Grid.Col>

          <Grid.Col span={3}>
            <Text size="xs" c="dimmed">
              Created
            </Text>
            <Text size="sm">{new Date(device.createdAt).toDateString()}</Text>
          </Grid.Col>
        </Grid>
      </Paper>
    </>
  );
};
