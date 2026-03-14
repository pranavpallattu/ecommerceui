// src/components/product-details/RelatedProducts.jsx
import { Link } from "react-router-dom";
import ProductCard from "../ProductCard";
import { ChevronRight } from "lucide-react";

export default function RelatedProducts({ relatedProducts }) {
  if (!relatedProducts?.length) return null;

  return (
    <section className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-gray-900">You May Also Like</h2>
        <Link
          to="/shop"
          className="text-blue-600 font-semibold hover:underline flex items-center gap-2"
        >
          View All
          <ChevronRight size={20} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {relatedProducts.map((related) => (
          <ProductCard key={related._id} product={related} />
        ))}
      </div>
    </section>
  );
}