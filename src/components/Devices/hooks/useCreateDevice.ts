import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deviceService } from "../../../api/device/deviceService";
import type { CreateDeviceDto } from "../schemas/device.schema";
import { devicesQueries } from "../api/deviceQueries";
import { mapCreateDeviceDtoToPayload } from "../mappers/deviceMappers";
export function useCreateDevice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateDeviceDto) => {
      const payload = mapCreateDeviceDtoToPayload(data);
      console.log(payload);
      return deviceService.createDevice(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: devicesQueries.lists(),
      });
    },
  });
}
