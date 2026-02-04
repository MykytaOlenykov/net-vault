import { queryOptions } from "@tanstack/react-query";
import { backupService } from "../../../api";
import type { Backup } from "../../../types/backup";

export const deviceBackupQueries = {
  all: () => ["devices", "backups"] as const,

  lists: () => [...deviceBackupQueries.all(), "list"] as const,

  byDeviceId: (deviceId: string) =>
    queryOptions<Backup[]>({
      queryKey: [...deviceBackupQueries.lists(), deviceId],
      queryFn: () => backupService.getBackupsByDeviceId(deviceId),
      enabled: !!deviceId,
      staleTime: 5 * 60 * 1000,
    }),

  details: () => [...deviceBackupQueries.all(), "detail"] as const,

  byId: (backupId: string) =>
    queryOptions<Backup>({
      queryKey: [...deviceBackupQueries.details(), backupId],
      queryFn: () => backupService.getBackupById(backupId),
      enabled: !!backupId,
      staleTime: 5 * 60 * 1000,
    }),

  lastByDeviceId: (deviceId: string) =>
    queryOptions<Backup>({
      queryKey: [...deviceBackupQueries.all(), "last", deviceId],
      queryFn: () => backupService.getLastBackup(deviceId),
      enabled: !!deviceId,
      staleTime: 60 * 1000,
    }),
};
