import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deviceService } from "../../../../api/device/deviceService";
import { devicesQueries } from "./queryKeys";
import type { CreateDeviceDto } from "../../schemas/device.schema";
export function useUpdateDevice(deviceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateDeviceDto) => {
      return deviceService.updateDevice(deviceId, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: devicesQueries.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: devicesQueries.detail(deviceId).queryKey,
      });
    },
  });
}
