import type {
  Device,
  GetDevicesQuery,
} from "../../components/Devices/types/device";
import ApiClient from "../ApiClient";
import type { CreateDeviceDto } from "../../components/Devices/schemas/device.schema";

export type PaginatedResponse<T> = {
  data: {
    devices: T;
  };
  meta: {
    page: number;
    limit: number;
    total: number;
  };
};

export type Response<T> = {
  data: {
    device: T;
  };
};

class DeviceService extends ApiClient {
  async getDevices(query: GetDevicesQuery): Promise<Device[]> {
    const response = await this.get<PaginatedResponse<Device[]>>("/devices", {
      params: query,
    });

    return response.data.data.devices;
  }

  async getDevice(deviceId: string): Promise<Device> {
    const response = await this.get<Response<Device>>(`/devices/${deviceId}`);

    return response.data.data.device;
  }

  async createDevice(data: CreateDeviceDto): Promise<Device> {
    const response = await this.post<Response<Device>>("/devices", data);

    return response.data.data.device;
  }

  async updateDevice(deviceId: string, data: CreateDeviceDto): Promise<Device> {
    const response = await this.put<Response<Device>>(
      `/devices/${deviceId}`,
      data,
    );

    return response.data.data.device;
  }

  async deleteDevice(deviceID: string): Promise<void> {
    await this.delete(`/devices/${deviceID}`);
  }
}

export const deviceService = new DeviceService();
