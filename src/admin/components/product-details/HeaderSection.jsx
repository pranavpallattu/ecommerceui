// src/components/product-details/HeaderSection.jsx
import { ArrowLeft, Edit } from "lucide-react";

export default function HeaderSection({
  product,
  navigate,
  openModal,
  toggleListing,
  openConfirm,
}) {
  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 lg:py-8">
      <div className="flex flex-col gap-4 sm:gap-5">
        {/* Top Row: Back + Title */}
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-circle btn-sm sm:btn-md flex-shrink-0"
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="sm:w-6 sm:h-6" />
          </button>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate flex-1">
            {product.productName}
          </h1>
        </div>

        {/* Bottom Row: Actions – all matched height */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 lg:gap-6 h-10 sm:h-12">
          {/* Status Badge – matched height */}
          <div
            className={`badge badge-lg px-4 sm:px-6 py-3 text-white font-medium text-sm sm:text-base shadow-sm h-10 sm:h-12 flex items-center ${
              product.isActive ? "badge-success" : "badge-error"
            }`}
          >
            {product.isActive ? "Listed" : "Unlisted"}
          </div>

          {/* Toggle + Label – matched height */}
          <div className="flex items-center gap-3 sm:gap-4 h-10 sm:h-12">
            <input
              type="checkbox"
              className="toggle toggle-primary toggle-md sm:toggle-lg h-10 sm:h-12 w-16 sm:w-20"
              checked={product.isActive}
              onChange={(e) => {
                const isActive = product.isActive;
                openConfirm({
                  title: isActive ? "Unlist Product?" : "List Product?",
                  message: isActive
                    ? "This product will be hidden from users."
                    : "This product will be visible to users.",
                  confirmText: isActive ? "Unlist" : "List",
                  confirmVariant: isActive ? "error" : "success",
                  onConfirm: () => toggleListing(product._id, !isActive),
                });
              }}
            />
            <span className="font-medium text-gray-700 whitespace-nowrap text-sm sm:text-base">
              {product.isActive ? "Unlist" : "List"}
            </span>
          </div>

          {/* Edit Button – matched height */}
          <button
            onClick={() => openModal(product)}
            className="btn btn-primary btn-md gap-2 px-5 sm:px-7 h-6 sm:h-12 text-sm sm:text-base font-medium shadow-md flex-shrink-0"
          >
            <Edit size={18} className="sm:w-5 sm:h-5" />
            <span className="hidden xs:inline">Edit Product</span>
            <span className="xs:hidden">Edit</span>
          </button>
        </div>
      </div>
    </div>
  );
}