import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

const useUserStore = create(
  devtools(
    persist(
      (set) => ({
        user: null,            // user data from backend
        role: null,            // "admin" | "user"
        isAuthenticated: false,

        // Save user after login
        addUser: ({ user, role }) =>
          set({
            user,
            role,
            isAuthenticated: true,
          }),

        // Clear user after logout
        removeUser: () =>
          set({
            user: null,
            role: null,
            isAuthenticated: false,
          }),
      }),
      {
        name: "user-store", // saved in localStorage
        partialize: (state) => ({
          user: state.user,
          role: state.role,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);

export default useUserStore;
