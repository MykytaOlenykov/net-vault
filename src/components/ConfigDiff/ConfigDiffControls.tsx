import { Group, Select, Text, Button, SegmentedControl, Paper } from "@mantine/core";
import { IconCopy, IconDownload } from "@tabler/icons-react";
import type { Device, ConfigFile, ViewMode } from "./types";
import { ConfigDiffLegend } from "./ConfigDiffLegend";

interface ConfigDiffControlsProps {
  devices: Device[];
  leftDevice: string | null;
  rightDevice: string | null;
  onLeftDeviceChange: (deviceName: string | null) => void;
  onRightDeviceChange: (deviceName: string | null) => void;
  leftConfig: ConfigFile | null;
  rightConfig: ConfigFile | null;
  onLeftConfigChange: (configId: string | null) => void;
  onRightConfigChange: (configId: string | null) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onCopy: () => void;
  onExport: () => void;
}

export function ConfigDiffControls({
  devices,
  leftDevice,
  rightDevice,
  onLeftDeviceChange,
  onRightDeviceChange,
  leftConfig,
  rightConfig,
  onLeftConfigChange,
  onRightConfigChange,
  viewMode,
  onViewModeChange,
  onCopy,
  onExport,
}: ConfigDiffControlsProps) {
  const leftDeviceData = devices.find((d) => d.id === leftDevice);
  const rightDeviceData = devices.find((d) => d.id === rightDevice);

  const leftConfigOptions = leftDeviceData
    ? leftDeviceData.configs.map((config) => ({
        value: config.id,
        label: `${config.date} (${config.name})`,
      }))
    : [];

  const rightConfigOptions = rightDeviceData
    ? rightDeviceData.configs.map((config) => ({
        value: config.id,
        label: `${config.date} (${config.name})`,
      }))
    : [];

  return (
    <Paper p="lg" radius="md" mb="xl" withBorder>
      <Group justify="space-between" mb="lg">
        <Group>
          <Select
            placeholder="Select left device"
            value={leftDevice}
            onChange={onLeftDeviceChange}
            data={devices.map((device) => ({
              value: device.id,
              label: device.name,
            }))}
            w={200}
          />
          {leftDeviceData && (
            <Select
              placeholder="Select left config"
              value={leftConfig?.id || null}
              onChange={onLeftConfigChange}
              data={leftConfigOptions}
              w={250}
              disabled={!leftDevice}
            />
          )}
          <Text c="dimmed">vs</Text>
          <Select
            placeholder="Select right device"
            value={rightDevice}
            onChange={onRightDeviceChange}
            data={devices.map((device) => ({
              value: device.id,
              label: device.name,
            }))}
            w={200}
          />
          {rightDeviceData && (
            <Select
              placeholder="Select right config"
              value={rightConfig?.id || null}
              onChange={onRightConfigChange}
              data={rightConfigOptions}
              w={250}
              disabled={!rightDevice}
            />
          )}
        </Group>

        <Group>
          <SegmentedControl
            value={viewMode}
            onChange={(value) => onViewModeChange(value as ViewMode)}
            data={[
              { value: "split", label: "Split View" },
              { value: "unified", label: "Unified View" },
            ]}
          />
          <Button
            variant="default"
            leftSection={<IconCopy size={16} />}
            onClick={onCopy}
            disabled={!leftConfig || !rightConfig}
          >
            Copy
          </Button>
          <Button
            variant="default"
            leftSection={<IconDownload size={16} />}
            onClick={onExport}
            disabled={!leftConfig || !rightConfig}
          >
            Export
          </Button>
        </Group>
      </Group>

      <ConfigDiffLegend />
    </Paper>
  );
}

