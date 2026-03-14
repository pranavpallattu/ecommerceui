// src/components/product-details/BuyNowButton.jsx
export default function BuyNowButton({ inStock, onBuyNow }) {
  return (
    <button
      onClick={onBuyNow}
      disabled={!inStock}
      className="btn btn-primary btn-lg flex-1 gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Buy Now
    </button>
  );
}