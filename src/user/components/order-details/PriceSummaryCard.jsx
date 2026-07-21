export default function PriceSummaryCard({ order }) {
  return (
    <div className="card bg-base-100 shadow-lg">
      <div className="card-body">
        <h2 className="card-title">Price Summary</h2>

        <div className="divider my-2"></div>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{order.subTotal?.toLocaleString("en-IN")}</span>
          </div>

          {order.discount > 0 && (
            <div className="flex justify-between text-success">
              <span>
                Coupon Discount
                {order.couponCode && (
                  <span className="badge badge-outline badge-success ml-2">
                    {order.couponCode}
                  </span>
                )}
              </span>
              <span>− ₹{order.discount.toLocaleString("en-IN")}</span>
            </div>
          )}

          {order.walletAmountUsed > 0 && (
            <div className="flex justify-between text-success">
              <span>Wallet Used</span>
              <span>− ₹{order.walletAmountUsed.toLocaleString("en-IN")}</span>
            </div>
          )}

          <div className="divider my-1"></div>

          <div className="flex justify-between font-bold text-lg">
            <span>Grand Total</span>
            <span>₹{order.grandTotal?.toLocaleString("en-IN")}</span>
          </div>

          <div className="divider my-1"></div>

          <div className="flex justify-between text-xs text-gray-500">
            <span>Payment Method</span>
            <span className="uppercase">{order.paymentMethod}</span>
          </div>

          <div className="flex justify-between text-xs">
            <span>Payment Status</span>
            <span
              className={`font-semibold ${
                order.paymentStatus === "Refunded"
                  ? "text-info"
                  : order.paymentStatus === "Paid"
                    ? "text-success"
                    : "text-warning"
              }`}
            >
              {order.paymentStatus}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
