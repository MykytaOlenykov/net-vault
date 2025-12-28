import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { deviceService } from "../../../api/device/deviceService";

export const devicesQueries = {
  all: () => ["all"],

  lists: () => [...devicesQueries.all(), "list"],

  list: (query: { limit: number; page: number }) =>
    queryOptions({
      queryKey: [...devicesQueries.lists(), query],
      queryFn: () => deviceService.getDevices(query),
      placeholderData: keepPreviousData,
    }),
};
