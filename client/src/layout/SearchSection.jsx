import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  GraduationCap,
  School,
  Search,
  ArrowRight,
} from "lucide-react";

import { fetchCountries } from "../redux/slices/countrySlice";
import { fetchUniversitiesByCountry } from "../redux/slices/universitySlice";
import {
  fetchPopularCourses,
  fetchUniversityCourses,
  clearUniversityCourses,
} from "../redux/slices/courseSlice";

const SearchSection = () => {
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
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedUniversityId, setSelectedUniversityId] = useState("");
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
    item?.country || item?.name || item?.country_name || "Destination";

  const getUniversityId = (item) =>
    item?.id || item?.u_id || item?.university_id || "";

  const getUniversityName = (item) =>
    item?.name || item?.university || item?.university_name || "University";

  const getCourseId = (item) => item?.c_id || item?.id || item?.course_id || "";

  const getCourseName = (item) =>
    item?.course ||
    item?.course_name ||
    item?.main_course ||
    item?.name ||
    item?.title ||
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

  const hasSelection = selectedCountryId || selectedCourseId || selectedUniversityId;

  return (
    <section className="py-0">
      <div className="mx-auto max-w-7xl bg-secondary px-3 sm:px-5 md:px-8">
        <div className="py-10">
          <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <SelectField icon={MapPin}>
              <select
                value={selectedCountryId}
                onChange={(event) => {
                  setSelectedCountryId(event.target.value);
                  setSelectedUniversityId("");
                  setSearched(false);
                  dispatch(clearUniversityCourses());
                }}
                className="w-full cursor-pointer rounded-lg border border-white bg-secondary p-3 text-sm font-semibold text-white outline-none" style={{textOverflow:"ellipsis"}}
              >
                <option value="" className="text-white">
                  {countriesLoading ? "Loading..." : "Select Destination"}
                </option>

                {countries.map((item) => (
                  <option
                    key={getCountryId(item)}
                    value={getCountryId(item)}
                    className="text-white"
                  >
                    {getCountryName(item)}
                  </option>
                ))}
              </select>
            </SelectField>

            <SelectField icon={GraduationCap}>
              <select
                value={selectedCourseId}
                onChange={(event) => {
                  setSelectedCourseId(event.target.value);
                  setSearched(false);
                  dispatch(clearUniversityCourses());
                }}
                className="w-full cursor-pointer rounded-lg border border-white bg-secondary p-3 text-sm font-semibold text-white outline-none" style={{textOverflow:"ellipsis"}}
              >
                <option value="" className="text-white">
                  {coursesLoading ? "Loading..." : "Select Course"}
                </option>

                {popularCourses.map((item) => (
                  <option
                    key={getCourseId(item)}
                    value={getCourseId(item)}
                    className="text-white"
                  >
                    {getCourseName(item)}
                  </option>
                ))}
              </select>
            </SelectField>

            <SelectField icon={School}>
              <select
                value={selectedUniversityId}
                onChange={(event) => {
                  setSelectedUniversityId(event.target.value);
                  setSearched(false);
                  dispatch(clearUniversityCourses());
                }}
                disabled={!selectedCountryId}
                className="w-full cursor-pointer rounded-lg border border-white bg-secondary p-3 text-sm font-semibold text-white outline-none disabled:cursor-not-allowed disabled:opacity-60" style={{textOverflow:"ellipsis"}}
              >
                <option value="" className="text-white">
                  {!selectedCountryId
                    ? "Select destination first"
                    : universitiesLoading
                    ? "Loading..."
                    : "Select University"}
                </option>

                {universities.map((item) => (
                  <option
                    key={getUniversityId(item)}
                    value={getUniversityId(item)}
                    className="text-white"
                  >
                    {getUniversityName(item)}
                  </option>
                ))}
              </select>
            </SelectField>

            <div className="w-full">
              <button
                type="button"
                disabled={!hasSelection || universityCoursesLoading}
                onClick={handleSearch}
                className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {universityCoursesLoading ? "Searching..." : "Search"}
                <Search size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-7xl px-3 sm:px-5 md:px-8">
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
                    {course?.country || course?.country_name || "Country not available"}
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
    </section>
  );
};

function SelectField({ icon: Icon, children }) {
  return (
    <div className="flex w-full items-center gap-4">
      <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-primary">
        <Icon className="text-white" size={20} />
      </div>

      <div className="flex-1">{children}</div>
    </div>
  );
}

export default SearchSection;