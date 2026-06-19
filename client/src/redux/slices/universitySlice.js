import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "overseas@Miak2023";

export const fetchUniversitiesByCountry = createAsyncThunk(
  "universityData/fetchUniversitiesByCountry",
  async (
    { uid, id, offset = 0, keyword = "alluniversities" },
    { rejectWithValue, signal }
  ) => {
    try {
      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/getUniversitybyOffset",
        {
          method: "POST",
          signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api: API_KEY,
            uid,
            id,
            offset,
            keyword,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch universities");

      const result = await response.json();

      return {
        countryId: id,
        universities: result?.data || result?.universities || [],
        universityImagePath: result?.universities_image_path || "",
        raw: result,
      };
    } catch (error) {
      if (error.name === "AbortError") {
        return rejectWithValue("Request cancelled");
      }
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUniversityDetails = createAsyncThunk(
  "universityData/fetchUniversityDetails",
  async ({ uid, id }, { rejectWithValue, signal }) => {
    try {
      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/getUniversityDetails",
        {
          method: "POST",
          signal,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            api: API_KEY,
            uid,
            id,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to fetch university details");

      const result = await response.json();

      return {
        id,
        university: result?.data?.[0] || null,
        info: result?.info || [],
        sliders: result?.sliders || [],
        course: result?.course || [],
        universityImagePath: result?.universities_image_path || "",
        sliderImagePath: result?.slider_image_path || "",
        raw: result,
      };
    } catch (error) {
      if (error.name === "AbortError") {
        return rejectWithValue("Request cancelled");
      }
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  universities: [],
  universitiesByCountry: {},
  universityImagePath: "",
  universityRawData: null,

  selectedUniversity: null,
  selectedInfo: [],
  selectedSliders: [],
  selectedCourses: [],
  sliderImagePath: "",
  universityDetailsRawData: null,

  loading: false,
  detailsLoading: false,
  currentCountryId: null,
  error: null,
  detailsError: null,
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

    clearUniversityDetails: (state) => {
      state.selectedUniversity = null;
      state.selectedInfo = [];
      state.selectedSliders = [];
      state.selectedCourses = [];
      state.universityDetailsRawData = null;
      state.detailsError = null;
    },

    setUniversitiesFromCache: (state, action) => {
      const countryId = action.payload;
      state.currentCountryId = countryId;
      state.universities = state.universitiesByCountry[countryId] || [];
      state.error = null;
      state.loading = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUniversitiesByCountry.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.currentCountryId = action.meta.arg.id;
      })

      .addCase(fetchUniversitiesByCountry.fulfilled, (state, action) => {
        state.loading = false;

        const { countryId, universities, universityImagePath, raw } =
          action.payload;

        state.universities = universities;
        state.universitiesByCountry[countryId] = universities;
        state.universityImagePath = universityImagePath;
        state.universityRawData = raw;
      })

      .addCase(fetchUniversitiesByCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchUniversityDetails.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
      })

      .addCase(fetchUniversityDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;

        state.selectedUniversity = action.payload.university;
        state.selectedInfo = action.payload.info;
        state.selectedSliders = action.payload.sliders;
        state.selectedCourses = action.payload.course;
        state.universityImagePath = action.payload.universityImagePath;
        state.sliderImagePath = action.payload.sliderImagePath;
        state.universityDetailsRawData = action.payload.raw;
      })

      .addCase(fetchUniversityDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.payload;
      });
  },
});

export const {
  clearUniversities,
  clearUniversityDetails,
  setUniversitiesFromCache,
} = universitySlice.actions;

export default universitySlice.reducer;