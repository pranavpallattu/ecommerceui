// src/pages/WalletPage.jsx
import { useEffect } from "react";
import useWalletStore from "../../utils/stores/useWalletStore";
import { IndianRupee, ArrowUpRight, ArrowDownRight, History, Plus, Wallet } from "lucide-react";

const WalletPage = () => {
  const { balance, transactionHistory, loading, error, fetchWallet } = useWalletStore();

  useEffect(() => {
    fetchWallet();
  }, []);

  // Sort latest first (non-mutating)
  const sortedTransactions = [...transactionHistory].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-blue-600 mb-4"></span>
          <p className="text-gray-600 font-medium">Loading your wallet...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="text-red-500 mb-6">
            <Wallet size={64} strokeWidth={1.5} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">Something went wrong</h2>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={fetchWallet}
            className="btn btn-primary btn-lg px-10"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16 max-w-5xl">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 text-white rounded-3xl shadow-2xl p-8 lg:p-12 mb-12 relative overflow-hidden">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,white_1px,transparent_0)] bg-[length:20px_20px]"></div>
          </div>

          <div className="relative z-10 text-center">
            <p className="text-lg lg:text-xl font-medium opacity-90 mb-3">
              Wallet Balance
            </p>
            <div className="flex items-center justify-center gap-4">
              <IndianRupee size={56} className="opacity-90" />
              <h1 className="text-6xl lg:text-8xl font-black tracking-tight">
                {balance?.toLocaleString("en-IN") || "0"}
              </h1>
            </div>
            <p className="text-sm lg:text-base opacity-80 mt-4">
              Updated • {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 lg:p-8 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <History size={28} className="text-blue-600" />
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Transaction History
              </h2>
            </div>
            <span className="text-sm text-gray-500">
              {sortedTransactions.length} transactions
            </span>
          </div>

          {sortedTransactions.length === 0 ? (
            <div className="py-20 text-center text-gray-500">
              <History size={80} className="mx-auto mb-6 opacity-20" />
              <p className="text-xl font-medium">No transactions yet</p>
              <p className="text-gray-600 mt-2">
                Add money or make purchases to see activity here
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {sortedTransactions.map((tx) => (
                <div
                  key={tx._id}
                  className="p-6 lg:p-8 flex items-start justify-between hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                      tx.type === "credit" ? "bg-green-100" : "bg-red-100"
                    }`}>
                      {tx.type === "credit" ? (
                        <ArrowDownRight className="text-green-600" size={28} />
                      ) : (
                        <ArrowUpRight className="text-red-600" size={28} />
                      )}
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-lg">
                        {tx.description}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(tx.date).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                      <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
                        tx.type === "credit" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {tx.type.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`text-xl lg:text-2xl font-bold ${
                      tx.type === "credit" ? "text-green-600" : "text-red-600"
                    }`}>
                      {tx.type === "credit" ? "+" : "-"}
                      ₹{tx.amount.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletPage;