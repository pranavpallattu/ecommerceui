// src/admin/components/products/ProductsHeader.jsx
import { Search, Plus } from "lucide-react";
import useProductStore from "../../utils/stores/productStore";

const ProductsHeader = () => {
  const { search, setSearch, openModal } = useProductStore();

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Products</h1>
          <p className="text-blue-600 mt-2 text-lg">Manage your store inventory</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 w-full lg:w-auto">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" size={22} />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered w-full pl-12 h-14 rounded-2xl border-blue-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <button
            onClick={() => openModal()}
            className="btn btn-primary h-14 px-8 rounded-2xl flex items-center gap-3 shadow-lg hover:shadow-xl transition-all"
          >
            <Plus size={22} />
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsHeader;