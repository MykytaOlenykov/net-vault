import { useQuery } from "@tanstack/react-query";
import { deviceTypesQueries } from "../api/deviceMetaQueries";

export const useGetDeviceTypes = () => {
  return useQuery(deviceTypesQueries.list());
};
