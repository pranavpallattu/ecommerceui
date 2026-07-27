export default function OrderStatusBreakdown({ report }) {
  const cancelledLabels = ["Cancelled", "Partially Cancelled"];

  const statuses = [
    { label: "Pending", value: report?.pending || 0 },
    { label: "Confirmed", value: report?.confirmed || 0 },
    { label: "Processing", value: report?.processing || 0 },
    { label: "Shipped", value: report?.shipped || 0 },
    { label: "Delivered", value: report?.delivered || 0 },
    { label: "Cancelled", value: report?.cancelled || 0 },
    { label: "Partially Cancelled", value: report?.partiallyCancelled || 0 },
    { label: "Return Pending", value: report?.returnPending || 0 },
    { label: "Partially Return Pending", value: report?.partiallyReturnPending || 0 },
    { label: "Returned", value: report?.returned || 0 },
    { label: "Partially Returned", value: report?.partiallyReturned || 0 },
    { label: "Return Rejected", value: report?.returnRejected || 0 },
    { label: "Partially Return Rejected", value: report?.partiallyReturnRejected || 0 },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-gray-100">
      <h2 className="text-xl lg:text-2xl font-bold mb-6 text-gray-900">
        Order Status Breakdown
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {statuses.map((item) => {
          const isCancelled = cancelledLabels.includes(item.label);
          return (
            <div
              key={item.label}
              className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
            >
              <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
                {item.label}
              </p>
              <p className={`text-2xl font-bold mt-2 ${isCancelled ? "text-red-600" : "text-gray-900"}`}>
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}