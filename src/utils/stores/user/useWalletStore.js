import { create } from "zustand";
import { getWalletApi } from "../../../services/allApis";

const useWalletStore = create((set, get) => ({
  balance: 0,
  transactionHistory: [],

  page: 1,
  limit: 10,
  hasMore: true,

  loading: false,
  error: null,

  fetchWallet: async (page = 1) => {
    set({ loading: true, error: null });

    try {
      const res = await getWalletApi(page, get().limit);

      if (!res.success) {
        set({
          loading: false,
          error: res.message,
        });
        return;
      }

      const data = res.data.data;

      set((state) => ({
        balance: data.balance,

        transactionHistory:
          page === 1
            ? data.transactions
            : [...state.transactionHistory, ...data.transactions],

        page,
        hasMore: data.hasMore,
        loading: false,
      }));
    } catch (error) {
      set({
        loading: false,
        error:
          error?.response?.data?.message || "Failed to fetch wallet details",
      });
    }
  },

  loadMore: () => {
    const { page, hasMore, loading, fetchWallet } = get();

    if (loading || !hasMore) return;

    fetchWallet(page + 1);
  },

  resetWallet: () =>
    set({
      balance: 0,
      transactionHistory: [],
      page: 1,
      hasMore: true,
      loading: false,
      error: null,
    }),
}));

export default useWalletStore;
