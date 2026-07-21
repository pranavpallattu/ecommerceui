import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const WalletTransactionItem = ({ tx }) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row sm:justify-between gap-3 hover:bg-gray-50 transition">
      <div className="flex gap-4">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            tx.type === "credit" ? "bg-green-100" : "bg-red-100"
          }`}
        >
          {tx.type === "credit" ? (
            <ArrowDownRight className="text-green-600" />
          ) : (
            <ArrowUpRight className="text-red-600" />
          )}
        </div>

        <div>
          <p className="font-semibold text-gray-900">{tx.description}</p>
          <p className="text-sm text-gray-500">
            {new Date(tx.date).toLocaleString("en-IN")}
          </p>
          <span
            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium ${
              tx.type === "credit"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {tx.type.toUpperCase()}
          </span>
        </div>
      </div>

      <p
        className={`text-xl font-bold ${
          tx.type === "credit" ? "text-green-600" : "text-red-600"
        }`}
      >
        {tx.type === "credit" ? "+" : "-"}₹{tx.amount.toLocaleString("en-IN")}
      </p>
    </div>
  );
};

export default WalletTransactionItem;
