// src/components/checkout/OrderSummary.jsx
export default function OrderSummary({
  isBuyNow,
  checkoutData,
  subTotal,
  discount,
  grandTotal,
  orderLoading,
  defaultAddress,
  onPlaceOrder,
}) {
  return (
    <div className="card bg-base-100 shadow-xl sticky top-6">
      <div className="card-body space-y-4">
        <h2 className="card-title">Order Summary</h2>

        {isBuyNow ? (
          <div className="flex justify-between text-sm">
            <span>{checkoutData?.product?.productName} × 1</span>
            <span>₹{checkoutData?.subTotal}</span>
          </div>
        ) : (
          checkoutData?.items?.map((item) => (
            <div key={item._id} className="flex justify-between text-sm">
              <span>{item.product?.productName} × {item.quantity}</span>
              <span>₹{item.quantity * item.price}</span>
            </div>
          ))
        )}

        <div className="divider"></div>

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subTotal}</span>
        </div>

        <div className="flex justify-between text-success">
          <span>Discount</span>
          <span>-₹{discount}</span>
        </div>

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{grandTotal}</span>
        </div>

        <button
          onClick={onPlaceOrder}
          disabled={orderLoading || !defaultAddress}
          className="btn btn-primary btn-lg w-full mt-4"
        >
          {orderLoading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
}