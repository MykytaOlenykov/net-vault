import { useQuery } from "@tanstack/react-query";
import { backupService } from "../../../api";

export function useGetDeviceBackups(deviceId: string) {
  return useQuery({
    queryKey: ["device-backups", deviceId],
    queryFn: () => backupService.getByDeviceId(deviceId),
    enabled: Boolean(deviceId),
    staleTime: 5 * 60 * 1000,
  });
}
