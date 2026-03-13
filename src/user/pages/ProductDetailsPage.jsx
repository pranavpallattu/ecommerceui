// src/pages/ProductDetailsPage.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useUserProductStore from "../../utils/stores/userProductStore";
import useCartStore from "../../utils/stores/CartStore";
import useUserWishlistStore from "../../utils/stores/WishlistStore";
import ProductCard from "../components/ProductCard";
import {
  Heart,
  ShoppingCart,
  Share2,
  ChevronRight,
  Star,
  Package,
  Shield,
  Truck,
  RotateCcw,
  Home,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useBuyNowStore from "../../utils/stores/useBuyNowStore";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const {
    productDetails: product,
    relatedProducts,
    loading,
    error,
    fetchProductDetails,
  } = useUserProductStore();

  const { addToCart, cartProducts } = useCartStore();
  const { wishlistProducts, addtoWishlist, removeFromWishlist } =
    useUserWishlistStore();

  const alreadyInCart = cartProducts?.items?.some(
    (item) => item.product._id == id,
  );

  console.log(alreadyInCart);

  const navigate = useNavigate();
  const { createBuyNow } = useBuyNowStore();

  const handleBuyNow = async () => {
    if (!inStock) return;

    const buyNowId = await createBuyNow(product._id);
    console.log(buyNowId);

    if (buyNowId) {
      navigate(`/checkout/${buyNowId}`);
    }
  };

  useEffect(() => {
    fetchProductDetails(id);
  }, [id]);

  // Wishlist toggle
  const isInWishlist =
    wishlistProducts?.some((item) => item._id === product?._id) || false;

  const handleWishlistToggle = () => {
    if (isInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addtoWishlist(product._id);
    }
  };

  // Add to cart
  const handleAddToCart = () => {
    addToCart(product._id);
    // Optional: show toast or animation
  };

  const hasDiscount = product?.regularPrice > product?.salePrice;
  const inStock = product?.quantity > 0 && product?.isActive;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.regularPrice - product.salePrice) / product.regularPrice) *
          100,
      )
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-blue-600"></span>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center py-12 px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, we couldn't find the product you're looking for.
          </p>
          <Link to="/shop" className="btn btn-primary px-8">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 max-w-7xl">
          <nav className="flex items-center gap-2 text-sm text-gray-600">
            <Link
              to="/"
              className="hover:text-blue-600 flex items-center gap-1"
            >
              <Home size={16} />
              Home
            </Link>
            <ChevronRight size={16} />
            <Link to="/shop" className="hover:text-blue-600">
              Shop
            </Link>
            <ChevronRight size={16} />
            <span className="font-medium text-gray-900">
              {product.productName}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-lg border border-gray-200">
              <img
                src={
                  product.productImage?.[selectedImage] ||
                  product.productImage?.[0] ||
                  "https://via.placeholder.com/800"
                }
                alt={product.productName}
                className="w-full h-full object-contain p-8 transition-transform duration-500 hover:scale-105"
              />
              {discountPercent > 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  {discountPercent}% OFF
                </div>
              )}
              {!inStock && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <span className="text-white text-4xl font-bold tracking-wider">
                    OUT OF STOCK
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.productImage?.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {product.productImage.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`aspect-square rounded-xl overflow-hidden border-2 transition-all hover:scale-105 ${
                      selectedImage === i
                        ? "border-blue-600 shadow-lg ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-blue-300"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      className="w-full h-full object-contain p-2 bg-white"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* Title & Share */}
            <div className="flex justify-between items-start gap-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {product.productName}
              </h1>
              <button
                onClick={handleWishlistToggle}
                className="btn btn-ghost btn-circle hover:bg-gray-100"
                title={
                  isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"
                }
              >
                <Heart
                  size={22}
                  className={`transition-all ${
                    isInWishlist ? "text-red-500 fill-red-500" : "text-gray-400"
                  }`}
                />
              </button>
            </div>

            {/* Rating (mocked for now) */}
            <div className="flex items-center gap-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">(128 reviews)</span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-3">
              {inStock ? (
                <div className="flex items-center gap-2 px-5 py-2.5 bg-green-50 text-green-700 rounded-full font-semibold">
                  <Package size={18} />
                  In Stock ({product.quantity} left)
                </div>
              ) : (
                <div className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-700 rounded-full font-semibold">
                  <Package size={18} />
                  Out of Stock
                </div>
              )}
            </div>

            {/* Price */}
            <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-blue-700">
                  ₹{product.salePrice?.toLocaleString("en-IN")}
                </span>

                {hasDiscount && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.regularPrice?.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

              {hasDiscount && (
                <p className="mt-1 text-sm font-semibold text-green-600">
                  {discountPercent}% off • Save ₹
                  {(product.regularPrice - product.salePrice).toLocaleString(
                    "en-IN",
                  )}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              {/* Add to Cart */}
              {!alreadyInCart ? (
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className="btn btn-outline btn-lg flex-1 gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={22} />
                  {inStock ? "Add to Cart" : "Out of Stock"}
                </button>
              ) : (
                <Link to={"/cart"}>
                  <button className="btn btn-outline btn-lg flex-1  gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                    Go to Cart
                  </button>
                </Link>
              )}

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                disabled={!inStock}
                className="btn btn-primary btn-lg flex-1 gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts?.length > 0 && (
          <section className="bg-white rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100 mt-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                You May Also Like
              </h2>
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
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
