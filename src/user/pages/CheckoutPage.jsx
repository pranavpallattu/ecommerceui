import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  MapPin,
  Plus,
  CreditCard,
  Wallet as WalletIcon,
  Truck,
  ArrowLeft,
} from "lucide-react";
import useCartStore from "../../utils/stores/user/useCartStore";
import useAddressStore from "../../utils/stores/user/useAddressStore";
import useOrderStore from "../../utils/stores/user/useOrderStore";
import useCouponStore from "../../utils/stores/user/useCouponStore";
import useBuyNowStore from "../../utils/stores/user/useBuyNowStore";

import AddressSection from "../components/checkout/AddressSection";
import PaymentMethods from "../components/checkout/PaymentMethods";
import OrderSummary from "../components/checkout/OrderSummary";
import CouponSection from "../components/checkout/CouponSection";
import useWalletStore from "../../utils/stores/user/useWalletStore";
import CheckoutHeader from "../components/checkout/CheckoutHeader";

export default function CheckoutPage() {
  const { buyNowId } = useParams();
  const isBuyNow = Boolean(buyNowId);
  const navigate = useNavigate();

  const { buyNowCheckout, getBuyNowCheckout, clearBuyNow } = useBuyNowStore();

  const {
    cartProducts: cart,
    loading: cartLoading,
    fetchCartProducts,
  } = useCartStore();
  const { applyBuyNowCoupon, removeBuyNowCoupon } = useCouponStore();
  const {
    addresses,
    defaultAddressId,
    loading: addrLoading,
    fetchAddresses,
  } = useAddressStore();
  const { balance, loading: walletLoading, fetchWallet } = useWalletStore();

  useEffect(() => {
    fetchWallet();
  }, []);

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
      clearBuyNow();
      fetchCartProducts();
    }
    fetchAddresses();
  }, [isBuyNow, buyNowId]);

  const [couponCode, setCouponCode] = useState("");

  const {
    applyCoupon,
    removeCoupon,
    loading: couponLoading,
  } = useCouponStore();

  const handleApplyCoupon = () => {
    if (isBuyNow) {
      return applyBuyNowCoupon(buyNowId, couponCode);
    }

    return applyCoupon(couponCode);
  };

  const handleRemoveCoupon = () => {
    if (isBuyNow) {
      return removeBuyNowCoupon(buyNowId);
    }

    return removeCoupon();
  };
  const defaultAddress =
    addresses.find((a) => a._id === defaultAddressId) || addresses[0];
  const checkoutData = isBuyNow ? buyNowCheckout : cart;
  const appliedCoupon = checkoutData?.appliedCoupon;

  const subTotal = checkoutData?.subTotal || 0;
  const discount = checkoutData?.discount || 0;
  const grandTotal = checkoutData?.finalTotal || subTotal;

  const handlePayment = async () => {
    if (!defaultAddress) return;

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

      if (selectedPayment === "cod" || selectedPayment === "wallet") {
        const result = isBuyNow
          ? await placeBuyNowOrder({
              buyNowId,
              paymentMethod: selectedPayment,
              address: addressPayload,
            })
          : await placeOrder({
              paymentMethod: selectedPayment,
              address: addressPayload,
              couponId: appliedCoupon?._id,
              couponCode: appliedCoupon?.code,
            });

        if (!result?.success || !result?.orderId) {
          console.error("Order failed:", result);
          return;
        }

        const orderId = result?.orderId;

        navigate("/order/success", {
          state: { orderId },
        });

        return;
      }

      if (selectedPayment === "razorpay") {
        const cartOrderDetails = {
          subTotal,
          discount,
          grandTotal,
          couponId: appliedCoupon?._id || null,
          couponCode: appliedCoupon?.code || null,
          address: addressPayload,
        };

        if (isBuyNow) {
          const { order, key } = await createBuyNowRazorpayOrder(buyNowId);

          const rzp = new window.Razorpay({
            key,
            amount: order.amount,
            currency: "INR",
            order_id: order.id,
            name: "One Bazaar",
            description: "Buy Now Payment",
            // handler: async (response) => {
            //   const result = await verifyBuyNowRazorpayPayment({
            //     razorpay_payment_id: response.razorpay_payment_id,
            //     razorpay_order_id: response.razorpay_order_id,
            //     razorpay_signature: response.razorpay_signature,
            //     buyNowId,
            //     address: addressPayload,
            //   });

            //   if (!result?.success || !result?.orderId) {
            //     console.error("Order failed:", result);
            //     return;
            //   }

            //   //  Extract  orderId
            //   const orderId = result?.orderId;

            //   navigate("/order/success", {
            //     state: { orderId },
            //   });
            // },

            handler: async (response) => {
              console.log("Handler started");
              console.log(response);

              const result = await verifyBuyNowRazorpayPayment({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                buyNowId,
                address: addressPayload,
              });
              console.log("Verification result:", result);

              if (!result?.success || !result?.orderId) {
                console.log("Verification failed");
                return;
              }

              console.log("Navigating...");
              navigate("/order/success", {
                state: { orderId: result.orderId },
              });
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

        const { order, key } = await createRazorpayOrder(grandTotal);

        const rzp = new window.Razorpay({
          key,
          amount: order.amount,
          currency: "INR",
          order_id: order.id,
          name: "One Bazaar",
          description: "Order Payment",
          handler: async (response) => {
            const result = await verifyRazorpayPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              orderDetails: cartOrderDetails,
            });

            if (!result?.success || !result?.orderId) {
              console.error("Order failed:", result);
              return;
            }

            const orderId = result?.orderId;

            navigate("/order/success", {
              state: { orderId },
            });
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
      console.error(error);
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
        <CheckoutHeader isBuyNow={isBuyNow} checkoutData={checkoutData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <AddressSection defaultAddress={defaultAddress} />

            <PaymentMethods
              selectedPayment={selectedPayment}
              setSelectedPayment={setSelectedPayment}
              walletBalance={balance}
              grandTotal={grandTotal}
              walletLoading={walletLoading}
            />
          </div>

          {/* Right Column – Sticky Summary */}
          <div className="sticky top-6 space-y-6">
            <OrderSummary
              isBuyNow={isBuyNow}
              checkoutData={checkoutData}
              subTotal={subTotal}
              discount={discount}
              grandTotal={grandTotal}
              orderLoading={orderLoading}
              defaultAddress={defaultAddress}
              onPlaceOrder={handlePayment}
              selectedPayment={selectedPayment}
            />
            <CouponSection
              couponCode={couponCode}
              setCouponCode={setCouponCode}
              handleApplyCoupon={handleApplyCoupon}
              handleRemoveCoupon={handleRemoveCoupon}
              couponLoading={couponLoading}
              checkoutData={checkoutData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
