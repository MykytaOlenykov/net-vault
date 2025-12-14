import { AppShell, Burger, Group, Box } from "@mantine/core";
import { Logo } from "../Logo";
import { NotificationButton } from "../NotificationButton";
import { AvatarMenu } from "../AvatarMenu";
import { PageTitle } from "../PageTitle";

interface HeaderProps {
  opened: boolean;
  toggle: () => void;
}

export const Header = ({ opened, toggle }: HeaderProps) => {
  return (
    <AppShell.Header>
      <Group
        h="100%"
        px="md"
        justify="space-between"
        style={{ position: "relative" }}
      >
        <Group gap="md">
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="sm"
            color="gray.4"
          />
          <Logo />
        </Group>

        <Box hiddenFrom="sm" style={{ display: "none" }}>
          <PageTitle />
        </Box>
        <Box
          visibleFrom="sm"
          style={{
            position: "absolute",
            left: 300,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          <PageTitle />
        </Box>

        <Group gap="xs">
          <NotificationButton />
          <AvatarMenu />
        </Group>
      </Group>
    </AppShell.Header>
  );
};
