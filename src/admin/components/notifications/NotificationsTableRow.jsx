// src/admin/components/notifications/NotificationsTableRow.jsx
import { CheckCircle, XCircle } from "lucide-react";
import { useState } from "react";
import { useReturnRequestStore } from "../../../utils/stores/useReturnRequestStore";

const STATUS_BADGE = {
  ReturnPending: "bg-yellow-100 text-yellow-700",
  Returned: "bg-green-100 text-green-700",
  ReturnRejected: "bg-red-100 text-red-700",
};

const NotificationsTableRow = ({ type, data }) => {
  console.log(data);
  
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
const reason = data?.returnReason 

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
      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <p className="text-xs sm:text-sm text-gray-800 font-mono truncate max-w-[100px] sm:max-w-[150px]" title={orderId}>
          {orderId}
        </p>
      </td>

      {/* Customer */}
      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <p className="font-medium text-gray-800 text-xs sm:text-sm truncate max-w-[120px]" title={customer?.name}>
          {customer?.name || "—"}
        </p>
        <p className="text-[10px] sm:text-xs text-gray-500 truncate max-w-[120px]" title={customer?.emailId}>
          {customer?.emailId || "—"}
        </p>
      </td>

      {/* Products */}
      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <p className="text-xs sm:text-sm text-gray-700 truncate max-w-[150px] sm:max-w-[200px]" title={products}>
          {products}
        </p>
      </td>

      {/* Reason */}
      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <p className="text-xs sm:text-sm text-gray-600 truncate max-w-[150px] sm:max-w-[200px]" title={reason}>
          {reason}
        </p>
      </td>

      {/* Status */}
      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <span
          className={`inline-block px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap ${STATUS_BADGE[status]}`}
        >
          {status === "ReturnPending" ? "Pending" : status === "Returned" ? "Approved" : "Rejected"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        {status === "ReturnPending" ? (
          <div className="flex justify-center gap-1 sm:gap-2 md:gap-3">
            <button
              onClick={handleApprove}
              disabled={actionLoading}
              className="btn btn-xs sm:btn-sm btn-success text-white px-2 sm:px-3 min-h-0 h-7 sm:h-8"
            >
              <CheckCircle size={12} className="sm:w-[14px] sm:h-[14px]" />
              <span className="hidden sm:inline ml-1">Approve</span>
              <span className="sm:hidden">✓</span>
            </button>

            <button
              onClick={handleReject}
              disabled={actionLoading}
              className="btn btn-xs sm:btn-sm btn-error text-white px-2 sm:px-3 min-h-0 h-7 sm:h-8"
            >
              <XCircle size={12} className="sm:w-[14px] sm:h-[14px]" />
              <span className="hidden sm:inline ml-1">Reject</span>
              <span className="sm:hidden">✕</span>
            </button>
          </div>
        ) : (
          <div className="text-center">
            <span className="text-[10px] sm:text-xs text-gray-400">No actions</span>
          </div>
        )}
      </td>
    </tr>
  );
};

export default NotificationsTableRow;