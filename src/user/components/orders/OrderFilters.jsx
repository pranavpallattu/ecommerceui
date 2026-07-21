import { Filter } from "lucide-react";

const STATUS_OPTIONS = ["On the way", "Delivered", "Cancelled", "Returned"];
const TIME_OPTIONS = ["Last 30 days", "2024", "2023", "Older"];

export default function OrdersFilter({
  status,
  time,
  onToggleStatus,
  onToggleTime,
  onClear,
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-blue-600" />
          <h2 className="font-semibold text-gray-900">Filters</h2>
        </div>
        {(status.length > 0 || time.length > 0) && (
          <button
            className="text-xs font-medium text-blue-600 hover:underline"
            onClick={onClear}
          >
            Clear All
          </button>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Order Status
        </h3>
        <div className="space-y-2.5">
          {STATUS_OPTIONS.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-primary"
                // sync checkbox state with react state
                checked={status.includes(opt)}
                onChange={() => onToggleStatus(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>

      <div className="pt-5 border-t border-gray-100">
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
          Order Time
        </h3>
        <div className="space-y-2.5">
          {TIME_OPTIONS.map((opt) => (
            <label
              key={opt}
              className="flex items-center gap-2.5 text-sm text-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                className="checkbox checkbox-sm checkbox-primary"
                checked={time.includes(opt)}
                onChange={() => onToggleTime(opt)}
              />
              {opt}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
