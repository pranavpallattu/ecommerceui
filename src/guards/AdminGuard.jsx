import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../utils/stores/auth/useAuthStore";

export default function AdminGuard() {
  const { user, role, loading } = useAuthStore();

  if (loading) return null;

  // Not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Logged in but not an admin
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
