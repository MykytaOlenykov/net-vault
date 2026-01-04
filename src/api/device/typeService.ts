import ApiClient from "../ApiClient";
import type { AxiosResponse } from "axios";
import type { DeviceType } from "../../components/Devices/types/device";

export type GetDeviceTypesResponse = {
  data: {
    types: DeviceType[];
  };
};

class TypeService extends ApiClient {
  async getTypes(): Promise<DeviceType[]> {
    const response: AxiosResponse<GetDeviceTypesResponse> =
      await this.get<GetDeviceTypesResponse>("/devices/types");
    return response.data.data.types;
  }
}

export const typeService = new TypeService();
