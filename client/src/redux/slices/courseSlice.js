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
            api: API_KEY,
            uid,
          }),
        }
      );

      const result = await response.json();

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

export const fetchUniversityCourses = createAsyncThunk(
  "courseData/fetchUniversityCourses",
  async ({ uid, universityId, countryId, offset = 0 }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("api", API_KEY);
      formData.append("u_id", universityId);
      formData.append("c_id", countryId);
      formData.append("offset", offset);
      formData.append("uid", uid);

      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/getAllUniversityCoursesLatest",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
  
      

      return {
        universityId,
        universityCourses: Array.isArray(result?.course) ? result.course : [],
        nextOffset: result?.nextoffset ?? null,
        courseImagePath: result?.maincourse_image_path || "",
        raw: result,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
const initialState = {
  popularCourses: [],
  courseImagePath: "",

  universityCourses: [],
  universityCoursesById: {},
  universityCoursesRawData: null,

  loading: false,
  universityCoursesLoading: false,

  error: null,
  universityCoursesError: null,
};

const courseSlice = createSlice({
  name: "courseData",
  initialState,

  reducers: {
    clearUniversityCourses: (state) => {
      state.universityCourses = [];
      state.universityCoursesRawData = null;
      state.universityCoursesError = null;
    },
  },

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
      })

      .addCase(fetchUniversityCourses.pending, (state) => {
        state.universityCoursesLoading = true;
        state.universityCoursesError = null;
      })

.addCase(fetchUniversityCourses.fulfilled, (state, action) => {
  state.universityCoursesLoading = false;

  const { universityId, universityCourses, courseImagePath, raw } =
    action.payload;

  state.universityCourses = universityCourses;
  state.universityCoursesById[universityId] = universityCourses;
  state.courseImagePath = courseImagePath;
  state.universityCoursesRawData = raw;
})

      .addCase(fetchUniversityCourses.rejected, (state, action) => {
        state.universityCoursesLoading = false;
        state.universityCoursesError =
          action.payload || "Failed to fetch university courses";
      });
  },
});

export const { clearUniversityCourses } = courseSlice.actions;

export default courseSlice.reducer;