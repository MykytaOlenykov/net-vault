import { useQuery } from "@tanstack/react-query";
import { devicesQueries } from "../api/deviceQueries";

export const useGetDevices = () => {
  return useQuery({
    ...devicesQueries.list({ page: 1, limit: 10 }),
  });
};
