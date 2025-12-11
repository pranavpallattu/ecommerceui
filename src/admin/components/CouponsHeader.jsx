// src/admin/components/customers/CustomersHeader.jsx
import { Plus, Search } from "lucide-react";
import useCouponStore from "../../utils/stores/couponStore";

const CouponsHeader = () => {
  const { search, setSearch, openModal } = useCouponStore();

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

        {/* Left Side */}
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Coupons</h1>
          <p className="text-blue-600 mt-2 text-lg">
            Manage and monitor Coupons
          </p>
        </div>

        {/* Right Side - Search & Button */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-[500px] lg:w-[600px]">

          {/* Search Wrapper */}
          <div className="relative w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500"
              size={22}
            />
            <input
              type="text"
              placeholder="Search by coupon code, or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full pl-12 h-14 rounded-2xl border-blue-200 
                         focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
            />
          </div>

          {/* Add Button */}
          <button
            onClick={() => openModal()}
            className="btn btn-primary h-14 px-8 rounded-2xl flex items-center gap-3 
                       shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
          >
            <Plus size={22} />
            Add Coupon
          </button>

        </div>
      </div>
    </div>
  );
};

export default CouponsHeader;
