// src/admin/pages/ProductsPage.jsx
import React, { useEffect } from "react";
import useProductStore from "../../utils/stores/productStore";
import ProductsHeader from "../components/ProductsHeader";
import ProductGrid from "../components/ProductsGrid";
import ProductFormModal from "../components/ProductFormModal";
import Pagination from "../components/Pagination";

const ProductsPage = () => {
  const { fetchProducts, search, pagination } = useProductStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchProducts({ search, page: pagination.currentPage });
    }, 300);
    return () => clearTimeout(timer);
  }, [search, pagination.currentPage, fetchProducts]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8 md:space-y-10">
        <ProductsHeader />
        <ProductGrid />
        <ProductFormModal/>
        <Pagination
          page={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={(page) => fetchProducts({ search, page })}
        />
      </div>
    </div>
  );
};

export default ProductsPage;