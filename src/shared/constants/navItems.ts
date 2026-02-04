import {
  IconLayoutDashboard,
  IconServer,
  IconGitCompare,
  IconUsers,
} from "@tabler/icons-react";

export interface NavItem {
  path: string;
  icon: typeof IconLayoutDashboard;
  label: string;
}

export const navItems: NavItem[] = [
  { path: "/", icon: IconLayoutDashboard, label: "Dashboard" },
  { path: "/devices", icon: IconServer, label: "Devices" },
  { path: "/config-diff", icon: IconGitCompare, label: "Config Diff" },
  { path: "/users", icon: IconUsers, label: "Users" },
];
