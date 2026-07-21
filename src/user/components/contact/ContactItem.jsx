import React from "react";

export default function ContactItem({ icon, title, text, sub }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center flex-shrink-0">
        {React.cloneElement(icon, { size: 20, className: "text-indigo-600" })}
      </div>
      <div>
        <h4 className="font-semibold text-lg text-gray-900">{title}</h4>
        <p className="text-gray-700 mt-0.5">{text}</p>
        {sub && <p className="text-sm text-gray-500 mt-1">{sub}</p>}
      </div>
    </div>
  );
}
