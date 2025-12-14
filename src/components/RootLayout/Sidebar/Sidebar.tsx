import { Stack, NavLink } from "@mantine/core";
import { Link, useLocation } from "react-router";
import { navItems } from "../../../shared/constants";
import classes from "./Sidebar.module.css";

export const Sidebar = () => {
  const location = useLocation();

  return (
    <Stack gap={0} h="100%">
      <Stack gap={0} p="xs" style={{ flex: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              component={Link}
              to={item.path}
              label={item.label}
              leftSection={<Icon size={20} />}
              active={isActive}
              className={classes.link}
              classNames={{ label: classes.linkLabel }}
              data-active={isActive || undefined}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
