import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUniversity, FaHeart, FaArrowRight, FaMapMarkerAlt } from "react-icons/fa";
import {
  fetchUniversitiesByCountry,
  setUniversitiesFromCache,
} from "../redux/slices/universitySlice";

import { fetchCountries } from "../redux/slices/countrySlice";

import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";

const AllUniversities = () => {

  const { countryId } = useParams();
const navigate = useNavigate();
  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth);
  const safeUid = uid ?? 0;

  const { countries, imagePath } = useSelector((state) => state.countryData);

 const {
  universities,
  universitiesByCountry,
  universityImagePath,
  loading,
  error,
} = useSelector((state) => state.universityData);
 
const activeCountry =
  countries?.find((c) => String(c.id) === String(countryId)) || countries?.[0];

  useEffect(() => {
    dispatch(fetchCountries(safeUid));
  }, [dispatch, safeUid]);

useEffect(() => {
  if (!activeCountry) return;

  if (!countryId) {
    navigate(`/allUniversities/${activeCountry.id}`, { replace: true });
    return;
  }

  dispatch(
    fetchUniversitiesByCountry({
      uid: safeUid,
      id: activeCountry.id,
      offset: 0,
      keyword: "alluniversities",
    })
  );
}, [activeCountry, countryId, dispatch, safeUid, navigate]);

const handleCountryClick = (country) => {
  if (loading) return;
  navigate(`/allUniversities/${country.id}`);
};

  const cleanCountryImagePath = imagePath?.replace(/\/$/, "");
  const cleanUniversityImagePath = universityImagePath?.replace(/\/$/, "");

  return (
   <section className="bg-[#f8fafc] min-h-screen py-6 md:py-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-5 lg:px-6">

    {/* MOBILE COUNTRY TABS */}
    <div className="md:hidden mb-5">
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">

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
              className={`flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap transition-all duration-300 min-w-fit ${
                isActive
                  ? "bg-[#d70707] text-white shadow-md"
                  : "bg-white text-slate-700 border border-slate-200"
              }`}
            >
              {flag ? (
                <img
                  src={flag}
                  alt={country.country}
                  className="h-6 w-6 rounded-full object-cover"
                />
              ) : (
                <FaUniversity />
              )}

              <span className="font-semibold text-sm">
                {country.country}
              </span>
            </button>
          );
        })}
      </div>
    </div>

    {/* MAIN LAYOUT */}
    <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] lg:grid-cols-[280px_1fr] gap-6">

      {/* SIDEBAR */}
      <aside className="hidden md:block bg-white rounded-2xl shadow-md border border-slate-100 h-fit sticky top-24 overflow-hidden">

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
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all duration-300 ${
                  isActive
                    ? "bg-[#d70707] text-white shadow-md"
                    : "bg-white text-slate-700 hover:bg-red-50"
                }`}
              >
                {flag ? (
                  <img
                    src={flag}
                    alt={country.country}
                    className="h-7 w-7 rounded-full object-cover flex-shrink-0"
                  />
                ) : (
                  <FaUniversity />
                )}

                <span className="font-semibold text-sm truncate">
                  {country.country}
                </span>
              </button>
            );
          })}
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden">

        {/* HEADER */}
        <div className="p-4 sm:p-5 md:p-6 border-b">

          <div className="flex items-center gap-4">

            {activeCountry?.flag &&
              cleanCountryImagePath && (
                <img
                  src={`${cleanCountryImagePath}/${activeCountry.flag}`}
                  alt={activeCountry?.country}
                  className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                />
              )}

            <div className="min-w-0">
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-950 truncate">
                {activeCountry?.country || "Universities"}
              </h1>

              <p className="text-slate-500 mt-1 text-sm md:text-base">
                Explore universities in{" "}
                {activeCountry?.country}
              </p>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-4 sm:p-5 md:p-6">

          {/* LOADING */}
          {loading && (
            <div className="text-center py-20 font-bold text-slate-600">
              Loading universities...
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="text-center py-20 font-bold text-red-600">
              {error}
            </div>
          )}

          {/* UNIVERSITY GRID */}
          {!loading && !error && (
            <>
              {universities?.length > 0 ? (

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

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
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300"
                      >

                        {/* IMAGE */}
                        <div className="relative h-44 sm:h-48 bg-slate-100 p-3">

                          {universityImage ? (
                            <img
                              src={universityImage}
                              alt={universityName}
                              className="h-full w-full object-cover rounded-2xl"
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

                        {/* DETAILS */}
                        <div className="p-5">

                          <h3 className="text-lg font-extrabold text-slate-950 line-clamp-2 min-h-[56px]">
                            {universityName}
                          </h3>

                          <p className="flex items-center gap-2 text-sm text-slate-500 mt-3">
                            <FaMapMarkerAlt className="text-[#d70707] flex-shrink-0" />

                            <span className="truncate">
                              {item?.location ||
                                item?.city ||
                                activeCountry?.country}
                            </span>
                          </p>

                       {item?.rank && (
  <div className="inline-block mt-4 bg-red-50 text-[#d70707] text-xs font-bold px-3 py-1 rounded">
    #{item.rank} Ranking
  </div>
)}
                         

                       <Link
  to={`/universityDetails/${item.id}`}
  state={{
    university: item,
    universityImagePath: cleanUniversityImagePath,
    country: activeCountry,
  }}
  className="block"
>
                            <button className="mt-5 w-full border border-red-200 text-[#d70707] rounded-lg py-3 font-bold flex items-center justify-center gap-2 hover:bg-[#d70707] hover:text-white transition-all duration-300">
                              View Details
                              <FaArrowRight />
                            </button>
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>

              ) : (
                <p className="text-slate-500 text-center py-20">
                  No universities found.
                </p>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  </div>
</section>
  );
};

export default AllUniversities;