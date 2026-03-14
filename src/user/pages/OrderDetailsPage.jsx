// src/pages/OrderDetailsPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useUserOrderStore from "../../utils/stores/userOrderStore";
import { AlertCircle } from "lucide-react";

import OrderHeader from "../components/order-details/OrderHeader";
import OrderStatusCard from "../components/order-details/OrderStatusCard";
import OrderItemsSection from "../components/order-details/OrderItemsSection";
import DeliveryAddressCard from "../components/order-details/DeliveryAddressCard";
import PriceSummaryCard from "../components/order-details/PriceSummaryCard";
import ReturnModal from "../components/order-details/ReturnModal";
import CancelModal from "../components/order-details/CancelModal";

export default function OrderDetailsPage() {
  const { id } = useParams();

  const {
    selectedOrder: order,
    returnItem,
    returnOrder,
    loading,
    cancelItem,
    error,
    getOrderById,
  } = useUserOrderStore();

  const [actionType, setActionType] = useState(""); // "return-item" | "return-order"
  const [returnReason, setReturnReason] = useState("");
  const [cancellationReason, setCancellationReason] = useState("");
  const [activeItemId, setActiveItemId] = useState(null);

  useEffect(() => {
    if (id) getOrderById(id);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center py-12">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary mb-4"></span>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <AlertCircle size={64} className="mx-auto text-error mb-6" />
          <h2 className="text-2xl font-bold mb-4">Order not found</h2>
          <p className="text-gray-600 mb-6">{error || "Invalid order ID"}</p>
          <Link to="/orders" className="btn btn-primary">Back to Orders</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-6 px-4">
      <div className="container mx-auto max-w-5xl">
        <OrderHeader orderId={order._id} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Status + Items */}
          <div className="lg:col-span-2 space-y-6">
            <OrderStatusCard
              order={order}
              onReturnOrder={() => {
                setActionType("return-order");
                setActiveItemId(null);
                setReturnReason("");
                document.getElementById("return_modal")?.showModal();
              }}
            />

            <OrderItemsSection
              items={order.items}
              order={order}
              onReturnItem={(itemId) => {
                setActionType("return-item");
                setActiveItemId(itemId);
                setReturnReason("");
                document.getElementById("return_modal")?.showModal();
              }}
              onCancelItem={(itemId) => {
                setCancellationReason("");
                setActiveItemId(itemId);
                document.getElementById("cancel_modal")?.showModal();
              }}
            />
          </div>

          {/* Right: Address + Summary */}
          <div className="space-y-6">
            <DeliveryAddressCard address={order.address?.snapshot} />
            <PriceSummaryCard order={order} />
          </div>
        </div>
      </div>

      {/* Modals */}
      <ReturnModal
        actionType={actionType}
        returnReason={returnReason}
        setReturnReason={setReturnReason}
        activeItemId={activeItemId}
        orderId={order._id}
        onSubmitReturn={async () => {
          if (actionType === "return-item") {
            await returnItem(order._id, activeItemId, { returnReason });
          } else {
            await returnOrder(order._id, { returnReason });
          }
          setReturnReason("");
          setActiveItemId(null);
          setActionType("");
          document.getElementById("return_modal")?.close();
          getOrderById(order._id);
        }}
      />

      <CancelModal
        cancellationReason={cancellationReason}
        setCancellationReason={setCancellationReason}
        activeItemId={activeItemId}
        orderId={order._id}
        onSubmitCancel={async () => {
          await cancelItem(order._id, activeItemId, { cancellationReason });
          setCancellationReason("");
          setActiveItemId(null);
          document.getElementById("cancel_modal")?.close();
          getOrderById(order._id);
        }}
      />
    </div>
  );
}