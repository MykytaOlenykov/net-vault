import { useMutation, useQueryClient } from "@tanstack/react-query";
import { backupService } from "../../../api";
import { deviceBackupQueries } from "../../Devices/api/deviceBackupQueries";

export function useTriggerBackup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (deviceId: string) =>
      backupService.trigerBackup(deviceId),
    onSuccess: (_data, deviceId: string) => {
      queryClient.invalidateQueries({
        queryKey: deviceBackupQueries.byDeviceId(deviceId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: deviceBackupQueries.lastByDeviceId(deviceId).queryKey,
      });
    },
  });
}
