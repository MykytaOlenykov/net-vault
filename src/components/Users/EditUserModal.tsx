import { useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Stack,
  Select,
  Group,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import type { User, UserStatus } from "./types";
import { useUpdateUser } from "./hooks/user/useUpdateUser";

interface EditUserModalProps {
  opened: boolean;
  onClose: () => void;
  user: User | null;
  onSave: () => void;
}

const STATUS_OPTIONS: { value: UserStatus; label: string }[] = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "pending", label: "Pending" },
];

function EditUserForm({
  user,
  onSave,
  onClose,
}: {
  user: User;
  onSave: () => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [status, setStatus] = useState<UserStatus>(user.status);

  const updateUserMutation = useUpdateUser(user.id);

  const handleSubmit = async () => {
    if (name && email) {
      try {
        await updateUserMutation.mutateAsync({
          name: name.trim(),
          email: email.trim(),
          status,
        });
        notifications.show({
          title: "Success",
          message: "User updated successfully",
          color: "green",
        });
        onSave();
      } catch (error: unknown) {
        const errorMessage =
          error && typeof error === "object" && "message" in error
            ? String(error.message)
            : "Failed to update user";
        notifications.show({
          title: "Error",
          message: errorMessage,
          color: "red",
        });
      }
    }
  };

  const isValid = name.trim() && email.trim();

  return (
    <Stack gap="md">
      <TextInput
        label="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <TextInput
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Select
        label="Status"
        value={status}
        onChange={(value) => setStatus(value as UserStatus)}
        data={STATUS_OPTIONS}
      />

      <Group justify="flex-end" mt="md">
        <Button 
          variant="default" 
          onClick={onClose}
          disabled={updateUserMutation.isPending}
        >
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          disabled={!isValid || updateUserMutation.isPending}
          loading={updateUserMutation.isPending}
        >
          Save Changes
        </Button>
      </Group>
    </Stack>
  );
}

export function EditUserModal({
  opened,
  onClose,
  user,
  onSave,
}: EditUserModalProps) {
  if (!user) return null;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Edit User: ${user.name}`}
      size="md"
      padding="xl"
    >
      <EditUserForm
        key={user.id}
        user={user}
        onSave={onSave}
        onClose={onClose}
      />
    </Modal>
  );
}
