import { AppShell } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Suspense } from "react";
import { Outlet } from "react-router";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export const RootLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: 64 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      styles={(theme) => ({
        header: {
          backgroundColor: theme.colors.dark[8],
          borderBottom: `1px solid ${theme.colors.dark[6]}`,
        },
        navbar: {
          backgroundColor: theme.colors.dark[8],
          borderRight: `1px solid ${theme.colors.dark[6]}`,
        },
      })}
    >
      <Header opened={opened} toggle={toggle} />

      <AppShell.Navbar p={0}>
        <Sidebar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </AppShell.Main>
    </AppShell>
  );
};
