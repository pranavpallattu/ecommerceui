import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../../utils/stores/auth/useAuthStore";
import { toast } from "react-toastify";

export default function AddToCartButton({ inStock, alreadyInCart, onAdd }) {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!user) {
      toast.error("Please login to continue");
      navigate("/auth");
      return;
    }
    onAdd();
  };

  if (alreadyInCart) {
    return (
      <Link to="/cart" className="flex-1">
        <button className="btn btn-outline w-full h-12 sm:h-14 gap-2 sm:gap-3 text-sm sm:text-base">
          Go to Cart
        </button>
      </Link>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={!inStock}
      className="btn btn-outline flex-1 w-full h-12 sm:h-14 gap-2 sm:gap-3 text-sm sm:text-base disabled:opacity-50"
    >
      <ShoppingCart size={20} />
      {inStock ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}
