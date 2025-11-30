import useCategoryStore from "../../utils/stores/categoryStore";
import CategoryTableRow from "./CategoryTableRow";

const CategoriesTable = () => {
  const { categories, loading } = useCategoryStore();

  return (
    <div className="bg-white rounded-2xl border shadow-sm overflow-hidden relative">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50 text-xs font-medium text-gray-500 uppercase">
            <th className="px-8 py-5 text-left">Category</th>
            <th className="px-8 py-5 text-left">Description</th>
            <th className="px-8 py-5 text-left">Offer</th>
            <th className="px-8 py-5 text-left">Status</th>
            <th className="px-8 py-5 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-16 text-gray-500">
                No categories found
              </td>
            </tr>
          ) : (
            categories.map((cat) => (
              <CategoryTableRow key={cat._id} cat={cat} />
            ))
          )}
        </tbody>
      </table>

      {loading && categories.length  === 0 && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
          <span className="loading loading-spinner"></span>
        </div>
      )}
    </div>
  );
};

export default CategoriesTable;