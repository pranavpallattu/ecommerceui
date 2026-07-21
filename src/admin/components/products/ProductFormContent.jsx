import { useEffect, useState } from "react";
import useProductStore from "../../../utils/stores/admin/useProductStore";
import useCategoryStore from "../../../utils/stores/admin/useCategoryStore";
import { toast } from "react-toastify";
import { X } from "lucide-react";

const ProductFormContent = () => {
  const { editData, handleSubmit, closeModal, loading } = useProductStore();
  const { activeCategories, fetchActiveCategories } = useCategoryStore();

  const [form, setForm] = useState({
    productName: "",
    category: "",
    description: "",
    quantity: "",
    regularPrice: "",
    offer: "",
    productImage: [],
    existingImages: [],
    removedImages: [],
  });

  useEffect(() => {
    fetchActiveCategories();
  }, [fetchActiveCategories]);

  // Reset form on open/edit
  useEffect(() => {
    if (editData) {
      setForm({
        productName: editData.productName || "",
        category: editData.category?._id || "",
        description: editData.description || "",
        quantity: editData.quantity || "",
        regularPrice: editData.regularPrice || "",
        offer: editData.offer || "",
        productImage: [],
        existingImages: editData.productImage || [],
        removedImages: [],
      });
    } else {
      setForm({
        productName: "",
        category: "",
        description: "",
        quantity: "",
        regularPrice: "",
        offer: "",
        productImage: [],
        existingImages: [],
        removedImages: [],
      });
    }
  }, [editData]);
  const handleImageChange = (e) => {
    // Convert the FileList into a normal array.
    const selectedFiles = Array.from(e.target.files);

    // Check if any of the selected images already exist
    // in the productImage array by comparing their
    // name, size, and lastModified properties.
    const duplicateFound = selectedFiles.some((newFile) =>
      form.productImage.some(
        (existingFile) =>
          existingFile.name === newFile.name &&
          existingFile.size === newFile.size &&
          existingFile.lastModified === newFile.lastModified,
      ),
    );

    // Stop the upload if a duplicate image is found.
    if (duplicateFound) {
      toast.error("This image has already been added.");
      e.target.value = "";
      return;
    }

    // Calculate the total number of images after adding
    // the newly selected images.
    const totalImages =
      form.existingImages.length +
      form.productImage.length +
      selectedFiles.length;

    // Prevent the user from uploading more than 4 images.
    if (totalImages > 4) {
      toast.error("Maximum 4 images are allowed.");
      e.target.value = "";
      return;
    }

    // Add the selected images to the existing images.
    setForm((prev) => ({
      ...prev,
      productImage: [...prev.productImage, ...selectedFiles],
    }));

    // Reset the file input so the same image can be
    // selected again after it has been removed.
    e.target.value = "";
  };

  const removeImage = (index, isExisting = false) => {
    if (isExisting) {
      setForm((prev) => {
        const removed = prev.existingImages[index];

        return {
          ...prev,
          existingImages: prev.existingImages.filter((_, i) => i !== index),
          removedImages: [...prev.removedImages, removed],
        };
      });
    } else {
      setForm((prev) => ({
        ...prev,
        productImage: prev.productImage.filter((_, i) => i !== index),
      }));
    }
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("productName", form.productName);
    formData.append("category", form.category);
    formData.append("description", form.description);
    formData.append("quantity", form.quantity);
    formData.append("regularPrice", form.regularPrice);
    formData.append("offer", form.offer || 0);

    form.existingImages.forEach((image) =>
      formData.append("existingImages", JSON.stringify(image)),
    );

    form.removedImages.forEach((image) =>
      formData.append("removedImages", JSON.stringify(image)),
    );

    form.productImage.forEach((file) => formData.append("productImage", file));

    if (form.existingImages.length + form.productImage.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    await handleSubmit(formData);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
      {/* Product Name */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
          Product Name
        </label>
        <input
          type="text"
          maxLength={100}
          autoComplete="off"
          placeholder="Enter product name"
          value={form.productName}
          onChange={(e) =>
            setForm({
              ...form,
              productName: e.target.value,
            })
          }
          className="input input-bordered w-full"
          required
        />
      </div>

      {/* Category */}
      {!editData && (
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="select select-bordered w-full text-sm sm:text-base"
            required
          >
            <option value="" disabled>
              Select category
            </option>
            {activeCategories?.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat?.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Description */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          rows={5}
          maxLength={500}
          placeholder="Enter product description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="textarea textarea-bordered w-full"
          required
        />

        <p className="text-xs text-gray-500 mt-1">
          {form.description.length}/500
        </p>
      </div>

      {/* Price Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Regular Price
          </label>
          <input
            type="number"
            min="1"
            step="1"
            placeholder="0"
            value={form.regularPrice}
            onChange={(e) => setForm({ ...form, regularPrice: e.target.value })}
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Offer % (optional)
          </label>
          <input
            type="number"
            min="0"
            max="100"
            step="1"
            placeholder="0%"
            value={form.offer}
            onChange={(e) => setForm({ ...form, offer: e.target.value })}
            className="input input-bordered w-full"
          />
        </div>
        <div className="sm:col-span-2 md:col-span-1">
          <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
            Stock Quantity
          </label>
          <input
            type="number"
            min="0"
            step="1"
            placeholder="Available stock"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="input input-bordered w-full"
            required
          />
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
          Product Images{" "}
        </label>
        <p className="text-xs text-gray-500 mt-1">
          Maximum 4 images • JPG, PNG, WEBP
        </p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
          className="file-input file-input-bordered w-full text-xs sm:text-sm"
        />
        <p className="text-xs text-gray-500 mt-1">
          {form.existingImages.length + form.productImage.length} of 4 images
          selected
        </p>
      </div>

      {/* Image Previews */}
      {(form.existingImages.length > 0 || form.productImage.length > 0) && (
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
            Preview
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {form.existingImages.map((image, i) => (
              <div key={`exist-${i}`} className="relative group">
                <img
                  src={image.imageUrl}
                  alt=""
                  className="aspect-square w-full rounded-lg border object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i, true)}
                  className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
            {form.productImage.map((file, i) => (
              <div key={`new-${i}`} className="relative group">
                <img
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-full h-32 sm:h-36 md:h-40 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="absolute top-1 sm:top-2 right-1 sm:right-2 btn btn-circle btn-xs sm:btn-sm btn-error opacity-90 hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4 pt-4 sm:pt-6 border-t">
        <button
          type="button"
          disabled={loading}
          onClick={closeModal}
          className="btn btn-ghost w-full sm:w-auto text-sm sm:text-base"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full sm:w-auto sm:px-8 text-sm sm:text-base"
        >
          {editData ? "Update Product" : "Add Product"}
        </button>
      </div>
    </form>
  );
};

export default ProductFormContent;
