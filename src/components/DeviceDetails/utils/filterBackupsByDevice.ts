import type { Backup } from "../../../types/backup";

export function filterBackupsByDevice(
  backups: Backup[],
  deviceId: string,
): Backup[] {
  return backups.filter((b) => b.deviceId === deviceId);
}
