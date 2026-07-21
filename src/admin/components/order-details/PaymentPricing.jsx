import { Calendar } from "lucide-react";

export default function PaymentPricing({ order }) {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-md border border-blue-100">
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
        <Calendar size={16} className="sm:w-[18px] sm:h-[18px]" />
        Payment & Pricing
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-xs sm:text-sm">
        <div>
          <p className="text-gray-400">Payment Method</p>
          <p className="font-medium">{order.paymentMethod}</p>
        </div>

        <div>
          <p className="text-gray-400">Payment Status</p>
          <p className="font-medium">{order.paymentStatus}</p>
        </div>

        <div>
          <p className="text-gray-400">Checkout Type</p>
          <p className="font-medium capitalize">{order.checkoutType}</p>
        </div>

        <div>
          <p className="text-gray-400">Subtotal</p>
          <p className="font-medium">₹{order.subTotal}</p>
        </div>

        <div>
          <p className="text-gray-400">Discount</p>
          <p className="font-medium">- ₹{order.discount}</p>
          {order.couponCode && (
            <span className="text-[10px] sm:text-xs text-green-600 block mt-1">
              Coupon: {order.couponCode}
            </span>
          )}
        </div>

        <div>
          <p className="text-gray-400">Grand Total</p>
          <p className="font-semibold text-base sm:text-lg">
            ₹{order.grandTotal}
          </p>
        </div>
      </div>
    </div>
  );
}
