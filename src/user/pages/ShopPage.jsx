import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useUserProductStore from "../../utils/stores/userProductStore";
import ProductCard from "../components/ProductCard";

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
  } = useUserProductStore();

  useEffect(() => {
    fetchShopProducts({ search, category, sort, page, limit: 9 });
  }, [search, category, sort, page]);

  const handleCategoryChange = (catId) => {
    setSearchParams({ search, category: catId, sort, page: 1 });
  };

  const handleSortChange = (e) => {
    setSearchParams({ search, category, sort: e.target.value, page: 1 });
  };

  const handlePageChange = (newPage) => {
    setSearchParams({ search, category, sort, page: newPage });
  };

  return (
    <div className="drawer lg:drawer-open">
      <input id="shop-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content Area */}
      <div className="drawer-content flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-base-100 border-b">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold mb-2">Shop</h1>
            {search && (
              <p className="text-base-content/70">
                Showing results for <strong>"{search}"</strong>
              </p>
            )}
          </div>
        </header>

        {/* Controls Bar: Mobile Filter Button + Sort */}
        <div className="bg-base-200 border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <label
                htmlFor="shop-drawer"
                className="btn btn-primary drawer-button lg:hidden"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Filters
              </label>

              <select
                className="select select-bordered w-full sm:w-auto max-w-xs"
                value={sort}
                onChange={handleSortChange}
              >
                <option value="default">Default Sorting</option>
                <option value="priceLowToHigh">Price: Low to High</option>
                <option value="priceHighToLow">Price: High to Low</option>
                <option value="newArrivals">Newest Arrivals</option>
                <option value="nameAtoZ">Name: A to Z</option>
                <option value="nameZtoA">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Section */}
        <main className="container mx-auto px-4 py-8 flex-grow">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="skeleton h-96 w-full rounded-xl"></div>
              ))}
            </div>
          ) : shopProducts?.length === 0 ? (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <h3 className="text-2xl font-semibold mb-4">No products found</h3>
                <p className="text-base-content/70">
                  Try adjusting your search term or filters.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {shopProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>

              {/* Pagination */}
              {shopPagination?.totalPages > 1 && (
                <div className="flex justify-center">
                  <div className="join">
                    <button
                      className="join-item btn"
                      disabled={page === 1}
                      onClick={() => handlePageChange(page - 1)}
                    >
                      « Previous
                    </button>

                    {Array.from({ length: shopPagination.totalPages }, (_, i) => i + 1)
                      .map((p) => (
                        <button
                          key={p}
                          className={`join-item btn ${page === p ? "btn-active btn-primary" : ""}`}
                          onClick={() => handlePageChange(p)}
                        >
                          {p}
                        </button>
                      ))}

                    <button
                      className="join-item btn"
                      disabled={page === shopPagination.totalPages}
                      onClick={() => handlePageChange(page + 1)}
                    >
                      Next »
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
        <aside className="bg-base-100 w-80 min-h-full shadow-xl">
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-8">Categories</h2>
            <ul className="menu p-0">
              <li>
                <a
                  className={category === "all" ? "active bg-primary/10" : ""}
                  onClick={() => handleCategoryChange("all")}
                >
                  All Products
                </a>
              </li>
              {shopCategories?.map((cat) => (
                <li key={cat._id}>
                  <a
                    className={category === cat._id ? "active bg-primary/10" : ""}
                    onClick={() => handleCategoryChange(cat._id)}
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