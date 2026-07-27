import { create } from "zustand";
import {
  cancelItemApi,
  cancelOrderApi,
  createRazorpayOrderApi,
  getOrderByIdApi,
  getUserOrdersApi,
  placeOrderApi,
  verifyRazorpayPaymentApi,
  placeBuyNowOrderApi,
  createBuyNowRazorpayOrderApi,
  verifyBuyNowRazorpayPaymentApi,
  itemReturnApi,
  orderReturnApi,
} from "../../../services/allApis";
import { toast } from "react-toastify";

const useOrderStore = create((set, get) => ({
  userOrders: [],
  selectedOrder: null,

  loading: false,
  paymentLoading: false,
  error: null,

filters: {
  search: "",
  status: [],
  time: [],
},

setFilters: (filters) => {
  set((state) => ({
    filters: {
      ...state.filters,
      ...filters,
    },
  }));
},

getUserOrders: async (filters = get().filters) => {
  try {
    set({
      loading: true,
      error: null,
    });

    const params = {};

    if (filters.search?.trim()) {
      params.search = filters.search.trim();
    }

    if (filters.status?.length) {
      params.status = filters.status.join(",");
    }

    if (filters.time?.length) {
      params.time = filters.time.join(",");
    }

    const res = await getUserOrdersApi(params);

    set({
      userOrders: res.data.data,
      loading: false,
      error: null,
    });
  } catch (error) {
    set({
      loading: false,
      error:
        error?.response?.data?.message ||
        "Failed to fetch user orders",
    });
  }
},
  getOrderById: async (orderId) => {
    try {
      set({ loading: true });
      const res = await getOrderByIdApi(orderId);
      set({ selectedOrder: res.data.data, loading: false, error: null });
    } catch (error) {
      set({
        loading: false,
        error:
          error?.response?.data?.message || "Failed to fetch the order details",
      });
    }
  },
  cancelOrder: async (orderId, { reason }) => {
    try {
      set({ loading: true });
      const res = await cancelOrderApi(orderId, { reason });
      if (!res.success) {
        toast.error(res?.message);
      }
      toast.success("Order cancelled successfully");
      await get().getUserOrders();
      set({ loading: false, error: null });
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to cancel order",
      });
    }
  },

  cancelItem: async (orderId, itemId, { cancellationReason }) => {
    try {
      set({ loading: true });
      const res = await cancelItemApi(orderId, itemId, { cancellationReason });
      console.log(res);

      if (!res.success) {
        return toast.error(res?.message);
      }
      toast.success("Item cancelled successfully");
      await get().getOrderById(orderId);
      set({ loading: false, error: null });
    } catch (error) {
      set({
        loading: false,
        error: error?.response?.data?.message || "Failed to cancel item",
      });
    }
  },

  returnItem: async (orderId, itemId, { returnReason }) => {
    try {
      set({ loading: true, error: null });

      const res = await itemReturnApi(orderId, itemId, { returnReason });
      if (!res.success) {
        return toast.error(res?.message);
      }
      toast.success("Item return request submitted successfully");

      // Refresh order details
      await get().getOrderById(orderId);

      set({ loading: false });
    } catch (error) {
      set({
        loading: false,
        error:
          error?.response?.data?.message || "Failed to request item return",
      });
    }
  },

  returnOrder: async (orderId, { returnReason }) => {
    try {
      set({ loading: true, error: null });

      const res = await orderReturnApi(orderId, { returnReason });
      if (!res.success) {
        toast.error(res?.message);
      }
      toast.success("Order return request submitted successfully");

      // Refresh orders list + current order
      await get().getUserOrders();
      await get().getOrderById(orderId);

      set({ loading: false });
    } catch (error) {
      set({
        loading: false,
        error:
          error?.response?.data?.message || "Failed to request order return",
      });
    }
  },

  //  PLACE ORDER
  placeOrder: async (payload) => {
    try {
      set({ loading: true });
      const res = await placeOrderApi(payload);
      if (!res.success) {
        set({ loading: false });
        return toast.error(res?.message);
      }
      toast.success("Ordered placed successfully");
      set({ loading: false });
      return res?.data;
    } catch (err) {
      set({ loading: false, error: err.message });
      throw err;
    }
  },

  //  RAZORPAY
  createRazorpayOrder: async (amount) => {
    console.log(amount);

    try {
      set({ paymentLoading: true });
      const res = await createRazorpayOrderApi(amount);
      if (!res.success) {
        return toast.error(res?.message);
      }
      console.log(res);

      set({ paymentLoading: false });
      return res.data;
    } catch (err) {
      set({ paymentLoading: false, error: err.message });
      throw err;
    }
  },

  verifyRazorpayPayment: async (payload) => {
    try {
      set({ paymentLoading: true });
      const res = await verifyRazorpayPaymentApi(payload);
      if (!res.success) {
        return toast.error(res?.message);
      }
      toast.success("Razorpay payment successfull");
      await get().getUserOrders();
      set({ paymentLoading: false });
      return res.data;
    } catch (err) {
      set({ paymentLoading: false, error: err.message });
      throw err;
    }
  },
  //  PLACE BUY NOW ORDER
  placeBuyNowOrder: async (payload) => {
    try {
      set({ loading: true });
      const res = await placeBuyNowOrderApi(payload);
      if (!res.success) {
        set({ loading: false });
        return toast.error(res?.message);
      }
      toast.success("Order placed successfully");
      set({ loading: false, error: null });
      return res?.data;
    } catch (err) {
      set({
        loading: false,
        error: err?.response?.data?.message || "Failed to place buy now order",
      });
      throw err;
    }
  },
  //  BUY NOW RAZORPAY CREATE ORDER
  createBuyNowRazorpayOrder: async (buyNowId) => {
    try {
      set({ paymentLoading: true });
      const res = await createBuyNowRazorpayOrderApi({ buyNowId });
      set({ paymentLoading: false, error: null });
      return res.data;
    } catch (err) {
      set({
        paymentLoading: false,
        error:
          err?.response?.data?.message || "Failed to create Razorpay order",
      });
      throw err;
    }
  },
  //  BUY NOW RAZORPAY VERIFY
  verifyBuyNowRazorpayPayment: async (payload) => {
    try {
      set({ paymentLoading: true });
      const res = await verifyBuyNowRazorpayPaymentApi(payload);
      if (!res.success) {
        return toast.error(res?.message);
      }
      toast.success("Razoprpay payment successfull");
      await get().getUserOrders(); // refresh orders list
      set({ paymentLoading: false, error: null });
      return res.data;
    } catch (err) {
      set({
        paymentLoading: false,
        error: err?.response?.data?.message || "Payment verification failed",
      });
      throw err;
    }
  },
}));

export default useOrderStore;
