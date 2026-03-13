// // src/utils/stores/adminStore.js
// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { adminLogoutApi, getAdminMeApi } from "../../services/allApis";
// import { createJSONStorage } from "zustand/middleware";


// const useAdminStore = create(
//   persist(
//     (set) => ({
//       admin: null,
//       loading: true,

//       checkAdminAuth: async () => {
//         try {
//           const res = await getAdminMeApi();
//           set({ admin: res?.data?.data, loading: false });
//         } catch {
//           set({ admin: null, loading: false });
//         }
//       },

//       logoutAdmin: async () => {
//         await adminLogoutApi();
//         set({ admin: null });
//       },
//     }),
//     {
//     name: "admin-auth-storage",
//     storage: createJSONStorage(() => sessionStorage),
//     partialize: (state) => ({ admin: state.admin }),
//   }
//   )
// );

// export default useAdminStore;
