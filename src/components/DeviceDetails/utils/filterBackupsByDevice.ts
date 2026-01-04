import type { Backup } from "../types";

export function filterBackupsByDevice(
  backups: Backup[],
  deviceId: string,
): Backup[] {
  return backups.filter((b) => b.device_id === deviceId);
}
