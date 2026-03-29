import { toast } from "react-toastify";
import useAuthStore from "../../../utils/stores/userAuthStore";
import { useNavigate } from "react-router-dom";

// src/components/product-details/BuyNowButton.jsx
export default function BuyNowButton({ inStock, onBuyNow }) {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!user) {
      toast.error("Please login to continue");
      navigate("/auth");
      return;
    }
    onBuyNow();
  };
  return (
    <button
      onClick={handleClick}
      disabled={!inStock}
      className="btn btn-primary btn-lg flex-1 gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Buy Now
    </button>
  );
}
