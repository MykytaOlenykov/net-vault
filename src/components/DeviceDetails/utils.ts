import type { BackupHistoryItem } from "./types";
import type { AuditLog } from "./types";
import type { ChangeHistoryItem } from "./types";

export function calculateBackupStats(backups: BackupHistoryItem[]) {
  const total = backups.length;
  const success = backups.filter((b) => b.status === "SUCCESS").length;
  const failed = backups.filter((b) => b.status === "FAILED").length;

  return {
    success,
    failed,
    successRate: total === 0 ? 0 : Math.round((success / total) * 100),
  };
}

export function mapAuditToChangeHistory(audit: AuditLog): ChangeHistoryItem {
  let description = audit.action;

  switch (audit.action) {
    case "config.update":
      description = `Updated configuration (${
        audit.details?.["changed_lines"] ?? 0
      } lines changed)`;
      break;

    case "config.restore":
      description = `Restored configuration (version ${audit.details?.["restored_version"]})`;
      break;

    case "backup.run":
      description = "Backup executed";
      break;
  }

  return {
    id: audit.id,
    timestamp: new Date(audit.created_at).toLocaleString(),
    user: audit.user,
    description,
  };
}
