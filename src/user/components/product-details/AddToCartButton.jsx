// src/components/product-details/AddToCartButton.jsx
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

export default function AddToCartButton({ inStock, alreadyInCart, onAdd }) {
  if (alreadyInCart) {
    return (
      <Link to="/cart">
        <button className="btn btn-outline btn-lg flex-1 gap-3 text-lg">
          Go to Cart
        </button>
      </Link>
    );
  }

  return (
    <button
      onClick={onAdd}
      disabled={!inStock}
      className="btn btn-outline btn-lg flex-1 gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ShoppingCart size={22} />
      {inStock ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}