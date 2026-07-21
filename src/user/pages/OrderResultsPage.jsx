import { useEffect } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import {
  CheckCircle,
  XCircle,
  Package,
  ArrowRight,
  Home,
  ShoppingBag,
  RefreshCw,
} from "lucide-react";
import useAddressStore from "../../utils/stores/user/useAddressStore";

export default function OrderResultPage() {
  const { status } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const { defaultAddress } = useAddressStore();

  const isSuccess = status === "success";
  const orderId = state?.orderId || "N/A";

  useEffect(() => {
    if (!isSuccess && !orderId) {
      const timer = setTimeout(() => navigate("/"), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, orderId, navigate]);

  if (!isSuccess && !state) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center text-center">
        <div>
          <p className="text-red-500">Invalid order result</p>
          <Link to="/" className="btn btn-primary mt-4">
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto text-center bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
        {/* Icon */}
        <div
          className={`mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full ${isSuccess ? "bg-green-50" : "bg-red-50"}`}
        >
          {isSuccess ? (
            <CheckCircle className="h-10 w-10 text-green-600" />
          ) : (
            <XCircle className="h-10 w-10 text-red-600" />
          )}
        </div>

        {/* Title & Subtitle */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {isSuccess ? "Order Placed Successfully!" : "Payment Failed"}
        </h1>
        <p className="text-gray-500 mb-6">
          {isSuccess
            ? "Thank you for shopping with us!"
            : "We couldn't process your payment. Please try again."}
        </p>

        {/* Order ID */}
        {isSuccess && orderId !== "N/A" && (
          <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full mb-6 text-sm">
            <Package size={16} className="text-blue-600" />
            <span className="text-gray-600">Order ID:</span>
            <span className="font-semibold text-gray-900">#{orderId}</span>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-gray-50 rounded-xl p-5 mb-8 text-left text-sm text-gray-600 space-y-2">
          {isSuccess ? (
            <>
              <p className="font-semibold text-gray-900 mb-1">What's Next?</p>
              <p>
                • Order updates will be sent to {defaultAddress?.phone} via SMS
              </p>
              <p>• You can track your order in "My Orders"</p>
              <p>• Our team will prepare your package soon</p>
            </>
          ) : (
            <>
              <p className="font-semibold text-gray-900 mb-1">
                What went wrong?
              </p>
              <p>• Your card may have insufficient balance</p>
              <p>• Payment was declined by your bank</p>
              <p>• Temporary network issue</p>
              <p className="text-xs text-gray-400 pt-2">
                No amount has been deducted from your account.
              </p>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {isSuccess ? (
            <>
              <Link
                to={`/orders/${orderId}`}
                className="btn btn-primary w-full gap-2"
              >
                Track Your Order <ArrowRight size={18} />
              </Link>
              <Link to="/" className="btn btn-outline w-full gap-2">
                <Home size={18} /> Back to Homepage
              </Link>
            </>
          ) : (
            <>
              <Link to="/checkout" className="btn btn-primary w-full gap-2">
                <RefreshCw size={18} /> Try Payment Again
              </Link>
              <Link to="/cart" className="btn btn-outline w-full gap-2">
                <ShoppingBag size={18} /> Return to Cart
              </Link>
              <Link to="/" className="btn btn-ghost w-full text-gray-500">
                Go to Homepage
              </Link>
            </>
          )}
        </div>

        {/* Support */}
        <p className="mt-8 text-sm text-gray-500">
          Need help? Contact us at{" "}
          <a className="text-blue-600 hover:underline">support@onebazaar.com</a>
        </p>
      </div>
    </div>
  );
}
