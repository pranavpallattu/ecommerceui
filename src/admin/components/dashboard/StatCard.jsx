// src/components/dashboard/StatCard.jsx
import React from "react";

export default function StatCard({ icon, title, value, color = "text-gray-900" }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>

        <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center flex-shrink-0">
          <div className="text-blue-600">{icon}</div>
        </div>
      </div>
    </div>
  );
}