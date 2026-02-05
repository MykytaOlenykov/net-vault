import { useQuery } from "@tanstack/react-query";
import { configDiffService } from "../../../api/config/configDiffService";
import type { ConfigDiffResponse } from "../../../api/config/configDiffService";

export const useCompareConfigs = (
  leftConfigId: string | null,
  rightConfigId: string | null,
) => {
  return useQuery<ConfigDiffResponse>({
    queryKey: ["configs", "compare", leftConfigId, rightConfigId],
    queryFn: () => {
      if (!leftConfigId || !rightConfigId) {
        throw new Error("Both config IDs are required");
      }
      return configDiffService.compareConfigs(leftConfigId, rightConfigId);
    },
    enabled: !!leftConfigId && !!rightConfigId,
  });
};
