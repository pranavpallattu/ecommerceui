import UserLayout from "./layout/UserLayout";

// Pages
import HomePage from "./pages/HomePage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ShopPage from "./pages/ShopPage";
import WishlistPage from "./pages/WishlistPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrdersPage from "./pages/OrdersPage";
import OrderDetailsPage from "./pages/OrderDetailsPage";
import ProfilePage from "./pages/ProfilePage";
import WalletPage from "./pages/WalletPage";
import AddressPage from "./pages/AddressPage";
import CouponsPage from "./pages/CouponsPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import UserProtectedRoute from "../admin/components/ProtectedRoute";


const userRoutes = {
  path: "/",
  element: <UserLayout />,
  children: [
    { index: true, element: <HomePage /> },
    { path: "shop", element: <ShopPage /> },
    { path: "product/:id", element: <ProductDetailsPage /> },
    { path: "contact", element: <ContactPage /> },
    { path: "about", element: <AboutPage /> },

    {
      element: <UserProtectedRoute />,
      children: [
        { path: "wishlist", element: <WishlistPage /> },
        { path: "cart", element: <CartPage /> },
        { path: "checkout", element: <CheckoutPage /> },
        { path: "checkout/:buyNowId", element: <CheckoutPage /> },
        { path: "orders", element: <OrdersPage /> },
        { path: "orders/:id", element: <OrderDetailsPage /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "wallet", element: <WalletPage /> },
        { path: "address", element: <AddressPage /> },
        { path: "coupons", element: <CouponsPage /> },
      ],
    },
  ],
};

export default userRoutes;
