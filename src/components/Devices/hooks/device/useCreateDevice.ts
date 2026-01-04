import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deviceService } from "../../../../api/device/deviceService";
import type { CreateDeviceDto } from "../../schemas/device.schema";
import { devicesQueries } from "./queryKeys";
export function useCreateDevice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDeviceDto) =>
      deviceService.createDevice(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: devicesQueries.lists(),
      });
    },
  });
}
