import { Clock } from "lucide-react";

export default function TimeCard({ label, value }) {
  const date = new Date(value);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-md transition-all">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
          <Clock size={20} />
        </div>

        <div>
          <p className="text-xs uppercase tracking-wide text-gray-500">
            {label}
          </p>

          <p className="mt-1 text-lg font-semibold text-gray-900">
            {date.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>

          <p className="text-sm text-gray-500">
            {date.toLocaleTimeString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
