export type GetDevicesQuery = {
  page: number;
  limit: number;
  search?: string;
  deviceTypeId?: string;
  tagIds?: string[];
};

export type DeviceStatus = "online" | "offline";

export type DeviceStatusFilter = "all" | "online" | "offline";

export type CreateDevicePayload = {
  name: string;
  ipAddress: string;
  port: number;
  deviceTypeId: string;
  tagIds: string[];
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
  deviceTags: {
    tag: {
      id: string;
      name: string;
    };
  }[];
  backupSchedule: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};
export type FilterOption = {
  value: string;
  label: string;
};
