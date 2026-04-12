// src/pages/CartPage.jsx
import { useEffect, useState } from "react";
import useCartStore from "../../utils/stores/CartStore";
import useCouponStore from "../../utils/stores/useCouponStore";

import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import CouponSection from "../components/cart/CouponSection";
import EmptyCart from "../components/cart/EmptyCart"
const CartPage = () => {
  const [couponCode, setCouponCode] = useState("");

  const { cartProducts: cart, loading, fetchCartProducts, removeFromCart, updateQuantity } = useCartStore();
  const { applyCoupon, removeCoupon, loading: couponLoading } = useCouponStore();

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const handleQuantity = (productId, delta) => {
    const item = cart.items.find((i) => i.product._id === productId);
    if (!item) return;
    const newQty = item.quantity + delta;
    if (newQty < 1 || newQty > item.product.quantity) return;
    updateQuantity({ productId, quantity: newQty });
  };

  const handleApplyCoupon = () => applyCoupon(couponCode);
  const handleRemoveCoupon = () => removeCoupon();

  if (loading) return <div className="min-h-screen flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>

  </div>;

  if (!cart?.items?.length) return <EmptyCart />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold mb-8">My Cart ({cart.totalItems} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                handleQuantity={handleQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          <div className="space-y-6">
            <OrderSummary cart={cart} />
            <CouponSection
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              handleApplyCoupon={handleApplyCoupon}
              handleRemoveCoupon={handleRemoveCoupon}
              couponLoading={couponLoading}
              cart={cart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;