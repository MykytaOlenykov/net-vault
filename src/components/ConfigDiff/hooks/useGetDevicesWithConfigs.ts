import { useQuery } from "@tanstack/react-query";
import { configDiffService } from "../../../api/config/configDiffService";
import type { DeviceWithConfigs } from "../../../api/config/configDiffService";

export const useGetDevicesWithConfigs = () => {
  return useQuery<DeviceWithConfigs[]>({
    queryKey: ["devices", "configs"],
    queryFn: () => configDiffService.getDevicesWithConfigs(),
  });
};
