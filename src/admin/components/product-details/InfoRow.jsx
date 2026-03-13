// src/components/product-details/InfoRow.jsx
export default function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 bg-gray-50/70 rounded-lg sm:rounded-xl px-3 sm:px-4 md:px-5 py-3 sm:py-4 border border-gray-200 shadow-sm hover:shadow transition-shadow">
      {icon && <div className="text-indigo-600 flex-shrink-0">{icon}</div>}
      <div className="min-w-0 flex-1">
        <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">
          {label}
        </p>
        <div className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 truncate">
          {value}
        </div>
      </div>
    </div>
  );
}