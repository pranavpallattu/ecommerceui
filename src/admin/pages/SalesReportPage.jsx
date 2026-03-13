// src/pages/SalesReportPage.jsx
import { useEffect, useState } from "react";
import useSalesReportStore from "../../utils/stores/SalesReportStore";

import ReportHeader from "../components/sales-report/ReportHeader";
import StatsGrid from "../components/sales-report/StatsGrid";
import OrderStatusBreakdown from "../components/sales-report/OrderStatusBreakdown";

export default function SalesReportPage() {
  const [filterType, setFilterType] = useState("all");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");

  const { report, loading, downloadLoading, error, fetchReport, downloadPDF, downloadExcel } =
    useSalesReportStore();

  useEffect(() => {
    let payload;
    if (filterType === "custom") {
      if (!customStart || !customEnd) return;
      payload = { filterType: "custom", startDate: customStart, endDate: customEnd };
    } else {
      payload = { filterType };
    }
    fetchReport(payload);
  }, [filterType, customStart, customEnd]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 sm:h-96">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-error text-center mx-4">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        <ReportHeader
          filterType={filterType}
          setFilterType={setFilterType}
          customStart={customStart}
          setCustomStart={setCustomStart}
          customEnd={customEnd}
          setCustomEnd={setCustomEnd}
          downloadPDF={downloadPDF}
          downloadExcel={downloadExcel}
          downloadLoading={downloadLoading}
        />

        <StatsGrid report={report} />

        <OrderStatusBreakdown report={report} />
      </div>
    </div>
  );
}