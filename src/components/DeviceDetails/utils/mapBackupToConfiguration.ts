import type { Backup } from "../../../types/backup";
import type { Configuration } from "../types";

export const mapBackupToConfiguration = (
  backup: Backup | undefined,
): Configuration | undefined => {
  if (!backup) {
    return undefined;
  }
  return {
    backupId: backup.id,
    version: backup.versionNumber,
    collectedAt: backup.finishedAt ?? backup.startedAt,
    configText: backup.configText ?? "",
  };
};
