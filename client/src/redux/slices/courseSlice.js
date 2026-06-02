import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "overseas@Miak2023";

const parseApiResponse = async (response) => {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      response.status === 429
        ? "Too many requests. Please wait and try again."
        : `API error: ${response.status}`
    );
  }
};

export const fetchPopularCourses = createAsyncThunk(
  "courseData/fetchPopularCourses",
  async (uid, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/getMainCourses",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ api: API_KEY, uid: uid ?? 0 }),
        }
      );

      const result = await parseApiResponse(response);

      const popularCourses = Array.isArray(result?.maincourse)
        ? result.maincourse
        : Array.isArray(result?.courses)
        ? result.courses
        : Array.isArray(result?.data)
        ? result.data
        : [];

      return {
        popularCourses,
        courseImagePath:
          result?.maincourse_image_path ||
          result?.course_image_path ||
          result?.courses_image_path ||
          result?.image_path ||
          "",
        raw: result,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUniversityMainCourses = createAsyncThunk(
  "courseData/fetchUniversityMainCourses",
  async (universityId, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("api", API_KEY);
      formData.append("u_id", String(universityId));
      formData.append("uid", "0");

      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/getCoursebyMainUniversity",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await parseApiResponse(response);

      return {
        universityMainCourses: Array.isArray(result?.main_courses)
          ? result.main_courses
          : [],
        courseImagePath: result?.maincourse_image_path || "",
        raw: result,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUniversityCourses = createAsyncThunk(
  "courseData/fetchUniversityCourses",
  async (
    { uid, universityId, courseIds = [], courseId, offset = 0 },
    { rejectWithValue }
  ) => {
    try {
      const ids = courseIds.length ? courseIds : courseId ? [courseId] : [];

      let allCourses = [];
      let raw = null;
      let courseImagePath = "";

      for (const id of ids) {
        const formData = new FormData();

        formData.append("api", API_KEY);
        formData.append("uid", String(uid ?? 0));
        formData.append("c_id", String(id));
        formData.append("u_id", String(universityId));
        formData.append("offset", String(offset));

        const response = await fetch(
          "https://overseas.technocitysolutions.com/public/api/getAllUniversityCoursesLatest",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await parseApiResponse(response);
        raw = result;

        const courses = Array.isArray(result?.course) ? result.course : [];

        const existingIds = new Set(allCourses.map((item) => String(item.id)));
        const newCourses = courses.filter(
          (item) => !existingIds.has(String(item.id))
        );

        allCourses = [...allCourses, ...newCourses];

        courseImagePath =
          result?.maincourse_image_path ||
          result?.course_image_path ||
          result?.courses_image_path ||
          result?.image_path ||
          "";
      }

      return {
        universityId,
        universityCourses: allCourses,
        nextOffset: null,
        courseImagePath,
        raw,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchAllUniversityCoursesLatest = createAsyncThunk(
  "courseData/fetchAllUniversityCoursesLatest",
  async (
    { uid, courseId = "", universityId = "", offset = 0 },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      formData.append("api", API_KEY);
      formData.append("uid", String(uid ?? 0));
      formData.append("c_id", String(courseId));
      formData.append("u_id", String(universityId));
      formData.append("offset", String(offset));

      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/getAllUniversityCoursesLatest",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await parseApiResponse(response);

      return {
        courses: Array.isArray(result?.course) ? result.course : [],
        nextOffset: result?.nextoffset || null,
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
  universityMainCourses: [],
  courseImagePath: "",

  universityCourses: [],
  universityCoursesById: {},
  universityCoursesRawData: null,
  universityCoursesNextOffset: null,

  allUniversityCourses: [],
  allUniversityCoursesRawData: null,
  allUniversityCoursesNextOffset: null,

  loading: false,
  universityMainCoursesLoading: false,
  universityCoursesLoading: false,
  allUniversityCoursesLoading: false,

  error: null,
  universityMainCoursesError: null,
  universityCoursesError: null,
  allUniversityCoursesError: null,
};

const courseSlice = createSlice({
  name: "courseData",
  initialState,

  reducers: {
    clearUniversityCourses: (state) => {
      state.universityCourses = [];
      state.universityCoursesById = {};
      state.universityCoursesRawData = null;
      state.universityCoursesNextOffset = null;
      state.universityCoursesError = null;
      state.universityCoursesLoading = false;
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

      .addCase(fetchUniversityMainCourses.pending, (state) => {
        state.universityMainCoursesLoading = true;
        state.universityMainCoursesError = null;
      })
      .addCase(fetchUniversityMainCourses.fulfilled, (state, action) => {
        state.universityMainCoursesLoading = false;
        state.universityMainCourses = action.payload.universityMainCourses;
        state.courseImagePath = action.payload.courseImagePath;
      })
      .addCase(fetchUniversityMainCourses.rejected, (state, action) => {
        state.universityMainCoursesLoading = false;
        state.universityMainCoursesError =
          action.payload || "Failed to fetch university main courses";
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
        state.universityCoursesNextOffset = null;
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