// src/admin/pages/CategoriesPage.jsx
import React, { useEffect } from "react";
import useCategoryStore from "../../utils/stores/categoryStore";
import CategoriesHeader from "../components/category/CategoriesHeader";
import CategoriesTable from "../components/category/CategoriesTable";
import CategoryFormModal from "../components/category/CategoryFormModal";
import Pagination from "../components/Pagination"
const CategoriesPage = () => {
  const { fetchCategories, search, pagination } = useCategoryStore();

  // Single effect: search + pagination
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCategories({ search, page: pagination.currentPage });
    }, 300);
    return () => clearTimeout(timer);
  }, [search, pagination.currentPage, fetchCategories]);

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