// src/components/order-details/PaymentGatewayDetails.jsx
export default function PaymentGatewayDetails({ order }) {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-md border border-blue-100">
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
        Payment Gateway Details
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-xs sm:text-sm">
        <div>
          <p className="text-gray-400 mb-1">Razorpay Order ID</p>
          <p className="font-mono text-xs break-all">{order.razorpayOrderId}</p>
        </div>

        <div>
          <p className="text-gray-400 mb-1">Razorpay Payment ID</p>
          <p className="font-mono text-xs break-all">{order.razorpayPaymentId}</p>
        </div>
      </div>
    </div>
  );
}