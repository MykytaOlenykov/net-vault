import { Group, Select, Text, Button, SegmentedControl, Paper } from "@mantine/core";
import { IconCopy, IconDownload } from "@tabler/icons-react";
import type { Device, ConfigFile, ViewMode } from "./types";
import { ConfigDiffLegend } from "./ConfigDiffLegend";

interface ConfigDiffControlsProps {
  devices: Device[];
  selectedDevice: string | null;
  onDeviceChange: (deviceName: string | null) => void;
  leftConfig: ConfigFile | null;
  rightConfig: ConfigFile | null;
  onLeftConfigChange: (configPath: string | null) => void;
  onRightConfigChange: (configPath: string | null) => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onCopy: () => void;
  onExport: () => void;
}

export function ConfigDiffControls({
  devices,
  selectedDevice,
  onDeviceChange,
  leftConfig,
  rightConfig,
  onLeftConfigChange,
  onRightConfigChange,
  viewMode,
  onViewModeChange,
  onCopy,
  onExport,
}: ConfigDiffControlsProps) {
  const selectedDeviceData = devices.find((d) => d.name === selectedDevice);
  const configOptions = selectedDeviceData
    ? selectedDeviceData.configs.map((config) => ({
        value: config.path,
        label: `${config.date} (${config.name})`,
      }))
    : [];

  return (
    <Paper p="lg" radius="md" mb="xl" withBorder>
      <Group justify="space-between" mb="lg">
        <Group>
          <Select
            placeholder="Select device"
            value={selectedDevice}
            onChange={onDeviceChange}
            data={devices.map((device) => ({
              value: device.name,
              label: device.name,
            }))}
            w={200}
          />
          {selectedDeviceData && (
            <>
              <Select
                placeholder="Select version"
                value={leftConfig?.path || null}
                onChange={onLeftConfigChange}
                data={configOptions}
                w={250}
                disabled={!selectedDevice}
              />
              <Text c="dimmed">vs</Text>
              <Select
                placeholder="Select version"
                value={rightConfig?.path || null}
                onChange={onRightConfigChange}
                data={configOptions}
                w={250}
                disabled={!selectedDevice}
              />
            </>
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

