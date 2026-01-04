import { Group } from "@mantine/core";
import { SelectFilter } from "../../shared/ui/filters";
import type { DeviceStatus } from "./types/device";
import type { FilterOption } from "./types/device";
export type DeviceStatusFilter = "all" | DeviceStatus;

export interface DevicesFiltersProps {
  vendor: string;
  status: string;
  vendorsOptions: FilterOption[];
  statusOptions: FilterOption[];

  onVendorChange: (value: string) => void;
  onStatusChange: (value: string) => void;
}

export function DevicesFilters({
  vendor,
  status,
  vendorsOptions,
  statusOptions,
  onVendorChange,
  onStatusChange,
}: DevicesFiltersProps) {
  return (
    <Group mb="md">
      <SelectFilter
        label="Vendor"
        value={vendor}
        data={vendorsOptions}
        onChange={onVendorChange}
      />

      <SelectFilter
        label="Status"
        value={status}
        data={statusOptions}
        onChange={onStatusChange}
      />
    </Group>
  );
}
