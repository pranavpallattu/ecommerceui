// // src/utils/stores/userStore.js
// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { getUserMeApi, userLogoutApi } from "../../services/allApis";
// import { createJSONStorage } from "zustand/middleware";

// const useUserStore = create(
//   persist(
//     (set) => ({
//       user: null,
//       loading: true,

//       setUser: (user) => set({ user }),

//       checkUserAuth: async () => {
//         try {
//           const res = await getUserMeApi();
//           console.log(res);
          
//           set({ user: res?.data?.data, loading: false });
//         } catch {
//           set({ user: null, loading: false });
//         }
//       },

//       logoutUser: async () => {
//         await userLogoutApi();
//         set({ user: null });
//       },
//     }),
//      {
//     name: "user-auth-storage",
//     storage: createJSONStorage(() => sessionStorage),
//     partialize: (state) => ({ user: state.user }),
//   }
//   )
// );

// export default useUserStore;
