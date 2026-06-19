import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import {
  MapPin,
  GraduationCap,
  School,
  Search,
  ArrowRight,
} from "lucide-react";

import { fetchCountries } from "../redux/slices/countrySlice";
import { fetchUniversitiesByCountry } from "../redux/slices/universitySlice";
import { fetchPopularCourses } from "../redux/slices/courseSlice";
import {
  fetchCourseSearchResults,
  clearCourseSearchResults,
} from "../redux/slices/courseSearchSlice";

const selectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    borderColor: "#ffffff",
    minHeight: "48px",
    boxShadow: state.isFocused ? "0 0 0 1px #ffffff" : "none",
    "&:hover": {
      borderColor: "#ffffff",
    },
  }),
  singleValue: (base) => ({
    ...base,
    color: "#ffffff",
  }),
  placeholder: (base) => ({
    ...base,
    color: "#ffffff",
  }),
  input: (base) => ({
    ...base,
    color: "#ffffff",
  }),
  menu: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: 200,
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isFocused ? "#f3f4f6" : "#ffffff",
    color: "#111827",
    cursor: "pointer",
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


const SearchSection = () => {
  const [showPopup, setShowPopup] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { uid } = useSelector((state) => state.auth || {});
  const safeUid = uid ?? 0;

  const { countries = [] } = useSelector((state) => state.countryData || {});

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

  const getCourseName = (item) =>
    item?.course ||
    item?.course_name ||
    item?.main_course ||
    item?.name ||
    item?.title ||
    "Course";

  const countryOptions = countries.map((item) => ({
    value: getCountryId(item),
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
    value: getUniversityId(item),
    label: getUniversityName(item),
  }));

  const resetSearchResults = () => {
    setSearched(false);
    dispatch(clearCourseSearchResults());
  };

 const handleSearch = () => {
  setSearched(true);
  setShowPopup(true);
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
    selectedCountryId || selectedCourseId || selectedUniversityId;

    useEffect(() => {
  if (showPopup) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [showPopup]);

  return (
    <section className="py-0">
      <div className="mx-auto max-w-7xl bg-[#181717] px-3 sm:px-5 md:px-8" data-aos="fade-up">
        <div className="py-10">
          <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <SelectField icon={MapPin}>
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
                placeholder="Select Destination"
                maxMenuHeight={200}
                styles={selectStyles}
              />
            </SelectField>

            <SelectField icon={GraduationCap}>
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
                maxMenuHeight={200}
                styles={selectStyles}
              />
            </SelectField>

            <SelectField icon={School}>
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
                    ? "Select University"
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

      {/* <div className="mx-auto mt-8 max-w-7xl px-3 sm:px-5 md:px-8">
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
      </div> */}


      {showPopup && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 px-4">
    <div className="relative max-h-[85vh] w-auto overflow-y-auto rounded-2xl bg-white p-10 shadow-2xl">
      <button
        type="button"
        onClick={() => setShowPopup(false)}
        className="absolute right-4 top-4 rounded-full bg-secondary px-3 py-1 text-lg font-bold hover:bg-primary text-white"
      >
        ×
      </button>

      <h2 className="mb-5 pr-10 text-xl font-bold text-secondary">
        Search Results
      </h2>

      {universityCoursesLoading && (
        <p className="text-center text-sm font-semibold text-black">
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
          <p className="mb-4 text-md font-semibold text-gray-600">
            Showing {universityCourses.length} courses
          </p>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {universityCourses.map((course, index) => (
              <div
                key={course?.id || course?.course_id || course?.c_id || index}
                className="rounded-2xl bg-white p-5 shadow-md ring-1 ring-gray-100"
              >
                <h3 className="text-md font-bold text-secondary">
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
                  className="mt-5 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary"
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
)}
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

