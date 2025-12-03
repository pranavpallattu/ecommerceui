// src/admin/pages/DashboardPage.jsx
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useDashboardStore from "../../utils/stores/dashboardStore";
import { Calendar, TrendingUp, Package, DollarSign, ShoppingCart } from "lucide-react";

const DashboardPage = () => {
  const [filterType, setFilterType] = useState("all");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const {
    orderSummary,
    bestProducts,
    bestCategories,
    loading,
    error,
    fetchOrderSummary,
    fetchBestProducts,
    fetchBestCategories,
  } = useDashboardStore();

  useEffect(() => {
    const payload = filterType === "custom" && customStart && customEnd
      ? { filterType: "custom", startDate: customStart, endDate: customEnd }
      : { filterType };

    fetchOrderSummary(payload);
  }, [filterType, customStart, customEnd]);

  useEffect(() => {
    fetchBestProducts();
    fetchBestCategories();
  }, []);

  const chartData = orderSummary
    ? [
        { name: "Delivered", value: orderSummary.delivered || 0, fill: "#10b981" },
        { name: "Processing", value: orderSummary.processing || 0, fill: "#3b82f6" },
        { name: "Shipped", value: orderSummary.shipped || 0, fill: "#8b5cf6" },
        { name: "Pending", value: orderSummary.pending || 0, fill: "#f59e0b" },
        { name: "Cancelled", value: orderSummary.cancelled || 0, fill: "#ef4444" },
        { name: "Returned", value: orderSummary.returned || 0, fill: "#a855f7" },
      ]
    : [];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-10">

        {/* Premium Header */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/20">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
            <div>
              <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                Dashboard
              </h1>
              <p className="text-xl text-blue-600 mt-3 font-medium">
                Real-time insights • Premium analytics
              </p>
            </div>

            {/* Filter Section — Now BEAUTIFUL */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-1 rounded-3xl shadow-2xl">
              <div className="bg-white rounded-3xl p-2 flex flex-wrap items-center gap-3">
                <Calendar className="text-blue-600 ml-4" size={24} />

                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="select select-ghost font-semibold text-blue-700 focus:outline-none"
                >
                  <option value="all">All Time</option>
                  <option value="daily">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                  <option value="custom">Custom Range</option>
                </select>

                {filterType === "custom" && (
                  <div className="flex items-center gap-3 bg-blue-50/50 rounded-2xl p-2">
                    <input
                      type="date"
                      value={customStart}
                      onChange={(e) => setCustomStart(e.target.value)}
                      className="input input-bordered input-sm rounded-xl bg-white"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="date"
                      value={customEnd}
                      onChange={(e) => setCustomEnd(e.target.value)}
                      className="input input-bordered input-sm rounded-xl bg-white"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards — Ultra Premium */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Total Revenue", value: `₹${(orderSummary?.totalAmount || 0).toLocaleString()}`, icon: DollarSign, color: "from-emerald-500 to-teal-600" },
            { label: "Total Orders", value: orderSummary?.totalOrders || 0, icon: ShoppingCart, color: "from-blue-500 to-cyan-600" },
            { label: "Delivered", value: orderSummary?.delivered || 0, icon: Package, color: "from-green-500 to-emerald-600" },
            { label: "Growth Rate", value: "+24.8%", icon: TrendingUp, color: "from-purple-500 to-pink-600" },
          ].map((stat, i) => (
            <div key={i} className="group relative overflow-hidden rounded-3xl bg-white shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
              <div className="relative p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/90 text-sm font-medium">{stat.label}</p>
                    <p className="text-4xl font-black mt-3">{stat.value}</p>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <stat.icon size={36} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bar Chart — Ultra Modern */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/30">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Order Status Distribution</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 80 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" stroke="#e0e7ff" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end" 
                  height={100} 
                  tick={{ fill: "#6366f1", fontWeight: "bold" }}
                />
                <YAxis tick={{ fill: "#6366f1" }} />
                <Tooltip
                  contentStyle={{ 
                    backgroundColor: "#fff", 
                    borderRadius: "16px", 
                    border: "none",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    padding: "16px"
                  }}
                  labelStyle={{ color: "#4f46e5", fontWeight: "bold" }}
                />
                <Bar dataKey="value" fill="url(#barGradient)" radius={[20, 20, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Best Selling */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Best Products */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/30">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Best Selling Products</h2>
            {bestProducts.length === 0 ? (
              <p className="text-center py-16 text-gray-500 text-xl">No sales data yet</p>
            ) : (
              <div className="space-y-5">
                {bestProducts.map((p, i) => (
                  <div key={p.productId} className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl hover:from-blue-100/70 hover:to-indigo-100/70 transition-all">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-2xl font-black shadow-lg">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-bold text-lg text-gray-900">{p.name}</p>
                        <p className="text-sm text-gray-600">{p.totalSold} units sold</p>
                      </div>
                    </div>
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
                      {p.totalSold}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Best Categories */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-white/30">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Best Selling Categories</h2>
            {bestCategories.length === 0 ? (
              <p className="text-center py-16 text-gray-500 text-xl">No data yet</p>
            ) : (
              <div className="space-y-5">
                {bestCategories.map((c, i) => (
                  <div key={c.categoryId} className="flex items-center justify-between p-6 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 rounded-2xl hover:from-indigo-100/70 hover:to-purple-100/70 transition-all">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white text-2xl font-black shadow-lg">
                        {i + 1}
                      </div>
                      <div>
                        <p className="font-bold text-lg text-gray-900">{c.name}</p>
                        <p className="text-sm text-gray-600">{c.totalSold} items sold</p>
                      </div>
                    </div>
                    <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-700">
                      {c.totalSold}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;