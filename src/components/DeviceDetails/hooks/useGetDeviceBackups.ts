import { useQuery } from "@tanstack/react-query";
import { deviceBackupQueries } from "../../Devices/api/deviceBackupQueries";

export function useGetDeviceBackups(deviceId: string) {
  return useQuery(deviceBackupQueries.byDeviceId(deviceId));
}
