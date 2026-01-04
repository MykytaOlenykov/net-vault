import { useQuery } from "@tanstack/react-query";
import { devicesQueries } from "./queryKeys";

export const useGetDevice = (deviceId: string) => {
  return useQuery({
    ...devicesQueries.detail(deviceId),
  });
};
