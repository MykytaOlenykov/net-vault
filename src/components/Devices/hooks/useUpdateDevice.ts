import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deviceService } from "../../../api/device/deviceService";
import { devicesQueries } from "../api/deviceQueries";
import type { CreateDeviceDto } from "../schemas/device.schema";
import { mapCreateDeviceDtoToPayload } from "../mappers/deviceMappers";
export function useUpdateDevice(deviceId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateDeviceDto) => {
      const payload = mapCreateDeviceDtoToPayload(data);
      return deviceService.updateDevice(deviceId, payload);
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
