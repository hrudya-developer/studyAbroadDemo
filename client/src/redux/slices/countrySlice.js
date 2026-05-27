import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  countries: [],
  imagePath: "",
  loading: false,
  error: null,
};

const countrySlice = createSlice({
  name: "countryData",
  initialState,

  reducers: {
    countryInfo: (state, action) => {
      state.countries = action.payload.countries;
      state.imagePath = action.payload.imagePath;
    },

    setCountryLoading: (state, action) => {
      state.loading = action.payload;
    },

    // setCountryError: (state, action) => {
    //   state.error = action.payload;
    // },

    // clearCountryData: (state) => {
    //   state.countries = [];
    //   state.imagePath = "";
    //   state.loading = false;
    //   state.error = null;
    // },
  },
});

export const {
  countryInfo,
  setCountryLoading
} = countrySlice.actions;

export default countrySlice.reducer;