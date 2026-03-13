import { Calendar } from "lucide-react";

// src/components/dashboard/DashboardHeader.jsx
export default function DashboardHeader({
  filterType,
  setFilterType,
  customStart,
  setCustomStart,
  customEnd,
  setCustomEnd,
}) {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 md:p-8 lg:p-10 border border-white/20">
      <div className="flex flex-col gap-4 sm:gap-6 lg:flex-row lg:justify-between lg:items-center lg:gap-8">
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700">
            Dashboard
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-blue-600 mt-2 lg:mt-3 font-medium">
            Real-time insights • Premium analytics
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-1 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl w-full lg:w-auto">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-2 flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Calendar className="text-blue-600 ml-2 sm:ml-4 flex-shrink-0" size={20} />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="select select-ghost font-semibold text-blue-700 focus:outline-none text-sm sm:text-base flex-1 sm:flex-initial"
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
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 bg-blue-50/50 rounded-xl sm:rounded-2xl p-2">
                <input
                  type="date"
                  value={customStart}
                  onChange={(e) => setCustomStart(e.target.value)}
                  className="input input-bordered input-sm rounded-xl bg-white text-sm w-full sm:w-auto"
                />
                <span className="text-gray-500 text-center sm:text-left text-sm">to</span>
                <input
                  type="date"
                  value={customEnd}
                  onChange={(e) => setCustomEnd(e.target.value)}
                  className="input input-bordered input-sm rounded-xl bg-white text-sm w-full sm:w-auto"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}