// src/components/dashboard/StatsGrid.jsx
import { DollarSign, Package, ShoppingCart, Zap } from "lucide-react";

export default function StatsGrid({ orderSummary }) {
  const stats = [
    { label: "Total Revenue", value: `₹${(orderSummary?.totalAmount || 0).toLocaleString()}`, icon: DollarSign, color: "from-emerald-500 to-teal-600" },
    { label: "Total Orders", value: orderSummary?.totalOrders || 0, icon: Package, color: "from-blue-500 to-cyan-600" },
    { label: "Cart Orders", value: orderSummary?.cartOrders || 0, icon: ShoppingCart, color: "from-green-500 to-emerald-600" },
    { label: "Buy Now Orders", value: orderSummary?.buynowOrders || 0, icon: Zap, color: "from-purple-500 to-pink-600" },
  ];

  return (
    <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="group relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white shadow-xl sm:shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500"
        >
          <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
          <div className="relative p-5 sm:p-6 md:p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-white/90 text-xs sm:text-sm font-medium">{stat.label}</p>
                <p className="text-2xl sm:text-3xl lg:text-4xl font-black mt-2 sm:mt-3 truncate">{stat.value}</p>
              </div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 ml-3">
                <stat.icon size={28} className="sm:w-8 sm:h-8 md:w-9 md:h-9" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}