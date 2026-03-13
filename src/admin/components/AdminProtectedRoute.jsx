// import { Navigate, Outlet } from "react-router-dom";
// import useAdminStore from "../../utils/stores/adminStore";

// const AdminProtectedRoute = () => {
//   const { admin, loading } = useAdminStore();

//   if (loading) return null;
//   if (!admin) return <Navigate to="/auth" replace />;

//   return <Outlet />;
// };

// export default AdminProtectedRoute;



// src/admin/components/AdminProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../utils/stores/userAuthStore";

export default function AdminProtectedRoute() {
  const { user, role, loading } = useAuthStore();

  if (loading) return null;
  if (!user || role !== "admin") return <Navigate to="/auth" replace />;

  return <Outlet />;
}