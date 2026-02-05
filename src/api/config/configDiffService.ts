import ApiClient from "../ApiClient";
import type { ApiResponse } from "../../types/api";

export type ConfigVersion = {
  id: string;
  deviceId: string;
  versionNumber: number;
  status: "Success" | "Failed" | "Running";
  startedAt: string;
  finishedAt: string | null;
  configText?: string;
  configHash?: string;
  changedLines: number;
  isDuplicate: boolean;
  error?: string;
};

export type DeviceWithConfigs = {
  id: string;
  name: string;
  ipAddress: string;
  configVersions: ConfigVersion[];
};

export type ConfigDiffResponse = {
  left: {
    content: string;
    filename: string;
    date: string;
    deviceId: string;
    deviceName: string;
  };
  right: {
    content: string;
    filename: string;
    date: string;
    deviceId: string;
    deviceName: string;
  };
};

export type DevicesWithConfigsResponse = {
  devices: DeviceWithConfigs[];
};

class ConfigDiffService extends ApiClient {
  /**
   * Get all devices with their configuration versions
   * GET /api/devices/configs
   */
  async getDevicesWithConfigs(): Promise<DeviceWithConfigs[]> {
    const response = await this.get<ApiResponse<DevicesWithConfigsResponse>>(
      "/devices/configs",
    );

    return response.data.data.devices;
  }

  /**
   * Get configuration versions for a specific device
   * GET /api/devices/{deviceId}/configs
   */
  async getDeviceConfigs(deviceId: string): Promise<ConfigVersion[]> {
    const response = await this.get<ApiResponse<{ configVersions: ConfigVersion[] }>>(
      `/devices/${deviceId}/configs`,
    );

    return response.data.data.configVersions;
  }

  /**
   * Get specific configuration version content
   * GET /api/devices/configs/{configId}
   */
  async getConfigContent(configId: string): Promise<string> {
    const response = await this.get<ApiResponse<{ configVersion: ConfigVersion }>>(
      `/devices/configs/${configId}`,
    );

    return response.data.data.configVersion.configText || "";
  }

  /**
   * Compare two configuration versions
   * GET /api/devices/configs/compare?leftConfigId={leftId}&rightConfigId={rightId}
   */
  async compareConfigs(
    leftConfigId: string,
    rightConfigId: string,
  ): Promise<ConfigDiffResponse> {
    const response = await this.get<ApiResponse<ConfigDiffResponse>>(
      "/devices/configs/compare",
      {
        params: {
          leftConfigId,
          rightConfigId,
        },
      },
    );

    return response.data.data;
  }
}

export const configDiffService = new ConfigDiffService();
