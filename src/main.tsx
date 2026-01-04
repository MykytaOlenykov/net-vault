import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import App from "./App.tsx";

import { theme } from "./shared/theme";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

import "@mantine/core/styles.css";
import { QueryClientProvider } from "./api/queryClient.tsx";
import { Notifications } from "@mantine/notifications";
import { AuthProvider } from "./components/Auth/hooks/AuthProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Notifications />
          <ModalsProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
