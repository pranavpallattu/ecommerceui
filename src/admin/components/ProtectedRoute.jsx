// import { Navigate, Outlet } from "react-router-dom";
// import useUserStore from "../../utils/stores/userStore";

// const UserProtectedRoute = () => {
//   const { user, loading } = useUserStore();

//   if (loading) return null;
//   return user ? <Outlet /> : <Navigate to="/auth" replace />;
// };

// export default UserProtectedRoute;



// src/user/components/UserProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../../utils/stores/userAuthStore";

export default function UserProtectedRoute() {
  const { user, loading } = useAuthStore();

  if (loading) return null;
  if (!user) return <Navigate to="/auth" replace />;

  return <Outlet />;
}