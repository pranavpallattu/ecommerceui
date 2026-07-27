export default function OrderHeader({
  status,
  onStatusChange,
  canUpdateStatus,
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4">
      <h1 className="text-3xl sm:text-3xl font-bold text-gray-900">
        Order Details
      </h1>

      {canUpdateStatus && (
        <select
          value={status}
          onChange={onStatusChange}
          className="select select-bordered bg-white w-full sm:w-auto text-sm sm:text-base"
        >
          {["Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"].map(
            (s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ),
          )}
        </select>
      )}
    </div>
  );
}
