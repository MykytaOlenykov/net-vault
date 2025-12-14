import { Text } from "@mantine/core";
import { useLocation } from "react-router";
import { navItems } from "../../../shared/constants";

export const PageTitle = () => {
  const location = useLocation();
  const navItem = navItems.find((item) => item.path === location.pathname);
  const title = navItem?.label || "NetVault";

  return (
    <Text c="white" fw={600} size="lg">
      {title}
    </Text>
  );
};
