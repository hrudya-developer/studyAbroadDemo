import {
  ChevronRight,
  Home,
  Landmark,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function UniversityDetailsBreadcrumb({
  universityName,
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-8 flex justify-center lg:justify-start"
    >
      <ol
        className="
          inline-flex max-w-full
          flex-wrap items-center
          justify-center gap-2
          rounded-full
          border border-slate-200/80
          bg-white/85
          px-4 py-2.5
          text-sm text-slate-500
          shadow-[0_10px_30px_rgba(15,23,42,0.08)]
          backdrop-blur-xl
          sm:px-5
        "
      >
        <li>
          <Link
            to="/"
            className="
              inline-flex items-center gap-1.5
              font-semibold
              transition-colors
              hover:text-primary
            "
          >
            <Home
              size={14}
              aria-hidden="true"
            />

            Home
          </Link>
        </li>

        <li
          aria-hidden="true"
          className="text-slate-300"
        >
          <ChevronRight size={14} />
        </li>

        <li>
          <Link
            to="/allUniversities"
            className="
              inline-flex items-center gap-1.5
              font-semibold
              transition-colors
              hover:text-primary
            "
          >
            <Landmark
              size={14}
              aria-hidden="true"
            />

            Universities
          </Link>
        </li>

        <li
          aria-hidden="true"
          className="text-slate-300"
        >
          <ChevronRight size={14} />
        </li>

        <li
          aria-current="page"
          title={universityName}
          className="
            max-w-[220px] truncate
            rounded-full
            bg-primary/10
            px-3 py-1
            font-bold text-primary
            sm:max-w-[300px]
          "
        >
          {universityName}
        </li>
      </ol>
    </nav>
  );
}