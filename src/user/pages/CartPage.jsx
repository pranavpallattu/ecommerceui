// src/pages/CartPage.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, Tag, X } from "lucide-react";
import useCartStore from "../../utils/stores/CartStore";

const CartPage = () => {
  const [couponCode, setCouponCode] = useState("");

  const {
    cartProducts: cart,
    loading,
    fetchCartProducts,
    removeFromCart,
    updateQuantiy,
  } = useCartStore();

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const handleQuantity = (productId, delta) => {
    const item = cart.items.find(i => i.product._id === productId);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty < 1) return;
    updateQuantiy({ productId, quantity: newQty });
  };

  const items = cart?.items || [];
  const isEmpty = items.length === 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 lg:py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-8">
          Shopping Cart ({cart?.totalItems || 0} items)
        </h1>

        {isEmpty ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <h3 className="text-2xl font-medium text-gray-700 mb-4">
              Your cart is empty
            </h3>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added anything yet.
            </p>
            <Link to="/shop" className="btn btn-primary btn-lg px-10">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item) => {
                const p = item.product;
                const lineTotal = item.price * item.quantity;

                return (
                  <div
                    key={item._id}
                    className="bg-white rounded-2xl shadow-sm p-6 flex gap-6 hover:shadow-md transition"
                  >
                    {/* Image */}
                    <div className="w-32 h-32 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                      <img
                        src={p.productImage?.[0] || "https://via.placeholder.com/200"}
                        alt={p.productName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <h3 className="text-xl font-medium text-gray-900 mb-2">
                        {p.productName}
                      </h3>

                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-lg font-semibold">₹{item.price}</span>
                        <span className="text-sm text-gray-500">
                          × {item.quantity} = <span className="font-bold">₹{lineTotal}</span>
                        </span>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleQuantity(p._id, -1)}
                          className="btn btn-outline btn-circle btn-sm"
                        >
                          <Minus size={18} />
                        </button>
                        <span className="text-lg font-bold w-12 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantity(p._id, 1)}
                          className="btn btn-outline btn-circle btn-sm"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(p._id)}
                      className="btn btn-ghost btn-circle hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={22} />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Summary */}
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-lg">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{cart.subTotal}</span>
                  </div>

                  <div className="flex justify-between text-lg">
                    <span>Discount</span>
                    <span className="font-medium text-green-600">
                      -₹{cart.discount || 0}
                    </span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-2xl font-bold">
                      <span>Grand Total</span>
                      <span>₹{cart.finalTotal}</span>
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary btn-lg w-full mb-4">
                  Proceed to Checkout
                </button>
              </div>

              {/* Coupon Section */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Tag size={22} />
                  Have a coupon?
                </h3>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="input input-bordered flex-1 rounded-xl"
                  />
                  <button className="btn btn-outline rounded-xl px-6">
                    Apply
                  </button>
                </div>

                {cart.appliedCoupon && (
                  <div className="mt-4 p-4 bg-green-50 rounded-xl flex items-center justify-between">
                    <span className="text-green-800 font-medium">
                      {cart.appliedCoupon.code} applied
                    </span>
                    <button className="btn btn-ghost btn-circle btn-sm hover:bg-red-100">
                      <X size={18} className="text-red-600" />
                    </button>
                  </div>
                )}

                <Link
                  to="/coupons"
                  className="block text-center mt-4 text-blue-600 hover:underline text-sm"
                >
                  View available coupons →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;