import { Menu, ActionIcon } from "@mantine/core";
import { IconDotsVertical } from "@tabler/icons-react";
import classes from "./ActionMenu.module.css";

export interface ActionItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  color?: string;
  onClick: () => void;
}

export function ActionsMenu({ actions }: { actions: ActionItem[] }) {
  return (
    <Menu withArrow position="bottom-end">
      <Menu.Target>
        <ActionIcon
          variant="transparent"
          size="md"
          classNames={{ root: classes.actionIcon }}
        >
          <IconDotsVertical size={18} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {actions.map(({ key, label, icon, color, onClick }) => (
          <Menu.Item
            key={key}
            leftSection={icon}
            color={color}
            onClick={onClick}
          >
            {label}
          </Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
