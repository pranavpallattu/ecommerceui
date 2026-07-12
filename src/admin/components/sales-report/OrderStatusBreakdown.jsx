// src/components/sales-report/OrderStatusBreakdown.jsx
export default function OrderStatusBreakdown({ report }) {
const statuses = [
  { label: "Pending", value: report?.pending || 0, color: "text-yellow-600" },

  { label: "Confirmed", value: report?.confirmed || 0, color: "text-blue-600" },

  {
    label: "Processing",
    value: report?.processing || 0,
    color: "text-indigo-600",
  },

  {
    label: "Shipped",
    value: report?.shipped || 0,
    color: "text-purple-600",
  },

  {
    label: "Delivered",
    value: report?.delivered || 0,
    color: "text-green-600",
  },

  {
    label: "Cancelled",
    value: report?.cancelled || 0,
    color: "text-red-600",
  },

  {
    label: "Partially Cancelled",
    value: report?.partiallyCancelled || 0,
    color: "text-red-500",
  },

  {
    label: "Return Pending",
    value: report?.returnPending || 0,
    color: "text-amber-600",
  },

  {
    label: "Partially Return Pending",
    value: report?.partiallyReturnPending || 0,
    color: "text-amber-500",
  },

  {
    label: "Returned",
    value: report?.returned || 0,
    color: "text-orange-600",
  },

  {
    label: "Partially Returned",
    value: report?.partiallyReturned || 0,
    color: "text-orange-500",
  },

  {
    label: "Return Rejected",
    value: report?.returnRejected || 0,
    color: "text-gray-700",
  },

  {
    label: "Partially Return Rejected",
    value: report?.partiallyReturnRejected || 0,
    color: "text-gray-500",
  },
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
         <p className={`text-2xl font-bold ${item.color} mt-2`}>
  {item.value}
</p>
          </div>
        ))}
      </div>
    </div>
  );
}