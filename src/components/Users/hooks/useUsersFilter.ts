import { useMemo, useState } from "react";
import type { User } from "../types/user";

export type UserStatusFilter = "all" | "active" | "inactive" | "pending";
export type UserRoleFilter = "all" | string;

export function useUsersFilter(items: User[]) {
  const [role, setRole] = useState<UserRoleFilter>("all");
  const [status, setStatus] = useState<UserStatusFilter>("all");

  const roleOptions = useMemo(
    () => [
      { value: "all", label: "All" },
      ...Array.from(new Set(items.map((u) => u.role))).map((r) => ({
        value: r,
        label: r,
      })),
    ],
    [items],
  );

  const filteredItems = useMemo(() => {
    return items.filter((user) => {
      const matchesRole = role === "all" || user.role === role;
      const matchesStatus = status === "all" || user.status === status;

      return matchesRole && matchesStatus;
    });
  }, [items, role, status]);

  return {
    role,
    setRole,
    status,
    setStatus,
    roleOptions,
    filteredItems,
  };
}

