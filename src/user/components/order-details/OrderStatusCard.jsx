// src/components/order-details/OrderStatusCard.jsx
import {
  CheckCircle,
  Truck,
  Clock,
  XCircle,
  Download,
  RotateCcw,
  AlertTriangle,
  ThumbsUp,
  Settings,
} from "lucide-react";

export default function OrderStatusCard({ order, onReturnOrder }) {
  const statusConfig = {
    Pending: {
      icon: <Clock className="text-warning" />,
      color: "text-warning",
    },
    Confirmed: {
      icon: <ThumbsUp className="text-success" />,
      color: "text-success",
    },
    Processing: {
      icon: <Settings className="text-info" />,
      color: "text-info",
    },
    Shipped: {
      icon: <Truck className="text-primary" />,
      color: "text-primary",
    },
    Delivered: {
      icon: <CheckCircle className="text-success" />,
      color: "text-success",
    },
    Cancelled: {
      icon: <XCircle className="text-error" />,
      color: "text-error",
    },
    PartiallyCancelled: {
      icon: <XCircle className="text-error" />,
      color: "text-error",
      label: "Partially Cancelled",
    },
    Returned: {
      icon: <RotateCcw className="text-orange-600" />,
      color: "text-orange-600",
    },
    PartiallyReturned: {
      icon: <RotateCcw className="text-orange-600" />,
      color: "text-orange-600",
      label: "Partially Returned",
    },
    ReturnPending: {
      icon: <Clock className="text-warning" />,
      color: "text-warning",
      label: "Return Pending",
    },
    ReturnRejected: {
      icon: <AlertTriangle className="text-error" />,
      color: "text-error",
      label: "Return Rejected",
    },
  };

  const config = statusConfig[order.orderStatus] || {
    icon: null,
    color: "text-gray-500",
    label: order.orderStatus,
  };

  const displayStatus = config.label || order.orderStatus;

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className={`card-title flex items-center gap-3 flex-wrap ${config.color}`}>
          {config.icon}
          {displayStatus}

          {/* Return Order Button – only shown when eligible */}
          {order.orderStatus === "Delivered" && (
            <button
              className="btn btn-warning btn-outline btn-xs ml-3"
              onClick={onReturnOrder}
            >
              Return Order
            </button>
          )}
        </h2>

        <div className="divider my-2"></div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Placed on</p>
            <p className="font-medium">
              {new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <div>
            <p className="text-gray-500">Checkout Type</p>
            <p className="font-medium">{order.checkoutType}</p>
          </div>

          <div>
            <p className="text-gray-500">Payment</p>
            <p className="font-medium">{order.paymentMethod?.toUpperCase()}</p>
          </div>

          <div>
            <p className="text-gray-500">Status</p>
            <p className="font-medium">{order.paymentStatus}</p>
          </div>

          <div>
            <p className="text-gray-500">Total</p>
            <p className="font-bold text-lg">
              ₹{order.grandTotal?.toLocaleString("en-IN")}
            </p>
          </div>

          {order.invoice?.url && (
            <div className="mt-3">
              <a
                href={order.invoice.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 border border-gray-200 hover:border-blue-500 px-3 py-2 rounded-md transition w-full sm:w-auto"
              >
                <Download size={16} />
                Download Invoice
              </a>
            </div>
          )}
        </div>

        {/* Refund History (if any) */}
        {order.refunds?.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
            <h4 className="font-semibold text-green-700 mb-3">Refund History</h4>
            {order.refunds.map((refund) => (
              <div key={refund._id} className="border rounded-md p-3 mb-2 bg-white">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Refund ID: {refund.refundId}</span>
                  <span className="badge badge-success badge-sm">{refund.status}</span>
                </div>
                <p className="text-sm mt-1">Amount: ₹{refund.amount}</p>
                <p className="text-sm text-gray-600">Reason: {refund.reason}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Refunded on {new Date(refund.date).toLocaleDateString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}