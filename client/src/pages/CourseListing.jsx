import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SlidersHorizontal,
  Globe,
  Calendar,
  GraduationCap,
  Clock3,
  Heart,
  ArrowRight,
  ChevronDown,
  X,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  BookOpen,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

import courseListBg from "../assets/courseListBg.png";
import { fetchCountries } from "../redux/slices/countrySlice";
import { fetchPopularCourses } from "../redux/slices/courseSlice";

const API_KEY = "overseas@Miak2023";
const ITEMS_PER_PAGE = 6;

const normalizeText = (value) => String(value || "").trim().toLowerCase();

const getValue = (item, keys) => {
  if (!item) return "";

  for (const key of keys) {
    const value = item?.[key];

    if (value !== undefined && value !== null && value !== "") {
      return String(value);
    }
  }

  return "";
};

const getCountryLabel = (country) =>
  country?.country || country?.name || country?.title || country?.country_name || "";

const getCountryId = (country) =>
  country?.id || country?.country_id || country?.d_id || country?.cid || "";

const getMainCourseLabel = (course) =>
  course?.main_course ||
  course?.maincourse ||
  course?.course ||
  course?.name ||
  course?.title ||
  course?.course_name ||
  "";

const getMainCourseId = (course) =>
  course?.id || course?.main_course_id || course?.course_id || course?.c_id || "";

const getUniversityLabel = (university) =>
  university?.name ||
  university?.university ||
  university?.title ||
  university?.university_name ||
  university?.college ||
  "";

const getUniversityId = (university) =>
  university?.id || university?.university_id || university?.u_id || university?.uid || "";

const getCourseName = (course) =>
  getValue(course, ["course", "course_name", "name", "title", "course_title"]);

const getCourseCountry = (course) =>
  getValue(course, ["country", "country_name", "destination", "country_title"]);

const getCourseCountryId = (course) =>
  getValue(course, ["country_id", "d_id", "destination_id"]);

const getCourseUniversity = (course) =>
  getValue(course, ["university", "university_name", "college", "university_title"]);

const getCourseUniversityId = (course) =>
  getValue(course, ["university_id", "u_id", "uid", "college_id"]);

const getCourseStudyArea = (course) =>
  getValue(course, ["main_course", "study_area", "category", "main_course_name"]);

const getCourseLevel = (course) =>
  getValue(course, ["level", "program", "course_level", "qualification"]);

const getCourseDuration = (course) =>
  getValue(course, ["duration", "course_duration"]);

const getCourseIntakes = (course) =>
  getValue(course, ["intakes", "intake"]);

const getCourseLogo = (course) =>
  getValue(course, [
    "logo",
    "image",
    "image_name",
    "university_logo",
    "university_image",
    "university_image_name",
    "college_logo",
    "photo",
  ]);

const buildImageUrl = (basePath, imageName) => {
  if (!imageName) return "";
  if (/^https?:\/\//i.test(imageName)) return imageName;
  if (!basePath) return imageName;

  return `${String(basePath).replace(/\/$/, "")}/${String(imageName).replace(/^\//, "")}`;
};

const uniqueOptions = (items) => {
  const map = new Map();

  items.forEach((item) => {
    if (!item.value || !item.label) return;

    if (!map.has(String(item.value))) {
      map.set(String(item.value), {
        value: String(item.value),
        label: String(item.label),
      });
    }
  });

  return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label));
};

const getHasMoreOffset = (offset) =>
  offset !== null && offset !== undefined && offset !== "" && String(offset) !== "0";

const parseJsonResponse = async (response) => {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`Invalid API response. Status: ${response.status}`);
  }
};

async function fetchUniversitiesForCountry({ uid, countryId }) {
  if (!countryId) return { universities: [], imagePath: "" };

  const response = await fetch(
    "https://overseas.technocitysolutions.com/public/api/getUniversitybyOffset",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        api: API_KEY,
        uid: uid ?? 0,
        id: countryId,
        offset: 0,
        keyword: "alluniversities",
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch universities. Status: ${response.status}`);
  }

  const result = await response.json();

  return {
    universities: result?.data || result?.universities || [],
    imagePath: result?.universities_image_path || "",
    raw: result,
  };
}

async function fetchCoursesByCategoryAndUniversity({
  uid,
  mainCourseId,
  universityId = "",
  offset = 0,
}) {
  const formData = new FormData();

  formData.append("api", API_KEY);
  formData.append("uid", String(uid ?? 0));
  formData.append("c_id", String(mainCourseId || ""));
  formData.append("u_id", String(universityId || ""));
  formData.append("offset", String(offset || 0));

  const response = await fetch(
    "https://overseas.technocitysolutions.com/public/api/getAllUniversityCoursesLatest",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch courses. Status: ${response.status}`);
  }

  const result = await parseJsonResponse(response);

  return {
    courses: Array.isArray(result?.course)
      ? result.course
      : Array.isArray(result?.courses)
      ? result.courses
      : Array.isArray(result?.data)
      ? result.data
      : [],
    nextOffset: result?.nextoffset ?? result?.nextOffset ?? null,
    imagePath:
      result?.maincourse_image_path ||
      result?.course_image_path ||
      result?.courses_image_path ||
      result?.university_image_path ||
      result?.universities_image_path ||
      result?.image_path ||
      "",
    raw: result,
  };
}

function FilterSelect({
  label,
  value,
  onChange,
  options = [],
  loading = false,
  disabled = false,
}) {
  return (
    <div className="border-b border-gray-200 py-4 last:border-0">
      <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={loading || disabled}
          className="h-10 w-full appearance-none rounded-lg border border-gray-200 bg-white px-3 pr-8 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">{loading ? "Loading..." : `All ${label}`}</option>

          {options.map((option) => (
            <option key={`${label}-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value, truncate = false }) {
  return (
    <p className={`flex items-center gap-1.5 ${truncate ? "min-w-0" : ""}`}>
      <span className="shrink-0 text-gray-400">{icon}</span>
      <span className="shrink-0 text-gray-500">{label}:</span>
      <span
        title={value || "N/A"}
        className={`font-medium text-gray-700 ${truncate ? "truncate" : ""}`}
      >
        {value || "N/A"}
      </span>
    </p>
  );
}

function CourseCardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl bg-white p-6 shadow-sm">
      <div className="grid gap-6 lg:grid-cols-[96px_1fr_200px]">
        <div className="h-24 w-24 rounded-xl bg-gray-200" />

        <div className="space-y-3">
          <div className="h-4 w-20 rounded-full bg-gray-200" />
          <div className="h-6 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-200" />

          <div className="mt-4 grid gap-2 md:grid-cols-2">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-4 rounded bg-gray-100" />
            ))}
          </div>
        </div>

        <div className="flex flex-col items-end justify-center gap-3">
          <div className="h-11 w-36 rounded-xl bg-gray-200" />
          <div className="h-12 w-12 rounded-xl bg-gray-100" />
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course, imageBasePath = "" }) {
  const [liked, setLiked] = useState(false);

  const courseName = getCourseName(course);
  const university = getCourseUniversity(course);
  const country = getCourseCountry(course);
  const studyArea = getCourseStudyArea(course);
  const level = getCourseLevel(course);
  const duration = getCourseDuration(course);
  const intakes = getCourseIntakes(course);
  const fees = getValue(course, ["fees", "tuition_fee", "fee"]);
  const currency = getValue(course, ["currency", "currency_symbol"]);
  const ielts = getValue(course, ["ielts", "ielts_score"]);
  const toefl = getValue(course, ["toefl", "toefl_score"]);
  const logoUrl = buildImageUrl(imageBasePath, getCourseLogo(course));

  const universityId = getCourseUniversityId(course);
  const countryId = getCourseCountryId(course);
  const courseId = course?.id || course?.course_id;

  return (
    <div className="group rounded-3xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-xl">
      <div className="grid gap-6 lg:grid-cols-[96px_1fr_200px]">
        <div className="flex justify-center lg:justify-start">
          <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-xl border bg-white transition group-hover:bg-primary/5">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={university || courseName || "Course logo"}
                className="h-full w-full object-contain p-2"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                  event.currentTarget.nextElementSibling?.classList.remove("hidden");
                }}
              />
            ) : null}

            <GraduationCap className={`${logoUrl ? "hidden" : ""} text-primary`} size={36} />
          </div>
        </div>

        <div className="min-w-0">
          {level && (
            <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {level}
            </span>
          )}

          <h3 className="mt-2 text-lg font-bold leading-snug text-gray-900">
            {courseName || "Untitled Course"}
          </h3>

          <p className="mt-1 text-sm font-medium text-gray-700">
            {university || "University not available"}
          </p>

          {country && (
            <p className="mt-1 text-sm text-primary">
              <Globe size={13} className="-mt-0.5 mr-1 inline" />
              {country}
            </p>
          )}

          <div className="mt-4 grid gap-x-6 gap-y-2 text-sm text-gray-600 sm:grid-cols-2">
            <InfoRow icon={<BookOpen size={14} />} label="Study Area" value={studyArea} />
            <InfoRow icon={<Calendar size={14} />} label="Intake" value={intakes} truncate />
            <InfoRow
              icon={<Globe size={14} />}
              label="Fees"
              value={fees ? `${currency || ""}${fees}` : "N/A"}
            />
            <InfoRow icon={<Clock3 size={14} />} label="Duration" value={duration} />
            <InfoRow icon={<Globe size={14} />} label="IELTS" value={ielts} />
            <InfoRow icon={<Globe size={14} />} label="TOEFL" value={toefl} />
          </div>
        </div>

        <div className="flex flex-row items-center justify-center gap-3 lg:flex-col lg:items-end">
          <Link
            to={`/courseDetailsOfUniv/${courseId}`}
            state={{ course, universityId, countryId }}
            onClick={() => {
              sessionStorage.setItem("selectedCourse", JSON.stringify(course));
              sessionStorage.setItem("universityId", universityId || "");
              sessionStorage.setItem("countryId", countryId || "");
            }}
            className="flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-95"
          >
            View Course
            <ArrowRight size={16} />
          </Link>

          <button
            type="button"
            onClick={() => setLiked((previous) => !previous)}
            className={`flex h-11 w-11 items-center justify-center rounded-xl border transition ${
              liked ? "border-red-300 bg-red-50 text-red-500" : "hover:bg-gray-50"
            }`}
            aria-label={liked ? "Remove from favourites" : "Add to favourites"}
          >
            <Heart size={16} fill={liked ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = [];

  if (totalPages <= 7) {
    for (let page = 1; page <= totalPages; page += 1) pages.push(page);
  } else {
    pages.push(1);
    if (currentPage > 3) pages.push("...");

    for (
      let page = Math.max(2, currentPage - 1);
      page <= Math.min(totalPages - 1, currentPage + 1);
      page += 1
    ) {
      pages.push(page);
    }

    if (currentPage < totalPages - 2) pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-10 w-10 items-center justify-center rounded-full border transition hover:bg-gray-50 disabled:opacity-30"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="flex h-10 w-10 items-center justify-center text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            type="button"
            key={page}
            onClick={() => onPageChange(page)}
            className={`h-10 w-10 rounded-full text-sm font-medium transition ${
              currentPage === page ? "bg-primary text-white shadow-sm" : "border hover:bg-gray-50"
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-full border transition hover:bg-gray-50 disabled:opacity-30"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default function CourseListing() {
  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth || {});
  const safeUid = uid ?? 0;

  const { countries = [], loading: countriesLoading } = useSelector(
    (state) => state.countryData || {}
  );

  const {
    popularCourses = [],
    loading: mainCoursesLoading,
    error: mainCoursesError,
  } = useSelector((state) => state.courseData || {});

  const [selectedMainCourseId, setSelectedMainCourseId] = useState("");
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedUniversityId, setSelectedUniversityId] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("");
  const [searchText, setSearchText] = useState("");

  const [universities, setUniversities] = useState([]);
  const [universitiesLoading, setUniversitiesLoading] = useState(false);

  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [coursesError, setCoursesError] = useState("");
  const [nextOffset, setNextOffset] = useState(null);
  const [imageBasePath, setImageBasePath] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (!countries.length) dispatch(fetchCountries(safeUid));
    if (!popularCourses.length) dispatch(fetchPopularCourses(safeUid));
  }, [dispatch, safeUid, countries.length, popularCourses.length]);

  useEffect(() => {
    if (selectedMainCourseId || !popularCourses.length) return;

    const firstCategoryId = getMainCourseId(popularCourses[0]);
    if (firstCategoryId) setSelectedMainCourseId(String(firstCategoryId));
  }, [popularCourses, selectedMainCourseId]);

  useEffect(() => {
    let cancelled = false;

    async function loadUniversities() {
      setSelectedUniversityId("");
      setUniversities([]);

      if (!selectedCountryId) return;

      try {
        setUniversitiesLoading(true);

        const result = await fetchUniversitiesForCountry({
          uid: safeUid,
          countryId: selectedCountryId,
        });

        if (!cancelled) {
          setUniversities(result.universities);
        }
      } catch {
        if (!cancelled) setUniversities([]);
      } finally {
        if (!cancelled) setUniversitiesLoading(false);
      }
    }

    loadUniversities();

    return () => {
      cancelled = true;
    };
  }, [safeUid, selectedCountryId]);

  useEffect(() => {
    let cancelled = false;

    async function loadCourses() {
      if (!selectedMainCourseId) return;

      try {
        setCoursesLoading(true);
        setCoursesError("");
        setCourses([]);
        setNextOffset(null);
        setImageBasePath("");

        let finalCourses = [];
        let finalImagePath = "";
        let finalNextOffset = null;

        if (selectedCountryId && !selectedUniversityId) {
          const universityResult = universities.length
            ? { universities }
            : await fetchUniversitiesForCountry({
                uid: safeUid,
                countryId: selectedCountryId,
              });

          const selectedCountry = countries.find(
            (item) => String(getCountryId(item)) === String(selectedCountryId)
          );

          for (const university of universityResult.universities) {
            const universityId = getUniversityId(university);
            if (!universityId) continue;

            try {
              const result = await fetchCoursesByCategoryAndUniversity({
                uid: safeUid,
                mainCourseId: selectedMainCourseId,
                universityId,
                offset: 0,
              });

              if (result.imagePath && !finalImagePath) {
                finalImagePath = result.imagePath;
              }

              finalCourses = [
                ...finalCourses,
                ...result.courses.map((course) => ({
                  ...course,
                  university:
                    getCourseUniversity(course) || getUniversityLabel(university),
                  university_id:
                    getCourseUniversityId(course) || getUniversityId(university),
                  country:
                    getCourseCountry(course) || getCountryLabel(selectedCountry),
                  country_id:
                    getCourseCountryId(course) || selectedCountryId,
                })),
              ];
            } catch {
              // Skip universities that have no courses or fail individually.
            }
          }
        } else {
          const result = await fetchCoursesByCategoryAndUniversity({
            uid: safeUid,
            mainCourseId: selectedMainCourseId,
            universityId: selectedUniversityId || "",
            offset: 0,
          });

          finalCourses = result.courses;
          finalImagePath = result.imagePath;
          finalNextOffset = result.nextOffset;
        }

        if (!cancelled) {
          setCourses(finalCourses);
          setImageBasePath(finalImagePath);
          setNextOffset(finalNextOffset);
        }
      } catch (error) {
        if (!cancelled) {
          setCoursesError(error?.message || "Failed to fetch courses");
          setCourses([]);
        }
      } finally {
        if (!cancelled) setCoursesLoading(false);
      }
    }

    loadCourses();

    return () => {
      cancelled = true;
    };
  }, [
    safeUid,
    selectedMainCourseId,
    selectedCountryId,
    selectedUniversityId,
    universities,
    countries,
  ]);

  const selectedCountryName = useMemo(() => {
    const found = countries.find(
      (country) => String(getCountryId(country)) === String(selectedCountryId)
    );

    return getCountryLabel(found);
  }, [countries, selectedCountryId]);

  const mainCourseOptions = useMemo(
    () =>
      uniqueOptions(
        popularCourses.map((course) => ({
          value: getMainCourseId(course),
          label: getMainCourseLabel(course),
        }))
      ),
    [popularCourses]
  );

  const countryOptions = useMemo(
    () =>
      uniqueOptions(
        countries.map((country) => ({
          value: getCountryId(country),
          label: getCountryLabel(country),
        }))
      ),
    [countries]
  );

  const universityOptions = useMemo(() => {
    const fromCountryApi = universities.map((university) => ({
      value: getUniversityId(university),
      label: getUniversityLabel(university),
    }));

    const fromCourses = courses.map((course) => ({
      value: getCourseUniversityId(course) || getCourseUniversity(course),
      label: getCourseUniversity(course),
    }));

    return uniqueOptions([...fromCountryApi, ...fromCourses]);
  }, [universities, courses]);

  const levelOptions = useMemo(() => {
    return uniqueOptions(
      courses.map((course) => {
        const level = getCourseLevel(course);
        return { value: level, label: level };
      })
    );
  }, [courses]);

  const filteredCourses = useMemo(() => {
    const query = normalizeText(searchText);

    const selectedUniversityName =
      universityOptions.find((item) => item.value === selectedUniversityId)?.label || "";

    return courses.filter((course) => {
      const courseCountryId = getCourseCountryId(course);
      const courseCountryName = getCourseCountry(course);
      const courseUniversityId = getCourseUniversityId(course);
      const courseUniversityName = getCourseUniversity(course);
      const courseLevel = getCourseLevel(course);
      const courseName = getCourseName(course);
      const studyArea = getCourseStudyArea(course);

      const matchesCountry =
        !selectedCountryId ||
        String(courseCountryId) === String(selectedCountryId) ||
        normalizeText(courseCountryName) === normalizeText(selectedCountryName);

      const matchesUniversity =
        !selectedUniversityId ||
        String(courseUniversityId) === String(selectedUniversityId) ||
        normalizeText(courseUniversityName) === normalizeText(selectedUniversityName);

      const matchesLevel =
        !selectedLevel || normalizeText(courseLevel) === normalizeText(selectedLevel);

      const matchesSearch =
        !query ||
        normalizeText(courseName).includes(query) ||
        normalizeText(courseUniversityName).includes(query) ||
        normalizeText(courseCountryName).includes(query) ||
        normalizeText(studyArea).includes(query) ||
        normalizeText(courseLevel).includes(query);

      return matchesCountry && matchesUniversity && matchesLevel && matchesSearch;
    });
  }, [
    courses,
    searchText,
    selectedCountryId,
    selectedCountryName,
    selectedUniversityId,
    selectedLevel,
    universityOptions,
  ]);

  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    selectedMainCourseId,
    selectedCountryId,
    selectedUniversityId,
    selectedLevel,
    searchText,
  ]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleLoadMore = async () => {
    if (
      !selectedMainCourseId ||
      selectedCountryId ||
      !getHasMoreOffset(nextOffset) ||
      coursesLoading
    ) {
      return;
    }

    try {
      setCoursesLoading(true);

      const result = await fetchCoursesByCategoryAndUniversity({
        uid: safeUid,
        mainCourseId: selectedMainCourseId,
        universityId: selectedUniversityId || "",
        offset: nextOffset,
      });

      setCourses((previous) => [...previous, ...result.courses]);
      setNextOffset(result.nextOffset);
      setImageBasePath(result.imagePath || imageBasePath);
    } catch (error) {
      setCoursesError(error?.message || "Failed to load more courses");
    } finally {
      setCoursesLoading(false);
    }
  };

  const handlePageChange = (page) => {
    const safeTotalPages = Math.max(totalPages, 1);
    const nextPage = Math.max(1, Math.min(page, safeTotalPages));

    setCurrentPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setSelectedCountryId("");
    setSelectedUniversityId("");
    setSelectedLevel("");
    setSearchText("");
    setCurrentPage(1);
  };

  const hasActiveFilters = Boolean(
    selectedCountryId || selectedUniversityId || selectedLevel || searchText
  );

  const filtersPanel = (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-bold text-gray-800">
          <SlidersHorizontal size={16} />
          Filters
        </h3>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            <X size={13} /> Clear all
          </button>
        )}
      </div>

      <div className="border-b border-gray-200 py-4">
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-gray-500">
          Search
        </label>

        <div className="relative">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search course, university..."
            className="h-10 w-full rounded-lg border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <FilterSelect
        label="Course Category"
        value={selectedMainCourseId}
        onChange={setSelectedMainCourseId}
        options={mainCourseOptions}
        loading={mainCoursesLoading}
      />

      <FilterSelect
        label="Country"
        value={selectedCountryId}
        onChange={setSelectedCountryId}
        options={countryOptions}
        loading={countriesLoading}
      />

      <FilterSelect
        label="University"
        value={selectedUniversityId}
        onChange={setSelectedUniversityId}
        options={universityOptions}
        loading={universitiesLoading}
        disabled={false}
      />

      <FilterSelect
        label="Level"
        value={selectedLevel}
        onChange={setSelectedLevel}
        options={levelOptions}
        loading={coursesLoading && courses.length === 0}
      />
    </>
  );

  const showInitialLoading =
    (mainCoursesLoading && !mainCourseOptions.length) ||
    (coursesLoading && courses.length === 0);

  const errorMessage = mainCoursesError || coursesError;

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        className="relative h-[400px] bg-cover bg-center"
        style={{ backgroundImage: `url('${courseListBg}')` }}
      >
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />

        <div className="relative mx-auto flex max-w-7xl flex-col gap-5 px-4 py-16 lg:px-12">
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900 lg:text-5xl">
            Find the <span className="text-primary">Perfect Course</span>
          </h1>

          <p className="text-base text-gray-700 lg:text-lg">
            Browse courses by category, country, university, level, and keyword.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Countries</p>
              <h3 className="text-3xl font-bold">{countryOptions.length}</h3>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Universities</p>
              <h3 className="text-3xl font-bold">{universityOptions.length}</h3>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-gray-500">Courses</p>
              <h3 className="text-3xl font-bold">{filteredCourses.length}</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-4 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((previous) => !previous)}
            className="flex items-center gap-2 rounded-xl border bg-white px-4 py-2.5 text-sm font-medium shadow-sm"
          >
            <SlidersHorizontal size={16} />
            {mobileFiltersOpen ? "Hide Filters" : "Show Filters"}

            {hasActiveFilters && (
              <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-white">
                !
              </span>
            )}
          </button>

          {mobileFiltersOpen && (
            <div className="mt-3 rounded-xl bg-white p-4 shadow-sm">{filtersPanel}</div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
          <aside className="sticky top-4 hidden h-fit rounded-2xl bg-white p-5 shadow-sm lg:block">
            {filtersPanel}
          </aside>

          <div>
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-600">
                {showInitialLoading ? (
                  "Loading courses..."
                ) : filteredCourses.length > 0 ? (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                      {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                      {Math.min(currentPage * ITEMS_PER_PAGE, filteredCourses.length)}
                    </span>{" "}
                    of{" "}
                    <span className="font-semibold text-gray-900">
                      {filteredCourses.length}
                    </span>{" "}
                    courses
                  </>
                ) : (
                  <>Showing 0 courses</>
                )}
              </p>

              {getHasMoreOffset(nextOffset) && !selectedCountryId && !coursesLoading && (
                <button
                  type="button"
                  onClick={handleLoadMore}
                  className="w-fit text-sm font-semibold text-primary hover:underline"
                >
                  Load more courses
                </button>
              )}
            </div>

            {errorMessage && (
              <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                <AlertCircle size={16} className="shrink-0" />
                {errorMessage}
              </div>
            )}

            {showInitialLoading && (
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <CourseCardSkeleton key={index} />
                ))}
              </div>
            )}

            {!showInitialLoading && filteredCourses.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-3 rounded-3xl bg-white py-20 text-center shadow-sm">
                <GraduationCap size={48} className="text-gray-200" />
                <p className="font-medium text-gray-500">No courses found.</p>
                <p className="max-w-md text-sm text-gray-400">
                  Choose another category/country/university or clear filters.
                </p>

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="text-sm text-primary underline"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}

            {paginatedCourses.length > 0 && (
              <div className="space-y-5">
                {paginatedCourses.map((course, index) => (
                  <CourseCard
                    key={course.id || course.course_id || `${getCourseName(course) || "course"}-${index}`}
                    course={course}
                    imageBasePath={imageBasePath}
                  />
                ))}
              </div>
            )}

            {coursesLoading && courses.length > 0 && (
              <p className="mt-6 text-center text-sm text-gray-500">
                Loading courses...
              </p>
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
