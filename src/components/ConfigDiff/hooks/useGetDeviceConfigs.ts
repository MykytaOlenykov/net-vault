import { useQuery } from "@tanstack/react-query";
import { configDiffService } from "../../../api/config/configDiffService";
import type { ConfigVersion } from "../../../api/config/configDiffService";

export const useGetDeviceConfigs = (deviceId: string | null) => {
  return useQuery<ConfigVersion[]>({
    queryKey: ["devices", deviceId, "configs"],
    queryFn: () => {
      if (!deviceId) throw new Error("Device ID is required");
      return configDiffService.getDeviceConfigs(deviceId);
    },
    enabled: !!deviceId,
  });
};
