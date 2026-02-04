import { lazy } from "react";
import { Route, Routes } from "react-router";
import { RootLayout } from "./components/RootLayout";
import { PrivateRoute } from "./routes/PrivateRoute";

const LoginPage = lazy(() => import("./pages/Login"));
const UsersPage = lazy(() => import("./pages/Users"));
const DevicesPage = lazy(() => import("./pages/Devices"));
const DeviceDetailsPage = lazy(() => import("./pages/DeviceDetails"));
const ConfigDiffPage = lazy(() => import("./pages/ConfigDiff"));

const DashboardPage = lazy(() => import("./pages/Dashboard"));
function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="devices" element={<DevicesPage />} />
          <Route path="devices/:deviceId" element={<DeviceDetailsPage />} />
          <Route path="config-diff" element={<ConfigDiffPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
