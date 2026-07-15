import { Languages, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import WebsiteSwitch from "./WebsiteSwitch";
import germanFlag from "../assets/germanFlag.png";

const Topbar = () => {
  return (
    <div
      id="website-topbar"
      className="
        hidden w-full
        border-b border-slate-200
        bg-white
        lg:block
      "
    >
      <div
        className="
          mx-auto flex max-w-9xl
          items-center justify-between
          px-4 py-2
          sm:px-6 lg:px-8
        "
      >
        {/* Left side */}
        <WebsiteSwitch />

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Language Program */}
          <a
            href="https://medcityacademy.com/courses/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              group flex items-center gap-3
              rounded-xl px-4 py-2
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-slate-50
              hover:shadow-md
            "
          >
            <span
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full bg-primary/10
                text-darkPrimary
                transition-all duration-300
                group-hover:bg-darkPrimary
                group-hover:text-white
              "
            >
              <Languages size={17} strokeWidth={2.3} />
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
            className="
              group flex items-center gap-3
              rounded-xl px-4 py-2
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-slate-50
              hover:shadow-md
            "
          >
            <span
              className="
                flex h-9 w-9 items-center justify-center
                rounded-full bg-primary/10
                text-darkPrimary
                transition-all duration-300
                group-hover:bg-darkPrimary
                group-hover:text-white
              "
            >
              <Smartphone size={17} strokeWidth={2.3} />
            </span>

            <span className="text-sm font-semibold text-darkPrimary">
              Download Mobile App
            </span>
          </a>

          {/* German Programs */}
          <Link
            to="/germanPopularCourses"
            className="
              group flex items-center gap-3
              rounded-xl bg-black/90
              px-3 py-2.5
              text-sm font-semibold text-white
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-darkPrimary
              hover:shadow-md
            "
          >
            <span
              className="
                h-7 w-7 overflow-hidden
                rounded-full border border-white
              "
            >
              <img
                src={germanFlag}
                alt="German flag"
                className="h-full w-full object-cover"
              />
            </span>

            <span>German Programs</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Topbar;