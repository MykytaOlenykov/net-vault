export enum DeviceProtocol {
  SSH = "SSH",
  Telnet = "Telnet",
}

export type GetDevicesQuery = {
  page: number;
  limit: number;
  search?: string;
  deviceTypeId?: string;
  tagIds?: string[];
};

export type DeviceStatus = "online" | "offline";

export type CreateDevicePayload = {
  name: string;
  ipAddress: string;
  port: number;
  deviceTypeId: string;
  tags: string[];
  protocol: DeviceProtocol;
  backupSchedule: string;
  isActive: boolean;
};

export type Tag = {
  id: string;
  name: string;
};

export type DeviceType = {
  id: string;
  vendor: string;
};

export type Device = {
  id: string;
  name: string;
  ipAddress: string;
  port: number;
  deviceType: {
    id: string;
    vendor: string;
  };
  protocol: DeviceProtocol;
  deviceTags: {
    tag: {
      name: string;
    };
  }[];
  backupSchedule: string;
  lastBackup: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
