import React, { useEffect, useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

import logo from "../assets/logo.png";

import {
  Bell,
  FileText,
  GraduationCap,
  Heart,
  Home,
  LogOut,
  Menu,
  MessageSquare,
  User,
  UserRound,
  X,
} from "lucide-react";

const API_KEY = "overseas@Miak2023";

const navItems = [
  [Home, "Dashboard", "/student"],
  [User, "My Profile", "/student/profile"],
  [GraduationCap, "Find a course", "/student/findCourse"],
  [FileText, "My Applications", "/student/studentApplications"],
  [Heart, "My Wishlist", "/student/studentWishlistItems"],
  [LogOut, "Logout", null],
];

function Sidebar({
  applicationsCount = 0,
  wishlistCount = 0,
  sidebarOpen,
  setSidebarOpen,
  email,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#c2185b",
      cancelButtonColor: "#6c757d",
    });

    if (result.isConfirmed) {
      dispatch(logout());
      setSidebarOpen(false);

      await Swal.fire({
        title: "Logged Out",
        text: "You have been logged out successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/loginViaOtp", { replace: true });
    }
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen flex-col bg-black text-white shadow-2xl transition-transform duration-300 ease-in-out
        w-32 md:w-72
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        <div className="flex h-20 items-center justify-end border-b border-white/10 px-4 lg:h-24 lg:justify-between lg:px-7">
          <img src={logo} alt="Logo" className="hidden lg:block" />

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="grid h-9 w-9 place-content-center rounded-full bg-white/10 transition hover:bg-white/20 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-5">
          {navItems.map(([Icon, label, path]) => {
            const displayLabel =
              label === "My Applications"
                ? `My Applications (${applicationsCount})`
                : label === "My Wishlist"
                ? `My Wishlist (${wishlistCount})`
                : label;

            if (label === "Logout") {
              return (
                <button
                  key={label}
                  type="button"
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-4 rounded-xl px-3 py-3 text-sm font-medium transition hover:bg-white/10 md:justify-start md:px-4"
                >
                  <Icon size={21} className="shrink-0" />
                  <span className="hidden md:block">{displayLabel}</span>
                </button>
              );
            }

            return (
              <NavLink
                key={label}
                to={path}
                end={path === "/student"}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex w-full items-center justify-center gap-4 rounded-xl px-3 py-3 text-sm font-medium transition md:justify-start md:px-4 ${
                    isActive ? "bg-primary shadow-lg" : "hover:bg-white/10"
                  }`
                }
              >
                <Icon size={21} className="shrink-0" />
                <span className="hidden flex-1 md:block">{displayLabel}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-3 py-4 sm:hidden">
          <div className="mb-4 flex justify-center gap-3">
            {/* <button
              type="button"
              className="grid h-8 w-8 place-content-center rounded-full bg-secondary text-white shadow-lg"
            >
              <Bell className="h-4 w-4" />
            </button> */}

            {/* <button
              type="button"
              className="grid h-8 w-8 place-content-center rounded-full bg-primary text-white shadow-lg"
            >
              <MessageSquare className="h-4 w-4" />
            </button> */}
          </div>

          <div className="flex flex-col items-center gap-2 text-center">
            <span className="grid h-8 w-8 place-content-center rounded-full bg-white/10 text-white">
              <UserRound className="h-4 w-4 text-primary" />
            </span>

            <p className="max-w-[95px] break-words text-[11px] font-semibold leading-tight text-white">
              {email || "Student"}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

function Header({ onMenuClick, scrolled }) {
  const { email } = useSelector((state) => state.auth || {});

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-30 border-b border-slate-200 bg-darkPrimary sm:bg-white/95 backdrop-blur transition-all duration-300 ease-in-out lg:left-72 ${
        scrolled ? "h-16 shadow-lg" : "h-24 shadow-none"
      }`}
    >
      <div className="flex h-full items-center justify-between px-4 transition-all duration-300 ease-in-out sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onMenuClick}
            className="grid h-11 w-11 place-content-center rounded-lg bg-darkPrimary text-white lg:hidden"
          >
            <Menu size={22} />
          </button>

          <div
            className={`flex items-center rounded-lg bg-darkPrimary px-3 transition-all duration-300 ease-in-out lg:hidden ${
              scrolled ? "h-11" : "h-14"
            }`}
          >
            <img src={logo} alt="Logo" className="w-44 object-contain p-2" />
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3 sm:gap-5">
          {/* <div className="hidden h-10 w-10 place-content-center rounded-full bg-secondary text-white shadow-lg sm:grid">
            <Bell className="h-5 w-5" />
          </div> */}

          {/* <div className="hidden h-10 w-10 place-content-center rounded-full bg-primary text-white shadow-lg sm:grid">
            <MessageSquare className="h-5 w-5" />
          </div> */}

          <div className="hidden items-center gap-3 sm:flex">
            <span className="grid h-10 w-10 place-content-center rounded-full bg-darkPrimary text-white shadow-lg">
              <UserRound className="h-6 w-6" />
            </span>

            <p className="text-sm font-bold text-black">
              {email || "Student"}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function StudentLayout() {
  const { uid, email } = useSelector((state) => state.auth || {});
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [applicationsCount, setApplicationsCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        { method: "POST", body: formData }
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
        { method: "POST", body: formData }
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
        setApplicationsCount((prev) => Math.max(0, prev + increment));
      }

      fetchApplicationsCount();
    };

    window.addEventListener("applicationsUpdated", handleApplicationsUpdated);

    return () => {
      window.removeEventListener(
        "applicationsUpdated",
        handleApplicationsUpdated
      );
    };
  }, [uid]);

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <Sidebar
        applicationsCount={applicationsCount}
        wishlistCount={wishlistCount}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        email={email}
      />

      <Header onMenuClick={() => setSidebarOpen(true)} scrolled={scrolled} />

      <main
        className={`px-4 pb-8 transition-all duration-300 ease-in-out sm:px-6 lg:ml-72 lg:px-8 ${
          scrolled ? "pt-20" : "pt-28"
        }`}
      >
        <Outlet context={{ applicationsCount, wishlistCount }} />
      </main>
    </div>
  );
}