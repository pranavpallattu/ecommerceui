import React, { useEffect } from "react";
import useCategoryStore from "../../utils/stores/admin/useCategoryStore";
import CategoriesHeader from "../components/category/CategoriesHeader";
import CategoriesTable from "../components/category/CategoriesTable";
import CategoryFormModal from "../components/category/CategoryFormModal";
import Pagination from "../components/common/Pagination";
const CategoriesPage = () => {
  const { fetchCategories, search, pagination, loading, categories } =
    useCategoryStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCategories({ search, page: pagination.currentPage });
    }, 300);
    return () => clearTimeout(timer);
  }, [search, pagination.currentPage, fetchCategories]);

  if (loading && categories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8 p-3 sm:p-4 md:p-6">
      <CategoriesHeader />
      <CategoriesTable />
      <Pagination
        page={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={(page) => fetchCategories({ search, page })}
      />
      <CategoryFormModal />
    </div>
  );
};

export default CategoriesPage;
