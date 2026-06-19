<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "../assets/logo.png";
import dbGlobe from "../assets/globeImg.png";


import {
  Bell,
  CircleUserRound,
  FileText,
  GraduationCap,
  Heart,
  Home,
  LogOut,
  MessageSquare,
  User,
  UserRound,
} from "lucide-react";

const API_KEY = "overseas@Miak2023";
=======
import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";
import dbGlobe from "../assets/globeImg.png";

import {
  Bell,
  BookOpen,
  CalendarDays,
  CircleUserRound,
  FileText,
  GraduationCap,
  HelpCircle,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  ShieldCheck,
  User,
  Users,
  Wallet,
} from "lucide-react";

>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e

const navItems = [
  [Home, "Dashboard", "/student"],
  [User, "My Profile", "/student/profile"],
  [GraduationCap, "Find a course", "/student/findCourse"],
<<<<<<< HEAD
  [FileText, "My Applications", "/student/studentApplications"],
  [Heart, "My Wishlist", "/student/studentWishlistItems"],
  [LogOut, "Logout", "/loginViaOtp"],
];

function Sidebar({ applicationsCount = 0, wishlistCount = 0 }) {
  return (
    <aside className="fixed left-0 top-0 hidden h-screen w-72 flex-col bg-black text-white lg:flex">
      <div className="flex h-24 items-center border-b border-white/10 px-7">
        <img src={logo} alt="Logo" />
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-5">
        {navItems.map(([Icon, label, path]) => {
       
const displayLabel =
  label === "My Applications"
    ? `My Applications (${applicationsCount})`
    : label === "My Wishlist"
    ? `My Wishlist (${wishlistCount})`
    : label;

          return (
            <NavLink
              key={label}
              to={path}
              end={path === "/student"}
              className={({ isActive }) =>
                `flex w-full items-center gap-4 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                  isActive ? "bg-primary shadow-lg" : "hover:bg-white/10"
                }`
              }
            >
              <Icon size={20} />
              <span className="flex-1">{displayLabel}</span>
            </NavLink>
          );
        })}

        <div className="absolute bottom-15 left-0 h-34 w-full">
          <img src={dbGlobe} className="mx-auto object-contain" alt="" />
        </div>
      </nav>
=======
  
  
  // [FileText, "My Applications", "/student/applications"],
  // [BookOpen, "Shortlisted Universities", "/student/shortlisted-universities"],
  // [FileText, "My Documents", "/student/documents"],
  // [GraduationCap, "My Courses", "/student/courses"],
  // [Users, "Counselor Sessions", "/student/counselor-sessions"],
  // [CalendarDays, "My Bookings", "/student/bookings"],
  // [ShieldCheck, "Scholarships", "/student/scholarships"],
  // [Wallet, "Payments", "/student/payments"],
  // [MessageSquare, "Messages", "/student/messages"],
  // [Bell, "Notifications", "/student/notifications"],
  // [HelpCircle, "Help & Support", "/student/help-support"],
  [LogOut, "Logout", "/loginViaOtp"],
];

function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 flex-col text-white bg-black">
      <div className="h-24 flex items-center px-7 border-b border-white/10">
        <img src={logo} alt="Logo" />
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
        {navItems.map(([Icon, label, path]) => (
          <NavLink
            key={label}
            to={path}
            end={path === "/student"}
            className={({ isActive }) =>
              `w-full flex items-center gap-4 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
                isActive ? "bg-primary shadow-lg" : "hover:bg-white/10"
              }`
            }
          >
            <Icon size={20} />
            <span className="flex-1">{label}</span>

            {label === "Messages" && (
              <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs">
                2
              </span>
            )}
          </NavLink>
        ))}
          <div className="w-full h-34 absolute bottom-15 left-0">
            <img src={dbGlobe} className="object-contain mx-auto"/>

      </div>
      </nav>
    
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
    </aside>
  );
}

function Header() {
  const { email } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-30 h-24 border-b border-slate-200 bg-white/90 backdrop-blur lg:ml-72">
<<<<<<< HEAD
      <div className="flex h-full items-center justify-between gap-5 px-6 lg:px-8">
        <div />

        <div className="flex gap-5">
          <div className="rounded-full bg-darkPrimary w-10 h-10 grid place-content-center text-white shadow-lg p-3">
            <Bell className="hidden sm:block w-6 h-6" />
          </div>

          <div className="rounded-full bg-primary p-3 w-10 h-10 grid place-content-center text-white shadow-lg p-3">
            <MessageSquare className="hidden sm:block w-6 h-6"/>
          </div>

          <div className="hidden items-center gap-3 sm:flex">
            <span className="text-darkPrimary rounded-full bg-gray-100 p-3 w-10 h-10 grid place-content-center shadow-lg p-3">
             
              <UserRound className="w-7 h-7"/>
            </span>

            <div>
              <p className="text-sm font-bold text-black">{email}</p>
              <p className="text-sm font-semibold text-secondary">Student</p>
=======
      <div className="flex h-full justify-between items-center gap-5 px-6 lg:px-8">
        <button className="rounded-xl p-2 hover:bg-slate-100">
          {/* <Menu /> */}
        </button>

        {/* <div className="relative max-w-3xl flex-1">
          <Search
            className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />

          <input
            className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-14 pr-16 shadow-sm outline-none focus:border-primary"
            placeholder="Search for courses, universities, countries..."
          />

          <button className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full text-white bg-primary">
            <Search size={20} />
          </button>
        </div> */}

        <div className="flex gap-5">
          <div className="p-3 rounded-xl bg-primary text-white">
            <Bell className="hidden sm:block" />
          </div>

          <div className="p-3 rounded-xl bg-secondary text-white">
            <MessageSquare className="hidden sm:block" />
          </div>

          <div className="hidden sm:flex items-center gap-3">
           <span className="text-gray-400"><CircleUserRound size={45}/></span>

            <div>
              <p className="font-bold text-sm text-black">{email}</p>
              <p className="font-semibold text-secondary text-sm">Student</p>
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function StudentLayout() {
<<<<<<< HEAD
  const { uid } = useSelector((state) => state.auth);
  const location = useLocation();

  const [applicationsCount, setApplicationsCount] = useState(0);

  const [wishlistCount, setWishlistCount] = useState(0);

const fetchWishlistCount = async () => {
  if (!uid) {
    setWishlistCount(0);
    return;
  }

  try {
    const formData = new FormData();
    formData.append("api", API_KEY);
    formData.append("uid", String(uid));

    const response = await fetch(
      "https://overseas.technocitysolutions.com/public/api/getPrefereList",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    const data = Array.isArray(result?.course)
      ? result.course
      : Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result?.wishlist)
      ? result.wishlist
      : [];

    setWishlistCount(data.length);
  } catch {
    setWishlistCount(0);
  }
};

 const fetchApplicationsCount = async () => {
  if (!uid) {
    setApplicationsCount(0);
    return;
  }

  try {
    const formData = new FormData();
    formData.append("api", API_KEY);
    formData.append("uid", String(uid));

    const response = await fetch(
      "https://overseas.technocitysolutions.com/public/api/getUserEnquiries",
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    const data = Array.isArray(result?.data)
      ? result.data
      : Array.isArray(result?.enquiries)
      ? result.enquiries
      : [];

    setApplicationsCount(data.length);
  } catch {
    setApplicationsCount(0);
  }
};
useEffect(() => {
  fetchWishlistCount();
}, [uid, location.pathname]);

useEffect(() => {
  const handleWishlistUpdated = () => {
    setTimeout(fetchWishlistCount, 500);
  };

  window.addEventListener("wishlistUpdated", handleWishlistUpdated);

  return () => {
    window.removeEventListener("wishlistUpdated", handleWishlistUpdated);
  };
}, [uid]);

useEffect(() => {
  const handleWishlistUpdated = (event) => {
    const increment = Number(event?.detail?.increment || 0);

    if (increment) {
      setWishlistCount((prev) => Math.max(0, prev + increment));
    }

    fetchWishlistCount();
  };

  window.addEventListener("wishlistUpdated", handleWishlistUpdated);

  return () => {
    window.removeEventListener("wishlistUpdated", handleWishlistUpdated);
  };
}, [uid]);
useEffect(() => {
  fetchApplicationsCount();
}, [uid, location.pathname]);

useEffect(() => {
  const handleApplicationsUpdated = (event) => {
    const increment = Number(event?.detail?.increment || 0);

    if (increment) {
      setApplicationsCount((prev) => prev + increment);
    }

    // re-sync with API after backend saves
    fetchApplicationsCount();
  };

  window.addEventListener("applicationsUpdated", handleApplicationsUpdated);

  return () => {
    window.removeEventListener("applicationsUpdated", handleApplicationsUpdated);
  };
}, [uid]);

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-950">
<Sidebar
  applicationsCount={applicationsCount}
  wishlistCount={wishlistCount}
/>
      <Header />

      <main className="p-6 lg:ml-72 lg:p-8">
        <Outlet context={{ applicationsCount, wishlistCount }} />
=======
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <Sidebar />
      <Header />

      <main className="lg:ml-72 p-6 lg:p-8">
        <Outlet />
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
      </main>
    </div>
  );
}