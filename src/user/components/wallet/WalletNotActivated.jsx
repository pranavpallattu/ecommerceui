import { Wallet } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const WalletNotActivated = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl bg-base-100 rounded-3xl shadow-2xl border border-base-200 overflow-hidden">
          {/* Header */}
          <div className="bg-primary px-8 py-10 text-center text-primary-content">
            <div className="mx-auto w-20 h-20 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center shadow-lg">
              <Wallet size={42} />
            </div>

            <h1 className="mt-6 text-3xl font-bold">Your Wallet is Ready</h1>
          </div>

          {/* Content */}
          <div className="px-8 py-10">
            <div className="mt-6 max-w-xl mx-auto space-y-4 text-center text-gray-600 leading-7">
              <p>
                Your wallet hasn't been activated yet because you haven't
                received any refunds. It will be created automatically when you
                receive your first refund for an eligible cancelled order,
                cancelled item, returned order, or returned item.
              </p>

              <p>
                Once activated, you can use your wallet balance during checkout
                for future purchases and view your complete wallet transaction
                history in one place.
              </p>
            </div>

            {/* Balance */}
            <div className="mt-10 rounded-2xl bg-base-200 border border-base-300 p-8 text-center">
              <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
                Current Balance
              </p>

              <h2 className="mt-3 text-5xl font-bold text-primary">₹0.00</h2>

              <p className="mt-3 text-sm text-gray-500">
                Wallet not activated yet
              </p>
            </div>

            {/* Button */}
            <div className="mt-10 flex justify-center">
              <button
                className="btn btn-primary rounded-xl px-10"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WalletNotActivated;
