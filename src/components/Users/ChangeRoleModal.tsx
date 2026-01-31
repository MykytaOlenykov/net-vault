import { useState } from "react";
import { Modal, Select, Button, Stack, Group, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import type { User } from "./types";
import { useChangeRole } from "./hooks/user/useChangeRole";

interface ChangeRoleModalProps {
  opened: boolean;
  onClose: () => void;
  user: User | null;
  onSave: () => void;
  roles: string[];
}

function ChangeRoleForm({
  user,
  onSave,
  onClose,
  roles,
}: {
  user: User;
  onSave: () => void;
  onClose: () => void;
  roles: string[];
}) {
  const [role, setRole] = useState<string | null>(user.role);

  const changeRoleMutation = useChangeRole(user.id);

  const handleSubmit = async () => {
    if (role && role !== user.role) {
      try {
        await changeRoleMutation.mutateAsync({ role });
        notifications.show({
          title: "Success",
          message: "User role changed successfully",
          color: "green",
        });
        onSave();
      } catch (error: unknown) {
        const errorMessage =
          error && typeof error === "object" && "message" in error
            ? String(error.message)
            : "Failed to change role";
        notifications.show({
          title: "Error",
          message: errorMessage,
          color: "red",
        });
      }
    }
  };

  const hasChanges = role && role !== user.role;

  return (
    <Stack gap="md">
      <Text size="sm" c="dimmed">
        Current role:{" "}
        <Text span fw={600}>
          {user.role}
        </Text>
      </Text>

      <Select
        label="New Role"
        placeholder="Select a role"
        value={role}
        onChange={setRole}
        data={roles.map((r) => ({ value: r, label: r }))}
        required
      />

      <Group justify="flex-end" mt="md">
        <Button 
          variant="default" 
          onClick={onClose}
          disabled={changeRoleMutation.isPending}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={!hasChanges || changeRoleMutation.isPending}
          loading={changeRoleMutation.isPending}
        >
          Change Role
        </Button>
      </Group>
    </Stack>
  );
}

export function ChangeRoleModal({
  opened,
  onClose,
  user,
  onSave,
  roles,
}: ChangeRoleModalProps) {
  if (!user) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Change Role: ${user.name}`}
      size="md"
      padding="xl"
    >
      <ChangeRoleForm
        key={user.id}
        user={user}
        onSave={onSave}
        onClose={onClose}
        roles={roles}
      />
    </Modal>
  );
}
