export default function OrderTimeline({ order }) {
  const events = [
    ["Placed", order.createdAt],
    ["Delivered", order.deliveredAt],
    ["Cancelled", order.cancelledAt],
    ["Returned", order.returnedAt],
  ].filter(([, date]) => date);

  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-md border border-blue-100">
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-4 sm:mb-6">
        Order Timeline
      </h3>

      <ol className="relative border-s border-gray-200 ms-2">
        {events.map(([label, date], i) => (
          <li key={label} className="ms-4 pb-5 last:pb-0">
            <span className="absolute -start-[5px] w-2.5 h-2.5 rounded-full bg-gray-400 mt-1.5" />
            <p className="text-sm font-medium text-gray-800">{label}</p>
            <p className="text-xs text-gray-500">
              {new Date(date).toLocaleString()}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}