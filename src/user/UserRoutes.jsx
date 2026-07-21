import UserLayout from "./layout/UserLayout";
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ShopPage from "./pages/ShopPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import WalletPage from "./pages/WalletPage";
import AddressPage from "./pages/AddressPage";
import CouponsPage from "./pages/CouponsPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import OrderResultPage from "./pages/OrderResultsPage";
import DashboardPage from "./pages/DashboardPage";
import UserGuard from "../guards/UserGuard";

const publicUserRoutes = {
  element: <UserLayout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: "shop", element: <ShopPage /> },
    { path: "product/:id", element: <ProductDetailsPage /> },
    { path: "contact", element: <ContactPage /> },
    { path: "about", element: <AboutPage /> },
  ],
};

const protectedUserRoutes = {
  element: <UserGuard />,
  children: [
    {
      element: <UserLayout />,
      children: [
        { path: "wishlist", element: <WishlistPage /> },
        { path: "cart", element: <CartPage /> },
        { path: "checkout", element: <CheckoutPage /> },
        { path: "checkout/:buyNowId", element: <CheckoutPage /> },
        { path: "orders", element: <OrdersPage /> },
        { path: "orders/:id", element: <OrderDetailsPage /> },
        { path: "profile", element: <DashboardPage /> },
        { path: "wallet", element: <WalletPage /> },
        { path: "address", element: <AddressPage /> },
        { path: "coupons", element: <CouponsPage /> },
        { path: "/order/:status", element: <OrderResultPage /> },
      ],
    },
  ],
};

const userRoutes = {
  path: "/",
  children: [publicUserRoutes, protectedUserRoutes],
};

export default userRoutes;
