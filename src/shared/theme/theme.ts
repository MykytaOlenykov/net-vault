import { createTheme } from "@mantine/core";

export const theme = createTheme({
  colors: {
    dark: [
      "#f9fafb",
      "#e5e7eb",
      "#9ca3af",
      "#6b7280",
      "#4a4b66",
      "#373854",
      "#24253a",
      "#1a1b26",
      "#141520",
      "#0f0f14",
    ],
    violet: [
      "#f5f3ff",
      "#ede9fe",
      "#ddd6fe",
      "#c4b5fd",
      "#a78bfa",
      "#8b5cf6",
      "#7c3aed",
      "#6d28d9",
      "#5b21b6",
      "#4c1d95",
    ],
  },
  primaryColor: "violet",
  primaryShade: { light: 6, dark: 5 },
  defaultRadius: "md",
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontFamilyMonospace: "'Consolas', 'Monaco', 'Courier New', monospace",
  headings: {
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    fontWeight: "600",
    sizes: {
      h1: { fontSize: "1.875rem", lineHeight: "1.3" },
      h2: { fontSize: "1.5rem", lineHeight: "1.3" },
      h3: { fontSize: "1.25rem", lineHeight: "1.3" },
      h4: { fontSize: "1.125rem", lineHeight: "1.3" },
    },
  },
  components: {
    Button: {
      defaultProps: {
        size: "sm",
      },
    },
    TextInput: {
      defaultProps: {
        size: "sm",
      },
    },
    Select: {
      defaultProps: {
        size: "sm",
      },
    },
    Table: {
      defaultProps: {
        highlightOnHover: true,
      },
    },
    Modal: {
      defaultProps: {
        centered: true,
        padding: "xl",
      },
    },
  },
});
