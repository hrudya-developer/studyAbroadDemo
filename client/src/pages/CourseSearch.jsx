import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  Globe2,
  GraduationCap,
  Landmark,
  ArrowRight,
  Search,
  School2,
  MapPinCheck,
  GraduationCapIcon,
  ChevronLeft,
  ChevronRight,
  X,
  CircleX,
} from "lucide-react";

import { fetchCountries } from "../redux/slices/countrySlice";
import { fetchUniversitiesByCountry } from "../redux/slices/universitySlice";
import {
  fetchUniversityMainCoursesByUid,
  fetchAllUniversityCoursesLatest,
  clearAllUniversityCourses,
} from "../redux/slices/courseSlice";

import courseBg from "../assets/coursesBg.png";
import PopularCoursesPublic from "./PopularCoursesPublic";

const ITEMS_PER_PAGE = 6;

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "46px",
    borderRadius: "12px",
    fontSize: "14px",
    borderColor: state.isFocused ? "#c01f53" : "#e5e7eb",
    boxShadow: state.isFocused ? "0 0 0 1px #c01f53" : "none",
    "&:hover": { borderColor: "#c01f53" },
  }),
  menu: (base) => ({ ...base, zIndex: 9999 }),
  menuList: (base) => ({ ...base, maxHeight: 220 }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#c01f53"
      : state.isFocused
      ? "#f3f4f6"
      : "#ffffff",
    color: state.isSelected ? "#ffffff" : "#111827",
    cursor: "pointer",
  }),
};

export default function CourseSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const resultRef = useRef(null);

  const { uid } = useSelector((state) => state.auth || {});
  const safeUid = uid ?? 0;

  const { countries = [], loading: countriesLoading } = useSelector(
    (state) => state.countryData || {}
  );

  const { universities = [], loading: universitiesLoading } = useSelector(
    (state) => state.universityData || {}
  );

  const {
    universityMainCourses = [],
    universityMainCoursesLoading = false,
    allUniversityCourses = [],
    allUniversityCoursesLoading = false,
  } = useSelector((state) => state.courseData || {});

  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedUniversityId, setSelectedUniversityId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [searched, setSearched] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchCountries(safeUid));
  }, [dispatch, safeUid]);

  useEffect(() => {
    setSelectedUniversityId("");
    setSelectedCourseId("");
    setSearched(false);
    setCurrentPage(1);
    dispatch(clearAllUniversityCourses());

    if (!selectedCountryId) return;

    dispatch(
      fetchUniversitiesByCountry({
        uid: safeUid,
        id: selectedCountryId,
        offset: 0,
        keyword: "alluniversities",
      })
    );
  }, [dispatch, safeUid, selectedCountryId]);

  useEffect(() => {
    setSelectedCourseId("");
    setSearched(false);
    setCurrentPage(1);
    dispatch(clearAllUniversityCourses());

    if (!selectedUniversityId) return;

    dispatch(
      fetchUniversityMainCoursesByUid({
        universityId: selectedUniversityId,
        uid: safeUid,
      })
    );
  }, [dispatch, safeUid, selectedUniversityId]);

  const getCountryId = (item) =>
    String(item?.id || item?.d_id || item?.country_id || "");

  const getCountryName = (item) =>
    item?.country || item?.name || item?.country_name || "Country";

  const getUniversityId = (item) =>
    String(item?.id || item?.u_id || item?.university_id || "");

  const getUniversityName = (item) =>
    item?.name || item?.university || item?.university_name || "University";

  const getCourseId = (item) =>
    String(
      item?.c_id ||
        item?.id ||
        item?.course_id ||
        item?.main_course_id ||
        item?.uc_id ||
        ""
    );

  const getCourseName = (item) =>
    item?.course ||
    item?.course_name ||
    item?.main_course ||
    item?.name ||
    item?.main_course_name ||
    item?.title ||
    "Course";

  const getResultCourseId = (course) =>
    String(
      course?.id || course?.course_id || course?.c_id || course?.uc_id || ""
    );

  const countryOptions = useMemo(
    () =>
      countries
        .map((item) => ({
          value: getCountryId(item),
          label: getCountryName(item),
        }))
        .filter((item) => item.value),
    [countries]
  );

  const universityOptions = useMemo(
    () =>
      universities
        .map((item) => ({
          value: getUniversityId(item),
          label: getUniversityName(item),
        }))
        .filter((item) => item.value),
    [universities]
  );

  const mainCourseOptions = useMemo(
    () =>
      universityMainCourses
        .map((item) => ({
          value: getCourseId(item),
          label: getCourseName(item),
        }))
        .filter((item) => item.value && item.label && item.label !== "Course"),
    [universityMainCourses]
  );

  const selectedMainCourseOption = mainCourseOptions.find(
    (option) => option.value === selectedCourseId
  );

  const totalPages = Math.ceil(allUniversityCourses.length / ITEMS_PER_PAGE);

  const paginatedCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return allUniversityCourses.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [allUniversityCourses, currentPage]);

  const resetResults = () => {
    setSearched(false);
    setCurrentPage(1);
    dispatch(clearAllUniversityCourses());
  };

  const handleClear = () => {
    setSelectedCountryId("");
    setSelectedUniversityId("");
    setSelectedCourseId("");
    setSearched(false);
    setCurrentPage(1);
    dispatch(clearAllUniversityCourses());
  };

  const handleSearch = () => {
    setSearched(true);
    setCurrentPage(1);
    dispatch(clearAllUniversityCourses());

    dispatch(
      fetchAllUniversityCoursesLatest({
        uid: safeUid,
        universityId: selectedUniversityId,
        courseId: selectedCourseId,
        offset: 0,
      })
    );

    setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 300);
  };

  const handleViewCourse = (course) => {
    const courseId = getResultCourseId(course);
    if (!courseId) return;

    sessionStorage.setItem("selectedCourse", JSON.stringify(course));

    navigate(`/courseDetailsOfUniv/${courseId}`, {
      state: {
        course,
        universityId:
          course?.u_id || course?.university_id || selectedUniversityId || "",
        countryId:
          course?.d_id || course?.country_id || selectedCountryId || "",
      },
    });
  };

  const hasSelection =
    selectedCountryId && selectedUniversityId && selectedCourseId;

  return (
    <section className="relative mx-auto max-w-7xl overflow-hidden bg-gray-50">
      <div
        className="relative flex h-[380px] items-center justify-center bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out sm:h-[450px] lg:h-[500px]"
        style={{ backgroundImage: `url(${courseBg})` }}
      >
        <div className="relative px-4 py-10 text-center sm:px-6 md:px-8 lg:px-10">
          <div className="max-w-2xl animate-[fadeIn_0.7s_ease-in-out]">
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Find the Perfect Course
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white sm:text-base">
              Select destination, university, and main course to view matching
              courses.
            </p>

            <a
              href="#searchArea"
              className="mx-auto my-6 inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-darkPrimary sm:text-base"
            >
              Search Courses
            </a>
          </div>
        </div>
      </div>

      <div
        id="searchArea"
        className="scroll-mt-28 relative z-1 mx-auto -mt-16 w-[92%] rounded-3xl bg-white p-4 shadow-[0_15px_45px_rgba(0,0,0,0.12)] ring-1 ring-gray-100 transition-all duration-500 ease-in-out sm:-mt-20 sm:w-[88%] sm:p-6 lg:w-[80%] lg:p-8"
      >
        <div className="grid gap-5 md:grid-cols-3">
          <DropdownBox icon={Globe2} label="Country">
            <Select
              value={
                countryOptions.find(
                  (option) => option.value === selectedCountryId
                ) || null
              }
              onChange={(option) => {
                setSelectedCountryId(option?.value || "");
                setSelectedUniversityId("");
                setSelectedCourseId("");
                resetResults();
              }}
              options={countryOptions}
              placeholder={countriesLoading ? "Loading..." : "Select Country"}
              isLoading={countriesLoading}
              isSearchable
              styles={selectStyles}
            />
          </DropdownBox>

          <DropdownBox icon={Landmark} label="University">
            <Select
              value={
                universityOptions.find(
                  (option) => option.value === selectedUniversityId
                ) || null
              }
              onChange={(option) => {
                setSelectedUniversityId(option?.value || "");
                setSelectedCourseId("");
                resetResults();
              }}
              options={universityOptions}
              placeholder={
                !selectedCountryId
                  ? "Select country first"
                  : universitiesLoading
                  ? "Loading..."
                  : "Select University"
              }
              isDisabled={!selectedCountryId}
              isLoading={universitiesLoading}
              isSearchable
              styles={selectStyles}
            />
          </DropdownBox>

          <DropdownBox icon={GraduationCap} label="Main Course">
            <Select
              value={
                mainCourseOptions.find(
                  (option) => option.value === selectedCourseId
                ) || null
              }
              onChange={(option) => {
                setSelectedCourseId(option?.value || "");
                resetResults();
              }}
              options={mainCourseOptions}
              placeholder={
                !selectedUniversityId
                  ? "Select university first"
                  : universityMainCoursesLoading
                  ? "Loading..."
                  : mainCourseOptions.length === 0
                  ? "No main courses found"
                  : "Select Main Course"
              }
              isDisabled={
                !selectedUniversityId ||
                universityMainCoursesLoading ||
                mainCourseOptions.length === 0
              }
              isLoading={universityMainCoursesLoading}
              isSearchable
              styles={selectStyles}
            />
          </DropdownBox>
        </div>

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            disabled={!hasSelection || allUniversityCoursesLoading}
            onClick={handleSearch}
            className="flex w-full items-center justify-center gap-3 rounded-xl bg-secondary px-6 py-3 text-sm font-bold tracking-wide text-white shadow-lg shadow-red-200 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:px-10"
          >
            {allUniversityCoursesLoading ? "Searching..." : "Find Courses"}
            <Search className="h-5 w-5" />
          </button>

          {searched && (
            <button
              type="button"
              onClick={handleClear}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-darkPrimary px-6 py-3 text-sm font-bold text-white transition-all duration-300 ease-in-out hover:-translate-y-1 hover:bg-primary sm:w-auto sm:px-8"
            >
            
              Clear
             
                <CircleX className="h-5 w-5" />
            </button>
          )}
        </div>

        <div ref={resultRef} className="mt-10 scroll-mt-28">
          {allUniversityCoursesLoading && (
            <div className="animate-pulse rounded-2xl bg-gray-50 py-10 text-center text-sm font-semibold text-gray-600">
              Searching courses...
            </div>
          )}

          {!allUniversityCoursesLoading &&
            searched &&
            allUniversityCourses.length === 0 && (
              <p className="rounded-2xl bg-gray-50 py-10 text-center text-sm font-semibold text-gray-500 ring-1 ring-gray-100 transition-all duration-500 ease-in-out">
                No courses found under this main course.
              </p>
            )}

          {!allUniversityCoursesLoading && allUniversityCourses.length > 0 && (
            <div className="animate-[fadeIn_0.45s_ease-in-out]">
              <div className="mb-6 flex flex-col gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="flex items-center gap-3 text-xl font-bold text-darkPrimary sm:text-2xl">
                  <span className="grid size-10 place-content-center rounded-xl bg-primary">
                    <GraduationCapIcon className="text-white" />
                  </span>
                  {selectedMainCourseOption?.label
                    ? `${selectedMainCourseOption.label} Results`
                    : "Course Results"}
                </h2>

                <p className="text-sm font-semibold text-gray-600">
                  Showing{" "}
                  <span className="text-primary">
                    {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                  </span>{" "}
                  to{" "}
                  <span className="text-primary">
                    {Math.min(
                      currentPage * ITEMS_PER_PAGE,
                      allUniversityCourses.length
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="text-primary">
                    {allUniversityCourses.length}
                  </span>{" "}
                  courses
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {paginatedCourses.map((course, index) => (
                  <div
                    key={getResultCourseId(course) || index}
                    className="rounded-2xl bg-[#f7f7f7] p-5 shadow-md ring-1 ring-gray-100 transition-all duration-300 ease-in-out hover:-translate-y-2 hover:bg-white hover:shadow-xl"
                  >
                    <h3 className="flex items-start gap-3 text-sm font-bold leading-6 text-black">
                      <span className="grid size-10 shrink-0 place-content-center rounded-lg bg-primary/10">
                        <GraduationCapIcon className="text-primary" />
                      </span>
                      {getCourseName(course)}
                    </h3>

                    <p className="mt-4 flex items-start gap-3 text-sm text-gray-700">
                      <span className="grid size-10 shrink-0 place-content-center rounded-lg bg-secondary/10">
                        <School2 className="text-secondary" />
                      </span>
                      {course?.university ||
                        course?.university_name ||
                        universityOptions.find(
                          (item) => item.value === selectedUniversityId
                        )?.label ||
                        "University not available"}
                    </p>

                    <p className="mt-4 flex items-start gap-3 text-sm text-gray-700">
                      <span className="grid size-10 shrink-0 place-content-center rounded-lg bg-darkPrimary/10">
                        <MapPinCheck className="text-darkPrimary" />
                      </span>
                      {course?.country ||
                        course?.country_name ||
                        countryOptions.find(
                          (item) => item.value === selectedCountryId
                        )?.label ||
                        "Country not available"}
                    </p>

                    <div className="mt-6 flex flex-row gap-3 sm:flex-row">
                      <button
                        type="button"
                        onClick={() => handleViewCourse(course)}
                        className="flex items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:bg-primary"
                      >
                        View
                        <ArrowRight className="h-4 w-4" />
                      </button>

                      <Link
                        to="/loginViaOtp"
                        className="flex items-center justify-center gap-2 rounded-lg bg-darkPrimary px-4 py-2 text-sm font-semibold text-white transition-all duration-300 ease-in-out hover:bg-primary"
                      >
                        Apply
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition-all duration-300 ease-in-out hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft size={16} />
                    Prev
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`grid size-9 place-content-center rounded-lg text-sm font-bold transition-all duration-300 ease-in-out ${
                        currentPage === page
                          ? "bg-primary text-white"
                          : "bg-white text-gray-700 ring-1 ring-gray-200 hover:bg-primary hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition-all duration-300 ease-in-out hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                    <ChevronRight size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <PopularCoursesPublic />
    </section>
  );
}

function DropdownBox({ icon: Icon, label, children }) {
  return (
    <div className="min-w-0 transition-all duration-300 ease-in-out">
      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-800">
        <Icon className="h-5 w-5 text-secondary" />
        {label}
      </label>
      {children}
    </div>
  );
}