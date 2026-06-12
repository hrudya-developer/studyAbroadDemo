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
import { fetchPopularCourses } from "../redux/slices/courseSlice";

import Pagination from "../components/Pagination";
import FilterSelect from "../pages/SDBFilterSelect";
import SDBFindCourseCard from "../pages/SDBFindCourseCard";
import CoursesOfUniv from "../pages/CoursesOfUniv";

import {
  fetchFindCourseResults,
  fetchFindCourseSuggestions,
  clearFindCourseResults,
  clearFindCourseSuggestions,
} from "../redux/slices/findCourseDBSlice";

import SDBPreviewCourses from "./SDBPreviewCourses";

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

  if (value.startsWith("http")) {
    return value;
  }

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
  const [showUniversityCourses, setShowUniversityCourses] = useState(false);

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

  const { popularCourses = [] } = useSelector((state) => state.courseData);

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

  const studyAreaOptions = useMemo(
    () =>
      popularCourses.map((item) => ({
        value: getOptionValue(item, ["c_id", "id"]),
        label: getOptionValue(item, [
          "course",
          "main_course",
          "name",
          "course_name",
        ]),
      })),
    [popularCourses]
  );

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
    setUniversityId("");

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
    setShowUniversityCourses(false);

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
      const preview = {
        id: item.id,
        name: item.label,
        university: item.label,
        country: getSuggestionCountry(item),
        destination: getSuggestionCountry(item),
        logo: item.logo || item.image || item.university_logo || "",
      };

      setSelectedSuggestionUniversity(preview);
      setSelectedSearch({ type: "university", id: item.id });
      setShowUniversityCourses(false);

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
    setShowUniversityCourses(false);
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
    setShowUniversityCourses(false);
    setShowSuggestions(false);

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
    <div className="min-h-screen bg-slate-50 p-4 text-slate-900 sm:p-6 lg:p-8">
      <div className="flex flex-col items-center justify-between rounded-3xl bg-blue-50 px-5 py-10 shadow-md md:flex-row">
        <div>
          <h1 className="text-2xl font-black sm:text-3xl">Find a Course</h1>

          <p className="mt-2 text-sm text-slate-500">
            Search and explore courses from top universities around the world.
          </p>
        </div>

        <div className="relative flex w-full max-w-xl items-center gap-3 rounded-xl bg-white px-3 py-3 font-lg shadow-md">
          <Search size={22} className="text-slate-500" />

          <input
            type="text"
            value={keyword}
            onChange={(e) => {
              setKeyword(e.target.value);
              setSelectedSearch({ type: "", id: "" });
              setSelectedSuggestionUniversity(null);
              setShowUniversityCourses(false);
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
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
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
                  const country = getSuggestionCountry(item);

                  return (
                    <button
                      key={`${item.type}-${item.id}-${item.label}`}
                      type="button"
                      onClick={() => handleSuggestionClick(item)}
                      className="block w-full px-4 py-3 text-left hover:bg-slate-100"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-start gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-100 itesm-center">
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

                            {/* {item.type === "university" && (
                              <p className="mt-1 truncate text-xs text-slate-500">
                                {country || "Country not available"}
                              </p>
                            )} */}
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

      <div className="mt-8 grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="h-fit rounded-xl bg-white p-5 shadow-md">
          <div className="flex items-center justify-between border-b pb-4">
            <h2 className="text-lg font-bold">Filter</h2>

            <button
              type="button"
              onClick={handleClear}
              className="flex items-center gap-1 text-sm font-semibold text-red-600 hover:cursor-pointer"
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
              setCurrentPage(1);
              setSelectedSearch({ type: "", id: "" });
              setSelectedSuggestionUniversity(null);
              setShowUniversityCourses(false);
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
              setCurrentPage(1);
              setSelectedSearch({ type: "", id: "" });
              setSelectedSuggestionUniversity(null);
              setShowUniversityCourses(false);
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
            placeholder="Select Study Area"
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
            className="mt-5 w-full rounded-lg bg-red-600 px-4 py-3 text-sm font-bold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Applying..." : "Apply Filters"}
          </button>
        </aside>

        <main className="flex flex-col gap-5 pr-2">
          {detailsLoading ? (
            <div className="rounded-xl bg-white p-8 text-center font-bold shadow-md">
              Loading university details...
            </div>
          ) : detailsError ? (
            <div className="rounded-xl bg-white p-8 text-center font-bold text-red-600 shadow-md">
              {detailsError}
            </div>
          ) : universityBox ? (
            showUniversityCourses ? (
              <CoursesOfUniv />
            ) : (
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
                      <p className="text-xs font-black uppercase text-red-600">
                        University Details
                      </p>

                      <h2 className="mt-2 text-2xl font-black text-slate-900">
                        {universityName}
                      </h2>

                      <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
                        <MapPin size={16} className="text-red-600" />
                        {universityCountry}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-full bg-red-50 px-3 py-1 text-xs font-black uppercase text-red-600">
                    University
                  </div>
                </div>

                <p className="text-sm leading-7 text-slate-600">{aboutText}</p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  <UniversityFact
                    icon={Landmark}
                    label="Type"
                    value={universityType}
                  />

                  <UniversityFact
                    icon={MapPin}
                    label="Location"
                    value={universityLocation}
                  />

                  <UniversityFact
                    icon={Star}
                    label="Ranking"
                    value={universityRank}
                  />

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
            )
          ) : loading ? (
            <div className="rounded-xl bg-white p-8 text-center font-bold shadow-md">
              Loading courses...
            </div>
          ) : error ? (
            <div className="rounded-xl bg-white p-8 text-center font-bold text-red-600 shadow-md">
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
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-red-600 shadow-sm">
        <Icon size={18} />
      </div>

      <p className="text-xs font-black uppercase text-slate-400">{label}</p>

      <p className="mt-1 break-words text-sm font-black text-slate-800">
        {value}
      </p>
    </div>
  );
}