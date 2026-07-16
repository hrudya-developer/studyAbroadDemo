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

const WebsiteSwitchHorizontal = ({ onNavigate }) => {
  return (
    <nav
      aria-label="Quick website links"
      className="
        relative
        flex w-full
        flex-row
        items-center
        justify-between
        gap-1.5
        overflow-visible
        px-2
        py-1.5
        lg:hidden
      "
    >
      <HorizontalInternalLink
        to="/"
        label="Study Abroad"
        icon={Globe2}
        active
        onNavigate={onNavigate}
      />

      <HorizontalExternalLink
        href={ACADEMY_URL}
        label="Medcity Academy"
        icon={GraduationCap}
        onNavigate={onNavigate}
      />

      <HorizontalExternalLink
        href={LANGUAGE_PROGRAM_URL}
        label="Our Language Program"
        icon={Languages}
        onNavigate={onNavigate}
      />

      <HorizontalExternalLink
        href={MOBILE_APP_URL}
        label="Download Mobile App"
        icon={Smartphone}
        onNavigate={onNavigate}
      />

      <HorizontalInternalLink
        to="/germanPopularCourses"
        label="German Programs"
        image={germanFlag}
        onNavigate={onNavigate}
      />
    </nav>
  );
};

const HorizontalInternalLink = ({
  to,
  label,
  icon: Icon,
  image,
  active = false,
  onNavigate,
}) => {
  return (
    <Link
      to={to}
      aria-label={label}
      onClick={() => onNavigate?.()}
      className={getLinkClasses(active)}
    >
      <HorizontalLinkContent
        label={label}
        Icon={Icon}
        image={image}
        active={active}
      />
    </Link>
  );
};

const HorizontalExternalLink = ({
  href,
  label,
  icon: Icon,
  image,
  active = false,
  onNavigate,
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      onClick={() => onNavigate?.()}
      className={getLinkClasses(active)}
    >
      <HorizontalLinkContent
        label={label}
        Icon={Icon}
        image={image}
        active={active}
      />
    </a>
  );
};

const HorizontalLinkContent = ({
  label,
  Icon,
  image,
  active,
}) => {
  return (
    <>
      {image ? (
        <span
          className="
            relative z-10
            flex h-8 w-8
            items-center justify-center
            overflow-hidden
            rounded-full
            border border-white/40
            bg-primary/10
            shadow-sm
            transition-all duration-300
            group-hover:scale-105
          "
        >
          <img
            src={image}
            alt={`${label} flag`}
            className="h-full w-full object-cover"
          />
        </span>
      ) : (
        <span
          className={`
            relative z-10
            flex h-8 w-8
            items-center justify-center
            rounded-full
            transition-all duration-300
            group-hover:scale-105
            ${
              active
                ? `
                  bg-white/15
                  text-white
                  shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]
                `
                : `
                  bg-white
                  text-primary
                  group-hover:bg-primary
                  group-hover:text-white
                `
            }
          `}
        >
          {Icon && (
            <Icon
              size={18}
              strokeWidth={2.2}
              aria-hidden="true"
            />
          )}
        </span>
      )}

      <span
        role="tooltip"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[calc(100%+8px)]
          z-[9999]
          -translate-x-1/2
          translate-y-1
          whitespace-nowrap
          rounded-full
          bg-slate-950
          px-2.5
          py-1.5
          text-[10px]
          font-semibold
          text-white
          opacity-0
          shadow-lg
          transition-all
          duration-200
          group-hover:translate-y-0
          group-hover:opacity-100
          group-focus-visible:translate-y-0
          group-focus-visible:opacity-100
        "
      >
        {label}

        <span
          className="
            absolute
            bottom-full
            left-1/2
            -translate-x-1/2
            border-[5px]
            border-transparent
            border-b-slate-950
          "
        />
      </span>

      {active && (
        <span
          className="
            pointer-events-none
            absolute
            -bottom-0.5
            left-1/2
            h-0.5
            w-5
            -translate-x-1/2
            rounded-full
            bg-logoYellow
            shadow-[0_0_7px_rgba(247,236,34,0.85)]
          "
        />
      )}
    </>
  );
};

const getLinkClasses = (active) => `
  group
  relative
  flex h-[38px] w-[38px]
  shrink-0
  items-center justify-center
  rounded-full
  transition-all duration-300
  focus:outline-none
  focus-visible:ring-2
  focus-visible:ring-primary/40
  ${
    active
      ? `
        bg-gradient-to-br
        from-primary
        via-[#9a234b]
        to-darkPrimary
        text-white
        shadow-[0_5px_12px_rgba(99,26,51,0.4)]
      `
      : `
        border border-white/15
        bg-rose-100
        text-primary
        shadow-[0_3px_8px_rgba(15,23,42,0.14)]
        hover:-translate-y-0.5
        hover:bg-primary
        hover:text-white
      `
  }
`;

export default WebsiteSwitchHorizontal;