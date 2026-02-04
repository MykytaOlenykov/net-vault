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
  // Нормалізуємо roleOptions, щоб переконатися, що всі значення - рядки
  const normalizedRoleOptions = Array.isArray(roleOptions)
    ? roleOptions.map((option) => ({
        value: String(option.value || option),
        label: String(option.label || option.value || option),
      }))
    : [{ value: "all", label: "All" }];

  return (
    <Group mb="md">
      <SelectFilter
        label="Role"
        value={role}
        data={normalizedRoleOptions}
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
