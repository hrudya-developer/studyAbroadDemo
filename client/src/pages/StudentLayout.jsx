import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../assets/logo.png";

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

const navItems = [
  [Home, "Dashboard", "/student"],
  [User, "My Profile", "/student/profile"],
  
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
      </nav>
    </aside>
  );
}

function Header() {
  const { email } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-30 h-24 border-b border-slate-200 bg-white/90 backdrop-blur lg:ml-72">
      <div className="flex h-full justify-between items-center gap-5 px-6 lg:px-8">
        <button className="rounded-xl p-2 hover:bg-slate-100">
          <Menu />
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
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function StudentLayout() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <Sidebar />
      <Header />

      <main className="lg:ml-72 p-6 lg:p-8">
        <Outlet />
      </main>
    </div>
  );
}