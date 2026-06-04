import React, { useEffect, useMemo } from "react";
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
  const { id } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth);

  const { selectedUniversity, universityImagePath } = useSelector(
    (state) => state.universityData
  );

  const {
    universityCourses = [],
    universityCoursesById = {},
    courseImagePath = "",
    universityCoursesLoading,
  } = useSelector((state) => state.courseData);

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
    storedCourse?.u_id ||
    sessionStorage.getItem("universityId");

  const courseCategoryId = stateCourse?.c_id || storedCourse?.c_id || "";

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
    if (stateCourse && String(stateCourse.id) === String(id)) return stateCourse;
    if (storedCourse && String(storedCourse.id) === String(id)) return storedCourse;

    return allCourses.find((course) => String(course.id) === String(id)) || null;
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
    "University"
  );

  const universityLogoUrl =
    university?.logo && universityImagePath
      ? `${universityImagePath.replace(/\/$/, "")}/${university.logo}`
      : selectedCourse?.logo && universityImagePath
      ? `${universityImagePath.replace(/\/$/, "")}/${selectedCourse.logo}`
      : "";

  const country = getValue(selectedCourse.country, selectedCourse.country_name, "N/A");

  const locationName = getValue(
    selectedCourse.location,
    selectedCourse.city,
    selectedCourse.state,
    country,
    "Location not available"
  );

  const level = getValue(selectedCourse.level, selectedCourse.course_level, "N/A");
  const duration = getValue(selectedCourse.duration, selectedCourse.course_duration, "N/A");

  const remarks = getValue(
    selectedCourse.remarks,
    selectedCourse.description,
    selectedCourse.course_description,
    "Course details are not available."
  );

  const intakesRaw = getValue(selectedCourse.intakes, selectedCourse.intake);

  const intakes = intakesRaw
    ? String(intakesRaw).split(",").length === 12
      ? "All Year Round"
      : intakesRaw
    : "Not available";

  const feesValue = getValue(selectedCourse.fees, selectedCourse.tuition_fee);
  const currency = getValue(selectedCourse.currency, selectedCourse.currency_symbol);
  const fees = feesValue ? `${currency}${feesValue}` : "Not available";

  const applicationFee = getValue(
    selectedCourse.applicationfee,
    selectedCourse.application_fee,
    "N/A"
  );

  return (
    <main className="mx-auto min-h-screen max-w-7xl bg-white text-slate-900">
      <section
        className="relative min-h-[430px] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${bg_coursesDetails})` }}
      >
        <div className="p-8 lg:p-12">
          <div className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 font-semibold text-white shadow">
            <GraduationCap size={24} />
            {level}
          </div>

          <div className="mt-8 max-w-3xl">
            <h1 className="text-4xl font-extrabold leading-tight text-secondary sm:text-5xl lg:text-5xl">
              {courseTitle}
            </h1>

            {/* <p className="mt-4 text-2xl font-bold text-primary">{level}</p> */}
            <div className="mt-4 h-1 w-16 rounded bg-primary" />
            <p className="mt-5 text-md leading-8 text-black h-auto w-full md:w-[60%]">{ selectedCourse.entryrequirement}</p>
          </div>

          <div className="mt-8 h-auto max-w-[200px] rounded-2xl bg-white px-8 py-5 shadow-lg lg:absolute lg:right-8 lg:top-8 lg:mt-0">
            {universityLogoUrl ? (
              <img
                src={universityLogoUrl}
                alt={universityName}
                className="mx-auto h-24 w-24 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                  const fallback =
                    e.currentTarget.parentElement.querySelector(".image-fallback");
                  if (fallback) fallback.style.display = "flex";
                }}
              />
            ) : null}

            <div
              className="image-fallback mx-auto h-24 w-24 items-center justify-center rounded-full bg-red-50 text-primary"
              style={{ display: universityLogoUrl ? "none" : "flex" }}
            >
              <GraduationCap size={40} />
            </div>

            <p className="mt-4 text-center text-sm text-secondary font-extrabold">
              {universityName}
            </p>
          </div>

          <div className="mt-8 flex w-fit items-center gap-3 rounded-xl bg-[#071b45] px-7 py-4 text-white shadow-lg lg:absolute lg:bottom-6 lg:right-10 lg:mt-0">
            <MapPin className="text-logoYellow" />
            <span className="font-semibold text-logoYellow">{locationName}</span>
          </div>
        </div>
      </section>

      <section className="relative z-10 mt-8 mx-6 rounded-2xl border border-slate-100 bg-white shadow-lg lg:mx-12">
        <div className="grid grid-cols-1 divide-y divide-slate-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          <InfoCard icon={<Clock />} title="Duration" value={duration} />
          <InfoCard icon={<BarChart3 />} title="Level" value={level} />
          <InfoCard icon={<CalendarDays />} title="Intakes" value={intakes} sub={intakesRaw} />
        </div>
      </section>

      <section className="space-y-6 px-4 py-6 lg:p-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <SmallBlock
            icon={<GraduationCap />}
            title="Entry Requirement"
            text={getValue(
              selectedCourse.entryrequirement,
              selectedCourse.entry_requirement,
              "Not available"
            )}
          />

          <SmallBlock icon={<MessageCircle />} title="Remarks" text={remarks} />

          <SmallBlock
            icon={<CalendarDays />}
            title="Deadline"
            text={getValue(selectedCourse.deadline, "N/A")}
            highlight
          />
        </div>

        <div className="rounded-2xl bg-red-50 p-8 shadow-sm">
          <div className="flex items-center gap-4">
            <IconBubble>
              <Wallet />
            </IconBubble>
            <p className="text-sm font-bold uppercase text-[#071b45]">Fees</p>
          </div>

          <h2 className="mt-6 text-4xl font-extrabold text-secondary lg:text-5xl">
            {fees}
          </h2>

          <p className="mt-4 text-sm font-semibold text-black">
            APPLICATION FEE:{" "}
            <span className="font-extrabold text-primary text-2xl ms-2">
              {applicationFee}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 rounded-2xl bg-gray-50 p-5 shadow-sm sm:grid-cols-2 md:grid-cols-4">
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

      <section className="px-12 py-5">
        <div className="shadow-sm lg:col-span-5">
          <h3 className="font-extrabold uppercase text-primary text-center">
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
                <tr className="border-t">
                  <td className="p-4 text-left">Minimum Required</td>
                  <td className="font-bold">{getValue(selectedCourse.ielts, "-")}</td>
                  <td className="font-bold">{getValue(selectedCourse.toefl, "-")}</td>
                  <td>{getValue(selectedCourse.pte, "-")}</td>
                  <td>{getValue(selectedCourse.duolingo, "-")}</td>
                  <td>{getValue(selectedCourse.gre, "-")}</td>
                  <td>{getValue(selectedCourse.gmat, "-")}</td>
                </tr>

                <tr className="border-t">
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

      <section className="mx-6 mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:mx-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <Benefit
            icon={<Globe />}
            title="Global Learning"
            text={country !== "N/A" ? `Study in ${country}` : "Study globally"}
          />
          <Benefit icon={<RotateCcw />} title="Flexible Intake" text={intakes} />
          <Benefit icon={<Award />} title="Recognized University" text={universityName} />
          <Benefit icon={<Headphones />} title="Student Support" text="Guidance at every step" />
        </div>
      </section>
    </main>
  );
}

function IconBubble({ children }) {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white">
      {children}
    </div>
  );
}

function InfoCard({ icon, title, value, sub }) {
  return (
    <div className="flex items-center gap-5 p-7">
      <IconBubble>{icon}</IconBubble>
      <div>
        <p className="text-sm font-semibold uppercase text-slate-500">{title}</p>
        <p className="mt-1 text-lg font-bold text-[#071b45]">{value}</p>
        {sub && <p className="text-sm text-slate-500">{sub}</p>}
      </div>
    </div>
  );
}

function SmallBlock({ icon, title, text, highlight }) {
  return (
    <div className="bg-secondary text-white p-5 rounded-2xl">
      <div className="flex flex-col gap-4 justify-center text-center">
        <span className="mx-auto text-white">
          <IconBubble>{icon}</IconBubble>
        </span>
        <div>
          <h4 className="font-extrabold uppercase text-white my-5">{title}</h4>
          <p
            className={`mt-2 leading-relaxed ${
              highlight ? "text-lg font-bold text-primary" : "text-sm text-white"
            }`}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

function MiniInfo({ icon, title, text }) {
  return (
    <div className="flex gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-primary">
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