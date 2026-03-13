// pages/WalletPage.jsx
import { useEffect } from "react";
import useWalletStore from "../../utils/stores/useWalletStore";
import WalletTransactionList from "../components/wallet/WalletTransactionList";
import WalletBalanceCard from "../components/wallet/WalletBalanceCard";

const WalletPage = () => {
  const { balance, transactionHistory, loading, error, fetchWallet } =
    useWalletStore();

  useEffect(() => {
    fetchWallet();
  }, []);

  const sortedTransactions = [...transactionHistory].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <WalletBalanceCard  balance={balance} />
        <WalletTransactionList transactions={sortedTransactions} />
      </div>
    </div>
  );
};

export default WalletPage;