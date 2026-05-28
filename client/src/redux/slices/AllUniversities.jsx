import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUniversity, FaHeart, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";

import { fetchCountries } from "../slices/countrySlice";
import { fetchUniversitiesByCountry } from "../slices/universitySlice";

const AllUniversities = () => {
  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth);
  const safeUid = uid ?? 0;

  const { countries, imagePath } = useSelector((state) => state.countryData);

  const { universities, universityImagePath, loading, error } = useSelector(
    (state) => state.universityData
  );

  const [activeCountry, setActiveCountry] = useState(null);

  useEffect(() => {
    dispatch(fetchCountries(safeUid));
  }, [dispatch, safeUid]);

  useEffect(() => {
    if (countries?.length > 0 && !activeCountry) {
      setActiveCountry(countries[0]);

      dispatch(
        fetchUniversitiesByCountry({
          uid: safeUid,
          id: countries[0].id,
          offset: 0,
          keyword: "alluniversities",
        })
      );
    }
  }, [countries, activeCountry, dispatch, safeUid]);

  const handleCountryClick = (country) => {
    setActiveCountry(country);

    dispatch(
      fetchUniversitiesByCountry({
        uid: safeUid,
        id: country.id,
        offset: 0,
        keyword: "alluniversities",
      })
    );
  };

  const cleanCountryImagePath = imagePath?.replace(/\/$/, "");
  const cleanUniversityImagePath = universityImagePath?.replace(/\/$/, "");

  return (
    <section className="bg-[#f8fafc] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[280px_1fr] gap-6">

        {/* Sidebar */}
        <aside className="bg-white rounded-2xl shadow-md border border-slate-100 h-fit sticky top-24 overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="text-xl font-extrabold text-slate-950">
              All Countries
            </h2>
          </div>

          <div className="p-3 max-h-[75vh] overflow-y-auto">
            {countries?.map((country) => {
              const isActive = activeCountry?.id === country.id;

              const flag =
                country?.flag && cleanCountryImagePath
                  ? `${cleanCountryImagePath}/${country.flag}`
                  : null;

              return (
                <button
                  key={country.id}
                  onClick={() => handleCountryClick(country)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl mb-2 transition ${
                    isActive
                      ? "bg-[#d70707] text-white shadow-md"
                      : "bg-white text-slate-700 hover:bg-red-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {flag ? (
                      <img
                        src={flag}
                        alt={country.country}
                        className="h-7 w-7 rounded-full object-cover"
                      />
                    ) : (
                      <FaUniversity />
                    )}

                    <span className="font-semibold text-sm">
                      {country.country}
                    </span>
                  </div>

                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      isActive
                        ? "bg-white text-[#d70707]"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {country.university_count || country.count || "0"}
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Universities */}
        <main className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <div className="flex items-center gap-4">
              {activeCountry?.flag && cleanCountryImagePath && (
                <img
                  src={`${cleanCountryImagePath}/${activeCountry.flag}`}
                  alt={activeCountry?.country}
                  className="h-12 w-12 rounded-full object-cover"
                />
              )}

              <div>
                <h1 className="text-3xl font-extrabold text-slate-950">
                  {activeCountry?.country || "Universities"}
                </h1>
                <p className="text-slate-500 mt-1">
                  Explore universities in {activeCountry?.country}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {loading && (
              <div className="text-center py-20 font-bold text-slate-600">
                Loading universities...
              </div>
            )}

            {error && (
              <div className="text-center py-20 font-bold text-red-600">
                {error}
              </div>
            )}

            {!loading && !error && (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {universities?.length > 0 ? (
                  universities.map((item) => {
                    const universityName =
                      item?.university ||
                      item?.university_name ||
                      item?.name ||
                      "University";

                    const universityImage =
                      item?.image && cleanUniversityImagePath
                        ? `${cleanUniversityImagePath}/${item.image}`
                        : null;

                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl transition"
                      >
                        <div className="relative h-44 bg-slate-100">
                          {universityImage ? (
                            <img
                              src={universityImage}
                              alt={universityName}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center text-[#d70707] text-5xl">
                              <FaUniversity />
                            </div>
                          )}

                          <button className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white flex items-center justify-center text-slate-600 shadow">
                            <FaHeart />
                          </button>
                        </div>

                        <div className="p-5">
                          <h3 className="text-lg font-extrabold text-slate-950 line-clamp-2">
                            {universityName}
                          </h3>

                          <p className="flex items-center gap-2 text-sm text-slate-500 mt-3">
                            <FaMapMarkerAlt className="text-[#d70707]" />
                            {item?.location ||
                              item?.city ||
                              activeCountry?.country}
                          </p>

                          {item?.ranking && (
                            <div className="inline-block mt-4 bg-red-50 text-[#d70707] text-xs font-bold px-3 py-1 rounded">
                              #{item.ranking} Ranking
                            </div>
                          )}

                          <button className="mt-5 w-full border border-red-200 text-[#d70707] rounded-lg py-3 font-bold flex items-center justify-center gap-2 hover:bg-[#d70707] hover:text-white transition">
                            View Details <FaArrowRight />
                          </button>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-slate-500 col-span-full text-center py-20">
                    No universities found.
                  </p>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </section>
  );
};

export default AllUniversities;