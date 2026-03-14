// src/pages/OrdersPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Eye, Ban, Package, AlertCircle } from "lucide-react";
import useUserOrderStore from "../../utils/stores/userOrderStore";

import OrdersTable from "../components/orders/OrdersTable";
import CancelModal from "../components/orders/CancelModal";

const getStatusBadge = (status) => {
  switch (status) {
    case "Pending": return "badge-warning";
    case "Confirmed":
    case "Processing": return "badge-info";
    case "Shipped": return "badge-primary";
    case "Delivered": return "badge-success";
    case "Cancelled":
    case "PartiallyCancelled": return "badge-error";
    case "Returned":
    case "PartiallyReturned": return "badge-secondary";
    case "ReturnPending": return "badge-warning";
    case "ReturnRejected": return "badge-error";
    default: return "badge-ghost";
  }
};

export default function OrdersPage() {
  const { userOrders, loading, error, getUserOrder, cancelOrder } =
    useUserOrderStore();

  const [cancelOrderId, setCancelOrderId] = useState(null);
  const [cancelReason, setCancelReason] = useState("");

  useEffect(() => {
    getUserOrder();
  }, []);

  const handleCancelClick = (orderId) => {
    setCancelOrderId(orderId);
    setCancelReason(""); // reset reason every time
    document.getElementById("cancel_modal")?.showModal();
  };

  const handleConfirmCancel = async () => {
    if (!cancelReason.trim()) {
      alert("Please provide a cancellation reason"); // or use toast
      return;
    }

    await cancelOrder(cancelOrderId, { reason: cancelReason });
    setCancelOrderId(null);
    setCancelReason("");
    document.getElementById("cancel_modal")?.close();
  };

  const handleCloseModal = () => {
    setCancelOrderId(null);
    setCancelReason("");
    document.getElementById("cancel_modal")?.close();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

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

  if (!userOrders?.length) {
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

<h1>My Orders</h1>

        <OrdersTable
          orders={userOrders}
          getStatusBadge={getStatusBadge}
          onCancelClick={handleCancelClick}
        />
      </div>

      {/* Custom Cancel Modal */}
      <CancelModal
        cancelOrderId={cancelOrderId}
        cancelReason={cancelReason}
        setCancelReason={setCancelReason}
        onClose={handleCloseModal}
        onConfirmCancel={handleConfirmCancel}
      />
    </div>
  );
}