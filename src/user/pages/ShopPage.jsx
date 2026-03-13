// src/pages/ShopPage.jsx
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useUserProductStore from "../../utils/stores/userProductStore";

import ShopHeader from "../components/shop/ShopHeader";
import ShopFilters from "../components/shop/ShopFilters";
import ShopSidebar from "../components/shop/ShopSidebar";
import ProductGrid from "../components/shop/ProductGrid";

export default function ShopPage() {
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
    error,
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

  return (
    <div className="drawer lg:drawer-open min-h-screen bg-gray-50">
      <input id="shop-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col">
        <ShopHeader
          search={search}
          category={category}
          shopCategories={shopCategories}
        />

        <ShopFilters
          sort={sort}
          onSortChange={handleSortChange}
        />

        <main className="container mx-auto px-4 py-8 flex-grow">
          <ProductGrid
            loading={loading}
            error={error}
            products={shopProducts}
            pagination={shopPagination}
            currentPage={page}
            onPageChange={handlePageChange}
          />
        </main>
      </div>

      {/* Sidebar (Categories) */}
      <ShopSidebar
        category={category}
        shopCategories={shopCategories}
        onCategoryChange={handleCategoryChange}
      />
    </div>
  );
}