import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


import WelcomeHeader from "../components/dashboard/WelcomeHeader";
import StatCards from "../components/dashboard/StatCards";
import RecentOrders from "../components/dashboard/RecentOrders";
import QuickLinks from "../components/dashboard/QuickLinks";
import useWalletStore from "../../utils/stores/user/useWalletStore";
import useAddressStore from "../../utils/stores/user/useAddressStore";
import useAuthStore from "../../utils/stores/auth/useAuthStore";
import useOrderStore from "../../utils/stores/user/useOrderStore";
import useWishlistStore from "../../utils/stores/user/useWishlistStore";

export default function DashboardPage() {
  const navigate = useNavigate();

  const user = useAuthStore((s) => s?.user);
  const logout = useAuthStore((s) => s?.logout);

  const userOrders = useOrderStore((s) => s?.userOrders);
  const getUserOrders = useOrderStore((s) => s?.getUserOrders);

  const balance = useWalletStore((s) => s?.balance);
  const fetchWallet = useWalletStore((s) => s?.fetchWallet);

  const addresses = useAddressStore((s) => s?.addresses);
  const fetchAddresses = useAddressStore((s) => s?.fetchAddresses);

  const wishlistProducts = useWishlistStore((s) => s?.wishlistProducts);

  useEffect(() => {
    getUserOrders();
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
