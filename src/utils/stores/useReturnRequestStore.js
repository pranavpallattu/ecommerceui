import { create } from "zustand";
import {
  getReturnPendingNotificationsApi,
  approveOrderReturnApi,
  rejectOrderReturnApi,
  approveItemReturnApi,
  rejectItemReturnApi,
} from "../../services/allApis";
import { toast } from "react-toastify";

export const useReturnRequestStore = create((set, get) => ({
  /* =======================
     STATE
  ======================= */
  orderReturns: [],
  itemReturns: [],
  totalReturns: null,
  loading: false,
  actionLoading: false,
  error: null,

  /* =======================
     FETCH RETURN REQUESTS
  ======================= */
  fetchReturnRequests: async () => {
    try {
      set({ loading: true, error: null });

      const res = await getReturnPendingNotificationsApi();

      if (res?.success) {
        set({
          orderReturns: res.data.data.orderReturns || [],
          itemReturns: res.data.data.itemReturns || [],
          totalReturns:
            res.data.data.orderReturns.length +
            res.data.data.itemReturns.length,
        });
      } else {
        throw new Error(res?.message || "Failed to fetch return requests");
      }
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ loading: false });
    }
  },

  /* =======================
     ORDER RETURN ACTIONS
  ======================= */

  approveOrderReturn: async (orderId) => {
    try {
      set({ actionLoading: true, error: null });

      const res = await approveOrderReturnApi(orderId);

      if (!res?.success) {
        toast.error(res?.message || "Order return approval failed");
      }

      toast.success("Order return request approved");

      // Refresh list after success
      await get().fetchReturnRequests();
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ actionLoading: false });
    }
  },

  rejectOrderReturn: async (orderId, reason = "") => {
    try {
      set({ actionLoading: true, error: null });

      const res = await rejectOrderReturnApi(orderId, reason);

      if (!res?.success) {
        toast.error(res?.message || "Order return rejection failed");
      }

      toast.success("Order return request rejected");

      await get().fetchReturnRequests();
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ actionLoading: false });
    }
  },

  /* =======================
     ITEM RETURN ACTIONS
  ======================= */

  approveItemReturn: async (orderId, itemId) => {
    try {
      set({ actionLoading: true, error: null });

      const res = await approveItemReturnApi(orderId, itemId);

      if (!res?.success) {
        toast.error(res?.message || "Item return approval failed");
      }

      toast.success("Item return request approved");

      await get().fetchReturnRequests();
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ actionLoading: false });
    }
  },

  rejectItemReturn: async (orderId, itemId, reason = "") => {
    try {
      set({ actionLoading: true, error: null });

      const res = await rejectItemReturnApi(orderId, itemId, reason);

      if (!res?.success) {
        toast.error(res?.message || "Item return rejection failed");
      }

      toast.success("Item return request rejected");

      await get().fetchReturnRequests();
    } catch (err) {
      set({ error: err.message });
    } finally {
      set({ actionLoading: false });
    }
  },
}));
