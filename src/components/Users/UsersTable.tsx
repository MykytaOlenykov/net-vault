import { Table } from "../../shared/ui/table";
import { createUserColumns } from "./UserColumns";
import type { User } from "./types";

interface UsersTableProps {
  items: User[];
  onEdit: (user: User) => void;
  onChangeRole: (user: User) => void;
  onDelete: (user: User) => void;
}

export function UsersTable({
  items,
  onEdit,
  onChangeRole,
  onDelete,
}: UsersTableProps) {
  const columns = createUserColumns(onEdit, onChangeRole, onDelete);

  return <Table items={items} columns={columns} />;
}
