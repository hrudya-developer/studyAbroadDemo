import React, { memo } from "react";
import {
  Languages,
  MapPin,
  Smartphone,
} from "lucide-react";
import { Link } from "react-router-dom";

import WebsiteSwitch from "./WebsiteSwitch";
import germanFlag from "../assets/germanFlag.png";

const ActionCard = ({
  href,
  to,
  external = false,
  icon,
  title,
  subtitle,
  image,
  fullHeight = false,
  iconClassName = "from-darkPrimary to-primary",
  underlineClassName = "bg-primary",
}) => {
  const commonClasses = `
    group
    relative
    flex items-center
    whitespace-nowrap
    transition-all duration-300 ease-out
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-primary
    focus-visible:ring-offset-2
  `;

  const regularClasses = `
    h-[46px]
    gap-2.5
    overflow-hidden
    rounded-[13px]
    border border-slate-200/80
    bg-white
    px-3
    text-slate-800
    shadow-[0_5px_14px_rgba(15,23,42,0.09)]
    hover:-translate-y-0.5
    hover:border-slate-300
    hover:shadow-[0_9px_20px_rgba(15,23,42,0.13)]
    xl:px-3.5
  `;

  const fullHeightClasses = `
    h-full
    min-w-[210px]
    gap-3
    self-stretch
    overflow-hidden
    bg-black
    px-5
    text-white
    shadow-[-8px_0_22px_rgba(15,23,42,0.12)]
    hover:bg-slate-950
  `;

  const content = (
    <>
      {fullHeight && (
        <>
          <span
            className="
              pointer-events-none
              absolute inset-0
              bg-[radial-gradient(circle_at_85%_20%,rgba(255,255,255,0.16),transparent_38%)]
            "
          />

          <span
            className="
              pointer-events-none
              absolute -bottom-8 right-1
              h-24 w-24 rounded-full
              bg-primary/25 blur-2xl
            "
          />
        </>
      )}

      {!fullHeight && (
        <span
          className={`
            pointer-events-none
            absolute bottom-0 left-1/2
            h-[2px] w-9
            -translate-x-1/2
            rounded-full
            ${underlineClassName}
            transition-all duration-300
            group-hover:w-12
          `}
        />
      )}

      {image ? (
        <span
          className={`
            relative z-10
            flex shrink-0 items-center justify-center
            overflow-hidden rounded-full
            border-2 border-white
            bg-white
            shadow-[0_3px_8px_rgba(15,23,42,0.18)]
            ${
              fullHeight
                ? "h-10 w-10"
                : "h-8 w-8"
            }
          `}
        >
          <img
            src={image}
            alt=""
            aria-hidden="true"
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </span>
      ) : (
        <span
          className={`
            relative z-10
            flex shrink-0 items-center justify-center
            rounded-lg
            text-white
            shadow-[0_3px_8px_rgba(15,23,42,0.18)]
            transition-all duration-300
            group-hover:scale-105
            ${
              fullHeight
                ? "h-10 w-10 bg-white/15"
                : `h-8 w-8 bg-gradient-to-br ${iconClassName}`
            }
          `}
        >
          {icon}
        </span>
      )}

      <span
        className="
          relative z-10
          flex min-w-0 flex-col
          items-start
        "
      >
        <span
          className={`
            font-semibold leading-none
            ${
              fullHeight
                ? "text-[13px] text-white"
                : "text-[13px] text-slate-800 xl:text-[13px]"
            }
          `}
        >
          {title}
        </span>

        {subtitle && (
          <span
            className="
              mt-1
              text-[9px]
              font-medium
              leading-none
              text-white/75
            "
          >
            {subtitle}
          </span>
        )}
      </span>
    </>
  );

  const className = `${commonClasses} ${
    fullHeight ? fullHeightClasses : regularClasses
  }`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
        title={title}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      to={to}
      aria-label={title}
      title={title}
      className={className}
    >
      {content}
    </Link>
  );
};

const Topbar = () => {
  return (
    <header
      id="website-topbar"
      className="
        hidden
        h-[62px]
        w-full
        border-b border-slate-200
        bg-gradient-to-r
        from-slate-200
        via-white
        to-slate-100
        shadow-[0_3px_14px_rgba(15,23,42,0.06)]
        lg:block
      "
    >
      <nav
        aria-label="Top navigation"
        className="
          mx-auto
          flex h-full
          max-w-screen-2xl
          items-center
          justify-between
          pl-5
          pr-0
          xl:pl-8
        "
      >
        <div
          className="
            shrink-0
            rounded-2xl
            bg-white
            shadow-[0_6px_20px_rgba(15,23,42,0.10)]
          "
        >
          <WebsiteSwitch />
        </div>

        <div
          className="
            ml-auto
            flex h-full
            min-w-0
            items-center
            justify-end
            gap-2
            xl:gap-2.5
          "
        >
          <ActionCard
            external
            href="https://medcityacademy.com/centers/"
            icon={
              <MapPin
                size={16}
                strokeWidth={2.4}
              />
            }
            iconClassName="
              from-[#36c9ec]
              to-[#139ac3]
            "
            underlineClassName="bg-[#25b9e5]"
            title="Our Branches"
          />

          <ActionCard
            external
            href="https://medcityacademy.com/courses/"
            icon={
              <Languages
                size={16}
                strokeWidth={2.4}
              />
            }
            iconClassName="
              from-[#7d5ce0]
              to-[#4f2eb5]
            "
            underlineClassName="bg-[#7652d4]"
            title="Language Programs"
          />

          <ActionCard
            external
            href="https://play.google.com/store/apps/details?id=com.medcity.overseas"
            icon={
              <Smartphone
                size={16}
                strokeWidth={2.4}
              />
            }
            iconClassName="
              from-[#ffd81a]
              to-[#f5ad00]
            "
            underlineClassName="bg-[#f5bc00]"
            title="Mobile App"
          />

          <ActionCard
            to="/germanPopularCourses"
            image={germanFlag}
            title="German Programs"
            subtitle="Your pathway to Germany"
            fullHeight
          />
        </div>
      </nav>
    </header>
  );
};

export default memo(Topbar);