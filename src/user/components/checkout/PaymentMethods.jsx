// src/components/checkout/PaymentMethods.jsx
import { Truck, Wallet as WalletIcon, CreditCard } from "lucide-react";

export default function PaymentMethods({ selectedPayment, setSelectedPayment }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body space-y-3">
        <h2 className="card-title">Payment Method</h2>

        <label className="flex gap-3 p-4 border rounded-xl cursor-pointer">
          <input
            type="radio"
            checked={selectedPayment === "cod"}
            onChange={() => setSelectedPayment("cod")}
            className="radio radio-primary"
          />
          <Truck /> Cash on Delivery
        </label>

        <label className="flex gap-3 p-4 border rounded-xl cursor-pointer">
          <input
            type="radio"
            checked={selectedPayment === "wallet"}
            onChange={() => setSelectedPayment("wallet")}
            className="radio radio-primary"
          />
          <WalletIcon /> Wallet
        </label>

        <label className="flex gap-3 p-4 border rounded-xl cursor-pointer">
          <input
            type="radio"
            checked={selectedPayment === "razorpay"}
            onChange={() => setSelectedPayment("razorpay")}
            className="radio radio-primary"
          />
          <CreditCard /> Razorpay
        </label>
      </div>
    </div>
  );
}