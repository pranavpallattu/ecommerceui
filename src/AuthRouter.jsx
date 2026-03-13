// import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";
// import UserProtectedRoute from "./user/components/UserProtectedRoute";

// import DashboardPage from "./admin/pages/DashboardPage";
// import HomePage from "./user/pages/HomePage";
import AdminProtectedRoute from "./admin/components/AdminProtectedRoute";
import UserProtectedRoute from "./admin/components/ProtectedRoute";
import DashboardPage from "./admin/pages/DashboardPage";
import Auth from "./pages/Auth";
import GoogleSuccess from "./pages/GoogleSuccess";
import HomePage from "./user/pages/HomePage";
// import GoogleSuccess from "./pages/GoogleSuccess";

const routes = [
  {
    path: "/auth",
    element: <Auth />,
  },

  {
    path: "/google-success",
    element: <GoogleSuccess />,
  },

  {
    path: "/admin",
    element: <AdminProtectedRoute/>,
    children: [
      { path: "dashboard", element: <DashboardPage /> },
    ],
  },

  {
    path: "/",
    element: <UserProtectedRoute />,
    children: [
      { index: true, element: <HomePage /> },
    ],
  },
];

export default routes;