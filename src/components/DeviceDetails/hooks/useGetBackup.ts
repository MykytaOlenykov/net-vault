import { useQuery } from "@tanstack/react-query";
import { deviceBackupQueries } from "../../Devices/api/deviceBackupQueries";

export function useGetBackup(backupId: string) {
  return useQuery(deviceBackupQueries.byId(backupId));
}
