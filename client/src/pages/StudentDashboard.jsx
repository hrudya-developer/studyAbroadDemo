import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchCountries } from "../redux/slices/countrySlice";
import { fetchUniversitiesByCountry } from "../redux/slices/universitySlice";

import PopularCourses from "./PopularCourses";
import SDBDestinations from "./SDBDestinations";

import { FaUniversity, FaMapMarkerAlt } from "react-icons/fa";
import SDBLanguagePrograms from "./SDBLanguagePrograms";

export default function StudentDashboard() {
  const dispatch = useDispatch();

  const [selectedCountryId, setSelectedCountryId] = useState(null);

  const { uid } = useSelector((state) => state.auth);
  const safeUid = uid ?? 0;

  const { countries } = useSelector((state) => state.countryData);

  const { universities, universityImagePath, loading } = useSelector(
    (state) => state.universityData
  );

  const { email } = useSelector((state) => state.auth);

  // Load countries
  useEffect(() => {
    dispatch(fetchCountries(safeUid));
  }, [dispatch, safeUid]);

  // Default country
  useEffect(() => {
    if (!selectedCountryId && countries?.length > 0) {
      setSelectedCountryId(countries[0].id);
    }
  }, [countries]);

  // Fetch universities
  useEffect(() => {
    if (!selectedCountryId) return;

    dispatch(
      fetchUniversitiesByCountry({
        uid: safeUid,
        id: selectedCountryId,
        offset: 0,
        keyword: "alluniversities",
      })
    );
  }, [selectedCountryId, dispatch, safeUid]);

  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* GRID LAYOUT */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">

        {/* LEFT SIDE */}
        <section className="space-y-6 min-w-0">

          {/* HERO */}
          <div className="relative overflow-hidden rounded-3xl bg-white p-6 sm:p-8 shadow-sm min-h-[260px]">
            <img
              className="absolute inset-y-0 right-0 h-full w-1/2 sm:w-2/3 object-cover"
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
              alt="hero"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/10" />

            <div className="relative max-w-md">
             <p className="mb-3 font-bold text-secondary text-sm sm:text-base">
  Welcome back {email.split("@")[0].toUpperCase()}
</p>

              <h1 className="text-3xl sm:text-4xl xl:text-5xl font-black leading-tight">
                Your Dream,<br />
                <span className="text-primary">Our Guidance</span>
              </h1>

              <p className="mt-4 text-sm sm:text-base text-slate-700">
                Let's take the next step towards your global future.
              </p>
            </div>
          </div>

          {/* COURSES */}
          <div className="rounded-3xl bg-white p-4 sm:p-6 shadow-sm">
            <PopularCourses />
          </div>

          {/* UNIVERSITIES */}
          <div className="rounded-3xl bg-white p-4 sm:p-6 shadow-sm min-w-0">

            <h2 className="text-lg sm:text-xl font-black mb-4">
              Top Universities by Country
            </h2>

            {/* TABS */}
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-3 scrollbar-hide">
              {countries?.map((country) => (
                <button
                  key={country.id}
                  onClick={() => setSelectedCountryId(country.id)}
                  className={`px-3 sm:px-4 py-2 rounded-xl whitespace-nowrap border text-sm sm:text-sm transition hover:cursor-pointer hover:bg-red-100 flex-shrink-0 ${
                    selectedCountryId === country.id
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-slate-700 border-slate-200"
                  }`}
                >
                  {country.country}
                </button>
              ))}
            </div>

            {/* CONTENT */}
            {loading ? (
              <p className="text-center py-10 text-sm sm:text-base">
                Loading...
              </p>
            ) : universities?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5 mt-4 max-h-72 overflow-y-auto">

                {universities.map((item) => {
                  const image =
                    item?.logo && universityImagePath
                      ? `${universityImagePath}/${item.logo}`
                      : null;

                  return (
                    <div
                      key={item.id}
                      className="border border-gray-100 bg-gray-50 flex flex-col items-center justify-center rounded-2xl p-3 sm:p-4 shadow-sm overflow-hidden"
                    >
                      {image ? (
                        <img
                          src={image}
                          className="h-20 sm:h-20 w-20 object-cover rounded-xl border border-gray-100"
                          alt={item.name}
                        />
                      ) : (
                        <div className="h-20 sm:h-20 bg-slate-100 flex items-center justify-center rounded-xl border border-gray-100">
                          <FaUniversity size={28} />
                        </div>
                      )}

                      <h3 className="font-semibold mt-3 text-sm text-secondary text-center">
                        {item.name}
                      </h3>

                      <p className="text-xs text-xs text-gray-700 flex items-center gap-2 mt-1 text-center">
                        {/* <FaMapMarkerAlt /> */}
                        {item.location}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-slate-500 text-center py-10 text-sm">
                No universities found
              </p>
            )}
          </div>
        </section>

        {/* RIGHT SIDEBAR */}
        <aside className="w-full">
          <div className="">
            <SDBDestinations onCountrySelect={setSelectedCountryId} />
          </div>

          <div><SDBLanguagePrograms /></div>

        </aside>
        

      </div>
    </div>
  );
}