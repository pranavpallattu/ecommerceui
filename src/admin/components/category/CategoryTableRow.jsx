// src/admin/components/categories/CategoryTableRow.jsx
import { Edit3, Trash2, Eye, EyeOff } from "lucide-react";
import useCategoryStore from "../../../utils/stores/categoryStore";
import useConfirmModalStore from "../../../utils/stores/useConfirmModalStore.js";

const CategoryTableRow = ({ cat }) => {
  const { openEditModal, softDeleteCategory, listCategory, unlistCategory } =
    useCategoryStore();

  const { openConfirm } = useConfirmModalStore();

  const handleToggle = () => {
    if (cat.isActive) unlistCategory(cat._id);
    else listCategory(cat._id);
  };

  return (
    <tr className="hover:bg-gray-50 transition">
      {/* Category Name */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        <p className="font-medium text-gray-900 text-xs sm:text-sm md:text-base whitespace-nowrap">
          {cat.name}
        </p>
      </td>

      {/* Description */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        <p className="text-gray-600 text-xs sm:text-sm max-w-[200px] md:max-w-[300px] truncate" title={cat.description}>
          {cat.description}
        </p>
      </td>

      {/* Offer */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        {cat.offer ? (
          <span className="inline-flex items-center justify-center min-w-[40px] sm:min-w-[48px] py-1.5 sm:py-2 px-2 sm:px-3 rounded text-[10px] sm:text-xs font-bold bg-red-500 text-white whitespace-nowrap">
            {cat.offer}%
          </span>
        ) : (
          <span className="text-gray-400 text-xs sm:text-sm">—</span>
        )}
      </td>

      {/* Status */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        {cat.isActive ? (
          <span className="inline-flex items-center py-1 sm:py-1.5 md:py-2 px-2 sm:px-3 rounded-full text-[10px] sm:text-xs font-medium bg-green-100 text-green-800 whitespace-nowrap">
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-green-500 mr-1 sm:mr-1.5"></span>
            Active
          </span>
        ) : (
          <span className="inline-flex items-center py-1 sm:py-1.5 md:py-2 px-2 sm:px-3 rounded-full text-[10px] sm:text-xs font-medium bg-red-100 text-red-800 whitespace-nowrap">
            <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-red-500 mr-1 sm:mr-1.5"></span>
            Inactive
          </span>
        )}
      </td>

      {/* Actions */}
      <td className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6">
        <div className="flex justify-center gap-1 sm:gap-2 md:gap-3 lg:gap-4">
          {/* Toggle List/Unlist */}
          <button
            className="btn btn-ghost btn-xs p-1 sm:p-2 min-h-0 h-auto"
            onClick={() =>
              openConfirm({
                title: cat.isActive ? "Unlist Category?" : "List Category?",
                message: cat.isActive
                  ? "This category will be unlisted."
                  : "This category will be listed.",
                confirmText: cat.isActive ? "Unlist" : "List",
                confirmVariant: cat.isActive ? "error" : "success",
                onConfirm: () => handleToggle(cat._id),
              })
            }
            aria-label={cat.isActive ? "Unlist" : "List"}
          >
            {cat.isActive ? (
              <EyeOff size={16} className="sm:w-[18px] sm:h-[18px]" />
            ) : (
              <Eye size={16} className="sm:w-[18px] sm:h-[18px]" />
            )}
          </button>

          {/* Edit */}
          <button
            onClick={() => openEditModal(cat)}
            className="btn btn-ghost btn-xs p-1 sm:p-2 min-h-0 h-auto"
            aria-label="Edit"
          >
            <Edit3 size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>

          {/* Delete */}
          <button
            onClick={() =>
              openConfirm({
                title: "Delete Category?",
                message:
                  "Are you sure you want to delete this category? This action cannot be undone.",
                confirmText: "Delete",
                confirmVariant: "error",
                onConfirm: () => softDeleteCategory(cat._id),
              })
            }
            className="btn btn-ghost btn-xs p-1 sm:p-2 min-h-0 h-auto"
            aria-label="Delete"
          >
            <Trash2 size={16} className="sm:w-[18px] sm:h-[18px] text-red-500" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default CategoryTableRow;