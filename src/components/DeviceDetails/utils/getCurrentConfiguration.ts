import type { Backup } from "../types";
import type { Configuration } from "../types";

export function getCurrentConfiguration(
  backups: Backup[],
): Configuration | null {
  const latest = backups
    .filter((b) => b.status === "SUCCESS")
    .sort(
      (a, b) =>
        new Date(b.finished_at!).getTime() - new Date(a.finished_at!).getTime(),
    )[0];

  if (!latest) return null;

  return {
    backupId: latest.id,
    version: latest.version_number,
    collectedAt: latest.finished_at!,
    configText: latest.config_text,
  };
}
