import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_KEY = "overseas@Miak2023";

const COURSE_API =
  "https://overseas.technocitysolutions.com/public/api/getAllUniversityCoursesLatest";

const SEARCH_API =
  "https://overseas.technocitysolutions.com/public/api/searchResults";

const COURSE_DETAIL_API =
  "https://overseas.technocitysolutions.com/public/api/getCoursedetails";

const normalize = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const uniqueCourses = (courses = []) => {
  const seen = new Set();

  return courses.filter((item, index) => {
    const key = String(
      item?.id ||
        item?.course_id ||
        item?.uc_id ||
        `${item?.course || ""}-${item?.university || ""}-${index}`
    );

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
};

const uniqueSuggestions = (items = []) => {
  const seen = new Set();

  return items.filter((item) => {
    const key = `${item.type}-${item.id}-${item.label}`;

    if (seen.has(key)) return false;

    seen.add(key);
    return true;
  });
};

const getSearchList = (result, keytype) => {
  if (keytype === "course") return Array.isArray(result?.course) ? result.course : [];
  if (keytype === "university")
    return Array.isArray(result?.university) ? result.university : [];

  return [];
};

const matchesKeyword = (item, keyword) => {
  if (!keyword?.trim()) return true;

  const search = normalize(keyword);

  return [
    item?.course,
    item?.level,
    item?.duration,
    item?.entryrequirement,
    item?.remarks,
    item?.intakes,
    item?.deadline,
    item?.fees,
    item?.currency,
    item?.ielts,
    item?.ieltsless,
    item?.toefl,
    item?.toeflless,
    item?.pte,
    item?.name,
    item?.country,
    item?.university,
    item?.location,
  ]
    .filter(Boolean)
    .some((value) => normalize(value).includes(search));
};

const matchesFilters = ({
  item,
  countryId,
  universityId,
  courseId,
  intake,
  levels,
}) => {
  const countryMatch = countryId
    ? String(item?.d_id || item?.country_id || "") === String(countryId)
    : true;

  const universityMatch = universityId
    ? String(item?.u_id || item?.university_id || "") === String(universityId)
    : true;

  const courseMatch = courseId
    ? String(item?.c_id || item?.course_id || item?.main_course_id || "") ===
      String(courseId)
    : true;

  const intakeMatch = intake
    ? String(item?.intakes || "")
        .toLowerCase()
        .includes(String(intake).toLowerCase())
    : true;

  const levelMatch =
    Array.isArray(levels) && levels.length > 0
      ? levels.some((level) =>
          String(item?.level || "")
            .toLowerCase()
            .includes(String(level).toLowerCase())
        )
      : true;

  return (
    countryMatch &&
    universityMatch &&
    courseMatch &&
    intakeMatch &&
    levelMatch
  );
};

const searchItems = async (keyword, signal) => {
  const search = String(keyword || "").trim();

  if (!search) return [];

  const keytypes = ["course", "university"];

  const responses = await Promise.all(
    keytypes.map(async (keytype) => {
      const formData = new FormData();

      formData.append("api", API_KEY);
      formData.append("keytype", keytype);
      formData.append("keyword", search);

      const response = await fetch(SEARCH_API, {
        method: "POST",
        body: formData,
        signal,
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("Too many requests. Please wait and try again.");
        }

        return [];
      }

      const result = await response.json();
      const list = getSearchList(result, keytype);

     return list
  .map((item) => {
    if (keytype === "course") {
      return {
        id: item?.id || item?.course_id || item?.c_id,
        type: "course",
        label: item?.course || item?.course_name || item?.main_course || "",
        university: item?.university || item?.university_name || "",
       country: item?.country || item?.destination || item?.d_name || item?.country_name || "",
logo: item?.logo || item?.image || item?.university_logo || "",
      };
    }

   return {
  id: item?.id || item?.u_id || item?.university_id,
  type: "university",

  label:
    item?.university ||
    item?.name ||
    item?.u_name ||
    "",

  university:
    item?.university ||
    item?.name ||
    item?.u_name ||
    "",

  country:
    item?.country ||
    item?.destination ||
    item?.d_name ||
    item?.country_name ||
    "",

  logo:
    item?.logo ||
    item?.image ||
    item?.university_logo ||
    item?.university_logo_path ||
    "",

  imagePath:
    item?.image_path ||
    item?.universities_image_path ||
    item?.university_image_path ||
    "",
};
  })
  .filter((item) => item.id && item.label);
    })
  );

  return uniqueSuggestions(responses.flat());
};

const fetchCourseDetails = async ({ uid, id, signal }) => {
  const formData = new FormData();

  formData.append("api", API_KEY);
  formData.append("uid", String(uid ?? 0));
  formData.append("id", String(id));

  const response = await fetch(COURSE_DETAIL_API, {
    method: "POST",
    body: formData,
    signal,
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Too many requests. Please wait and try again.");
    }

    throw new Error("Failed to fetch course details");
  }

  const result = await response.json();

  return {
    courses: Array.isArray(result?.course) ? result.course : [],
    raw: result,
    nextOffset: null,
    imagePath:
      result?.universities_image_path ||
      result?.maincourse_image_path ||
      result?.image_path ||
      "",
  };
};

const fetchCoursePage = async ({
  uid,
  universityId = "",
  courseId = "",
  offset = 0,
  signal,
}) => {
  const formData = new FormData();

  formData.append("api", API_KEY);
  formData.append("uid", String(uid ?? 0));
  formData.append("u_id", String(universityId || ""));
  formData.append("c_id", String(courseId || ""));
  formData.append("offset", String(offset || 0));

  const response = await fetch(COURSE_API, {
    method: "POST",
    body: formData,
    signal,
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error("Too many requests. Please wait and try again.");
    }

    throw new Error("Failed to fetch courses");
  }

  const result = await response.json();

  return {
    courses: Array.isArray(result?.course) ? result.course : [],
    raw: result,
    nextOffset:
      result?.nextoffset && String(result.nextoffset) !== "0"
        ? result.nextoffset
        : null,
    imagePath:
      result?.universities_image_path ||
      result?.university_image_path ||
      result?.maincourse_image_path ||
      result?.course_image_path ||
      result?.image_path ||
      "",
  };
};

export const fetchFindCourseSuggestions = createAsyncThunk(
  "findCourse/fetchFindCourseSuggestions",
  async (keyword, { rejectWithValue, signal }) => {
    try {
      return await searchItems(keyword, signal);
    } catch (error) {
      if (error?.name === "AbortError") {
        return rejectWithValue("Request cancelled");
      }

      return rejectWithValue(error.message || "Failed to fetch suggestions");
    }
  },
  {
    condition: (keyword) => {
      const search = String(keyword || "").trim();
      return search.length >= 2;
    },
  }
);

export const fetchFindCourseResults = createAsyncThunk(
  "findCourse/fetchFindCourseResults",
  async (
    {
      uid = 0,
      countryId = "",
      universityId = "",
      courseId = "",
      keyword = "",
      selectedType = "",
      selectedId = "",
      intake = "",
      levels = [],
      offset = 0,
      append = false,
    },
    { rejectWithValue, signal }
  ) => {
    try {
      let response;

      if (selectedType === "course" && selectedId) {
        response = await fetchCourseDetails({
          uid,
          id: selectedId,
          signal,
        });
      } else {
        response = await fetchCoursePage({
          uid,
          universityId:
            selectedType === "university" && selectedId
              ? selectedId
              : universityId,
          courseId,
          offset,
          signal,
        });
      }

      let courses = uniqueCourses(response.courses);

      courses = courses.filter((item) =>
        matchesFilters({
          item,
          countryId,
          universityId:
            selectedType === "university" && selectedId
              ? selectedId
              : universityId,
          courseId,
          intake,
          levels,
        })
      );

      if (keyword?.trim() && !selectedId) {
        courses = courses.filter((item) => matchesKeyword(item, keyword));
      }

      return {
        courses,
        raw: response.raw,
        imagePath: response.imagePath,
        nextOffset: response.nextOffset,
        append,
      };
    } catch (error) {
      if (error?.name === "AbortError") {
        return rejectWithValue("Request cancelled");
      }

      return rejectWithValue(error.message || "Failed to fetch courses");
    }
  }
);

const initialState = {
  results: [],
  suggestions: [],
  rawData: null,
  imagePath: "",
  loading: false,
  loadMoreLoading: false,
  suggestionsLoading: false,
  error: null,
  suggestionsError: null,
  nextOffset: null,
  currentPage: 1,
  latestSuggestionsRequestId: null,
  latestResultsRequestId: null,
  suggestionCache: {},
};

const findCourseSlice = createSlice({
  name: "findCourse",
  initialState,
  reducers: {
    clearFindCourseResults: (state) => {
      state.results = [];
      state.rawData = null;
      state.imagePath = "";
      state.loading = false;
      state.loadMoreLoading = false;
      state.error = null;
      state.nextOffset = null;
      state.currentPage = 1;
      state.latestResultsRequestId = null;
    },

    clearFindCourseSuggestions: (state) => {
      state.suggestions = [];
      state.suggestionsLoading = false;
      state.suggestionsError = null;
      state.latestSuggestionsRequestId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFindCourseSuggestions.pending, (state, action) => {
        const search = String(action.meta.arg || "").trim().toLowerCase();

        state.latestSuggestionsRequestId = action.meta.requestId;
        state.suggestionsError = null;

        if (state.suggestionCache[search]) {
          state.suggestions = state.suggestionCache[search];
          state.suggestionsLoading = false;
          return;
        }

        state.suggestionsLoading = true;
      })

      .addCase(fetchFindCourseSuggestions.fulfilled, (state, action) => {
        if (state.latestSuggestionsRequestId !== action.meta.requestId) return;

        const search = String(action.meta.arg || "").trim().toLowerCase();

        state.suggestionsLoading = false;
        state.suggestions = action.payload;
        state.suggestionCache[search] = action.payload;
      })

      .addCase(fetchFindCourseSuggestions.rejected, (state, action) => {
        if (state.latestSuggestionsRequestId !== action.meta.requestId) return;

        state.suggestionsLoading = false;

        if (action.payload !== "Request cancelled") {
          state.suggestions = [];
          state.suggestionsError =
            action.payload || "Failed to fetch suggestions";
        }
      })

      .addCase(fetchFindCourseResults.pending, (state, action) => {
        const append = Boolean(action.meta.arg?.append);

        state.latestResultsRequestId = action.meta.requestId;
        state.error = null;

        if (append) {
          state.loadMoreLoading = true;
        } else {
          state.loading = true;
          state.results = [];
          state.nextOffset = null;
          state.currentPage = 1;
        }
      })

      .addCase(fetchFindCourseResults.fulfilled, (state, action) => {
        if (state.latestResultsRequestId !== action.meta.requestId) return;

        state.loading = false;
        state.loadMoreLoading = false;

        if (action.payload.append) {
          state.results = uniqueCourses([
            ...state.results,
            ...action.payload.courses,
          ]);
        } else {
          state.results = action.payload.courses;
          state.currentPage = 1;
        }

        state.rawData = action.payload.raw;
        state.imagePath = action.payload.imagePath;
        state.nextOffset = action.payload.nextOffset;
      })

      .addCase(fetchFindCourseResults.rejected, (state, action) => {
        if (state.latestResultsRequestId !== action.meta.requestId) return;

        state.loading = false;
        state.loadMoreLoading = false;

        if (action.payload === "Request cancelled") return;

        state.error = action.payload || "Failed to fetch courses";
      });
  },
});

export const { clearFindCourseResults, clearFindCourseSuggestions } =
  findCourseSlice.actions;

export default findCourseSlice.reducer;