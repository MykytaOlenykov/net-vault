import { Navigate, Outlet } from "react-router";
import { useAuth } from "../components/Auth/hooks/AuthContext";

export function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <span>Loading...</span>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
