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
      payload = { filterType: "custom", startDate: customStart, endDate: customEnd };
    } else {
      payload = { filterType };
    }

    fetchReport(payload);
  }, [filterType, customStart, customEnd]);

  const stats = [
    { label: "Total Revenue", value: `₹${report?.totalAmount?.toLocaleString() || 0}`, icon: DollarSign, color: "emerald" },
    { label: "Total Orders", value: report?.totalOrders || 0, icon: ShoppingCart, color: "blue" },
    { label: "Delivered", value: report?.delivered || 0, icon: Package, color: "green" },
    { label: "Cancelled", value: report?.cancelled || 0, icon: TrendingDown, color: "red" },
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
              <p className="text-blue-600 mt-2 text-lg">Track your store performance</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="select select-bordered w-full lg:w-auto rounded-2xl"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
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
                className="btn btn-outline btn-primary rounded-2xl gap-2"
              >
                {downloadLoading ? <span className="loading loading-spinner" /> : <Download size={18} />}
                PDF
              </button>
              <button
                onClick={downloadExcel}
                disabled={downloadLoading}
                className="btn btn-outline btn-success rounded-2xl gap-2"
              >
                {downloadLoading ? <span className="loading loading-spinner" /> : <Download size={18} />}
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
              <div key={i} className="bg-white rounded-3xl shadow-xl p-8 border border-blue-100 hover:shadow-2xl transition-all">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`w-16 h-16 rounded-full bg-${stat.color}-100 flex items-center justify-center`}>
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
              { label: "Processing", value: report?.processing || 0, color: "blue" },
              { label: "Shipped", value: report?.shipped || 0, color: "indigo" },
              { label: "Delivered", value: report?.delivered || 0, color: "emerald" },
              { label: "Pending", value: report?.pending || 0, color: "yellow" },
              { label: "Cancelled", value: report?.cancelled || 0, color: "red" },
              { label: "Returned", value: report?.returned || 0, color: "purple" },
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