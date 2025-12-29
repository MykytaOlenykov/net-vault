export const enum DeviceStatus {
  Online = "online",
  Warning = "warning",
  Offline = "offline",
}

export type Device = {
  id: number;
  name: string;
  ip_address: string;
  port: number;
  device_type: string;
  tags: string[];
  backup_schedule: string;
  last_backup_at: string | null;
  last_backup_status: DeviceStatus;
  status: DeviceStatus;
  created_at: string;
};
