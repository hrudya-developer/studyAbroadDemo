import {
  Globe2,
  GraduationCap,
  Languages,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";
import germanFlag from "../assets/germanFlag.png";

const ACADEMY_URL = "https://medcityacademy.com/";
const LANGUAGE_PROGRAM_URL =
  "https://medcityacademy.com/courses/";
const MOBILE_APP_URL =
  "https://play.google.com/store/apps/details?id=com.medcity.overseas";

const WebsiteSwitchVertical = () => {
  return (
    <nav
      aria-label="Quick website links"
      className="
        relative
        flex flex-col
        items-center
        gap-2
        rounded-r-[20px]
        border-y border-r
        border-white
        bg-black/80
        px-2
        py-2.5
        shadow-[13px_19px_32px_rgba(15,23,42,0.2)]
        backdrop-blur-xl
      "
    >
      {/* Study Abroad */}
      <VerticalInternalLink
        to="/"
        label="Study Abroad"
        icon={Globe2}
        active
      />

      {/* Medcity Academy */}
      <VerticalExternalLink
        href={ACADEMY_URL}
        label="Medcity Academy"
        icon={GraduationCap}
      />

      {/* Language Program */}
      <VerticalExternalLink
        href={LANGUAGE_PROGRAM_URL}
        label="Our Language Program"
        icon={Languages}
      />

      {/* Mobile App */}
      <VerticalExternalLink
        href={MOBILE_APP_URL}
        label="Download Mobile App"
        icon={Smartphone}
      />

      {/* German Programs */}
      <VerticalInternalLink
        to="/germanPopularCourses"
        label="German Programs"
        image={germanFlag}
      />
    </nav>
  );
};

const VerticalInternalLink = ({
  to,
  label,
  icon: Icon,
  image,
  active = false,
}) => {
  return (
    <Link
      to={to}
      aria-label={label}
      className={getLinkClasses(active)}
    >
      <VerticalLinkContent
        label={label}
        Icon={Icon}
        image={image}
        active={active}
      />
    </Link>
  );
};

const VerticalExternalLink = ({
  href,
  label,
  icon: Icon,
  image,
  active = false,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={getLinkClasses(active)}
    >
      <VerticalLinkContent
        label={label}
        Icon={Icon}
        image={image}
        active={active}
      />
    </a>
  );
};

const VerticalLinkContent = ({
  label,
  Icon,
  image,
  active,
}) => {
  return (
    <>
      {/* Flag image */}
      {image ? (
        <span
          className="
            relative z-1
            flex h-9 w-9
            items-center justify-center
            overflow-hidden
            rounded-full
            border border-slate-200
            bg-white
            shadow-sm
            transition-all duration-300
            group-hover:scale-110
            group-hover:border-primary/30
          "
        >
          <img
            src={image}
            alt={`${label} flag`}
            className="h-full w-full object-cover"
          />
        </span>
      ) : (
        /* Lucide icon */
        <span
          className={`
            relative z-10
            flex h-9 w-9
            items-center justify-center
            rounded-full
            transition-all duration-300
            group-hover:scale-110
            ${
              active
                ? `
                  bg-white/15
                  text-white
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]
                `
                : `
                  bg-primary/[0.08]
                  text-primary
                  group-hover:bg-primary
                  group-hover:text-white
                `
            }
          `}
        >
          {Icon && (
            <Icon
              size={21}
              strokeWidth={2.3}
            />
          )}
        </span>
      )}

      {/* Tooltip */}
      <span
        role="tooltip"
        className="
          pointer-events-none
          absolute
          left-[calc(100%+12px)]
          top-1/2
          z-[1]
          -translate-y-1/2
          translate-x-2
          whitespace-nowrap
          rounded-xl
          bg-slate-950
          px-3
          py-2
          text-xs
          font-semibold
          text-white
          opacity-0
          shadow-[0_10px_25px_rgba(15,23,42,0.3)]
          transition-all
          duration-200
          group-hover:translate-x-0
          group-hover:opacity-100
          group-focus-visible:translate-x-0
          group-focus-visible:opacity-100
        "
      >
        {label}

        <span
          className="
            absolute
            right-full
            top-1/2
            -translate-y-1/2
            border-[6px]
            border-transparent
            border-r-slate-950
          "
        />
      </span>

      {/* Active side indicator */}
      {active && (
        <span
          className="
            pointer-events-none
            absolute
            -left-2
            top-1/2
            h-6
            w-1
            -translate-y-1/2
            rounded-r-full
            bg-logoYellow
            shadow-[0_0_9px_rgba(247,236,34,0.9)]
          "
        />
      )}
    </>
  );
};

const getLinkClasses = (active) => `
  group
  relative
  flex h-12 w-12
  items-center justify-center
  rounded-full
  transition-all duration-300
  focus:outline-none
  focus-visible:ring-2
  focus-visible:ring-primary/40
  focus-visible:ring-offset-2
  ${
    active
      ? `
        bg-gradient-to-br
        from-primary
        via-[#9a234b]
        to-darkPrimary
        text-white
        shadow-[0_6px_16px_rgba(99,26,51,0.42)]
      `
      : `
        border border-slate-100
        bg-white
        text-primary
        shadow-[0_4px_12px_rgba(15,23,42,0.1)]
        hover:-translate-y-0.5
        hover:border-primary/20
        hover:bg-primary/[0.04]
        hover:shadow-[0_7px_18px_rgba(192,31,83,0.22)]
      `
  }
`;

export default WebsiteSwitchVertical;