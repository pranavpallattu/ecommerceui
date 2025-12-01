import { Plus } from "lucide-react";
import useCategoryStore from "../../utils/stores/categoryStore";

const CategoriesHeader = () => {
  const { openModal } = useCategoryStore();

  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
        <p className="text-gray-600 mt-1">Manage product categories and offers</p>
      </div>
      <button
        onClick={() => openModal()}
className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium p-3 rounded-lg transition-colors duration-150 flex items-center gap-2"
      >
        <Plus size={20} />
        Add Category
      </button>
    </div>
  );
};

export default CategoriesHeader;