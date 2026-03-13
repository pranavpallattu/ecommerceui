// src/components/sales-report/OrderStatusBreakdown.jsx
export default function OrderStatusBreakdown({ report }) {
  const statuses = [
    { label: "Pending", value: report?.pending || 0, color: "yellow" },
    { label: "Confirmed", value: report?.confirmed || 0, color: "blue" },
    { label: "Processing", value: report?.processing || 0, color: "orange" },
    { label: "Shipped", value: report?.shipped || 0, color: "indigo" },
    { label: "Delivered", value: report?.delivered || 0, color: "emerald" },
    { label: "Cancelled", value: report?.cancelled || 0, color: "red" },
    { label: "Returned", value: report?.returned || 0, color: "purple" },
    { label: "Partially Cancelled", value: report?.partiallyCancelled || 0, color: "red" },
    { label: "Partially Returned", value: report?.partiallyReturned || 0, color: "purple" },
    { label: "Return Pending", value: report?.returnPending || 0, color: "yellow" },
    { label: "Return Rejected", value: report?.returnRejected || 0, color: "red" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 border border-gray-100">
      <h2 className="text-xl lg:text-2xl font-bold mb-6">Order Status Breakdown</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {statuses.map((item) => (
          <div
            key={item.label}
            className="text-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition"
          >
            <p className="text-sm text-gray-600 line-clamp-2 min-h-[2.5rem] flex items-center justify-center">
              {item.label}
            </p>
            <p className={`text-2xl font-bold text-${item.color}-600 mt-2`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}