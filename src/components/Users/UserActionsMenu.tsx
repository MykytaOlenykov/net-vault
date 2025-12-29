import { IconEdit, IconShield, IconTrash } from "@tabler/icons-react";
import { ActionsMenu } from "../../shared/ui/ActionMenu/ActionMenu";
import type { User } from "./types";
import { useUserActions } from "./hooks/useUserActions";

interface UserActionsMenuProps {
  user: User;
  onEdit: (user: User) => void;
  onChangeRole: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UserActionsMenu({
  user,
  onEdit,
  onChangeRole,
  onDelete,
}: UserActionsMenuProps) {
  const { handleEdit, handleChangeRole, handleDelete } = useUserActions({
    user,
    onEdit,
    onChangeRole,
    onDelete,
  });

  return (
    <ActionsMenu
      actions={[
        {
          key: "edit",
          label: "Edit User",
          icon: <IconEdit size={16} />,
          onClick: handleEdit,
        },
        {
          key: "changeRole",
          label: "Change Role",
          icon: <IconShield size={16} />,
          onClick: handleChangeRole,
        },
        {
          key: "delete",
          label: "Remove User",
          icon: <IconTrash size={16} />,
          color: "red",
          onClick: handleDelete,
        },
      ]}
    />
  );
}
