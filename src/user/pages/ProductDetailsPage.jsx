// src/pages/ProductDetailsPage.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useUserProductStore from "../../utils/stores/userProductStore";
import ProductCard from "../components/ProductCard";
import { Heart, ShoppingCart } from "lucide-react";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);

  const {
    productDetails: product,
    relatedProducts,
    loading,
    error,
    fetchProductDetails,
  } = useUserProductStore();

  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-green-600"></span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const hasDiscount = product.regularPrice > product.salePrice;
  const inStock = product.quantity > 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-6xl">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-6">
          Home / Shop / <span className="font-medium">{product.productName}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-[4/5] rounded-xl overflow-hidden bg-white shadow-sm">
              <img
                src={product.productImage?.[selectedImage] || product.productImage?.[0] || "https://via.placeholder.com/600"}
                alt={product.productName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            {product.productImage?.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {product.productImage.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      selectedImage === i ? "border-green-600" : "border-gray-200"
                    }`}
                  >
                    <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Wishlist */}
            <div className="flex justify-between items-start">
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {product.productName}
              </h1>
              <button className="btn btn-ghost btn-circle">
                <Heart size={24} className="text-gray-600 hover:text-red-500" />
              </button>
            </div>

            {/* Status */}
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
              inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}>
              {inStock ? "In Stock" : "Out of Stock"}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">
                ₹{product.salePrice?.toFixed(0)}
              </span>
              {hasDiscount && (
                <span className="text-xl text-gray-500 line-through">
                  ₹{product.regularPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <div className="space-y-3">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Action Buttons - Side by Side */}
            <div className="flex gap-4">
              <button
                disabled={!inStock}
                className="btn flex-1 flex items-center justify-center gap-3 "
              >
                <ShoppingCart size={22} />
                Add to Cart
              </button>

              <button className="btn btn-outline flex-1 flex items-center justify-center gap-3">
                <Heart size={22} />
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts?.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-center mb-10">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <ProductCard key={related._id} product={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;