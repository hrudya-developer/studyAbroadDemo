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
<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";

=======
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";

import "swiper/css";
import "swiper/css/pagination";
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e

import avatarFemale from "../assets/avatar1.png";
import avatarMale from "../assets/avatar2.png";

import { fetchCountries } from "../redux/slices/countrySlice";
<<<<<<< HEAD
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
=======
import SDBLanguagePrograms from "./SDBLanguagePrograms";

function ProfileRow({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center border-b border-slate-100 py-5">
      <div
        className="mr-5 grid h-11 w-11 shrink-0 place-items-center rounded-xl"
        style={{ background: `${color}20`, color }}
      >
        <Icon size={20} />
      </div>

      <p className="w-44 shrink-0 text-sm font-medium text-slate-500">
        {label}
      </p>

      <p className="flex-1 break-words text-sm font-bold text-slate-900">
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
        {value || "N/A"}
      </p>
    </div>
  );
}

<<<<<<< HEAD
=======
function SectionTitle({ title }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-3xl font-black text-slate-950">{title}</h2>
    </div>
  );
}

>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
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
<<<<<<< HEAD
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
=======
  const dispatch = useDispatch();

  const { uid, name, email, user } = useSelector((state) => state.auth);
  const { countries = [], imagePath = "" } = useSelector(
    (state) => state.countryData
  );

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = "overseas@Miak2023";

  const getProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/getStudentProfile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ api: API_KEY, uid }),
        }
      );

      const result = await response.json();

      if (!response.ok || result?.status === false) {
        throw new Error(
          result?.msg || result?.message || "Failed to fetch profile"
        );
      }

      const studentData = Array.isArray(result?.data)
        ? result.data[0]
        : result?.data;

      setProfile(studentData || {});
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (uid) {
      getProfile();
    } else {
      setLoading(false);
      setError("User ID not found. Please login again.");
    }
  }, [uid]);
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e

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

<<<<<<< HEAD
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

=======
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
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

<<<<<<< HEAD
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
=======
  if (loading) {
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
    return (
      <div className="rounded-[32px] bg-white p-8 shadow-sm">
        <p className="text-lg font-bold text-slate-700">Loading profile...</p>
      </div>
    );
  }

<<<<<<< HEAD
  if (profileError) {
    return (
      <div className="rounded-[32px] bg-white p-8 shadow-sm">
        <p className="text-lg font-bold text-red-500">{profileError}</p>
=======
  if (error) {
    return (
      <div className="rounded-[32px] bg-white p-8 shadow-sm">
        <p className="text-lg font-bold text-red-500">{error}</p>
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
      </div>
    );
  }

  return (
<<<<<<< HEAD
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

            <h1 className="text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
              Hello, <span className="text-primary">{studentName}!</span>
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Your journey to global education starts with the right guidance.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] bg-slate-50 p-5 shadow-sm sm:p-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-black text-slate-950 sm:text-4xl">
            My Profile
          </h2>

         <button
  type="button"
  onClick={() => setShowEditProfile(true)}
  className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-secondary"
>
  <Edit size={18} />
  Edit Details
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

    <h3 className="text-2xl font-black text-slate-950">
      Qualification Details
    </h3>
  </div>

  <button
    type="button"
    onClick={() => setShowEditQualification(true)}
    className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-secondary"
  >
    <Edit size={18} />
    Edit Qualification
  </button>
</div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {qualificationRows.map((item) => (
                <InfoCard
=======
    <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_420px]">
      <section className="space-y-6">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-r from-[#ffcaca] to-[#fbd5ff] p-8 shadow-sm">
          <div className="grid items-center gap-8 lg:grid-cols-[160px_1fr]">
            <div className="relative">
              <img
                src={studentImage}
                alt="student"
                className="h-36 w-36 rounded-full object-cover ring-8 ring-white"
              />
              <span className="absolute bottom-2 right-2 h-7 w-7 rounded-full border-4 border-white bg-green-500" />
            </div>

            <div>
              <p className="mb-3 font-bold text-primary">Welcome back, 👋</p>
              <h1 className="text-5xl font-black leading-tight text-slate-950">
                Hello, <span className="text-primary">{studentName}!</span>
              </h1>
              <p className="mt-5 max-w-md text-lg leading-8 text-slate-600">
                Your journey to global education starts with the right guidance.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[32px] bg-white p-8 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-4xl font-black text-slate-950">My Profile</h2>

            <button className="flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-secondary">
              <Edit size={18} />
              Edit Details
            </button>
          </div>

          <ProfileRow icon={IdCard} label="User name" value={studentName} color="#8b5cf6" />
          <ProfileRow icon={Mail} label="Email" value={studentEmail} color="#7c3aed" />
          <ProfileRow icon={Phone} label="Contact" value={studentPhone} color="#22c55e" />
          <ProfileRow icon={CalendarDays} label="Date of Birth" value={studentDob} color="#f97316" />
          <ProfileRow icon={User} label="Gender" value={studentGender} color="#ec4899" />
          <ProfileRow icon={MapPin} label="Place" value={studentPlace} color="#3b82f6" />

          {qualificationRows.length > 0 && (
            <>
              <div className="mb-2 mt-8 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-red-50 text-primary">
                  <FileText size={20} />
                </div>
                <h3 className="text-2xl font-black text-slate-950">
                  Qualification Details
                </h3>
              </div>

              {qualificationRows.map((item) => (
                <ProfileRow
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  value={item.value}
                  color={item.color}
                />
              ))}
<<<<<<< HEAD
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
=======
            </>
          )}

          <button className="mt-8 flex w-full items-center justify-center gap-3 rounded-2xl bg-gray-100 py-4 text-base font-bold text-primary transition hover:cursor-pointer hover:bg-primary hover:text-white">
            <Trash2 size={18} />
            Disable Account
          </button>
        </div>
      </section>

      <aside className="space-y-6">
        <div className="rounded-[32px] bg-white p-6 shadow-sm">
          <SectionTitle title="Our Destinations" />

          {countries?.length > 0 ? (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={16}
              slidesPerView={2}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              loop={countries.length > 2}
              breakpoints={{
                0: { slidesPerView: 1 },
                500: { slidesPerView: 2 },
              }}
            >
              {countries.map((item) => {
                const countryImage = item.image
                  ? `${imagePath}/${item.image}`
                  : "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop";

                const flagImage = item.flag ? `${imagePath}/${item.flag}` : null;

                return (
                  <SwiperSlide key={item.id || item.country}>
                    <div className="relative overflow-hidden rounded-3xl">
                      <img
                        src={countryImage}
                        alt={item.country || "Destination"}
                        className="h-56 w-full object-cover transition duration-500 hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      <div className="absolute left-4 top-4 rounded-full bg-white/90 p-2 text-sm font-black text-slate-900 backdrop-blur">
                        {flagImage ? (
                          <img
                            src={flagImage}
                            alt={item.country || "flag"}
                            className="h-10 w-10 rounded-full object-cover shadow-sm"
                          />
                        ) : (
                          "🌍"
                        )}
                      </div>

                      <div className="absolute bottom-5 left-5">
                        <h3 className="text-2xl font-black text-white">
                          {item.country || "Destination"}
                        </h3>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <p className="text-sm font-semibold text-slate-500">
              No destinations found
            </p>
          )}
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-sm">
          <SDBLanguagePrograms />
        </div>
      </aside>
    </div>
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
  );
}