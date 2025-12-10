// src/admin/pages/ProductDetailsPage.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductStore from "../../utils/stores/productStore";
import {
  Tag,
  Package,
  Clock,
  ShoppingBag,
  CheckCircle,
  XCircle,
} from "lucide-react";
import ProductFormModal from "../components/ProductFormModal";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { openModal, product, fetchProductById, toggleListing, loading } = useProductStore();

  useEffect(() => {
    fetchProductById(id);
  }, [id])

  // if (loading || !product) {
  //   return (
  //     <div className="flex justify-center items-center h-[80vh]">
  //       <span className="loading loading-spinner loading-lg text-primary"></span>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 to-purple-100">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-3xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Product Details
          </h1>

        <button onClick={() => openModal(product)} className="bg-blue-400 p-2 text-white rounded-md">
  Edit Product
</button>


          <div
            className={`badge px-4 py-2 text-md ${
              product?.isActive ? "badge-success" : "badge-error"
            }`}
          >
            {product?.isActive ? "Active" : "Inactive"}
          </div>
<div className="flex items-center gap-3">
  <input
    type="checkbox"
    className="toggle"
    checked={product?.isActive}
    onChange={(e) => toggleListing(product?._id, e.target.checked)}
  />

  <span className="font-semibold text-gray-700">
    {product?.isActive ? "Unlist Product" : "List Product"}
  </span>
</div>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* IMAGE GALLERY */}
          <div className="grid grid-cols-2 gap-4">
            {product?.productImage?.length > 0 ? (
              product?.productImage.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={product?.productName}
                  className="rounded-2xl h-48 w-full object-cover shadow-lg hover:scale-105 transition"
                />
              ))
            ) : (
              <div className="col-span-2 text-center text-gray-500">
                No images available
              </div>
            )}
          </div>

          {/* DETAILS SECTION */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-2">
                {product?.productName}
              </h2>
              <p className="text-gray-600">{product?.description}</p>
            </div>

            {/* CATEGORY */}
            <InfoRow
              icon={<Tag className="w-5 h-5 text-primary" />}
              label="Category"
              value={product?.category?.name || "—"}
            />

            {/* STOCK */}
            <InfoRow
              icon={<Package className="w-5 h-5 text-primary" />}
              label="Stock"
              value={
                <span
                  className={`font-bold ${
                    product?.quantity > 0
                      ? "text-emerald-600"
                      : "text-red-600"
                  }`}
                >
                  {product?.quantity} units
                </span>
              }
            />

            {/* STATUS */}
            <InfoRow
              icon={<ShoppingBag className="w-5 h-5 text-primary" />}
              label="Status"
              value={
              
                  <span className="text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" /> {product?.status}
                  </span>
             
              }
            />

            {/* OFFER */}
            <InfoRow
              label="Offer"
              value={`${product?.offer || 0}%`}
            />

            {/* PRICE CARD */}
            <PriceCard product={product} />

            {/* TIMESTAMPS */}
            <div className="grid grid-cols-2 gap-5 pt-3">
              <TimeCard label="Created At" value={product?.createdAt} />
              <TimeCard label="Updated At" value={product?.updatedAt} />
            </div>
          </div>
        </div>
      </div>

              <ProductFormModal />

    </div>

    
  );
  
};

// ---------------- COMPONENTS ---------------------

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start gap-3">
    {icon}
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const PriceCard = ({ product }) => (
  <div className="bg-indigo-50 border border-indigo-200 p-5 rounded-2xl shadow-md">
    <p className="text-sm text-gray-500">Price</p>

    <p className="text-4xl font-black text-indigo-900">
      ₹{product?.salePrice?.toFixed(2)}
    </p>

    {product?.regularPrice > product?.salePrice && (
      <p className="text-gray-400 line-through mt-1">
        ₹{product?.regularPrice}
      </p>
    )}

    {product?.offer > 0 && (
      <p className="mt-2 text-emerald-700 font-semibold">
        {product?.offer}% OFF
      </p>
    )}
  </div>
);

const TimeCard = ({ label, value }) => (
  <div className="p-4 bg-gray-50 rounded-xl border shadow-sm">
    <p className="text-xs text-gray-500 flex items-center gap-2">
      <Clock className="w-4 h-4" /> {label}
    </p>
    <p className="text-sm font-semibold mt-1 text-gray-700">
      {new Date(value).toLocaleDateString()} <br />
      <span className="text-xs text-gray-500">
        {new Date(value).toLocaleTimeString()}
      </span>
    </p>
  </div>
);



export default ProductDetailsPage;
