import { ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useAuthStore from "../../../utils/stores/userAuthStore";
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
      <Link to="/cart">
        <button className="btn btn-outline btn-lg flex-1 gap-3 text-lg">
          Go to Cart
        </button>
      </Link>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={!inStock}
      className="btn btn-outline btn-lg flex-1 gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <ShoppingCart size={22} />
      {inStock ? "Add to Cart" : "Out of Stock"}
    </button>
  );
}