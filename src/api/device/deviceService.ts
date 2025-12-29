import ApiClient from "../ApiClient";

class DeviceService extends ApiClient {
  async getDevices(query: { limit: number; page: number }): Promise<any> {
    const response = await this.get<any>("/devices", { params: query });
    return response.data;
  }
}

export const deviceService = new DeviceService();
