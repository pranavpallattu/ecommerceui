import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  isAuthenticated: false,
  role: null,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload.user || null;
      state.role = action.payload.role || null;
      state.isAuthenticated = true;
    },
    removeUser: (state, action) => {
      (state.user = null), (state.role = null), (state.isAuthenticated = false);
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
