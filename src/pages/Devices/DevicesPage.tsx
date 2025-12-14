import { DevicesTable } from "../../components/DevicesTable";
import type { Device } from "../../components/DevicesTable/DevicesTable";
const mockDevices: Device[] = [
  {
    id: 1,
    name: "Core-SW-01",
    ip_address: "10.0.10.1",
    port: 22,
    device_type: "Cisco IOS",
    tags: ["core", "dc1"],
    backup_schedule: "daily 02:00",
    last_backup_at: "2025-02-10T02:00:00Z",
    last_backup_status: "success",
    is_active: true,
    created_at: "2024-12-01T11:20:00Z",
  },
  {
    id: 2,
    name: "Access-SW-15",
    ip_address: "10.0.20.15",
    port: 22,
    device_type: "HP ProCurve",
    tags: ["access", "floor-2"],
    backup_schedule: "daily 03:00",
    last_backup_at: "2025-02-10T03:00:00Z",
    last_backup_status: "warning",
    is_active: true,
    created_at: "2024-11-18T09:13:00Z",
  },
  {
    id: 3,
    name: "Router-R1",
    ip_address: "192.168.1.1",
    port: 22,
    device_type: "MikroTik",
    tags: ["branch-a"],
    backup_schedule: "weekly Mon",
    last_backup_at: "2025-02-03T01:00:00Z",
    last_backup_status: "failed",
    is_active: true,
    created_at: "2024-10-03T14:40:00Z",
  },
  {
    id: 4,
    name: "SW-Lab-05",
    ip_address: "172.16.5.10",
    port: 23,
    device_type: "D-Link",
    tags: ["lab"],
    backup_schedule: "none",
    last_backup_at: null,
    last_backup_status: "none",
    is_active: false,
    created_at: "2024-08-11T17:50:00Z",
  },
];

export default function DevicesPage() {
  return (
    <div style={{ width: "100%" }}>
      <DevicesTable items={mockDevices} />
    </div>
  );
}
