import { Wallet, CreditCard, Banknote, IndianRupee } from "lucide-react";

const METHODS = [
  { key: "razorpay", label: "Razorpay", icon: CreditCard },
  { key: "wallet", label: "Wallet", icon: Wallet },
  { key: "cod", label: "Cash on Delivery", icon: Banknote },
];

export default function PaymentMethodsCard({ paymentMethods }) {
  const totalAmount = METHODS.reduce(
    (sum, m) => sum + Number(paymentMethods?.[m.key]?.amount || 0),
    0
  );

  return (
    <div className="bg-white rounded-2xl border border-gray-200">
      <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Payment Method Breakdown</h2>
          <p className="text-sm text-gray-500 mt-1">Orders and revenue grouped by payment method.</p>
        </div>
        <div className="hidden sm:block text-right">
          <p className="text-xs text-gray-500">Total Revenue</p>
          <p className="text-xl font-bold text-gray-900 flex items-center gap-0.5">
            <IndianRupee size={16} />
            {totalAmount.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
        {METHODS.map(({ key, label, icon: Icon }) => {
          const data = paymentMethods?.[key] || { count: 0, amount: 0, percentage: 0 };
          const pct = data.percentage || 0;

          return (
            <div
              key={key}
              className="rounded-xl border border-gray-200 p-5 hover:border-blue-200 hover:bg-blue-50/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Icon size={20} className="text-blue-600" />
                </div>
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
                  {pct}%
                </span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-1">{label}</h3>
              <p className="text-2xl font-bold text-gray-900 flex items-center gap-0.5 mb-1">
                <IndianRupee size={17} />
                {Number(data.amount || 0).toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-gray-500 mb-4">{data.count} Orders</p>

              <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
                <div
                  className="h-full bg-blue-600 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}