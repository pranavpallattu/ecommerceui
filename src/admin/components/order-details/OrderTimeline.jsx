// src/components/order-details/OrderTimeline.jsx
export default function OrderTimeline({ order }) {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-md border border-blue-100">
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
        Order Timeline
      </h3>

      <div className="space-y-2 text-xs sm:text-sm text-gray-700">
        <p>
          <span className="font-medium">Created:</span>{" "}
          {new Date(order.createdAt).toLocaleString()}
        </p>

        {order.deliveredAt && (
          <p className="text-green-600">
            <span className="font-medium">Delivered:</span>{" "}
            {new Date(order.deliveredAt).toLocaleString()}
          </p>
        )}

        {order.cancelledAt && (
          <p className="text-red-600">
            <span className="font-medium">Cancelled:</span>{" "}
            {new Date(order.cancelledAt).toLocaleString()}
          </p>
        )}

        {order.returnedAt && (
          <p className="text-orange-600">
            <span className="font-medium">Returned:</span>{" "}
            {new Date(order.returnedAt).toLocaleString()}
          </p>
        )}

        {order.returnReason && (
          <p className="text-orange-600">
            <span className="font-medium">Return Reason:</span>{" "}
            {order.returnReason}
          </p>
        )}

        {order.cancellationReason && (
          <p className="text-red-600">
            <span className="font-medium">Cancellation Reason:</span>{" "}
            {order.cancellationReason}
          </p>
        )}
      </div>
    </div>
  );
}
