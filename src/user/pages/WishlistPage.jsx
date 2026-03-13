// src/pages/WishlistPage.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useUserWishlistStore from "../../utils/stores/WishlistStore";
import useCartStore from "../../utils/stores/CartStore";
import WishlistCard from "../components/wishlist/WishlistCard";

const WishlistPage = () => {
  const {
    wishlistProducts,
    fetchWishlistProducts,
    removeFromWishlist,
    loading,
  } = useUserWishlistStore();

  const { addToCart } = useCartStore();

  useEffect(() => {
    console.log(wishlistProducts);

    fetchWishlistProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-3 sm:px-4 max-w-5xl">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 sm:mb-8">
          My Wishlist ({wishlistProducts.length})
        </h1>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-medium text-gray-700 mb-4">
                Your wishlist is empty
              </h3>
              <p className="text-gray-600 mb-8">
                Explore products and add your favorites here.
              </p>
              <Link to="/shop" className="btn btn-primary btn-lg px-10">
                Continue Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {wishlistProducts.map((product) => (
              <WishlistCard
                key={product._id}
                product={product}
                onRemove={() => removeFromWishlist(product._id)}
                onAddToCart={() => addToCart(product._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
