// src/components/sales-report/StatsGrid.jsx
import { Package, IndianRupee, ShoppingCart, Zap } from "lucide-react";

export default function StatsGrid({ report }) {
  const stats = [
    { label: "Total Orders", value: report?.totalOrders || 0, icon: Package, color: "blue" },
    { label: "Total Amount", value: `₹${report?.totalAmount?.toLocaleString() || 0}`, icon: IndianRupee, color: "emerald" },
    { label: "Total Discount", value: `₹${report?.totalDiscount?.toLocaleString() || 0}`, icon: IndianRupee, color: "blue" },
    { label: "Coupon Deduction", value: `₹${report?.couponDeduction?.toLocaleString() || 0}`, icon: IndianRupee, color: "blue" },
    { label: "Total Refunded", value: `₹${report?.totalRefunded?.toLocaleString() || 0}`, icon: IndianRupee, color: "blue" },
    { label: "Delivered", value: report?.delivered || 0, icon: Package, color: "green" },
    { label: "Cart Orders", value: report?.cartOrders || 0, icon: ShoppingCart, color: "red" },
    { label: "Buy Now Orders", value: report?.buynowOrders || 0, icon: Zap, color: "red" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{stat.label}</p>
              <p className="text-xl font-bold text-gray-900 mt-1">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-full bg-${stat.color}-50 flex items-center justify-center`}>
              <stat.icon className={`text-${stat.color}-600`} size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}