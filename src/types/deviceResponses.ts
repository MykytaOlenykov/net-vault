import type { Device } from "./device";

export interface DevicesListPayload {
  devices: Device[];
}

export interface DevicePayload {
  device: Device;
}
