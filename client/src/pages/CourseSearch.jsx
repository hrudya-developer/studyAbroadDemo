import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Globe2, GraduationCap, Landmark, ArrowRight, Search } from "lucide-react";

import { fetchCountries } from "../redux/slices/countrySlice";
import { fetchUniversitiesByCountry } from "../redux/slices/universitySlice";
import {
  fetchPopularCourses,
  fetchUniversityCourses,
  clearUniversityCourses,
} from "../redux/slices/courseSlice";

import mapBg from "../assets/mapBg.png";

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

  const {
    popularCourses = [],
    universityCourses = [],
    loading: coursesLoading,
    universityCoursesLoading,
    universityCoursesError,
  } = useSelector((state) => state.courseData || {});

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

  const getCourseCategoryId = (item) =>
    item?.c_id || item?.id || item?.course_id || "";

  const getCourseCategoryName = (item) =>
    item?.name ||
    item?.course ||
    item?.course_name ||
    item?.main_course ||
    "Course";

  const getCourseName = (course) =>
    course?.course ||
    course?.course_name ||
    course?.name ||
    course?.title ||
    "Course";

  const handleSearch = () => {
    setSearched(true);
    dispatch(clearUniversityCourses());

    dispatch(
      fetchUniversityCourses({
        uid: safeUid,
        universityId: selectedUniversityId || "",
        courseId: selectedCourseId || "",
        offset: 0,
      })
    );
  };

  const handleViewCourse = (course) => {
    const courseId = course?.id || course?.course_id;

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

  const hasSelection = selectedCountryId || selectedUniversityId || selectedCourseId;

  return (
    <section
      className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="relative z-10 mx-auto max-w-7xl bg-no-repeat" style={{ backgroundImage: `url(${mapBg})` }}>
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
              <select
                value={selectedCountryId}
                onChange={(event) => {
                  setSelectedCountryId(event.target.value);
                  setSelectedUniversityId("");
                  setSearched(false);
                  dispatch(clearUniversityCourses());
                }}
                className="h-12 w-full rounded-xl border px-4 outline-none"
              >
                <option value="">
                  {countriesLoading ? "Loading..." : "Select Country"}
                </option>

                {countries.map((item) => (
                  <option key={getCountryId(item)} value={getCountryId(item)}>
                    {getCountryName(item)}
                  </option>
                ))}
              </select>
            </DropdownBox>

            <DropdownBox icon={Landmark} label="University">
              <select
                value={selectedUniversityId}
                onChange={(event) => {
                  setSelectedUniversityId(event.target.value);
                  setSearched(false);
                  dispatch(clearUniversityCourses());
                }}
                disabled={!selectedCountryId}
                className="h-12 w-full rounded-xl border px-4 outline-none disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="">
                  {!selectedCountryId
                    ? "Select country first"
                    : universitiesLoading
                    ? "Loading..."
                    : "Select University"}
                </option>

                {universities.map((item) => (
                  <option key={getUniversityId(item)} value={getUniversityId(item)}>
                    {getUniversityName(item)}
                  </option>
                ))}
              </select>
            </DropdownBox>

            <DropdownBox icon={GraduationCap} label="Course">
              <select
                value={selectedCourseId}
                onChange={(event) => {
                  setSelectedCourseId(event.target.value);
                  setSearched(false);
                  dispatch(clearUniversityCourses());
                }}
                className="h-12 w-full rounded-xl border px-4 outline-none"
              >
                <option value="">
                  {coursesLoading ? "Loading..." : "Select Course"}
                </option>

                {popularCourses.map((item) => (
                  <option
                    key={getCourseCategoryId(item)}
                    value={getCourseCategoryId(item)}
                  >
                    {getCourseCategoryName(item)}
                  </option>
                ))}
              </select>
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
          {universityCoursesError && (
            <p className="text-center text-sm font-semibold text-red-600">
              {universityCoursesError}
            </p>
          )}

          {searched && !universityCoursesLoading && universityCourses.length === 0 && (
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
                    key={course?.id || course?.course_id || index}
                    className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-gray-100 transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <h3 className="text-lg font-bold text-[#071d3a]">
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