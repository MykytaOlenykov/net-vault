import { Flex, Paper, Stack } from "@mantine/core";
import { DevicesTable } from "../../components/DevicesTable";
import { DevicesFilters } from "../../devices/components/DeviceFilters";
import { useDevicesFilter } from "../../devices/hooks/useDevicesFilter";
import { useSearch } from "../../devices/hooks/useSearch";
import type { Device } from "../../devices/types/device";
import { SearchBar } from "../../shared/ui/searchBar";
import style from "./DevicePage.module.css";

const mockDevices: Device[] = [
  {
    id: 1,
    name: "Core-SW-01",
    ip_address: "10.0.10.1",
    port: 22,
    device_type: "Switch",
    tags: ["core", "dc1"],
    backup_schedule: "daily 02:00",
    last_backup_at: "2025-02-10T02:00:00Z",
    last_backup_status: "success",
    created_at: "2024-12-01T11:20:00Z",
  },
  {
    id: 2,
    name: "Access-SW-15",
    ip_address: "10.0.20.15",
    port: 22,
    device_type: "Router",
    tags: ["access", "floor-2"],
    backup_schedule: "daily 03:00",
    last_backup_at: "2025-02-10T03:00:00Z",
    last_backup_status: "warning",
    created_at: "2024-11-18T09:13:00Z",
  },
  {
    id: 3,
    name: "Router-R1",
    ip_address: "192.168.1.1",
    port: 22,
    device_type: "Router",
    tags: ["branch-a"],
    backup_schedule: "weekly Mon",
    last_backup_at: "2025-02-03T01:00:00Z",
    last_backup_status: "failed",
    created_at: "2024-10-03T14:40:00Z",
  },
  {
    id: 4,
    name: "SW-Lab-05",
    ip_address: "172.16.5.10",
    port: 23,
    device_type: "Switch",
    tags: ["lab"],
    backup_schedule: "none",
    last_backup_at: null,
    last_backup_status: "failed",
    created_at: "2024-08-11T17:50:00Z",
  },
  {
    id: 5,
    name: "SW-Lab-05",
    ip_address: "172.16.5.10",
    port: 23,
    device_type: "Switch",
    tags: ["lab"],
    backup_schedule: "none",
    last_backup_at: null,
    last_backup_status: "failed",
    created_at: "2024-08-11T17:50:00Z",
  },
  {
    id: 6,
    name: "SW-Lab-05",
    ip_address: "172.16.5.10",
    port: 23,
    device_type: "Switch",
    tags: ["lab"],
    backup_schedule: "none",
    last_backup_at: null,
    last_backup_status: "failed",
    created_at: "2024-08-11T17:50:00Z",
  },
];

export default function DevicesPage() {
  const {
    search,
    setSearch,
    filteredItems: searchedDevices,
  } = useSearch(mockDevices);

  const {
    type,
    setType: onTypeChange,
    status,
    setStatus: onStatusChange,
    deviceTypeOptions,
    filteredItems: filteredDevices,
  } = useDevicesFilter(searchedDevices);

  return (
    <div className={style.device_page}>
      <Paper p={"md"} withBorder>
        <Stack gap="md">
          <SearchBar value={search} onSearch={setSearch} />

          <DevicesFilters
            type={type}
            status={status}
            deviceTypeOptions={deviceTypeOptions}
            onTypeChange={onTypeChange}
            onStatusChange={onStatusChange}
          />
        </Stack>
      </Paper>
      <Paper p={"md"} withBorder>
        <DevicesTable items={filteredDevices} />
      </Paper>
    </div>
  );
}
