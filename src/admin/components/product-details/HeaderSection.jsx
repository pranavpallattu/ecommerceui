import { ArrowLeft, Edit, Eye, EyeOff, Trash2 } from "lucide-react";

export default function HeaderSection({
  product,
  navigate,
  openModal,
  toggleListing,
  deleteProduct,
  openConfirm,
}) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="px-4 sm:px-6 py-4 sm:py-6">
        {/* Top */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Left */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              onClick={() => navigate(-1)}
              className="btn btn-circle btn-ghost btn-sm sm:btn-md hover:bg-blue-50 shrink-0"
            >
              <ArrowLeft size={18} className="text-gray-700 sm:w-5 sm:h-5" />
            </button>

            <div className="min-w-0">
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900 truncate">
                {product.productName}
              </h1>
              <p className="mt-0.5 sm:mt-1 text-xs sm:text-sm text-gray-500">
                Product Details
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => openModal(product)}
              className="btn btn-primary btn-sm sm:btn-md gap-2 flex-1 sm:flex-none"
            >
              <Edit size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="sm:inline">Edit</span>
            </button>

            <button
              className="btn btn-outline btn-error btn-sm sm:btn-md gap-2 flex-1 sm:flex-none"
              onClick={() =>
                openConfirm({
                  title: "Delete Product?",
                  message:
                    "This product will be removed from your catalog and will no longer be available for purchase. Existing orders and sales history will remain unchanged.",
                  confirmText: "Delete",
                  confirmVariant: "error",
                  onConfirm: async () => {
                    try {
                      const success = await deleteProduct(product._id);
                      if (success) navigate("/admin/products");
                    } catch (error) {
                      console.error(error);
                    }
                  },
                })
              }
            >
              <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
              Delete
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-3">
          <span
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
              product.isActive
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {product.isActive ? "Listed" : "Unlisted"}
          </span>

          <span
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold ${
              product.status === "Available"
                ? "bg-blue-50 text-blue-600 border border-blue-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}
          >
            {product.status}
          </span>

          {/* Toggle */}
          <div className="w-full sm:w-auto sm:ml-auto flex items-center gap-2 sm:gap-3 rounded-xl border border-gray-200 bg-white px-3 sm:px-5 py-2 sm:py-2.5">
            {product.isActive ? (
              <Eye className="text-blue-600 shrink-0" size={18} />
            ) : (
              <EyeOff className="text-gray-400 shrink-0" size={18} />
            )}

            <span className="text-xs sm:text-sm font-medium text-gray-700 flex-1 sm:flex-none">
              Visible to customers
            </span>

            <input
              type="checkbox"
              className="toggle toggle-primary toggle-sm sm:toggle-md"
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