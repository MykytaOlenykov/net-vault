import { Paper, Group, Text, Code, Badge, Button } from "@mantine/core";
import { Download } from "lucide-react";
import { useNavigate } from "react-router";
import type { Configuration } from "./types";
import { useDownloadConfig } from "./hooks/useDownloadConfig";

interface Props {
  configuration: Configuration | null;
  deviceId: string;
}

export const ConfigurationTab = ({ configuration, deviceId }: Props) => {
  const navigate = useNavigate();
  const { downloadText } = useDownloadConfig();

  if (!configuration) {
    return <Text c="dimmed">No configuration available</Text>;
  }

  const handleDownload = () => {
    downloadText(
      configuration.configText,
      `config_v${configuration.version}.txt`,
    );
  };

  const handleCompareVersions = () => {
    // Navigate to config-diff page with deviceId and current configId
    navigate(
      `/config-diff?deviceId=${deviceId}&configId=${configuration.backupId}`,
    );
  };

  return (
    <Paper p="lg" radius="md">
      <Group justify="space-between" mb="sm">
        <Group>
          <Text fw={500}>Current configuration</Text>
          <Badge variant="light">v{configuration.version}</Badge>
        </Group>
        <Group mb={"sm"}>
          <Button
            size="sm"
            variant="default"
            leftSection={<Download size={14} />}
            onClick={handleDownload}
          >
            Download
          </Button>

          <Button size="sm" variant="default" onClick={handleCompareVersions}>
            Compare Versions
          </Button>
        </Group>
      </Group>

      <Code block style={{ maxHeight: 500, overflow: "auto" }}>
        {configuration.configText}
      </Code>
    </Paper>
  );
};
