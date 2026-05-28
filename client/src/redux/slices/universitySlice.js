import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "overseas@Miak2023";

export const fetchUniversitiesByCountry = createAsyncThunk(
  "universityData/fetchUniversitiesByCountry",

  async ({ uid, id, offset = 0, keyword = "alluniversities" }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/getUniversitybyOffset",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api: API_KEY,
            uid,
            id,
            offset,
            keyword,
          }),
        }
      );

      const result = await response.json();

      return {
        universities: result?.data || result?.universities || [],
        universityImagePath: result?.university_image_path || "",
        raw: result,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  universities: [],
  universityImagePath: "",
  universityRawData: null,

  loading: false,
  error: null,
};

const universitySlice = createSlice({
  name: "universityData",

  initialState,

  reducers: {
    clearUniversities: (state) => {
      state.universities = [];
      state.universityRawData = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUniversitiesByCountry.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUniversitiesByCountry.fulfilled, (state, action) => {
        state.loading = false;

        state.universities = action.payload.universities;
        state.universityImagePath = action.payload.universityImagePath;
        state.universityRawData = action.payload.raw;
      })

      .addCase(fetchUniversitiesByCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUniversities } = universitySlice.actions;

export default universitySlice.reducer;