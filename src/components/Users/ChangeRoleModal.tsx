import { useState } from "react";
import { Modal, Select, Button, Stack, Group, Text } from "@mantine/core";
import type { User } from "./types";

interface ChangeRoleModalProps {
  opened: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (user: User) => void;
}

const ROLE_OPTIONS = ["Administrator", "Operator", "Viewer", "Auditor"];

function ChangeRoleForm({
  user,
  onSave,
  onClose,
}: {
  user: User;
  onSave: (user: User) => void;
  onClose: () => void;
}) {
  const [role, setRole] = useState<string | null>(user.role);

  const handleSubmit = () => {
    if (role && role !== user.role) {
      onSave({
        ...user,
        role,
      });
      onClose();
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
        data={ROLE_OPTIONS}
        required
      />

      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!hasChanges}>
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
      />
    </Modal>
  );
}
