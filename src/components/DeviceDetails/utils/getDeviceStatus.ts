import type { Backup } from "../types";

export type DeviceStatus = "ONLINE" | "OFFLINE" | "UNKNOWN";

export function getDeviceStatus(backups: Backup[]): DeviceStatus {
  if (!backups.length) return "UNKNOWN";

  const last = backups[0];

  if (last.status === "FAILED" && last.error?.includes("timeout")) {
    return "OFFLINE";
  }

  return "ONLINE";
}
