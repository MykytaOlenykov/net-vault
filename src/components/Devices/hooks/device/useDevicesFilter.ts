import { useMemo, useState } from "react";
import type { Device, FilterOption } from "../../types/device";

export function useDevicesFilter(items: Device[], vendors: FilterOption[]) {
  const [vendor, setVendor] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");

  const vendorOptions: FilterOption[] = [
    { value: "all", label: "All" },
    ...vendors,
  ];
  const statusOptions: FilterOption[] = [
    { value: "all", label: "All" },
    { value: "online", label: "Online" },
    { value: "offline", label: "Offline" },
  ];

  const filteredItems = useMemo(() => {
    return items.filter((device) => {
      const matchesVendor =
        vendor === "all" || device.deviceType.vendor === vendor;

      const matchesStatus =
        status === "all" ||
        (status === "online" && device.isActive) ||
        (status === "offline" && !device.isActive);

      return matchesVendor && matchesStatus;
    });
  }, [items, vendor, status]);

  return {
    vendor,
    status,
    setVendor,
    setStatus,
    vendorOptions,
    statusOptions,
    filteredItems,
  };
}
