import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../utils/stores/auth/useAuthStore";

export default function AuthGuard() {
  const { user, role, loading } = useAuthStore();

  if (loading) return null;

  if (user) {
    return (
      <Navigate to={role === "admin" ? "/admin/dashboard" : "/"} replace />
    );
  }

  return <Outlet />;
}
