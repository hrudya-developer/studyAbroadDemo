import React, { memo } from "react";
import {
  Languages,
  MapPin,
  Smartphone,
  PhoneCall,
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
  featured = false,
  iconClassName = "from-darkPrimary to-primary",
  underlineClassName = "bg-primary",
  cardClassName = "",
}) => {
  const baseClasses = `
    group
    relative
    flex
    shrink-0
    items-center
    justify-center
    overflow-hidden
    whitespace-nowrap
    transition-all
    duration-300
    ease-out
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-primary
    focus-visible:ring-offset-2
  `;

  const regularClasses = `
    h-[46px]
    w-[46px]
    gap-2
    rounded-[14px]
    border border-white/90
    bg-white/90
    px-0
    text-slate-800
    shadow-[0_5px_16px_rgba(15,23,42,0.09)]
    backdrop-blur-md

    hover:-translate-y-0.5
    hover:bg-white
    hover:shadow-[0_10px_24px_rgba(15,23,42,0.14)]

    min-[1220px]:w-auto
    min-[1220px]:justify-start
    min-[1220]:gap-2.5
    min-[1220px]:px-3.5
  `;

  const featuredClasses = `
    h-[46px]
    w-[50px]
    gap-0
    rounded-[14px]
    border border-slate-800
    bg-gradient-to-br
    from-slate-900
    via-black
    to-[#2c0d18]
    px-0
    text-white
    shadow-[0_7px_20px_rgba(15,23,42,0.2)]

    hover:-translate-y-0.5
    hover:border-primary/50
    hover:shadow-[0_10px_26px_rgba(99,26,51,0.28)]

    min-[1220px]:w-auto
    min-[1220px]:min-w-[205px]
    min-[1220px]:justify-start
    min-[1220px]:gap-3
    min-[1220px]:px-4
  `;

  const content = (
    <>
      {featured ? (
        <>
          <span
            className="
              pointer-events-none
              absolute inset-0
              bg-[radial-gradient(circle_at_85%_15%,rgba(255,255,255,0.17),transparent_38%)]
            "
          />

          <span
            className="
              pointer-events-none
              absolute -bottom-10 right-0
              h-24 w-24
              rounded-full
              bg-primary/30
              blur-2xl
            "
          />

          <span
            className="
              pointer-events-none
              absolute bottom-0 left-1/2
              h-[3px] w-10
              -translate-x-1/2
              rounded-t-full
              bg-primary
              transition-all duration-300
              group-hover:w-16
            "
          />
        </>
      ) : (
       
        <span
  className={`
    pointer-events-none
    absolute bottom-0 left-1/2
    hidden
    h-[2px]
    w-9
    -translate-x-1/2
    rounded-full
    ${underlineClassName}
    transition-all
    duration-300
    group-hover:w-12
    min-[1100px]:block
  `}
/>
      )}

      {image ? (
        <span
          className="
            relative z-10
            flex h-8 w-8
            shrink-0
            items-center justify-center
            overflow-hidden
            rounded-full
            border-2 border-white
            bg-white
            shadow-[0_4px_10px_rgba(15,23,42,0.2)]
            transition-transform duration-300
            group-hover:scale-105
          "
        >
          <img
            src={image}
            alt=""
            aria-hidden="true"
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </span>
      ) : (
        <span
          className={`
            relative z-10
            flex h-8 w-8
            shrink-0
            items-center justify-center
            rounded-[10px]
            text-white
            shadow-[0_4px_10px_rgba(15,23,42,0.18)]
            transition-all duration-300
            group-hover:scale-105
            group-hover:-rotate-2
            ${
              featured
                ? "bg-white/15 backdrop-blur-sm"
                : `bg-gradient-to-br ${iconClassName}`
            }
          `}
        >
          {icon}
        </span>
      )}

      <span
        className="
          relative z-10
          hidden
          min-w-0
          flex-col
          items-start
          overflow-hidden
          min-[1220px]:flex
        "
      >
        <span
          className={`
            max-w-[150px]
            truncate
            text-[13px]
            font-semibold
            leading-none
            ${
              featured
                ? "text-white"
                : "text-slate-800"
            }
          `}
        >
          {title}
        </span>

        {subtitle && (
          <span
            className="
              mt-1
              max-w-[155px]
              truncate
              text-[9px]
              font-medium
              leading-none
              text-white/70
            "
          >
            {subtitle}
          </span>
        )}
      </span>
    </>
  );

  const className = `
    ${baseClasses}
    ${featured ? featuredClasses : regularClasses}
    ${cardClassName}
  `;

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
        relative
        hidden
        h-[64px]
        w-full
        overflow-hidden
        border-b border-slate-200/80
        bg-gradient-to-r
        from-slate-100
        via-white
        to-rose-50/50
        shadow-[0_4px_18px_rgba(15,23,42,0.06)]
        lg:block
      "
    >
      <div
        className="
          pointer-events-none
          absolute inset-0
          opacity-[0.025]
          [background-image:radial-gradient(#334155_1px,transparent_1px)]
          [background-size:18px_18px]
        "
      />

      <nav
        aria-label="Top navigation"
        className="
          relative z-10
          mx-auto
          flex h-full
          w-full
          max-w-[1600px]
          items-center
          justify-between
          gap-4
          px-3

          xl:px-6
          2xl:px-8
        "
      >
        {/* Left */}
        <div
          className="
            min-w-0
            shrink-0
            overflow-hidden
            rounded-[16px]
            border border-white/80
            bg-white/90
            shadow-[0_6px_20px_rgba(15,23,42,0.10)]
            backdrop-blur-md
          "
        >
          <WebsiteSwitch />
        </div>

        {/* Right */}
        <div
          className="
            ml-auto
            flex min-w-0
            items-center
            justify-end
            gap-1.5
            overflow-hidden

            min-[1220px]:gap-2
            xl:gap-2.5
          "
        >
          <ActionCard
            to="/branches"
            icon={
              <MapPin
                size={16}
                strokeWidth={2.4}
              />
            }
            iconClassName="
              from-[#43c9e9]
              to-[#0786b2]
            "
            underlineClassName="bg-[#25b9e5]"
            cardClassName="
              hover:border-cyan-200
              hover:bg-cyan-50/50
            "
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
              from-[#9b7ced]
              to-[#6541c5]
            "
            underlineClassName="bg-[#7652d4]"
            cardClassName="
              hover:border-violet-200
              hover:bg-violet-50/50
            "
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
              from-[#ffd934]
              to-[#e99b00]
            "
            underlineClassName="bg-[#f5bc00]"
            cardClassName="
              hover:border-amber-200
              hover:bg-amber-50/50
            "
            title="Mobile App"
          />

          <ActionCard
            to="/contact"
            icon={
              <PhoneCall
                size={16}
                strokeWidth={2.4}
              />
            }
            iconClassName="
              from-[#f59ab7]
              via-[#df5b87]
              to-[#c01f53]
            "
            underlineClassName="bg-[#df5b87]"
            cardClassName="
              border-rose-200/90
              bg-gradient-to-br
              from-rose-50
              to-pink-50
              hover:border-rose-300
              hover:from-white
              hover:to-rose-50
            "
            title="Contact Us"
          />

          <ActionCard
            to="/germanPopularCourses"
            image={germanFlag}
            title="German Programs"
            subtitle="Your pathway to Germany"
            featured
          />
        </div>
      </nav>
    </header>
  );
};

export default memo(Topbar);