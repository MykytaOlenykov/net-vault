import { queryOptions } from "@tanstack/react-query";
import { typeService } from "../../../api/device/typeService";
import { tagService } from "../../../api";
import type { DeviceType } from "../../../types/device";

export const deviceTypesQueries = {
  all: () => ["devices", "meta", "types"],

  list: () =>
    queryOptions<DeviceType[]>({
      queryKey: [...deviceTypesQueries.all()],
      queryFn: () => typeService.getTypes(),
      staleTime: 5 * 60 * 1000,
    }),
};

export const deviceTagsQueries = {
  all: () => ["devices", "meta", "tags"] as const,

  list: () =>
    queryOptions<string[]>({
      queryKey: deviceTagsQueries.all(),
      queryFn: () => tagService.getTags(),
      staleTime: 5 * 60 * 1000,
    }),
};
