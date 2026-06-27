import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useOutletContext } from "react-router-dom";

import { fetchCountries } from "../redux/slices/countrySlice";
import { fetchUniversitiesByCountry } from "../redux/slices/universitySlice";

import PopularCourses from "./PopularCourses";
import SDBDestinations from "./SDBDestinations";
import dbBg from "../assets/DbBg.png";

import {
  ArrowRight,
  BookOpen,
  FileText,
  Heart,
  MapPin,
  University,
} from "lucide-react";

export default function StudentDashboard() {
  const dispatch = useDispatch();
  const { applicationsCount = 0, wishlistCount = 0 } = useOutletContext() || {};

  const [selectedCountryId, setSelectedCountryId] = useState(null);

  const { uid, email } = useSelector((state) => state.auth || {});
  const safeUid = uid ?? 0;

  const { countries = [] } = useSelector((state) => state.countryData || {});
  const {
    universities = [],
    universityImagePath,
    loading,
  } = useSelector((state) => state.universityData || {});

  const studentName = email ? email.split("@")[0].toUpperCase() : "STUDENT";

  useEffect(() => {
    dispatch(fetchCountries(safeUid));
  }, [dispatch, safeUid]);

  useEffect(() => {
    if (!selectedCountryId && countries?.length > 0) {
      setSelectedCountryId(countries[0]?.id || countries[0]?.d_id);
    }
  }, [countries, selectedCountryId]);

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
    <div className="mx-auto w-full max-w-[1500px] space-y-6">
      <Hero studentName={studentName} />

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          title="My Applications"
          count={applicationsCount}
          text="Track submitted applications"
          icon={FileText}
          to="/student/studentApplications"
          accent="from-pink-100 to-white"
        />

        <StatCard
          title="My Wishlist"
          count={wishlistCount}
          text="Saved courses for later"
          icon={Heart}
          to="/student/studentWishlistItems"
          accent="from-purple-100 to-white"
        />

        <StatCard
          title="Find Courses"
          count="Explore"
          text="Search courses globally"
          icon={BookOpen}
          to="/student/findCourse"
          accent="from-blue-100 to-white"
        />
      </section>

      <section className="grid grid-cols-1 gap-6 2xl:grid-cols-[minmax(0,1fr)_390px]">
        <Card
          title="Popular Courses"
          subtitle="Explore trending courses selected for students."
          icon={BookOpen}
        >
          <PopularCourses />
        </Card>

        <Card
          title="Destinations"
          subtitle="Pick your preferred country"
          icon={MapPin}
        >
          <SDBDestinations onCountrySelect={setSelectedCountryId} />
        </Card>
      </section>

      <Card
        title="Top Universities & Colleges"
        subtitle="Discover and connect with top global institutions."
        icon={University}
        full
      >
        <CountryTabs
          countries={countries}
          selectedCountryId={selectedCountryId}
          onSelect={setSelectedCountryId}
        />

        <UniversitiesGrid
          loading={loading}
          universities={universities}
          universityImagePath={universityImagePath}
        />
      </Card>

      <section className="overflow-hidden rounded-3xl bg-gradient-to-r from-[#081c47] to-primary p-5 text-white shadow-sm sm:p-6 lg:p-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-black sm:text-2xl">
              Your Future, Our Mission
            </h2>
            <p className="mt-1 text-sm text-white/80">
              Explore. Learn. Achieve.
            </p>
          </div>

          <Link
            to="/student/findCourse"
            className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#081c47] transition hover:-translate-y-1 hover:shadow-lg"
          >
            Explore Courses
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}

function Hero({ studentName }) {
  return (
    <section className="relative overflow-hidden rounded-[28px] bg-[#081c47] shadow-sm">
      <img
        className="absolute inset-0 h-full w-full object-cover"
        src={dbBg}
        alt="Dashboard hero"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-darkPrimary/80 to-black/20" />

      <div className="relative flex min-h-[230px] items-center p-6 sm:p-8 lg:p-10">
        <div className="max-w-xl">
          <p className="text-sm font-semibold text-white/90 sm:text-base">
            Welcome back, <span className="font-black">{studentName}</span> 👋
          </p>

          <h1 className="mt-4 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            Your Dream,
            <br />
            <span className="text-primary">Our Guidance</span>
          </h1>

          <Link
            to="/student/findCourse"
            className="mt-7 inline-flex items-center gap-3 rounded-xl border border-white/70 px-6 py-3 text-sm font-bold text-white transition hover:bg-white hover:text-primary"
          >
            Find a Course
            <ArrowRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function StatCard({ title, count, text, icon: Icon, to, accent }) {
  return (
    <Link
      to={to}
      className={`group relative overflow-hidden rounded-3xl border border-slate-100 bg-gradient-to-br ${accent} p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6`}
    >
      <div className="flex items-start justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white text-primary shadow-sm">
          <Icon size={24} />
        </div>

        <ArrowRight
          size={18}
          className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-primary"
        />
      </div>

      <div className="mt-5">
        <p className="text-sm font-black text-[#081c47]">{title}</p>
        <h3 className="mt-3 text-2xl font-black text-secondary">{count}</h3>
        <p className="mt-2 text-xs font-semibold leading-5 text-slate-500">
          {text}
        </p>
      </div>
    </Link>
  );
}

function Card({ title, subtitle, icon: Icon, children, full = false }) {
  return (
    <section
      className={`min-w-0 rounded-3xl border border-slate-100 bg-white shadow-sm ${
        full ? "p-4 sm:p-6 lg:p-8" : "p-4 sm:p-5 lg:p-6"
      }`}
    >
      <div className="mb-5 flex items-start gap-3">
        {Icon && (
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
            <Icon size={20} />
          </div>
        )}

        <div className="min-w-0">
          <h2 className="text-base font-black text-[#081c47] sm:text-lg lg:text-xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-1 text-xs font-semibold text-slate-400 sm:text-sm">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="min-w-0">{children}</div>
    </section>
  );
}

function CountryTabs({ countries, selectedCountryId, onSelect }) {
  return (
    <div className="mb-6 flex gap-2 overflow-x-auto pb-3">
      {countries?.map((country) => {
        const countryId = country?.id || country?.d_id;

        return (
          <button
            key={countryId}
            type="button"
            onClick={() => onSelect(countryId)}
            className={`shrink-0 rounded-full border px-4 py-2 text-xs font-black transition sm:px-5 sm:text-sm ${
              String(selectedCountryId) === String(countryId)
                ? "border-primary bg-primary text-white shadow-sm"
                : "border-slate-200 bg-white text-[#081c47] hover:border-primary hover:text-primary"
            }`}
          >
            {country?.country || country?.name}
          </button>
        );
      })}
    </div>
  );
}

function UniversitiesGrid({ loading, universities, universityImagePath }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl bg-slate-100"
          />
        ))}
      </div>
    );
  }

  if (!universities?.length) {
    return (
      <div className="rounded-2xl bg-slate-50 p-10 text-center">
        <University className="mx-auto mb-3 text-slate-300" size={42} />
        <p className="font-bold text-slate-500">No universities found</p>
      </div>
    );
  }

  return (
    <div className="grid max-h-[430px] grid-cols-1 gap-4 overflow-y-auto pr-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {universities.map((item) => {
        const image =
          item?.logo && universityImagePath
            ? `${universityImagePath}/${item.logo}`
            : null;

        return (
          <div
            key={item?.id || item?.u_id}
            className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="grid h-20 w-20 shrink-0 place-items-center overflow-hidden rounded-2xl bg-slate-50 ring-1 ring-slate-100">
                {image ? (
                  <img
                    src={image}
                    className="h-full w-full object-contain p-2"
                    alt={item?.name || "University"}
                  />
                ) : (
                  <University size={30} className="text-primary" />
                )}
              </div>

              <div className="min-w-0">
                <h3 className="line-clamp-2 text-sm font-black leading-5 text-[#081c47] group-hover:text-primary">
                  {item?.name || item?.university || "University"}
                </h3>

                <p className="mt-2 flex items-center gap-1 line-clamp-1 text-xs font-semibold text-slate-500">
                  <MapPin size={13} className="shrink-0" />
                  {item?.location || "N/A"}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}