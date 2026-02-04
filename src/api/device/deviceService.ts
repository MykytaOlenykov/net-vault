import ApiClient from "../ApiClient";
import type { Device } from "../../components/Devices";
import type {
  DevicesListPayload,
  DevicePayload,
} from "../../types/deviceResponses";
import type { ApiResponse } from "../../types/api";
import type { Paginated } from "../../types/api";
import type { CreateDevicePayload } from "../../types/device";
import type { GetDevicesQuery } from "../../types/device";

class DeviceService extends ApiClient {
  async getDevices(query: GetDevicesQuery): Promise<Device[]> {
    const response = await this.get<Paginated<DevicesListPayload>>("/devices", {
      params: query,
    });

    return response.data.data.devices;
  }

  async getDevice(deviceId: string): Promise<Device> {
    const response = await this.get<ApiResponse<DevicePayload>>(
      `/devices/${deviceId}`,
    );
    return response.data.data.device;
  }

  async createDevice(data: CreateDevicePayload): Promise<Device> {
    const response = await this.post<ApiResponse<DevicePayload>>(
      "/devices",
      data,
    );

    return response.data.data.device;
  }

  async updateDevice(
    deviceId: string,
    data: CreateDevicePayload,
  ): Promise<Device> {
    const response = await this.put<ApiResponse<DevicePayload>>(
      `/devices/${deviceId}`,
      data,
    );

    return response.data.data.device;
  }

  async deleteDevice(deviceId: string): Promise<void> {
    await this.delete(`/devices/${deviceId}`);
  }
}

export const deviceService = new DeviceService();
