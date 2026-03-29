// src/pages/CheckoutPage.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MapPin,
  Plus,
  CreditCard,
  Wallet as WalletIcon,
  Truck,
} from "lucide-react";

import useCartStore from "../../utils/stores/CartStore";
import useAddressStore from "../../utils/stores/useAddressStore";
import useOrderStore from "../../utils/stores/userOrderStore";
import useCouponStore from "../../utils/stores/useCouponStore";
import useBuyNowStore from "../../utils/stores/useBuyNowStore";

import AddressSection from "../components/checkout/AddressSection";
import PaymentMethods from "../components/checkout/PaymentMethods";
import OrderSummary from "../components/checkout/OrderSummary";

export default function CheckoutPage() {
  const { buyNowId } = useParams();
  const isBuyNow = Boolean(buyNowId);
  const navigate=useNavigate()

  const { buyNowCheckout, getBuyNowCheckout } = useBuyNowStore();

  const { cartProducts: cart, loading: cartLoading, fetchCartProducts } = useCartStore();
  const { appliedCoupon } = useCouponStore();
  const { addresses, defaultAddressId, loading: addrLoading, fetchAddresses } = useAddressStore();

  const {
    placeOrder,
    placeBuyNowOrder,
    createRazorpayOrder,
    verifyRazorpayPayment,
    createBuyNowRazorpayOrder,
    verifyBuyNowRazorpayPayment,
    loading: orderLoading,
  } = useOrderStore();

  const [selectedPayment, setSelectedPayment] = useState("cod");

  useEffect(() => {
    if (isBuyNow) {
      getBuyNowCheckout(buyNowId);
    } else {
      fetchCartProducts();
    }
    fetchAddresses();
  }, [isBuyNow, buyNowId]);

  const defaultAddress = addresses.find(a => a._id === defaultAddressId) || addresses[0];
  const checkoutData = isBuyNow ? buyNowCheckout : cart;

  const subTotal = checkoutData?.subTotal || 0;
  const discount = checkoutData?.discount || 0;
  const grandTotal = checkoutData?.finalTotal || subTotal;

 const handlePayment = async () => {
  if (!defaultAddress) {
    alert("Please select a delivery address");
    return;
  }

  try {
    const addressPayload = {
      addressId: defaultAddress._id,
      snapshot: {
        addressType: defaultAddress.addressType,
        streetAddress: defaultAddress.streetAddress,
        name: defaultAddress.name,
        city: defaultAddress.city,
        landmark: defaultAddress.landmark,
        state: defaultAddress.state,
        country: defaultAddress.country,
        pincode: defaultAddress.pincode,
        phone: defaultAddress.phone,
      },
    };

    // === COD & Wallet Payment ===
    if (selectedPayment === "cod" || selectedPayment === "wallet") {
      let orderId;

      if (isBuyNow) {
        const result = await placeBuyNowOrder({
          buyNowId,
          paymentMethod: selectedPayment,
          address: addressPayload,
        });
        orderId = result?.orderId || buyNowId;   // adjust based on your API response
      } else {
        const result = await placeOrder({
          paymentMethod: selectedPayment,
          address: addressPayload,
          couponId: appliedCoupon?._id,
          couponCode: appliedCoupon?.code,
        });
        orderId = result?.orderId || result?._id; // adjust according to your backend response
      }

      // Navigate to Success Page
      navigate("/order/success", { 
        state: { orderId } 
      });
      return;
    }

    // === Razorpay Payment ===
    if (selectedPayment === "razorpay") {
      if (isBuyNow) {
        const { order, key } = await createBuyNowRazorpayOrder(buyNowId);

        const rzp = new window.Razorpay({
          key,
          amount: order.amount,
          currency: "INR",
          order_id: order.id,
          name: "Your Store",
          description: "Buy Now Payment",
          handler: async (response) => {
            try {
              await verifyBuyNowRazorpayPayment({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                buyNowId,
                address: addressPayload,
              });

              // Success after Razorpay verification
              navigate("/order/success", { 
                state: { orderId: buyNowId } 
              });
            } catch (err) {
              console.error("Razorpay verification failed", err);
              navigate("/order/failure");
            }
          },
          prefill: {
            name: defaultAddress.name,
            contact: defaultAddress.phone,
          },
          theme: { color: "#000000" },
        });

        rzp.open();
        return;
      } 
      
      // Normal Cart Razorpay
      const { order, key } = await createRazorpayOrder(grandTotal);

      const rzp = new window.Razorpay({
        key,
        amount: order.amount,
        currency: "INR",
        order_id: order.id,
        name: "Your Store",
        description: "Order Payment",
        handler: async (response) => {
          try {
            await verifyRazorpayPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              orderDetails: {
                subTotal,
                discount,
                grandTotal,
                couponId: appliedCoupon?._id || null,
                couponCode: appliedCoupon?.code || null,
                address: addressPayload,
              },
            });

            // Success
            navigate("/order/success", { 
              state: { orderId: response.razorpay_order_id } 
            });
          } catch (err) {
            console.error("Razorpay verification failed", err);
            navigate("/order/failure");
          }
        },
        prefill: {
          name: defaultAddress.name,
          contact: defaultAddress.phone,
        },
        theme: { color: "#000000" },
      });

      rzp.open();
    }
  } catch (error) {
    console.error("Payment error:", error);
    navigate("/order/failure");
  }
};

  if (cartLoading || addrLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-6 px-4">
      <div className="max-w-6xl mx-auto">
<h1 className="text-3xl font-bold mb-8">Checkout</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <AddressSection defaultAddress={defaultAddress} />

            <PaymentMethods
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
            />
          </div>

          {/* Right Column – Sticky Summary */}
          <div>
            <OrderSummary
              isBuyNow={isBuyNow}
              checkoutData={checkoutData}
              subTotal={subTotal}
              discount={discount}
              grandTotal={grandTotal}
              orderLoading={orderLoading}
              defaultAddress={defaultAddress}
              onPlaceOrder={handlePayment}
            />
          </div>
        </div>
      </div>
    </div>
  );
}