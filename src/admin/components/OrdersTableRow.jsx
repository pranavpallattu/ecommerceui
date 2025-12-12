import { IndianRupeeIcon, View } from "lucide-react";
import { Link } from "react-router-dom";

const OrdersTableRow = ({ order }) => {
  return (
    <tr className="hover:bg-blue-50/40 transition-all duration-150 border-b">
      {/* Order ID */}
      <td className="px-8 py-6 font-semibold text-gray-900">{order?._id}</td>

      {/* User */}
      <td className="px-8 py-6 text-gray-700">{order?.userId?.name}</td>

      {/* Items */}
      <td className="px-8 py-6 text-gray-600 capitalize">
        {order?.items?.length > 0 ? (
          <div className="flex flex-col">
            {order.items.slice(0, 2).map((item, i) => (
              <p key={i}>
                {item.productName} × {item.quantity} — ₹{item.subtotal}
              </p>
            ))}
            {order.items.length > 2 && (
              <span className="text-blue-500 text-xs">
                +{order.items.length - 2} more
              </span>
            )}
          </div>
        ) : (
          "—"
        )}
      </td>

      {/* Total */}
      <td className="px-8 py-6 text-gray-600">
        <span className="flex items-center gap-1">
          <IndianRupeeIcon className="w-4 h-4" />
          {order?.grandTotal}
        </span>
      </td>

      {/* Payment */}
      <td className="px-8 py-6">{order?.paymentMethod}</td>

      {/* Date */}
      <td className="px-8 py-6 text-gray-600">
        {order?.createdAt
          ? new Date(order.createdAt).toLocaleDateString()
          : "—"}
      </td>

      {/* Status */}
      <td className="px-8 py-6">
        <span className="inline-flex items-center py-1.5 px-3 rounded-full text-xs font-medium bg-green-100 text-green-700">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2" />
          {order?.orderStatus}
        </span>
      </td>

      {/* Actions */}
      <td className="px-8 py-6">
        <Link to={`/admin/orders/${order._id}`}>
          <button className="btn btn-ghost btn-xs">
            <View />
          </button>
        </Link>
      </td>
    </tr>
  );
};

export default OrdersTableRow;
