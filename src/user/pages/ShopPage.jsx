import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal } from "lucide-react";
import useProductStore from "../../utils/stores/user/useProductStore";
import ShopHeader from "../components/shop/ShopHeader";
import ShopFilters from "../components/shop/ShopFilters";
import ShopSidebar from "../components/shop/ShopSidebar";
import ProductGrid from "../components/shop/ProductGrid";

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "default";

  const {
    fetchShopProducts,
    loadMoreProducts,
    resetShopProducts,
    shopProducts,
    shopCategories,
    hasMore,
    loading,
    error,
  } = useProductStore();

  useEffect(() => {
    resetShopProducts();
    fetchShopProducts({ search, category, sort });
  }, [search, category, sort]);

  const handleCategoryChange = (catId) =>
    setSearchParams({ search, category: catId, sort });
  const handleSortChange = (newSort) =>
    setSearchParams({ search, category, sort: newSort });
  return (
    <div className="drawer lg:drawer-open min-h-screen bg-gray-50">
      <input id="shop-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main */}
      <div className="drawer-content flex flex-col min-w-0">
        {/* Hero */}
        <ShopHeader
          search={search}
          category={category}
          shopCategories={shopCategories}
        />

        {/* Sticky toolbar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1">
                <ShopFilters sort={sort} onSortChange={handleSortChange} />
              </div>
            </div>
          </div>
        </div>

        {/* Products */}
        <main className="flex-1">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
            <ProductGrid
              loading={loading}
              error={error}
              products={shopProducts}
              hasMore={hasMore}
              onLoadMore={loadMoreProducts}
            />
          </div>
        </main>
      </div>

      <ShopSidebar
        category={category}
        shopCategories={shopCategories}
        onCategoryChange={handleCategoryChange}
      />
    </div>
  );
}
