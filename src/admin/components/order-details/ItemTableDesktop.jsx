export default function ItemTableDesktop({ items, STATUS_COLORS }) {
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
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-gray-100 text-gray-700">
          <th className="py-3 px-3 text-left">Product</th>
          <th className="py-3 px-3 text-center">Qty</th>
          <th className="py-3 px-3 text-center">Price</th>
          <th className="py-3 px-3 text-center">Subtotal</th>
          <th className="py-3 px-3 text-center">Status</th>
          <th className="py-3 px-3 text-left">Timeline</th>
          <th className="py-3 px-3 text-left">Action Details</th>
        </tr>
      </thead>

      <tbody>
        {items?.map((item) => (
          <tr
            key={item._id}
            className="border-b last:border-none hover:bg-gray-50 align-top"
          >
            <td className="py-3 px-3 font-medium">
              {item.productName}
            </td>

            <td className="py-3 px-3 text-center">
              {item.quantity}
            </td>

            <td className="py-3 px-3 text-center">
            ₹{item.price?.toLocaleString("en-IN")}
            </td>

            <td className="py-3 px-3 text-center font-medium">
              ₹{item.subtotal?.toLocaleString("en-IN")}
            </td>

            <td className="py-3 px-3 text-center">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs ${STATUS_COLORS[item.itemStatus]}`}
              >
                {item.itemStatus}
              </span>
            </td>

            <td className="py-3 px-3">
              <div className="space-y-1 text-xs">

                {item.deliveredAt && (
                  <div>
                    <span className="font-medium text-success">
                      Delivered
                    </span>
                    <br />
                    {formatDate(item.deliveredAt)}
                  </div>
                )}

                {item.returnRequestedAt && (
                  <div>
                    <span className="font-medium text-warning">
                      Return Requested
                    </span>
                    <br />
                    {formatDate(item.returnRequestedAt)}
                  </div>
                )}

                {item.returnApprovedAt && (
                  <div>
                    <span className="font-medium text-info">
                      Returned
                    </span>
                    <br />
                    {formatDate(item.returnApprovedAt)}
                  </div>
                )}

                {item.returnRejectedAt && (
                  <div>
                    <span className="font-medium text-error">
                      Return Rejected
                    </span>
                    <br />
                    {formatDate(item.returnRejectedAt)}
                  </div>
                )}

                {item.cancelledAt && (
                  <div>
                    <span className="font-medium text-error">
                      Cancelled
                    </span>
                    <br />
                    {formatDate(item.cancelledAt)}
                  </div>
                )}

              </div>
            </td>

            <td className="py-3 px-3">
          <td className="py-3 px-3">
  {item.returnReason ? (
    <div className="max-w-xs">
      <p className="text-[11px] uppercase tracking-wide text-orange-600 font-semibold">
        Return Reason
      </p>

      <p className="text-xs text-gray-700 mt-1">
        {item.returnReason}
      </p>
    </div>
  ) : item.cancellationReason ? (
    <div className="max-w-xs">
      <p className="text-[11px] uppercase tracking-wide text-red-600 font-semibold">
        Cancellation Reason
      </p>

      <p className="text-xs text-gray-700 mt-1">
        {item.cancellationReason}
      </p>
    </div>
  ) : (
    <span className="text-gray-400 text-xs">—</span>
  )}
</td>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}