// src/user/components/UserProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../utils/stores/userAuthStore";

export default function UserProtectedRoute() {
  const { user, loading } = useAuthStore();

  if (loading) return null;
  if (!user) return <Navigate to="/auth" replace />;

  return <Outlet />;
}