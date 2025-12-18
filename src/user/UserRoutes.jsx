import UserLayout from "./layout/UserLayout";

// Pages
import HomePage from "./pages/HomePage";
// import ShopPage from "./pages/ShopPage";
// import ProductDetailsPage from "./pages/ProductDetailsPage";
// import WishlistPage from "./pages/WishlistPage";
// import CartPage from "./pages/CartPage";
// import CheckoutPage from "./pages/CheckoutPage";
// import OrderConfirmationPage from "./pages/OrderConfirmationPage";
// import OrdersPage from "./pages/OrdersPage";
// import OrderDetailsPage from "./pages/OrderDetailsPage";
// import ProfilePage from "./pages/ProfilePage";
// import WalletPage from "./pages/WalletPage";
// import AddressPage from "./pages/AddressPage";
// import CouponsPage from "./pages/CouponsPage";
// import ContactPage from "./pages/ContactPage"
// import AboutPage from "./pages/AboutPage";

const userRoutes = {
  path: "/",
  element: <UserLayout />,
  children: [
    { index: true, element: <HomePage /> }, // "/"
    // { path: "shop", element: <ShopPage /> },
    // { path: "product/:id", element: <ProductDetailsPage /> },
    // { path: "wishlist", element: <WishlistPage /> },
    // { path: "cart", element: <CartPage /> },
    // { path: "checkout", element: <CheckoutPage /> },
    // { path: "order-confirmation/:id", element: <OrderConfirmationPage /> },
    // { path: "orders", element: <OrdersPage /> },
    // { path: "orders/:id", element: <OrderDetailsPage /> },
    // { path: "profile", element: <ProfilePage /> },
    // { path: "wallet", element: <WalletPage /> },
    // { path: "address", element: <AddressPage /> },
    // { path: "coupons", element: <CouponsPage /> },
    // { path: "contact", element: <ContactPage /> },
    // { path: "about", element: <AboutPage /> },
  ],
};

export default userRoutes;
