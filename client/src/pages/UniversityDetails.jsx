import {
  ArrowLeft,
  MapPin,
  Star,
  Landmark,
  BookOpen,
  Trophy,
  BarChart3,
  ArrowRight,
  CheckCircle,
  Globe,
  GraduationCap,
  ExternalLink,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";


import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";

import { fetchUniversityDetails } from "../redux/slices/universitySlice";
import CoursesOfUniv from "../pages/CoursesOfUniv";


export default function UniversityDetails() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const routeLocation = useLocation();

 const [searchParams, setSearchParams] = useSearchParams();

const activeTab = searchParams.get("tab") || "about";

const handleTabChange = (tab) => {
  setSearchParams({ tab });
};

  const stateUniversity = routeLocation.state?.university;
  const stateCountry = routeLocation.state?.country;

  const { uid } = useSelector((state) => state.auth);
  const safeUid = uid ?? 0;

  const {
    selectedUniversity,
    selectedInfo,
    selectedSliders,
    selectedCourses,
    universityImagePath,
    sliderImagePath,
    detailsLoading,
    detailsError,
  } = useSelector((state) => state.universityData);

  useEffect(() => {
    if (id) {
      dispatch(fetchUniversityDetails({ uid: safeUid, id }));
    }
  }, [dispatch, safeUid, id]);

  if (detailsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f9fd]">
        <p className="font-bold text-[#081c47]">
          Loading university details...
        </p>
      </div>
    );
  }

  if (detailsError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f9fd] px-4">
        <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
          <h2 className="mb-3 text-2xl font-black text-[#081c47]">
            Failed to load details
          </h2>
          <p className="mb-6 text-sm text-slate-500">{detailsError}</p>
          <button
            onClick={() => navigate(-1)}
            className="rounded-full bg-transparent px-6 py-3 font-bold text-white border border-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const university = selectedUniversity || stateUniversity;

  if (!university) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f7f9fd] px-4">
        <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
          <h2 className="mb-3 text-2xl font-black text-[#081c47]">
            University details not found
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="rounded-full bg-transparent px-6 py-3 font-bold text-white border border-white"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const cleanImagePath = universityImagePath?.replace(/\/$/, "");
  const cleanSliderPath = sliderImagePath?.replace(/\/$/, "");

  const universityName = university?.name || "University";

 const logo =
  university?.logo && cleanImagePath
    ? `${cleanImagePath}/${university.logo}`
    : null;

  const countryName =
    university?.country || stateCountry?.country || "Country not available";

  const locationText = university?.location || university?.city || countryName;

  const ranking = university?.rank || "N/A";

  const universityType =
    university?.type || university?.university_type || "Private University";

  const scholarship =
    university?.scholarship === "yes" ? "Available" : "Not Available";

  const withoutIelts =
    university?.without_ielts === "yes" ? "Not Required" : "Required";

  const withoutGre =
    university?.without_gre === "yes" ? "Not Required" : "Required";

  const withoutGmat =
    university?.without_gmat === "yes" ? "Not Required" : "Required";

  const applicationFeeWaiver =
    university?.applicationfeewaiver === "yes" ? "Available" : "Not Available";

  const aboutText =
    selectedInfo?.find((item) => item.type === "about")?.text ||
    `${universityName} is located in ${locationText}. Explore university details, ranking, scholarship availability, and admission requirements.`;

  const infoItems = selectedInfo?.filter((item) => item.type === "info") || [];

  const sliderImages =
    selectedSliders?.length > 0 && cleanSliderPath
      ? selectedSliders.map((item) => `${cleanSliderPath}/${item.image}`)
      : logo
      ? [logo]
      : [];

  const mapQuery = encodeURIComponent(`${universityName}, ${locationText}`);
  const googleMapUrl = `https://www.google.com/maps?q=${mapQuery}&output=embed`;
  const googleMapOpenUrl = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;

  const stats = [
    { icon: Landmark, label: "Type", value: universityType },
    { icon: MapPin, label: "Location", value: locationText },
    { icon: Trophy, label: "Ranking", value: ranking },
    { icon: Star, label: "Scholarship", value: scholarship },
    { icon: BookOpen, label: "IELTS", value: withoutIelts },
    { icon: GraduationCap, label: "GRE", value: withoutGre },
    { icon: BarChart3, label: "GMAT", value: withoutGmat },
    {
      icon: CheckCircle,
      label: "Application Fee Waiver",
      value: applicationFeeWaiver,
    },
  ];

  return (
    <main className="mx-auto min-h-screen max-w-9xl bg-[#f7f9fd] text-[#081c47]">
      <section className="relative overflow-hidden bg-white">
        <div className="absolute right-8 top-5 z-3">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-md"
          >
            <ArrowLeft className="h-5 w-5 text-primary" />
            Go Back
          </button>
        </div>

        <div className="relative h-[400px] overflow-hidden sm:h-[500px] lg:h-[440px]">
          {sliderImages.length > 0 ? (
            <Swiper
              modules={[Autoplay]}
              loop={sliderImages.length > 1}
              autoplay={
                sliderImages.length > 1
                  ? { delay: 3500, disableOnInteraction: false }
                  : false
              }
              className="h-full w-full"
            >
              {sliderImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`${universityName} slide ${index + 1}`}
                    className="h-full w-full object-cover object-center transform-gpu [image-rendering:auto]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-100 text-secondary">
              <Landmark className="h-24 w-24" />
            </div>
          )}

          <div className="absolute inset-0 z-1 bg-gradient-to-r from-black/90 via-black/75 to-black/70" />

          <div className="absolute inset-0 z-2 flex items-center px-4 pt-1 sm:px-8 lg:px-14 justify-between">
            <div className="max-w-7xl">
              
              {/* <p className="my-10 inline-flex rounded-full bg-primary px-4 py-2 text-xs font-black uppercase tracking-widest text-white ring-1 ring-white/20 backdrop-blur-md">
                University Profile
              </p> */}
                      <div className="flex gap-5 items-center md:items-center my-5 flex-col sm:flex-col md:flex-row mt-24 md:mt-2">
                        <div className="w-14 h-14 sm:h-18 sm:w-18 overflow-hidden bg-white rounded-full shadow-lg p-2 relative grid place-content-center">
  {logo && (
    <img
      src={logo}
      alt={universityName}
      className="h-12 w-12 sm:w-16 sm:h-16 object-contain rounded-full"
    />
  )}
  {/* <div className="bg-primary text-white font-extrabold grid place-content-center size-10 rounded-full text-4xl">{ranking}</div> */}
</div>

              <h1 className="text-2xl text-center md:text-left font-bold leading-tight tracking-[-0.04em] text-white sm:text-3xl lg:text-4xl">
                {universityName}
                <CheckCircle className="ml-3 inline h-8 w-8 fill-primary text-white" />
              </h1></div> 

              <p className="mt-5 flex items-center justify-center md:justify-start gap-2 text-md font-bold text-[#f0ea2c]">
                <MapPin className="h-6 w-6 text-[#f0ea2c]" />
                {locationText}
              </p>

              <div className="my-7 flex flex-wrap justify-center md:justify-start gap-3">
                <span className="flex items-center gap-2 rounded-full bg-white px-3 py-2 font-semibold text-primary text-sm md:shadow-md">
                  <Star className="h-5 w-5" />
                  Ranking {ranking}
                </span>

                <span className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 font-semibold text-sm md:shadow-md text-white ring-1 ring-white/20 backdrop-blur-md">
                  <Landmark className="h-5 w-5" />
                  {universityType}
                </span>

                <span className="flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 font-semibold text-sm md:shadow-md text-white ring-1 ring-white/20 backdrop-blur-md">
                  <Globe className="h-5 w-5" />
                  {countryName}
                </span>
              </div>
            </div>
   
          </div>
        </div>
      </section>

     <nav className="flex overflow-x-auto border-b border-[#e6eaf2] bg-white px-4 sm:px-8 lg:px-14">
  <button
    onClick={() => handleTabChange("about")}
    className={`flex min-w-fit items-center gap-3 px-6 py-5 font-extrabold uppercase ${
      activeTab === "about"
        ? "border-b-4 border-darkPrimary text-darkPrimary"
        : "text-[#51607d]"
    }`}
  >
    <Landmark className="h-6 w-6" />
    About
  </button>

  <button
    onClick={() => handleTabChange("courses")}
    className={`flex min-w-fit items-center gap-3 px-6 py-5 font-extrabold uppercase ${
      activeTab === "courses"
        ? "border-b-4 border-secondary text-secondary"
        : "text-[#51607d]"
    }`}
  >
    <BookOpen className="h-6 w-6" />
    Courses
  </button>
</nav>

      {activeTab === "about" && (
        <>
          <section className="grid gap-6 px-4 py-6 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:px-14">
            <article className="rounded-3xl bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-10">
              <p className="mb-3 text-sm font-black uppercase text-secondary">
                About the University
              </p>

              <div className="mb-5 h-1 w-12 rounded-full bg-primary" />

              <h2 className="mb-5 text-2xl font-bold leading-tight sm:text-3xl">
                Study at{" "}
                <span className="text-darkPrimary">{universityName}</span>
              </h2>

              <p className="text-sm font-medium leading-7 text-[#081c47]/80 sm:text-base">
                {aboutText}
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <InfoBadge label="Scholarship" value={scholarship} />
                <InfoBadge label="IELTS" value={withoutIelts} />
                <InfoBadge label="GRE" value={withoutGre} />
                <InfoBadge label="GMAT" value={withoutGmat} />
              </div>

          <button
  onClick={() => handleTabChange("courses")}
  className="mt-7 flex items-center gap-3 rounded-xl bg-primary px-6 py-4 font-extrabold text-white shadow-lg shadow-red-900/20 hover:cursor-pointer hover:bg-darkPrimary"
>
                Explore Courses
                <ArrowRight className="h-5 w-5" />
              </button>
            </article>

            <article className="relative overflow-hidden rounded-3xl border border-[#e6eaf2] bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-10">
              <div className="absolute -right-12 bottom-0 text-[160px] font-black leading-none text-primary/15 sm:text-[220px]">
                {ranking !== "N/A" ? ranking : "UNI"}
              </div>

              <div className="relative">
                <p className="mb-3 text-sm font-black uppercase text-secondary">
                  Quick Info
                </p>

                <div className="space-y-4">
                  <FactRow label="Country" value={countryName} />
                  <FactRow label="Location" value={locationText} />
                  <FactRow label="Type" value={universityType} />
                  <FactRow label="Ranking" value={ranking} />

                  {infoItems.map((item, index) => {
                    const [label, ...rest] = item.text.split(":");

                    return (
                      <FactRow
                        key={index}
                        label={label?.trim() || `Info ${index + 1}`}
                        value={rest.length ? rest.join(":").trim() : item.text}
                      />
                    );
                  })}
                </div>
              </div>
            </article>
          </section>

          <section className="grid gap-4 px-4 pb-10 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-14">
            {stats.map(({ icon: Icon, label, value }) => (
              <article
                key={label}
                className="group rounded-2xl border border-[#e6eaf2] bg-white p-5 shadow-lg shadow-slate-900/5 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-darkPrimary text-white ring-4 ring-[#cb0e10]/10">
                  <Icon className="h-8 w-8" />
                </div>

                <p className="mb-1 text-xs font-black uppercase text-[#51607d]">
                  {label}
                </p>

                <h3 className="break-words text-lg font-black leading-snug">
                  {value}
                </h3>

                <div className="mt-4 h-1 w-10 rounded-full bg-primary" />
              </article>
            ))}
          </section>

          <section className="px-4 pb-10 sm:px-8 lg:px-14">
            <div className="overflow-hidden rounded-3xl border border-[#e6eaf2] bg-white shadow-xl shadow-slate-900/5">
              <div className="flex flex-col gap-4 border-b border-[#e6eaf2] p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-black uppercase text-secondary">
                    Exact Location
                  </p>

                  <h2 className="mt-1 text-2xl font-black text-[#081c47]">
                    {universityName}
                  </h2>

                  <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-500">
                    <MapPin className="h-4 w-4 text-secondary" />
                    {locationText}
                  </p>
                </div>

                <a
                  href={googleMapOpenUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white"
                >
                  Open in Google Maps
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>

              <iframe
                title={`${universityName} map`}
                src={googleMapUrl}
                className="h-[320px] w-full border-0 sm:h-[420px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </section>
        </>
      )}

{activeTab === "courses" && (
  <section className="px-4 py-6 sm:px-8 lg:px-14">
    <CoursesOfUniv courseCategoryId={selectedCourses?.[0]?.c_id} />
  </section>
)}
    </main>
  );
}

function InfoBadge({ label, value }) {
  const positive = value === "Available" || value === "Not Required";

  return (
    <div className="rounded-2xl border border-[#e6eaf2] bg-[#f7f9fd] p-4">
      <p className="mb-1 text-xs font-black uppercase text-slate-500">
        {label}
      </p>

      <p
        className={`font-black ${
          positive ? "text-emerald-600" : "text-primary"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function FactRow({ label, value }) {
  return (
    <div className="rounded-2xl bg-[#f7f9fd] p-4">
      <p className="text-xs font-black uppercase text-slate-500">{label}</p>
      <p className="mt-1 break-words font-black text-[#081c47]">{value}</p>
    </div>
  );
}