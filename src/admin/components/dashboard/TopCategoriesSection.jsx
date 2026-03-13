// src/components/dashboard/TopCategoriesSection.jsx
export default function TopCategoriesSection({ bestCategories }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 sm:p-6 border border-gray-100">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Best Selling Categories</h2>
      {bestCategories.length === 0 ? (
        <p className="text-center py-8 sm:py-12 text-gray-400 text-sm sm:text-base">No data yet</p>
      ) : (
        <div className="space-y-2 sm:space-y-3">
          {bestCategories.map((c, i) => (
            <div
              key={c.categoryId}
              className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
            >
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-blue-600 flex items-center justify-center text-white text-xs sm:text-sm font-semibold flex-shrink-0">
                  {i + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{c.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{c.totalSold} items sold</p>
                </div>
              </div>
              <div className="text-base sm:text-lg font-semibold text-blue-600 ml-2 flex-shrink-0">
                {c.totalSold}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}