// src/admin/pages/ProductDetailsPage.jsx
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useProductStore from "../../utils/stores/productStore";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { product, fetchProductById, loading } = useProductStore();

  useEffect(() => {
    fetchProductById(id);
  }, [id]);

  if (loading || !product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="grid md:grid-cols-2">
          {/* IMAGE */}
          <div className="p-10 bg-gray-50">
            <img
              src={product.productImage?.[0] || "/placeholder.jpg"}
              alt={product.productName}
              className="w-full rounded-3xl shadow-xl object-cover"
            />
          </div>

          {/* DETAILS */}
          <div className="p-10 space-y-8">
            <div>
              <h1 className="text-4xl font-black text-gray-900">
                {product.productName}
              </h1>
              <p className="text-gray-600 mt-4 text-lg">{product.description}</p>
            </div>

            <div className="space-y-6">
              <Detail label="Category" value={product.category?.name} />
              <PriceBlock product={product} />
              <StockBlock quantity={product.quantity} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-xl font-semibold text-gray-800">{value || "—"}</p>
  </div>
);

const PriceBlock = ({ product }) => (
  <div>
    <p className="text-sm text-gray-500">Price</p>
    <p className="text-4xl font-black text-gray-900">
      ₹{product.salePrice?.toFixed(2)}
    </p>
    {product.regularPrice > product.salePrice && (
      <p className="text-lg text-gray-400 line-through">
        ₹{product.regularPrice}
      </p>
    )}
  </div>
);

const StockBlock = ({ quantity }) => (
  <div>
    <p className="text-sm text-gray-500">Stock</p>
    <p
      className={`text-2xl font-bold ${
        quantity > 0 ? "text-emerald-600" : "text-red-600"
      }`}
    >
      {quantity} units
    </p>
  </div>
);

export default ProductDetailsPage;
