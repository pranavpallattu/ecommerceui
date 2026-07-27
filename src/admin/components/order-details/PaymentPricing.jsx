import { Wallet } from "lucide-react";

export default function PaymentPricing({ order }) {
  const totalRefunded =
    order.refunds?.reduce((sum, refund) => sum + refund.amount, 0) || 0;

  const paymentInfo = [
    ["Payment Method", order.paymentMethod, ""],
    ["Payment Status", order.paymentStatus, ""],
    ["Checkout Type", order.checkoutType, "capitalize"],
  ];

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-md border border-blue-100">
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-5 flex items-center gap-2">
        <Wallet size={16} className="sm:w-[18px] sm:h-[18px]" />
        Payment & Pricing
      </h3>

      {/* Payment info */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
        {paymentInfo.map(([label, value, cls]) => (
          <div key={label}>
            <p className="text-gray-400">{label}</p>
            <p className={`font-medium text-gray-800 ${cls}`}>{value}</p>
          </div>
        ))}
      </div>

      <hr className="my-4 sm:my-5" />

      {/* Price breakdown */}
      <div className="space-y-2 text-xs sm:text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Subtotal</span>
          <span className="font-medium text-gray-800">₹{order.subTotal?.toLocaleString("en-IN")}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-400">
           Coupon Discount
            {order.couponCode && (
              <span className="ml-1 text-[10px] sm:text-xs text-gray-400">
                ({order.couponCode})
              </span>
            )}
          </span>
          <span className="font-medium text-gray-800">- ₹{order.discount?.toLocaleString("en-IN")}</span>
        </div>

        {totalRefunded > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-400">
              Refunded
              {order.refunds?.length > 0 && (
                <span className="ml-1 text-[10px] sm:text-xs text-gray-400">
                  ({order.refunds.length})
                </span>
              )}
            </span>
            <span className="font-medium text-gray-800">
              - ₹{totalRefunded.toLocaleString("en-IN")}
            </span>
          </div>
        )}

        <div className="flex justify-between pt-2 border-t border-gray-100">
          <span className="font-semibold text-gray-700">Grand Total</span>
          <span className="font-semibold text-base sm:text-lg text-gray-900">
          ₹{order.grandTotal?.toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  );
}