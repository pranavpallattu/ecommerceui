export default function CustomerInfo({ order }) {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-md border border-blue-100">
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
        Customer
      </h3>
      <p className="font-medium text-sm sm:text-base">
        {order.userId?.name || "—"}
      </p>
      <p className="text-xs sm:text-sm text-gray-500 break-all">
        {order.userId?.emailId || order.userId?._id}
      </p>
    </div>
  );
}
