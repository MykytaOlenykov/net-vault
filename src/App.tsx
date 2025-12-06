import { lazy } from "react";
import { Route, Routes } from "react-router";
import { RootLayout } from "./components/RootLayout";

const LoginPage = lazy(() => import("./pages/Login"));
const UsersPage = lazy(() => import("./pages/Users"));
const DevicesPage = lazy(() => import("./pages/Devices"));
const DeviceDetailsPage = lazy(() => import("./pages/DeviceDetails"));

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RootLayout />}>
        <Route path="/users" element={<UsersPage />} />
        <Route path="/devices" element={<DevicesPage />} />
        <Route path="/devices/:deviceId" element={<DeviceDetailsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
