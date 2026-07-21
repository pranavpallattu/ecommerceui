import { useEffect } from "react";
import { useParams } from "react-router-dom";
import OrderHeader from "../components/order-details/OrderHeader";
import OrderSummary from "../components/order-details/OrderSummary";
import CustomerInfo from "../components/order-details/CustomerInfo";
import DeliveryAddress from "../components/order-details/DeliveryAddress";
import OrderItems from "../components/order-details/OrderItems";
import PaymentPricing from "../components/order-details/PaymentPricing";
import PaymentGatewayDetails from "../components/order-details/PaymentGatewayDetails";
import OrderTimeline from "../components/order-details/OrderTimeline";
import useOrderStore from "../../utils/stores/user/useOrderStore";

const STATUS_COLORS = {
  Confirmed: "bg-blue-100 text-blue-700",
  Processing: "bg-indigo-100 text-indigo-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
  Returned: "bg-orange-100 text-orange-700",
  ReturnPending: "bg-orange-100 text-orange-700",
  ReturnRejected: "bg-red-100 text-red-700",
};

const ALL_STATUSES = [
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { order, loading, fetchOrderById, updateOrderStatus } = useOrderStore();

  useEffect(() => {
    fetchOrderById(id);
  }, [id]);

  if (loading || !order) {
    return (
      <div className="flex justify-center items-center h-80">
        <span className="loading loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="p-3 sm:p-4 md:p-6 lg:p-10 space-y-4 sm:space-y-6">
      <OrderHeader
        status={order.orderStatus}
        onStatusChange={(e) => updateOrderStatus(order._id, e.target.value)}
      />

      <OrderSummary order={order} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <CustomerInfo order={order} />
        <DeliveryAddress address={order.address?.snapshot} />
      </div>

      <OrderItems items={order.items} STATUS_COLORS={STATUS_COLORS} />

      <PaymentPricing order={order} />

      {order.paymentMethod === "Razorpay" && (
        <PaymentGatewayDetails order={order} />
      )}

      <OrderTimeline order={order} />
    </div>
  );
}
