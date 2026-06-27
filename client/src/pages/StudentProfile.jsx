import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  Edit,
  IdCard,
  Mail,
  MapPin,
  Phone,
  Trash2,
  User,
  FileText,
  GraduationCap,
  BookOpen,
  Percent,
  Headphones,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";


import avatarFemale from "../assets/avatar1.png";
import avatarMale from "../assets/avatar2.png";

import { fetchCountries } from "../redux/slices/countrySlice";
import { fetchStudentProfile } from "../redux/slices/studentSlice";
import SDBUpdateStudentProfile from "./SDBUpdateStudentProfile";
import SDBQualificationUpdate from "./SDBQualificationUpdate";
import SDBStudentAccountRemove from "./SDBStudentAccountRemove";

function InfoCard({ icon: Icon, label, value, color }) {
  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-4 flex items-center gap-4">
        <div
          className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl"
          style={{ background: `${color}20`, color }}
        >
          <Icon size={22} />
        </div>

        <p className="text-xs font-black uppercase tracking-wide text-slate-400">
          {label}
        </p>
      </div>

      <p className="break-words text-base font-black text-slate-950">
        {value || "N/A"}
      </p>
    </div>
  );
}

function hasValue(value) {
  return (
    value !== undefined &&
    value !== null &&
    String(value).trim() !== "" &&
    String(value).trim().toLowerCase() !== "null"
  );
}

function getProfileValue(profile, keys, fallback = "") {
  for (const key of keys) {
    if (hasValue(profile?.[key])) return profile[key];
  }
  return fallback;
}

function percentValue(value) {
  return hasValue(value) ? `${value}%` : "";
}

export default function StudentProfile() {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditQualification, setShowEditQualification] = useState(false);
  const dispatch = useDispatch();

  const { uid, name, email, user } = useSelector((state) => state.auth);

  const { countries = [] } = useSelector((state) => state.countryData);

  const {
    profile = {},
    profileLoading,
    profileError,
  } = useSelector((state) => state.studentData);

  useEffect(() => {
    if (uid) {
      dispatch(fetchStudentProfile(uid));
    }
  }, [uid, dispatch]);

  useEffect(() => {
    if (uid && countries.length === 0) {
      dispatch(fetchCountries(uid));
    }
  }, [uid, dispatch, countries.length]);

  const studentName =
    profile?.name ||
    profile?.student_name ||
    profile?.full_name ||
    user?.name ||
    name ||
    "Student";

  const studentEmail = profile?.email || user?.email || email || "N/A";

  const studentPhone =
    profile?.mobile ||
    profile?.phone ||
    profile?.contact ||
    profile?.phone_number ||
    user?.mobile ||
    "N/A";

  const studentDob =
    profile?.dob ||
    profile?.date_of_birth ||
    profile?.birth_date ||
    user?.dob ||
    "N/A";

  const studentGender = profile?.gender || user?.gender || "N/A";

  const studentPlace =
    profile?.address ||
    profile?.place ||
    profile?.location ||
    profile?.city ||
    user?.address ||
    "N/A";

  const genderValue = String(studentGender).toLowerCase();

  const studentImage =
    profile?.image ||
    profile?.photo ||
    profile?.profile_image ||
    profile?.avatar ||
    user?.image ||
    user?.photo ||
    (genderValue === "male"
      ? avatarMale
      : genderValue === "female"
      ? avatarFemale
      : "https://cdn-icons-png.flaticon.com/512/847/847969.png");

  const profileRows = [
    {
      icon: IdCard,
      label: "User name",
      value: studentName,
      color: "#8b5cf6",
    },
    {
      icon: Mail,
      label: "Email",
      value: studentEmail,
      color: "#7c3aed",
    },
    {
      icon: Phone,
      label: "Contact",
      value: studentPhone,
      color: "#22c55e",
    },
    {
      icon: CalendarDays,
      label: "Date of Birth",
      value: studentDob,
      color: "#f97316",
    },
    {
      icon: User,
      label: "Gender",
      value: studentGender,
      color: "#ec4899",
    },
    {
      icon: MapPin,
      label: "Place",
      value: studentPlace,
      color: "#3b82f6",
    },
  ];

  const qualificationRows = [
    {
      icon: GraduationCap,
      label: "Highest Qualification",
      value: getProfileValue(profile, ["highest"]),
      color: "#cb0e10",
    },
    {
      icon: BookOpen,
      label: "Tenth Syllabus",
      value: getProfileValue(profile, ["tenth_syllabus"]),
      color: "#7c3aed",
    },
    {
      icon: Percent,
      label: "Tenth Overall",
      value: percentValue(profile?.tenth_overall),
      color: "#f97316",
    },
    {
      icon: BookOpen,
      label: "Twelfth Stream",
      value: getProfileValue(profile, ["twelth_stream"]),
      color: "#3b82f6",
    },
    {
      icon: Percent,
      label: "Twelfth Overall",
      value: percentValue(profile?.twelth_overall),
      color: "#22c55e",
    },
    {
      icon: Percent,
      label: "Twelfth English",
      value: percentValue(profile?.twelth_english),
      color: "#ec4899",
    },
    {
      icon: GraduationCap,
      label: "Degree Stream",
      value: getProfileValue(profile, ["degree_stream"]),
      color: "#0f766e",
    },
    {
      icon: Percent,
      label: "Degree Overall",
      value: percentValue(profile?.degree_overall),
      color: "#ca8a04",
    },
    {
      icon: Percent,
      label: "Degree English",
      value: percentValue(profile?.degree_english),
      color: "#dc2626",
    },
    {
      icon: GraduationCap,
      label: "PG Stream",
      value: getProfileValue(profile, ["pg_stream"]),
      color: "#2563eb",
    },
    {
      icon: Percent,
      label: "PG Overall",
      value: percentValue(profile?.pg_overall),
      color: "#16a34a",
    },
    {
      icon: Percent,
      label: "PG English",
      value: percentValue(profile?.pg_english),
      color: "#9333ea",
    },
    {
      icon: Headphones,
      label: "IELTS Overall",
      value: getProfileValue(profile, ["ielts_overall"]),
      color: "#cb0e10",
    },
    {
      icon: Headphones,
      label: "IELTS Listening",
      value: getProfileValue(profile, ["ielts_l"]),
      color: "#7c3aed",
    },
    {
      icon: Headphones,
      label: "IELTS Reading",
      value: getProfileValue(profile, ["ielts_r"]),
      color: "#3b82f6",
    },
    {
      icon: Headphones,
      label: "IELTS Writing",
      value: getProfileValue(profile, ["ielts_w"]),
      color: "#f97316",
    },
    {
      icon: Headphones,
      label: "IELTS Speaking",
      value: getProfileValue(profile, ["ielts_s"]),
      color: "#22c55e",
    },
  ].filter((item) => hasValue(item.value));

  if (!uid) {
    return (
      <div className="rounded-[32px] bg-white p-8 shadow-sm">
        <p className="text-lg font-bold text-red-500">
          User ID not found. Please login again.
        </p>
      </div>
    );
  }

  if (profileLoading) {
    return (
      <div className="rounded-[32px] bg-white p-8 shadow-sm">
        <p className="text-lg font-bold text-slate-700">Loading profile...</p>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="rounded-[32px] bg-white p-8 shadow-sm">
        <p className="text-lg font-bold text-red-500">{profileError}</p>
      </div>
    );
  }

  return (
    <section className="space-y-6">
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#ffcaca] to-[#fbd5ff] p-5 shadow-sm sm:p-8">
        <div className="grid items-center gap-6 md:grid-cols-[140px_1fr]">
          <div className="relative mx-auto md:mx-0">
            <img
              src={studentImage}
              alt="student"
              className="h-32 w-32 rounded-full object-cover ring-8 ring-white sm:h-36 sm:w-36"
            />
            <span className="absolute bottom-2 right-2 h-7 w-7 rounded-full border-4 border-white bg-green-500" />
          </div>

          <div className="text-center md:text-left">
            <p className="mb-2 font-bold text-primary">Welcome back, 👋</p>

            <h1 className="text-2xl font-black leading-tight text-slate-950 sm:text-3xl">
              Hello, <span className="text-primary">{studentName}!</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Your journey to global education starts with the right guidance.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] bg-slate-50 p-5 shadow-sm sm:p-8">
        <div className="mb-6 flex gap-4 justify-between">
          <h2 className="text-2xl font-bold text-black sm:text-2xl">
            My Profile
          </h2>

         <button
  type="button"
  onClick={() => setShowEditProfile(true)}
  className="flex items-center justify-center gap-2 rounded-2xl bg-primary p-2 md:p-3 rounded-full text-sm font-bold text-white transition hover:bg-secondary"
>
  <Edit size={18} />
  
</button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {profileRows.map((item) => (
            <InfoCard
              key={item.label}
              icon={item.icon}
              label={item.label}
              value={item.value}
              color={item.color}
            />
          ))}
        </div>

        {qualificationRows.length > 0 && (
          <div className="mt-8">
           <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
  <div className="flex items-center gap-3">
    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-red-50 text-primary">
      <FileText size={22} />
    </div>

    <h3 className="text-2xl font-bold text-slate-950">
      Qualification Details
    </h3>
  </div>

  <button
    type="button"
    onClick={() => setShowEditQualification(true)}
    className="flex items-center justify-center gap-2 rounded-2xl bg-primary p-2 md:p-3 rounded-full text-sm font-bold text-white transition hover:bg-secondary"
  >
    <Edit size={18} />
   
  </button>
</div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {qualificationRows.map((item) => (
                <InfoCard
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                  color={item.color}
                />
              ))}
            </div>
          </div>
        )}

      <SDBStudentAccountRemove />
      </div>
      <SDBUpdateStudentProfile
  open={showEditProfile}
  onClose={() => setShowEditProfile(false)}
/>

<SDBQualificationUpdate
  open={showEditQualification}
  onClose={() => setShowEditQualification(false)}
  onUpdated={async () => {
    setShowEditQualification(false);
    await dispatch(fetchStudentProfile(uid));
  }}
/>
    </section>
  );
}