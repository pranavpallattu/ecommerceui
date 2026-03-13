import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Ban, Package, AlertCircle } from "lucide-react";
import useUserOrderStore from "../../utils/stores/userOrderStore";

/* ---------- Status Badge Helper ---------- */
const getStatusBadge = (status) => {
  switch (status) {
    case "Pending":
      return "badge-warning";
    case "Confirmed":
    case "Processing":
      return "badge-info";
    case "Shipped":
      return "badge-primary";
    case "Delivered":
      return "badge-success";
    case "Cancelled":
    case "PartiallyCancelled":
      return "badge-error";
    case "Returned":
    case "PartiallyReturned":
      return "badge-secondary";
    case "ReturnPending":
      return "badge-warning";
    case "ReturnRejected":
      return "badge-error";
    default:
      return "badge-ghost";
  }
};

export default function OrdersPage() {
  const { userOrders, loading, error, getUserOrder, cancelOrder } =
    useUserOrderStore();

  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    getUserOrder();
  }, [getUserOrder]);

  /* ---------- Loading ---------- */
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  /* ---------- Error ---------- */
  if (error) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={48} className="mx-auto text-error mb-4" />
          <p className="font-semibold mb-3">{error}</p>
          <button onClick={getUserOrder} className="btn btn-primary btn-sm">
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ---------- Empty ---------- */
  if (!userOrders.length) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <Package size={64} className="mx-auto text-base-300 mb-4" />
          <h2 className="text-xl font-bold mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-4">Your orders will appear here</p>
          <Link to="/shop" className="btn btn-primary btn-sm">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6">My Orders</h1>

        <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
          <table className="table table-sm w-full">
            <thead>
              <tr>
                <th>Order</th>
                <th>Items</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Total</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {userOrders.map((order) => {
                const canCancel = [
                  "Pending",
                  "Confirmed",
                  "Processing",
                ].includes(order.orderStatus);

                return (
                  <tr key={order._id} className="hover">
                    <td className="font-mono text-xs">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>

                    <td>
                      <ul className="space-y-1">
                        {order.items.map((item) => (
                          <li key={item._id} className="text-sm">
                            <Link
                              to={`/product/${item.productId._id}`}
                              className="hover:underline"
                            >
                              <span className="font-medium">
                                {item.productName}
                              </span>
                              <span className="text-gray-500 text-xs">
                                {" "}
                                × {item.quantity}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </td>

                    <td>
                      <span
                        className={`badge badge-sm ${getStatusBadge(
                          order.orderStatus,
                        )}`}
                      >
                        {order.orderStatus}
                      </span>
                    </td>

                    <td>
                      <span className="badge badge-outline badge-sm">
                        {order.paymentStatus}
                      </span>
                    </td>

                    <td className="font-semibold">
                      ₹{order.grandTotal.toLocaleString("en-IN")}
                    </td>

                    <td className="text-xs text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString("en-IN")}
                    </td>

                    <td className="flex gap-2">
                      <Link
                        to={`/orders/${order._id}`}
                        className="btn btn-xs btn-outline"
                      >
                        <Eye size={14} />
                        View
                      </Link>

                      {canCancel && (
                        <button
                          onClick={() => {
                            setCancelOrderId(order._id);
                            document.getElementById("cancel_modal").showModal();
                          }}
                          className="btn btn-xs bg-red-500 hover:bg-red-600 border-none text-white hover:text-white flex items-center gap-1"
                        >
                          <Ban size={14} />
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ---------- Cancel Order Modal ---------- */}
      <dialog id="cancel_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-600">
            Confirm Cancellation
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Please tell us why you want to cancel this order. Once submitted,
            this action cannot be changed.{" "}
          </p>

          <textarea
            className="textarea textarea-bordered w-full mt-3"
            placeholder="Reason for cancellation"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
          />

          <div className="modal-action">
            <button
              className="btn btn-outline"
              onClick={() => {
                setCancelOrderId(null);
                setCancelReason("");
                document.getElementById("cancel_modal").close();
              }}
            >
              Close
            </button>

            <button
              className="btn btn-error text-white"
              disabled={!cancelReason.trim()}
              onClick={async () => {
                await cancelOrder(cancelOrderId, {
                  reason: cancelReason,
                });
                setCancelOrderId(null);
                setCancelReason("");
                document.getElementById("cancel_modal").close();
              }}
            >
              Confirm Cancel
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
