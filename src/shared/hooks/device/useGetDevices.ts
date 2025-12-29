import { useQuery } from "@tanstack/react-query";
import { devicesQueries } from "./queryKeys";

export const useGetDevices = () => {
  return useQuery(devicesQueries.list({ page: 1, limit: 10 }));
};
