import { useState } from "react";
import { Modal, TextInput, Button, Stack, Select, Group } from "@mantine/core";
import type { User } from "./types";

interface InviteUserModalProps {
  opened: boolean;
  onClose: () => void;
  onInvite: (user: Omit<User, "id">) => void;
}

const ROLE_OPTIONS = ["Administrator", "Operator", "Viewer", "Auditor"];

export function InviteUserModal({
  opened,
  onClose,
  onInvite,
}: InviteUserModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<string | null>("Viewer");

  const handleSubmit = () => {
    if (name && email && role) {
      onInvite({
        name: name.trim(),
        email: email.trim(),
        role,
        status: "pending",
        lastLogin: "Never",
        mfa: false,
      });
      // Reset form
      setName("");
      setEmail("");
      setRole("Viewer");
      onClose();
    }
  };

  const isValid = name.trim() && email.trim() && role;

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

        <Select
          label="Role"
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
          <Button onClick={handleSubmit} disabled={!isValid}>
            Invite User
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}
