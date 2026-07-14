import {
  ArrowRight,
  Globe2,
  Smartphone,
  GraduationCap,
} from "lucide-react";
import { Link } from "react-router-dom";

const Topbar = () => {
  return (
    <div className="hidden lg:block w-full border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-9xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">

        {/* Left Side - Website Switch */}
 <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 p-1 shadow-sm">
  {/* Active */}
  <Link
    to="/"
    className="group relative flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-darkPrimary to-darkPrimary px-4 py-2 text-sm font-semibold text-white shadow transition-all duration-300 hover:scale-[1.03]"
  >
    {/* Shine */}
    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

    <Globe2
      size={14}
      className="relative transition-transform duration-300 group-hover:rotate-12"
    />

    <span className="relative">Study Abroad</span>
  </Link>

  {/* Academy */}
  <a
    href="https://medcityacademy.com/"
    target="_blank"
    rel="noopener noreferrer"
    className="group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-slate-800 transition-all duration-300 hover:text-primary"
  >
    <GraduationCap
      size={14}
      className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
    />

    <span>Academy</span>
  </a>
</div>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          {/* Language Program */}
          <a
            href="https://medcityacademy.com/courses/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-xl px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-darkPrimary transition-all duration-300 group-hover:bg-darkPrimary group-hover:text-white">
              <Globe2 size={17} />
            </span>

            <span className="text-sm font-semibold text-darkPrimary">
              Our Language Program
            </span>
          </a>

          {/* Mobile App */}
          <a
            href="https://play.google.com/store/apps/details?id=com.medcity.overseas"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-xl px-4 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-darkPrimary transition-all duration-300 group-hover:bg-darkPrimary group-hover:text-white">
              <Smartphone size={17} />
            </span>

            <span className="text-sm font-semibold text-darkPrimary">
              Download Mobile App
            </span>
          </a>

          {/* German Programs */}
          <Link
            to="/germanPopularCourses"
            className="group flex items-center gap-3 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary"
          >
            <span>German Programs</span>

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

        </div>
      </div>
    </div>
  );
};

export default Topbar;