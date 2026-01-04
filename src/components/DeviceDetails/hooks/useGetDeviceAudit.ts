import { useQuery } from "@tanstack/react-query";
import { auditService } from "../../../api";
import type { ChangeHistoryItem } from "../types";

export function useGetDeviceAudit(deviceId: string) {
  return useQuery<ChangeHistoryItem[]>({
    queryKey: ["device-audit", deviceId],
    queryFn: async () => auditService.getByDeviceId(deviceId),
    enabled: Boolean(deviceId),
    staleTime: 5 * 60 * 1000,
  });
}
