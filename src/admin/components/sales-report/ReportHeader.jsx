import { Download } from "lucide-react";

export default function ReportHeader({
  filterType,
  setFilterType,
  customStart,
  setCustomStart,
  customEnd,
  setCustomEnd,
  downloadPDF,
  downloadExcel,
  downloadLoading,
}) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 md:p-8 border border-blue-100">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 sm:gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Sales Report
          </h1>
          <p className="text-blue-600 mt-1 text-sm sm:text-base">
            Track your store performance
          </p>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-3 w-full lg:w-auto">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="select select-bordered w-full sm:w-40 rounded-xl text-sm sm:text-base"
          >
            <option value="all">All Time</option>
            <option value="daily">Daily</option>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
            <option value="custom">Custom Range</option>
          </select>

          {filterType === "custom" && (
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="input input-bordered rounded-xl text-sm sm:text-base w-full sm:w-auto"
              />
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="input input-bordered rounded-xl text-sm sm:text-base w-full sm:w-auto"
              />
            </div>
          )}

          <div className="flex gap-2 sm:gap-3 mt-2">
            <button
              onClick={downloadPDF}
              disabled={downloadLoading}
              className="btn btn-outline btn-sm gap-2 text-red-700 hover:bg-red-50"
            >
              <Download size={16} />
              PDF
            </button>
            <button
              onClick={downloadExcel}
              disabled={downloadLoading}
              className="btn btn-outline btn-sm gap-2 text-green-700 hover:bg-green-50"
            >
              <Download size={16} />
              Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
