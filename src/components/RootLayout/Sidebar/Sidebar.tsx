import { Stack, NavLink } from "@mantine/core";
import { Link, useLocation } from "react-router";
import { navItems } from "../../../shared/constants";

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
              styles={(theme) => ({
                root: {
                  color: isActive ? theme.white : theme.colors.gray[4],
                  backgroundColor: isActive
                    ? theme.colors.violet[6]
                    : "transparent",
                  borderRadius: theme.radius.md,
                  "&:hover": {
                    backgroundColor: theme.colors.violet[6],
                    color: theme.white,
                  },
                },
                label: {
                  fontSize: theme.fontSizes.sm,
                },
              })}
            />
          );
        })}
      </Stack>
    </Stack>
  );
};
