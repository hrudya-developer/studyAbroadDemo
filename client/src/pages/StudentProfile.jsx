import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  ChevronRight,
  Edit,
  IdCard,
  Mail,
  MapPin,
  Phone,
  Trash2,
  User,
  Plane,
  Landmark,
  FileText,
  Headphones,
} from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";

import "swiper/css";
import "swiper/css/pagination";

import avatarFemale from "../assets/avatar1.png";
import avatarMale from "../assets/avatar2.png";
import { countryInfo } from "../redux/slices/countrySlice";

function ProfileRow({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center border-b border-slate-100 py-5">
      <div
        className="mr-5 grid h-11 w-11 place-items-center rounded-xl"
        style={{ background: `${color}20`, color }}
      >
        <Icon size={20} />
      </div>

      <p className="w-44 text-sm font-medium text-slate-500">{label}</p>
      <p className="flex-1 text-sm font-bold text-slate-900">
        {value || "N/A"}
      </p>
    </div>
  );
}

function SectionTitle({ title }) {
  return (
    <div className="mb-5 flex items-center justify-between">
      <h2 className="text-3xl font-black text-slate-950">{title}</h2>
    </div>
  );
}

export default function StudentProfile() {
  const dispatch = useDispatch();

  const { uid, name, email, user } = useSelector((state) => state.auth);

  const { countries, imagePath } = useSelector((state) => state.countryData);

  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_KEY = "overseas@Miak2023";

  useEffect(() => {
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

    if (uid) getProfile();
    else {
      setLoading(false);
      setError("User ID not found. Please login again.");
    }
  }, [uid]);

  useEffect(() => {
    const getDestinations = async () => {
      try {
        const response = await fetch(
          "https://overseas.technocitysolutions.com/public/api/getDestinations",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ api: API_KEY, uid }),
          }
        );

        const result = await response.json();

        const countryData = Array.isArray(result?.destinations)
          ? result.destinations
          : Array.isArray(result?.data)
          ? result.data
          : [];

        dispatch(
          countryInfo({
            countries: countryData,
            imagePath: result?.destinations_image_path || "",
          })
        );
      } catch (err) {
        console.error("Destinations fetch error:", err);
      }
    };

    if (uid) getDestinations();
  }, [uid, dispatch]);

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

  if (loading) {
    return (
      <div className="rounded-[32px] bg-white p-8 shadow-sm">
        <p className="text-lg font-bold text-slate-700">Loading profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[32px] bg-white p-8 shadow-sm">
        <p className="text-lg font-bold text-red-500">{error}</p>
      </div>
    );
  }

  return (
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
              <span className="absolute bottom-2 right-2 h-7 w-7 rounded-full border-4 border-white bg-green-500"></span>
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
              className="destination-swiper"
            >
              {countries.map((item) => {
                const countryImage = item.image
                  ? `${imagePath}${item.image}`
                  : "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop";

                const flagImage = item.flag ? `${imagePath}${item.flag}` : null;

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
          <SectionTitle title="Quick Links" />

          <div className="space-y-1">
            {[
              { icon: User, label: "Book a Free Counseling", color: "#22c55e" },
              { icon: Headphones, label: "IELTS Preparation", color: "#ec4899" },
              { icon: FileText, label: "Visa Guide", color: "#3b82f6" },
              { icon: Landmark, label: "Education Loan", color: "#f97316" },
              { icon: Plane, label: "Pre Departure Guide", color: "#8b5cf6" },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.label}
                  className="flex w-full items-center justify-between rounded-2xl px-2 py-4 transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="grid h-11 w-11 place-items-center rounded-xl"
                      style={{
                        background: `${item.color}20`,
                        color: item.color,
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    <span className="font-semibold text-slate-800">
                      {item.label}
                    </span>
                  </div>

                  <ChevronRight size={20} />
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}