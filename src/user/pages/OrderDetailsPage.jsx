// src/pages/OrderDetailsPage.jsx
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useUserOrderStore from "../../utils/stores/userOrderStore";
import { useState } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  IndianRupee,
  CreditCard,
  AlertCircle,
  Download,
} from "lucide-react";
import { toast } from "react-toastify";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const {
    selectedOrder,
    returnItem,
    returnOrder,
    loading,
    cancelItem,
    error,
    getOrderById,
  } = useUserOrderStore();

   const order = selectedOrder;
  const address = order?.address?.snapshot || {};

  const [actionType, setActionType] = useState("");
  // "return-item" | "return-order"

  const [returnReason, setReturnReason] = useState("");

  const [cancellationReason, setCancellationReason] = useState("");
  const [activeItemId, setActiveItemId] = useState(null);


  const isOrderLevelAction =
  (order?.orderStatus === "Cancelled" && order?.cancelledReason) ||
  (order?.orderStatus === "Returned" && order?.returnReason);

const allItemsHaveReasons = order?.items.some(
  (item) => item.cancellationReason || item.returnReason
);

const isItemBasedAction = allItemsHaveReasons;



  const handleReturn = async () => {
    if (!returnReason) {
      toast.error("Please provide a return reason");
      return;
    }

    try {
      if (actionType === "return-item") {
        await returnItem(order?._id, activeItemId, { returnReason });
      }

      if (actionType === "return-order") {
        await returnOrder(order?._id, { returnReason });
      }

      document.getElementById("return_modal").close();
      getOrderById(order?._id);
    } catch (err) {
      // store already handles toast, keep fallback safe
      toast.error(err?.message || "Failed to submit return request");
    } finally {
      setReturnReason("");
      setActiveItemId(null);
      setActionType("");
    }
  };

  useEffect(() => {
    if (id) {
      getOrderById(id);
    }
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

  if (error || !selectedOrder) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4">
        <div className="text-center max-w-md">
          <AlertCircle size={64} className="mx-auto text-error mb-6" />
          <h2 className="text-2xl font-bold mb-4">Order not found</h2>
          <p className="text-gray-600 mb-6">{error || "Invalid order ID"}</p>
          <Link to="/orders" className="btn btn-primary">
            Back to Orders
          </Link>
        </div>
      </div>
    );
  }

 

  return (
    <div className="min-h-screen bg-base-200 py-6 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold">Order Details</h1>
            <p className="text-gray-600 mt-1">
              Order ID:{" "}
              <span className="font-mono text-sm">#{order?._id.slice(-8)}</span>
            </p>
          </div>

          <Link to="/orders" className="btn btn-outline btn-sm gap-2">
            Back to Orders
          </Link>
        </div>
        {isOrderLevelAction && (
  <div
    className={`border rounded-lg p-4 mb-6 ${
      order?.orderStatus === "Cancelled"
        ? "bg-red-50 border-red-200"
        : "bg-yellow-50 border-yellow-200"
    }`}
  >
    <h4 className="font-semibold text-lg">
      Order {order?.orderStatus}
    </h4>

    <p className="text-sm mt-1">
      <strong>Reason:</strong>{" "}
      {order?.orderStatus === "Cancelled"
        ? order?.cancelledReason
        : order?.returnReason}
    </p>

    <p className="text-xs text-gray-500 mt-1">
      {order?.orderStatus} on{" "}
      {new Date(
        order?.orderStatus === "Cancelled"
          ? order?.cancelledAt
          : order?.returnedAt
      ).toLocaleDateString("en-IN")}
    </p>
  </div>
)}


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Order Summary + Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Card */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title flex items-center gap-3">
                  {order?.orderStatus === "Delivered" && (
                    <CheckCircle className="text-success" />
                  )}
                  {order?.orderStatus === "Shipped" && (
                    <Truck className="text-primary" />
                  )}
                  {order?.orderStatus === "Pending" && (
                    <Clock className="text-warning" />
                  )}
                  {order?.orderStatus === "Cancelled" && (
                    <XCircle className="text-error" />
                  )}
                  {order?.orderStatus}

                  {order?.cancelledAt && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                      <h4 className="font-semibold text-red-600 mb-1">
                        Order Cancelled
                      </h4>
                      <p className="text-sm text-gray-700">
                        <strong>Reason:</strong> {order?.cancelledReason}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Cancelled on{" "}
                        {new Date(order?.cancelledAt).toLocaleDateString(
                          "en-IN",
                        )}
                      </p>
                    </div>
                  )}

                     {order?.returnedAt && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mt-4">
                      <h4 className="font-semibold text-red-600 mb-1">
                        Order Returned
                      </h4>
                      <p className="text-sm text-gray-700">
                        <strong>Reason:</strong> {order?.returnReason}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Cancelled on{" "}
                        {new Date(order?.returnedAt).toLocaleDateString(
                          "en-IN",
                        )}
                      </p>
                    </div>
                  )}

                  {/* Return Order Button */}
                  {order?.orderStatus === "Delivered" && (
                    <button
                      className="btn btn-warning btn-outline btn-xs ml-3"
                      onClick={() => {
                        setActionType("return-order");
                        setActiveItemId(null);
                        setReturnReason(""); // ✅ reset
                        document.getElementById("return_modal")?.showModal();
                      }}
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
                      {new Date(order?.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Checkout Type</p>
                    <p className="font-medium">{order?.checkoutType}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Payment</p>
                    <p className="font-medium">
                      {order?.paymentMethod?.toUpperCase()}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Status</p>
                    <p className="font-medium">{order?.paymentStatus}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Total</p>
                    <p className="font-bold text-lg">
                      ₹{order?.grandTotal?.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div>
              {order?.invoice?.url && (
  <div className="mt-3">
    <a
      href={order?.invoice?.url}
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
                </div>
                          {order?.refunds?.length > 0 && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
              <h4 className="font-semibold text-green-700 mb-3">
                Refund History
              </h4>

              {order?.refunds.map((refund) => (
                <div
                  key={refund?._id}
                  className="border rounded-md p-3 mb-2 bg-white"
                >
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">
                      Refund ID: {refund?.refundId}
                    </span>
                    <span className="badge badge-success badge-sm">
                      {refund?.status}
                    </span>
                  </div>

                  <p className="text-sm mt-1">Amount: ₹{refund?.amount}</p>

                  <p className="text-sm text-gray-600">
                    Reason: {refund?.reason}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Refunded on{" "}
                    {new Date(refund?.date).toLocaleDateString("en-IN")}
                  </p>
                </div>
              ))}
            </div>
          )}
              </div>
            </div>

            {/* Items */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">
                  Order Items ({order?.items.length})
                </h2>

                <div className="divider my-2"></div>

                <div className="space-y-6">
               {order?.items.map((item) => {
  const isOrderCancelled = order?.orderStatus === "Cancelled";
  const isBuyNow = order?.checkoutType === "buyNow";

  const canCancel =
    !isBuyNow &&
    !isOrderCancelled &&
    (item.itemStatus === "Confirmed" || item.itemStatus === "Shipped");

    const canReturn = 
    !isBuyNow &&
  item.itemStatus === "Delivered" &&
  order?.orderStatus !== "Returned" &&
  order?.orderStatus !== "Cancelled";

  return (
    <div key={item._id} className="flex gap-4">
      <div className="avatar">
        <div className="w-20 h-20 rounded bg-base-200">
          <img src={item.productImage} alt={item.productName} />
        </div>
      </div>

      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.productName}</h3>

        <p className="text-sm text-gray-600">
          Qty: {item.quantity} × ₹{item.price}
        </p>

        <p className="text-sm font-medium mt-1">
          Item Status:
          <span className="badge badge-sm ml-2">{item.itemStatus}</span>
        </p>

        {/* ITEM LEVEL CANCEL / RETURN REASON */}
        {isItemBasedAction && (item.cancellationReason || item.returnReason) && (
          <div className="mt-2 p-2 border rounded bg-gray-50 text-sm">
            <p>
              <strong> Reason:</strong>{" "}
              {item.cancellationReason || item.returnReason}
            </p>
          </div>
        )}

        {item.cancelledAt && (
  <p className="text-xs text-red-500">
    Cancelled on {new Date(item.cancelledAt).toLocaleDateString("en-IN")}
  </p>
)}

{item.returnApprovedAt && (
  <p className="text-xs text-yellow-600">
    Returned on {new Date(item.returnApprovedAt).toLocaleDateString("en-IN")}
  </p>
)}


        {/* Cancel Button */}
      {canCancel && (
  <button
    className="btn btn-error btn-xs mt-2"
    onClick={() => {
      setActiveItemId(item._id);
      setCancellationReason("");
      document.getElementById("cancel_modal").showModal();
    }}
  >
    Cancel Item
  </button>
)}

        {canReturn && (
  <button
    className="btn btn-warning btn-xs mt-2"
    onClick={() => {
      setActionType("return-item");
      setActiveItemId(item._id);
      setReturnReason("");
      document.getElementById("return_modal").showModal();
    }}
  >
    Return Item
  </button>
)}
      </div>

      <div className="text-right font-medium">
        ₹{item.subtotal.toLocaleString("en-IN")}
      </div>
    </div>
  );
})}

                </div>
              </div>
            </div>
          </div>

          {/* Right: Delivery Address + Price Summary */}
          <div className="space-y-6">
            {/* Delivery Address */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title flex items-center gap-2">
                  <MapPin size={20} />
                  Delivery Address
                </h2>

                <div className="divider my-2"></div>

                <div className="space-y-2 text-sm">
                  <p className="font-semibold">{address.name}</p>
                  <p>{address.phone}</p>
                  <p>
                    {address.streetAddress}
                    {address.landmark && <br />}
                    {address.landmark && `Near ${address.landmark}`}
                  </p>
                  <p>
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p className="text-gray-500">{address.country || "India"}</p>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            {/* Price Summary */}
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <h2 className="card-title">Price Summary</h2>

                <div className="divider my-2"></div>

                <div className="space-y-3 text-sm">
                  {/* Subtotal */}
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{order?.subTotal?.toLocaleString("en-IN")}</span>
                  </div>

                  {/* Coupon Discount */}
                  {order?.discount > 0 && (
                    <div className="flex justify-between text-success">
                      <span>
                        Coupon Discount
                        {order?.couponCode && (
                          <span className="badge badge-outline badge-success ml-2">
                            {order?.couponCode}
                          </span>
                        )}
                      </span>
                      <span>− ₹{order?.discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

                  {/* Wallet Amount */}
                  {order?.walletAmountUsed > 0 && (
                    <div className="flex justify-between text-success">
                      <span>Wallet Used</span>
                      <span>
                        − ₹{order?.walletAmountUsed.toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}

                  <div className="divider my-1"></div>

                  {/* Grand Total */}
                  <div className="flex justify-between font-bold text-lg">
                    <span>Grand Total</span>
                    <span>₹{order?.grandTotal?.toLocaleString("en-IN")}</span>
                  </div>

                  {/* Payment Info */}
                  <div className="divider my-1"></div>

                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Payment Method</span>
                    <span className="uppercase">{order?.paymentMethod}</span>
                  </div>

                  <div className="flex justify-between text-xs">
                    <span>Payment Status</span>
                    <span
                      className={`font-semibold ${
                        order?.paymentStatus === "Refunded"
                          ? "text-info"
                          : order?.paymentStatus === "Paid"
                            ? "text-success"
                            : "text-warning"
                      }`}
                    >
                      {order?.paymentStatus}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
      <dialog id="cancel_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Cancel Item</h3>

          <textarea
            className="textarea textarea-bordered w-full mt-3"
            placeholder="Reason for cancellation"
            value={cancellationReason}
            onChange={(e) => setCancellationReason(e.target.value)}
          />

          <div className="modal-action">
            <button
              className="btn btn-outline"
              onClick={() => document.getElementById("cancel_modal").close()}
            >
              Close
            </button>

            <button
              className="btn btn-error text-white"
              disabled={!cancellationReason || loading}
              onClick={async () => {
                await cancelItem(order?._id, activeItemId, {
                  cancellationReason,
                });
                setCancellationReason("");
                setActiveItemId(null);
                document.getElementById("cancel_modal").close();
              }}
            >
              {loading ? "Cancelling..." : "Confirm Cancel"}
            </button>
          </div>
        </div>
      </dialog>

      <dialog id="return_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            {actionType === "return-item" ? "Return Item" : "Return Order"}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Please tell us why you want to return
          </p>

          <textarea
            className="textarea textarea-bordered w-full mt-3"
            placeholder="Reason for return"
            value={returnReason}
            onChange={(e) => setReturnReason(e.target.value)}
          />

          <div className="modal-action">
            <button
              className="btn"
              onClick={() => document.getElementById("return_modal").close()}
            >
              Cancel
            </button>

            <button
              className="btn btn-warning"
              disabled={!returnReason || loading}
              onClick={handleReturn}
            >
              {loading ? "Processing..." : "Confirm Return"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

