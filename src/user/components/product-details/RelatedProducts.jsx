import { Link } from "react-router-dom";
import ProductCard from "../common/ProductCard";
import { ChevronRight } from "lucide-react";

export default function RelatedProducts({ relatedProducts }) {
  if (!relatedProducts?.length) return null;

  return (
    <section className="bg-white rounded-2xl lg:rounded-3xl p-5 sm:p-6 lg:p-10 shadow-sm border border-gray-100 mt-12 lg:mt-16">
      {" "}
      <div className="flex items-center justify-between mb-8">
        {" "}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
          You May Also Like
        </h2>
        <Link className="text-sm sm:text-base text-blue-600 font-semibold hover:underline flex items-center gap-1">
          View All
          <ChevronRight size={20} />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
        {" "}
        {relatedProducts?.map((related) => (
          <ProductCard key={related?._id} product={related} />
        ))}
      </div>
    </section>
  );
}
