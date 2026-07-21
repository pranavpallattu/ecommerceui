import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function OrderStatusChart({ chartData }) {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-blue-100">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
          Order Status Overview
        </h2>
        <div className="px-3 py-2 sm:px-4 bg-blue-600 text-white rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap">
          Total: {chartData.reduce((sum, item) => sum + item.value, 0)} Orders
        </div>
      </div>

      <div className="h-[300px] sm:h-[350px] md:h-[400px] bg-white rounded-xl p-3 sm:p-4 md:p-6 shadow-sm overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 10, left: -10, bottom: 60 }}
            barSize={
              window.innerWidth < 640 ? 30 : window.innerWidth < 1024 ? 40 : 50
            }
          >
            <defs>
              {chartData.map((entry, index) => (
                <linearGradient
                  key={index}
                  id={`gradient-${index}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor={entry.fill} stopOpacity={0.9} />
                  <stop
                    offset="100%"
                    stopColor={entry.fill}
                    stopOpacity={0.6}
                  />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f3f4f6"
              vertical={false}
            />

            <XAxis
              dataKey="name"
              angle={-35}
              textAnchor="end"
              height={70}
              tick={{
                fill: "#4b5563",
                fontSize: window.innerWidth < 640 ? 10 : 13,
                fontWeight: 600,
              }}
              interval={0}
              axisLine={{ stroke: "#e5e7eb", strokeWidth: 2 }}
            />

            <YAxis
              tick={{
                fill: "#4b5563",
                fontSize: window.innerWidth < 640 ? 10 : 13,
                fontWeight: 600,
              }}
              axisLine={{ stroke: "#e5e7eb", strokeWidth: 2 }}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3)",
                padding: "10px 14px",
              }}
              labelStyle={{
                color: "#ffffff",
                fontWeight: 700,
                marginBottom: "6px",
                fontSize: "13px",
              }}
              itemStyle={{
                color: "#e5e7eb",
                fontSize: "13px",
                fontWeight: 600,
              }}
              cursor={{ fill: "rgba(59,130,246,0.05)", radius: 8 }}
            />

            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
              animationDuration={1000}
              animationBegin={0}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-3 mt-4 sm:mt-6">
        {chartData.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-white px-2 sm:px-3 py-2 rounded-lg shadow-sm border border-gray-100"
          >
            <div
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full shadow-sm flex-shrink-0"
              style={{ backgroundColor: item.fill }}
            />
            <span className="text-[10px] sm:text-xs font-semibold text-gray-700 truncate">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
