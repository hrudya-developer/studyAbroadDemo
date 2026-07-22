import React, { memo } from "react";
import {
  Building2,
  GraduationCap,
  Headphones,
  Plane,
  Star,
  Users,
} from "lucide-react";

import mobilApp from "../assets/appImage.png";

const orbitIcons = [
  {
    icon: GraduationCap,
    position: "left-[6%] top-[17%]",
    iconClass: "text-primary",
    delay: "0s",
  },
  {
    icon: Plane,
    position: "left-[1%] top-[49%]",
    iconClass: "text-secondary",
    delay: "0.7s",
  },
  {
    icon: Users,
    position: "right-[2%] top-[46%]",
    iconClass: "text-primary",
    delay: "1.2s",
  },
  {
    icon: Headphones,
    position: "bottom-[13%] left-[7%]",
    iconClass: "text-orange-500",
    delay: "1.7s",
  },
  {
    icon: Building2,
    position: "bottom-[3%] right-[23%]",
    iconClass: "text-secondary",
    delay: "2.1s",
  },
];

const MobileAppLeftSection = () => {
  return (
    <div
      className="
        relative order-2
        flex min-h-[400px]
        items-center justify-center
        sm:min-h-[490px]
        lg:order-1
        lg:min-h-[550px]
      "
    >
      <div
        className="
          relative
          h-[390px] w-full
          max-w-[600px]
          sm:h-[470px]
          lg:h-[530px]
        "
      >
        {/* Main glow */}
        <div
          aria-hidden="true"
          className="
            app-glow-pulse
            absolute left-1/2 top-[48%]
            h-[250px] w-[250px]
            rounded-full
            bg-gradient-to-br
            from-primary/30
            via-[#efafd2]/25
            to-secondary/25
            blur-3xl
            sm:h-[340px]
            sm:w-[340px]
            lg:h-[390px]
            lg:w-[390px]
          "
        />

        {/* Outer orbit */}
        <div
          aria-hidden="true"
          className="
            app-orbit-clockwise
            absolute left-1/2 top-[48%]
            h-[310px] w-[310px]
            rounded-full
            border border-dashed
            border-primary/25
            sm:h-[410px]
            sm:w-[410px]
            lg:h-[470px]
            lg:w-[470px]
          "
        >
          <span
            className="
              absolute left-1/2 top-[-5px]
              h-3 w-3
              -translate-x-1/2
              rounded-full
              bg-primary
              shadow-[0_0_18px_rgba(192,31,83,0.65)]
            "
          />

          <span
            className="
              absolute
              bottom-[16%] right-[2%]
              h-2.5 w-2.5
              rounded-full
              bg-secondary
              shadow-[0_0_16px_rgba(4,102,175,0.6)]
            "
          />
        </div>

        {/* Middle orbit */}
        <div
          aria-hidden="true"
          className="
            app-orbit-counter
            absolute left-1/2 top-[48%]
            h-[260px] w-[260px]
            rounded-full
            border border-violet-300/45
            sm:h-[340px]
            sm:w-[340px]
            lg:h-[390px]
            lg:w-[390px]
          "
        >
          <span
            className="
              absolute left-[9%] top-[18%]
              h-2.5 w-2.5
              rounded-full
              bg-violet-500
              shadow-[0_0_15px_rgba(139,92,246,0.55)]
            "
          />
        </div>

        {/* Inner rings */}
        <div
          aria-hidden="true"
          className="
            absolute left-1/2 top-[48%]
            h-[205px] w-[205px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border border-white/90
            shadow-[inset_0_0_38px_rgba(255,255,255,0.85)]
            sm:h-[275px]
            sm:w-[275px]
            lg:h-[320px]
            lg:w-[320px]
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute left-1/2 top-[48%]
            h-[165px] w-[165px]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            border border-primary/15
            sm:h-[225px]
            sm:w-[225px]
            lg:h-[265px]
            lg:w-[265px]
          "
        />

        {/* Travel path */}
        <svg
          aria-hidden="true"
          viewBox="0 0 560 420"
          className="
            pointer-events-none
            absolute inset-0
            h-full w-full
            text-primary/35
          "
        >
          <path
            d="M35 300C110 350 144 271 206 289C289 313 281 174 370 199C435 217 454 122 524 79"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeDasharray="7 10"
            strokeLinecap="round"
          />

          <circle
            cx="35"
            cy="300"
            r="4"
            fill="currentColor"
          />

          <circle
            cx="524"
            cy="79"
            r="4"
            fill="currentColor"
          />
        </svg>

        {/* Floating icons */}
        {orbitIcons.map(
          ({
            icon: Icon,
            position,
            iconClass,
            delay,
          }) => (
            <span
              key={`${position}-${delay}`}
              aria-hidden="true"
              style={{
                animationDelay: delay,
              }}
              className={`
                app-icon-float
                absolute z-30
                hidden h-11 w-11
                items-center justify-center
                rounded-2xl
                border border-white
                bg-white/90
                shadow-[0_13px_30px_rgba(15,23,42,0.11)]
                backdrop-blur-lg
                sm:flex
                sm:h-12 sm:w-12
                ${position}
                ${iconClass}
              `}
            >
              <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
          ),
        )}

        {/* Mobile app image */}
        <img
          src={mobilApp}
          alt="Medcity Study Abroad mobile application"
          loading="lazy"
          decoding="async"
          className="
            app-phone-float
            absolute left-1/2 top-[48%]
            z-20
            h-auto
            w-[190px]
            max-w-full
            -translate-x-1/2
            -translate-y-1/2
            object-contain
            drop-shadow-[0_32px_34px_rgba(15,23,42,0.30)]
            sm:w-[250px]
            lg:w-[285px]
            xl:w-[300px]
          "
        />

        {/* Glowing platform */}
        <div
          aria-hidden="true"
          className="
            app-platform-pulse
            absolute
            bottom-[3%] left-1/2
            h-10 w-[225px]
            rounded-[50%]
            bg-gradient-to-r
            from-primary/25
            via-violet-400/35
            to-secondary/25
            blur-xl
            sm:w-[300px]
            lg:w-[340px]
          "
        />

     

        {/* Sparkles */}
        <span
          aria-hidden="true"
          className="
            app-sparkle-pulse
            absolute left-[17%] top-[28%]
            h-3 w-3 rotate-45
            bg-primary
          "
        />

        <span
          aria-hidden="true"
          className="
            app-sparkle-pulse
            absolute
            bottom-[21%] right-[14%]
            h-2.5 w-2.5
            rotate-45
            bg-secondary
            [animation-delay:0.7s]
          "
        />

        <span
          aria-hidden="true"
          className="
            app-sparkle-pulse
            absolute right-[19%] top-[21%]
            h-2 w-2 rotate-45
            bg-violet-500
            [animation-delay:1.2s]
          "
        />

        {/* Rating card */}
        <div
          className="
            app-icon-float
            absolute
        top-[7%] right-[7%]
            z-40
            hidden items-center gap-2.5
            rounded-2xl
            border border-white
            bg-white/90
            px-3.5 py-2.5
            shadow-[0_16px_36px_rgba(15,23,42,0.13)]
            backdrop-blur-xl
            sm:flex
            lg:right-[1%]
            [animation-delay:1s]
          "
        >
          <span
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-xl
              bg-logoYellow/20
              text-amber-500
            "
          >
            <Star className="h-5 w-5 fill-current" />
          </span>

          <div className="text-left">
            <p className="text-base font-black leading-none text-slate-900">
              4.8 Rating
            </p>

            <p className="mt-1 text-[10px] font-semibold text-slate-500">
              Trusted by students
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(MobileAppLeftSection);