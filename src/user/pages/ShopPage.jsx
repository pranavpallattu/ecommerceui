import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useUserProductStore from "../../utils/stores/userProductStore";
import ProductCard from "../components/ProductCard";
import { Filter } from "lucide-react";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "default";
  const page = Number(searchParams.get("page")) || 1;

  const {
    fetchShopProducts,
    shopProducts,
    shopCategories,
    shopPagination,
    loading,
    error, // Assuming store has error
  } = useUserProductStore();

  useEffect(() => {
    fetchShopProducts({ search, category, sort, page, limit: 9 });
  }, [search, category, sort, page]);

  const handleCategoryChange = (catId) => {
    setSearchParams({ search, category: catId, sort, page: 1 });
  };

  const handleSortChange = (newSort) => {
    setSearchParams({ search, category, sort: newSort, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ search, category, sort, page: newPage });
  };

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "priceLowToHigh", label: "Price Low to High" },
    { value: "priceHighToLow", label: "Price High to Low" },
    { value: "newArrivals", label: "Newest" },
    { value: "nameAtoZ", label: "A to Z" },
    { value: "nameZtoA", label: "Z to A" },
  ];

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-gray-50">
      <input id="shop-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        {/* Breadcrumbs & Header */}
        <header className="bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-4">
            <nav className="text-sm text-gray-500 mb-2">
              <span className="hover:underline cursor-pointer">Home</span> / Shop
              {category !== "all" && ` / ${shopCategories.find(c => c._id === category)?.name || category}`}
              {search && ` / Results for "${search}"`}
            </nav>
            <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
          </div>
        </header>

        {/* Controls */}
        <div className="bg-white border-b border-gray-200 py-4">
          <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <label htmlFor="shop-drawer" className="btn btn-ghost lg:hidden flex items-center gap-2 text-gray-700">
              <Filter size={20} />
              Filters
            </label>

            {/* Sort Options - Horizontal with underline */}
            <ul className="menu menu-horizontal bg-transparent p-0 hidden lg:flex">
              {sortOptions.map((opt) => (
                <li key={opt.value}>
                  <a
                    onClick={() => handleSortChange(opt.value)}
                    className={`text-gray-700 font-medium hover:text-blue-600 px-4 py-2 rounded-none border-b-2 transition-all ${
                      sort === opt.value ? "border-blue-600 text-blue-600" : "border-transparent"
                    }`}
                  >
                    {opt.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Mobile Sort Dropdown */}
            <select
              className="select select-bordered w-full lg:hidden"
              value={sort}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products */}
        <main className="container mx-auto px-4 py-8 flex-grow">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => <div key={i} className="skeleton h-64 w-full rounded-xl"></div>)}
            </div>
          ) : error ? (
            <div className="text-center py-20 text-gray-600">
              <h3 className="text-xl font-medium mb-2">Error loading products</h3>
              <p>{error}</p>
            </div>
          ) : shopProducts?.length === 0 ? (
            <div className="text-center py-20 text-gray-600">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p>Try adjusting your search or filters.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {shopProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {shopPagination?.totalPages > 1 && (
                <div className="flex justify-center">
                  <div className="join">
                    <button
                      className="join-item btn btn-ghost"
                      disabled={page === 1}
                      onClick={() => handlePageChange(page - 1)}
                    >
                      «
                    </button>

                    {[...Array(shopPagination.totalPages)].map((_, i) => {
                      const p = i + 1;
                      if (
                        p === 1 ||
                        p === shopPagination.totalPages ||
                        (p >= page - 2 && p <= page + 2)
                      ) {
                        return (
                          <button
                            key={p}
                            className={`join-item btn btn-ghost ${page === p ? "btn-active" : ""}`}
                            onClick={() => handlePageChange(p)}
                          >
                            {p}
                          </button>
                        );
                      } else if (p === page - 3 || p === page + 3) {
                        return <span key={p} className="join-item btn btn-disabled">...</span>;
                      }
                      return null;
                    })}

                    <button
                      className="join-item btn btn-ghost"
                      disabled={page === shopPagination.totalPages}
                      onClick={() => handlePageChange(page + 1)}
                    >
                      »
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Sidebar Drawer */}
      <div className="drawer-side z-50">
        <label htmlFor="shop-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <aside className="bg-white w-64 min-h-full border-l border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-6">Categories</h2>
            <ul className="menu p-0 space-y-2">
              <li>
                <a
                  onClick={() => handleCategoryChange("all")}
                  className={`py-3 px-4 rounded-lg transition-all ${
                    category === "all" ? "bg-gray-100 text-blue-600 font-medium" : "hover:bg-gray-100"
                  }`}
                >
                  All Products
                </a>
              </li>
              {shopCategories?.map((cat) => (
                <li key={cat._id}>
                  <a
                    onClick={() => handleCategoryChange(cat._id)}
                    className={`py-3 px-4 rounded-lg transition-all ${
                      category === cat._id ? "bg-gray-100 text-blue-600 font-medium" : "hover:bg-gray-100"
                    }`}
                  >
                    {cat.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ShopPage;