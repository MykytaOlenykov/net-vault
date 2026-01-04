import { useQuery } from "@tanstack/react-query";
import { tagService } from "../../../../api/device/tagService";
import { tagsQueries } from "./queryKeys";

export function useGetDeviceTags() {
  return useQuery<string[]>({
    queryKey: tagsQueries.lists(),
    queryFn: () => tagService.getTags(),
    staleTime: 5 * 60 * 1000,
  });
}
