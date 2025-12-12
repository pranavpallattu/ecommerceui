import AdminLayout from "./layout/AdminLayout";
import OrdersPage from "./pages/OrdersPage";
import CustomersPage from "./pages/CustomersPage";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import CategoriesPage from "./pages/CategoriesPage";
import CouponsPage from "./pages/CouponsPage";
import SalesReportPage from "./pages/SalesReportPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import OrderDetailsPage from"./pages/OrderDetailsPage";
import NotificationsPage from "./pages/NotificationsPage";

const adminRoutes = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    { path: "dashboard", element: <DashboardPage /> },
    { path: "customers", element: <CustomersPage /> },
    { path: "orders", element: <OrdersPage /> },
        { path: "orders/:id", element: <OrderDetailsPage /> },
    { path: "products", element: <ProductsPage /> },
    { path: "products/:id", element: <ProductDetailsPage /> },
    { path: "categories", element: <CategoriesPage /> },
    { path: "sales", element: <SalesReportPage /> },
    { path: "coupons", element: <CouponsPage /> },
        { path: "notifications", element: <NotificationsPage /> },

  ],
};

export default adminRoutes;
