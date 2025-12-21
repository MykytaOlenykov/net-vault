import ApiClient from "./ApiClient";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
if (!apiBaseUrl) {
  throw new Error(
    "VITE_API_BASE_URL is not defined in the environment variables",
  );
}

const api = new ApiClient(apiBaseUrl);

export default api;
