import { Group } from "@mantine/core";
import { SelectFilter } from "../../shared/ui/filters";
import type { StatusBackup } from "./types";

import type { ComboboxItem } from "@mantine/core";

export type DeviceStatusFilter = "all" | StatusBackup;

export interface DevicesFiltersProps {
  type: string;
  status: DeviceStatusFilter;
  deviceTypeOptions: ComboboxItem[];

  onTypeChange: (value: string) => void;
  onStatusChange: (value: DeviceStatusFilter) => void;
}

export function DevicesFilters({
  type,
  status,
  deviceTypeOptions,
  onTypeChange,
  onStatusChange,
}: DevicesFiltersProps) {
  return (
    <Group mb="md">
      <SelectFilter
        label="Device Type"
        value={type}
        data={deviceTypeOptions}
        onChange={onTypeChange}
      />

      <SelectFilter
        label="Status"
        value={status}
        data={[
          { value: "all", label: "All" },
          { value: "success", label: "Success" },
          { value: "warning", label: "Warning" },
          { value: "failed", label: "Failed" },
        ]}
        onChange={onStatusChange}
      />
    </Group>
  );
}
