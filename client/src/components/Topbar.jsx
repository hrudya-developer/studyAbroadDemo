import React, { memo } from "react";
import { Languages, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import WebsiteSwitch from "./WebsiteSwitch";
import germanFlag from "../assets/germanFlag.png";

const ActionCard = ({
  href,
  to,
  external = false,
  icon,
  title,
  image,
  dark = false,
}) => {
  const baseClasses = `
    group flex items-center gap-3 rounded-xl
    px-4 py-2.5 min-h-[46px]
    transition-all duration-300
    hover:-translate-y-0.5 hover:shadow-md
    focus:outline-none focus:ring-1 focus:ring-darkPrimary
  `;

  const lightClasses = `
    bg-slate-200 hover:bg-slate-50
  `;

  const darkClasses = `
    bg-gray-900
    text-white
    hover:bg-primary
  `;

  const content = (
    <>
      {image ? (
        <span className="h-8 w-8 overflow-hidden rounded-full border border-white">
          <img
            src={image}
            alt="German Flag"
            loading="lazy"
            width={32}
            height={32}
            className="h-full w-full object-cover"
          />
        </span>
      ) : (
        <span
          className="
            flex h-9 w-9 items-center justify-center
            rounded-lg bg-darkPrimary text-white
            transition-colors duration-300
            group-hover:bg-primary
          "
        >
          {icon}
        </span>
      )}

      <span className="text-sm font-semibold whitespace-nowrap">
        {title}
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={title}
        title={title}
        className={`${baseClasses} ${
          dark ? darkClasses : lightClasses
        }`}
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
      className={`${baseClasses} ${
        dark ? darkClasses : lightClasses
      }`}
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
        lg:block
        mx-auto
        max-w-screen-2xl
        bg-slate-100"
    >
      <nav
        aria-label="Top navigation"
        className="
          flex items-center justify-between
          px-6 py-2
        "
      >
        <WebsiteSwitch />

        <div className="flex items-center gap-3">
          <ActionCard
            external
            href="https://medcityacademy.com/courses/"
            icon={<Languages size={18} />}
            title="Language Programs"
          />

          <ActionCard
            external
            href="https://play.google.com/store/apps/details?id=com.medcity.overseas"
            icon={<Smartphone size={18} />}
            title="Download Mobile App"
          />

          <ActionCard
            to="/germanPopularCourses"
            image={germanFlag}
            title="German Programs"
            dark
          />
        </div>
      </nav>
    </header>
  );
};

export default memo(Topbar);