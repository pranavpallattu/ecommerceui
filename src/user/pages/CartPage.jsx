import { useEffect, useState } from "react";
import useCartStore from "../../utils/stores/user/useCartStore";
import CartItem from "../components/cart/CartItem";
import OrderSummary from "../components/cart/OrderSummary";
import EmptyCart from "../components/cart/EmptyCart";
import CartHeader from "../components/cart/CartHeader";

const CartPage = () => {
  const {
    cartProducts: cart,
    loading,
    fetchCartProducts,
    removeFromCart,
    updateQuantity,
  } = useCartStore();

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

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  if (!cart?.items?.length) return <EmptyCart />;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <CartHeader cart={cart} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {cart.items.map((item) => (
              <CartItem
                key={item?._id}
                item={item}
                handleQuantity={handleQuantity}
                removeFromCart={removeFromCart}
              />
            ))}
          </div>

          <div className="lg:sticky lg:top-6 h-fit">
            <OrderSummary cart={cart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
