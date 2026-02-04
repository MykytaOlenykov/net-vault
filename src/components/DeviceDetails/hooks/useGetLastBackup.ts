import { useQuery } from "@tanstack/react-query";
import { deviceBackupQueries } from "../../Devices/api/deviceBackupQueries";

export function useGetLastBackup(deviceId: string) {
  return useQuery({ ...deviceBackupQueries.lastByDeviceId(deviceId) });
}
