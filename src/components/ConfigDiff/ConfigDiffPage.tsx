import { useState, useEffect, useMemo } from "react";
import { notifications } from "@mantine/notifications";
import { Loader, Center } from "@mantine/core";
import { useSearchParams } from "react-router";
import type { ViewMode, ConfigDiffData } from "./types";
import { ConfigDiffControls } from "./ConfigDiffControls";
import { ConfigDiffViewer } from "./ConfigDiffViewer";
import {
  useGetDevicesWithConfigs,
  useGetDeviceConfigs,
  useCompareConfigs,
} from "./hooks";
import { calculateDiff, formatUnifiedDiff } from "./utils";

export function ConfigDiffPage() {
  const [searchParams] = useSearchParams();
  const urlDeviceId = searchParams.get("deviceId");
  const urlConfigId = searchParams.get("configId");

  const [leftDeviceId, setLeftDeviceId] = useState<string | null>(null);
  const [rightDeviceId, setRightDeviceId] = useState<string | null>(null);
  const [leftConfigId, setLeftConfigId] = useState<string | null>(null);
  const [rightConfigId, setRightConfigId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const [diffData, setDiffData] = useState<ConfigDiffData | null>(null);

  const { data: devices = [], isLoading: devicesLoading } =
    useGetDevicesWithConfigs();

  const { data: leftConfigs = [] } = useGetDeviceConfigs(leftDeviceId);
  const { data: rightConfigs = [] } = useGetDeviceConfigs(rightDeviceId);

  const { data: compareData, isLoading: compareLoading } = useCompareConfigs(
    leftConfigId,
    rightConfigId,
  );

  // Initialize from URL parameters or auto-select first device
  useEffect(() => {
    if (devices.length > 0 && !leftDeviceId && !rightDeviceId) {
      if (urlDeviceId) {
        // If deviceId is provided in URL, use it for both sides
        const device = devices.find((d) => d.id === urlDeviceId);
        if (device) {
          setTimeout(() => {
            setLeftDeviceId(device.id);
            setRightDeviceId(device.id);
          }, 0);
        }
      } else {
        // Otherwise, auto-select first device
        const firstDevice = devices[0];
        setTimeout(() => {
          setLeftDeviceId(firstDevice.id);
          setRightDeviceId(firstDevice.id);
        }, 0);
      }
    }
  }, [devices, leftDeviceId, rightDeviceId, urlDeviceId]);

  // Auto-select configs when devices are selected
  useEffect(() => {
    if (leftConfigs.length > 0 && !leftConfigId) {
      if (urlConfigId && urlDeviceId === leftDeviceId) {
        // If configId is provided in URL and matches the device, use it
        const config = leftConfigs.find((c) => c.id === urlConfigId);
        if (config) {
          setTimeout(() => {
            setLeftConfigId(config.id);
          }, 0);
        }
      } else {
        // Otherwise, select oldest config for left
        const oldest = [...leftConfigs].sort(
          (a, b) =>
            new Date(a.startedAt).getTime() - new Date(b.startedAt).getTime(),
        )[0];
        setTimeout(() => {
          setLeftConfigId(oldest.id);
        }, 0);
      }
    }
  }, [leftConfigs, leftConfigId, urlConfigId, urlDeviceId, leftDeviceId]);

  useEffect(() => {
    if (rightConfigs.length > 0 && !rightConfigId) {
      if (urlConfigId && urlDeviceId === rightDeviceId) {
        // If configId is provided, select the newest config (last version) for right
        // If current config is already the newest, select the previous one
        const sortedConfigs = [...rightConfigs].sort(
          (a, b) =>
            new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
        );
        const newest = sortedConfigs[0];
        
        // If current config is the newest, use the second newest (previous version)
        // Otherwise, use the newest
        const rightConfig =
          newest.id === urlConfigId && sortedConfigs.length > 1
            ? sortedConfigs[1]
            : newest;
        
        setTimeout(() => {
          setRightConfigId(rightConfig.id);
        }, 0);
      } else {
        // Otherwise, select newest config for right
        const newest = [...rightConfigs].sort(
          (a, b) =>
            new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
        )[0];
        setTimeout(() => {
          setRightConfigId(newest.id);
        }, 0);
      }
    }
  }, [rightConfigs, rightConfigId, urlConfigId, urlDeviceId, rightDeviceId]);

  // Calculate diff when compare data is available
  useEffect(() => {
    if (compareData) {
      const hunks = calculateDiff(compareData.left.content, compareData.right.content);
      setTimeout(() => {
        setDiffData({
          left: {
            content: compareData.left.content,
            filename: compareData.left.filename,
            date: compareData.left.date,
          },
          right: {
            content: compareData.right.content,
            filename: compareData.right.filename,
            date: compareData.right.date,
          },
          hunks,
        });
      }, 0);
    } else if (!leftConfigId || !rightConfigId) {
      setTimeout(() => {
        setDiffData(null);
      }, 0);
    }
  }, [compareData, leftConfigId, rightConfigId]);

  // Convert API types to component types
  const devicesForComponent = useMemo(() => {
    return devices.map((device) => ({
      id: device.id,
      name: device.name,
      configs: device.configVersions.map((config) => ({
        id: config.id,
        name: `v${config.versionNumber}`,
        date: new Date(config.startedAt).toLocaleDateString(),
        timestamp: new Date(config.startedAt).getTime(),
      })),
    }));
  }, [devices]);

  const leftConfig = useMemo(() => {
    if (!leftConfigId) return null;
    const config = leftConfigs.find((c) => c.id === leftConfigId);
    if (!config) return null;
    return {
      id: config.id,
      name: `v${config.versionNumber}`,
      date: new Date(config.startedAt).toLocaleDateString(),
      timestamp: new Date(config.startedAt).getTime(),
    };
  }, [leftConfigId, leftConfigs]);

  const rightConfig = useMemo(() => {
    if (!rightConfigId) return null;
    const config = rightConfigs.find((c) => c.id === rightConfigId);
    if (!config) return null;
    return {
      id: config.id,
      name: `v${config.versionNumber}`,
      date: new Date(config.startedAt).toLocaleDateString(),
      timestamp: new Date(config.startedAt).getTime(),
    };
  }, [rightConfigId, rightConfigs]);

  const handleLeftDeviceChange = (deviceId: string | null) => {
    setLeftDeviceId(deviceId);
    setLeftConfigId(null);
  };

  const handleRightDeviceChange = (deviceId: string | null) => {
    setRightDeviceId(deviceId);
    setRightConfigId(null);
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

  if (devicesLoading) {
    return (
      <Center h={400}>
        <Loader size="lg" />
      </Center>
    );
  }

  return (
    <>
      <ConfigDiffControls
        devices={devicesForComponent}
        leftDevice={leftDeviceId}
        rightDevice={rightDeviceId}
        onLeftDeviceChange={handleLeftDeviceChange}
        onRightDeviceChange={handleRightDeviceChange}
        leftConfig={leftConfig}
        rightConfig={rightConfig}
        onLeftConfigChange={setLeftConfigId}
        onRightConfigChange={setRightConfigId}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onCopy={handleCopy}
        onExport={handleExport}
      />
      {compareLoading ? (
        <Center h={200}>
          <Loader size="lg" />
        </Center>
      ) : (
        <ConfigDiffViewer data={diffData} viewMode={viewMode} />
      )}
    </>
  );
}
