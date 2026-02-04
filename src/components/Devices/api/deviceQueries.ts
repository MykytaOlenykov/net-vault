import { queryOptions } from "@tanstack/react-query";
import { deviceService } from "../../../api/device/deviceService";
import type { Device } from "..";

export const devicesQueries = {
  all: () => ["devices"],

  lists: () => [...devicesQueries.all(), "list"],

  list: (query: { page: number; limit: number }) =>
    queryOptions<Device[]>({
      queryKey: [...devicesQueries.lists(), query],
      queryFn: () => deviceService.getDevices(query),
    }),

  details: () => [...devicesQueries.all(), "detail"],

  detail: (id: string) =>
    queryOptions<Device>({
      queryKey: [...devicesQueries.details(), id],
      queryFn: () => deviceService.getDevice(id),
    }),
};
