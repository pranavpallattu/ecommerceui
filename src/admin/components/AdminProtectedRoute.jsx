import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../utils/stores/userAuthStore";

export default function AdminProtectedRoute() {
  const { user, role, loading } = useAuthStore();

  if (loading) return null;
  if (!user || role !== "admin") return <Navigate to="/auth" replace />;

  return <Outlet />;
}