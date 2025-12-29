import { Badge } from "@mantine/core";
import type { TableColumn } from "../../shared/ui/table";
import type { User } from "./types";
import { UserActionsMenu } from "./UserActionsMenu";

export const createUserColumns = (
  onEdit: (user: User) => void,
  onChangeRole: (user: User) => void,
  onDelete: (user: User) => void,
): TableColumn<User>[] => {
  return [
    {
      key: "name",
      header: "Name",
      render: (user) => user.name,
    },
    {
      key: "email",
      header: "Email",
      render: (user) => (
        <span style={{ color: "var(--mantine-color-dimmed)" }}>
          {user.email}
        </span>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (user) => (
        <Badge radius="sm" variant="light" color="violet">
          {user.role}
        </Badge>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (user) => {
        const statusColorMap = {
          active: "teal",
          inactive: "gray",
          pending: "yellow",
        };
        return (
          <Badge variant="light" color={statusColorMap[user.status]}>
            {user.status.toUpperCase()}
          </Badge>
        );
      },
    },
    {
      key: "lastLogin",
      header: "Last Login",
      render: (user) => (
        <span style={{ color: "var(--mantine-color-dimmed)" }}>
          {user.lastLogin}
        </span>
      ),
    },
    {
      key: "mfa",
      header: "MFA",
      render: (user) => (
        <Badge variant="light" color={user.mfa ? "teal" : "red"}>
          {user.mfa ? "Enabled" : "Disabled"}
        </Badge>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      stopRowClick: true,
      render: (user) => (
        <UserActionsMenu
          user={user}
          onEdit={onEdit}
          onChangeRole={onChangeRole}
          onDelete={onDelete}
        />
      ),
    },
  ];
};
