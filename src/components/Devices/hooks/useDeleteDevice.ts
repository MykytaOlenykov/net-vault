import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deviceService } from "../../../api/device/deviceService";
import { devicesQueries } from "../api/deviceQueries";
export function useDeleteDevice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deviceId: string) => deviceService.deleteDevice(deviceId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: devicesQueries.lists(),
      });
    },
  });
}
