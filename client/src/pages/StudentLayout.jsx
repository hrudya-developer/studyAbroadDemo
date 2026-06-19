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

const navItems = [
  [Home, "Dashboard", "/student"],
  [User, "My Profile", "/student/profile"],
  [GraduationCap, "Find a course", "/student/findCourse"],
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
    </aside>
  );
}

function Header() {
  const { email } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-30 h-24 border-b border-slate-200 bg-white/90 backdrop-blur lg:ml-72">
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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function StudentLayout() {
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
      </main>
    </div>
  );
}