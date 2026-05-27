import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "overseas@Miak2023";

export const fetchPopularCourses = createAsyncThunk(
  "courseData/fetchPopularCourses",
  async (uid, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/getMainCourses",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            api: "overseas@Miak2023",
            uid,
          }),
        }
      );

      const result = await response.json();
      console.log("Main Courses:", result);

      const courseImagePath =
        result?.maincourse_image_path ||
        result?.course_image_path ||
        result?.courses_image_path ||
        result?.image_path ||
        "";

      const popularCourses = Array.isArray(result?.maincourse)
        ? result.maincourse
        : Array.isArray(result?.courses)
        ? result.courses
        : Array.isArray(result?.data)
        ? result.data
        : [];

      return {
        popularCourses,
        courseImagePath,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  popularCourses: [],
  courseImagePath: "",
  loading: false,
  error: null,
};

const courseSlice = createSlice({
  name: "courseData",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.popularCourses = action.payload.popularCourses;
        state.courseImagePath = action.payload.courseImagePath;
      })
      .addCase(fetchPopularCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch courses";
      });
  },
});

export default courseSlice.reducer;