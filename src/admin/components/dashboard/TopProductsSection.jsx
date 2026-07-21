export function TopProductsSection({ bestProducts }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Best Selling Products
      </h2>

      {bestProducts.length === 0 ? (
        <div className="py-10 text-center text-sm text-gray-500">
          No product sales yet
        </div>
      ) : (
        <div className="space-y-2">
          {bestProducts.map((product, index) => (
            <div
              key={product.productId}
              className="flex items-center justify-between rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold flex-shrink-0 ${
                    index < 3
                      ? "bg-blue-50 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {index + 1}
                </div>
                <p className="truncate font-medium text-gray-900">
                  {product.name}
                </p>
              </div>

              <div className="text-right flex-shrink-0">
                <p className="text-lg font-semibold text-gray-900">
                  {product.totalSold}
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

export default TopProductsSection;
