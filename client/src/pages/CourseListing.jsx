import React, { useCallback, useEffect, useMemo, useState } from "react";
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
} from "lucide-react";

import courseListBg from "../assets/courseListBg.png";
import { fetchCountries } from "../redux/slices/countrySlice";
import {
  fetchUniversitiesByCountry,
  clearUniversities,
} from "../redux/slices/universitySlice";

const API_KEY = "overseas@Miak2023";
const uid = 0;
const ITEMS_PER_PAGE = 5;
const MAX_AUTO_FETCH_PAGES = 50;

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
  country?.name || country?.country || country?.title || country?.country_name || "";

const getCountryId = (country) =>
  country?.id || country?.country_id || country?.c_id || country?.cid || "";

const getUniversityLabel = (university) =>
  university?.name ||
  university?.university ||
  university?.title ||
  university?.university_name ||
  university?.college ||
  "";

const getUniversityId = (university) =>
  university?.id || university?.university_id || university?.u_id || university?.uid || "";

const getUniversityLogo = (university) =>
  getValue(university, [
    "logo",
    "image",
    "image_name",
    "university_logo",
    "university_image",
    "university_image_name",
    "photo",
  ]);

const getCourseName = (course) =>
  getValue(course, ["course", "course_name", "name", "title", "course_title"]);

const getCourseCountry = (course) => getValue(course, ["country", "country_name"]);

const getCourseUniversity = (course) =>
  getValue(course, ["university", "university_name", "college", "university_title"]);

const getCourseUniversityId = (course) =>
  getValue(course, ["university_id", "u_id", "uid", "college_id"]);

const getCourseStudyArea = (course) =>
  getValue(course, ["main_course", "study_area", "category", "main_course_name"]);

const getCourseLevel = (course) => getValue(course, ["level", "program", "course_level"]);
const getCourseDuration = (course) => getValue(course, ["duration", "course_duration"]);
const getCourseIntakes = (course) => getValue(course, ["intakes", "intake"]);

const getHasMoreOffset = (offset) =>
  offset !== null && offset !== undefined && offset !== "" && String(offset) !== "0";

const getCourseArrayFromResponse = (result) => {
  if (Array.isArray(result?.course)) return result.course;
  if (Array.isArray(result?.courses)) return result.courses;
  if (Array.isArray(result?.data)) return result.data;
  if (Array.isArray(result?.result)) return result.result;
  return [];
};

const getImageBasePathFromResponse = (result) =>
  result?.university_image_path ||
  result?.universities_image_path ||
  result?.course_image_path ||
  result?.maincourse_image_path ||
  result?.image_path ||
  "";

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

async function fetchCoursesFromApi({ countryId, universityId = "", offset = 0 }) {
  const formData = new FormData();
  formData.append("api", API_KEY);
  formData.append("uid", uid);
  formData.append("c_id", countryId || "");
  formData.append("u_id", universityId || "");
  formData.append("offset", offset || 0);

  const response = await fetch(
    "https://overseas.technocitysolutions.com/public/api/getAllUniversityCoursesLatest",
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch courses");
  }

  const result = await response.json();

  return {
    courses: getCourseArrayFromResponse(result),
    nextOffset: result?.nextoffset ?? result?.nextOffset ?? null,
    imageBasePath: getImageBasePathFromResponse(result),
    raw: result,
  };
}

function FilterSelect({ label, value, onChange, options = [], loading = false, disabled = false }) {
  return (
    <div className="border-b border-gray-200 py-4 last:border-0">
      <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2 block">
        {label}
      </label>

      <div className="relative">
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
          disabled={loading || disabled}
          className="w-full h-10 rounded-lg border border-gray-200 bg-white px-3 pr-8 outline-none text-sm appearance-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <option value="">{loading ? "Loading..." : `All ${label}`}</option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
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
    <div className="bg-white rounded-3xl shadow-sm p-6 animate-pulse">
      <div className="grid lg:grid-cols-[96px_1fr_200px] gap-6">
        <div className="w-24 h-24 rounded-xl bg-gray-200" />
        <div className="space-y-3">
          <div className="h-4 w-20 bg-gray-200 rounded-full" />
          <div className="h-6 w-3/4 bg-gray-200 rounded" />
          <div className="h-4 w-1/2 bg-gray-200 rounded" />
          <div className="grid md:grid-cols-2 gap-2 mt-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="h-4 bg-gray-100 rounded" />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-3 justify-center items-end">
          <div className="h-11 w-36 bg-gray-200 rounded-xl" />
          <div className="w-12 h-12 bg-gray-100 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

function CourseCard({ course, imageBasePath = "", universityLogoUrl = "" }) {
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
  const courseLogoUrl = buildImageUrl(imageBasePath, getCourseLogo(course));
  const logoUrl = courseLogoUrl || universityLogoUrl;

  return (
    <div className="bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 p-6 group">
      <div className="grid lg:grid-cols-[96px_1fr_200px] gap-6">
        <div className="flex justify-center lg:justify-start">
          <div className="w-24 h-24 rounded-xl border bg-white flex items-center justify-center overflow-hidden group-hover:bg-primary/5 transition">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={university || courseName || "Course logo"}
                className="w-full h-full object-contain p-2"
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
            <span className="inline-block px-3 py-1 text-xs rounded-full bg-primary/10 text-primary font-medium">
              {level}
            </span>
          )}

          <h3 className="text-lg font-bold text-gray-900 mt-2 leading-snug">
            {courseName || "Untitled Course"}
          </h3>

          <p className="font-medium text-gray-700 mt-1 text-sm">
            {university || "University not available"}
          </p>

          {country && (
            <p className="text-primary text-sm mt-1">
              <Globe size={13} className="inline mr-1 -mt-0.5" />
              {country}
            </p>
          )}

          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mt-4 text-sm text-gray-600">
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

        <div className="flex flex-row lg:flex-col justify-center lg:justify-center items-center lg:items-end gap-3">
          <button className="bg-primary text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-primary/90 active:scale-95 transition-all text-sm">
            View Course
            <ArrowRight size={16} />
          </button>

          <button
            type="button"
            onClick={() => setLiked((previous) => !previous)}
            className={`w-11 h-11 rounded-xl border flex items-center justify-center transition ${
              liked ? "bg-red-50 border-red-300 text-red-500" : "hover:bg-gray-50"
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
  const pages = useMemo(() => {
    const result = [];

    if (totalPages <= 7) {
      for (let page = 1; page <= totalPages; page += 1) result.push(page);
      return result;
    }

    result.push(1);
    if (currentPage > 3) result.push("...");

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let page = start; page <= end; page += 1) result.push(page);

    if (currentPage < totalPages - 2) result.push("...");
    result.push(totalPages);

    return result;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-full border flex items-center justify-center disabled:opacity-30 hover:bg-gray-50 transition"
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span
            key={`ellipsis-${index}`}
            className="w-10 h-10 flex items-center justify-center text-gray-400"
          >
            ...
          </span>
        ) : (
          <button
            type="button"
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 rounded-full text-sm font-medium transition ${
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
        className="w-10 h-10 rounded-full border flex items-center justify-center disabled:opacity-30 hover:bg-gray-50 transition"
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

export default function CourseListing() {
  const dispatch = useDispatch();

  const { countries = [], loading: countriesLoading } = useSelector(
    (state) => state.countryData || {}
  );

  const {
    universities = [],
    loading: universitiesLoading,
    universityImagePath = "",
  } = useSelector((state) => state.universityData || {});

  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedUniversityId, setSelectedUniversityId] = useState("");
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(false);
  const [coursesError, setCoursesError] = useState("");
  const [nextOffset, setNextOffset] = useState(null);
  const [imageBasePath, setImageBasePath] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCountries(uid));
  }, [dispatch]);

  useEffect(() => {
    if (!selectedCountryId) {
      dispatch(clearUniversities());
      setSelectedUniversityId("");
      setCurrentPage(1);
      return;
    }

    setSelectedUniversityId("");
    setCourses([]);
    setNextOffset(null);
    setImageBasePath("");
    setCoursesError("");
    setCurrentPage(1);

    dispatch(
      fetchUniversitiesByCountry({
        uid,
        id: selectedCountryId,
        offset: 0,
        keyword: "alluniversities",
      })
    );
  }, [dispatch, selectedCountryId]);

  const loadCourses = useCallback(
    async ({ append = false, offset = 0 } = {}) => {
      try {
        setCoursesLoading(true);
        setCoursesError("");

        let result = await fetchCoursesFromApi({
          countryId: selectedCountryId,
          universityId: selectedUniversityId,
          offset,
        });

        const allFetchedCourses = [...result.courses];
        let lastImageBasePath = result.imageBasePath || "";
        let offsetToFetch = result.nextOffset;
        let pageCount = 1;

        while (getHasMoreOffset(offsetToFetch) && pageCount < MAX_AUTO_FETCH_PAGES) {
          result = await fetchCoursesFromApi({
            countryId: selectedCountryId,
            universityId: selectedUniversityId,
            offset: offsetToFetch,
          });

          allFetchedCourses.push(...result.courses);
          lastImageBasePath = result.imageBasePath || lastImageBasePath;
          offsetToFetch = result.nextOffset;
          pageCount += 1;
        }

        setCourses((previousCourses) =>
          append ? [...previousCourses, ...allFetchedCourses] : allFetchedCourses
        );
        setNextOffset(getHasMoreOffset(offsetToFetch) ? offsetToFetch : null);
        setImageBasePath(lastImageBasePath);
      } catch (error) {
        console.error("Course fetch error:", error);
        setCoursesError(error?.message || "Failed to fetch courses");
        if (!append) setCourses([]);
        setNextOffset(null);
        setImageBasePath("");
      } finally {
        setCoursesLoading(false);
      }
    },
    [selectedCountryId, selectedUniversityId]
  );

  useEffect(() => {
    loadCourses({ append: false, offset: 0 });
  }, [selectedCountryId, selectedUniversityId, loadCourses]);

  const selectedCountryName = useMemo(() => {
    const found = countries.find(
      (country) => String(getCountryId(country)) === String(selectedCountryId)
    );
    return getCountryLabel(found);
  }, [countries, selectedCountryId]);

  const derivedUniversitiesFromCourses = useMemo(() => {
    const map = new Map();

    courses.forEach((course) => {
      const id = getCourseUniversityId(course);
      const label = getCourseUniversity(course);

      if (id && label && !map.has(String(id))) {
        map.set(String(id), { value: String(id), label });
      }
    });

    return Array.from(map.values()).sort((a, b) => a.label.localeCompare(b.label));
  }, [courses]);

  const selectedUniversity = useMemo(() => {
    return universities.find(
      (university) => String(getUniversityId(university)) === String(selectedUniversityId)
    );
  }, [universities, selectedUniversityId]);

  const selectedUniversityName = useMemo(() => {
    return (
      getUniversityLabel(selectedUniversity) ||
      derivedUniversitiesFromCourses.find((university) => university.value === String(selectedUniversityId))
        ?.label ||
      ""
    );
  }, [derivedUniversitiesFromCourses, selectedUniversity, selectedUniversityId]);

  const selectedUniversityLogoUrl = useMemo(() => {
    return buildImageUrl(universityImagePath, getUniversityLogo(selectedUniversity));
  }, [selectedUniversity, universityImagePath]);

  const filteredCourses = courses;
  const totalPages = Math.ceil(filteredCourses.length / ITEMS_PER_PAGE);

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCountryId, selectedUniversityId]);

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const handleCountryChange = (countryId) => {
    setSelectedCountryId(countryId);
  };

  const handleUniversityChange = (universityId) => {
    setSelectedUniversityId(universityId);
    setCurrentPage(1);
  };

  const handlePageChange = useCallback(
    (page) => {
      const safeTotalPages = Math.max(totalPages, 1);
      const nextPage = Math.max(1, Math.min(page, safeTotalPages));
      setCurrentPage(nextPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [totalPages]
  );

  const clearFilters = () => {
    setSelectedCountryId("");
    setSelectedUniversityId("");
    setCurrentPage(1);
  };

  const loadMore = () => {
    if (!getHasMoreOffset(nextOffset) || coursesLoading) return;
    loadCourses({ append: true, offset: nextOffset });
  };

  const hasActiveFilters = Boolean(selectedCountryId || selectedUniversityId);

  const countryOptions = countries
    .map((country) => ({
      value: String(getCountryId(country)),
      label: getCountryLabel(country),
    }))
    .filter((option) => option.value && option.label);

  const universityOptions = selectedCountryId
    ? universities
        .map((university) => ({
          value: String(getUniversityId(university)),
          label: getUniversityLabel(university),
        }))
        .filter((option) => option.value && option.label)
    : derivedUniversitiesFromCourses;

  const filtersPanel = (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold flex items-center gap-2 text-gray-800">
          <SlidersHorizontal size={16} />
          Filters
        </h3>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={clearFilters}
            className="text-primary text-sm flex items-center gap-1 hover:underline"
          >
            <X size={13} /> Clear all
          </button>
        )}
      </div>

      <FilterSelect
        label="Country"
        value={selectedCountryId}
        onChange={handleCountryChange}
        options={countryOptions}
        loading={countriesLoading}
      />

      <FilterSelect
        label="University"
        value={selectedUniversityId}
        onChange={handleUniversityChange}
        options={universityOptions}
        loading={universitiesLoading}
        disabled={false}
      />
    </>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <section
        className="relative bg-cover bg-center h-[400px]"
        style={{ backgroundImage: `url('${courseListBg}')` }}
      >
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-12 py-16 flex flex-col gap-5">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-900 mt-6">
            Find the <span className="text-primary">Perfect Course</span>
          </h1>

          <p className="text-gray-700 text-base lg:text-lg">
            Browse courses by country and university
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <p className="text-gray-500">Countries</p>
    <h3 className="text-3xl font-bold">{countries.length}</h3>
  </div>

  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <p className="text-gray-500">Universities</p>
    <h3 className="text-3xl font-bold">{universityOptions.length}</h3>
  </div>

  <div className="bg-white rounded-2xl p-6 shadow-sm">
    <p className="text-gray-500">Courses</p>
    <h3 className="text-3xl font-bold">{courses.length}</h3>
  </div>
</div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="lg:hidden mb-4">
          <button
            type="button"
            onClick={() => setMobileFiltersOpen((previous) => !previous)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border bg-white text-sm font-medium shadow-sm"
          >
            <SlidersHorizontal size={16} />
            {mobileFiltersOpen ? "Hide Filters" : "Show Filters"}
            {hasActiveFilters && (
              <span className="ml-1 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
                !
              </span>
            )}
          </button>

          {mobileFiltersOpen && (
            <div className="mt-3 bg-white rounded-xl shadow-sm p-4">{filtersPanel}</div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
          <aside className="hidden lg:block bg-white rounded-2xl shadow-sm p-5 h-fit sticky top-4">
            {filtersPanel}
          </aside>

          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
              <p className="text-sm text-gray-600">
                {coursesLoading && courses.length === 0 ? (
                  "Loading courses..."
                ) : filteredCourses.length > 0 ? (
                  <>
                    Showing{" "}
                    <span className="font-semibold text-gray-900">
                      {(currentPage - 1) * ITEMS_PER_PAGE + 1}-
                      {Math.min(currentPage * ITEMS_PER_PAGE, filteredCourses.length)}
                    </span>{" "}
                    of <span className="font-semibold text-gray-900">{filteredCourses.length}</span>{" "}
                    courses{selectedCountryName ? ` in ${selectedCountryName}` : " in All Countries"}
                  {selectedUniversityName
  ? `, ${selectedUniversityName}`
  : ", All Universities"}
                  </>
                ) : (
                  <>Showing 0 courses{selectedCountryName ? ` in ${selectedCountryName}` : " in All Countries"}</>
                )}
              </p>

              {getHasMoreOffset(nextOffset) && !coursesLoading && (
                <button
                  type="button"
                  onClick={loadMore}
                  className="text-sm text-primary font-semibold hover:underline w-fit"
                >
                  Load remaining courses
                </button>
              )}
            </div>

            {coursesError && (
              <div className="flex items-center gap-3 bg-red-50 text-red-600 border border-red-200 rounded-xl px-4 py-3 mb-6 text-sm">
                <AlertCircle size={16} className="shrink-0" />
                {coursesError}
              </div>
            )}

            {coursesLoading && courses.length === 0 && (
              <div className="space-y-6">
                {[...Array(3)].map((_, index) => (
                  <CourseCardSkeleton key={index} />
                ))}
              </div>
            )}

            {!coursesLoading && filteredCourses.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-3 bg-white rounded-3xl shadow-sm">
                <GraduationCap size={48} className="text-gray-200" />
                <p className="text-gray-500 font-medium">No courses found.</p>
                <p className="text-sm text-gray-400 max-w-md">
Try another country/university filter, or clear filters to show all countries, universities, and courses.
                </p>
                {hasActiveFilters && (
                  <button type="button" onClick={clearFilters} className="text-primary text-sm underline">
                    Clear university filter
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
                    universityLogoUrl={selectedUniversityLogoUrl}
                  />
                ))}
              </div>
            )}

            {coursesLoading && courses.length > 0 && (
              <p className="text-center text-sm text-gray-500 mt-6">Loading more courses...</p>
            )}

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
          </div>
        </div>
      </section>
    </div>
  );
}
