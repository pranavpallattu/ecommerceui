import { useEffect } from "react";
import useWalletStore from "../../utils/stores/user/useWalletStore";
import WalletTransactionList from "../components/wallet/WalletTransactionList";
import WalletBalanceCard from "../components/wallet/WalletBalanceCard";
import WalletNotActivated from "../components/wallet/WalletNotActivated";

const WalletPage = () => {
  const {
    balance,
    transactionHistory,
    loading,
    error,
    fetchWallet,
    hasMore,
    loadMore,
  } = useWalletStore();

  useEffect(() => {
    fetchWallet();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // Wallet not created yet
  if (error === "Wallet not found") {
    return <WalletNotActivated />;
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="alert alert-error max-w-md">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <WalletBalanceCard balance={balance} />

        <WalletTransactionList
          transactions={transactionHistory}
          hasMore={hasMore}
          onLoadMore={loadMore}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default WalletPage;
