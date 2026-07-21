import { Calendar } from "lucide-react";

export default function DashboardHeader({
  filterType,
  setFilterType,
  customStart,
  setCustomStart,
  customEnd,
  setCustomEnd,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 sm:p-6 md:p-8">
      <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:justify-between lg:items-center lg:gap-8">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm sm:text-base text-gray-500 mt-1">
            Real-time insights and analytics
          </p>
        </div>

        <div className="border border-gray-200 rounded-2xl p-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 sm:gap-3 w-full lg:w-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            <Calendar
              className="text-blue-600 ml-2 sm:ml-3 flex-shrink-0"
              size={20}
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="select select-ghost font-semibold text-gray-900 focus:outline-none text-sm sm:text-base flex-1 sm:flex-initial"
            >
              <option value="all">All Time</option>
              <option value="daily">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {filterType === "custom" && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 bg-blue-50 rounded-xl p-2">
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="input input-bordered input-sm rounded-lg bg-white text-sm w-full sm:w-auto"
              />
              <span className="text-gray-500 text-center sm:text-left text-sm">
                to
              </span>
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="input input-bordered input-sm rounded-lg bg-white text-sm w-full sm:w-auto"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
