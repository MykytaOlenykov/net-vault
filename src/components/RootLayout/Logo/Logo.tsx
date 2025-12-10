import { Group, Text, ThemeIcon, Box } from "@mantine/core";
import { IconShield } from "@tabler/icons-react";

export const Logo = () => {
  return (
    <Group gap="md">
      <ThemeIcon
        size={36}
        radius="md"
        style={(theme) => ({
          background: `linear-gradient(135deg, ${theme.colors.violet[6]} 0%, ${theme.colors.indigo[6]} 100%)`,
        })}
      >
        <IconShield size={20} color="white" />
      </ThemeIcon>
      <Box>
        <Text c="white" fw={600} size="lg">
          NetVault
        </Text>
        <Text c="gray.5" size="xs">
          Cloud Admin
        </Text>
      </Box>
    </Group>
  );
};
