import type { Backup } from "../../../types/backup";

export function sortBackupsByDate(backups: Backup[]): Backup[] {
  return [...backups].sort(
    (a, b) => new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime(),
  );
}
