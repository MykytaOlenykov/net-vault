import { Menu, Avatar, UnstyledButton } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  IconChevronDown,
  IconChevronUp,
  IconLogout,
} from "@tabler/icons-react";
import classes from "./AvatarMenu.module.css";

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
      classNames={{
        dropdown: classes.menuDropdown,
        item: classes.menuItem,
      }}
    >
      <Menu.Target>
        <UnstyledButton className={classes.button}>
          <Avatar size={28} radius="xl" className={classes.avatar}>
            NV
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
