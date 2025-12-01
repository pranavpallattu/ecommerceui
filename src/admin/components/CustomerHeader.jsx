// src/admin/components/customers/CustomersHeader.jsx
import { Search, UserX } from "lucide-react";
import useCustomerStore from "../../../utils/stores/customerStore";

const CustomersHeader = () => {
  const { search, setSearch } = useCustomerStore();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-gray-600 mt-1">Manage your customer accounts</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        {/* Search */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, email, or phone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full pl-12 h-12 rounded-2xl"
          />
        </div>

        {/* Bulk Block Button (Optional) */}
        <button className="btn btn-outline btn-error h-12 px-6 rounded-2xl flex items-center gap-2">
          <UserX size={18} />
          Block Selected
        </button>
      </div>
    </div>
  );
};

export default CustomersHeader;