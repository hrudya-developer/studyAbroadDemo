import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "overseas@Miak2023";

const DEFAULT_IMAGE_PATH =
  "https://overseas.technocitysolutions.com/public/uploads/destination";

const cleanPath = (path) => {
  if (!path) return DEFAULT_IMAGE_PATH;
  return path.replace(/\/$/, "");
};

// ================= FETCH ALL COUNTRIES =================

export const fetchCountries = createAsyncThunk(
  "countryData/fetchCountries",

  async (uid, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/getDestinations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

        body: JSON.stringify({
  api: API_KEY,
  uid: uid ?? 0,
}),
        }
      );

      const result = await response.json();

      const countryData = Array.isArray(result?.destinations)
        ? result.destinations
        : Array.isArray(result?.data)
        ? result.data
        : [];

      return {
        countries: countryData,
        imagePath: cleanPath(result?.destinations_image_path),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// ================= FETCH SINGLE DESTINATION =================

export const fetchDestinationDetails = createAsyncThunk(
  "countryData/fetchDestinationDetails",

  async ({ uid, id }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/getDestinationDetails",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            api: API_KEY,
            uid,
            id,
          }),
        }
      );

      const result = await response.json();

      return {
        destinationDetails: result,
        imagePath: cleanPath(result?.destinations_image_path),
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  countries: [],
  imagePath: DEFAULT_IMAGE_PATH,

  destinationDetails: null,

  loading: false,
  detailsLoading: false,

  error: null,
};

const countrySlice = createSlice({
  name: "countryData",

  initialState,

  reducers: {
    clearDestinationDetails: (state) => {
      state.destinationDetails = null;
      state.detailsLoading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= COUNTRIES =================

      .addCase(fetchCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.loading = false;

        state.countries = action.payload.countries;
        state.imagePath = action.payload.imagePath || DEFAULT_IMAGE_PATH;
      })

      .addCase(fetchCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= DESTINATION DETAILS =================

      .addCase(fetchDestinationDetails.pending, (state) => {
        state.detailsLoading = true;
        state.error = null;
      })

      .addCase(fetchDestinationDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;

        state.destinationDetails = action.payload.destinationDetails;

        state.imagePath = action.payload.imagePath || DEFAULT_IMAGE_PATH;
      })

      .addCase(fetchDestinationDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearDestinationDetails } = countrySlice.actions;

export default countrySlice.reducer;