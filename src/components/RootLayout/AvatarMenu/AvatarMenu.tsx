import { Menu, Avatar, UnstyledButton } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  IconChevronDown,
  IconChevronUp,
  IconLogout,
} from "@tabler/icons-react";

export const AvatarMenu = () => {
  const [menuOpened, setMenuOpened] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // TODO: Add logout logic here
    navigate("/login");
  };

  return (
    <Menu
      shadow="md"
      width={200}
      position="bottom-end"
      opened={menuOpened}
      onChange={setMenuOpened}
      styles={(theme) => ({
        dropdown: {
          backgroundColor: theme.colors.dark[8],
          border: `1px solid ${theme.colors.dark[6]}`,
        },
        item: {
          color: theme.colors.gray[3],
          backgroundColor: "transparent",
          "&:hover": {
            backgroundColor: "transparent",
            opacity: 0.4,
          },
        },
      })}
    >
      <Menu.Target>
        <UnstyledButton
          styles={(theme) => ({
            root: {
              display: "flex",
              alignItems: "center",
              gap: theme.spacing.xs,
              padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
              color: theme.colors.gray[3],
              borderRadius: theme.radius.md,
              transition: "all 0.2s",
              "&:hover": {
                backgroundColor: theme.colors.dark[7],
                color: theme.white,
              },
            },
          })}
        >
          <Avatar
            size={28}
            radius="xl"
            style={(theme) => ({
              background: theme.white,
              color: theme.colors.violet[6],
              fontSize: theme.fontSizes.xs,
              fontWeight: 600,
            })}
          >
            AD
          </Avatar>
          {menuOpened ? (
            <IconChevronUp size={16} />
          ) : (
            <IconChevronDown size={16} />
          )}
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconLogout size={16} />}
          onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
