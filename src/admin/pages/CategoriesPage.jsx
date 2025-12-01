// src/admin/pages/CategoriesPage.jsx
import React, { useEffect } from "react";
import useCategoryStore from "../../utils/stores/categoryStore";
import CategoriesHeader from "../components/CategoriesHeader";
import CategoriesSearch from "../components/CategoriesSearch";
import CategoriesTable from "../components/CategoriesTable";
import CategoriesPagination from "../components/CategoriesPagination";
import CategoryForm from "../components/CategoryForm";
import CategoryFormModal from "../components/CategoryFormModal";

const CategoriesPage = () => {
  const { categories, loading, error, fetchCategories, search, pagination } = useCategoryStore();

  // Single effect: search + pagination
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCategories({ search, page: pagination.currentPage });
    }, 300);
    return () => clearTimeout(timer);
  }, [search, pagination.currentPage, fetchCategories]);

  // if (loading && categories.length === 0) {
  //   return (
  //     <div className="flex justify-center items-center h-96">
  //       <span className="loading loading-spinner loading-lg"></span>
  //     </div>
  //   );
  // }

  if (error) {
    return <div className="alert alert-error text-center">{error}</div>;
  }

  return (
    <div className="space-y-8 p-6">
      <CategoriesHeader />
      <CategoriesSearch />
      <CategoriesTable />
      <CategoriesPagination />
      <CategoryFormModal />
    </div>
  );
};

export default CategoriesPage;