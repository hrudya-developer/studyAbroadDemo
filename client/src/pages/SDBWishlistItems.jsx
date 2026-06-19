import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import SDBWishlistRemove from "./SDBWishlistRemove";
import SDBQualificationModal from "./SDBQualificationModal";
import { fetchStudentProfile } from "../redux/slices/studentSlice";
import {
  applyCourse,
  fetchCourseAppliedStatus,
} from "../redux/slices/courseSlice";

import {
  MapPin,
  GraduationCap,
  Clock,
  Calendar,
  Wallet,
  ChevronLeft,
  ChevronRight,
  Building2,
  FileText,
  Globe,
  HeartPlus,
} from "lucide-react";

const API_KEY = "overseas@Miak2023";
const ITEMS_PER_PAGE = 4;

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

function getCourseId(course) {
  return (
    course?.id ||
    course?.c_id ||
    course?.course_id ||
    course?.uc_id ||
    course?.cid ||
    course?.prefid ||
    ""
  );
}

function hasQualification(data) {
  return Boolean(
    data?.highest &&
      data?.tenth_syllabus &&
      data?.tenth_overall &&
      data?.ielts_overall
  );
}

export default function SDBWishlistItems() {
  const { uid } = useSelector((state) => state.auth);

  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(wishlist.length / ITEMS_PER_PAGE));

  const currentItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return wishlist.slice(start, start + ITEMS_PER_PAGE);
  }, [wishlist, currentPage]);

  const fetchWishlist = async () => {
    if (!uid) return;

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("api", API_KEY);
      formData.append("uid", String(uid));

      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/getPrefereList",
        {
          method: "POST",
          body: formData,
        }
      );

      const text = await response.text();
      const result = text ? JSON.parse(text) : {};

      if (!response.ok || result?.status === false) {
        throw new Error(
          result?.msg || result?.message || "Failed to fetch wishlist"
        );
      }

      setWishlist(Array.isArray(result?.course) ? result.course : []);
      setCurrentPage(1);
    } catch (err) {
      setError(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, [uid]);

  const handleWishlistRemoved = (removedId) => {
    setWishlist((prev) =>
      prev.filter((item) => String(getCourseId(item)) !== String(removedId))
    );
  };

  if (!uid) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center font-bold shadow">
        Please login to view wishlist courses.
      </div>
    );
  }

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center font-bold shadow">
        Loading wishlist...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center font-bold text-red-600 shadow">
        {error}
      </div>
    );
  }

  if (!wishlist.length) {
    return (
      <div className="rounded-2xl bg-white p-6 text-center font-bold shadow">
        No wishlist courses found.
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-2xl font-black text-[#081c47]">My Wishlist</h2>
        <p className="mt-1 text-sm text-slate-500">
          Courses you have saved for later.
        </p>
      </div>

      {currentItems.map((course, index) => (
        <WishlistCard
          key={`${getCourseId(course) || "wishlist"}-${index}`}
          course={course}
          onRemoved={handleWishlistRemoved}
        />
      ))}

      <div className="flex flex-col items-center justify-between gap-4 pt-2 sm:flex-row">
        <p className="text-xs font-semibold text-slate-500">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
          {Math.min(currentPage * ITEMS_PER_PAGE, wishlist.length)} of{" "}
          {wishlist.length} courses
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            className="flex items-center gap-1 rounded-lg border bg-white px-3 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft size={16} />
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              type="button"
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`h-9 w-9 rounded-lg text-sm font-bold ${
                currentPage === page
                  ? "bg-red-100 text-red-600"
                  : "border bg-white text-slate-700"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            className="flex items-center gap-1 rounded-lg border bg-white px-3 py-2 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

function WishlistCard({ course, onRemoved }) {
  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth);
  const { profile = {} } = useSelector((state) => state.studentData);

  const {
    appliedCourseIds = [],
    appliedStatusByCourseId = {},
  } = useSelector((state) => state.courseData);

  const [showPopup, setShowPopup] = useState(false);
  const [applying, setApplying] = useState(false);

  const courseId = getCourseId(course);
  const safeUid = uid || 0;

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

    try {
      const latestProfile = await dispatch(
        fetchStudentProfile(safeUid)
      ).unwrap();

      const profileData = latestProfile?.profile || latestProfile || profile;

      if (!hasQualification(profileData)) {
        setShowPopup(true);
        return;
      }

      setApplying(true);

      await dispatch(
        applyCourse({
          uid: safeUid,
          courseId,
          course,
          university: null,
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
      setApplying(false);
    }
  };

  const courseName = getValue(course, ["course", "course_name", "coursename"]);
  const university = getValue(course, [
    "university",
    "university_name",
    "u_name",
    "uname",
  ]);
  const country = getValue(course, ["country", "country_name", "destination"]);
  const location = getValue(course, ["location"]);
  const branch = getValue(course, ["name", "branch", "main_course"]);
  const level = getValue(course, ["level", "program"]);
  const duration = getValue(course, ["duration"]);
  const intake = getValue(course, ["intakes", "intake"]);
  const deadline = getValue(course, ["deadline"]);
  const fees = getValue(course, ["fees"]);
  const currency = getValue(course, ["currency"], "");
  const applicationFee = getValue(course, ["applicationfee", "application_fee"]);
  const entryRequirement = getValue(course, [
    "entryrequirement",
    "entry_requirement",
    "requirements",
  ]);
  const addedDate = getValue(course, ["created_date", "created_at", "date"]);

  const displayFees = fees !== "N/A" ? `${currency} ${fees}`.trim() : "N/A";
  const displayApplicationFee =
    applicationFee !== "N/A" ? `${currency} ${applicationFee}`.trim() : "N/A";

  return (
    <>
      <div className="relative rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md">
        <div className="absolute right-5 top-5">
          <SDBWishlistRemove courseId={courseId} onRemoved={onRemoved} />
        </div>

        <div className="grid gap-4 lg:grid-cols-[120px_1fr] lg:items-start">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-primary/10">
            <HeartPlus size={42} className="text-primary" strokeWidth={2.5} />
          </div>

          <div className="pr-8">
            <h3 className="text-lg font-black text-[#081c47]">{courseName}</h3>

            <p className="mt-1 flex items-center gap-2 text-sm font-bold text-slate-700">
              <Building2 size={15} className="text-red-600" />
              {university}
            </p>

            <p className="mt-2 flex items-center gap-1 text-sm text-slate-500">
              <MapPin size={14} />
              {location !== "N/A" ? location : country}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <Badge icon={<GraduationCap size={14} />} text={level} />
              <Badge icon={<Globe size={14} />} text={branch} />
              <Badge icon={<Clock size={14} />} text={duration} />
              <Badge icon={<Calendar size={14} />} text={intake} />
              <Badge icon={<Wallet size={14} />} text={displayFees} />
              <Badge
                icon={<Calendar size={14} />}
                text={`Deadline: ${deadline}`}
              />
              <Badge
                icon={<Wallet size={14} />}
                text={`Application Fee: ${displayApplicationFee}`}
              />
            </div>

            {entryRequirement !== "N/A" && (
              <div className="mt-4 rounded-xl bg-slate-50 p-3">
                <p className="mb-1 flex items-center gap-2 text-xs font-black uppercase text-slate-400">
                  <FileText size={14} />
                  Entry Requirement
                </p>
                <p className="line-clamp-3 text-sm leading-6 text-slate-600">
                  {entryRequirement}
                </p>
              </div>
            )}

            <p className="mt-4 text-xs text-slate-500">
              Added on: <span className="font-bold">{addedDate}</span>
            </p>

            <button
              type="button"
              disabled={isApplied || applying}
              onClick={handleApplyNow}
              className={`mt-5 rounded-xl px-4 py-2 text-sm font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-80 ${
                isApplied
                  ? "bg-darkPrimary"
                  : "bg-primary hover:bg-darkPrimary"
              }`}
            >
              {isApplied ? "Applied" : applying ? "Applying..." : "Apply Now"}
            </button>
          </div>
        </div>
      </div>

      <SDBQualificationModal
        open={showPopup}
        onClose={() => setShowPopup(false)}
        onUpdate={() => setShowPopup(false)}
      />
    </>
  );
}

function Badge({ icon, text }) {
  return (
    <span className="flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
      {icon}
      {text || "N/A"}
    </span>
  );
}