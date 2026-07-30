import {
  ChevronRight,
  Home,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function GermanProgramsBreadcrumb() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-10 flex justify-center"
    >
      <ol
        className="
          inline-flex
          flex-wrap
          items-center
          justify-center
          gap-2
          rounded-full
          bg-white/80
          px-6
          py-2
          shadow-xl
          shadow-primary/5
          backdrop-blur-xl
        "
      >
        <li>
          <Link
            to="/"
            className="
              group
              inline-flex
              items-center
              gap-2
              rounded-full
              
              text-sm
              font-semibold
              text-slate-700
              transition-all
              duration-300
              hover:bg-primary/10
              hover:text-primary
            "
          >
            <span
              className="
                grid
                h-8
                w-8
                place-content-center
                rounded-full
                bg-primary/10
                text-primary
                transition-all
                duration-300
                group-hover:bg-primary
                group-hover:text-white
              "
            >
              <Home
                size={15}
                aria-hidden="true"
              />
            </span>

            Home
          </Link>
        </li>

        <li
          aria-hidden="true"
          className="text-slate-400"
        >
          <ChevronRight size={18} />
        </li>

        <li>
          <span
            aria-current="page"
            className="
              
              text-sm
              text-gray-700
            "
          >
            German Popular Courses
          </span>
        </li>
      </ol>
    </nav>
  );
}