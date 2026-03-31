// src/pages/OrderResultPage.jsx
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
import useAddressStore from "../../utils/stores/useAddressStore";

export default function OrderResultPage() {
  const { status } = useParams(); // "success" or "failure"
  const { state } = useLocation(); // Get data passed from checkout (orderId, etc.)
  const navigate = useNavigate();
  const { defaultAddress } = useAddressStore();

  const isSuccess = status === "success";
  const orderId = state?.orderId || "N/A";

  // Optional: Auto redirect to home after some time on failure (or success)
  useEffect(() => {
    if (!isSuccess && !orderId) {
      const timer = setTimeout(() => navigate("/"), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, orderId, navigate]);

  if (!isSuccess && !state) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
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
      <div className="max-w-lg mx-auto text-center">
        {/* Icon */}
        <div
          className={`mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-full 
          ${isSuccess ? "bg-green-100" : "bg-red-100"}`}
        >
          {isSuccess ? (
            <CheckCircle className="h-16 w-16 text-green-600" />
          ) : (
            <XCircle className="h-16 w-16 text-red-600" />
          )}
        </div>

        {/* Title */}
        <h1
          className={`text-4xl font-bold mb-3 ${isSuccess ? "text-gray-900" : "text-red-600"}`}
        >
          {isSuccess ? "Order Placed Successfully!" : "Payment Failed"}
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-8">
          {isSuccess
            ? "Thank you for shopping with us!"
            : "We couldn't process your payment. Please try again."}
        </p>

        {/* Order ID (only show on success) */}
        {isSuccess && orderId !== "N/A" && (
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full border mb-8">
            <Package size={20} className="text-green-600" />
            <span className="font-medium text-gray-700">Order ID:</span>
            <span className="font-semibold text-gray-900">#{orderId}</span>
          </div>
        )}

        {/* Information Box */}
        <div className="bg-white rounded-2xl shadow-sm border p-6 mb-10 text-left">
          {isSuccess ? (
            <>
              <div className="flex items-center gap-3 text-green-600 mb-4">
                <Package size={24} />
                <span className="font-semibold">What's Next?</span>
              </div>
              <ul className="space-y-3 text-sm text-gray-600">
                <li>
                  • Order updates will be sent to {defaultAddress?.phone} via
                  SMS
                </li>{" "}
                <li>• You can track your order in "My Orders"</li>
                <li>• Our team will prepare your package soon</li>
              </ul>
            </>
          ) : (
            <>
              <h3 className="font-semibold text-gray-800 mb-3">
                What went wrong?
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Your card may have insufficient balance</li>
                <li>• Payment was declined by your bank</li>
                <li>• Temporary network issue</li>
              </ul>
              <p className="mt-4 text-xs text-gray-500">
                No amount has been deducted from your account.
              </p>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {isSuccess ? (
            <>
              <Link
                to={`/orders/${orderId}`}
                className="btn btn-primary w-full gap-3 text-lg py-3.5"
              >
                Track Your Order
                <ArrowRight size={22} />
              </Link>

              <Link
                to="/"
                className="btn btn-outline w-full gap-3 text-lg py-3.5"
              >
                <Home size={22} />
                Back to Homepage
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/checkout"
                className="btn btn-primary w-full gap-3 text-lg py-3.5"
              >
                <RefreshCw size={22} />
                Try Payment Again
              </Link>

              <Link
                to="/cart"
                className="btn btn-outline w-full gap-3 text-lg py-3.5"
              >
                <ShoppingBag size={22} />
                Return to Cart
              </Link>

              <Link to="/" className="btn btn-ghost w-full text-gray-600 py-3">
                Go to Homepage
              </Link>
            </>
          )}
        </div>

        {/* Support */}
        <p className="mt-10 text-sm text-gray-500">
          Need help? Contact us at{" "}
          <a
            href="mailto:support@yourstore.com"
            className="text-blue-600 hover:underline"
          >
            support@yourstore.com
          </a>
        </p>
      </div>
    </div>
  );
}
