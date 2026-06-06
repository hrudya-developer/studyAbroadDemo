import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "overseas@Miak2023";

const COURSE_API =
  "https://overseas.technocitysolutions.com/public/api/getAllUniversityCoursesLatest";

const SEARCH_API =
  "https://overseas.technocitysolutions.com/public/api/searchResults";

const MAIN_COURSES_API =
  "https://overseas.technocitysolutions.com/public/api/getCoursebyMainUniversity";

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

const getResultsArray = (result) => {
  if (Array.isArray(result)) return result;
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.data?.data)) return result.data.data;
  if (Array.isArray(result?.searchresult)) return result.searchresult;
  if (Array.isArray(result?.searchresults)) return result.searchresults;
  if (Array.isArray(result?.course)) return result.course;
  if (Array.isArray(result?.courses)) return result.courses;
  if (Array.isArray(result?.main_courses)) return result.main_courses;
  if (Array.isArray(result?.maincourse)) return result.maincourse;
  if (Array.isArray(result?.result)) return result.result;
  if (Array.isArray(result?.results)) return result.results;

  return [];
};

const getCourseName = (item) =>
  item?.course ||
  item?.course_name ||
  item?.main_course ||
  item?.name ||
  item?.title ||
  "";

const normalizeText = (value) =>
  String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const HEALTH_KEYWORDS = [
  "mbbs",
  "medicine",
  "medical",
  "nursing",
  "health",
  "health care",
  "healthcare",
  "pharmacy",
  "dentistry",
  "physiotherapy",
  "biomedical",
];

const isHealthCareKeyword = (keyword) => {
  const normalizedKeyword = normalizeText(keyword);

  return HEALTH_KEYWORDS.some((item) =>
    normalizedKeyword.includes(normalizeText(item))
  );
};

const matchesId = (value, selectedId) => {
  if (!selectedId) return true;
  if (value === undefined || value === null || value === "") return false;

  return String(value) === String(selectedId);
};

const matchesKeyword = (item, keyword) => {
  if (!keyword) return true;

  const courseName = normalizeText(getCourseName(item));
  const searchKeyword = normalizeText(keyword);

  return (
    courseName.includes(searchKeyword) ||
    searchKeyword.includes(courseName) ||
    searchKeyword
      .split(" ")
      .filter(Boolean)
      .some((word) => courseName.includes(word))
  );
};

const filterResults = (results, filters = {}) => {
  return results.filter((item) => {
    const itemCountryId =
      item?.d_id || item?.country_id || item?.countryId || item?.destination_id;

    const itemUniversityId =
      item?.u_id || item?.university_id || item?.universityId;

    return (
      matchesId(itemCountryId, filters.countryId) &&
      matchesId(itemUniversityId, filters.universityId) &&
      matchesKeyword(item, filters.keyword)
    );
  });
};

const getCourseUniqueKey = (course) =>
  String(
    course?.id ||
      course?.course_id ||
      `${course?.c_id || ""}-${course?.u_id || course?.university_id || ""}-${
        normalizeText(getCourseName(course)) || ""
      }`
  );

const mergeUniqueCourses = (oldCourses = [], newCourses = []) => {
  const existingIds = new Set(oldCourses.map((item) => getCourseUniqueKey(item)));

  const uniqueNewCourses = newCourses.filter((item) => {
    const key = getCourseUniqueKey(item);

    if (!key || existingIds.has(key)) return false;

    existingIds.add(key);
    return true;
  });

  return [...oldCourses, ...uniqueNewCourses];
};

const fetchCoursesByCourseId = async ({
  uid,
  courseId,
  universityId,
  countryId,
  offset,
}) => {
  let allCourses = [];
  let raw = null;
  let courseImagePath = "";
  let nextOffset = offset;

  while (nextOffset !== null && nextOffset !== "") {
    const formData = new FormData();

    formData.append("api", API_KEY);
    formData.append("uid", String(uid ?? 0));
    formData.append("c_id", String(courseId || ""));
    formData.append("u_id", String(universityId || ""));
    formData.append("d_id", String(countryId || ""));
    formData.append("offset", String(nextOffset));

    const response = await fetch(COURSE_API, {
      method: "POST",
      body: formData,
    });

    const result = await parseApiResponse(response);
    raw = result;

    const courses = Array.isArray(result?.course) ? result.course : [];
    allCourses = mergeUniqueCourses(allCourses, courses);

    courseImagePath =
      result?.maincourse_image_path ||
      result?.course_image_path ||
      result?.courses_image_path ||
      result?.image_path ||
      "";

    const apiNextOffset = result?.nextoffset;

    nextOffset =
      apiNextOffset && String(apiNextOffset) !== "0" ? apiNextOffset : null;
  }

  return {
    courses: allCourses,
    raw,
    courseImagePath,
  };
};

const fetchMainCoursesByUniversity = async ({ uid, universityId }) => {
  if (!universityId) {
    return {
      mainCourses: [],
      raw: null,
    };
  }

  const formData = new FormData();

  formData.append("api", API_KEY);
  formData.append("u_id", String(universityId));
  formData.append("uid", String(uid ?? 0));

  const response = await fetch(MAIN_COURSES_API, {
    method: "POST",
    body: formData,
  });

  const result = await parseApiResponse(response);

  return {
    mainCourses: getResultsArray(result),
    raw: result,
  };
};

const findMainCourseIdFromKeyword = (mainCourses = [], keyword = "") => {
  const normalizedKeyword = normalizeText(keyword);

  const directMatch = mainCourses.find((item) => {
    const mainCourseName = normalizeText(getCourseName(item));

    return (
      mainCourseName.includes(normalizedKeyword) ||
      normalizedKeyword.includes(mainCourseName)
    );
  });

  if (directMatch?.c_id) return directMatch.c_id;

  if (isHealthCareKeyword(keyword)) {
    const healthCourse = mainCourses.find((item) => {
      const mainCourseName = normalizeText(getCourseName(item));

      return (
        mainCourseName.includes("health") ||
        mainCourseName.includes("medical") ||
        mainCourseName.includes("medicine")
      );
    });

    if (healthCourse?.c_id) return healthCourse.c_id;
  }

  return "";
};

export const fetchCourseSearchResults = createAsyncThunk(
  "courseSearch/fetchCourseSearchResults",
  async (
    {
      uid = 0,
      courseIds = [],
      courseId = "",
      universityId = "",
      countryId = "",
      offset = 0,
      keytype = "course",
      keyword = "",
      filters = {},
    },
    { rejectWithValue }
  ) => {
    try {
      let allCourses = [];
      let raw = null;
      let fallbackRaw = null;
      let mainCoursesRaw = null;
      let courseImagePath = "";

      let finalCourseIds = courseIds.length
        ? courseIds
        : courseId
        ? [courseId]
        : [];

      const shouldResolveMainCourse =
        universityId && keyword && (!courseId || isHealthCareKeyword(keyword));

      if (shouldResolveMainCourse) {
        const mainCourseResponse = await fetchMainCoursesByUniversity({
          uid,
          universityId,
        });

        mainCoursesRaw = mainCourseResponse.raw;

        const mappedMainCourseId = findMainCourseIdFromKeyword(
          mainCourseResponse.mainCourses,
          keyword
        );

        if (mappedMainCourseId) {
          finalCourseIds = [mappedMainCourseId];
        }
      }

      if (!finalCourseIds.length) {
        finalCourseIds = [""];
      }

      for (const id of finalCourseIds) {
        const response = await fetchCoursesByCourseId({
          uid,
          courseId: id,
          universityId,
          countryId,
          offset,
        });

        raw = response.raw;
        courseImagePath = response.courseImagePath;

        allCourses = mergeUniqueCourses(allCourses, response.courses);
      }

      if (keyword && allCourses.length > 0) {
        allCourses = allCourses.filter((item) => matchesKeyword(item, keyword));
      }

      if (keyword && allCourses.length === 0) {
        const searchFormData = new FormData();

        searchFormData.append("api", API_KEY);
        searchFormData.append("keytype", keytype);
        searchFormData.append("keyword", keyword);

        const searchResponse = await fetch(SEARCH_API, {
          method: "POST",
          body: searchFormData,
        });

        const searchResult = await parseApiResponse(searchResponse);
        fallbackRaw = searchResult;

        const searchCourses = getResultsArray(searchResult);

        const filteredSearchCourses = filterResults(searchCourses, {
          countryId,
          universityId,
          keyword,
        });

        allCourses = mergeUniqueCourses(allCourses, filteredSearchCourses);
      }

      return {
        keytype,
        keyword,
        filters: {
          countryId,
          universityId,
          courseId,
          resolvedCourseIds: finalCourseIds,
          ...filters,
        },
        results: allCourses,
        rawResults: allCourses,
        raw,
        fallbackRaw,
        mainCoursesRaw,
        courseImagePath,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const courseSearchSlice = createSlice({
  name: "courseSearch",
  initialState: {
    results: [],
    rawResults: [],
    rawData: null,
    fallbackRawData: null,
    mainCoursesRawData: null,
    courseImagePath: "",
    keytype: "course",
    keyword: "",
    filters: {
      countryId: "",
      universityId: "",
      courseId: "",
      resolvedCourseIds: [],
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearCourseSearchResults: (state) => {
      state.results = [];
      state.rawResults = [];
      state.rawData = null;
      state.fallbackRawData = null;
      state.mainCoursesRawData = null;
      state.courseImagePath = "";
      state.keytype = "course";
      state.keyword = "";
      state.filters = {
        countryId: "",
        universityId: "",
        courseId: "",
        resolvedCourseIds: [],
      };
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourseSearchResults.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.results = [];
        state.rawResults = [];
      })
      .addCase(fetchCourseSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.rawResults = action.payload.rawResults;
        state.rawData = action.payload.raw;
        state.fallbackRawData = action.payload.fallbackRaw;
        state.mainCoursesRawData = action.payload.mainCoursesRaw;
        state.courseImagePath = action.payload.courseImagePath;
        state.keytype = action.payload.keytype;
        state.keyword = action.payload.keyword;
        state.filters = action.payload.filters;
      })
      .addCase(fetchCourseSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.results = [];
        state.rawResults = [];
        state.error = action.payload || "Failed to fetch search results";
      });
  },
});

export const { clearCourseSearchResults } = courseSearchSlice.actions;
export default courseSearchSlice.reducer;