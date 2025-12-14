import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { MantineProvider } from "@mantine/core";

import App from "./App.tsx";
import { theme } from "./shared/theme/theme.ts";

import "@mantine/core/styles.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <App />
      </MantineProvider>
    </BrowserRouter>
  </StrictMode>,
);
