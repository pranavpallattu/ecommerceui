export default function OrderSummary({
  isBuyNow,
  checkoutData,
  subTotal,
  discount,
  grandTotal,
  orderLoading,
  defaultAddress,
  onPlaceOrder,
  selectedPayment,
}) {
  const getButtonText = () => {
    if (orderLoading) return "Processing...";

    switch (selectedPayment) {
      case "wallet":
        return `Pay with Wallet • ₹${Number(grandTotal).toFixed(2)}`;

      case "razorpay":
        return `Continue to Razorpay • ₹${Number(grandTotal).toFixed(2)}`;

      case "cod":
      default:
        return `Place COD Order • ₹${Number(grandTotal).toFixed(2)}`;
    }
  };
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body space-y-4">
        <h2 className="card-title">
          Order Summary (
          {isBuyNow ? checkoutData?.quantity : checkoutData?.items?.length}{" "}
          {isBuyNow ? "item" : "items"})
        </h2>
        {isBuyNow ? (
          <div className="flex justify-between text-sm">
            <span>
              {checkoutData?.product?.name} × {checkoutData?.quantity}
            </span>
            <span>₹{checkoutData?.subTotal}</span>
          </div>
        ) : (
          checkoutData?.items?.map((item) => (
            <div key={item._id} className="flex justify-between text-sm">
              <span className="flex-1 truncate mr-3">
                {item.product?.productName} × {item.quantity}
              </span>{" "}
              <span>₹{item.quantity * item.price}</span>
            </div>
          ))
        )}

        <div className="divider"></div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subTotal}</span>
        </div>

        {discount > 0 && (
          <div className="rounded-xl border border-success/30 bg-success/10 p-3">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-success">✓ Coupon Applied</p>

                <p className="text-xs opacity-70">
                  You saved ₹{Number(discount).toFixed(2)}
                </p>
              </div>

              <span className="font-bold text-success">
                -₹{Number(discount).toFixed(2)}
              </span>
            </div>
          </div>
        )}
        <div className="flex justify-between font-bold text-xl border-t pt-4">
          {" "}
          <span>Total</span>
          <span>₹{grandTotal}</span>
        </div>

        <button
          onClick={onPlaceOrder}
          disabled={orderLoading || !defaultAddress}
          className="btn btn-primary btn-lg w-full mt-4"
        >
          {orderLoading && (
            <span className="loading loading-spinner loading-sm"></span>
          )}
          {getButtonText()}
        </button>
      </div>
    </div>
  );
}
