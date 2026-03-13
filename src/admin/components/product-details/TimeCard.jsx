import { Clock } from "lucide-react";

// src/components/product-details/TimeCard.jsx
export default function TimeCard({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg sm:rounded-xl px-4 sm:px-5 md:px-6 py-3 sm:py-4 md:py-5 border border-gray-200 shadow-sm hover:shadow transition-shadow">
      <p className="text-[10px] sm:text-xs text-gray-500 flex items-center gap-1 sm:gap-2 mb-1 sm:mb-1.5">
        <Clock size={14} className="sm:w-4 sm:h-4" />
        {label}
      </p>
      <p className="text-sm sm:text-base font-semibold text-gray-800">
        {new Date(value).toLocaleDateString("en-IN")}
      </p>
      <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
        {new Date(value).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
      </p>
    </div>
  );
}