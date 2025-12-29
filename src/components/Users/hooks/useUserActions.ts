import { confirmDelete } from "../../../shared/ui/ConfirmDelete";
import type { User } from "../types/user";

interface UseUserActionsProps {
  user: User;
  onEdit: (user: User) => void;
  onChangeRole: (user: User) => void;
  onDelete: (user: User) => void;
}

export function useUserActions({
  user,
  onEdit,
  onChangeRole,
  onDelete,
}: UseUserActionsProps) {
  const handleEdit = () => {
    onEdit(user);
  };

  const handleChangeRole = () => {
    onChangeRole(user);
  };

  const handleDelete = () => {
    confirmDelete({
      title: "Remove User",
      itemName: user.name,
      onConfirm: () => onDelete(user),
      confirmLabel: "Remove User",
    });
  };

  return {
    handleEdit,
    handleChangeRole,
    handleDelete,
  };
}
