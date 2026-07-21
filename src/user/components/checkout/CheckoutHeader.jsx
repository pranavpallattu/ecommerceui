import { ArrowLeft, ShoppingBag } from "lucide-react";
import React from "react";
import { Link } from "lucide-react";

const CheckoutHeader = ({ isBuyNow, checkoutData }) => {
  return (
    <>
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 sm:p-6 mb-8">
        {!isBuyNow && (
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-primary transition mb-5"
          >
            <ArrowLeft size={18} />
            Back to Cart
          </Link>
        )}

        <div className="flex items-start justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>

            <div className="min-w-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Checkout
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Review your order before placing it
              </p>
            </div>
          </div>

          {/* Right */}
          {/* Right */}
          <div className="bg-base-100 border border-base-200 rounded-2xl px-4 sm:px-5 py-3 text-center shrink-0 min-w-[90px] sm:min-w-[110px]">
            {!isBuyNow && (
              <p className="text-xl sm:text-2xl font-bold text-primary">
                {checkoutData?.items?.length || 0}
              </p>
            )}

            <p
              className={`uppercase tracking-wide text-gray-400 ${
                isBuyNow
                  ? "text-sm sm:text-base font-semibold py-2"
                  : "text-[10px] sm:text-xs"
              }`}
            >
              {isBuyNow ? "Buy Now" : "Items"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutHeader;
