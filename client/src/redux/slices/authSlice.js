import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  uid: null,
  email: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUserOtp: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
    },

    userRegister: (state, action) => {
      state.user = action.payload;
      state.uid = action.payload.uid;
      state.email = action.payload.email || null;
      state.token = action.payload.token || null;
      state.isLoggedIn = true;
    },

    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.uid = null;
      state.email = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout, setUserOtp, userRegister } = authSlice.actions;
export default authSlice.reducer;