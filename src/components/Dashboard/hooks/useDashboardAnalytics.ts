import { useQuery } from "@tanstack/react-query";
import { dashboardAnalyticsQueries } from "../api/dashboardAnalyticsQueries";
import {
  mapDashboardMetrics,
  mapBackupStats,
  mapDeviceConfigChanges,
} from "../mappers/mapDashboardAnalytics";

export function useDashboardAnalytics() {
  const analyticsQuery = useQuery(dashboardAnalyticsQueries.analytics());
  const deviceConfigChangesQuery = useQuery(
    dashboardAnalyticsQueries.deviceConfigChanges(),
  );

  return {
    ...analyticsQuery,
    metrics: analyticsQuery.data
      ? mapDashboardMetrics(analyticsQuery.data)
      : [],
    backupStats: analyticsQuery.data
      ? mapBackupStats(analyticsQuery.data)
      : null,
    deviceConfigChanges: deviceConfigChangesQuery.data
      ? mapDeviceConfigChanges(deviceConfigChangesQuery.data)
      : [],
  };
}
