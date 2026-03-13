// components/wallet/WalletTransactionList.jsx
import { History } from "lucide-react";
import WalletTransactionItem from "./WalletTransactionItem";

const WalletTransactionList = ({ transactions }) => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 border-b flex justify-between items-center">
        <div className="flex items-center gap-3">
          <History className="text-blue-600" />
          <h2 className="text-2xl font-bold">Transaction History</h2>
        </div>
        <span className="text-sm text-gray-500">
          {transactions.length} transactions
        </span>
      </div>

      {transactions.length === 0 ? (
        <div className="py-16 text-center text-gray-500">
          <History size={60} className="mx-auto mb-4 opacity-20" />
          <p>No transactions yet</p>
        </div>
      ) : (
        <div className="divide-y">
          {transactions.map((tx) => (
            <WalletTransactionItem key={tx._id} tx={tx} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WalletTransactionList;