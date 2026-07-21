import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../utils/stores/auth/useAuthStore";

export default function UserGuard() {
  const { user, role, loading } = useAuthStore();

  if (loading) return null;

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}
