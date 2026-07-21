import { Search } from "lucide-react";

export default function CustomersHeader({ search, setSearch }) {
  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-blue-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 sm:gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Customers
          </h1>
          <p className="text-blue-600 mt-1 sm:mt-2 text-sm sm:text-base md:text-lg">
            Manage and monitor customer accounts
          </p>
        </div>

        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 text-blue-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full pl-10 sm:pl-12 h-12 sm:h-14 rounded-xl sm:rounded-2xl border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-sm sm:text-base"
          />
        </div>
      </div>
    </div>
  );
}
