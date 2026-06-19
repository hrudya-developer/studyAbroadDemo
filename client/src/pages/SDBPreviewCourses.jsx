import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookOpen,
  ArrowRight,
  GraduationCap,
  Clock,
  Wallet,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
<<<<<<< HEAD

import SDBQualificationModal from "./SDBQualificationModal";
import Swal from "sweetalert2";
import { fetchStudentProfile } from "../redux/slices/studentSlice";


=======
import { Link, useNavigate } from "react-router-dom";

import SDBQualificationModal from "./SDBQualificationModal";
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e

import {
  fetchUniversityCourses,
  fetchUniversityMainCourses,
  clearUniversityCourses,
<<<<<<< HEAD
  applyCourse,
  fetchCourseAppliedStatus,
} from "../redux/slices/courseSlice";

import SDBUniversityMainCourses from "../pages/SDBUniversityMainCourses";
import SDBWishlistButton from "./SDBWishlistButton";
=======
} from "../redux/slices/courseSlice";

import UniversityMainCourses from "../pages/UniversityMainCourses";
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e

const CARDS_PER_PAGE = 10;

const SDBPreviewCourses = ({ courseCategoryId }) => {
  const dispatch = useDispatch();
<<<<<<< HEAD

  const { profile = {} } = useSelector((state) => state.studentData);
  const { uid } = useSelector((state) => state.auth);
  const { selectedUniversity } = useSelector((state) => state.universityData);

const {
  universityCourses = [],
  universityCoursesLoading,
  universityCoursesError,
  universityMainCourses = [],
  appliedCourseIds = [],
  appliedStatusByCourseId = {},
} = useSelector((state) => state.courseData);

  const safeUid = uid || 0;

  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [applyingCourseId, setApplyingCourseId] = useState(null);
=======
  const navigate = useNavigate();

  const [showPopup, setShowPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
  const [selectedMainCourseId, setSelectedMainCourseId] = useState(
    courseCategoryId || ""
  );

<<<<<<< HEAD
=======
  const { uid } = useSelector((state) => state.auth);
  const safeUid = uid || 0;

  const { selectedUniversity } = useSelector((state) => state.universityData);

  const {
    universityCourses = [],
    universityCoursesLoading,
    universityCoursesError,
    universityMainCourses = [],
  } = useSelector((state) => state.courseData);

>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
  useEffect(() => {
    if (!selectedUniversity?.id) return;
    dispatch(fetchUniversityMainCourses(selectedUniversity.id));
  }, [dispatch, selectedUniversity?.id]);

  useEffect(() => {
    if (courseCategoryId) {
      setSelectedMainCourseId(courseCategoryId);
      return;
    }

    if (!selectedMainCourseId && universityMainCourses.length > 0) {
      setSelectedMainCourseId(universityMainCourses[0]?.c_id);
    }
  }, [courseCategoryId, selectedMainCourseId, universityMainCourses]);

  useEffect(() => {
    if (!selectedUniversity?.id || !selectedMainCourseId) return;

    setCurrentPage(1);
    dispatch(clearUniversityCourses());

    dispatch(
      fetchUniversityCourses({
        uid: safeUid,
        universityId: selectedUniversity.id,
        courseId: selectedMainCourseId,
        offset: 0,
      })
    );
  }, [dispatch, safeUid, selectedUniversity?.id, selectedMainCourseId]);

  const totalPages = Math.ceil(universityCourses.length / CARDS_PER_PAGE) || 1;

  const currentCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
    return universityCourses.slice(startIndex, startIndex + CARDS_PER_PAGE);
  }, [universityCourses, currentPage]);

<<<<<<< HEAD
  useEffect(() => {
  if (!safeUid || currentCourses.length === 0) return;

  currentCourses.forEach((course) => {
    const courseId = getCourseId(course);

    if (courseId && appliedStatusByCourseId[String(courseId)] === undefined) {
      dispatch(fetchCourseAppliedStatus({ uid: safeUid, courseId }));
    }
  });
}, [dispatch, safeUid, currentCourses, appliedStatusByCourseId]);

  const getCourseId = (course) => {
  return (
    course?.id ||
    course?.c_id ||
    course?.course_id ||
    course?.uc_id ||
    course?.cid ||
    ""
  );
};

 const isCourseApplied = (course) => {
  const courseId = String(getCourseId(course));

  return (
    appliedStatusByCourseId[courseId] === true ||
    appliedCourseIds.includes(courseId) ||
    course?.applied === true ||
    course?.applied === "true" ||
    course?.applied === 1 ||
    course?.applied === "1"
  );
};

  const hasQualification = (data) => {
    return Boolean(
      data?.highest &&
        data?.tenth_syllabus &&
        data?.tenth_overall &&
        data?.ielts_overall
    );
=======
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
  };

  const getCourseName = (course) => {
    if (course?.course && course.course.toLowerCase() !== "course") {
      return course.course;
    }

    return course?.name || course?.course_name || course?.title || "Course";
  };

  const getFees = (course) => {
    if (course?.fees && course?.currency) {
      return `${course.currency} ${course.fees}`;
    }

    if (course?.fees) return course.fees;

    return "Fees not available";
  };

  const saveCourseSession = (course) => {
    sessionStorage.setItem("selectedCourse", JSON.stringify(course));
    sessionStorage.setItem(
      "selectedUniversity",
      JSON.stringify(selectedUniversity)
    );
    sessionStorage.setItem("universityId", selectedUniversity?.id || "");
    sessionStorage.setItem("countryId", selectedUniversity?.d_id || "");
  };

<<<<<<< HEAD
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleApplyNow = async (course) => {
    const courseId = getCourseId(course);
    const alreadyApplied = isCourseApplied(course);

    if (alreadyApplied) {
      Swal.fire({
        icon: "info",
        title: "Already Applied",
        text: "You have already applied for this course.",
        confirmButtonColor: "#cb0e10",
      });
      return;
    }

    saveCourseSession(course);

    try {
      const latestProfile = await dispatch(fetchStudentProfile(safeUid)).unwrap();
      const profileData = latestProfile?.profile || latestProfile || profile;

      if (!hasQualification(profileData)) {
        setShowPopup(true);
        return;
      }

      setApplyingCourseId(courseId);

      await dispatch(
        applyCourse({
          uid: safeUid,
          courseId,
          course,
          university: selectedUniversity,
        })
      ).unwrap();

     window.dispatchEvent(
  new CustomEvent("applicationsUpdated", {
    detail: { increment: 1 },
  })
);

      await dispatch(fetchCourseAppliedStatus({ uid: safeUid, courseId }));

      await dispatch(
        fetchUniversityCourses({
          uid: safeUid,
          universityId: selectedUniversity.id,
          courseId: selectedMainCourseId,
          offset: 0,
        })
      );

      Swal.fire({
        icon: "success",
        title: "Applied Successfully",
        text: "Your course application has been submitted successfully.",
        confirmButtonColor: "#cb0e10",
      });
      
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Application Failed",
        text:
          typeof error === "string"
            ? error
            : error?.message || "Something went wrong",
        confirmButtonColor: "#cb0e10",
      });
    } finally {
      setApplyingCourseId(null);
    }
  };

=======
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
  if (!selectedUniversity?.id) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
        <p className="font-bold text-[#cb0e10]">University not selected.</p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-8">
        <h2 className="mt-13 text-lg font-black text-[#081c47] sm:text-xl">
          Courses at{" "}
          <span className="text-[#cb0e10]">
            {selectedUniversity?.name ||
              selectedUniversity?.university ||
              "University"}
          </span>
        </h2>
      </div>

<<<<<<< HEAD
      <div className="mx-auto grid max-w-7xl gap-3 lg:grid-cols-1">
        <aside className="h-auto rounded-3xl border border-[#e6eaf2] bg-white p-4 shadow-xl shadow-slate-900/5">
=======
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="max-h-[625px] overflow-y-auto rounded-3xl border border-[#e6eaf2] bg-white p-4 shadow-xl shadow-slate-900/5 lg:sticky lg:top-24">
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
          <h3 className="mb-4 text-lg font-black text-[#081c47]">
            Main Courses
          </h3>

<<<<<<< HEAD
          <SDBUniversityMainCourses
=======
          <UniversityMainCourses
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
            selectedMainCourseId={selectedMainCourseId}
            onSelectMainCourse={setSelectedMainCourseId}
          />
        </aside>

<<<<<<< HEAD
        <main className="max-h-[625px] w-auto overflow-y-auto overflow-x-hidden">
=======
        <main className="max-h-[625px] w-auto overflow-y-auto">
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
          {universityCoursesLoading && universityCourses.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
              <p className="font-bold text-[#081c47]">Loading courses...</p>
            </div>
          ) : universityCoursesError ? (
            <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
              <p className="font-bold text-[#cb0e10]">
                {universityCoursesError}
              </p>
            </div>
          ) : currentCourses.length > 0 ? (
            <>
              <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
<<<<<<< HEAD
                
                {currentCourses.map((course, index) => {
                  const courseId = getCourseId(course);
                 const isApplied =
  appliedStatusByCourseId[String(courseId)] === true ||
  appliedCourseIds.includes(String(courseId)) ||
  course?.applied === true ||
  course?.applied === "true" ||
  course?.applied === 1 ||
  course?.applied === "1" ||
  String(course?.applied).toLowerCase() === "applied";
                  const isCurrentApplying =
                    String(applyingCourseId) === String(courseId);

                  return (
                    <article
                      key={`${courseId || "course"}-${index}`}
                      className="group rounded-3xl border border-[#e6eaf2] bg-white p-6 shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl"
                    >
                     <div className="group absolute right-3 top-3">
 <SDBWishlistButton courseId={course?.id} />


</div>
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white ring-4 ring-[#cb0e10]/10">
                        <BookOpen className="h-6 w-6" />
                      </div>

                      <h3 className="mb-4 text-sm font-bold leading-snug text-[#081c47]">
                        {getCourseName(course)}
                      </h3>

                      <div className="space-y-1">
                        <InfoLine
                          icon={GraduationCap}
                          label="Level"
                          value={course?.level || "Level not available"}
                        />

                        <InfoLine
                          icon={Clock}
                          label="Duration"
                          value={course?.duration || "Duration not available"}
                        />

                        <InfoLine
                          icon={Wallet}
                          label="Fees"
                          value={getFees(course)}
                        />
                      </div>

                      <div className="mt-6 flex flex-col gap-2 md:flex-row">
 <button
  type="button"
  disabled={isApplied || isCurrentApplying}
  onClick={() => handleApplyNow(course)}
  className={`flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-80 ${
    isApplied
      ? "bg-darkPrimary text-white"
      : "bg-primary text-white hover:bg-secondary"
  }`}
>
  {isApplied
    ? "Applied"
    : isCurrentApplying
    ? "Applying..."
    : "Apply Now"}
</button>
                      </div>
                    </article>
                  );
                })}
=======
                {currentCourses.map((course, index) => (
                  <article
                    key={`${course?.id || "course"}-${index}`}
                    className="group rounded-3xl border border-[#e6eaf2] bg-white p-6 shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl"
                  >
                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white ring-4 ring-[#cb0e10]/10">
                      <BookOpen className="h-6 w-6" />
                    </div>

                    <h3 className="mb-4 text-md font-black leading-snug text-[#081c47]">
                      {getCourseName(course)}
                    </h3>

                    <div className="space-y-1">
                      <InfoLine
                        icon={GraduationCap}
                        label="Level"
                        value={course?.level || "Level not available"}
                      />

                      <InfoLine
                        icon={Clock}
                        label="Duration"
                        value={course?.duration || "Duration not available"}
                      />

                      <InfoLine
                        icon={Wallet}
                        label="Fees"
                        value={getFees(course)}
                      />
                    </div>

                    <div className="mt-6 flex flex-col gap-2 md:flex-row">
                     

                      <button
                        type="button"
                        onClick={() => {
                          saveCourseSession(course);
                          setShowPopup(true);
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-primary px-3 py-2 text-sm font-bold text-white transition hover:bg-secondary"
                      >
                        Apply Now
                        <ArrowRight className="h-5 w-5" />
                      </button>
                    </div>
                  </article>
                ))}
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1 || universityCoursesLoading}
                    className="flex items-center gap-1 rounded-xl border border-[#e6eaf2] bg-white px-4 py-2 font-extrabold text-[#081c47] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </button>

<<<<<<< HEAD
                  {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                    (page) => (
                      <button
                        key={page}
                        type="button"
                        onClick={() => handlePageChange(page)}
                        disabled={universityCoursesLoading}
                        className={`h-10 w-10 rounded-xl font-extrabold transition ${
                          currentPage === page
                            ? "bg-[#cb0e10] text-white"
                            : "border border-[#e6eaf2] bg-white text-[#081c47] hover:bg-[#f7f9fd]"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
=======
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => handlePageChange(page)}
                      disabled={universityCoursesLoading}
                      className={`h-10 w-10 rounded-xl font-extrabold transition ${
                        currentPage === page
                          ? "bg-[#cb0e10] text-white"
                          : "border border-[#e6eaf2] bg-white text-[#081c47] hover:bg-[#f7f9fd]"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e

                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={
                      currentPage === totalPages || universityCoursesLoading
                    }
                    className="flex items-center gap-1 rounded-xl border border-[#e6eaf2] bg-white px-4 py-2 font-extrabold text-[#081c47] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
              <BookOpen className="mx-auto mb-4 h-14 w-14 text-[#cb0e10]" />

<<<<<<< HEAD
              <h3 className="mb-2 text-2xl font-bold text-[#081c47]">
=======
              <h3 className="mb-2 text-2xl font-black text-[#081c47]">
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
                {selectedMainCourseId
                  ? "No courses found"
                  : "Please select a main course"}
              </h3>
            </div>
          )}
        </main>
      </div>

      <SDBQualificationModal
        open={showPopup}
        onClose={() => setShowPopup(false)}
<<<<<<< HEAD
        onUpdate={() => setShowPopup(false)}
=======
        onUpdate={() => {
          setShowPopup(false);
          navigate("/student/profile");
        }}
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
      />
    </section>
  );
};

function InfoLine({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-3 rounded-2xl bg-[#f7f9fd] p-3">
      <div className="mt-1 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white text-[#cb0e10] shadow-sm">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0">
<<<<<<< HEAD
        <p className="text-[11px] font-bold uppercase text-slate-400">
=======
        <p className="text-[11px] font-black uppercase text-slate-400">
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-bold leading-6 text-[#081c47]">
          {value}
        </p>
      </div>
    </div>
  );
}

export default SDBPreviewCourses;