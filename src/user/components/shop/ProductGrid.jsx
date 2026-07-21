import { useEffect, useRef } from "react";
import ProductCard from "../common/ProductCard";

export default function ProductGrid({
  loading,
  error,
  products,
  hasMore,
  onLoadMore,
}) {
  const observerRef = useRef(null);

  useEffect(() => {
    if (!hasMore || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      {
        threshold: 1,
      },
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect;
  });

  if (loading && products.length === 0) {
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

      {/* Infinite Scroll Trigger */}
      {hasMore && (
        <div ref={observerRef} className="flex justify-center py-8">
          {loading && (
            <span className="loading loading-spinner loading-lg"></span>
          )}
        </div>
      )}
    </>
  );
}
