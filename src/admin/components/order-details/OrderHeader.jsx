// src/components/order-details/OrderHeader.jsx
export default function OrderHeader({ status, onStatusChange }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
      <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
        Order Details
      </h1>

      <select
        value={status}
        onChange={onStatusChange}
        className="select select-bordered bg-white w-full sm:w-auto text-sm sm:text-base"
      >
        {["Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"].map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
}