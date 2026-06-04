import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchDestinationDetails } from "../redux/slices/countrySlice";
import ButtonPrimary from "../components/ButtonPrimary";

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
    <div className="h-12 w-12 shrink-0 rounded-full bg-red-50 text-[#d70707] flex items-center justify-center">
      <FaCheck />
    </div>
    <p className="text-sm font-medium text-slate-700">{text}</p>
  </div>
);

const CountryDetails = () => {
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
    <main className="bg-[#f8fafc]">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-auto"
        style={{ backgroundImage: `url("${image}")` }}
      >
        <div className="absolute inset-0 bg-black/80" />

        <div className="relative max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div className="text-sm text-white bg-transparent p-3 rounded-full border border-white">
              Home › Destinations › {country?.country}
            </div>

             {flag && (
              <div className="flex items-center gap-3 my-10">
                <img
                  src={flag}
                  alt={`${country?.country} flag`}
                  className="w-15 h-15 sm:h-30 sm:w-30 rounded-full object-cover shadow-[0_0_40px_rgba(255,255,255,0.35)] border-3 border-white"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
               
              </div>
            )}
          </div>

          <div className="max-w-xl">
            <h1 className="text-4xl sm:text-6xl md:text-6xl font-extrabold leading-tight text-white text-center sm:text-start sm:mt-10">
              Study in
              <span className="text-4xl text-primary ms-4 sm:text-6xl">
                {country?.country || "Country"}
              </span>
            </h1>

         <p className="font-bold mb-15 mt-5 text-amber-300 text-center sm:text-start">
                  Explore education opportunities in {country?.country}
                </p>
                
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

      <section className="max-w-7xl mx-auto px-6 py-10">
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

          <Link to="/contact">
            <button className="bg-[#d70707] hover:bg-red-700 px-8 py-4 rounded-lg font-bold flex items-center gap-3">
              Get Free Counselling <FaArrowRight />
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default CountryDetails;