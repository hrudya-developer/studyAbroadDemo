import React, { memo } from "react";
import {
  ArrowRight,
  BookOpenText,
  Clock3,
  Download,
  GraduationCap,
  Headphones,
  MessageCircleMore,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Explore Top Universities",
    description:
      "Discover and compare universities worldwide.",
    iconClass:
      "border-primary/15 bg-primary/10 text-primary",
  },
  {
    icon: BookOpenText,
    title: "Instant Course Recommendations",
    description:
      "Find courses that match your interests and goals.",
    iconClass:
      "border-violet-200 bg-violet-50 text-violet-600",
  },
  {
    icon: Clock3,
    title: "Track Applications",
    description:
      "Follow your application progress in real time.",
    iconClass:
      "border-secondary/15 bg-secondary/10 text-secondary",
  },
  {
    icon: Headphones,
    title: "Expert Counsellor Support",
    description:
      "Connect directly with experienced counsellors.",
    iconClass:
      "border-orange-200 bg-orange-50 text-orange-500",
  },
];

const FeatureItem = ({
  icon: Icon,
  title,
  description,
  iconClass,
}) => (
  <div
    className="
      group
      flex items-center gap-3
      border-b border-dashed border-slate-200/90
      py-3
      text-left
      first:pt-0
      last:border-b-0
      last:pb-0
      sm:gap-4
    "
  >
    <span
      className={`
        flex h-10 w-10 shrink-0
        items-center justify-center
        rounded-xl border
        shadow-[0_7px_18px_rgba(15,23,42,0.06)]
        transition-all duration-300
        group-hover:-translate-y-1
        group-hover:scale-105
        sm:h-11 sm:w-11
        ${iconClass}
      `}
    >
      <Icon
        className="h-[18px] w-[18px] sm:h-5 sm:w-5"
        strokeWidth={2.1}
      />
    </span>

    <div className="min-w-0">
      <h3 className="text-sm font-extrabold leading-5 text-slate-900 sm:text-[15px]">
        {title}
      </h3>

      <p className="mt-0.5 text-xs leading-5 text-slate-500 sm:text-[13px]">
        {description}
      </p>
    </div>
  </div>
);

const MobileAppRightSection = ({
  onCounsellingClick,
  counsellingSectionId = "gfc_wrapper",
}) => {
  return (
    <div
      className="
        relative order-1
        mx-auto w-full
        max-w-2xl
        text-center
        lg:order-2
        lg:mx-0
        lg:text-left
      "
    >
      <div
        className="
          inline-flex
          items-center gap-2
          rounded-full
          border border-primary/15
          bg-white/80
          px-4 py-2
          text-xs font-bold
          text-primary
          shadow-[0_8px_24px_rgba(192,31,83,0.08)]
          backdrop-blur-lg
          sm:text-sm
        "
      >
        <Sparkles className="h-4 w-4" />
        Your Study Abroad Companion
      </div>

      <h2
        className="
          mt-5
          font-nunito
          text-3xl font-extrabold
          leading-none
          tracking-[-0.04em]
          text-darkPrimary
          sm:text-4xl
          lg:text-5xl
        "
      >
        Mobile{" "}
        <span
          className="
            bg-gradient-to-r
            from-primary
            via-[#b2339d]
            to-secondary
            bg-clip-text
            text-transparent
          "
        >
          App
        </span>
      </h2>

      <p
        className="
          mx-auto mt-4
          max-w-xl
          text-sm leading-6
          text-slate-600
          sm:text-base
          sm:leading-7
          lg:mx-0
        "
      >
        All your study abroad needs — courses, universities,
        visas and counselling in{" "}
        <span className="font-bold text-primary">
          one powerful app.
        </span>
      </p>

      <div
        className="
          mx-auto mt-6
          max-w-xl
          rounded-[22px]
          border border-white/90
          bg-white/75
          px-4 py-4
          shadow-[0_18px_48px_rgba(15,23,42,0.09)]
          backdrop-blur-xl
          sm:px-5
          lg:mx-0
        "
      >
        {features.map((feature) => (
          <FeatureItem
            key={feature.title}
            {...feature}
          />
        ))}
      </div>

      <div
        className="
          mt-6
          flex flex-col gap-3
          sm:flex-row
          sm:justify-center
          lg:justify-start
        "
      >
        <a
          href="https://play.google.com/store/apps/details?id=com.medcity.overseas"
          target="_blank"
          rel="noopener noreferrer"
          className="
            group
            inline-flex min-h-[50px]
            items-center justify-center
            gap-2.5
            rounded-xl
            bg-gradient-to-r
            from-primary to-[#df2766]
            px-6 py-3
            text-sm font-extrabold
            text-white
            shadow-[0_14px_30px_rgba(192,31,83,0.28)]
            transition-all duration-300
            hover:-translate-y-1
            hover:shadow-[0_18px_38px_rgba(192,31,83,0.36)]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
            focus-visible:ring-offset-2
          "
        >
          <Download className="h-5 w-5" />
          Download App

          <ArrowRight
            className="
              h-4 w-4
              transition-transform duration-300
              group-hover:translate-x-1
            "
          />
        </a>

        {/* <a
          href={`#${counsellingSectionId}`}
          onClick={onCounsellingClick}
          className="
            inline-flex min-h-[50px]
            items-center justify-center
            gap-2.5
            rounded-xl
            border border-primary/30
            bg-white/80
            px-6 py-3
            text-sm font-extrabold
            text-primary
            shadow-[0_8px_22px_rgba(15,23,42,0.06)]
            backdrop-blur-lg
            transition-all duration-300
            hover:-translate-y-1
            hover:border-primary
            hover:bg-white
            hover:shadow-[0_14px_28px_rgba(192,31,83,0.12)]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
            focus-visible:ring-offset-2
          "
        >
          <MessageCircleMore className="h-5 w-5" />
          Get Free Counselling
        </a> */}
      </div>
    </div>
  );
};

export default memo(MobileAppRightSection);