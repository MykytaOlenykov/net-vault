import { useState } from "react";
import { Paper, Stack, Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import {
  UsersTable,
  UsersFilters,
  EditUserModal,
  InviteUserModal,
  ChangeRoleModal,
  useUsersFilter,
  useSearch,
  type User,
} from "../../components/Users";
import { SearchBar } from "../../shared/ui/searchBar";
import style from "./UsersPage.module.css";

const mockUsers: User[] = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@netvault.io",
    role: "Administrator",
    status: "active",
    lastLogin: "5 minutes ago",
    mfa: true,
  },
  {
    id: 2,
    name: "John Doe",
    email: "john.doe@netvault.io",
    role: "Operator",
    status: "active",
    lastLogin: "2 hours ago",
    mfa: true,
  },
  {
    id: 3,
    name: "Jane Smith",
    email: "jane.smith@netvault.io",
    role: "Viewer",
    status: "active",
    lastLogin: "1 day ago",
    mfa: false,
  },
  {
    id: 4,
    name: "Bob Johnson",
    email: "bob.johnson@netvault.io",
    role: "Operator",
    status: "inactive",
    lastLogin: "1 week ago",
    mfa: true,
  },
  {
    id: 5,
    name: "Alice Williams",
    email: "alice.williams@netvault.io",
    role: "Viewer",
    status: "pending",
    lastLogin: "Never",
    mfa: false,
  },
];

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [inviteModalOpened, setInviteModalOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [changeRoleModalOpened, setChangeRoleModalOpened] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { search, setSearch, filteredItems: searchedUsers } = useSearch(users);

  const {
    role,
    setRole: onRoleChange,
    status,
    setStatus: onStatusChange,
    roleOptions,
    filteredItems: filteredUsers,
  } = useUsersFilter(searchedUsers);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditModalOpened(true);
  };

  const handleDelete = (user: User) => {
    setUsers(users.filter((u) => u.id !== user.id));
  };

  const handleChangeRoleClick = (user: User) => {
    setSelectedUser(user);
    setChangeRoleModalOpened(true);
  };

  const handleRoleChanged = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
    setChangeRoleModalOpened(false);
    setSelectedUser(null);
  };

  const handleUserUpdated = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
    );
    setEditModalOpened(false);
    setSelectedUser(null);
  };

  const handleUserInvited = (userData: Omit<User, "id">) => {
    const newUser: User = {
      ...userData,
      id: Math.max(...users.map((u) => u.id), 0) + 1,
    };
    setUsers([...users, newUser]);
  };

  return (
    <div className={style.users_page}>
      <Paper p={"md"} withBorder>
        <Stack gap="md">
          <div className={style.search_and_button}>
            <div className={style.search_wrapper}>
              <SearchBar value={search} onSearch={setSearch} />
            </div>
            <Button
              className={style.add_button}
              leftSection={<IconPlus size={16} />}
              onClick={() => setInviteModalOpened(true)}
            >
              Add User
            </Button>
          </div>

          <UsersFilters
            role={role}
            status={status}
            roleOptions={roleOptions}
            onRoleChange={onRoleChange}
            onStatusChange={onStatusChange}
          />
        </Stack>
      </Paper>
      <Paper p={"md"} withBorder>
        <UsersTable
          items={filteredUsers}
          onEdit={handleEdit}
          onChangeRole={handleChangeRoleClick}
          onDelete={handleDelete}
        />
      </Paper>

      <InviteUserModal
        opened={inviteModalOpened}
        onClose={() => setInviteModalOpened(false)}
        onInvite={handleUserInvited}
      />

      <EditUserModal
        opened={editModalOpened}
        onClose={() => {
          setEditModalOpened(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSave={handleUserUpdated}
      />

      <ChangeRoleModal
        opened={changeRoleModalOpened}
        onClose={() => {
          setChangeRoleModalOpened(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
        onSave={handleRoleChanged}
      />
    </div>
  );
}
