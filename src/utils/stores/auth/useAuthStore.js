import { create } from "zustand";
import { getMeApi, logoutApi } from "../../../services/allApis";

const useAuthStore = create((set) => ({
  user: null,
  role: null,
  loading: true,

  checkAuth: async () => {
    try {
      const res = await getMeApi();

      set({ user: res.data.data, role: res.data.data.role, loading: false });
    } catch {
      set({ user: null, role: null, loading: false });
    }
  },
  setUser: (user) =>
    set({
      user,
      role: user?.role || (user?.isAdmin ? "admin" : "user"),
      loading: false,
    }),

  logout: async () => {
    await logoutApi();
    set({ user: null, role: null });
  },
}));

export default useAuthStore;
