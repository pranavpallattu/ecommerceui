export default function TopCategoriesSection({ bestCategories }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Best Selling Categories
      </h2>

      {bestCategories.length === 0 ? (
        <div className="py-10 text-center text-sm text-gray-500">
          No category sales yet
        </div>
      ) : (
        <div className="space-y-2">
          {bestCategories.map((category, index) => (
            <div
              key={category.categoryId}
              className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold ${
                    index < 3
                      ? "bg-blue-50 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                <p className="font-medium text-gray-900">{category.name}</p>
              </div>

              <div className="text-right">
                <p className="text-lg font-semibold text-gray-900">
                  {category.totalSold}
                </p>
                <p className="text-xs text-gray-500">Sold</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
