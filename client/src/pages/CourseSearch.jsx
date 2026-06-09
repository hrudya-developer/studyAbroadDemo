import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  Globe2,
  GraduationCap,
  Landmark,
  ArrowRight,
  Search,
} from "lucide-react";

import { fetchCountries } from "../redux/slices/countrySlice";
import { fetchUniversitiesByCountry } from "../redux/slices/universitySlice";
import { fetchPopularCourses } from "../redux/slices/courseSlice";
import {
  fetchCourseSearchResults,
  clearCourseSearchResults,
} from "../redux/slices/courseSearchSlice";

import mapBg from "../assets/mapBg.png";

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "48px",
    borderRadius: "12px",
    borderColor: state.isFocused ? "#dc2626" : "#e5e7eb",
    boxShadow: state.isFocused ? "0 0 0 1px #dc2626" : "none",
    "&:hover": {
      borderColor: "#dc2626",
    },
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: 200,
  }),
};

const getMappedMainCourseId = (courseName) => {
  const name = String(courseName || "").toLowerCase();

  if (
    name.includes("mbbs") ||
    name.includes("medicine") ||
    name.includes("medical") ||
    name.includes("nursing") ||
    name.includes("health")
  ) {
    return "9";
  }

  return "";
};

export default function CourseSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { uid } = useSelector((state) => state.auth || {});
  const safeUid = uid ?? 0;

  const { countries = [], loading: countriesLoading } = useSelector(
    (state) => state.countryData || {}
  );

  const { universities = [], loading: universitiesLoading } = useSelector(
    (state) => state.universityData || {}
  );

  const { popularCourses = [], loading: coursesLoading } = useSelector(
    (state) => state.courseData || {}
  );

  const {
    results: universityCourses = [],
    loading: universityCoursesLoading,
    error: universityCoursesError,
  } = useSelector((state) => state.courseSearch || {});

  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [selectedUniversityId, setSelectedUniversityId] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    dispatch(fetchCountries(safeUid));
    dispatch(fetchPopularCourses(safeUid));
  }, [dispatch, safeUid]);

  useEffect(() => {
    setSelectedUniversityId("");

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

  const getCountryId = (item) =>
    item?.id || item?.d_id || item?.country_id || "";

  const getCountryName = (item) =>
    item?.country || item?.name || item?.country_name || "Country";

  const getUniversityId = (item) =>
    item?.id || item?.u_id || item?.university_id || "";

  const getUniversityName = (item) =>
    item?.name || item?.university || item?.university_name || "University";

  const getCourseName = (item) =>
    item?.course ||
    item?.course_name ||
    item?.main_course ||
    item?.name ||
    item?.title ||
    "Course";

  const countryOptions = countries.map((item) => ({
    value: String(getCountryId(item)),
    label: getCountryName(item),
  }));

  const courseOptions = popularCourses.map((item) => ({
    value: String(
      item?.id || item?.course_id || item?.main_course_id || item?.c_id || ""
    ),
    apiCourseId: String(
      item?.c_id || item?.main_course_id || item?.course_id || item?.id || ""
    ),
    label: getCourseName(item),
    raw: item,
  }));

  const universityOptions = universities.map((item) => ({
    value: String(getUniversityId(item)),
    label: getUniversityName(item),
  }));

  const resetSearchResults = () => {
    setSearched(false);
    dispatch(clearCourseSearchResults());
  };

  const handleSearch = () => {
    setSearched(true);
    dispatch(clearCourseSearchResults());

    const selectedCourse = courseOptions.find(
      (option) => option.value === selectedCourseId
    );

    const mappedCourseId = getMappedMainCourseId(selectedCourse?.label);

    const finalCourseId =
      mappedCourseId || selectedCourse?.apiCourseId || selectedCourseId || "";

    dispatch(
      fetchCourseSearchResults({
        uid: safeUid,
        countryId: selectedCountryId || "",
        universityId: selectedUniversityId || "",
        courseId: finalCourseId,
        keyword: selectedCourse?.label || "",
        keytype: "course",
        offset: 0,
      })
    );
  };

  const handleViewCourse = (course) => {
    const courseId = course?.id || course?.course_id || course?.c_id;

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
    selectedCountryId || selectedUniversityId || selectedCourseId;

  return (
    <section className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div
        className="relative z-10 mx-auto max-w-7xl bg-no-repeat"
        style={{ backgroundImage: `url(${mapBg})` }}
      >
        <div className="text-center">
          <div className="mb-6 grid place-content-center">
            <span className="rounded-full bg-blue-50 p-5 shadow-md">
              <GraduationCap className="size-10 text-secondary" />
            </span>
          </div>

          <h1 className="text-2xl font-bold text-[#071d3a] sm:text-4xl">
            Find the <span className="text-red-600">Perfect Course</span>
          </h1>

          <p className="mb-10 mt-3 text-sm text-gray-500 sm:text-base">
            Select country, university, or course and view matching courses.
          </p>
        </div>

        <div className="rounded-3xl bg-white px-5 py-8 shadow-[0_15px_45px_rgba(0,0,0,0.08)] ring-1 ring-gray-100 sm:px-8 lg:px-12">
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
                  resetSearchResults();
                }}
                options={countryOptions}
                placeholder={countriesLoading ? "Loading..." : "Select Country"}
                isLoading={countriesLoading}
                isSearchable
                maxMenuHeight={200}
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
                  resetSearchResults();
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
                maxMenuHeight={200}
                styles={selectStyles}
              />
            </DropdownBox>

            <DropdownBox icon={GraduationCap} label="Course">
              <Select
                value={
                  courseOptions.find(
                    (option) => option.value === selectedCourseId
                  ) || null
                }
                onChange={(option) => {
                  setSelectedCourseId(option?.value || "");
                  resetSearchResults();
                }}
                options={courseOptions}
                placeholder={coursesLoading ? "Loading..." : "Select Course"}
                isLoading={coursesLoading}
                isSearchable
                maxMenuHeight={200}
                styles={selectStyles}
              />
            </DropdownBox>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              type="button"
              disabled={!hasSelection || universityCoursesLoading}
              onClick={handleSearch}
              className="flex items-center gap-3 rounded-xl bg-red-600 px-8 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-red-200 transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50 sm:px-12 sm:text-base"
            >
              {universityCoursesLoading ? "Searching..." : "Find Search Results"}
              <Search className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-10">
          {universityCoursesLoading && (
            <p className="text-center text-sm font-semibold text-gray-600">
              Searching courses...
            </p>
          )}

          {universityCoursesError && (
            <p className="text-center text-sm font-semibold text-red-600">
              {universityCoursesError}
            </p>
          )}

          {searched &&
            !universityCoursesLoading &&
            universityCourses.length === 0 && (
              <p className="text-center text-sm font-semibold text-gray-500">
                No courses found.
              </p>
            )}

          {universityCourses.length > 0 && (
            <>
              <p className="mb-4 text-sm font-semibold text-gray-600">
                Showing {universityCourses.length} courses
              </p>

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {universityCourses.map((course, index) => (
                  <div
                    key={course?.id || course?.course_id || course?.c_id || index}
                    className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <h3 className="text-md font-bold text-primary">
                      {getCourseName(course)}
                    </h3>

                    <p className="mt-2 text-sm text-gray-500">
                      {course?.university ||
                        course?.university_name ||
                        "University not available"}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      {course?.country ||
                        course?.country_name ||
                        "Country not available"}
                    </p>

                    <button
                      type="button"
                      onClick={() => handleViewCourse(course)}
                      className="mt-5 flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary"
                    >
                      View Details
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function DropdownBox({ icon: Icon, label, children }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-sm font-bold text-gray-700">
        <Icon className="h-5 w-5 text-red-600" />
        {label}
      </label>

      {children}
    </div>
  );
}