import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_KEY = "overseas@Miak2023";
const SEARCH_API =
  "https://overseas.technocitysolutions.com/public/api/searchResults";

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
  if (Array.isArray(result?.university)) return result.university;
  if (Array.isArray(result?.universities)) return result.universities;
  if (Array.isArray(result?.country)) return result.country;
  if (Array.isArray(result?.countries)) return result.countries;
  if (Array.isArray(result?.result)) return result.result;
  if (Array.isArray(result?.results)) return result.results;

  return [];
};

const matchesId = (value, selectedId) => {
  if (!selectedId) return true;
  if (value === undefined || value === null || value === "") return false;

  return String(value) === String(selectedId);
};

const filterResults = (results, filters = {}) => {
  return results.filter((item) => {
    const itemCountryId = item?.d_id || item?.country_id || item?.countryId;
    const itemUniversityId =
      item?.u_id || item?.university_id || item?.universityId;
    const itemCourseId =
      item?.c_id || item?.course_id || item?.main_course_id || item?.id;

    return (
      matchesId(itemCountryId, filters.countryId) &&
      matchesId(itemUniversityId, filters.universityId) &&
      matchesId(itemCourseId, filters.courseId)
    );
  });
};

export const fetchCourseSearchResults = createAsyncThunk(
  "courseSearch/fetchCourseSearchResults",
  async (
    {
      keytype = "course",
      keyword = "",
      filters = {
        countryId: "",
        universityId: "",
        courseId: "",
      },
    },
    { rejectWithValue }
  ) => {
    try {
      const formData = new FormData();

      formData.append("api", API_KEY);
      formData.append("keytype", keytype);
      formData.append("keyword", keyword);

      const response = await fetch(SEARCH_API, {
        method: "POST",
        body: formData,
      });

      const result = await parseApiResponse(response);
      const apiResults = getResultsArray(result);
      const filteredResults = filterResults(apiResults, filters);

      return {
        keytype,
        keyword,
        filters,
        results: filteredResults,
        rawResults: apiResults,
        raw: result,
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
    keytype: "course",
    keyword: "",
    filters: {
      countryId: "",
      universityId: "",
      courseId: "",
    },
    loading: false,
    error: null,
  },
  reducers: {
    clearCourseSearchResults: (state) => {
      state.results = [];
      state.rawResults = [];
      state.rawData = null;
      state.keytype = "course";
      state.keyword = "";
      state.filters = {
        countryId: "",
        universityId: "",
        courseId: "",
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
      })
      .addCase(fetchCourseSearchResults.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload.results;
        state.rawResults = action.payload.rawResults;
        state.rawData = action.payload.raw;
        state.keytype = action.payload.keytype;
        state.keyword = action.payload.keyword;
        state.filters = action.payload.filters;
      })
      .addCase(fetchCourseSearchResults.rejected, (state, action) => {
        state.loading = false;
        state.results = [];
        state.error = action.payload || "Failed to fetch search results";
      });
  },
});

export const { clearCourseSearchResults } = courseSearchSlice.actions;
export default courseSearchSlice.reducer;