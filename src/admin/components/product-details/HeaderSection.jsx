import { ArrowLeft, Edit, Eye, EyeOff } from "lucide-react";

export default function HeaderSection({
  product,
  navigate,
  openModal,
  toggleListing,
  openConfirm,
}) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="px-6 py-6">
        {/* Top */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Left */}
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-circle btn-ghost hover:bg-blue-50"
            >
              <ArrowLeft size={20} className="text-gray-700" />
            </button>

            <div className="min-w-0">
              <h1 className="text-3xl font-bold text-gray-900 truncate">
                {product.productName}
              </h1>
              <p className="mt-1 text-sm text-gray-500">Product Details</p>
            </div>
          </div>

          {/* Right */}
          <button
            onClick={() => openModal(product)}
            className="btn btn-primary gap-2"
          >
            <Edit size={18} />
            Edit Product
          </button>
        </div>

        {/* Bottom */}
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {/* Listing Badge */}
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              product.isActive
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {product.isActive ? "Listed" : "Unlisted"}
          </span>

          {/* Stock Badge */}
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              product.status === "Available"
                ? "bg-blue-50 text-blue-600 border border-blue-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}
          >
            {product.status}
          </span>

          {/* Toggle */}
          <div className="ml-auto flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-2.5">
            {product.isActive ? (
              <Eye className="text-blue-600" size={18} />
            ) : (
              <EyeOff className="text-gray-400" size={18} />
            )}

            <span className="text-sm font-medium text-gray-700">
              Visible to customers
            </span>

            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={product.isActive}
              onChange={() => {
                const isActive = product.isActive;

                openConfirm({
                  title: isActive ? "Unlist Product?" : "List Product?",
                  message: isActive
                    ? "This product will be hidden from customers."
                    : "This product will become visible to customers.",
                  confirmText: isActive ? "Unlist" : "List",
                  confirmVariant: isActive ? "error" : "success",
                  onConfirm: () => toggleListing(product._id, !isActive),
                });
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
