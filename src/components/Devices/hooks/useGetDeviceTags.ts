import { useQuery } from "@tanstack/react-query";
import { deviceTagsQueries } from "../api/deviceMetaQueries";

export function useGetDeviceTags() {
  return useQuery(deviceTagsQueries.list());
}
