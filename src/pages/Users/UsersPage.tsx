import { useState, useMemo } from "react";
import { Paper, Stack, Button, Loader, Center } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useDebouncedValue } from "@mantine/hooks";
import {
  UsersTable,
  UsersFilters,
  EditUserModal,
  InviteUserModal,
  ChangeRoleModal,
  useGetUsers,
  useGetRoles,
  useDeleteUser,
  type User,
} from "../../components/Users";
import { SearchBar } from "../../shared/ui/searchBar";
import style from "./UsersPage.module.css";

const MIN_SEARCH_LENGTH = 3;

export default function UsersPage() {
  const [inviteModalOpened, setInviteModalOpened] = useState(false);
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [changeRoleModalOpened, setChangeRoleModalOpened] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive" | "pending"
  >("all");

  const { data: rolesData } = useGetRoles();
  const roles = useMemo(() => rolesData || [], [rolesData]);

  const deleteUserMutation = useDeleteUser();

  const queryParams = useMemo(() => {
    const params: {
      page?: number;
      limit?: number;
      role?: string;
      status?: "active" | "inactive" | "pending";
      search?: string;
    } = {
      page: 1,
      limit: 100,
    };

    // Додаємо search тільки якщо введено мінімум 3 символи
    if (debouncedSearch && debouncedSearch.trim().length >= MIN_SEARCH_LENGTH) {
      params.search = debouncedSearch.trim();
    }
    if (roleFilter && roleFilter !== "all") {
      params.role = roleFilter;
    }
    if (statusFilter && statusFilter !== "all") {
      params.status = statusFilter;
    }

    return params;
  }, [debouncedSearch, roleFilter, statusFilter]);

  const { data: users = [], isLoading } = useGetUsers(queryParams);

  const roleOptionsFromApi = useMemo(() => {
    if (!roles || !Array.isArray(roles) || roles.length === 0) {
      return [{ value: "all", label: "All" }];
    }
    return [
      { value: "all", label: "All" },
      ...roles.map((r) => ({ value: r.name, label: r.name })),
    ];
  }, [roles]);

  // Отримуємо масив назв ролей для модалок
  const roleNames = useMemo(() => roles.map((r) => r.name), [roles]);

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setEditModalOpened(true);
  };

  const handleDelete = async (user: User) => {
    try {
      await deleteUserMutation.mutateAsync(user.id);
      notifications.show({
        title: "Success",
        message: "User deleted successfully",
        color: "green",
      });
    } catch (error: unknown) {
      const errorMessage =
        error && typeof error === "object" && "message" in error
          ? String(error.message)
          : "Failed to delete user";
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    }
  };

  const handleChangeRoleClick = (user: User) => {
    setSelectedUser(user);
    setChangeRoleModalOpened(true);
  };

  const handleRoleChanged = () => {
    setChangeRoleModalOpened(false);
    setSelectedUser(null);
  };

  const handleUserUpdated = () => {
    setEditModalOpened(false);
    setSelectedUser(null);
  };

  const handleUserInvited = () => {
    setInviteModalOpened(false);
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
            role={roleFilter}
            status={statusFilter}
            roleOptions={roleOptionsFromApi}
            onRoleChange={(value) => setRoleFilter(value)}
            onStatusChange={(value) =>
              setStatusFilter(value as "all" | "active" | "inactive" | "pending")
            }
          />
        </Stack>
      </Paper>
      <Paper p={"md"} withBorder>
        {isLoading ? (
          <Center h={200}>
            <Loader size="lg" />
          </Center>
        ) : (
          <UsersTable
            items={users}
            onEdit={handleEdit}
            onChangeRole={handleChangeRoleClick}
            onDelete={handleDelete}
          />
        )}
      </Paper>

      <InviteUserModal
        opened={inviteModalOpened}
        onClose={() => setInviteModalOpened(false)}
        onInvite={handleUserInvited}
        roles={roleNames}
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
        roles={roleNames}
      />
    </div>
  );
}
