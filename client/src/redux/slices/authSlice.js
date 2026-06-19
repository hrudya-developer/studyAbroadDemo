import { createSlice } from "@reduxjs/toolkit";

// Get stored auth data from sessionStorage
const storedAuth = sessionStorage.getItem("auth");

const parsedAuth = storedAuth
  ? JSON.parse(storedAuth)
  : null;

const initialState = parsedAuth || {
  user: null,
  token: null,
  uid: null,
  email: null,
  name:null,
  isLoggedIn: false,
};

const saveToSession = (state) => {
  sessionStorage.setItem(
    "auth",
    JSON.stringify(state)
  );
};

const clearSession = () => {
  sessionStorage.removeItem("auth");
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUserOtp: (state, action) => {
      state.uid = action.payload.uid;
      state.email = action.payload.email;
      state.name = action.payload.name;

      saveToSession(state);
    },

    userRegister: (state, action) => {
      state.user = action.payload;
      state.uid = action.payload.uid;
      state.email = action.payload.email || null;
      state.token = action.payload.token || null;
      state.isLoggedIn = true;

      saveToSession(state);
    },

    login: (state, action) => {
      state.user = action.payload.user;
      state.uid = action.payload.user?.uid || null;
      state.email = action.payload.user?.email || null;
      state.token = action.payload.token || null;
      state.isLoggedIn = true;

      saveToSession(state);
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.uid = null;
      state.email = null;
      state.isLoggedIn = false;

      clearSession();
    },
  },
});

export const {
  login,
  logout,
  setUserOtp,
  userRegister,
} = authSlice.actions;

export default authSlice.reducer;