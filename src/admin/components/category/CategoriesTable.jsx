import useCategoryStore from "../../../utils/stores/admin/useCategoryStore";
import CategoryTableRow from "./CategoryTableRow";

const CategoriesTable = () => {
  const { categories, loading } = useCategoryStore();

  if (loading && categories.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <tr>
              <th className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">
                Category
              </th>
              <th className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">
                Description
              </th>
              <th className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">
                Offer
              </th>
              <th className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-left text-xs sm:text-sm font-semibold whitespace-nowrap">
                Status
              </th>
              <th className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-5 lg:py-6 text-center text-xs sm:text-sm font-semibold whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-blue-50">
            {categories.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-12 sm:py-16 text-gray-500 text-sm sm:text-base"
                >
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
        {loading && categories.length === 0 && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="loading loading-spinner loading-md sm:loading-lg"></span>
          </div>
        )}
      </div>

      {/* Mobile Scroll Hint */}
      <div className="sm:hidden bg-blue-50 px-4 py-2 text-center">
        <p className="text-xs text-blue-600">
          ← Scroll horizontally to see all columns →
        </p>
      </div>
    </div>
  );
};

export default CategoriesTable;
