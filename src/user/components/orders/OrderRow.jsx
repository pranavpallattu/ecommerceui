import { Eye, Ban } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderRow({ order, getStatusBadge, onCancelClick }) {
  const canCancel = ["Pending", "Confirmed", "Processing"]?.includes(
    order?.orderStatus,
  );

  return (
    <tr className="hover">
      <td className="font-mono text-xs">
        #{order?._id?.slice(-6)?.toUpperCase()}
      </td>

      <td>
        <ul className="space-y-1">
          {order?.items?.map((item) => (
            <li key={item?._id} className="text-sm">
              <Link
                to={`/product/${item?.productId?._id}`}
                className="hover:underline"
              >
                <span className="font-medium">{item?.productName}</span>
                <span className="text-gray-500 text-xs">
                  {" "}
                  × {item?.quantity}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </td>

      <td>
        <span
          className={` text-white badge badge-sm ${getStatusBadge(order?.orderStatus)}`}
        >
          {order?.orderStatus}
        </span>
      </td>

      <td>
        <span className="badge badge-outline badge-sm">
          {order?.paymentStatus}
        </span>
      </td>

      <td className="font-semibold">
        ₹{order?.grandTotal?.toLocaleString("en-IN")}
      </td>

      <td className="text-xs text-gray-600">
        {new Date(order?.createdAt)?.toLocaleDateString("en-IN")}
      </td>

      <td className="flex gap-2">
        <Link to={`/orders/${order?._id}`} className="btn btn-xs btn-outline">
          <Eye size={14} />
          View
        </Link>

        {canCancel && (
          <button
            onClick={() => onCancelClick(order?._id)}
            className="btn btn-xs bg-red-500 hover:bg-red-600 border-none text-white hover:text-white flex items-center gap-1"
          >
            <Ban size={14} />
            Cancel
          </button>
        )}
      </td>
    </tr>
  );
}
