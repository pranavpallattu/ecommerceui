import { Package } from "lucide-react";

function OrdersHeader({ userOrders }) {
  return (
<div className="flex items-center justify-between gap-3 sm:gap-6 mb-8 pb-6 border-b border-gray-200">
  {/* Left */}
  <div className="flex items-center gap-3 min-w-0 flex-1">
    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-600 flex items-center justify-center shrink-0">
      <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
    </div>

    <div className="min-w-0">
      <h1 className="text-xl sm:text-3xl font-bold text-gray-900 truncate">
        My Orders
      </h1>

      <p className="text-xs sm:text-sm text-gray-500">
        Track purchases, returns and cancellations
      </p>
    </div>
  </div>

  {/* Right */}
  <div className="flex-shrink-0 bg-base-100 border border-base-200 rounded-2xl px-4 sm:px-6 py-3 text-center">
    <p className="text-2xl sm:text-3xl font-bold text-blue-700">
      {userOrders.length}
    </p>

    <p className="text-[10px] sm:text-xs uppercase tracking-wide text-gray-400 whitespace-nowrap">
      Total Orders
    </p>
  </div>
</div>
  );
}

export default OrdersHeader;
