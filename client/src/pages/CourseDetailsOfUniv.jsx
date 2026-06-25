import React, { useEffect, useMemo, useState, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUniversityCourses } from "../redux/slices/courseSlice";
import { fetchUniversityDetails } from "../redux/slices/universitySlice";
import bg_coursesDetails from "../assets/bg_coursesDetails.png";
import {
  GraduationCap,
  Clock,
  BarChart3,
  CalendarDays,
  Wallet,
  MessageCircle,
  Briefcase,
  Globe,
  MapPin,
  Headphones,
  Award,
  RotateCcw,
} from "lucide-react";

export default function CourseDetailsOfUniv() {
  const [logoError, setLogoError] = useState(false);

  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth || {});

  const { selectedUniversity, universityImagePath } = useSelector(
    (state) => state.universityData || {}
  );

  const {
    universityCourses = [],
    universityCoursesById = {},
    universityCoursesLoading,
  } = useSelector((state) => state.courseData || {});

  const storedCourse = useMemo(() => {
    try {
      const data = sessionStorage.getItem("selectedCourse");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }, []);

  const storedUniversity = useMemo(() => {
    try {
      const data = sessionStorage.getItem("selectedUniversity");
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }, []);

  const university = selectedUniversity || storedUniversity;
  const stateCourse = location.state?.course || null;

  const universityId =
    location.state?.universityId ||
    stateCourse?.u_id ||
    stateCourse?.university_id ||
    storedCourse?.u_id ||
    storedCourse?.university_id ||
    sessionStorage.getItem("universityId");

  const courseCategoryId =
    stateCourse?.c_id ||
    stateCourse?.main_course_id ||
    storedCourse?.c_id ||
    storedCourse?.main_course_id ||
    "";

  useEffect(() => {
    if (!universityId || !courseCategoryId) return;

    dispatch(
      fetchUniversityCourses({
        uid: uid ?? 0,
        universityId,
        courseId: courseCategoryId,
        offset: 0,
      })
    );
  }, [dispatch, uid, universityId, courseCategoryId]);

  useEffect(() => {
    if (!universityId) return;

    dispatch(
      fetchUniversityDetails({
        uid: uid ?? 0,
        id: universityId,
      })
    );
  }, [dispatch, uid, universityId]);

  const allCourses = useMemo(() => {
    return universityCoursesById?.[universityId] || universityCourses || [];
  }, [universityCourses, universityCoursesById, universityId]);

  const selectedCourse = useMemo(() => {
    const isSameCourse = (course) =>
      String(
        course?.id || course?.course_id || course?.c_id || course?.uc_id || ""
      ) === String(id);

    if (stateCourse && isSameCourse(stateCourse)) return stateCourse;
    if (storedCourse && isSameCourse(storedCourse)) return storedCourse;

    return allCourses.find(isSameCourse) || null;
  }, [allCourses, id, stateCourse, storedCourse]);

  const getValue = (...values) =>
    values.find(
      (value) =>
        value !== undefined && value !== null && String(value).trim() !== ""
    ) || "";

  if (universityCoursesLoading && !selectedCourse) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-bold text-slate-700">Loading course...</p>
      </div>
    );
  }

  if (!selectedCourse) {
    return (
      <div className="flex min-h-screen items-center justify-center p-10 text-center">
        <div>
          <h2 className="text-2xl font-bold text-primary">Course not found</h2>
          <p className="mt-3 text-slate-600">
            Please open this course again from the university course list.
          </p>
        </div>
      </div>
    );
  }

  const courseTitle = getValue(
    selectedCourse.course,
    selectedCourse.name,
    selectedCourse.course_name,
    selectedCourse.title,
    "Course Details"
  );

  const universityName = getValue(
    selectedCourse.university,
    selectedCourse.university_name,
    selectedCourse.u_name,
    university?.name,
    university?.university,
    "University"
  );

  const universityLogoFile = getValue(
    university?.logo,
    university?.image,
    university?.university_logo,
    selectedCourse?.logo,
    selectedCourse?.image,
    selectedCourse?.university_logo
  );

  const universityLogoUrl =
    universityLogoFile && universityImagePath
      ? `${universityImagePath.replace(/\/$/, "")}/${universityLogoFile}`
      : universityLogoFile || "";

  const country = getValue(
    selectedCourse.country,
    selectedCourse.country_name,
    selectedCourse.destination,
    "N/A"
  );

  const locationName = getValue(
    selectedCourse.location,
    selectedCourse.city,
    selectedCourse.state,
    country,
    "Location not available"
  );

  const level = getValue(selectedCourse.level, selectedCourse.course_level, "N/A");

  const duration = getValue(
    selectedCourse.duration,
    selectedCourse.course_duration,
    "N/A"
  );

  const remarks = getValue(
    selectedCourse.remarks,
    selectedCourse.description,
    selectedCourse.course_description,
    "Course details are not available."
  );

  const entryRequirement = getValue(
    selectedCourse.entryrequirement,
    selectedCourse.entry_requirement,
    "Entry requirement not available."
  );

  const intakesRaw = getValue(selectedCourse.intakes, selectedCourse.intake);

  const intakes = intakesRaw
    ? String(intakesRaw).split(",").length === 12
      ? "All Year Round"
      : intakesRaw
    : "Not available";

  const feesValue = getValue(selectedCourse.fees, selectedCourse.tuition_fee);
  const currency = getValue(
    selectedCourse.currency,
    selectedCourse.currency_symbol
  );

  const fees = feesValue ? `${currency}${feesValue}` : "Not available";

  const applicationFee = getValue(
    selectedCourse.applicationfee,
    selectedCourse.application_fee,
    "N/A"
  );

  const deadline = getValue(selectedCourse.deadline, "N/A");

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section
        className="relative mx-auto min-h-[400px] max-w-7xl overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${bg_coursesDetails})` }}
      >
        <div className="mx-auto flex min-h-[500px] max-w-7xl items-center px-5 py-5 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full bg-logoYellow px-4 py-2 text-sm font-bold text-black shadow-lg">
              <GraduationCap size={22} />
              {level}
            </div>

            <h1 className="mt-8 max-w-2xl text-2xl font-extrabold leading-tight text-slate-950 sm:text-3xl lg:text-4xl">
              {courseTitle}
            </h1>

            <div className="mt-5 h-1 w-20 rounded-full bg-primary" />

            <div className="mt-6 flex max-w-2xl items-center gap-4 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
              <div className="shrink-0">
                {universityLogoUrl && !logoError ? (
                  <img
                    src={universityLogoUrl}
                    alt={universityName}
                    className="h-16 w-16 rounded-xl border border-slate-100 bg-white object-contain p-2 shadow-md"
                    onError={() => setLogoError(true)}
                  />
                ) : (
                  <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-darkPrimary text-white shadow-lg">
                    <GraduationCap size={30} />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <p className="text-xs font-extrabold uppercase tracking-wider text-primary underline">
                  University
                </p>

                <h3 className="mt-1 text-base font-extrabold text-darkPrimary sm:text-lg">
                  {universityName}
                </h3>

                <p className="mt-1 flex items-center gap-2 text-sm font-medium">
                  <MapPin size={15} className="shrink-0 text-secondary" />
                  <span className="text-secondary">{locationName}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-5 -mt-10 rounded-2xl border border-slate-100 bg-white shadow-xl lg:mx-auto lg:max-w-6xl">
        <div className="grid grid-cols-1 divide-y divide-slate-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          <InfoCard icon={<Clock />} title="Duration" value={duration} />
          <InfoCard icon={<BarChart3 />} title="Level" value={level} />
          <InfoCard
            icon={<CalendarDays />}
            title="Intakes"
            value={intakes}
            sub={intakesRaw}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <DetailCard
            icon={<GraduationCap />}
            title="Entry Requirement"
            text={entryRequirement}
            color="pink"
          />

          <DetailCard
            icon={<MessageCircle />}
            title="Remarks"
            text={remarks}
            color="blue"
          />

          <FeesCard fees={fees} applicationFee={applicationFee} />

          <DeadlineCard deadline={deadline} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 rounded-2xl bg-gray-50 p-5 shadow-sm sm:grid-cols-2 md:grid-cols-4">
          <MiniInfo
            icon={<Briefcase />}
            title="Field of Study"
            text={getValue(selectedCourse.name, selectedCourse.field, courseTitle)}
          />

          <MiniInfo icon={<Globe />} title="Country" text={country} />
          <MiniInfo icon={<Award />} title="University" text={universityName} />
          <MiniInfo icon={<MapPin />} title="Location" text={locationName} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-5 lg:px-12">
        <div className="shadow-sm">
          <h3 className="text-center font-extrabold uppercase text-primary">
            English Language Requirements
          </h3>

          <div className="mt-6 overflow-x-auto rounded-xl bg-blue-50">
            <table className="w-full min-w-[650px] text-center text-sm">
              <thead className="bg-secondary text-white">
                <tr>
                  <th className="p-4"></th>
                  <th>IELTS</th>
                  <th>TOEFL iBT</th>
                  <th>PTE</th>
                  <th>Duolingo</th>
                  <th>GRE</th>
                  <th>GMAT</th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-t-white">
                  <td className="p-4 text-left">Minimum Required</td>
                  <td className="font-bold">{getValue(selectedCourse.ielts, "-")}</td>
                  <td className="font-bold">{getValue(selectedCourse.toefl, "-")}</td>
                  <td>{getValue(selectedCourse.pte, "-")}</td>
                  <td>{getValue(selectedCourse.duolingo, "-")}</td>
                  <td>{getValue(selectedCourse.gre, "-")}</td>
                  <td>{getValue(selectedCourse.gmat, "-")}</td>
                </tr>

                <tr className="border-t-white">
                  <td className="p-4 text-left">Less than Minimum</td>
                  <td className="font-bold">{getValue(selectedCourse.ieltsless, "-")}</td>
                  <td>{getValue(selectedCourse.toeflless, "-")}</td>
                  <td>{getValue(selectedCourse.pteless, "-")}</td>
                  <td>-</td>
                  <td>-</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="mx-auto mb-10 max-w-7xl px-5 lg:px-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
            <Benefit
              icon={<Globe />}
              title="Global Learning"
              text={country !== "N/A" ? `Study in ${country}` : "Study globally"}
            />
            <Benefit icon={<RotateCcw />} title="Flexible Intake" text={intakes} />
            <Benefit
              icon={<Award />}
              title="Recognized University"
              text={universityName}
            />
            <Benefit
              icon={<Headphones />}
              title="Student Support"
              text="Guidance at every step"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function IconBubble({ children }) {
  return (
    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white">
      {children}
    </div>
  );
}

function InfoCard({ icon, title, value, sub }) {
  return (
    <div className="flex items-center gap-5 p-6">
      <IconBubble>{icon}</IconBubble>

      <div className="min-w-0">
        <p className="text-sm font-semibold uppercase text-slate-600">
          {title}
        </p>

        <p className="mt-1 break-words text-sm font-bold text-slate-950">
          {value}
        </p>

        {sub && (
          <p className="mt-1 break-words text-sm text-primary">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

function DetailCard({ icon, title, text, color = "pink" }) {
  const contentRef = useRef(null);
  const [needScroll, setNeedScroll] = useState(false);

  useEffect(() => {
    if (contentRef.current) {
      setNeedScroll(contentRef.current.scrollHeight > 300);
    }
  }, [text]);

  const styles = {
    pink: {
      bg: "from-pink-50 via-white to-pink-50",
      iconBg: "bg-pink-100 text-primary",
      line: "bg-primary",
      dot: "bg-primary/20",
    },
    blue: {
      bg: "from-secondary/10 via-white to-sky-50",
      iconBg: "bg-secondary/10 text-secondary",
      line: "bg-secondary",
      dot: "bg-secondary/20",
    },
  };

  const s = styles[color];

  return (
    <div
      className={`relative rounded-3xl border overflow-hidden border-slate-100 bg-gradient-to-br ${s.bg} p-6 shadow-sm sm:p-8`}
    >
      <Pattern color={s.dot} />

      <div className="relative flex items-center gap-5">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${s.iconBg}`}
        >
          {icon}
        </div>

        <div>
          <h3 className="text-base font-extrabold uppercase text-darkPrimary">
            {title}
          </h3>

          <div className={`mt-3 h-1 w-14 rounded-full ${s.line}`} />
        </div>
      </div>

      <div
        ref={contentRef}
        className={`relative mt-6 ${
          needScroll ? "max-h-[270px] overflow-y-auto pr-2" : ""
        }`}
      >
        <p className="text-[14px] leading-7 lg:text-sm text-slate-700">
          {text}
        </p>
      </div>
    </div>
  );
}

function FeesCard({ fees, applicationFee }) {
  return (
    <div className="relative min-h-[280px] overflow-hidden rounded-3xl border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-yellow-50 p-6 shadow-sm sm:p-8">
      <Pattern color="bg-orange-300/20" />

      <div className="relative flex items-center gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500 shadow-sm">
          <Wallet />
        </div>

        <div>
          <h3 className="text-lg font-extrabold uppercase text-darkPrimary">
            Fees
          </h3>
          <div className="mt-3 h-1 w-16 rounded-full bg-orange-500" />
        </div>
      </div>

      <h2 className="relative mt-8 text-3xl font-extrabold text-orange-500 sm:text-4xl">
        {fees}
      </h2>

      <div className="relative mt-6 h-px w-full max-w-md bg-orange-200" />

      <p className="relative mt-6 text-lg font-bold text-slate-900">
        Application Fee:
        <span className="ms-3 text-2xl font-extrabold text-orange-500">
          {applicationFee}
        </span>
      </p>
    </div>
  );
}

function DeadlineCard({ deadline }) {
  return (
    <div className="relative min-h-[280px] overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-green-50 p-6 shadow-sm sm:p-8">
      <Pattern color="bg-emerald-300/20" />

      <div className="relative flex items-center gap-5">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-sm">
          <CalendarDays />
        </div>

        <div>
          <h3 className="text-lg font-extrabold uppercase text-darkPrimary">
            Deadline
          </h3>
          <div className="mt-3 h-1 w-16 rounded-full bg-emerald-500" />
        </div>
      </div>

      <h2 className="relative mt-12 text-4xl font-extrabold text-emerald-600">
        {deadline}
      </h2>
    </div>
  );
}

function Pattern({ color }) {
  return (
    <>
      <div className="pointer-events-none absolute right-8 top-8 grid grid-cols-6 gap-2 opacity-50">
        {Array.from({ length: 36 }).map((_, index) => (
          <span key={index} className={`h-1.5 w-1.5 rounded-full ${color}`} />
        ))}
      </div>

      <div className="pointer-events-none absolute -bottom-20 -right-20 h-56 w-56 rounded-full border border-primary/10 text-slate-200/50" />
      <div className="pointer-events-none absolute -bottom-12 -right-12 h-36 w-36 rounded-full border border-primary/10 text-slate-200/50" />
    </>
  );
}

function MiniInfo({ icon, title, text }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-darkPrimary">
        {icon}
      </div>

      <div>
        <p className="text-xs font-bold uppercase text-[#071b45]">{title}</p>
        <p className="text-sm text-slate-700">{text}</p>
      </div>
    </div>
  );
}

function Benefit({ icon, title, text }) {
  return (
    <div className="flex items-center gap-4">
      <IconBubble>{icon}</IconBubble>

      <div>
        <h4 className="font-bold text-[#071b45]">{title}</h4>
        <p className="text-sm text-slate-600">{text}</p>
      </div>
    </div>
  );
}