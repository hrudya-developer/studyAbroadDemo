import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  RotateCcw,
  MapPin,
  Landmark,
  Star,
  BookOpen,
} from "lucide-react";

import { fetchCountries } from "../redux/slices/countrySlice";
import {
  fetchUniversitiesByCountry,
  fetchUniversityDetails,
  clearUniversityDetails,
} from "../redux/slices/universitySlice";

import {
  fetchPopularCourses,
  fetchUniversityMainCoursesByUid,
} from "../redux/slices/courseSlice";

import Pagination from "../components/Pagination";
import FilterSelect from "../pages/SDBFilterSelect";
import SDBFindCourseCard from "../pages/SDBFindCourseCard";
import SDBPreviewCourses from "./SDBPreviewCourses";

import {
  fetchFindCourseResults,
  fetchFindCourseSuggestions,
  clearFindCourseResults,
  clearFindCourseSuggestions,
} from "../redux/slices/findCourseDBSlice";

const ITEMS_PER_PAGE = 6;
const SUGGESTION_DEBOUNCE_MS = 500;
const MIN_SEARCH_LENGTH = 2;

const LEVELS = [
  "Undergraduate",
  "Postgraduate",
  "Masters",
  "PhD",
  "Diploma",
  "Certificate",
  "Online Programmes / Distance Learning",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function getOptionValue(item, keys) {
  for (const key of keys) {
    const value = item?.[key];
    if (value !== undefined && value !== null && String(value).trim() !== "") {
      return value;
    }
  }
  return "";
}

function getUniversityName(university) {
  return (
    university?.name ||
    university?.university ||
    university?.u_name ||
    university?.uname ||
    "University"
  );
}

function getCountryName(university, fallback = "") {
  return (
    university?.country ||
    university?.destination ||
    university?.d_name ||
    university?.country_name ||
    fallback ||
    "Country not available"
  );
}

function getLogoUrl(logo, imagePath = "") {
  if (!logo) return "";

  const value = String(logo).trim();
  if (!value) return "";

  if (value.startsWith("http")) return value;

  const cleanImagePath = String(imagePath || "").replace(/\/$/, "");

  if (cleanImagePath) {
    return `${cleanImagePath}/${value.replace(/^\//, "")}`;
  }

  return `https://overseas.technocitysolutions.com/public/${value.replace(
    /^\//,
    ""
  )}`;
}

export default function SDBFindCourse() {
  const dispatch = useDispatch();

  const suggestionRequestRef = useRef(null);
  const resultRequestRef = useRef(null);

  const [keyword, setKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [countryId, setCountryId] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [studyAreaId, setStudyAreaId] = useState("");
  const [intake, setIntake] = useState("");
  const [levels, setLevels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedSearch, setSelectedSearch] = useState({ type: "", id: "" });
  const [selectedSuggestionUniversity, setSelectedSuggestionUniversity] =
    useState(null);

  const [appliedCourse, setAppliedCourse] = useState(null);

  const { uid } = useSelector((state) => state.auth);
  const safeUid = uid || 0;

  const { countries = [] } = useSelector((state) => state.countryData);

  const {
    universities = [],
    selectedUniversity,
    selectedInfo = [],
    selectedCourses = [],
    universityImagePath = "",
    detailsLoading,
    detailsError,
  } = useSelector((state) => state.universityData);

  const {
    popularCourses = [],
    universityMainCourses = [],
    universityMainCoursesLoading,
  } = useSelector((state) => state.courseData);

  const {
    results = [],
    suggestions = [],
    loading,
    loadMoreLoading,
    suggestionsLoading,
    error,
    nextOffset,
  } = useSelector((state) => state.findCourse);

  const totalItems = results.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  const startItem =
    totalItems === 0 ? 0 : (currentPage - 1) * ITEMS_PER_PAGE + 1;

  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, totalItems);

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return results.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [results, currentPage]);

  const countryOptions = useMemo(
    () =>
      countries.map((item) => ({
        value: getOptionValue(item, ["id", "d_id"]),
        label: getOptionValue(item, [
          "name",
          "destination",
          "country",
          "d_name",
        ]),
      })),
    [countries]
  );

  const universityOptions = useMemo(
    () =>
      universities.map((item) => ({
        value: getOptionValue(item, ["id", "u_id"]),
        label: getOptionValue(item, [
          "name",
          "university",
          "uname",
          "u_name",
        ]),
      })),
    [universities]
  );

  const studyAreaOptions = useMemo(() => {
    const source = universityId ? universityMainCourses : popularCourses;

    return source.map((item) => ({
      value: getOptionValue(item, ["c_id", "id", "course_id", "main_course_id"]),
      label: getOptionValue(item, [
        "course",
        "main_course",
        "name",
        "course_name",
        "main_course_name",
        "title",
      ]),
    }));
  }, [universityId, universityMainCourses, popularCourses]);

  const universityBox = selectedUniversity || selectedSuggestionUniversity;

  const universityName = getUniversityName(universityBox);
  const universityCountry = getCountryName(
    universityBox,
    selectedSuggestionUniversity?.country
  );

  const universityLocation =
    universityBox?.location || universityBox?.city || universityCountry;

  const universityRank = universityBox?.rank || "N/A";

  const universityType =
    universityBox?.type || universityBox?.university_type || "University";

  const universityLogo =
    universityBox?.logo ||
    universityBox?.image ||
    universityBox?.university_logo ||
    universityBox?.university_logo_path ||
    "";

  const universityLogoUrl = getLogoUrl(universityLogo, universityImagePath);

  const aboutText =
    selectedInfo?.find((item) => item.type === "about")?.text ||
    `${universityName} is located in ${universityLocation}. Explore university details and available courses.`;

  const getSuggestionCountry = (item) => {
    if (item?.country) return item.country;

    const matchedCountry = countries.find((country) => {
      const id = getOptionValue(country, ["id", "d_id"]);
      return String(id) === String(item?.countryId);
    });

    return getOptionValue(matchedCountry, [
      "name",
      "destination",
      "country",
      "d_name",
    ]);
  };

  const getSuggestionLogo = (item) => {
    return getLogoUrl(
      item?.logo ||
        item?.image ||
        item?.university_logo ||
        item?.university_logo_path,
      item?.imagePath || universityImagePath
    );
  };

  useEffect(() => {
    dispatch(fetchCountries(safeUid));
    dispatch(fetchPopularCourses(safeUid));
  }, [dispatch, safeUid]);

useEffect(() => {
  const pendingCourse = sessionStorage.getItem("pendingApplyCourse");

  if (!pendingCourse) return;

  try {
    const parsedCourse = JSON.parse(pendingCourse);

    if (parsedCourse?.course) {
      setAppliedCourse(parsedCourse.course);

      dispatch(clearUniversityDetails());
      dispatch(clearFindCourseResults());
      dispatch(clearFindCourseSuggestions());

      setKeyword("");
      setCountryId("");
      setUniversityId("");
      setStudyAreaId("");
      setSelectedSuggestionUniversity(null);
      setSelectedSearch({ type: "", id: "" });
    }
  } catch {
    sessionStorage.removeItem("pendingApplyCourse");
    sessionStorage.removeItem("loginRedirectType");
  }
}, [dispatch]);

  useEffect(() => {
    setUniversityId("");
    setStudyAreaId("");

    if (!countryId) return;

    dispatch(
      fetchUniversitiesByCountry({
        uid: safeUid,
        id: countryId,
        offset: 0,
        keyword: "alluniversities",
      })
    );
  }, [dispatch, safeUid, countryId]);
useEffect(() => {
  if (!uid) {
    setAppliedCourse(null);
    sessionStorage.removeItem("pendingApplyCourse");
    sessionStorage.removeItem("loginRedirectType");
  }
}, [uid]);
  useEffect(() => {
    setStudyAreaId("");

    if (!universityId) return;

    dispatch(
      fetchUniversityMainCoursesByUid({
        universityId,
        uid: safeUid,
      })
    );
  }, [dispatch, universityId, safeUid]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
    }, SUGGESTION_DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    const search = debouncedKeyword.trim();

    if (selectedSearch.id) return;

    if (search.length < MIN_SEARCH_LENGTH) {
      setShowSuggestions(false);
      dispatch(clearFindCourseSuggestions());
      return;
    }

    suggestionRequestRef.current?.abort?.();

    setShowSuggestions(true);

    const request = dispatch(fetchFindCourseSuggestions(search));
    suggestionRequestRef.current = request;

    return () => {
      request?.abort?.();
    };
  }, [debouncedKeyword, dispatch, selectedSearch.id]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    return () => {
      suggestionRequestRef.current?.abort?.();
      resultRequestRef.current?.abort?.();
    };
  }, []);

  const buildSearchPayload = ({
    nextKeyword = keyword,
    nextSelectedSearch = selectedSearch,
    offset = 0,
    append = false,
  } = {}) => ({
    uid: safeUid,
    keyword: nextKeyword.trim(),
    countryId,
    universityId,
    courseId: studyAreaId,
    selectedType: nextSelectedSearch.type,
    selectedId: nextSelectedSearch.id,
    intake,
    levels,
    offset,
    append,
  });

  const runSearch = ({
    nextKeyword = keyword,
    nextSelectedSearch = selectedSearch,
  } = {}) => {
    setCurrentPage(1);
    setShowSuggestions(false);
    setSelectedSuggestionUniversity(null);

    dispatch(clearUniversityDetails());

    resultRequestRef.current?.abort?.();

    const request = dispatch(
      fetchFindCourseResults(
        buildSearchPayload({
          nextKeyword,
          nextSelectedSearch,
          offset: 0,
          append: false,
        })
      )
    );

    resultRequestRef.current = request;
  };

  const handleSearch = () => {
    runSearch();
  };

  const handleLoadMore = () => {
    if (!nextOffset || loading || loadMoreLoading) return;

    const request = dispatch(
      fetchFindCourseResults(
        buildSearchPayload({
          offset: nextOffset,
          append: true,
        })
      )
    );

    resultRequestRef.current = request;
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || loading || loadMoreLoading) return;
    setCurrentPage(page);
  };

  const handleSuggestionClick = (item) => {
    dispatch(clearFindCourseSuggestions());
    setShowSuggestions(false);
    setKeyword(item.label);
    setDebouncedKeyword(item.label);
    setCurrentPage(1);

    if (item.type === "university") {
      const country = getSuggestionCountry(item);

      const preview = {
        id: item.id,
        name: item.label,
        university: item.label,
        country,
        destination: country,
        logo: item.logo || item.image || item.university_logo || "",
      };

      setSelectedSuggestionUniversity(preview);
      setSelectedSearch({ type: "university", id: item.id });

      dispatch(clearFindCourseResults());
      dispatch(clearUniversityDetails());

      dispatch(
        fetchUniversityDetails({
          uid: safeUid,
          id: item.id,
        })
      );

      return;
    }

    setSelectedSuggestionUniversity(null);
    dispatch(clearUniversityDetails());

    const nextSelectedSearch = {
      type: item.type,
      id: item.id,
    };

    setSelectedSearch(nextSelectedSearch);

    runSearch({
      nextKeyword: item.label,
      nextSelectedSearch,
    });
  };

  const handleClear = () => {
    suggestionRequestRef.current?.abort?.();
    resultRequestRef.current?.abort?.();

    setKeyword("");
    setDebouncedKeyword("");
    setCountryId("");
    setUniversityId("");
    setStudyAreaId("");
    setIntake("");
    setLevels([]);
    setCurrentPage(1);
    setSelectedSearch({ type: "", id: "" });
    setSelectedSuggestionUniversity(null);
    setShowSuggestions(false);
    setAppliedCourse(null);

    sessionStorage.removeItem("pendingApplyCourse");
    sessionStorage.removeItem("loginRedirectType");

    dispatch(clearFindCourseResults());
    dispatch(clearFindCourseSuggestions());
    dispatch(clearUniversityDetails());
  };

  const toggleLevel = (level) => {
    setCurrentPage(1);

    setLevels((prev) =>
      prev.includes(level)
        ? prev.filter((item) => item !== level)
        : [...prev, level]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="m-5 flex flex-col items-center justify-between rounded-3xl bg-blue-50 px-5 py-5 shadow-md md:flex-row">
        <div>
          <h1 className="text-2xl font-black sm:text-3xl">Find a Course</h1>

          <p className="my-2 text-sm text-slate-500">
            Search and explore courses from top universities around the world.
          </p>
        </div>

        <div className="relative flex w-full max-w-xl items-center gap-3 rounded-xl bg-white px-3 py-2 shadow-md">
          <Search size={22} className="text-slate-500" />

          <input
            type="text"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setSelectedSearch({ type: "", id: "" });
              setSelectedSuggestionUniversity(null);
              dispatch(clearUniversityDetails());
            }}
            onFocus={() => {
              if (keyword.trim().length >= MIN_SEARCH_LENGTH) {
                setShowSuggestions(true);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearch();
              if (e.key === "Escape") setShowSuggestions(false);
            }}
            placeholder="Search course or university..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />

          <button
            type="button"
            onClick={handleSearch}
            disabled={loading || loadMoreLoading}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Searching..." : "Search"}
          </button>

          {showSuggestions && (
            <div className="absolute left-0 top-full z-50 mt-2 max-h-96 w-full overflow-y-auto rounded-xl bg-white shadow-lg">
              {suggestionsLoading ? (
                <div className="px-3 py-3 text-sm text-slate-500">
                  Searching...
                </div>
              ) : suggestions.length > 0 ? (
                suggestions.map((item) => {
                  const logoUrl = getSuggestionLogo(item);

                  return (
                    <button
                      key={`${item.type}-${item.id}-${item.label}`}
                      type="button"
                      onClick={() => handleSuggestionClick(item)}
                      className="block w-full px-4 py-3 text-left hover:bg-slate-100"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                            {logoUrl ? (
                              <img
                                src={logoUrl}
                                alt={item.label}
                                className="h-full w-full object-contain object-center"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none";
                                }}
                              />
                            ) : (
                              <BookOpen size={18} className="text-slate-400" />
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-800">
                              {item.label}
                            </p>

                            {item.type === "course" && item.university && (
                              <p className="mt-1 truncate text-xs text-slate-500">
                                {item.university}
                              </p>
                            )}
                          </div>
                        </div>

                        <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase text-slate-500">
                          {item.type}
                        </span>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-3 text-sm text-slate-500">
                  No suggestions found
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="m-5 grid gap-6 lg:grid-cols-[230px_1fr]">
        <aside className="h-fit rounded-xl bg-white p-5 shadow-md">
          <div className="mb-5 flex items-center justify-between border-b pb-4">
            <h2 className="text-lg font-bold">Filter</h2>

            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1 text-sm font-semibold text-primary hover:cursor-pointer"
            >
              <RotateCcw size={14} />
              Clear
            </button>
          </div>

          <FilterSelect
            label="Country"
            value={countryId}
            onChange={(value) => {
              setCountryId(value);
              setUniversityId("");
              setStudyAreaId("");
              setCurrentPage(1);
              setSelectedSearch({ type: "", id: "" });
              setSelectedSuggestionUniversity(null);
              dispatch(clearUniversityDetails());
            }}
            placeholder="Select Country"
            options={countryOptions}
          />

          <FilterSelect
            label="University"
            value={universityId}
            onChange={(value) => {
              setUniversityId(value);
              setStudyAreaId("");
              setCurrentPage(1);
              setSelectedSearch({ type: "", id: "" });
              setSelectedSuggestionUniversity(null);
              dispatch(clearUniversityDetails());
            }}
            placeholder="Select University"
            disabled={!countryId}
            options={universityOptions}
          />

          <FilterSelect
            label="Study Area"
            value={studyAreaId}
            onChange={(value) => {
              setStudyAreaId(value);
              setCurrentPage(1);
              setSelectedSearch({ type: "", id: "" });
            }}
            placeholder={
              universityMainCoursesLoading
                ? "Loading Study Areas..."
                : "Select Study Area"
            }
            disabled={Boolean(universityId && universityMainCoursesLoading)}
            options={studyAreaOptions}
          />

          <FilterSelect
            label="Intake"
            value={intake}
            onChange={(value) => {
              setIntake(value);
              setCurrentPage(1);
              setSelectedSearch({ type: "", id: "" });
            }}
            placeholder="Select Intake"
            options={MONTHS.map((month) => ({
              value: month,
              label: month,
            }))}
          />

          <div className="mt-5">
            <p className="mb-3 text-sm font-bold">Levels</p>

            {LEVELS.map((item) => (
              <label
                key={item}
                className="mb-3 flex items-center gap-2 text-sm text-slate-700"
              >
                <input
                  type="checkbox"
                  checked={levels.includes(item)}
                  onChange={() => toggleLevel(item)}
                  className="h-4 w-4 rounded border-slate-300 accent-red-600"
                />
                {item}
              </label>
            ))}
          </div>

          <button
            type="button"
            onClick={handleSearch}
            disabled={loading || loadMoreLoading}
            className="mt-5 w-full rounded-lg bg-primary px-4 py-3 text-sm font-bold text-white hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Applying..." : "Apply Filters"}
          </button>
        </aside>

       <main className="flex flex-col gap-5 pr-2">
  {appliedCourse ? (
    <div className="rounded-2xl border border-primary/20 bg-white p-4 shadow-md">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase text-primary">
            Selected Course
          </p>
          <h2 className="mt-1 text-lg font-black text-slate-900">
            Course you selected before login
          </h2>
        </div>

        <button
          type="button"
          onClick={() => {
            setAppliedCourse(null);
            sessionStorage.removeItem("pendingApplyCourse");
            sessionStorage.removeItem("loginRedirectType");
            dispatch(clearUniversityDetails());
            dispatch(clearFindCourseResults());
          }}
          className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200"
        >
          Clear
        </button>
      </div>

      <SDBFindCourseCard course={appliedCourse} />
    </div>
  ) : detailsLoading ? (
    <div className="rounded-xl bg-white p-8 text-center font-bold shadow-md">
      Loading university details...
    </div>
  ) : detailsError ? (
    <div className="rounded-xl bg-white p-8 text-center font-bold text-primary shadow-md">
      {detailsError}
    </div>
  ) : universityBox ? (
    <div className="rounded-2xl bg-white p-6 shadow-md">
      <div className="mb-4 flex items-start justify-between gap-4 border-b pb-4">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100">
            {universityLogoUrl ? (
              <img
                src={universityLogoUrl}
                alt={universityName}
                className="h-full w-full object-contain"
              />
            ) : (
              <Landmark size={28} className="text-slate-400" />
            )}
          </div>

          <div>
            <p className="text-xs font-black uppercase text-primary">
              University Details
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900">
              {universityName}
            </h2>

            <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
              <MapPin size={16} className="text-primary" />
              {universityCountry}
            </p>
          </div>
        </div>

        <div className="rounded-full bg-primary px-3 py-1 text-xs font-black uppercase text-white">
          University
        </div>
      </div>

      <p className="text-sm leading-7 text-slate-600">{aboutText}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <UniversityFact icon={Landmark} label="Type" value={universityType} />
        <UniversityFact icon={MapPin} label="Location" value={universityLocation} />
        <UniversityFact icon={Star} label="Ranking" value={universityRank} />
        <UniversityFact
          icon={BookOpen}
          label="Courses"
          value={`${selectedCourses?.length || 0} available`}
        />
      </div>

      <div className="mt-6">
        <SDBPreviewCourses />
      </div>
    </div>
  ) : loading ? (
    <div className="rounded-xl bg-white p-8 text-center font-bold shadow-md">
      Loading courses...
    </div>
  ) : error ? (
    <div className="rounded-xl bg-white p-8 text-center font-bold text-primary shadow-md">
      {error}
    </div>
  ) : results.length > 0 ? (
    <>
      <p className="text-sm font-semibold text-slate-500">
        {startItem} to {endItem} of {totalItems} loaded courses
      </p>

      {paginatedResults.map((course, index) => (
        <SDBFindCourseCard
          key={
            course?.id ||
            course?.course_id ||
            course?.uc_id ||
            `${course?.course || "course"}-${index}`
          }
          course={course}
        />
      ))}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        loading={loading || loadMoreLoading}
        onPrevious={() => handlePageChange(currentPage - 1)}
        onNext={() => handlePageChange(currentPage + 1)}
        onPageChange={handlePageChange}
      />

      {nextOffset && (
        <button
          type="button"
          onClick={handleLoadMore}
          disabled={loading || loadMoreLoading}
          className="rounded-lg bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loadMoreLoading ? "Loading more..." : "Load More Courses"}
        </button>
      )}
    </>
  ) : (
    <div className="rounded-xl bg-white p-8 text-center font-bold shadow-md">
      No courses found.
    </div>
  )}
</main>
      </div>
    </div>
  );
}

function UniversityFact({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary shadow-sm">
        <Icon size={18} />
      </div>

      <p className="text-xs font-black uppercase text-slate-400">{label}</p>

      <p className="mt-1 break-words text-sm font-black text-slate-800">
        {value}
      </p>
    </div>
  );
}