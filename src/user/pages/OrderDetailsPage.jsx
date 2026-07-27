import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AlertCircle } from "lucide-react";

import OrderHeader from "../components/order-details/OrderHeader";
import OrderStatusCard from "../components/order-details/OrderStatusCard";
import OrderItemsSection from "../components/order-details/OrderItemsSection";
import DeliveryAddressCard from "../components/order-details/DeliveryAddressCard";
import PriceSummaryCard from "../components/order-details/PriceSummaryCard";
import ReturnModal from "../components/order-details/ReturnModal";
import CancelModal from "../components/order-details/CancelModal";
import useOrderStore from "../../utils/stores/user/useOrderStore";

const openModal = (id) => document.getElementById(id)?.showModal();
const closeModal = (id) => document.getElementById(id)?.close();

export default function OrderDetailsPage() {
  const { id } = useParams();
  const {
    selectedOrder: order,
    returnItem,
    returnOrder,
    cancelItem,
    loading,
    error,
    getOrderById,
  } = useOrderStore();

  const [actionType, setActionType] = useState(""); // "return-item" | "return-order"
  const [returnReason, setReturnReason] = useState("");
  const [cancellationReason, setCancellationReason] = useState("");
  const [activeItemId, setActiveItemId] = useState(null);

  useEffect(() => {
    if (id) getOrderById(id);
  }, [id]);

  const startReturn = (type, itemId = null) => {
    setActionType(type);
    setActiveItemId(itemId);
    setReturnReason("");
    openModal("return_modal");
  };

  const startCancel = (itemId) => {
    setActiveItemId(itemId);
    setCancellationReason("");
    openModal("cancel_modal");
  };

  const submitReturn = async () => {
    const payload = { returnReason };
    if (actionType === "return-item") {
      await returnItem(order?._id, activeItemId, payload);
    } else {
      await returnOrder(order?._id, payload);
    }
    setReturnReason("");
    setActiveItemId(null);
    setActionType("");
    closeModal("return_modal");
    getOrderById(order?._id);
  };

  const submitCancel = async () => {
    await cancelItem(order?._id, activeItemId, { cancellationReason });
    setCancellationReason("");
    setActiveItemId(null);
    closeModal("cancel_modal");
    getOrderById(order?._id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center py-12">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <AlertCircle size={64} className="mx-auto text-error mb-6" />
          <h2 className="text-xl sm:text-2xl font-bold mb-4">Order not found</h2>
          <p className="text-gray-600 mb-6">{error || "Invalid order ID"}</p>
          <Link to="/orders" className="btn btn-primary">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-4 sm:py-6 px-3 sm:px-4">
      <div className="container mx-auto max-w-5xl">
        <OrderHeader orderId={order?._id} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <OrderStatusCard
              order={order}
              onReturnOrder={() => startReturn("return-order")}
            />
            <OrderItemsSection
              items={order?.items}
              order={order}
              onReturnItem={(itemId) => startReturn("return-item", itemId)}
              onCancelItem={startCancel}
            />
          </div>

          <div className="space-y-4 sm:space-y-6">
            <DeliveryAddressCard address={order?.address?.snapshot} />
            <PriceSummaryCard order={order} />
          </div>
        </div>
      </div>

      <ReturnModal
        actionType={actionType}
        returnReason={returnReason}
        setReturnReason={setReturnReason}
        activeItemId={activeItemId}
        orderId={order?._id}
        onSubmitReturn={submitReturn}
      />

      <CancelModal
        cancellationReason={cancellationReason}
        setCancellationReason={setCancellationReason}
        activeItemId={activeItemId}
        orderId={order?._id}
        onSubmitCancel={submitCancel}
      />
    </div>
  );
}