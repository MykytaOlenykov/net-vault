import type { Backup } from "../types";

export function sortBackupsByDate(backups: Backup[]): Backup[] {
  return [...backups].sort(
    (a, b) =>
      new Date(b.started_at).getTime() - new Date(a.started_at).getTime(),
  );
}
