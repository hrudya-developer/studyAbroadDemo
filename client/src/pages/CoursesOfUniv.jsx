import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookOpen,
  ArrowRight,
  GraduationCap,
  Clock,
  Wallet,
  Globe,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  fetchUniversityCourses,
  fetchUniversityMainCourses,
  clearUniversityCourses,
} from "../redux/slices/courseSlice";
import UniversityMainCourses from "../pages/UniversityMainCourses";

const CARDS_PER_PAGE = 10;

const CoursesOfUniv = ({ courseCategoryId }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMainCourseId, setSelectedMainCourseId] = useState(
    courseCategoryId || ""
  );

  const { uid } = useSelector((state) => state.auth);
  const safeUid = uid || 0;

  const { selectedUniversity } = useSelector((state) => state.universityData);

  const {
    universityCourses = [],
    universityCoursesLoading,
    universityCoursesError,
  } = useSelector((state) => state.courseData);

  useEffect(() => {
    if (!selectedUniversity?.id) return;
    dispatch(fetchUniversityMainCourses(selectedUniversity.id));
  }, [dispatch, selectedUniversity?.id]);

  useEffect(() => {
    if (courseCategoryId) {
      setSelectedMainCourseId(courseCategoryId);
    }
  }, [courseCategoryId]);

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

  const totalPages = Math.ceil(universityCourses.length / CARDS_PER_PAGE);

  const currentCourses = useMemo(() => {
    const startIndex = (currentPage - 1) * CARDS_PER_PAGE;
    return universityCourses.slice(startIndex, startIndex + CARDS_PER_PAGE);
  }, [universityCourses, currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
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
        <p className="my-5 mt-10 text-sm font-black uppercase text-primary">
          Available Courses
        </p>

        <h2 className="text-3xl font-black text-[#081c47] sm:text-4xl">
          Courses at{" "}
          <span className="text-[#cb0e10]">
            {selectedUniversity?.name || "University"}
          </span>
        </h2>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px_1fr]">
        <aside className="max-h-[625px] overflow-y-auto rounded-3xl border border-[#e6eaf2] bg-white p-4 shadow-xl shadow-slate-900/5 lg:sticky lg:top-24">
          <h3 className="mb-4 text-lg font-black text-[#081c47]">
            Main Courses
          </h3>

          <div className="flex flex-col gap-3">
            <UniversityMainCourses
              selectedMainCourseId={selectedMainCourseId}
              onSelectMainCourse={setSelectedMainCourseId}
            />
          </div>
        </aside>

        <main className="max-h-[625px] overflow-y-auto w-auto">
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
                        icon={Globe}
                        label="University"
                        value={
                          course?.university ||
                          selectedUniversity?.name ||
                          "University"
                        }
                      />

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

                    <Link
                      to={`/courseDetailsOfUniv/${course.id}`}
                      state={{
                        course,
                        universityId: selectedUniversity?.id,
                        countryId: selectedUniversity?.d_id,
                      }}
                      onClick={() => {
                        sessionStorage.setItem(
                          "selectedCourse",
                          JSON.stringify(course)
                        );
                        sessionStorage.setItem(
                          "selectedUniversity",
                          JSON.stringify(selectedUniversity)
                        );
                        sessionStorage.setItem(
                          "universityId",
                          selectedUniversity?.id
                        );
                        sessionStorage.setItem(
                          "countryId",
                          selectedUniversity?.d_id || ""
                        );
                      }}
                    >
                     <div className="flex flex-col md:flex-row gap-2">
                      <button className="text-sm mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2 font-bold text-[#cb0e10] transition hover:bg-[#cb0e10] hover:text-white">
                        View Course
                        <ArrowRight className="h-5 w-5" />
                      </button>
                        <button className="text-sm mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-3 py-2 font-bold text-white bg-primary transition hover:bg-secondary hover:text-white">
                        Apply Now
                        <ArrowRight className="h-5 w-5" />
                      </button></div> 


                    </Link>
                  </article>
                ))}
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
              <h3 className="mb-2 text-2xl font-black text-[#081c47]">
                {selectedMainCourseId
                  ? "No courses found"
                  : "Please select a main course"}
              </h3>
            </div>
          )}
        </main>
      </div>
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
        <p className="text-[11px] font-black uppercase text-slate-400">
          {label}
        </p>
        <p className="mt-1 break-words text-sm font-bold leading-6 text-[#081c47]">
          {value}
        </p>
      </div>
    </div>
  );
}

export default CoursesOfUniv;