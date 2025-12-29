import { Group } from "@mantine/core";
import { SelectFilter } from "../../shared/ui/filters";
import type { UserRoleFilter, UserStatusFilter } from "./hooks/useUsersFilter";
import type { ComboboxItem } from "@mantine/core";

export interface UsersFiltersProps {
  role: UserRoleFilter;
  status: UserStatusFilter;
  roleOptions: ComboboxItem[];

  onRoleChange: (value: UserRoleFilter) => void;
  onStatusChange: (value: UserStatusFilter) => void;
}

export function UsersFilters({
  role,
  status,
  roleOptions,
  onRoleChange,
  onStatusChange,
}: UsersFiltersProps) {
  return (
    <Group mb="md">
      <SelectFilter
        label="Role"
        value={role}
        data={roleOptions}
        onChange={onRoleChange}
      />

      <SelectFilter
        label="Status"
        value={status}
        data={[
          { value: "all", label: "All" },
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
          { value: "pending", label: "Pending" },
        ]}
        onChange={onStatusChange}
      />
    </Group>
  );
}
