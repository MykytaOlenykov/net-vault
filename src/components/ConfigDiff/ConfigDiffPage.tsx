import { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";
import type { Device, ConfigFile, ViewMode, ConfigDiffData } from "./types";
import { ConfigDiffControls } from "./ConfigDiffControls";
import { ConfigDiffViewer } from "./ConfigDiffViewer";
import {
  getDevices,
  loadConfigFile,
  calculateDiff,
  formatUnifiedDiff,
} from "./utils";

export function ConfigDiffPage() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);
  const [leftConfig, setLeftConfig] = useState<ConfigFile | null>(null);
  const [rightConfig, setRightConfig] = useState<ConfigFile | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [diffData, setDiffData] = useState<ConfigDiffData | null>(null);
  const [loading, setLoading] = useState(false);

  // Load devices on mount
  useEffect(() => {
    getDevices()
      .then(setDevices)
      .catch((error) => {
        console.error("Failed to load devices:", error);
        notifications.show({
          title: "Error",
          message: "Failed to load devices",
          color: "red",
        });
      });
  }, []);

  // Auto-select first device and configs
  useEffect(() => {
    if (devices.length > 0 && !selectedDevice) {
      const firstDevice = devices[0];
      // Use setTimeout to avoid synchronous setState in effect
      setTimeout(() => {
        setSelectedDevice(firstDevice.name);
        if (firstDevice.configs.length >= 2) {
          // Select oldest and newest
          setLeftConfig(firstDevice.configs[firstDevice.configs.length - 1]);
          setRightConfig(firstDevice.configs[0]);
        } else if (firstDevice.configs.length === 1) {
          setRightConfig(firstDevice.configs[0]);
        }
      }, 0);
    }
  }, [devices, selectedDevice]);

  // Load and calculate diff when configs change
  useEffect(() => {
    if (!leftConfig || !rightConfig) {
      // Use setTimeout to avoid synchronous setState in effect
      setTimeout(() => setDiffData(null), 0);
      return;
    }

    setLoading(true);
    Promise.all([
      loadConfigFile(leftConfig.path),
      loadConfigFile(rightConfig.path),
    ])
      .then(([leftContent, rightContent]) => {
        const hunks = calculateDiff(leftContent, rightContent);
        setDiffData({
          left: {
            content: leftContent,
            filename: leftConfig.name,
            date: leftConfig.date,
          },
          right: {
            content: rightContent,
            filename: rightConfig.name,
            date: rightConfig.date,
          },
          hunks,
        });
      })
      .catch((error) => {
        console.error("Failed to load configs:", error);
        notifications.show({
          title: "Error",
          message: "Failed to load configuration files",
          color: "red",
        });
        setDiffData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [leftConfig, rightConfig]);

  const handleDeviceChange = (deviceName: string | null) => {
    setSelectedDevice(deviceName);
    setLeftConfig(null);
    setRightConfig(null);
    setDiffData(null);

    if (deviceName) {
      const device = devices.find((d) => d.name === deviceName);
      if (device && device.configs.length >= 2) {
        setLeftConfig(device.configs[device.configs.length - 1]);
        setRightConfig(device.configs[0]);
      } else if (device && device.configs.length === 1) {
        setRightConfig(device.configs[0]);
      }
    }
  };

  const handleLeftConfigChange = (configPath: string | null) => {
    if (!configPath) {
      setLeftConfig(null);
      return;
    }
    const device = devices.find((d) => d.name === selectedDevice);
    const config = device?.configs.find((c) => c.path === configPath);
    setLeftConfig(config || null);
  };

  const handleRightConfigChange = (configPath: string | null) => {
    if (!configPath) {
      setRightConfig(null);
      return;
    }
    const device = devices.find((d) => d.name === selectedDevice);
    const config = device?.configs.find((c) => c.path === configPath);
    setRightConfig(config || null);
  };

  const handleCopy = () => {
    if (!diffData) return;

    const text =
      viewMode === "unified"
        ? formatUnifiedDiff(
            diffData.left.filename,
            diffData.right.filename,
            diffData.left.date,
            diffData.right.date,
            diffData.hunks,
          )
        : `Left: ${diffData.left.filename} (${diffData.left.date})\nRight: ${diffData.right.filename} (${diffData.right.date})\n\n${diffData.left.content}\n\n---\n\n${diffData.right.content}`;

    navigator.clipboard.writeText(text).then(() => {
      notifications.show({
        title: "Copied",
        message: "Diff copied to clipboard",
        color: "green",
      });
    });
  };

  const handleExport = () => {
    if (!diffData) return;

    const content =
      viewMode === "unified"
        ? formatUnifiedDiff(
            diffData.left.filename,
            diffData.right.filename,
            diffData.left.date,
            diffData.right.date,
            diffData.hunks,
          )
        : `Left: ${diffData.left.filename} (${diffData.left.date})\nRight: ${diffData.right.filename} (${diffData.right.date})\n\n${diffData.left.content}\n\n---\n\n${diffData.right.content}`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `config-diff-${diffData.left.filename}-${diffData.right.filename}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    notifications.show({
      title: "Exported",
      message: "Diff exported successfully",
      color: "green",
    });
  };

  return (
    <>
      <ConfigDiffControls
        devices={devices}
        selectedDevice={selectedDevice}
        onDeviceChange={handleDeviceChange}
        leftConfig={leftConfig}
        rightConfig={rightConfig}
        onLeftConfigChange={handleLeftConfigChange}
        onRightConfigChange={handleRightConfigChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onCopy={handleCopy}
        onExport={handleExport}
      />
      {loading ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>Loading...</div>
      ) : (
        <ConfigDiffViewer data={diffData} viewMode={viewMode} />
      )}
    </>
  );
}
