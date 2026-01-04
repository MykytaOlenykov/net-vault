import type { AuditLog } from "../types";
import type { ChangeHistoryItem } from "../types";

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

    case "config.restore.manual":
      description = "Configuration restored manually";
      break;
  }

  return {
    id: audit.id,
    timestamp: new Date(audit.created_at).toLocaleString(),
    user: audit.user,
    description,
  };
}
