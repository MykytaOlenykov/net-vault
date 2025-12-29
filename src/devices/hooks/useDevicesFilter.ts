import { useMemo, useState } from "react";
import type { Device } from "../types/device";
import type { DeviceStatusFilter } from "../components/DeviceFilters";

export function useDevicesFilter(items: Device[]) {
  const [type, setType] = useState<string>("all");
  const [status, setStatus] = useState<DeviceStatusFilter>("all");

  const deviceTypeOptions = useMemo(
    () => [
      { value: "all", label: "All" },
      ...Array.from(new Set(items.map((d) => d.device_type))).map((t) => ({
        value: t,
        label: t,
      })),
    ],
    [items],
  );

  const filteredItems = useMemo(() => {
    return items.filter((device) => {
      const matchesType = type === "all" || device.device_type === type;

      const matchesStatus =
        status === "all" || device.last_backup_status === status;
      return matchesType && matchesStatus;
    });
  }, [items, type, status]);

  return {
    type,
    setType,
    status,
    setStatus,
    deviceTypeOptions,
    filteredItems,
  };
}
