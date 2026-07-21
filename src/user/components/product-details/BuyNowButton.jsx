import { toast } from "react-toastify";
import useAuthStore from "../../../utils/stores/auth/useAuthStore";
import { useNavigate } from "react-router-dom";

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
      className="btn btn-primary flex-1 w-full h-12 sm:h-14 gap-2 text-sm sm:text-base disabled:opacity-50"
    >
      Buy Now
    </button>
  );
}
