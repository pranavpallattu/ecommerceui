// src/components/shop/ProductGrid.jsx
import ProductCard from "../ProductCard";

export default function ProductGrid({ loading, error, products, pagination, currentPage, onPageChange }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="skeleton h-64 w-full rounded-xl"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-gray-600">
        <h3 className="text-xl font-medium mb-2">Error loading products</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (products?.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600">
        <h3 className="text-xl font-medium mb-2">No products found</h3>
        <p>Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {pagination?.totalPages > 1 && (
        <div className="flex justify-center">
          <div className="join">
            <button
              className="join-item btn btn-ghost"
              disabled={currentPage === 1}
              onClick={() => onPageChange(currentPage - 1)}
            >
              «
            </button>

            {[...Array(pagination.totalPages)].map((_, i) => {
              const p = i + 1;
              if (
                p === 1 ||
                p === pagination.totalPages ||
                (p >= currentPage - 2 && p <= currentPage + 2)
              ) {
                return (
                  <button
                    key={p}
                    className={`join-item btn btn-ghost ${currentPage === p ? "btn-active" : ""}`}
                    onClick={() => onPageChange(p)}
                  >
                    {p}
                  </button>
                );
              } else if (p === currentPage - 3 || p === currentPage + 3) {
                return <span key={p} className="join-item btn btn-disabled">...</span>;
              }
              return null;
            })}

            <button
              className="join-item btn btn-ghost"
              disabled={currentPage === pagination.totalPages}
              onClick={() => onPageChange(currentPage + 1)}
            >
              »
            </button>
          </div>
        </div>
      )}
    </>
  );
}