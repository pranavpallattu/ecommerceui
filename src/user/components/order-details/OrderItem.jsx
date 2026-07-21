export default function OrderItem({ item, order, onReturnItem, onCancelItem }) {
  const isOrderCancelled = order.orderStatus === "Cancelled";
  const isBuyNow = order.checkoutType === "buyNow";

  const canCancel =
    !isBuyNow &&
    !isOrderCancelled &&
    (item.itemStatus === "Confirmed" || item.itemStatus === "Shipped");

  const canReturn =
    !isBuyNow &&
    item.itemStatus === "Delivered" &&
    order.orderStatus !== "Returned" &&
    order.orderStatus !== "Cancelled";

  return (
    <div className="flex gap-4">
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

        {/* Item level cancel/return reason */}
        {(item.cancellationReason || item.returnReason) && (
          <div className="mt-2 p-2 border rounded bg-gray-50 text-sm">
            <p>
              <strong>Reason:</strong>{" "}
              {item.cancellationReason || item.returnReason}
            </p>
          </div>
        )}

        {item.cancelledAt && (
          <p className="text-xs text-red-500">
            Cancelled on{" "}
            {new Date(item.cancelledAt).toLocaleDateString("en-IN")}
          </p>
        )}

        {item.returnApprovedAt && (
          <p className="text-xs text-yellow-600">
            Returned on{" "}
            {new Date(item.returnApprovedAt).toLocaleDateString("en-IN")}
          </p>
        )}

        {/* Cancel Button */}
        {canCancel && (
          <button
            className="btn btn-error btn-xs mt-2"
            onClick={() => onCancelItem(item._id)}
          >
            Cancel Item
          </button>
        )}

        {/* Return Button */}
        {canReturn && (
          <button
            className="btn btn-warning btn-xs mt-2"
            onClick={() => onReturnItem(item._id)}
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
}
