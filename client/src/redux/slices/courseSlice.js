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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ api: API_KEY, uid }),
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

      return { popularCourses, courseImagePath };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUniversityCourses = createAsyncThunk(
  "courseData/fetchUniversityCourses",
  async ({ uid = 0, universityId, countryId, offset = 0 }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("api", API_KEY);
      formData.append("uid", uid);
      formData.append("u_id", universityId);
      formData.append("c_id", countryId);
      formData.append("offset", offset);

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

export const fetchAllUniversityCoursesLatest = createAsyncThunk(
  "courseData/fetchAllUniversityCoursesLatest",
  async (
    { uid = 0, courseId = "", universityId = "", offset = 0 },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      formData.append("api", API_KEY);
      formData.append("uid", uid);
      formData.append("c_id", courseId);
      formData.append("u_id", universityId);
      formData.append("offset", offset);

      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/getAllUniversityCoursesLatest",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      return {
        courses: Array.isArray(result?.course) ? result.course : [],
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

  allUniversityCourses: [],
  allUniversityCoursesRawData: null,
  allUniversityCoursesNextOffset: null,

  loading: false,
  universityCoursesLoading: false,
  allUniversityCoursesLoading: false,

  error: null,
  universityCoursesError: null,
  allUniversityCoursesError: null,
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

    clearAllUniversityCourses: (state) => {
      state.allUniversityCourses = [];
      state.allUniversityCoursesRawData = null;
      state.allUniversityCoursesNextOffset = null;
      state.allUniversityCoursesError = null;
      state.allUniversityCoursesLoading = false;
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
        state.universityCoursesById[universityId || "all"] = universityCourses;
        state.courseImagePath = courseImagePath;
        state.universityCoursesRawData = raw;
      })

      .addCase(fetchUniversityCourses.rejected, (state, action) => {
        state.universityCoursesLoading = false;
        state.universityCoursesError =
          action.payload || "Failed to fetch university courses";
      })

      .addCase(fetchAllUniversityCoursesLatest.pending, (state) => {
        state.allUniversityCoursesLoading = true;
        state.allUniversityCoursesError = null;
      })

      .addCase(fetchAllUniversityCoursesLatest.fulfilled, (state, action) => {
        state.allUniversityCoursesLoading = false;

        const oldCourses = state.allUniversityCourses || [];
        const newCourses = action.payload.courses || [];
        const offset = Number(action.meta.arg.offset || 0);

        state.allUniversityCourses =
          offset === 0 ? newCourses : [...oldCourses, ...newCourses];

        state.allUniversityCoursesNextOffset = action.payload.nextOffset;
        state.courseImagePath = action.payload.courseImagePath;
        state.allUniversityCoursesRawData = action.payload.raw;
      })

      .addCase(fetchAllUniversityCoursesLatest.rejected, (state, action) => {
        state.allUniversityCoursesLoading = false;
        state.allUniversityCoursesError =
          action.payload || "Failed to fetch all university courses";
      });
  },
});

export const { clearUniversityCourses, clearAllUniversityCourses } =
  courseSlice.actions;

export default courseSlice.reducer;