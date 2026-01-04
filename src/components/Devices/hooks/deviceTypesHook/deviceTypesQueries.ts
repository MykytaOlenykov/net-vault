import { queryOptions } from "@tanstack/react-query";
import { typeService } from "../../../../api/device/typeService";
import type { DeviceType } from "../../types/device";

export const deviceTypesQueries = {
  all: () => ["device-types"],

  lists: () => [...deviceTypesQueries.all(), "list"],

  list: () =>
    queryOptions<DeviceType[]>({
      queryKey: [...deviceTypesQueries.lists()],
      queryFn: () => typeService.getTypes(),
      staleTime: 5 * 60 * 1000,
    }),
};
