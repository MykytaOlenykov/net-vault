import { useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Stack,
  Select,
  Group,
  PasswordInput,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useCreateUser } from "./hooks/user/useCreateUser";

interface InviteUserModalProps {
  opened: boolean;
  onClose: () => void;
  onInvite: () => void;
  roles: string[];
}

export function InviteUserModal({
  opened,
  onClose,
  onInvite,
  roles,
}: InviteUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<string | null>(roles[0] || null);

  const createUserMutation = useCreateUser();

  const handleSubmit = async () => {
    if (name && email && password && role) {
      try {
        await createUserMutation.mutateAsync({
          name: name.trim(),
          email: email.trim(),
          password: password,
          role,
        });
        notifications.show({
          title: "Success",
          message: "User created successfully",
          color: "green",
        });
        // Reset form
        setName("");
        setEmail("");
        setPassword("");
        setRole(roles[0] || null);
        onInvite();
      } catch (error: unknown) {
        const errorMessage =
          error && typeof error === "object" && "message" in error
            ? String(error.message)
            : "Failed to create user";
        notifications.show({
          title: "Error",
          message: errorMessage,
          color: "red",
        });
      }
    }
  };

  const isValid = name.trim() && email.trim() && password.trim() && role;

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Invite New User"
      size="md"
      padding="xl"
    >
      <Stack gap="md">
        <TextInput
          label="Full Name"
          placeholder="Enter user's full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <TextInput
          label="Email Address"
          placeholder="user@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <PasswordInput
          label="Password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        />

        <Select
          label="Role"
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
            disabled={createUserMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!isValid || createUserMutation.isPending}
            loading={createUserMutation.isPending}
          >
            Invite User
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
