import { IndianRupee, Eye } from "lucide-react";
import { Link } from "react-router-dom";

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

const OrdersTableRow = ({ order }) => {
  return (
    <tr className="hover:bg-blue-50/40 transition-all duration-150 border-b">
      {/* Order ID */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        <p
          className="font-semibold text-gray-900 text-xs sm:text-sm truncate max-w-[120px]"
          title={order?._id}
        >
          {order?._id}
        </p>
      </td>

      {/* User */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        <p
          className="text-gray-700 text-xs sm:text-sm truncate max-w-[120px]"
          title={order?.userId?.name}
        >
          {order.userId?.emailId || order.userId?._id}
        </p>
      </td>

      {/* Items */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        {order?.items?.length > 0 ? (
          <div className="flex flex-col gap-1 text-xs sm:text-sm">
            {order.items.slice(0, 2).map((item, i) => (
              <p
                key={i}
                className="text-gray-600 truncate max-w-[180px]"
                title={`${item.productName} × ${item.quantity} — ₹${item.subtotal}`}
              >
                {item.productName} × {item.quantity} — ₹{item.subtotal}
              </p>
            ))}
            {order.items.length > 2 && (
              <span className="text-blue-500 text-[10px] sm:text-xs font-medium">
                +{order.items.length - 2} more
              </span>
            )}
          </div>
        ) : (
          <span className="text-gray-400 text-xs sm:text-sm">—</span>
        )}
      </td>

      {/* Total */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        <span className="flex items-center gap-1 text-gray-600 text-xs sm:text-sm whitespace-nowrap">
          <IndianRupee className="w-3 h-3 sm:w-4 sm:h-4" />
          {order?.grandTotal}
        </span>
      </td>

      {/* Payment */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        <span className="text-gray-700 text-xs sm:text-sm whitespace-nowrap">
          {order?.paymentMethod}
        </span>
      </td>

      {/* Date */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-center">
        <span className="text-gray-600 text-xs sm:text-sm whitespace-nowrap">
          {order?.createdAt
            ? new Date(order.createdAt).toLocaleDateString()
            : "—"}
        </span>
      </td>

      {/* Status */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        <div className="flex justify-center">
          <span
            className={`inline-flex items-center py-1 sm:py-1.5 px-2 sm:px-3 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap ${
              STATUS_COLORS[order?.orderStatus] || "bg-gray-100 text-gray-700"
            }`}
          >
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-current mr-1 sm:mr-2" />
            {STATUS_LABELS[order?.orderStatus] || order?.orderStatus}
          </span>
        </div>
      </td>

      {/* Actions */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        <div className="flex justify-center">
          <Link to={`/admin/orders/${order._id}`}>
            <button
              className="btn btn-ghost btn-xs p-1 sm:p-2 min-h-0 h-auto"
              aria-label="View order details"
            >
              <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </Link>
        </div>
      </td>
    </tr>
  );
};

export default OrdersTableRow;
