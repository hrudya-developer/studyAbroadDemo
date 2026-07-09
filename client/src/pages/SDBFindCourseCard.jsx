
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { fetchStudentProfile } from "../redux/slices/studentSlice";

import {
  Calendar,
  BookOpen,
  Clock,
  Globe,
  FileText,
  GraduationCap,
  Wallet,
  MapPin,
  ArrowRight,
  Heart,
} from "lucide-react";

import SDBFindCourseInfo from "../pages/SDBFindCourseInfo";
import SDBQualificationModal from "./SDBQualificationModal";
import { useEffect, useState } from "react";
import {
  applyCourse,
  fetchCourseAppliedStatus,
} from "../redux/slices/courseSlice";
import SDBWishlistButton from "./SDBWishlistButton";

function getValue(item, keys, fallback = "N/A") {
  for (const key of keys) {
    const value = item?.[key];

    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== "" &&
      String(value).trim().toLowerCase() !== "null"
    ) {
      return value;
    }
  }

  return fallback;
}

function getLogoUrl(logo, imagePath = "") {
  if (!logo) return "";

  const value = String(logo).trim();

  if (!value || value.toLowerCase() === "null") return "";

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value;
  }

  const cleanLogo = value.replace(/^\/+/, "");
  const cleanPath = String(imagePath || "").replace(/\/+$/, "");

  if (cleanPath) {
    return `${cleanPath}/${cleanLogo}`;
  }

  return `https://overseas.technocitysolutions.com/public/uploads/universities/${cleanLogo}`;
}

function InitialLogo({ name }) {
  return (
    <div className="grid h-full w-full place-items-center bg-slate-900 text-sm font-black text-white">
      {String(name || "UN").slice(0, 2).toUpperCase()}
    </div>
  );
}

export default function SDBFindCourseCard({ course }) {

  const dispatch = useDispatch();

const { uid } = useSelector((state) => state.auth);
const safeUid = uid || 0;

const { profile = {} } = useSelector((state) => state.studentData);

const {
  courseApplyLoading,
  appliedCourseIds = [],
  appliedStatusByCourseId = {},
} = useSelector((state) => state.courseData);




  const [showPopup, setShowPopup] = useState(false);

  const { universityImagePath = "", selectedUniversity } = useSelector(
    (state) => state.universityData
  );

  const { imagePath: findCourseImagePath = "" } = useSelector(
    (state) => state.findCourse
  );

  const universityName = getValue(course, [
    "university",
    "university_name",
    "uname",
    "u_name",
  ]);

  const country = getValue(course, [
    "country",
    "country_name",
    "destination",
    "dname",
    "d_name",
  ]);

  const location = getValue(course, ["location"]);
  const courseName = getValue(course, ["course", "course_name", "coursename"]);
  const level = getValue(course, ["level", "program"]);
  const intake = getValue(course, ["intakes", "intake"]);
  const deadline = getValue(course, ["deadline"]);
  const duration = getValue(course, ["duration"]);

  const entryRequirement = getValue(course, [
    "entryrequirement",
    "entry_requirement",
    "requirements",
    "requirement",
  ]);

  const remarks = getValue(course, ["remarks"]);
  const fees = getValue(course, ["fees"]);
  const currency = getValue(course, ["currency"], "");
  const applicationFee = getValue(course, [
    "applicationfee",
    "application_fee",
  ]);

  const branch = getValue(course, [
    "name",
    "branch",
    "main_course",
    "category",
    "coursecategory",
  ]);

  const stipend = getValue(course, ["stipend"]);
  const ielts = getValue(course, ["ielts"]);
  const ieltsLess = getValue(course, ["ieltsless", "ieltless"]);
  const toefl = getValue(course, ["toefl"]);
  const toeflLess = getValue(course, ["toeflless"]);
  const pte = getValue(course, ["pte"]);
  const pteLess = getValue(course, ["pteless"]);
  const duolingo = getValue(course, ["duolingo"]);
  const act = getValue(course, ["act"]);
  const sat = getValue(course, ["sat"]);
  const gmat = getValue(course, ["gmat"]);
  const gre = getValue(course, ["gre"]);
  const det = getValue(course, ["det"]);

  const logo = getValue(
    course,
    [
      "logo",
      "image",
      "university_logo",
      "university_logo_path",
      "u_logo",
      "university_image",
      "univ_logo",
      "universityLogo",
      "uimage",
      "universityimage",
    ],
    ""
  );

  const courseImagePath = getValue(
    course,
    [
      "imagePath",
      "image_path",
      "universities_image_path",
      "universityImagePath",
      "university_image_path",
      "logo_path",
      "path",
    ],
    ""
  );

  const imagePath = courseImagePath || findCourseImagePath || universityImagePath;
  const logoUrl = getLogoUrl(logo, imagePath);

  const displayFees = fees !== "N/A" ? `${currency} ${fees}`.trim() : "N/A";

  const displayApplicationFee =
    applicationFee !== "N/A" && applicationFee !== "NA"
      ? `${currency} ${applicationFee}`.trim()
      : applicationFee;

  const saveCourseSession = () => {
    sessionStorage.setItem("selectedCourse", JSON.stringify(course));

    if (selectedUniversity) {
      sessionStorage.setItem(
        "selectedUniversity",
        JSON.stringify(selectedUniversity)
      );
      sessionStorage.setItem("universityId", selectedUniversity?.id || "");
      sessionStorage.setItem("countryId", selectedUniversity?.d_id || "");
    }
  };
const hasQualification = (data) => {
  return Boolean(
    data?.highest &&
      data?.tenth_syllabus &&
      data?.tenth_overall &&
      data?.ielts_overall
  );
};

const courseId =
  course?.id ||
  course?.c_id ||
  course?.course_id ||
  course?.uc_id ||
  course?.cid ||
  "";
useEffect(() => {
  if (!safeUid || !courseId) return;

  dispatch(
    fetchCourseAppliedStatus({
      uid: safeUid,
      courseId,
    })
  );
}, [dispatch, safeUid, courseId]);

const isApplied =
  appliedStatusByCourseId[String(courseId)] === true ||
  appliedCourseIds.includes(String(courseId)) ||
  course?.applied === true ||
  course?.applied === "true" ||
  course?.applied === 1 ||
  course?.applied === "1" ||
  String(course?.applied).toLowerCase() === "applied";


const handleApplyNow = async () => {
  if (isApplied) {
  Swal.fire({
    icon: "info",
    title: "Already Applied",
    text: "You have already applied for this course.",
    confirmButtonColor: "#cb0e10",
  });
  return;
}
  saveCourseSession();

  try {
    const latestProfile = await dispatch(fetchStudentProfile(safeUid)).unwrap();

    const profileData = latestProfile?.profile || latestProfile || profile;

    if (!hasQualification(profileData)) {
      setShowPopup(true);
      return;
    }

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
await dispatch(
  fetchCourseAppliedStatus({
    uid: safeUid,
    courseId,
  })
);

// dispatch(
//   fetchUniversityCourses({
//     uid: safeUid,
//     universityId: selectedUniversity.id,
//     courseId: selectedMainCourseId,
//     offset: 0,
//   })
// );

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
  }
};
  return (
    <>
      <div className="grid gap-6 rounded-xl bg-white p-5 shadow-md md:p-6 grid-cols-1 xl:grid-cols-1 xl:items-center relative">
        <div className="flex flex-col items-start sm:flex-rowsm:items-center gap-4">
         <div className="group absolute right-3 top-3">
<SDBWishlistButton courseId={course?.id} />

 
</div>
          <div className="h-20 w-20 shrink-0 overflow-hidden rounded bg-slate-100">
            
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={universityName}
                className="h-full w-full bg-white object-contain p-1"
                onError={(e) => {
                  e.currentTarget.style.display = "none";

                  const fallback =
                    e.currentTarget.parentElement?.querySelector(
                      "[data-logo-fallback]"
                    );

                  if (fallback) {
                    fallback.classList.remove("hidden");
                  }
                }}
              />
            ) : null}

            <div
              data-logo-fallback
              className={logoUrl ? "hidden h-full w-full" : "h-full w-full"}
            >
              <InitialLogo name={universityName} />
            </div>
          </div>

          <div className="min-w-0">
            <p className="text-sm font-bold text-red-600">{level}</p>

            <h3 className="mt-2 text-md font-bold leading-tight">
              {universityName}
            </h3>

            <p className="mt-2 text-sm text-slate-500">Country: {country}</p>
            <p className="mt-1 text-sm text-slate-500">Location: {location}</p>
          </div>
        </div>

        <div className="grid gap-4 border-slate-200 sm:grid-cols-1 xl:px-6">
          <SDBFindCourseInfo
            icon={<GraduationCap />}
            label="Course"
            value={courseName}
          />

          <SDBFindCourseInfo icon={<BookOpen />} label="Branch" value={branch} />

          <SDBFindCourseInfo icon={<Calendar />} label="Intake" value={intake} />

          <SDBFindCourseInfo
            icon={<Calendar />}
            label="Deadline"
            value={deadline}
          />

          <SDBFindCourseInfo
            icon={<Clock />}
            label="Duration"
            value={duration}
          />

          <SDBFindCourseInfo icon={<Globe />} label="Fees" value={displayFees} />

          <SDBFindCourseInfo
            icon={<Wallet />}
            label="Application Fee"
            value={displayApplicationFee}
          />

          <SDBFindCourseInfo icon={<Wallet />} label="Stipend" value={stipend} />

          <SDBFindCourseInfo
            icon={<MapPin />}
            label="Location"
            value={location}
          />

          <SDBFindCourseInfo
            icon={<GraduationCap />}
            label="IELTS"
            value={ielts}
          />

          <SDBFindCourseInfo
            icon={<GraduationCap />}
            label="IELTS Less"
            value={ieltsLess}
          />

          <SDBFindCourseInfo
            icon={<GraduationCap />}
            label="TOEFL"
            value={toefl}
          />

          <SDBFindCourseInfo
            icon={<GraduationCap />}
            label="TOEFL Less"
            value={toeflLess}
          />

          <SDBFindCourseInfo
            icon={<GraduationCap />}
            label="PTE"
            value={pte}
          />

          <SDBFindCourseInfo
            icon={<GraduationCap />}
            label="PTE Less"
            value={pteLess}
          />

          <SDBFindCourseInfo
            icon={<GraduationCap />}
            label="Duolingo"
            value={duolingo}
          />

          <SDBFindCourseInfo
            icon={<GraduationCap />}
            label="ACT"
            value={act}
          />

          <SDBFindCourseInfo
            icon={<GraduationCap />}
            label="SAT"
            value={sat}
          />

          <SDBFindCourseInfo
            icon={<GraduationCap />}
            label="GMAT"
            value={gmat}
          />

          <SDBFindCourseInfo
            icon={<GraduationCap />}
            label="GRE"
            value={gre}
          />

          <SDBFindCourseInfo
            icon={<GraduationCap />}
            label="DET"
            value={det}
          />

          <div className="sm:col-span-2">
            <SDBFindCourseInfo
              icon={<FileText />}
              label="Entry Requirement"
              value={entryRequirement}
            />
          </div>

          <div className="sm:col-span-2">
            <SDBFindCourseInfo
              icon={<FileText />}
              label="Remarks"
              value={remarks}
            />
          </div>
        </div>

<button
  type="button"
  disabled={isApplied || courseApplyLoading}
  onClick={handleApplyNow}
  className={`flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-80 ${
    isApplied
      ? "bg-darkPrimary text-white"
      : "bg-primary text-white hover:bg-secondary"
  }`}
>
  {isApplied ? "Applied" : courseApplyLoading ? "Applying..." : "Apply Now"}
</button>

      </div>

<SDBQualificationModal
  open={showPopup}
  onClose={() => setShowPopup(false)}
  onUpdate={async () => {
    setShowPopup(false);

    try {
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

      await dispatch(
        fetchCourseAppliedStatus({
          uid: safeUid,
          courseId,
        })
      );

      Swal.fire({
        icon: "success",
        title: "Applied Successfully",
        text: "Your course application has been submitted successfully.",
        confirmButtonColor: "#cb0e10",
      });

      sessionStorage.removeItem("pendingApplyCourse");
      sessionStorage.removeItem("loginRedirectType");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Application Failed",
        text:
          typeof error === "string"
            ? error
            : error?.message || "Something went wrong",
        confirmButtonColor: "#c01f53",
      });
    }
  }}
/>
    </>
  );
}