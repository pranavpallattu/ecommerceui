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

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

const formattedTime = new Date(order.createdAt).toLocaleTimeString("en-IN", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
});
 const statusConfig = {
  Pending: {
    icon: <Clock className="text-warning" />,
    color: "text-warning",
    title: "Order Pending",
    description: "Your order has been placed and is awaiting confirmation.",
  },

  Confirmed: {
    icon: <ThumbsUp className="text-success" />,
    color: "text-success",
    title: "Order Confirmed",
    description: "Seller has confirmed your order.",
  },

  Processing: {
    icon: <Settings className="text-info" />,
    color: "text-info",
    title: "Preparing Order",
    description: "Your items are being packed.",
  },

  Shipped: {
    icon: <Truck className="text-primary" />,
    color: "text-primary",
    title: "Order Shipped",
    description: "Your package is on the way.",
  },

  Delivered: {
    icon: <CheckCircle className="text-success" />,
    color: "text-success",
    title: "Delivered",
    description: "Package delivered successfully.",
  },

  Cancelled: {
    icon: <XCircle className="text-error" />,
    color: "text-error",
    title: "Cancelled",
    description: "This order has been cancelled.",
  },

  PartiallyCancelled: {
    icon: <XCircle className="text-error" />,
    color: "text-error",
    title: "Partially Cancelled",
    description: "Some items in your order were cancelled.",
  },

Returned: {
  icon: <RotateCcw className="text-orange-600" />,
  color: "text-orange-600",
  title: "Returned",
  description: "Your return has been completed. The refund has been credited to your wallet.",
},

  PartiallyReturned: {
    icon: <RotateCcw className="text-orange-500" />,
    color: "text-orange-500",
    title: "Partially Returned",
    description: "Some items have been returned.",
  },

  ReturnPending: {
    icon: <Clock className="text-warning" />,
    color: "text-warning",
    title: "Return Requested",
    description: "Your return request is waiting for seller approval.",
  },

  PartiallyReturnPending: {
    icon: <Clock className="text-warning" />,
    color: "text-warning",
    title: "Partial Return Requested",
    description: "Return request for some items is awaiting seller approval.",
  },

  ReturnRejected: {
    icon: <AlertTriangle className="text-error" />,
    color: "text-error",
    title: "Return Rejected",
    description: "Your return request was rejected by the seller.",
  },

  PartiallyReturnRejected: {
    icon: <AlertTriangle className="text-error" />,
    color: "text-error",
    title: "Partial Return Rejected",
    description: "Return request for some items was rejected.",
  },
};

  const config = statusConfig[order.orderStatus] || {
    icon: null,
    color: "text-gray-500",
    label: order.orderStatus,
  };

const displayStatus = config.title || order.orderStatus;
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
       <div className="flex items-start justify-between flex-wrap gap-4">
  <div>
    <h2 className={`card-title flex items-center gap-3 ${config.color}`}>
      {config.icon}
      {displayStatus}
    </h2>

    <p className="text-sm text-gray-500 mt-1">
      {config.description}
    </p>
  </div>

  {order.orderStatus === "Delivered" && (
    <button
      className="btn btn-warning btn-outline btn-sm"
      onClick={onReturnOrder}
    >
      Return Order
    </button>
  )}
</div>

        <div className="divider my-2"></div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Placed on</p>
           <p className="font-medium">
  {formattedDate}
</p>
<p className="text-xs text-gray-500">
  {formattedTime}
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