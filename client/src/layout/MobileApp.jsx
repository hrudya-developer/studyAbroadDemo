import React, {
  memo,
  useCallback,
} from "react";

import MobileAppLeftSection from "./MobileAppLeftSection";
import MobileAppRightSection from "./MobileAppRightSection";

const COUNSELLING_SECTION_ID = "gfc_wrapper";

const MobileApp = () => {
  const scrollToCounselling = useCallback((event) => {
    event.preventDefault();

    const hash = `#${COUNSELLING_SECTION_ID}`;

    if (window.location.hash !== hash) {
      window.history.pushState(
        null,
        "",
        hash,
      );
    }

    let attempt = 0;
    const maximumAttempts = 40;

    const scrollWhenAvailable = () => {
      const target = document.getElementById(
        COUNSELLING_SECTION_ID,
      );

      if (target) {
        const fixedElements = [
          ...document.querySelectorAll(
            "header, nav",
          ),
        ].filter((element) => {
          const position =
            window.getComputedStyle(element).position;

          return (
            position === "fixed" ||
            position === "sticky"
          );
        });

        const headerOffset = fixedElements.reduce(
          (total, element) =>
            total +
            element.getBoundingClientRect().height,
          0,
        );

        const targetTop =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerOffset -
          20;

        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: "smooth",
        });

        window.setTimeout(() => {
          target.focus?.({
            preventScroll: true,
          });
        }, 700);

        return;
      }

      attempt += 1;

      if (attempt < maximumAttempts) {
        window.setTimeout(
          scrollWhenAvailable,
          100,
        );
      }
    };

    scrollWhenAvailable();
  }, []);

  return (
    <section
      className="
        relative isolate
        overflow-hidden
        bg-gradient-to-br
        from-[#fff9fc]
        via-white
        to-[#f4f8ff]
        px-4 py-9
        sm:px-6 sm:py-11
        lg:px-8 lg:py-12
      "
      data-aos="fade-up"
    >
      <style>
        {`
          @keyframes appPhoneFloat {
            0%, 100% {
              transform: translate3d(0, 0, 0) rotate(-1.5deg);
            }

            50% {
              transform: translate3d(0, -9px, 0) rotate(0deg);
            }
          }

          @keyframes appOrbitClockwise {
            from {
              transform: translate(-50%, -50%) rotate(0deg);
            }

            to {
              transform: translate(-50%, -50%) rotate(360deg);
            }
          }

          @keyframes appOrbitCounterClockwise {
            from {
              transform: translate(-50%, -50%) rotate(360deg);
            }

            to {
              transform: translate(-50%, -50%) rotate(0deg);
            }
          }

          @keyframes appIconFloat {
            0%, 100% {
              transform: translateY(0) rotate(0deg);
            }

            50% {
              transform: translateY(-8px) rotate(3deg);
            }
          }

          @keyframes appGlowPulse {
            0%, 100% {
              opacity: 0.42;
              transform: translate(-50%, -50%) scale(0.96);
            }

            50% {
              opacity: 0.72;
              transform: translate(-50%, -50%) scale(1.04);
            }
          }

          @keyframes appPlatformPulse {
            0%, 100% {
              opacity: 0.52;
              transform: translateX(-50%) scaleX(0.94);
            }

            50% {
              opacity: 0.8;
              transform: translateX(-50%) scaleX(1.03);
            }
          }

          @keyframes appSparklePulse {
            0%, 100% {
              opacity: 0.25;
              transform: scale(0.7) rotate(0deg);
            }

            50% {
              opacity: 1;
              transform: scale(1.2) rotate(45deg);
            }
          }

          .app-phone-float {
            animation: appPhoneFloat 5s ease-in-out infinite;
            will-change: transform;
          }

          .app-orbit-clockwise {
            animation: appOrbitClockwise 24s linear infinite;
          }

          .app-orbit-counter {
            animation: appOrbitCounterClockwise 18s linear infinite;
          }

          .app-icon-float {
            animation: appIconFloat 4.2s ease-in-out infinite;
          }

          .app-glow-pulse {
            animation: appGlowPulse 4s ease-in-out infinite;
          }

          .app-platform-pulse {
            animation: appPlatformPulse 4.5s ease-in-out infinite;
          }

          .app-sparkle-pulse {
            animation: appSparklePulse 2.8s ease-in-out infinite;
          }

          @media (prefers-reduced-motion: reduce) {
            .app-phone-float,
            .app-orbit-clockwise,
            .app-orbit-counter,
            .app-icon-float,
            .app-glow-pulse,
            .app-platform-pulse,
            .app-sparkle-pulse {
              animation: none;
            }
          }
        `}
      </style>

      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 -z-10
          overflow-hidden
        "
      >
        <div
          className="
            absolute -left-32 -top-32
            h-[400px] w-[400px]
            rounded-full
            bg-primary/[0.08]
            blur-3xl
          "
        />

        <div
          className="
            absolute -bottom-40 right-0
            h-[430px] w-[430px]
            rounded-full
            bg-secondary/[0.08]
            blur-3xl
          "
        />

        <div
          className="
            absolute inset-0
            opacity-[0.035]
            [background-image:radial-gradient(#c01f53_1px,transparent_1px)]
            [background-size:24px_24px]
          "
        />

        <div
          className="
            absolute -right-24 top-0
            h-60 w-60
            rounded-bl-[170px]
            bg-gradient-to-bl
            from-primary/10
            to-transparent
          "
        />

        <div
          className="
            absolute bottom-0 right-0
            h-48 w-96
            opacity-25
            [background-image:repeating-radial-gradient(ellipse_at_bottom_right,transparent_0,transparent_9px,rgba(4,102,175,0.22)_10px,transparent_11px)]
          "
        />
      </div>

      <div
        className="
          relative
          mx-auto
          max-w-[1380px]
        "
      >
        <div
          className="
            grid grid-cols-1
            items-center gap-8
            lg:grid-cols-[0.98fr_1.02fr]
            lg:gap-10
            xl:gap-14
          "
        >
          <MobileAppLeftSection />

          <MobileAppRightSection
            counsellingSectionId={
              COUNSELLING_SECTION_ID
            }
            onCounsellingClick={
              scrollToCounselling
            }
          />
        </div>
      </div>
    </section>
  );
};

export default memo(MobileApp);