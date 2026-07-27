export default function ItemCardMobile({ item, STATUS_COLORS }) {
  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleString("en-IN", {
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      : null;

  return (
    <div className="bg-gray-50 rounded-xl border border-gray-200 p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-start gap-3">
        <h3 className="font-semibold text-sm flex-1 leading-5">
          {item.productName}
        </h3>

        <span
          className={`px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap ${STATUS_COLORS[item.itemStatus]}`}
        >
          {item.itemStatus}
        </span>
      </div>

      {/* Price Details */}
      <div className="grid grid-cols-3 gap-3 text-sm">
        <div>
          <p className="text-gray-500 text-xs">Qty</p>
          <p className="font-medium">{item.quantity}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs">Price</p>
          <p className="font-medium"> ₹{item.price?.toLocaleString("en-IN")}</p>
        </div>

        <div>
          <p className="text-gray-500 text-xs">Subtotal</p>
          <p className="font-semibold">
            ₹{item.subtotal?.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="border-t pt-3 space-y-2 text-xs">
        {item.deliveredAt && (
          <div className="flex justify-between">
            <span className="text-success font-medium">Delivered</span>
            <span className="text-gray-500">
              {formatDate(item.deliveredAt)}
            </span>
          </div>
        )}

        {item.returnRequestedAt && (
          <div className="flex justify-between">
            <span className="text-warning font-medium">Return Requested</span>
            <span className="text-gray-500">
              {formatDate(item.returnRequestedAt)}
            </span>
          </div>
        )}

        {item.returnApprovedAt && (
          <div className="flex justify-between">
            <span className="text-info font-medium">Returned</span>
            <span className="text-gray-500">
              {formatDate(item.returnApprovedAt)}
            </span>
          </div>
        )}

        {item.returnRejectedAt && (
          <div className="flex justify-between">
            <span className="text-error font-medium">Return Rejected</span>
            <span className="text-gray-500">
              {formatDate(item.returnRejectedAt)}
            </span>
          </div>
        )}

        {item.cancelledAt && (
          <div className="flex justify-between">
            <span className="text-error font-medium">Cancelled</span>
            <span className="text-gray-500">
              {formatDate(item.cancelledAt)}
            </span>
          </div>
        )}
      </div>

      {/* Reason */}
      {(item.returnReason || item.cancellationReason) && (
        <div className="border-t pt-3">
          <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">
            Reason
          </p>

          <p className="text-sm text-gray-700 mt-1">
            {item.returnReason || item.cancellationReason}
          </p>
        </div>
      )}
    </div>
  );
}
