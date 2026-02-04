import {
  IconServer,
  IconDatabase,
  IconShield,
  IconActivity,
} from "@tabler/icons-react";
import type {
  DashboardAnalytics,
  DeviceConfigChange,
  DeviceConfigChangesResponse,
} from "../../../types/dashboardAnalytics";
import type { Metric, BackupStats } from "../types";

function getBackupCount(
  data: DashboardAnalytics,
  status: "Success" | "Failed",
): number {
  return data.backupTotals.find((b) => b.status === status)?._count ?? 0;
}

export function mapDashboardMetrics(data: DashboardAnalytics): Metric[] {
  const success = getBackupCount(data, "Success");
  const failed = getBackupCount(data, "Failed");
  return [
    {
      label: "Total Devices",
      value: data.deviceTotal.toString(),
      icon: IconServer,
      color: "violet",
    },
    {
      label: "Stored Backups",
      value: success.toString(),
      icon: IconDatabase,
      color: "teal",
    },
    {
      label: "Failed Backups",
      value: failed.toString(),
      icon: IconShield,
      color: "red",
    },
    {
      label: "Backups Completed (24h)",
      value: data.backupTotalLast24Hours.toString(),
      icon: IconActivity,
      color: "blue",
    },
  ];
}

export function mapBackupStats(data: DashboardAnalytics): BackupStats {
  const success = getBackupCount(data, "Success");
  const failed = getBackupCount(data, "Failed");

  const total = success + failed;

  return {
    success,
    failed,
    successRate: total ? Math.round((success / total) * 100) : 0,
  };
}

export function mapDeviceConfigChanges(
  response: DeviceConfigChangesResponse,
): DeviceConfigChange[] {
  return response.devices.map((device) => ({
    id: device.id,
    deviceName: device.name,
    changesCount: device.configChanges,
    lastBackupAt: device.lastBackup,
  }));
}
