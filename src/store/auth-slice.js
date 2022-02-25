import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: "", email: "", isLoggedIn: false },
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.isLoggedIn = !!state.token;
    },
    logout(state) {
      state.token = "";
      state.email = "";
      state.isLoggedIn = !!state.token;
      console.log(state.isLoggedIn);
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
