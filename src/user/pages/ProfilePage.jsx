// src/pages/DashboardPage.jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../utils/stores/userAuthStore";
import userOrderStore from "../../utils/stores/userOrderStore";
import useWalletStore from "../../utils/stores/useWalletStore";
import useAddressStore from "../../utils/stores/useAddressStore";
import useUserWishlistStore from "../../utils/stores/WishlistStore";

import WelcomeHeader from "../components/dashboard/WelcomeHeader";
import StatCards from "../components/dashboard/StatCards";
import RecentOrders from "../components/dashboard/RecentOrders";
import QuickLinks from "../components/dashboard/QuickLinks";

export default function DashboardPage() {
  const navigate = useNavigate();

  const user = useAuthStore((s) => s?.user);
  const logout = useAuthStore((s) => s?.logout);

  const userOrders = userOrderStore((s) => s?.userOrders);
  const getUserOrder = userOrderStore((s) => s?.getUserOrder);

  const balance = useWalletStore((s) => s?.balance);
  const fetchWallet = useWalletStore((s) => s?.fetchWallet);

  const addresses = useAddressStore((s) => s?.addresses);
  const fetchAddresses = useAddressStore((s) => s?.fetchAddresses);

  const wishlistProducts = useUserWishlistStore((s) => s?.wishlistProducts);

  useEffect(() => {
    getUserOrder();
    fetchWallet();
    fetchAddresses();
  }, []);

  const recentOrders = userOrders?.slice(0, 3) || [];

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl space-y-10 lg:space-y-12">
        <WelcomeHeader user={user} onLogout={handleLogout} />

        <StatCards
          balance={balance}
          orderCount={userOrders?.length || 0}
          addressCount={addresses?.length || 0}
          wishlistCount={wishlistProducts?.length || 0}
        />

        <RecentOrders recentOrders={recentOrders} />

        <QuickLinks />
      </div>
    </div>
  );
}