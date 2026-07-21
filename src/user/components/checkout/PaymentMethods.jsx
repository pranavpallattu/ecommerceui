import { Truck, Wallet as WalletIcon, CreditCard } from "lucide-react";

export default function PaymentMethods({
  selectedPayment,
  setSelectedPayment,
  walletBalance,
  grandTotal,
  walletLoading,
}) {
  const hasEnoughBalance = walletBalance >= grandTotal;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title mb-4">Payment Method</h2>

        {/* COD */}
        <label className="border rounded-xl p-4 flex gap-4 cursor-pointer hover:border-primary">
          <input
            type="radio"
            checked={selectedPayment === "cod"}
            onChange={() => setSelectedPayment("cod")}
            className="radio radio-primary mt-1"
          />

          <div>
            <div className="flex items-center gap-2 font-medium">
              <Truck size={18} />
              Cash on Delivery
            </div>

            <p className="text-sm text-gray-500">
              Pay when your order arrives.
            </p>
          </div>
        </label>

        {/* Wallet */}

        <label
          className={`border rounded-xl p-4 flex gap-4 cursor-pointer hover:border-primary ${
            !hasEnoughBalance ? "border-warning" : ""
          }`}
        >
          <input
            type="radio"
            checked={selectedPayment === "wallet"}
            onChange={() => setSelectedPayment("wallet")}
            className="radio radio-primary mt-1"
          />

          <div className="flex-1">
            <div className="flex items-center gap-2 font-medium">
              <WalletIcon size={18} />
              Wallet
            </div>

            {walletLoading ? (
              <p className="text-sm text-gray-500">Loading...</p>
            ) : (
              <>
                <p className="text-sm text-gray-500">
                  Available Balance ₹{walletBalance.toFixed(2)}
                </p>

                {hasEnoughBalance ? (
                  <p className="text-success text-xs mt-1">
                    Sufficient balance
                  </p>
                ) : (
                  <p className="text-error text-xs mt-1">
                    Insufficient balance
                  </p>
                )}
              </>
            )}
          </div>
        </label>

        {/* Razorpay */}

        <label className="border rounded-xl p-4 flex gap-4 cursor-pointer hover:border-primary">
          <input
            type="radio"
            checked={selectedPayment === "razorpay"}
            onChange={() => setSelectedPayment("razorpay")}
            className="radio radio-primary mt-1"
          />

          <div>
            <div className="flex items-center gap-2 font-medium">
              <CreditCard size={18} />
              Razorpay
            </div>

            <p className="text-sm text-gray-500">UPI • Cards • Net Banking</p>
          </div>
        </label>
      </div>
    </div>
  );
}
