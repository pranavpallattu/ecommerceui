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
        className="btn btn-primary rounded-2xl h-12 px-6 flex items-center gap-2"
      >
        <Plus size={20} />
        Add Category
      </button>
    </div>
  );
};

export default CategoriesHeader;