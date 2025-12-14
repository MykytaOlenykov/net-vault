import {
  IconLayoutDashboard,
  IconServer,
  IconDatabase,
  IconGitCompare,
  IconUsers,
  IconSettings,
} from "@tabler/icons-react";

export interface NavItem {
  path: string;
  icon: typeof IconLayoutDashboard;
  label: string;
}

export const navItems: NavItem[] = [
  { path: "/", icon: IconLayoutDashboard, label: "Dashboard" },
  { path: "/devices", icon: IconServer, label: "Devices" },
  { path: "/backups", icon: IconDatabase, label: "Backups" },
  { path: "/config-diff", icon: IconGitCompare, label: "Config Diff" },
  { path: "/users", icon: IconUsers, label: "Users" },
  { path: "/settings", icon: IconSettings, label: "Settings" },
];
