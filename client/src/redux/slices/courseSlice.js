import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "overseas@Miak2023";

const parseApiResponse = async (response) => {
  const text = await response.text();

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Too many requests. Please wait and try again.");
    }

    throw new Error(`API error: ${response.status}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Invalid API response.");
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
<<<<<<< HEAD
  async (
    { uid, courseIds = [], courseId = "", universityId = "", offset = 0 },
    { rejectWithValue }
  ) => {
    try {
      const ids = courseIds.length ? courseIds : courseId ? [courseId] : [""];
=======

  async (
     
     { uid, courseIds = [], courseId = "", universityId = "", offset = 0 },



  { rejectWithValue }
  ) => {
    try {
     const ids = courseIds.length ? courseIds : courseId ? [courseId] : [""];
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e

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

<<<<<<< HEAD
=======

//old - it was working 

// export const fetchAllUniversityCoursesLatest = createAsyncThunk(
//   "courseData/fetchAllUniversityCoursesLatest",
//   async (
//     { uid, courseId = "", universityId = "", offset = 0 },
//     { rejectWithValue }
//   ) => {
//     try {
//       const formData = new FormData();

//       formData.append("api", API_KEY);
//       formData.append("uid", String(uid ?? 0));
//       formData.append("c_id", String(courseId));
//       formData.append("u_id", String(universityId));
//       formData.append("offset", String(offset));

//       const response = await fetch(
//         "https://overseas.technocitysolutions.com/public/api/getAllUniversityCoursesLatest",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const result = await parseApiResponse(response);

//       return {
//         courses: Array.isArray(result?.course) ? result.course : [],
//         nextOffset: result?.nextoffset || null,
//         courseImagePath: result?.maincourse_image_path || "",
//         raw: result,
//       };
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );

>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
export const fetchAllUniversityCoursesLatest = createAsyncThunk(
  "courseData/fetchAllUniversityCoursesLatest",
  async (
    { uid, courseIds = [], courseId = "", universityId = "", offset = 0 },
    { rejectWithValue }
  ) => {
    try {
      let allCourses = [];
      let raw = null;
      let courseImagePath = "";

      const ids = courseIds.length ? courseIds : courseId ? [courseId] : [""];

      for (const id of ids) {
        let nextOffset = offset;

        while (nextOffset !== null && nextOffset !== "") {
          const formData = new FormData();

          formData.append("api", API_KEY);
          formData.append("uid", String(uid ?? 0));
          formData.append("c_id", String(id));
          formData.append("u_id", String(universityId));
          formData.append("offset", String(nextOffset));

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
          allCourses = [...allCourses, ...courses];

          courseImagePath =
            result?.maincourse_image_path ||
            result?.course_image_path ||
            result?.courses_image_path ||
            result?.image_path ||
            "";

          const apiNextOffset = result?.nextoffset;

          nextOffset =
            apiNextOffset && String(apiNextOffset) !== "0"
              ? apiNextOffset
              : null;
        }
      }

      return {
        courses: allCourses,
        nextOffset: null,
        courseImagePath,
        raw,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

<<<<<<< HEAD
export const applyCourse = createAsyncThunk(
  "courseData/applyCourse",
  async ({ uid, courseId, course, university }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("api", API_KEY);
      formData.append("uid", String(uid ?? 0));
      formData.append("c_id", String(courseId || ""));

      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/applyCourse",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await parseApiResponse(response);

      if (result?.status === false) {
        throw new Error(
          result?.msg || result?.message || "Failed to apply course"
        );
      }

      return {
        result,
        courseId,
        course,
        university,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to apply course");
    }
  }
);

export const fetchAppliedCourseDetails = createAsyncThunk(
  "courseData/fetchAppliedCourseDetails",
  async ({ uid, ids = [] }, { rejectWithValue }) => {
    try {
      const courses = [];

      for (const c_id of ids) {
        const formData = new FormData();

        formData.append("api", API_KEY);
        formData.append("uid", String(uid ?? 0));
        formData.append("c_id", String(c_id));
        formData.append("id", String(c_id));

        const response = await fetch(
          "https://overseas.technocitysolutions.com/public/api/getCoursedetails",
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await parseApiResponse(response);

        const course =
          result?.course?.[0] ||
          result?.data?.[0] ||
          result?.details?.[0] ||
          result?.course ||
          result?.data ||
          result;

        if (course) {
          courses.push({
            ...course,
            id: c_id,
            c_id,
          });
        }
      }

      return courses;
    } catch (error) {
      return rejectWithValue(error.message || "Failed to fetch course details");
    }
  }
);

export const fetchUniversityMainCoursesByUid = createAsyncThunk(
  "courseData/fetchUniversityMainCoursesByUid",
  async ({ universityId, uid }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("api", API_KEY);
      formData.append("u_id", String(universityId));
      formData.append("uid", String(uid ?? 0));

      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/getCoursebyMainUniversity",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await parseApiResponse(response);

      return {
        universityMainCourses:
          result?.main_courses ||
          result?.maincourse ||
          result?.courses ||
          result?.data ||
          [],
        courseImagePath: result?.maincourse_image_path || "",
        raw: result,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const fetchCourseAppliedStatus = createAsyncThunk(
  "courseData/fetchCourseAppliedStatus",
  async ({ uid, courseId }, { rejectWithValue }) => {
    try {
      const formData = new FormData();

      formData.append("api", API_KEY);
      formData.append("uid", String(uid ?? 0));
      formData.append("id", String(courseId));

      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/getCoursedetails",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await parseApiResponse(response);

      const course =
        result?.course?.[0] ||
        result?.data?.[0] ||
        result?.details?.[0] ||
        result?.course ||
        result?.data ||
        result;

      const appliedValue =
        course?.applied ??
        course?.is_applied ??
        course?.application_status ??
        result?.applied;

      const applied =
        appliedValue === true ||
        appliedValue === "true" ||
        appliedValue === 1 ||
        appliedValue === "1" ||
        String(appliedValue).toLowerCase() === "applied";

      return {
        courseId: String(courseId),
        applied,
      };
    } catch (error) {
      return rejectWithValue(error.message || "Failed to check applied status");
    }
  }
);
=======

>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
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
<<<<<<< HEAD

  courseApplyLoading: false,
  courseApplyError: null,
  courseApplyResult: null,

  appliedCourseIds: [],
  appliedCourses: [],
  appliedCourseDetailsLoading: false,
  appliedCourseDetailsError: null,

  appliedStatusByCourseId: {},
  
=======
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
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
<<<<<<< HEAD

    clearAppliedCourses: (state) => {
      state.appliedCourseIds = [];
      state.appliedCourses = [];
      state.appliedCourseDetailsError = null;
      state.appliedCourseDetailsLoading = false;
    },
=======
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
  },

  extraReducers: (builder) => {
    builder
<<<<<<< HEAD

.addCase(fetchCourseAppliedStatus.fulfilled, (state, action) => {
  const { courseId, applied } = action.payload;

  state.appliedStatusByCourseId[courseId] = applied;

  if (applied && !state.appliedCourseIds.includes(courseId)) {
    state.appliedCourseIds.push(courseId);
  }
})

.addCase(applyCourse.fulfilled, (state, action) => {
  state.courseApplyLoading = false;
  state.courseApplyResult = action.payload.result;

  const appliedId = String(action.payload.courseId);
  const appliedCourse = action.payload.course;
  const selectedUniversity = action.payload.university;

  state.appliedStatusByCourseId[appliedId] = true;

  if (appliedId && !state.appliedCourseIds.includes(appliedId)) {
    state.appliedCourseIds.push(appliedId);
  }

  state.universityCourses = state.universityCourses.map((item) => {
    const itemId = String(
      item?.id || item?.c_id || item?.course_id || item?.uc_id || item?.cid || ""
    );

    return itemId === appliedId ? { ...item, applied: true } : item;
  });

  state.allUniversityCourses = state.allUniversityCourses.map((item) => {
    const itemId = String(
      item?.id || item?.c_id || item?.course_id || item?.uc_id || item?.cid || ""
    );

    return itemId === appliedId ? { ...item, applied: true } : item;
  });

  if (
    appliedCourse &&
    !state.appliedCourses.some(
      (item) =>
        String(item.id || item.c_id || item.course_id || item.uc_id) ===
        appliedId
    )
  ) {
    state.appliedCourses.push({
      ...appliedCourse,
      id: appliedId,
      c_id: appliedId,
      applied: true,
      university:
        selectedUniversity?.name ||
        selectedUniversity?.university ||
        appliedCourse?.university ||
        appliedCourse?.university_name ||
        "N/A",
      applied_date: new Date().toLocaleDateString(),
    });
  }
})
=======
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
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
<<<<<<< HEAD
      })

      .addCase(applyCourse.pending, (state) => {
        state.courseApplyLoading = true;
        state.courseApplyError = null;
        state.courseApplyResult = null;
      })

      .addCase(applyCourse.rejected, (state, action) => {
        state.courseApplyLoading = false;
        state.courseApplyError = action.payload || "Failed to apply course";
      })

      .addCase(fetchAppliedCourseDetails.pending, (state) => {
        state.appliedCourseDetailsLoading = true;
        state.appliedCourseDetailsError = null;
      })
      .addCase(fetchAppliedCourseDetails.fulfilled, (state, action) => {
        state.appliedCourseDetailsLoading = false;
        state.appliedCourses = action.payload;
      })
      .addCase(fetchAppliedCourseDetails.rejected, (state, action) => {
        state.appliedCourseDetailsLoading = false;
        state.appliedCourseDetailsError =
          action.payload || "Failed to fetch applied course details";
      })
      .addCase(fetchUniversityMainCoursesByUid.pending, (state) => {
  state.universityMainCoursesLoading = true;
  state.universityMainCoursesError = null;
})
.addCase(fetchUniversityMainCoursesByUid.fulfilled, (state, action) => {
  state.universityMainCoursesLoading = false;
  state.universityMainCourses = action.payload.universityMainCourses;
  state.courseImagePath = action.payload.courseImagePath;
})
.addCase(fetchUniversityMainCoursesByUid.rejected, (state, action) => {
  state.universityMainCoursesLoading = false;
  state.universityMainCoursesError =
    action.payload || "Failed to fetch university main courses";
})
  },
});

export const {
  clearUniversityCourses,
  clearAllUniversityCourses,
  clearAppliedCourses,
} = courseSlice.actions;
=======
      });
  },
});

export const { clearUniversityCourses, clearAllUniversityCourses } =
  courseSlice.actions;
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e

export default courseSlice.reducer;