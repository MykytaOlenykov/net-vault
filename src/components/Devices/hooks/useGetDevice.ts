import { useQuery } from "@tanstack/react-query";
import { devicesQueries } from "../api/deviceQueries";

export const useGetDevice = (deviceId: string) => {
  return useQuery({
    ...devicesQueries.detail(deviceId),
    enabled: !!deviceId,
  });
};
