// import {
//   CheckCircle,
//   Truck,
//   Clock,
//   XCircle,
//   Download,
//   RotateCcw,
//   AlertTriangle,
//   ThumbsUp,
//   Settings,
// } from "lucide-react";

// import { serverUrl } from "../../../services/serverUrl";
// export default function OrderStatusCard({ order, onReturnOrder }) {
//   const formattedDate = new Date(order.createdAt).toLocaleDateString("en-IN", {
//     day: "numeric",
//     month: "short",
//     year: "numeric",
//   });

//   const formattedTime = new Date(order.createdAt).toLocaleTimeString("en-IN", {
//     hour: "2-digit",
//     minute: "2-digit",
//     hour12: true,
//   });

//   const formatDateTime = (date) => {
//     if (!date) return null;

//     return new Date(date).toLocaleString("en-IN", {
//       day: "numeric",
//       month: "short",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//       hour12: true,
//     });
//   };

//   const statusConfig = {
//     Pending: {
//       icon: <Clock className="text-warning" />,
//       color: "text-warning",
//       title: "Order Pending",
//       description:
//         "Your order has been placed and is awaiting seller confirmation.",
//     },

//     Confirmed: {
//       icon: <ThumbsUp className="text-success" />,
//       color: "text-success",
//       title: "Order Confirmed",
//       description: "Your order has been confirmed and will be processed soon.",
//     },

//     Processing: {
//       icon: <Settings className="text-info" />,
//       color: "text-info",
//       title: "Preparing Order",
//       description: "Your items are currently being packed for shipment.",
//     },

//     Shipped: {
//       icon: <Truck className="text-primary" />,
//       color: "text-primary",
//       title: "Order Shipped",
//       description: "Your order has been shipped and is on its way.",
//     },

//     Delivered: {
//       icon: <CheckCircle className="text-success" />,
//       color: "text-success",
//       title: "Order Delivered",
//       description: "Your order has been delivered successfully.",
//     },

//     Cancelled: {
//       icon: <XCircle className="text-error" />,
//       color: "text-error",
//       title: "Order Cancelled",
//       description: "This order has been cancelled.",
//     },

//     PartiallyCancelled: {
//       icon: <XCircle className="text-error" />,
//       color: "text-error",
//       title: "Partially Cancelled",
//       description:
//         "Some items in this order were cancelled while others remain active.",
//     },

//     Returned: {
//       icon: <RotateCcw className="text-orange-600" />,
//       color: "text-orange-600",
//       title: "Order Returned",
//       description:
//         "All eligible items have been returned and the applicable refund has been processed.",
//     },

//     PartiallyReturned: {
//       icon: <RotateCcw className="text-orange-500" />,
//       color: "text-orange-500",
//       title: "Partially Returned",
//       description:
//         "One or more items have been returned. Other items remain delivered or had their return requests rejected.",
//     },

//     ReturnPending: {
//       icon: <Clock className="text-warning" />,
//       color: "text-warning",
//       title: "Return Request Pending",
//       description: "Your return request is awaiting seller approval.",
//     },

//     PartiallyReturnPending: {
//       icon: <Clock className="text-warning" />,
//       color: "text-warning",
//       title: "Partial Return Request Pending",
//       description:
//         "One or more return requests are awaiting seller approval. Other items may already be delivered, returned, or have rejected return requests.",
//     },

//     ReturnRejected: {
//       icon: <AlertTriangle className="text-error" />,
//       color: "text-error",
//       title: "Return Request Rejected",
//       description:
//         "The return request for this order was rejected by the seller.",
//     },

//     PartiallyReturnRejected: {
//       icon: <AlertTriangle className="text-error" />,
//       color: "text-error",
//       title: "Partial Return Rejected",
//       description:
//         "Some return requests were rejected. Other items may still be delivered or have already been returned.",
//     },
//   };

//   const config = statusConfig[order?.orderStatus] || {
//     icon: null,
//     color: "text-gray-500",
//     label: order?.orderStatus,
//   };

//   const displayStatus = config.title || order?.orderStatus;
//   const totalRefunded =
//     order?.refunds?.reduce((sum, refund) => sum + refund.amount, 0) || 0;

//   const refundTransactions = order?.refunds?.length || 0;

//   return (
//     <div className="card bg-base-100 shadow-lg">
//       <div className="card-body">
//         <div className="flex items-start justify-between flex-wrap gap-4">
//         <div className="space-y-5">
//   {/* Status */}
//   <div>
//     <h2 className={`card-title flex items-center gap-3 ${config.color}`}>
//       {config.icon}
//       {displayStatus}
//     </h2>

//     <p className="text-sm text-base-content/60 mt-1 max-w-2xl">
//       {config.description}
//     </p>
//   </div>

//   {/* Order Cancellation Details */}
//   {order?.orderStatus === "Cancelled" && order?.cancellationReason && (
//     <div className="rounded-xl border border-base-300 bg-base-100 p-5">
//       <div className="flex items-center gap-2 mb-4">
//         <XCircle className="w-5 h-5 text-error" />
//         <h3 className="font-semibold text-lg">Cancellation Details</h3>
//       </div>

//       <div className="grid sm:grid-cols-2 gap-6">
//         <div>
//           <p className="text-xs uppercase tracking-wide text-base-content/50 mb-1">
//             Cancelled On
//           </p>

//           <p className="font-medium">
//             {formatDateTime(order.cancelledAt)}
//           </p>
//         </div>

//         <div>
//           <p className="text-xs uppercase tracking-wide text-base-content/50 mb-1">
//             Reason
//           </p>

//           <p className="text-sm leading-6">
//             {order.cancellationReason}
//           </p>
//         </div>
//       </div>
//     </div>
//   )}

//   {/* Order Return Details */}
//   {order?.orderStatus === "Returned" && order?.returnReason && (
//     <div className="rounded-xl border border-base-300 bg-base-100 p-5">
//       <div className="flex items-center gap-2 mb-4">
//         <RotateCcw className="w-5 h-5 text-warning" />
//         <h3 className="font-semibold text-lg">Return Details</h3>
//       </div>

//       <div className="grid sm:grid-cols-2 gap-6">
//         <div>
//           <p className="text-xs uppercase tracking-wide text-base-content/50 mb-1">
//             Returned On
//           </p>

//           <p className="font-medium">
//             {formatDateTime(order.returnedAt)}
//           </p>
//         </div>

//         <div>
//           <p className="text-xs uppercase tracking-wide text-base-content/50 mb-1">
//             Reason
//           </p>

//           <p className="text-sm leading-6">
//             {order.returnReason}
//           </p>
//         </div>
//       </div>
//     </div>
//   )}
// </div>

//           {order?.orderStatus === "Delivered" && (
//             <button
//               className="btn btn-warning btn-outline btn-sm"
//               onClick={onReturnOrder}
//             >
//               Return Order
//             </button>
//           )}
//         </div>

//         <div className="divider my-2"></div>

//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
//           <div>
//             <p className="text-gray-500">Ordered on</p>
//             <p className="font-medium">{formattedDate}</p>
//             <p className="text-xs text-gray-500">{formattedTime}</p>
//           </div>

//           <div>
//             <p className="text-gray-500">Order Type</p>
//             <p className="font-medium">
//               {order?.checkoutType === "buyNow" ? "Buy Now" : "Cart Checkout"}
//             </p>{" "}
//           </div>

//           <div>
//             <p className="text-gray-500">Payment Method</p>
//             <p className="font-medium capitalize">{order?.paymentMethod}</p>
//           </div>

//           <div>
//             <p className="text-gray-500">Payment Status</p>
//             <p className="font-medium">{order?.paymentStatus}</p>
//           </div>

//           <div>
//             <p className="text-gray-500">Total Amount</p>
//             <p className="font-bold text-lg">
//               ₹{order?.grandTotal?.toLocaleString("en-IN")}
//             </p>
//           </div>
//           {refundTransactions > 0 && (
//             <div>
//               <p className="text-gray-500">Refunded</p>

//               <p className="font-bold text-success text-lg">
//                 ₹{totalRefunded.toLocaleString("en-IN")}
//               </p>

//               <p className="text-xs text-gray-500 mt-1">
//                 {refundTransactions}{" "}
//                 {refundTransactions === 1 ? "Transaction" : "Transactions"}
//               </p>
//             </div>
//           )}

//           <div className="mt-3">
//             <a
//               href={`${serverUrl}/api/user/download/${order?._id}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 font-medium text-sm shadow-sm"
//             >
//               <Download size={16} />
//               Download Invoice
//             </a>
//           </div>
//         </div>

//         {/* Refund History */}
//         {order?.refunds?.length > 0 && (
//           <div className="card bg-base-100 shadow-lg mt-6">
//             <div className="card-body">
//               <h2 className="card-title">Refund History</h2>

//               <div className="divider my-2"></div>

//               <div className="space-y-4">
//                 {order.refunds.map((refund) => (
//                   <div
//                     key={refund._id}
//                     className="border border-base-300 rounded-xl p-4"
//                   >
//                     {/* Header */}
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="font-semibold text-sm">
//                           Refund #{refund.refundId.slice(-8)}
//                         </p>
//                         <p className="text-xs text-base-content/60">
//                           {formatDateTime(refund.date)}
//                         </p>
//                       </div>

//                       <span className="badge badge-success badge-outline">
//                         {refund.status}
//                       </span>
//                     </div>

//                     {/* Products */}
//                     {refund.products?.length > 0 && (
//                       <div className="mt-4">
//                         <p className="text-xs uppercase tracking-wide text-base-content/60 mb-2">
//                           Refunded Products
//                         </p>

//                         <div className="space-y-1">
//                           {refund.products.map((product) => (
//                             <div
//                               key={product.itemId}
//                               className="flex justify-between text-sm"
//                             >
//                               <span>{product.productName}</span>
//                               <span className="text-base-content/60">
//                                 × {product.quantity}
//                               </span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {/* Footer */}
//                     <div className="divider my-3"></div>

//                     <div className="flex flex-wrap justify-between gap-3 text-sm">
//                       <div>
//                         <p className="text-base-content/60">Refund Amount</p>
//                         <p className="font-semibold text-success">
//                           ₹{refund.amount.toLocaleString("en-IN")}
//                         </p>
//                       </div>

//                       <div className="max-w-sm text-right">
//                         <p className="text-base-content/60">Reason</p>
//                         <p>{refund.reason}</p>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }



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

import { serverUrl } from "../../../services/serverUrl";
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

  const formatDateTime = (date) => {
    if (!date) return null;

    return new Date(date).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const statusConfig = {
    Pending: {
      icon: <Clock className="text-warning" />,
      color: "text-warning",
      title: "Order Pending",
      description:
        "Your order has been placed and is awaiting seller confirmation.",
    },
    Confirmed: {
      icon: <ThumbsUp className="text-success" />,
      color: "text-success",
      title: "Order Confirmed",
      description: "Your order has been confirmed and will be processed soon.",
    },
    Processing: {
      icon: <Settings className="text-info" />,
      color: "text-info",
      title: "Preparing Order",
      description: "Your items are currently being packed for shipment.",
    },
    Shipped: {
      icon: <Truck className="text-primary" />,
      color: "text-primary",
      title: "Order Shipped",
      description: "Your order has been shipped and is on its way.",
    },
    Delivered: {
      icon: <CheckCircle className="text-success" />,
      color: "text-success",
      title: "Order Delivered",
      description: "Your order has been delivered successfully.",
    },
    Cancelled: {
      icon: <XCircle className="text-error" />,
      color: "text-error",
      title: "Order Cancelled",
      description: "This order has been cancelled.",
    },
    PartiallyCancelled: {
      icon: <XCircle className="text-error" />,
      color: "text-error",
      title: "Partially Cancelled",
      description:
        "Some items in this order were cancelled while others remain active.",
    },
    Returned: {
      icon: <RotateCcw className="text-orange-600" />,
      color: "text-orange-600",
      title: "Order Returned",
      description:
        "All eligible items have been returned and the applicable refund has been processed.",
    },
    PartiallyReturned: {
      icon: <RotateCcw className="text-orange-500" />,
      color: "text-orange-500",
      title: "Partially Returned",
      description:
        "One or more items have been returned. Other items remain delivered or had their return requests rejected.",
    },
    ReturnPending: {
      icon: <Clock className="text-warning" />,
      color: "text-warning",
      title: "Return Request Pending",
      description: "Your return request is awaiting seller approval.",
    },
    PartiallyReturnPending: {
      icon: <Clock className="text-warning" />,
      color: "text-warning",
      title: "Partial Return Request Pending",
      description:
        "One or more return requests are awaiting seller approval. Other items may already be delivered, returned, or have rejected return requests.",
    },
    ReturnRejected: {
      icon: <AlertTriangle className="text-error" />,
      color: "text-error",
      title: "Return Request Rejected",
      description:
        "The return request for this order was rejected by the seller.",
    },
    PartiallyReturnRejected: {
      icon: <AlertTriangle className="text-error" />,
      color: "text-error",
      title: "Partial Return Rejected",
      description:
        "Some return requests were rejected. Other items may still be delivered or have already been returned.",
    },
  };

  const config = statusConfig[order?.orderStatus] || {
    icon: null,
    color: "text-gray-500",
    label: order?.orderStatus,
  };

  const displayStatus = config.title || order?.orderStatus;
  const totalRefunded =
    order?.refunds?.reduce((sum, refund) => sum + refund.amount, 0) || 0;
  const refundTransactions = order?.refunds?.length || 0;

  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-5">
            {/* Status */}
            <div>
              <h2 className={`card-title flex items-center gap-3 ${config.color}`}>
                {config.icon}
                {displayStatus}
              </h2>
              <p className="text-sm text-base-content/60 mt-1 max-w-2xl">
                {config.description}
              </p>
            </div>

            {/* Order Cancellation Details */}
            {order?.orderStatus === "Cancelled" && order?.cancellationReason && (
              <div className="rounded-xl border border-base-300 bg-base-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <XCircle className="w-5 h-5 text-error" />
                  <h3 className="font-semibold text-lg">Cancellation Details</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-base-content/50 mb-1">
                      Cancelled On
                    </p>
                    <p className="font-medium">{formatDateTime(order.cancelledAt)}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-base-content/50 mb-1">
                      Reason
                    </p>
                    <p className="text-sm leading-6">{order.cancellationReason}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Order Return Details */}
            {order?.orderStatus === "Returned" && order?.returnReason && (
              <div className="rounded-xl border border-base-300 bg-base-100 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <RotateCcw className="w-5 h-5 text-warning" />
                  <h3 className="font-semibold text-lg">Return Details</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-wide text-base-content/50 mb-1">
                      Returned On
                    </p>
                    <p className="font-medium">{formatDateTime(order.returnedAt)}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-base-content/50 mb-1">
                      Reason
                    </p>
                    <p className="text-sm leading-6">{order.returnReason}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {order?.orderStatus === "Delivered" && (
            <button
              className="btn btn-warning btn-outline btn-sm w-full sm:w-auto"
              onClick={onReturnOrder}
            >
              Return Order
            </button>
          )}
        </div>

        <div className="divider my-2"></div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Ordered on</p>
            <p className="font-medium">{formattedDate}</p>
            <p className="text-xs text-gray-500">{formattedTime}</p>
          </div>
          <div>
            <p className="text-gray-500">Order Type</p>
            <p className="font-medium">
              {order?.checkoutType === "buyNow" ? "Buy Now" : "Cart Checkout"}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Payment Method</p>
            <p className="font-medium capitalize">{order?.paymentMethod}</p>
          </div>
          <div>
            <p className="text-gray-500">Payment Status</p>
            <p className="font-medium">{order?.paymentStatus}</p>
          </div>
          <div>
            <p className="text-gray-500">Total Amount</p>
            <p className="font-bold text-lg">₹{order?.grandTotal?.toLocaleString("en-IN")}</p>
          </div>
          {refundTransactions > 0 && (
            <div>
              <p className="text-gray-500">Refunded</p>
              <p className="font-bold text-success text-lg">
                ₹{totalRefunded.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {refundTransactions} {refundTransactions === 1 ? "Transaction" : "Transactions"}
              </p>
            </div>
          )}
          <div className="col-span-2 sm:col-span-1 mt-3">
            
            <a  href={`${serverUrl}/api/user/download/${order?._id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:border-blue-300 transition-all duration-200 font-medium text-sm shadow-sm w-full sm:w-auto justify-center"
            >
              <Download size={16} />
              Download Invoice
            </a>
          </div>
        </div>

        {/* Refund History */}
        {order?.refunds?.length > 0 && (
          <div className="card bg-base-100 shadow-lg mt-6">
            <div className="card-body">
              <h2 className="card-title">Refund History</h2>
              <div className="divider my-2"></div>

              <div className="space-y-4">
                {order.refunds.map((refund) => (
                  <div key={refund._id} className="border border-base-300 rounded-xl p-4">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <p className="font-semibold text-sm">
                          Refund #{refund.refundId.slice(-8)}
                        </p>
                        <p className="text-xs text-base-content/60">
                          {formatDateTime(refund.date)}
                        </p>
                      </div>
                      <span className="badge badge-success badge-outline w-fit">
                        {refund.status}
                      </span>
                    </div>

                    {/* Products */}
                    {refund.products?.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs uppercase tracking-wide text-base-content/60 mb-2">
                          Refunded Products
                        </p>
                        <div className="space-y-1">
                          {refund.products.map((product) => (
                            <div key={product.itemId} className="flex justify-between text-sm">
                              <span>{product.productName}</span>
                              <span className="text-base-content/60">× {product.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="divider my-3"></div>
                    <div className="flex flex-col sm:flex-row justify-between gap-3 text-sm">
                      <div>
                        <p className="text-base-content/60">Refund Amount</p>
                        <p className="font-semibold text-success">
                          ₹{refund.amount.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <div className="sm:max-w-sm sm:text-right">
                        <p className="text-base-content/60">Reason</p>
                        <p>{refund.reason}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}