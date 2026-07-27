import {
  Package,
  IndianRupee,
  ShoppingCart,
  Zap,
  ShoppingBag,
  Receipt,
  PackageCheck,
  Boxes,
} from "lucide-react";

export default function StatsGrid({ report }) {
  const formatCurrency = (value = 0) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  const stats = [
    {
      label: "Total Orders",
      value: report?.totalOrders || 0,
      icon: Package,
      color: "blue",
    },

      {
      label: "Products  Sold",
      value: report?.totalProductsSold || 0,
      icon: ShoppingBag,
      color: "indigo",
    },


    {
      label: "Total Items Sold",
      value: report?.totalItemsSold || 0,
      icon: Boxes,
      color: "indigo",
    },

    {
      label: "Average Order Value",
      value: formatCurrency(report?.averageOrderValue),
      icon: Receipt,
      color: "cyan",
    },

    {
      label: "Total Revenue",
      value: formatCurrency(report?.totalAmount),
      icon: IndianRupee,
      color: "emerald",
    },

    {
      label: "Offer Discounts",
      value: formatCurrency(report?.totalDiscount),
      icon: IndianRupee,
      color: "blue",
    },

    {
      label: "Coupon Discounts",
      value: formatCurrency(report?.couponDeduction),
      icon: IndianRupee,
      color: "orange",
    },

    {
      label: "Total Refunded",
      value: formatCurrency(report?.totalRefunded),
      icon: IndianRupee,
      color: "red",
    },

    {
      label: "Net Revenue",
      value: formatCurrency(report?.netRevenue),
      icon: IndianRupee,
      color: "green",
    },

    {
      label: "Cart Orders",
      value: report?.cartOrders || 0,
      icon: ShoppingCart,
      color: "purple",
    },

    {
      label: "Buy Now Orders",
      value: report?.buynowOrders || 0,
      icon: Zap,
      color: "yellow",
    },

    {
      label: "Delivered Orders",
      value: report?.delivered || 0,
      icon: PackageCheck,
      color: "green",
    },
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
              <p className="text-xl font-bold text-gray-900 mt-1">
                {stat.value}
              </p>
            </div>
            <div
              className={`w-12 h-12 rounded-full bg-${stat.color}-50 flex items-center justify-center`}
            >
              <stat.icon className={`text-${stat.color}-600`} size={24} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
