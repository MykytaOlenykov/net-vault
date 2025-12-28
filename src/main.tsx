import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";

import App from "./App.tsx";
import { theme } from "./shared/theme";

import "@mantine/core/styles.css";
import { QueryClientProvider } from "./api/queryClient.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <ModalsProvider>
            <App />
          </ModalsProvider>
        </MantineProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
