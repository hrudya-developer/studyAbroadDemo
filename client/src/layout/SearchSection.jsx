import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";

import {
  MapPin,
  GraduationCap,
  School,
  Search,
  ArrowRight,
  GraduationCapIcon,
  School2,
  MapPinCheck,
} from "lucide-react";

import { fetchCountries } from "../redux/slices/countrySlice";
import { fetchUniversitiesByCountry } from "../redux/slices/universitySlice";
import {
  fetchUniversityMainCoursesByUid,
  fetchAllUniversityCoursesLatest,
  clearAllUniversityCourses,
} from "../redux/slices/courseSlice";

const selectStyles = {
  control: (base, state) => ({
    ...base,
    backgroundColor: "transparent",
    fontSize: "13px",
    fontWeight: 400,
    borderColor: "#ffffff",
    minHeight: "46px",
    boxShadow: state.isFocused ? "0 0 0 1px #ffffff" : "none",
    "&:hover": { borderColor: "#ffffff" },
  }),

  singleValue: (base) => ({
    ...base,
    color: "#ffffff",
    fontSize: "13px",
  }),

  placeholder: (base) => ({
    ...base,
    color: "#ffffff",
    fontSize: "13px",
  }),

  input: (base) => ({
    ...base,
    color: "#ffffff",
    fontSize: "13px",
  }),

  menuPortal: (base) => ({
    ...base,
    zIndex: 10,
  }),

  menu: (base) => ({
    ...base,
    zIndex: 10,
    marginTop: 6,
    padding: "6px",          // Space from border
    borderRadius: "12px",
    overflow: "hidden",
  }),

  menuList: (base) => ({
    ...base,
    maxHeight: 220,
    padding: "4px",          // Inner padding
  }),

  option: (base, state) => ({
    ...base,
    fontSize: "13px",        // Option font size
    padding: "10px 12px",    // Padding around each option
    borderRadius: "8px",     // Rounded options
    marginBottom: "2px",     // Small spacing between options
    backgroundColor: state.isSelected
      ? "#c01f53"
      : state.isFocused
      ? "#f3f4f6"
      : "#ffffff",
    color: state.isSelected ? "#ffffff" : "#111827",
    cursor: "pointer",
  }),
};
const SearchSection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { uid } = useSelector((state) => state.auth || {});
  const safeUid = uid ?? 0;

  const { countries = [] } = useSelector((state) => state.countryData || {});

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
  const [showPopup, setShowPopup] = useState(false);
  const [searched, setSearched] = useState(false);

  const portalTarget =
    typeof document !== "undefined" ? document.body : undefined;

  useEffect(() => {
    dispatch(fetchCountries(safeUid));
  }, [dispatch, safeUid]);

  useEffect(() => {
    setSelectedUniversityId("");
    setSelectedCourseId("");
    setSearched(false);
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
    dispatch(clearAllUniversityCourses());

    if (!selectedUniversityId) return;

    dispatch(
      fetchUniversityMainCoursesByUid({
        universityId: selectedUniversityId,
        uid: safeUid,
      })
    );
  }, [dispatch, selectedUniversityId, safeUid]);

  useEffect(() => {
    if (!showPopup) return;

    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
    };
  }, [showPopup]);

  const getCountryId = (item) =>
    String(item?.id || item?.d_id || item?.country_id || "");

  const getCountryName = (item) =>
    item?.country || item?.name || item?.country_name || "Destination";

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
    item?.main_course ||
    item?.name ||
    item?.course_name ||
    item?.main_course_name ||
    item?.title ||
    "Course";

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
          raw: item,
        }))
        .filter((item) => item.value && item.label && item.label !== "Course"),
    [universityMainCourses]
  );

  const selectedMainCourseOption = mainCourseOptions.find(
    (option) => option.value === selectedCourseId
  );

  const getResultCourseId = (course) =>
    String(
      course?.id ||
        course?.course_id ||
        course?.c_id ||
        course?.uc_id ||
        course?.cid ||
        ""
    );

  const handleSearch = () => {
    setSearched(true);
    setShowPopup(true);
    dispatch(clearAllUniversityCourses());

    dispatch(
      fetchAllUniversityCoursesLatest({
        uid: safeUid,
        universityId: selectedUniversityId,
        courseId: selectedCourseId,
        offset: 0,
      })
    );
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
    <section className="relative py-0">
      <div
        className="relative mx-auto max-w-7xl bg-darkPrimary px-3 sm:px-5 md:px-8 lg:bg-[#181717]"
        data-aos="fade-up"
      >
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
                  setSelectedCourseId("");
                  setSearched(false);
                  dispatch(clearAllUniversityCourses());
                }}
                options={countryOptions}
                placeholder="Select Destination"
                isSearchable
                maxMenuHeight={220}
                styles={selectStyles}
                menuPortalTarget={portalTarget}
                menuPosition="fixed"
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
                  setSelectedCourseId("");
                  setSearched(false);
                  dispatch(clearAllUniversityCourses());
                }}
                options={universityOptions}
                placeholder={
                  !selectedCountryId
                    ? "Select Country First"
                    : universitiesLoading
                    ? "Loading Universities..."
                    : "Select University"
                }
                isDisabled={!selectedCountryId}
                isLoading={universitiesLoading}
                isSearchable
                maxMenuHeight={220}
                styles={selectStyles}
                menuPortalTarget={portalTarget}
                menuPosition="fixed"
              />
            </SelectField>

            <SelectField icon={GraduationCap}>
              <Select
                value={
                  mainCourseOptions.find(
                    (option) => option.value === selectedCourseId
                  ) || null
                }
                onChange={(option) => {
                  setSelectedCourseId(option?.value || "");
                  setSearched(false);
                  dispatch(clearAllUniversityCourses());
                }}
                options={mainCourseOptions}
                placeholder={
                  !selectedUniversityId
                    ? "Select University First"
                    : universityMainCoursesLoading
                    ? "Loading Main Courses..."
                    : mainCourseOptions.length === 0
                    ? "No Main Courses Found"
                    : "Select Main Course"
                }
                isDisabled={
                  !selectedUniversityId ||
                  universityMainCoursesLoading ||
                  mainCourseOptions.length === 0
                }
                isLoading={universityMainCoursesLoading}
                isSearchable
                maxMenuHeight={220}
                styles={selectStyles}
                menuPortalTarget={portalTarget}
                menuPosition="fixed"
              />
            </SelectField>

            <div className="w-full">
              <button
                type="button"
                disabled={!hasSelection || allUniversityCoursesLoading}
                onClick={handleSearch}
                className="flex w-full cursor-pointer items-center justify-center gap-4 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 lg:bg-primary lg:text-white"
              >
                {allUniversityCoursesLoading ? "Searching..." : "Search"}
                <Search size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPopup && (
        <div
          className="fixed inset-0 z-[99999] flex h-full w-full items-center justify-center bg-black/80 px-4 py-6"
          onClick={() => setShowPopup(false)}
        >
          <div
            className="relative max-h-[82vh] w-full max-w-6xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="shadow-lg absolute top-2 right-2 z-20 rounded-full bg-primary p-2 size-7 sm:size-8 grid place-content-center text-md font-bold text-white hover:bg-primary"
            >
              ×
            </button>

            <h2 className="my-5 flex flex-wrap items-center gap-2 pr-3 text-md sm:text-lg font-bold text-darkPrimary">
              <span className="grid size-10 place-content-center rounded-lg bg-pink-100 p-1 shadow-lg">
                <GraduationCapIcon className="text-primary" />
              </span>
              {selectedMainCourseOption?.label || "Course"} Results
            </h2>

            {allUniversityCoursesLoading && (
              <p className="mb-5 text-sm font-semibold text-gray-600">
                Loading courses...
              </p>
            )}

          <div className="mb-5">  {!allUniversityCoursesLoading && allUniversityCourses.length > 0 && (
              <span className="my-2 text-sm font-semibold text-black inline-flex gap-2 items-center">
               <span className="size-10 bg-secondary/10 text-secondary p-1 rounded-lg text-lg shadow-lg grid place-content-center"> {allUniversityCourses.length} </span> Showing <span className="text-primary">{allUniversityCourses.length} </span>Courses
              </span>
            )}</div>

            {!allUniversityCoursesLoading &&
              searched &&
              allUniversityCourses.length === 0 && (
                <p className="py-10 text-center text-sm font-semibold text-gray-500">
                  No courses found under this main course.
                </p>
              )}

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {allUniversityCourses.map((course, index) => (
                <div
                  key={getResultCourseId(course) || index}
                  className="rounded-2xl bg-[#f4f4f4] p-5 shadow-lg ring-1 ring-gray-100"
                >
                  <h3 className="text-sm font-bold text-black flex flex-col justify-center text-center sm:text-left sm:justify-start sm:flex-row gap-3 items-center">
                    <span className="bg-primary/10 rounded-lg size-10 grid place-content-center"> <GraduationCapIcon className="text-primary" /></span>{getCourseName(course)}
                  </h3>

                  <p className="mt-2 text-sm text-black flex flex-col sm:flex-row gap-3 items-center">

                    <span className="bg-secondary/10 rounded-lg size-10 grid place-content-center"><School2 className="text-secondary"/></span>


                    {course?.university ||
                      course?.university_name ||
                      universityOptions.find(
                        (item) => item.value === selectedUniversityId
                      )?.label ||
                      "University not available"}
                  </p>

                  <p className="mt-2 text-sm text-black flex flex-col sm:flex-row gap-3 items-center">

                    <span className="bg-darkPrimary/10 rounded-lg size-10 grid place-content-center"><MapPinCheck className="text-darkPrimary"/></span>

                    {course?.country ||
                      course?.country_name ||
                      countryOptions.find(
                        (item) => item.value === selectedCountryId
                      )?.label ||
                      "Country not available"}
                  </p>
<div className="mt-5 flex flex-wrap justify-center sm:justify-start gap-3">
  <button
    type="button"
    onClick={() => handleViewCourse(course)}
    className="flex h-10 items-center gap-2 rounded-lg bg-secondary px-4 text-sm font-semibold text-white transition hover:bg-secondary"
  >
    View
    <ArrowRight className="h-4 w-4" />
  </button>

  <Link
    to="/loginViaOtp"
    className="flex h-10 items-center gap-2 rounded-lg bg-darkPrimary px-4 text-sm font-semibold text-white transition hover:bg-secondary"
  >
    Apply
    <ArrowRight className="h-4 w-4" />
  </Link>
</div>
                </div>
              ))}
            </div>
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

      <div className="min-w-0 flex-1 text-sm">{children}</div>
    </div>
  );
}

export default SearchSection;