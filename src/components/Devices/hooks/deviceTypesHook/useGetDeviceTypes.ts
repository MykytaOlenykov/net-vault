import { useQuery } from "@tanstack/react-query";
import { deviceTypesQueries } from "./deviceTypesQueries";

export const useGetDeviceTypes = () => {
  return useQuery({
    ...deviceTypesQueries.list(),
  });
};
