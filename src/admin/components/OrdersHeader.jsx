// src/admin/components/customers/CustomersHeader.jsx
import { Search } from "lucide-react";
import useOrderStore from "../../utils/stores/orderStore";

const OrdersHeader = () => {
  const { search, setSearch } = useOrderStore();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Orders</h1>
          <p className="text-blue-600 mt-2 text-lg">Manage and monitor orders</p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={22} />
          <input
            type="text"
            placeholder="Search by product, username, or emailId..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full pl-12 h-14 rounded-2xl border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default OrdersHeader;