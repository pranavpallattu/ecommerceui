import {
  Package,
  ClipboardCheck,
  Settings2,
  Truck,
  XCircle,
  RotateCcw,
  IndianRupee,
} from "lucide-react";

export default function StatsGrid({ orderSummary }) {
  const formatCurrency = (value = 0) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  const stats = [
    {
      label: "Total Orders",
      value: orderSummary?.totalOrders || 0,
      icon: Package,
    },
    {
      label: "Confirmed",
      value: orderSummary?.confirmed || 0,
      icon: ClipboardCheck,
    },
    {
      label: "Processing",
      value: orderSummary?.processing || 0,
      icon: Settings2,
    },
    {
      label: "Delivered",
      value: orderSummary?.delivered || 0,
      icon: Truck,
    },
    {
      label: "Cancelled",
      value: orderSummary?.cancelled || 0,
      icon: XCircle,
    },
    {
      label: "Returned",
      value: orderSummary?.returned || 0,
      icon: RotateCcw,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Featured Revenue Card */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-100 text-sm font-medium uppercase tracking-wider">
              Net Revenue
            </p>

            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold break-all">
              {formatCurrency(orderSummary?.netRevenue)}
            </h2>
          </div>

          <div className="hidden sm:flex w-20 h-20 rounded-2xl bg-white/15 items-center justify-center">
            <IndianRupee size={40} />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-6 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>

                <h3 className="mt-2 text-3xl font-bold text-gray-900">
                  {stat.value}
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                <stat.icon className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
