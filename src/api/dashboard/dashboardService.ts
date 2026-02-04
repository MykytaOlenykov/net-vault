import type { DeviceConfigChangesResponse } from "../../types/dashboardAnalytics";
import type { ApiResponse } from "../../types/api";
import type { DashboardAnalytics } from "../../types/dashboardAnalytics";
import ApiClient from "../ApiClient";

class DashboardService extends ApiClient {
  async getAnalytics(): Promise<DashboardAnalytics> {
    const response =
      await this.get<ApiResponse<DashboardAnalytics>>("/analytics");
    return response.data.data;
  }
  async getDeviceConfigsChanges() {
    const response = await this.get<ApiResponse<DeviceConfigChangesResponse>>(
      "analytics/devices/config-changes",
    );
    return response.data.data;
  }
}

export const dashboardService = new DashboardService();
