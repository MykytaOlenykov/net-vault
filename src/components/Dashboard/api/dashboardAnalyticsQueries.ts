import { queryOptions } from "@tanstack/react-query";
import { dashboardService } from "../../../api/dashboard/dashboardService";

export const dashboardAnalyticsQueries = {
  all: () => ["analytics"] as const,

  analytics: () =>
    queryOptions({
      queryKey: [...dashboardAnalyticsQueries.all()],
      queryFn: () => dashboardService.getAnalytics(),
      staleTime: 5 * 60 * 1000,
    }),
  deviceConfigChanges: () =>
    queryOptions({
      queryKey: ["device/config-changes"],
      queryFn: () => dashboardService.getDeviceConfigsChanges(),
      staleTime: 5 * 60 * 1000,
    }),
};
