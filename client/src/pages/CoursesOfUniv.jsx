import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookOpen,
  ArrowRight,
  GraduationCap,
  Clock,
  Wallet,
  Globe,
  CalendarDays,
  FileText,
  ClipboardCheck,
  Languages,
} from "lucide-react";
import { fetchUniversityCourses } from "../redux/slices/courseSlice";
import { Link } from "react-router-dom";

const CoursesOfUniv = () => {
  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth);
  const safeUid = uid ?? 0;

  const { selectedUniversity } = useSelector((state) => state.universityData);

  const {
    universityCourses,
    universityCoursesLoading,
    universityCoursesError,
  } = useSelector((state) => state.courseData);

  useEffect(() => {
    if (selectedUniversity?.id && selectedUniversity?.d_id) {
      dispatch(
        fetchUniversityCourses({
          uid: safeUid,
          universityId: selectedUniversity.id,
          countryId: selectedUniversity.d_id,
          offset: 0,
        })
      );
    }
  }, [dispatch, safeUid, selectedUniversity?.id, selectedUniversity?.d_id]);

  const getCourseName = (course) => {
    if (course?.course && course.course.toLowerCase() !== "course") {
      return course.course;
    }

    return (
      course?.name ||
      course?.course_name ||
      course?.title ||
      course?.level ||
      course?.university ||
      "Course"
    );
  };

  const getUniversityName = (course) =>
    course?.university || selectedUniversity?.name || "University";

  const getLevel = (course) => course?.level || "Level not available";

  const getDuration = (course) => course?.duration || "Duration not available";

  const getFees = (course) => {
    if (course?.fees && course?.currency) return `${course.currency} ${course.fees}`;
    if (course?.fees) return course.fees;
    return "Fees not available";
  };

  const getIntakes = (course) => course?.intakes || "Intakes not available";

  const getEntryRequirement = (course) =>
    course?.entryrequirement || "Entry requirement not available";

  const getApplicationFee = (course) =>
    course?.applicationfee || "Application fee not available";

  if (!selectedUniversity?.id) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
        <p className="font-bold text-[#cb0e10]">University not selected.</p>
      </div>
    );
  }

  if (universityCoursesLoading) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
        <p className="font-bold text-[#081c47]">Loading courses...</p>
      </div>
    );
  }

  if (universityCoursesError) {
    return (
      <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
        <p className="font-bold text-[#cb0e10]">{universityCoursesError}</p>
      </div>
    );
  }

  return (
    <section>
      <div className="mb-6">
        <p className="mb-2 text-sm font-black uppercase text-[#cb0e10]">
          Available Courses
        </p>

        <h2 className="text-3xl font-black text-[#081c47] sm:text-4xl">
          Courses at{" "}
          <span className="text-[#cb0e10]">
            {selectedUniversity?.name || "University"}
          </span>
        </h2>
      </div>

      {universityCourses?.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {universityCourses.map((course, index) => (
            <article
              key={`${course?.id || "course"}-${index}`}
              className="group rounded-3xl border border-[#e6eaf2] bg-white p-6 shadow-xl shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#081c47] text-white ring-4 ring-[#cb0e10]/10">
                <BookOpen className="h-8 w-8" />
              </div>

              <h3 className="mb-4 text-xl font-black leading-snug text-[#081c47]">
                {getCourseName(course)}
              </h3>

              <div className="space-y-3">
                <InfoLine icon={Globe} label="University" value={getUniversityName(course)} />
                <InfoLine icon={GraduationCap} label="Level" value={getLevel(course)} />
                <InfoLine icon={Clock} label="Duration" value={getDuration(course)} />
                <InfoLine icon={Wallet} label="Fees" value={getFees(course)} />
                <InfoLine icon={CalendarDays} label="Intakes" value={getIntakes(course)} />
                <InfoLine icon={FileText} label="Entry Requirement" value={getEntryRequirement(course)} />
                <InfoLine icon={Wallet} label="Application Fee" value={getApplicationFee(course)} />
                <InfoLine icon={Languages} label="IELTS" value={course?.ielts || "N/A"} />
                <InfoLine icon={ClipboardCheck} label="Deadline" value={course?.deadline || "N/A"} />
              </div>

              <Link to={`/courseDetailsOfUniv/${course.id}`}><button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 font-extrabold text-[#cb0e10] transition hover:bg-[#cb0e10] hover:text-white">
                View Course
                <ArrowRight className="h-5 w-5" />
              </button></Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl bg-white p-10 text-center shadow-xl">
          <BookOpen className="mx-auto mb-4 h-14 w-14 text-[#cb0e10]" />

          <h3 className="mb-2 text-2xl font-black text-[#081c47]">
            No courses found
          </h3>

          <p className="text-sm font-medium text-slate-500">
            Courses are not available for this university right now.
          </p>
        </div>
      )}
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