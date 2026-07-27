export default function OrderItem({ item, order, onReturnItem, onCancelItem }) {
  const formatDateTime = (date) =>
    date
      ? new Date(date).toLocaleString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : null;

  const isOrderCancelled = order?.orderStatus === "Cancelled";
  const isBuyNow = order?.checkoutType === "buyNow";

  const canCancel =
    !isBuyNow &&
    !isOrderCancelled &&
    ["Confirmed", "Shipped"].includes(item?.itemStatus);

  const canReturn =
    !isBuyNow &&
    item?.itemStatus === "Delivered" &&
    !["Returned", "Cancelled"].includes(order?.orderStatus);

  const dateEvents = [
    ["Return Requested", item?.returnRequestedAt],
    ["Return Rejected", item?.returnRejectedAt],
    ["Cancelled", item?.cancelledAt],
    ["Return Approved", item?.returnApprovedAt],
  ].filter(([, date]) => date);

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="avatar self-start">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded bg-base-200">
          <img src={item?.productId?.productImage[0]?.imageUrl} alt={item?.productName} />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-lg break-words">{item?.productName}</h3>
        <p className="text-sm text-gray-600">Qty: {item?.quantity} × ₹{item?.price}</p>
        <p className="text-sm font-medium mt-1">
          Item Status: <span className="badge badge-sm ml-2">{item?.itemStatus}</span>
        </p>

        {(item?.cancellationReason || item?.returnReason) && (
          <div className="mt-2 p-2 border rounded bg-gray-50 text-sm">
            <strong>Reason:</strong> {item?.cancellationReason || item?.returnReason}
          </div>
        )}

        {dateEvents.map(([label, date]) => (
          <p key={label} className="text-xs text-gray-400 mt-1">
            {label}: {formatDateTime(date)}
          </p>
        ))}

        <div className="flex flex-wrap gap-2 mt-2">
          {canCancel && (
            <button className="btn btn-error btn-xs" onClick={() => onCancelItem(item?._id)}>
              Cancel Item
            </button>
          )}
          {canReturn && (
            <button className="btn btn-warning btn-xs" onClick={() => onReturnItem(item?._id)}>
              Return Item
            </button>
          )}
        </div>
      </div>

      <div className="text-left sm:text-right font-medium">
        ₹{item?.subtotal?.toLocaleString("en-IN")}
      </div>
    </div>
  );
}