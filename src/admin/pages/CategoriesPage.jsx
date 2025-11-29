// src/admin/pages/CategoriesPage.jsx
import React, { useEffect, useState } from "react";
import { Search, Plus } from "lucide-react";
import useCategoryStore from "../../utils/stores/categoryStore";
import CategoryForm from "../components/CategoryForm";
import CategoryTableRow from "../components/CategoryTableRow";
import Pagination from "../components/Pagination";


const CategoriesPage = () => {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const {
    categories,
    loading,
    error,
    pagination,
    fetchCategories,
    addCategory,
    editCategory,
    softDeleteCategory,
    listCategory,
    unlistCategory,
  } = useCategoryStore();

  // Fetch on mount + search/page change
  useEffect(() => {
    fetchCategories({ search, page: pagination.currentPage });
  }, [search, pagination.currentPage]);

  const openAddModal = () => {
    setEditData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (cat) => {
    setEditData(cat);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data) => {
    if (editData) {
      await editCategory(editData._id, data);
    } else {
      await addCategory(data);
    }
    setIsModalOpen(false);
  };

  const handleToggle = async (id, currentStatus) => {
    if (currentStatus) {
      await unlistCategory(id);
    } else {
      await listCategory(id);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-error">{error}</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <p className="text-gray-600 mt-2">Manage product categories and offers</p>
      </div>

      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="relative w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered w-full pl-12 h-12 rounded-2xl"
          />
        </div>

        <button onClick={openAddModal} className="btn btn-primary rounded-2xl h-12 px-6 gap-2">
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50/50 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-8 py-5 text-left">Category</th>
              <th className="px-8 py-5 text-left">Description</th>
              <th className="px-8 py-5 text-left">Offer</th>
              <th className="px-8 py-5 text-left">Status</th>
              <th className="px-8 py-5 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-12 text-gray-500">
                  No categories found
                </td>
              </tr>
            ) : (
              categories.map((cat) => (
                <CategoryTableRow
                  key={cat._id}
                  cat={cat}
                  onEdit={openEditModal}
                  onDelete={softDeleteCategory}
                  onToggleStatus={() => handleToggle(cat._id, cat.isActive)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <Pagination
        page={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={(page) => fetchCategories({ search, page })}
      />

      {/* Modal */}
      <CategoryForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editData}
      />
    </div>
  );
};

export default CategoriesPage;