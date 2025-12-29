import { useState } from "react";
import {
  Modal,
  TextInput,
  Button,
  Stack,
  Select,
  Group,
  Switch,
} from "@mantine/core";
import type { User, UserStatus } from "./types";

interface EditUserModalProps {
  opened: boolean;
  onClose: () => void;
  user: User | null;
  onSave: (user: User) => void;
}

const ROLE_OPTIONS = ["Administrator", "Operator", "Viewer", "Auditor"];
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
  onSave: (user: User) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState<string | null>(user.role);
  const [status, setStatus] = useState<UserStatus>(user.status);
  const [mfa, setMfa] = useState(user.mfa);

  const handleSubmit = () => {
    if (name && email && role) {
      onSave({
        ...user,
        name,
        email,
        role,
        status,
        mfa,
      });
      onClose();
    }
  };

  const isValid = name.trim() && email.trim() && role;

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
        label="Role"
        value={role}
        onChange={setRole}
        data={ROLE_OPTIONS}
        required
      />

      <Select
        label="Status"
        value={status}
        onChange={(value) => setStatus(value as UserStatus)}
        data={STATUS_OPTIONS}
      />

      <Switch
        label="Multi-Factor Authentication (MFA)"
        checked={mfa}
        onChange={(e) => setMfa(e.currentTarget.checked)}
      />

      <Group justify="flex-end" mt="md">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!isValid}>
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
