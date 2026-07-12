// src/components/order-details/OrderSummary.jsx
export default function OrderSummary({ order }) {
  const STATUS_COLORS = {
    Pending: "bg-yellow-100 text-yellow-700",

    Confirmed: "bg-blue-100 text-blue-700",

    Processing: "bg-indigo-100 text-indigo-700",

    Shipped: "bg-purple-100 text-purple-700",

    Delivered: "bg-green-100 text-green-700",

    Cancelled: "bg-red-100 text-red-700",
    PartiallyCancelled: "bg-red-50 text-red-600",

    ReturnPending: "bg-amber-100 text-amber-700",
    PartiallyReturnPending: "bg-amber-50 text-amber-600",

    Returned: "bg-orange-100 text-orange-700",
    PartiallyReturned: "bg-orange-50 text-orange-600",

    ReturnRejected: "bg-gray-200 text-gray-700",
    PartiallyReturnRejected: "bg-gray-100 text-gray-600",
  };

  const STATUS_LABELS = {
    Pending: "Pending",
    Confirmed: "Confirmed",
    Processing: "Processing",
    Shipped: "Shipped",
    Delivered: "Delivered",

    Cancelled: "Cancelled",
    PartiallyCancelled: "Partially Cancelled",

    ReturnPending: "Return Pending",
    PartiallyReturnPending: "Partially Return Pending",

    Returned: "Returned",
    PartiallyReturned: "Partially Returned",

    ReturnRejected: "Return Rejected",
    PartiallyReturnRejected: "Partially Return Rejected",
  };

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-md border border-blue-100">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-4 sm:mb-5">
        Order Summary
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div>
          <p className="text-gray-400 text-xs sm:text-sm">Order ID</p>
          <p
            className="font-semibold text-sm sm:text-base truncate"
            title={order._id}
          >
            {order._id}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-xs sm:text-sm">Created At</p>
          <p className="text-sm sm:text-base">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <div className="sm:col-span-2 lg:col-span-1">
          <p className="text-gray-400 text-xs sm:text-sm">Status</p>
          <span
            className={`inline-block px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium ${STATUS_COLORS[order.orderStatus]}`}
          >
            {STATUS_LABELS[order.orderStatus] || order.orderStatus}{" "}
          </span>
        </div>
      </div>
    </div>
  );
}
