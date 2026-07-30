import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchDestinationDetails } from "../redux/slices/countrySlice";
import ButtonPrimary from "../components/ButtonPrimary";
import FreeCounsellingForm from "../pages/FreeCounsellingForm";

import {
  FaUniversity,
  FaGlobeEurope,
  FaPhoneAlt,
  FaThermometerHalf,
  FaMoneyBillWave,
  FaLanguage,
  FaArrowRight,
  FaCheck,
} from "react-icons/fa";

import UnivOfCountry from "../pages/UnivOfCountry"
import FAQ from "../layout/FAQ/FAQ";
import CountryDetailsSEO from "./CountryDetailsSEO";

const InfoCard = ({ icon, label, value }) => (
  <div className="flex flex-col justify-center text-center items-center gap-4 px-3 py-5 border border-gray-50 bg-[#f1f1f1] shadow-md rounded-xl">
    <div className="h-14 w-14 shrink-0 rounded-full bg-primary text-white flex items-center justify-center text-xl">
      {icon}
    </div>

    <div>
      <p className="text-sm text-slate-500">{label}</p>
      <h4 className="font-bold text-slate-900">{value || "N/A"}</h4>
    </div>
  </div>
);

const Feature = ({ text }) => (
  <div className="flex items-center gap-3">
    <div className="h-12 w-12 shrink-0 rounded-full bg-primary text-white flex items-center justify-center">
      <FaCheck />
    </div>
    <p className="text-sm font-medium text-slate-700">{text}</p>
  </div>
);

const CountryDetails = () => {

  const [showCounsellingPopup, setShowCounsellingPopup] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  const { uid } = useSelector((state) => state.auth);

  const { destinationDetails, imagePath, detailsLoading } = useSelector(
    (state) => state.countryData
  );

  const safeUid = uid ?? 0;

  useEffect(() => {
    dispatch(
      fetchDestinationDetails({
        uid: safeUid,
        id: Number(id),
      })
    );
  }, [dispatch, safeUid, id]);

  useEffect(() => {
  if (!showCounsellingPopup) return;

  const originalBodyOverflow = document.body.style.overflow;
  const originalHtmlOverflow = document.documentElement.style.overflow;

  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = originalBodyOverflow;
    document.documentElement.style.overflow = originalHtmlOverflow;
  };
}, [showCounsellingPopup]);

  if (detailsLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  const country =
    destinationDetails?.data?.find((item) => item.id === Number(id)) ||
    destinationDetails?.data?.[0];

  const attractions = destinationDetails?.attractions || [];

  const fallbackImage =
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828";

  const cleanImagePath = imagePath?.replace(/\/$/, "");

  const defaultBasePath =
    "https://overseas.technocitysolutions.com/public/uploads/destination";

  const finalImagePath = cleanImagePath || defaultBasePath;

  const image = country?.image
    ? `${finalImagePath}/${country.image}`
    : fallbackImage;

  const flag = country?.flag
    ? `${finalImagePath}/${country.flag}`
    : null;

  return (
    <>
        <CountryDetailsSEO
      country={country}
      countryId={id}
      image={image}
      flag={flag}
      attractions={attractions}
    />
    <main className="bg-[#f8fafc]">
      {/* Hero Section */}
      {/* Hero Section */}
<section className="overflow-hidden bg-[#e8f5ff]">
  <div
    className="
      mx-auto grid min-h-[560px] max-w-7xl
      items-center gap-12 px-5 py-12
      sm:px-8
      lg:grid-cols-[0.95fr_1.05fr]
      lg:px-10 lg:py-16
    "
  >
    {/* Left content */}
    <div className="relative z-10">
      <div
        className="
          mb-6 inline-flex items-center gap-2
          rounded-full border border-secondary/20
          bg-white/80 px-4 py-2
          text-sm font-bold text-secondary
          shadow-sm backdrop-blur-sm
        "
      >
        {flag && (
          <img
            src={flag}
            alt=""
            aria-hidden="true"
            width="24"
            height="24"
            className="h-6 w-6 rounded-full object-cover"
          />
        )}

        Study Destination
      </div>

      <h1
        className="
          max-w-2xl text-3xl font-extrabold
          leading-[1.08] tracking-tight text-slate-950
          sm:text-4xl lg:text-5xl xl:text-5xl
        "
      >
        Build Your Future by Studying in{" "}
        <span
          className="
            mt-2 inline-block bg-secondary rounded-2xl
            px-3 py-1 text-white
          "
        >
          {country?.country || "Your Dream Country"}
        </span>
      </h1>

      <p
        className="
          mt-7 max-w-xl text-base font-medium
          leading-8 text-slate-600
          sm:text-lg
        "
      >
        Explore globally recognised universities, career-focused courses and
        exciting opportunities in {country?.country || "your preferred destination"}.
      </p>

      <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
        <a
          href="#universities"
          className="
            inline-flex min-h-14 items-center justify-center gap-3
            rounded-xl bg-primary px-4 py-2.5
            text-sm font-semibold text-white
            shadow-[0_14px_30px_rgba(4,102,175,0.25)]
            transition
            hover:-translate-y-1 hover:bg-darkPrimary
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-secondary hover:cursor-pointer
            focus-visible:ring-offset-2
          "
        >
          Explore Universities
          <FaArrowRight aria-hidden="true" />
        </a>

        <button
          type="button"
          onClick={() => setShowCounsellingPopup(true)}
          className="
            inline-flex min-h-14 items-center justify-center gap-2
            rounded-full px-5 py-4
            text-base font-bold text-slate-950
            underline decoration-secondary
            decoration-2 underline-offset-4
            transition hover:text-primary
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
            focus-visible:ring-offset-2
          "
        >
          Request a Callback
          <FaArrowRight
            aria-hidden="true"
            className="-rotate-45 text-secondary"
          />
        </button>
      </div>
    </div>

    {/* Right visual */}
    <div className="relative mx-auto w-full max-w-[620px]">
      

      <div
        className="
          relative min-h-[430px] overflow-hidden
          rounded-[55px] bg-[#b9ddf8]
          sm:min-h-[500px]
        "
      >
        <img
          src={image}
          alt={`Study opportunities in ${country?.country || "this destination"}`}
          width="700"
          height="560"
          fetchPriority="high"
          className="
            absolute inset-0 h-full w-full
            object-cover object-center
          "
          onError={(event) => {
            event.currentTarget.src = fallbackImage;
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-transparent to-white/10" />

        <div
          className="
            absolute bottom-0 left-0 right-0
            bg-gradient-to-t from-slate-950/80 to-transparent
            px-6 pb-7 pt-24 text-white
          "
        >
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/75">
            Your global journey starts here
          </p>

          <p className="mt-2 text-2xl font-black">
            Study in {country?.country}
          </p>
        </div>
      </div>

      {/* Top information card */}
      <div
        className="
          absolute right-[-8px] top-10
          hidden min-w-[210px] items-center gap-4
          rounded-2xl bg-white/95 p-4
          shadow-[0_18px_45px_rgba(15,23,42,0.16)]
          backdrop-blur-md
          sm:flex
        "
      >
        <div
          className="
            grid h-12 w-12 shrink-0 place-content-center
            rounded-xl bg-secondary/10 text-xl text-secondary
          "
        >
          <FaUniversity />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Capital
          </p>

          <p className="mt-1 font-black text-slate-900">
            {country?.capital || "Explore"}
          </p>
        </div>
      </div>

      {/* Middle information card */}
      <div
        className="
          absolute -left-5 top-1/2
          hidden -translate-y-1/2 items-center gap-3
          rounded-2xl bg-white/95 p-4
          shadow-[0_18px_45px_rgba(15,23,42,0.16)]
          backdrop-blur-md
          md:flex
        "
      >
        <div className="flex -space-x-3">
          <span className="grid h-10 w-10 place-content-center rounded-full border-2 border-white bg-primary text-sm font-bold text-white">
            M
          </span>

          <span className="grid h-10 w-10 place-content-center rounded-full border-2 border-white bg-secondary text-sm font-bold text-white">
            S
          </span>

          <span className="grid h-10 w-10 place-content-center rounded-full border-2 border-white bg-logoYellow text-sm font-bold text-slate-900">
            +
          </span>
        </div>

        <div>
          <p className="font-black text-slate-900">Expert Guidance</p>
          <p className="text-xs text-slate-500">
            Admissions and visa support
          </p>
        </div>
      </div>

      {/* Bottom information card */}
      <div
        className="
          absolute -right-3 bottom-10
          hidden w-[150px] rounded-2xl
          bg-white/95 p-4 text-center
          shadow-[0_18px_45px_rgba(15,23,42,0.16)]
          backdrop-blur-md
          sm:block
        "
      >
        <div
          className="
            mx-auto grid h-16 w-16 place-content-center
            rounded-full border-[7px] border-secondary/15
            text-lg font-black text-secondary
          "
        >
          100%
        </div>

        <p className="mt-2 text-xs font-bold text-slate-600">
          Counselling Support
        </p>
      </div>
    </div>
  </div>

  {/* Statistics strip */}
  <div className="bg-darkPrimary">
    <div
      className="
        mx-auto grid max-w-7xl grid-cols-2
        divide-x divide-white/10 px-4
        sm:grid-cols-4
      "
    >
      {[
        {
          value: "100+",
          label: "Universities",
        },
        {
          value: "500+",
          label: "Courses",
        },
        {
          value: "25+",
          label: "Destinations",
        },
        {
          value: "10K+",
          label: "Students Guided",
        },
      ].map((stat) => (
        <div
          key={stat.label}
          className="px-4 py-6 text-center sm:py-7"
        >
          <p className="text-3xl font-black text-white lg:text-4xl">
            {stat.value}
          </p>

          <p className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-white/70">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Quick Info */}
      <section className="max-w-7xl mx-auto mt-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <InfoCard icon={<FaUniversity />} label="Capital" value={country?.capital} />

          <InfoCard icon={<FaLanguage />} label="Language" value={country?.language} />

          <InfoCard
            icon={<FaMoneyBillWave />}
            label="Currency"
            value={
              country?.currency
                ? `${country.currency} ${country.currency_symbol || ""}`
                : "N/A"
            }
          />

          <InfoCard icon={<FaPhoneAlt />} label="Dialing Code" value={country?.diallingcode} />

          <InfoCard icon={<FaThermometerHalf />} label="Temperature" value={country?.temperature} />

          <InfoCard icon={<FaGlobeEurope />} label="Continent" value={country?.continent} />
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md overflow-hidden grid md:grid-cols-2">
          <div className="bg-slate-100 flex items-center justify-center p-8">
            <img
              src={flag || image}
              alt={country?.country}
              className="h-72 w-full object-contain rounded-xl"
              onError={(e) => {
                e.currentTarget.src = image;
              }}
            />
          </div>

          <div className="p-8">
            <h2 className="text-3xl font-extrabold text-slate-950">
              About {country?.country}
            </h2>

            <p className="mt-5 text-slate-600 leading-relaxed">
              {country?.description}
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div>
                <p className="text-sm text-slate-500">Capital</p>
                <h4 className="font-bold">{country?.capital}</h4>
              </div>

              <div>
                <p className="text-sm text-slate-500">Language</p>
                <h4 className="font-bold">{country?.language}</h4>
              </div>

              <div>
                <p className="text-sm text-slate-500">Currency</p>
                <h4 className="font-bold">
                  {country?.currency_symbol} {country?.currency}
                </h4>
              </div>

              <div>
                <p className="text-sm text-slate-500">Continent</p>
                <h4 className="font-bold">{country?.continent}</h4>
              </div>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-md min-h-[340px]">
          <img
            src={image}
            alt={country?.country}
            className="h-full w-full object-cover"
            onError={(e) => {
              e.currentTarget.src = fallbackImage;
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <p className="absolute bottom-8 left-8 right-8 text-white text-lg font-medium">
            “Discover quality education, global exposure, and exciting career
            opportunities in {country?.country}.”
          </p>
        </div>
      </section>

      {/* Attractions / Why Choose */}
      <section className="max-w-7xl mx-auto px-6 pb-10">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-3xl font-extrabold text-slate-950 mb-8">
            Why Choose {country?.country}?
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {attractions.length > 0 ? (
              attractions.map((item) => (
                <Feature key={item.id} text={item.text} />
              ))
            ) : (
              <p className="text-slate-500">No attractions available.</p>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-10 scroll-m-24" id="universities">
        <h1 className="text-4xl font-extrabold px-6 pb-6">Universities of <span className="text-primary">{country?.country}</span></h1>
        <div className="max-h-150 overflow-y-scroll"><UnivOfCountry />
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-12">
        <div className="bg-secondary rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
          <div>
            <h2 className="text-3xl font-extrabold">
              Ready to Start Your Journey in {country?.country}?
            </h2>

            <p className="mt-3 text-white/80">
              Talk to our experts and get guidance for admissions,
              scholarships, visas and documentation.
            </p>
          </div>

        <button
  onClick={() => setShowCounsellingPopup(true)}
  className="bg-darkPrimary hover:bg-primary px-8 py-4 rounded-lg font-bold flex items-center gap-3"
>
  Get Free Counselling <FaArrowRight />
</button>
        </div>

      </section>
      {showCounsellingPopup && (
  <div
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4"
    onClick={() => setShowCounsellingPopup(false)}
  >
    <div
      className="relative max-h-[90vh] w-[90%] md:w-[80%] lg:w-[60%] max-w-4xl overflow-y-auto rounded-[30px] bg-white shadow-2xl"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        type="button"
        onClick={() => setShowCounsellingPopup(false)}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xl font-bold text-white"
      >
        ×
      </button>

      <FreeCounsellingForm
        onSuccess={() => setShowCounsellingPopup(false)}
      />
    </div>
  </div>
)}
<FAQ />
    </main>
    </>
    
  );
};

export default CountryDetails;