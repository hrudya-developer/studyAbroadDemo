import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaArrowRight,
  FaMapMarkerAlt,
  FaUniversity,
} from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";

import { fetchCountries } from "../redux/slices/countrySlice";
import { fetchUniversitiesByCountry } from "../redux/slices/universitySlice";
import FAQ from "../layout/FAQ/FAQ";
import AllUniversitiesSEO from "./AllUniversitiesSEO";

const AllUniversities = () => {
  const { countryId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth);
  const safeUid = uid ?? 0;

  const { countries = [], imagePath } = useSelector(
    (state) => state.countryData,
  );

  const {
    universities = [],
    universityImagePath,
    loading,
    error,
  } = useSelector((state) => state.universityData);

  const activeCountry =
    countries.find(
      (country) => String(country.id) === String(countryId),
    ) || countries[0];

  useEffect(() => {
    dispatch(fetchCountries(safeUid));
  }, [dispatch, safeUid]);

  useEffect(() => {
    if (!activeCountry) return;

    if (!countryId) {
      navigate(`/all-universities/${activeCountry.id}`, {
        replace: true,
      });
      return;
    }

    dispatch(
      fetchUniversitiesByCountry({
        uid: safeUid,
        id: activeCountry.id,
        offset: 0,
        keyword: "alluniversities",
      }),
    );
  }, [activeCountry, countryId, dispatch, safeUid, navigate]);

  const handleCountryClick = (country) => {
    if (loading) return;
    navigate(`/all-universities/${country.id}`);
  };

  const cleanCountryImagePath = imagePath?.replace(/\/$/, "");
  const cleanUniversityImagePath = universityImagePath?.replace(/\/$/, "");

  return (
    <>
      <AllUniversitiesSEO
        activeCountry={activeCountry}
        universities={universities}
        universityImagePath={cleanUniversityImagePath}
      />

      <main id="main-content">
        <section
          aria-labelledby="universities-page-heading"
          className="min-h-screen bg-[#f8fafc] py-6 md:py-10"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-5 lg:px-6">
            <div className="mb-5 md:hidden">
              <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-2">
                {countries.map((country) => {
                  const isActive = activeCountry?.id === country.id;
                  const flag =
                    country?.flag && cleanCountryImagePath
                      ? `${cleanCountryImagePath}/${country.flag}`
                      : null;

                  return (
                    <button
                      key={country.id}
                      type="button"
                      onClick={() => handleCountryClick(country)}
                      aria-pressed={isActive}
                      className={`flex min-w-fit items-center gap-2 whitespace-nowrap rounded-xl px-4 py-3 transition-all duration-300 ${
                        isActive
                          ? "bg-primary text-white shadow-md"
                          : "border border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      {flag ? (
                        <img
                          src={flag}
                          alt={`${country.country} flag`}
                          width={24}
                          height={24}
                          loading="lazy"
                          decoding="async"
                          className="h-6 w-6 rounded-full object-cover"
                        />
                      ) : (
                        <FaUniversity aria-hidden="true" />
                      )}

                      <span className="text-sm font-semibold">
                        {country.country}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr]">
              <aside
                aria-label="Study destination countries"
                className="sticky top-24 hidden h-fit overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md md:block"
              >
                <div className="border-b p-5">
                  <h2 className="text-xl font-extrabold text-slate-950">
                    All Countries
                  </h2>
                </div>

                <div className="max-h-[75vh] overflow-y-auto p-3">
                  {countries.map((country) => {
                    const isActive = activeCountry?.id === country.id;
                    const flag =
                      country?.flag && cleanCountryImagePath
                        ? `${cleanCountryImagePath}/${country.flag}`
                        : null;

                    return (
                      <button
                        key={country.id}
                        type="button"
                        onClick={() => handleCountryClick(country)}
                        aria-pressed={isActive}
                        className={`mb-2 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all duration-300 ${
                          isActive
                            ? "bg-primary text-white shadow-md"
                            : "bg-white text-slate-700 hover:bg-primary hover:text-white"
                        }`}
                      >
                        {flag ? (
                          <img
                            src={flag}
                            alt={`${country.country} flag`}
                            width={28}
                            height={28}
                            loading="lazy"
                            decoding="async"
                            className="h-7 w-7 flex-shrink-0 rounded-full object-cover"
                          />
                        ) : (
                          <FaUniversity aria-hidden="true" />
                        )}

                        <span className="truncate text-sm font-semibold">
                          {country.country}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </aside>

              <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md">
                <header className="border-b p-4 sm:p-5 md:p-6">
                  <div className="flex items-center gap-4">
                    {activeCountry?.flag && cleanCountryImagePath && (
                      <img
                        src={`${cleanCountryImagePath}/${activeCountry.flag}`}
                        alt={`${activeCountry.country} flag`}
                        width={48}
                        height={48}
                        className="h-12 w-12 flex-shrink-0 rounded-full object-cover"
                      />
                    )}

                    <div className="min-w-0">
                      <h1
                        id="universities-page-heading"
                        className="truncate text-2xl font-extrabold text-slate-950 md:text-3xl"
                      >
                        Universities in {activeCountry?.country || "Global Destinations"}
                      </h1>

                      <p className="mt-1 text-sm text-slate-500 md:text-base">
                        Explore universities, courses and study opportunities in{" "}
                        {activeCountry?.country || "leading destinations"}.
                      </p>
                    </div>
                  </div>
                </header>

                <div className="p-4 sm:p-5 md:p-6">
                  {loading && (
                    <div
                      role="status"
                      aria-live="polite"
                      className="py-20 text-center font-bold text-slate-600"
                    >
                      Loading universities...
                    </div>
                  )}

                  {error && (
                    <div
                      role="alert"
                      className="py-20 text-center font-bold text-red-600"
                    >
                      {error}
                    </div>
                  )}

                  {!loading && !error && (
                    <>
                      {universities.length > 0 ? (
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                          {universities.map((item) => {
                            const universityName =
                              item?.university ||
                              item?.university_name ||
                              item?.name ||
                              "University";

                            const universityImage =
                              item?.logo && cleanUniversityImagePath
                                ? `${cleanUniversityImagePath}/${item.logo}`
                                : null;

                            return (
                              <article
                                key={item.id}
                                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                              >
                                <div className="relative rounded-2xl bg-slate-100 p-4">
                                  <div className="flex items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm">
                                    {universityImage ? (
                                      <img
                                        src={universityImage}
                                        alt={`${universityName} logo`}
                                        width={160}
                                        height={160}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-40 w-40 object-contain transition-transform duration-300 hover:scale-105"
                                      />
                                    ) : (
                                      <div className="flex h-40 w-40 items-center justify-center rounded-xl bg-slate-50 text-5xl text-primary">
                                        <FaUniversity aria-hidden="true" />
                                      </div>
                                    )}
                                  </div>
                                </div>

                                <div className="p-5">
                                  <h2 className="max-h-[56px] line-clamp-2 text-base font-extrabold text-slate-950">
                                    {universityName}
                                  </h2>

                                  <p className="mt-3 flex items-center gap-2 text-sm text-slate-500">
                                    <FaMapMarkerAlt
                                      aria-hidden="true"
                                      className="flex-shrink-0 text-secondary/70"
                                    />

                                    <span className="truncate">
                                      {item?.location ||
                                        item?.city ||
                                        activeCountry?.country}
                                    </span>
                                  </p>

                                  {item?.rank && (
                                    <span className="mt-4 inline-block rounded bg-primary/10 px-3 py-1 text-xs font-bold text-darkPrimary">
                                      #{item.rank} Ranking
                                    </span>
                                  )}

                                  <Link
                                    to={`/universityDetails/${item.id}`}
                                    state={{
                                      university: item,
                                      universityImagePath:
                                        cleanUniversityImagePath,
                                      country: activeCountry,
                                    }}
                                    aria-label={`View details for ${universityName}`}
                                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-primary py-3 font-bold text-primary transition-all duration-300 hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                                  >
                                    View Details
                                    <FaArrowRight aria-hidden="true" />
                                  </Link>
                                </div>
                              </article>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="py-20 text-center text-slate-500">
                          No universities found.
                        </p>
                      )}
                    </>
                  )}
                </div>
              </section>
            </div>
          </div>
        </section>

        <FAQ />
      </main>
    </>
  );
};

export default AllUniversities;