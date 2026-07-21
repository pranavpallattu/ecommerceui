import React, { useEffect} from "react";
import useProductStore from "../../utils/stores/admin/useProductStore";
import ProductGrid from "../components/products/ProductsGrid";
import ProductFormModal from "../components/products/ProductFormModal";
import Pagination from "../components/common/Pagination";
import ProductsHeader from "../components/products/ProductsHeader";

const ProductsPage = () => {
  const { fetchProducts, search, pagination } = useProductStore();

  // Initial load
  useEffect(() => {
    fetchProducts({ search: "", page: 1 });
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts({ search, page: 1 });
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);
  // Page changes fetch immediately, no debounce, no dependency loop
  const handlePageChange = (page) => {
    fetchProducts({ search, page });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 md:space-y-10">
        <ProductsHeader />
        <ProductGrid />
        <ProductFormModal />
        <Pagination
          page={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
