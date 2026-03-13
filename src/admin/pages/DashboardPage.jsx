// src/pages/DashboardPage.jsx
import { useEffect, useState } from "react";
import useDashboardStore from "../../utils/stores/dashboardStore";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsGrid from "../components/dashboard/StatsGrid";
import OrderStatusChart from "../components/dashboard/OrderStatusChart";
import TopProductsSection from "../components/dashboard/TopProductsSection";
import TopCategoriesSection from "../components/dashboard/TopCategoriesSection";

export default function DashboardPage() {
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen p-4">
        <div className="alert alert-error max-w-md">
          <span>{error}</span>
        </div>
      </div>
    );
  }

  const chartData = orderSummary
    ? [
        { name: "Pending", value: orderSummary.pending || 0, fill: "#f59e0b" },
        { name: "Confirmed", value: orderSummary.confirmed || 0, fill: "#3b82f6" },
        { name: "Processing", value: orderSummary.processing || 0, fill: "#2563eb" },
        { name: "Shipped", value: orderSummary.shipped || 0, fill: "#6366f1" },
        { name: "Delivered", value: orderSummary.delivered || 0, fill: "#10b981" },
        { name: "Cancelled", value: orderSummary.cancelled || 0, fill: "#ef4444" },
        { name: "Returned", value: orderSummary.returned || 0, fill: "#8b5cf6" },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 lg:space-y-10">
        <DashboardHeader
          filterType={filterType}
          setFilterType={setFilterType}
          customStart={customStart}
          setCustomStart={setCustomStart}
          customEnd={customEnd}
          setCustomEnd={setCustomEnd}
        />

        <StatsGrid orderSummary={orderSummary} />

        <OrderStatusChart chartData={chartData} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <TopProductsSection bestProducts={bestProducts} />
          <TopCategoriesSection bestCategories={bestCategories} />
        </div>
      </div>
    </div>
  );
}