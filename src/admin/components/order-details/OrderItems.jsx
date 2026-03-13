// src/components/order-details/OrderItems.jsx
import ItemCardMobile from "./ItemCardMobile";
import ItemTableDesktop from "./ItemTableDesktop";
import { Package } from "lucide-react";

export default function OrderItems({ items, STATUS_COLORS }) {
  return (
    <div className="bg-white p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-md border border-blue-100">
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3 sm:mb-4 flex items-center gap-2">
        <Package size={16} className="sm:w-[18px] sm:h-[18px]" /> 
        Items
      </h3>

      {/* Mobile Card View */}
      <div className="block md:hidden space-y-3">
        {items?.map((item, idx) => (
          <ItemCardMobile key={idx} item={item} STATUS_COLORS={STATUS_COLORS} />
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block">
        <ItemTableDesktop items={items} STATUS_COLORS={STATUS_COLORS} />
      </div>
    </div>
  );
}