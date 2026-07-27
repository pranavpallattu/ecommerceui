import {
  Package,
  XCircle,
  RotateCcw,
  Clock,
  AlertTriangle,
} from "lucide-react";

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
    PartiallyReturnPending: "Partial Return Pending",
    Returned: "Returned",
    PartiallyReturned: "Partially Returned",
    ReturnRejected: "Return Rejected",
    PartiallyReturnRejected: "Partial Return Rejected",
  };

  const formatDateTime = (date) =>
    new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200">
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl bg-blue-50">
              <Package className="w-6 h-6 text-blue-600" />
            </div>

            <div>
              <p className="text-sm text-gray-500">Order ID</p>

              <p className="font-semibold text-lg break-all" title={order._id}>
                {order._id}
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Placed on {formatDateTime(order.createdAt)}
              </p>
            </div>
          </div>

          <div className="text-left md:text-right">
            <p className="text-sm text-gray-500 mb-2">Order Status</p>
            <span
              className={`
    inline-flex
    items-center
    justify-center
    rounded-full
    px-4
    py-2
    text-sm
    font-semibold
    leading-none
    whitespace-nowrap
    ${STATUS_COLORS[order.orderStatus]}
  `}
            >
              {STATUS_LABELS[order.orderStatus] || order.orderStatus}
            </span>
          </div>
        </div>

        {/* Order Action */}
        {(order.cancellationReason || order.returnReason) && (
          <>
            <div className="divider my-6"></div>

            {order.cancellationReason && (
              <div className="flex gap-4">
                <div className="mt-1">
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        Order Cancelled
                      </h4>

                      <p className="text-sm text-gray-500">
                        {order.cancelledAt && formatDateTime(order.cancelledAt)}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-gray-700">
                    {order.cancellationReason}
                  </p>
                </div>
              </div>
            )}

            {order.returnReason && (
              <div className="flex gap-4 mt-6">
                <div className="mt-1">
                  {order.returnRejectedAt ? (
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                  ) : order.returnedAt ? (
                    <RotateCcw className="w-5 h-5 text-orange-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-amber-500" />
                  )}
                </div>

                <div className="flex-1">
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {order.returnRejectedAt
                        ? "Return Rejected"
                        : order.returnedAt
                          ? "Order Returned"
                          : "Return Requested"}
                    </h4>

                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                      {order.returnRequestedAt && (
                        <p>
                          Requested • {formatDateTime(order.returnRequestedAt)}
                        </p>
                      )}

                      {order.returnedAt && (
                        <p>Approved • {formatDateTime(order.returnedAt)}</p>
                      )}

                      {order.returnRejectedAt && (
                        <p>
                          Rejected • {formatDateTime(order.returnRejectedAt)}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-gray-700">
                    {order.returnReason}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
