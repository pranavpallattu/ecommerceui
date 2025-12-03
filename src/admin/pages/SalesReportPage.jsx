// src/admin/pages/SalesReportPage.jsx
import React, { useEffect, useState } from "react";
import {
  Calendar,
  Download,
  TrendingUp,
  Package,
  DollarSign,
  ShoppingCart,
  TrendingDown,
  IndianRupee,
  IndianRupeeIcon,
} from "lucide-react";
import useSalesReportStore from "../../utils/stores/SalesReportStore";

const SalesReportPage = () => {
  const [filterType, setFilterType] = useState("all");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const {
    report,
    loading,
    downloadLoading,
    error,
    fetchReport,
    downloadPDF,
    downloadExcel,
  } = useSalesReportStore();

  useEffect(() => {
    let payload;

    if (filterType === "custom") {
      if (!customStart || !customEnd) return; // don't call until both dates
      payload = {
        filterType: "custom",
        startDate: customStart,
        endDate: customEnd,
      };
    } else {
      payload = { filterType };
    }

    fetchReport(payload);
  }, [filterType, customStart, customEnd]);

  const stats = [
     {
      label: "Total Orders",
      value: report?.totalOrders || 0,
      icon: ShoppingCart,
      color: "blue",
    },
    {
      label: "Total Amount",
      value: `₹${report?.totalAmount?.toLocaleString() || 0}`,
      icon: IndianRupeeIcon,
      color: "emerald",
    },
     {
      label: "Total Discount",
      value: `₹${report?.totalDiscount?.toLocaleString() || 0}`,
      icon: IndianRupeeIcon,
      color: "blue",
    },
     {
      label: "Coupon Deduction",
      value: `₹${report?.couponDeduction?.toLocaleString() || 0}`,
      icon: IndianRupeeIcon ,
      color: "blue",
    },
       {
      label: "Total Refunded",
      value: `₹${report?.totalRefunded?.toLocaleString() || 0}`,
      icon: IndianRupeeIcon ,
      color: "blue",
    },
    {
      label: "Delivered",
      value: report?.delivered || 0,
      icon: Package,
      color: "green",
    },
    {
      label: "Cancelled",
      value: report?.cancelled || 0,
      icon: TrendingDown,
      color: "red",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-error text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Sales Report</h1>
              <p className="text-blue-600 mt-2 text-lg">
                Track your store performance
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="select select-bordered w-full lg:w-auto rounded-2xl"
              >
                <option value="all">All Time</option>
                <option value="daily">Daily</option>
                <option value="week">Weekly</option>
                <option value="month">Monthly</option>
                <option value="year">Yearly</option>
                <option value="custom">Custom Range</option>
              </select>

              {filterType === "custom" && (
                <div className="flex gap-3">
                  <input
                    type="date"
                    value={customStart}
                    onChange={(e) => setCustomStart(e.target.value)}
                    className="input input-bordered rounded-2xl"
                    required
                  />
                  <input
                    type="date"
                    value={customEnd}
                    onChange={(e) => setCustomEnd(e.target.value)}
                    className="input input-bordered rounded-2xl"
                    required
                  />
                </div>
              )}

              <button
                onClick={downloadPDF}
                disabled={downloadLoading}
                className="px-2.5 py-1 text-xs bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 flex items-center gap-1"
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                PDF
              </button>

              <button
                onClick={downloadExcel}
                disabled={downloadLoading}
                className="px-2.5 py-1 text-xs bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 flex items-center gap-1 ml-2"
              >
                <svg
                  className="w-3 h-3"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Excel
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition-all"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-16 h-16 rounded-full bg-${stat.color}-100 flex items-center justify-center`}
                  >
                    <Icon className={`text-${stat.color}-600`} size={32} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Status Breakdown */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100">
          <h2 className="text-2xl font-bold mb-6">Order Status Breakdown</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              {
                label: "Processing",
                value: report?.processing || 0,
                color: "blue",
              },
              {
                label: "Shipped",
                value: report?.shipped || 0,
                color: "indigo",
              },
              {
                label: "Delivered",
                value: report?.delivered || 0,
                color: "emerald",
              },
              {
                label: "Pending",
                value: report?.pending || 0,
                color: "yellow",
              },
              {
                label: "Cancelled",
                value: report?.cancelled || 0,
                color: "red",
              },
              {
                label: "Returned",
                value: report?.returned || 0,
                color: "purple",
              },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <p className="text-sm text-gray-600">{item.label}</p>
                <p className={`text-3xl font-bold text-${item.color}-600 mt-2`}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReportPage;
