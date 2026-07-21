import useProductStore from "../../../utils/stores/admin/useProductStore";
import ProductFormContent from "./ProductFormContent";

const ProductFormModal = () => {
  const { isModalOpen, closeModal, editData, loading } = useProductStore();

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        onClick={!loading ? closeModal : undefined}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-4 sm:p-6 border-b sticky top-0 bg-white z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {editData ? "Edit Product" : "Add New Product"}
          </h2>
          <button
            onClick={closeModal}
            disabled={loading}
            className="btn btn-ghost btn-circle btn-sm sm:btn-md"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-6">
          <ProductFormContent />
        </div>
      </div>
    </div>
  );
};

export default ProductFormModal;
