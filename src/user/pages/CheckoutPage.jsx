import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  MapPin,
  Plus,
  CreditCard,
  Wallet as WalletIcon,
  Truck,
} from "lucide-react";
// import toast from "react-hot-toast";

import useCartStore from "../../utils/stores/CartStore";
import useAddressStore from "../../utils/stores/useAddressStore";
import useOrderStore from "../../utils/stores/userOrderStore";
import useCouponStore from "../../utils/stores/useCouponStore";
import useBuyNowStore from "../../utils/stores/useBuyNowStore";

export default function CheckoutPage() {
  const { buyNowId } = useParams();
  const isBuyNow = Boolean(buyNowId);
  // console.log(buyNowId);
  // console.log(isBuyNow);

  const { buyNowCheckout, getBuyNowCheckout } = useBuyNowStore();


  /* ---------------- Stores ---------------- */
  const {
    cartProducts: cart,
    loading: cartLoading,
    fetchCartProducts,
  } = useCartStore();

  const { appliedCoupon } = useCouponStore();

  const {
    addresses,
    defaultAddressId,
    loading: addrLoading,
    fetchAddresses,
  } = useAddressStore();

  const {
    placeOrder,
    placeBuyNowOrder,
    createRazorpayOrder,
    verifyRazorpayPayment,
    createBuyNowRazorpayOrder,
    verifyBuyNowRazorpayPayment,
    loading: orderLoading,
  } = useOrderStore();

  /* ---------------- Local State ---------------- */
  const [selectedPayment, setSelectedPayment] = useState("cod");

  /* ---------------- Effects ---------------- */

  useEffect(() => {
    if (isBuyNow) {
      getBuyNowCheckout(buyNowId);
    } else {
      fetchCartProducts();
    }

    fetchAddresses();
  }, [isBuyNow, buyNowId]);

  /* ---------------- Derived Data ---------------- */
  const defaultAddress =
    addresses.find((a) => a._id === defaultAddressId) || addresses[0];

  const checkoutData = isBuyNow ? buyNowCheckout : cart;

  console.log(checkoutData);
  

  const subTotal = checkoutData?.subTotal || 0;
  const discount = checkoutData?.discount || 0;
  const grandTotal = checkoutData?.finalTotal || subTotal;

  /* ---------------- Payment Handler ---------------- */
  const handlePayment = async () => {
    if (!defaultAddress) {
      // toast.error("Please select a delivery address");
      return;
    }

    try {
      /* ---------- COMMON ADDRESS PAYLOAD ---------- */
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

      /* =====================================================
       COD / WALLET
    ===================================================== */
      if (selectedPayment === "cod" || selectedPayment === "wallet") {
        if (isBuyNow) {
          await placeBuyNowOrder({
            buyNowId,
            paymentMethod: selectedPayment,
            address: addressPayload,
          });
        } else {
          await placeOrder({
            paymentMethod: selectedPayment,
            address: addressPayload,
            couponId: appliedCoupon?._id,
            couponCode: appliedCoupon?.code,
          });
        }

        // toast.success("Order placed successfully");
        // navigate("/orders");
        return;
      }

      /* =====================================================
       RAZORPAY
    ===================================================== */
      if (selectedPayment === "razorpay") {
        /* ---------- CART ORDER DETAILS ---------- */
        const cartOrderDetails = {
          subTotal,
          discount,
          grandTotal,
          couponId: appliedCoupon?._id || null,
          couponCode: appliedCoupon?.code || null,
          address: addressPayload,
        };

        /* ---------- BUY NOW ---------- */
        if (isBuyNow) {
          console.log(buyNowCheckout.product.productId);

          const { order, key } = await createBuyNowRazorpayOrder(buyNowId);

          const rzp = new window.Razorpay({
            key,
            amount: order.amount,
            currency: "INR",
            order_id: order.id,
            name: "Your Store",
            description: "Buy Now Payment",

            handler: async (response) => {
              await verifyBuyNowRazorpayPayment({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                buyNowId,
                address: addressPayload,
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

        /* ---------- CART ---------- */
        const { order, key } = await createRazorpayOrder(grandTotal);

        const rzp = new window.Razorpay({
          key,
          amount: order.amount,
          currency: "INR",
          order_id: order.id,
          name: "Your Store",
          description: "Order Payment",

          handler: async (response) => {
            await verifyRazorpayPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              orderDetails: cartOrderDetails,
            });

            // toast.success("Payment successful");
            // navigate("/orders");
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
      // toast.error(error?.response?.data?.message || "Payment failed");
    }
  };

  /* ---------------- Loading ---------------- */
  if (cartLoading || addrLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  /* ======================= UI ======================= */
  return (
    <div className="min-h-screen bg-base-200 py-6 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ================= LEFT ================= */}
          <div className="lg:col-span-2 space-y-6">
            {/* -------- Address -------- */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body space-y-4">
                <div className="flex justify-between items-center">
                  <h2 className="card-title flex items-center gap-2">
                    <MapPin size={18} />
                    Delivery Address
                  </h2>

                  <button
                    onClick={() => setShowAddressModal(true)}
                    className="btn btn-xs btn-outline gap-1"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>

                {defaultAddress ? (
                  <div className="border rounded-xl p-4 bg-base-200/50">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-semibold">{defaultAddress.name}</p>
                        <p className="text-sm text-gray-600">
                          {defaultAddress.phone}
                        </p>
                      </div>
                      <span className="badge badge-outline badge-sm">
                        {defaultAddress.addressType}
                      </span>
                    </div>

                    <p className="text-sm mt-2 text-gray-700">
                      {defaultAddress.streetAddress}
                      {defaultAddress.landmark &&
                        `, Near ${defaultAddress.landmark}`}
                      <br />
                      {defaultAddress.city}, {defaultAddress.state} -{" "}
                      {defaultAddress.postalCode}
                      <br />
                      {defaultAddress.country || "India"}
                    </p>
                  </div>
                ) : (
                  <div className="alert alert-info">
                    Please add a delivery address
                  </div>
                )}
              </div>
            </div>

            {/* -------- Payment -------- */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body space-y-3">
                <h2 className="card-title">Payment Method</h2>

                <label className="flex gap-3 p-4 border rounded-xl cursor-pointer">
                  <input
                    type="radio"
                    checked={selectedPayment === "cod"}
                    onChange={() => setSelectedPayment("cod")}
                    className="radio radio-primary"
                  />
                  <Truck /> Cash on Delivery
                </label>

                <label className="flex gap-3 p-4 border rounded-xl cursor-pointer">
                  <input
                    type="radio"
                    checked={selectedPayment === "wallet"}
                    onChange={() => setSelectedPayment("wallet")}
                    className="radio radio-primary"
                  />
                  <WalletIcon /> Wallet
                </label>

                <label className="flex gap-3 p-4 border rounded-xl cursor-pointer">
                  <input
                    type="radio"
                    checked={selectedPayment === "razorpay"}
                    onChange={() => setSelectedPayment("razorpay")}
                    className="radio radio-primary"
                  />
                  <CreditCard /> Razorpay
                </label>
              </div>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div>
            <div className="card bg-base-100 shadow-xl sticky top-6">
              <div className="card-body space-y-4">
                <h2 className="card-title">Order Summary</h2>

                {isBuyNow ? (
                  <div className="flex justify-between text-sm">
                    <span>{buyNowCheckout?.product?.productName} × 1</span>
                    <span>₹{buyNowCheckout?.subTotal}</span>
                  </div>
                ) : (
                  cart?.items?.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        {item.product?.productName} × {item.quantity}
                      </span>
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
                  onClick={handlePayment}
                  disabled={orderLoading || !defaultAddress}
                  className="btn btn-primary btn-lg w-full mt-4"
                >
                  {orderLoading ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
