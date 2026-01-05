// src/pages/WishlistPage.jsx
import { useState } from "react";
import WishlistCard from "../components/WishlistCard";
import { Link } from "react-router-dom";

// Mock data — replace with real wishlist from store/context later
const mockWishlist = [
  {
    _id: "1",
    productName: "Wireless Bluetooth Headphones",
    salePrice: 2499,
    productImage: ["https://via.placeholder.com/400"],
  },
  {
    _id: "2",
    productName: "Smart Watch Series 7",
    salePrice: 12999,
    productImage: ["https://via.placeholder.com/400"],
  },
  {
    _id: "3",
    productName: "Minimal Leather Wallet",
    salePrice: 899,
    productImage: ["https://via.placeholder.com/400"],
  },
];

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState(mockWishlist);

  const handleRemove = (id) => {
    setWishlist(wishlist.filter((item) => item._id !== id));
  };

  const handleAddToCart = (id) => {
    // Add to cart logic here
    alert("Added to cart!");
    // Optionally remove from wishlist after adding
    // handleRemove(id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 lg:py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
          My Wishlist ({wishlist.length})
        </h1>

        {wishlist.length === 0 ? (
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
            {wishlist.map((product) => (
              <WishlistCard
                key={product._id}
                product={product}
                onRemove={() => handleRemove(product._id)}
                onAddToCart={() => handleAddToCart(product._id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;