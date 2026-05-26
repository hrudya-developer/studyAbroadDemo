import React, { useState } from "react";
import logo from "../assets/logo.png";
import {
  Bell,
  BookOpen,
  Briefcase,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  FileText,
  GraduationCap,
  Heart,
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

const red = "#c9154f";
const navy = "#061d2b";

const navItems = [
  [Home, "Dashboard"],
  [User, "My Profile"],
  [FileText, "My Applications"],
  [BookOpen, "Shortlisted Universities"],
  [FileText, "My Documents"],
  [GraduationCap, "My Courses"],
  [Users, "Counselor Sessions"],
  [CalendarDays, "My Bookings"],
  [ShieldCheck, "Scholarships"],
  [Wallet, "Payments"],
  [MessageSquare, "Messages"],
  [Bell, "Notifications"],
  [HelpCircle, "Help & Support"],
  [LogOut, "Logout"],
];

const courses = [
  ["Nursing", "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80"],
  ["MBBS", "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80"],
  ["Agriculture & Forestry", "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80"],
  ["Business Analytics", "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=600&q=80"],
  ["Master's Programs", "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80"],
];

const destinations = [
  ["Germany", "100+ Properties", "🇩🇪", "https://images.unsplash.com/photo-1560969184-10fe8719e047?auto=format&fit=crop&w=600&q=80"],
  ["Austria", "100+ Properties", "🇦🇹", "https://images.unsplash.com/photo-1508189860359-777d945909ef?auto=format&fit=crop&w=600&q=80"],
  ["USA", "100+ Properties", "🇺🇸", "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?auto=format&fit=crop&w=600&q=80"],
  ["UK", "100+ Properties", "🇬🇧", "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=600&q=80"],
];

const universities = {
  UK: ["University of Oxford", "University of Cambridge", "Imperial College London", "UCL", "The University of Edinburgh"],
  Australia: ["The University of Queensland", "The University of Adelaide", "University of Melbourne", "Monash University", "University of Sydney"],
  Canada: ["University of Toronto", "McGill University", "University of British Columbia", "University of Alberta", "University of Waterloo"],
  Germany: ["Technical University of Munich", "EU Business School", "Lancaster University", "Arden University", "Heidelberg University"],
  USA: ["Harvard University", "Stanford University", "MIT", "Columbia University", "Yale University"],
  Ireland: ["SETU Carlow", "National College of Ireland", "Trinity College Dublin", "University College Dublin", "Dublin City University"],
};

function Sidebar() {
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-72 flex-col text-white bg-black">
      <div className="h-24 flex items-center px-7 border-b border-white/10">
        <div className="text-2xl font-black leading-tight">
        
          <div className="text-lg"><img src={logo} /></div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-1">
        {navItems.map(([Icon, label], index) => (
          <button
            key={label}
            className={`w-full flex items-center gap-4 rounded-xl px-4 py-3 text-left text-sm font-medium transition ${
              index === 0 ? "bg-primary shadow-lg" : "hover:bg-white/10"
            }`}
          >
            <Icon size={20} />
            <span className="flex-1">{label}</span>
            {label === "Messages" && (
              <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-xs">2</span>
            )}
          </button>
        ))}
      </nav>

   
    </aside>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-30 h-24 border-b border-slate-200 bg-white/90 backdrop-blur lg:ml-72">
      <div className="flex h-full justify-between items-center gap-5 px-6 lg:px-8">
        <button className="rounded-xl p-2 hover:bg-slate-100"><Menu /></button>
        <div className="relative max-w-3xl flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-14 pr-16 shadow-sm outline-none focus:border-primary" placeholder="Search for courses, universities, countries..." />
          <button className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full text-white bg-primary"><Search size={20} /></button>
        </div>
        <div className="flex gap-5">
       <div className="p-3 rounded-xl bg-secondary text-white"> <Bell className="hidden sm:block" /></div>
        <div className="p-3 rounded-xl bg-primary text-white">  <MessageSquare className="hidden sm:block" /></div>
        <div className="hidden sm:flex items-center gap-3">
          <img alt="student" className="h-12 w-12 rounded-full object-cover ring-4 ring-red-100" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80" />
          <div><p className="font-bold">Hrudya</p><p className="text-sm text-slate-500">Student</p></div>
          <ChevronDown size={18} />
        </div></div>
      </div>
    </header>
  );
}

function StatCard({ icon: Icon, value, label, status, color }) {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
      <div className="grid h-16 w-16 place-items-center rounded-full" style={{ background: `${color}20`, color }}><Icon size={30} /></div>
      <div><p className="text-2xl font-black text-slate-900">{value}</p><p className="text-sm">{label}</p><p className="text-sm font-bold" style={{ color }}>{status}</p></div>
    </div>
  );
}

function SectionTitle({ title }) {
  return <div className="mb-4 flex items-center justify-between"><h2 className="text-xl font-black text-slate-950">{title}</h2><button className="font-semibold text-[#c9154f]">View all</button></div>;
}

export default function StudentDashboard() {
  const countries = Object.keys(universities);
  const [activeCountry, setActiveCountry] = useState("UK");

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <Sidebar />
      <Header />

      <main className="lg:ml-72 p-6 lg:p-8">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">
          <section className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm min-h-[300px]">
              <img className="absolute inset-y-0 right-0 h-full w-2/3 object-cover" src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80" alt="Ireland" />
              <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/10" />
              <div className="relative max-w-md">
                <p className="mb-5 font-bold text-primary">Welcome back, Hrudya 👋</p>
                <h1 className="text-5xl font-black leading-tight">Your Dream,<br /><span className="text-primary">Our Guidance</span></h1>
                <p className="mt-5 text-lg text-slate-700">Let's take the next step towards your global future.</p>
                <button className="mt-7 rounded-xl bg-primary px-7 py-4 font-bold text-white shadow-lg">Explore Destinations →</button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
              <StatCard icon={GraduationCap} value="03" label="Applications" status="In Progress" color="#c9154f" />
              <StatCard icon={BookOpen} value="05" label="Universities" status="Shortlisted" color="#7c3aed" />
              <StatCard icon={CalendarDays} value="02" label="Counselor Sessions" status="Upcoming" color="#f97316" />
              <StatCard icon={ShieldCheck} value="01" label="Offer Letter" status="Received" color="#16a34a" />
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <SectionTitle title="Popular Courses" />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
                {courses.map(([name, img]) => <div key={name} className="overflow-hidden rounded-2xl bg-secondary text-white"><img src={img} alt={name} className="h-36 w-full object-cover" /><p className="p-3 text-center font-black">{name}</p></div>)}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <SectionTitle title="Top Universities by Country" />
              <div className="mb-5 flex gap-7 overflow-x-auto text-sm font-bold">
                {countries.map((country) => <button key={country} onClick={() => setActiveCountry(country)} className={`pb-3 ${activeCountry === country ? "border-b-4 border-secondary text-primary" : "text-slate-800"}`}>{country}</button>)}
              </div>
              <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-5">
                {universities[activeCountry].map((uni, i) => (
                  <div key={uni} className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm">
                    <div className="mx-auto mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-primary text-lg font-black text-white">{uni.split(" ").slice(0, 2).map(w => w[0]).join("")}</div>
                    <h3 className="min-h-12 font-bold leading-tight">{uni}</h3>
                    <p className="mt-2 text-xs text-slate-500">QS Rank #{i + 3}</p>
                    <button className="mt-4 rounded-lg border border-secondary bg-secondary px-5 py-2 text-sm font-bold text-white">View Details</button>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <SectionTitle title="Top Destinations" />
              <div className="grid gap-5 md:grid-cols-4">
                {destinations.map(([name, sub, flag, img]) => <div key={name} className="relative overflow-hidden rounded-2xl"><img src={img} alt={name} className="h-40 w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#061d2b] to-transparent" /><div className="absolute bottom-4 left-4 text-white"><p className="font-black">{name}</p><p className="text-sm">{sub}</p></div><div className="absolute bottom-4 right-4 text-3xl">{flag}</div></div>)}
              </div>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <SectionTitle title="Upcoming Session" />
              <div className="rounded-2xl p-5">
                <div className="flex gap-4"><img className="h-16 w-16 rounded-full object-cover" src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80" alt="Counselor" /><div><p className="font-bold">Career Counseling</p><p className="text-sm text-slate-500">Ms. Anjali Sharma</p></div></div>
                <p className="mt-4 text-sm">28 May 2025, Wed</p><p className="text-sm">04:00 PM - 05:00 PM</p>
                <button className="mt-5 w-full rounded-xl bg-secondary py-3 font-bold text-white">Join Session</button>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <SectionTitle title="Quick Links" />
              {["Book a Free Counseling", "IELTS Preparation", "Visa Guide", "Education Loan", "Pre Departure Guide"].map((item) => <button key={item} className="flex w-full items-center justify-between border-b border-gray-200 py-4 text-left"><span>{item}</span><ChevronRight size={18} /></button>)}
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm">
              <SectionTitle title="Study for Free Countries" />
              <div className="rounded-2xl bg-blue-700 p-8 text-white">
                <p className="text-5xl font-black">USA</p><p className="text-2xl">MSc Nursing</p>
                <div className="mt-5 inline-block rounded-full bg-red-600 px-5 py-3 font-black rotate-[-8deg]">FREE</div>
              </div>
              <div className="mt-5 flex justify-center gap-2"><span className="h-3 w-3 rounded-full bg-secondary" /><span className="h-3 w-3 rounded-full bg-slate-300" /><span className="h-3 w-3 rounded-full bg-slate-300" /></div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
