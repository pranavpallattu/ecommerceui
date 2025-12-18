// src/admin/components/notifications/NotificationsTableRow.jsx
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useReturnRequestStore } from "../../utils/stores/useReturnRequestStore";

const STATUS_BADGE = {
  ReturnPending: "bg-yellow-100 text-yellow-700",
  Returned: "bg-green-100 text-green-700",
  ReturnRejected: "bg-red-100 text-red-700",
};

const NotificationsTableRow = ({ type, data }) => {
  const {
    approveOrderReturn,
    rejectOrderReturn,
    approveItemReturn,
    rejectItemReturn,
  } = useReturnRequestStore();

  const [actionLoading, setActionLoading] = useState(false);

  const isOrderReturn = type === "order";

  const orderId = isOrderReturn ? data._id : data.orderId;
  const customer = isOrderReturn ? data.userId : data.user;
  const status = isOrderReturn ? data.orderStatus : data.item.itemStatus;
  const reason = isOrderReturn
    ? data.returnedReason
    : data.returnReason || "—";

  const products = isOrderReturn
    ? data.items.map((i) => i.productName).join(", ")
    : data.item.productName;

  const handleApprove = async () => {
    try {
      setActionLoading(true);

      if (isOrderReturn) {
        await approveOrderReturn(orderId);
      } else {
        await approveItemReturn(orderId, data.item._id);
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleReject = async () => {
    try {
      setActionLoading(true);

      if (isOrderReturn) {
        await rejectOrderReturn(orderId);
      } else {
        await rejectItemReturn(orderId, data.item._id);
      }
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <tr className="hover:bg-blue-50/40 transition">
      {/* Order ID */}
      <td className="px-6 py-4 text-sm text-gray-800 font-mono">
        {orderId}
      </td>

      {/* Customer */}
      <td className="px-6 py-4">
        <p className="font-medium text-gray-800">
          {customer?.name && customer?.name}
        </p>
        <p className="text-xs text-gray-500">
          {customer?.emailId || "—"}
        </p>
      </td>

      {/* Products */}
      <td className="px-6 py-4 text-sm text-gray-700">
        {products}
      </td>

      {/* Reason */}
      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
        {reason}
      </td>

      {/* Status */}
      <td className="px-6 py-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_BADGE[status]}`}
        >
          {status}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-center">
        {status === "ReturnPending" ? (
          <div className="flex justify-center gap-3">
            <button
              onClick={handleApprove}
              disabled={actionLoading}
              className="btn btn-xs btn-success"
            >
              <CheckCircle size={14} />
              Approve
            </button>

            <button
              onClick={handleReject}
              disabled={actionLoading}
              className="btn btn-xs btn-error"
            >
              <XCircle size={14} />
              Reject
            </button>
          </div>
        ) : (
          <span className="text-xs text-gray-400">No actions</span>
        )}
      </td>
    </tr>
  );
};

export default NotificationsTableRow;
