import { useEffect, useRef, useState } from "react";
import {
  Globe2,
  GraduationCap,
  LoaderCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const WebsiteSwitch = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const switchTimerRef = useRef(null);
  const pressTimerRef = useRef(null);

  const [activeTab, setActiveTab] = useState("study");
  const [isSwitching, setIsSwitching] = useState(false);
  const [pressedTab, setPressedTab] = useState(null);

  useEffect(() => {
    if (location.pathname === "/") {
      setActiveTab("study");
    }
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (switchTimerRef.current) {
        clearTimeout(switchTimerRef.current);
      }

      if (pressTimerRef.current) {
        clearTimeout(pressTimerRef.current);
      }
    };
  }, []);

  const clearTimers = () => {
    if (switchTimerRef.current) {
      clearTimeout(switchTimerRef.current);
      switchTimerRef.current = null;
    }

    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  const animatePress = (tab) => {
    setPressedTab(tab);

    pressTimerRef.current = window.setTimeout(() => {
      setPressedTab(null);
    }, 180);
  };

  const handleStudyAbroad = () => {
    if (isSwitching) return;

    clearTimers();
    animatePress("study");

    setActiveTab("study");
    setIsSwitching(true);

    switchTimerRef.current = window.setTimeout(() => {
      navigate("/");
      setIsSwitching(false);
    }, 400);
  };

  const handleAcademy = () => {
    if (isSwitching) return;

    clearTimers();
    animatePress("academy");

    setActiveTab("academy");
    setIsSwitching(true);

    window.open(
      "https://medcityacademy.com/",
      "_blank",
      "noopener,noreferrer"
    );

    switchTimerRef.current = window.setTimeout(() => {
      setActiveTab("study");
      setIsSwitching(false);
    }, 850);
  };

  const isStudyActive = activeTab === "study";
  const isAcademyActive = activeTab === "academy";

  return (
    <div className="group/switch relative inline-flex">
      {/* Outer glow */}
      <div
        className={`
          pointer-events-none
          absolute -inset-[4px]
          rounded-full
          opacity-45
          blur-lg
          transition-all
          duration-500
          group-hover/switch:scale-[1.025]
          group-hover/switch:opacity-80
          ${
            isAcademyActive
              ? `
                bg-gradient-to-r
                from-[#0B5294]/25
                via-[#0072B8]/35
                to-[#1F87C9]/25
              `
              : `
                bg-gradient-to-r
                from-darkPrimary/30
                via-primary/25
                to-darkPrimary/30
              `
          }
        `}
      />

      {/* Tabs container */}
      <div
        className="
          relative
          w-[290px]
          overflow-hidden
          rounded-full
          border border-white/80
          bg-gradient-to-r
          from-[#f8edf1]
          via-white
          to-[#eaf6fd]
          p-1.5
          shadow-[0_8px_24px_rgba(15,23,42,0.14)]
          backdrop-blur-md
          transition-all
          duration-300
          group-hover/switch:-translate-y-0.5
          group-hover/switch:shadow-[0_12px_30px_rgba(15,23,42,0.18)]
        "
      >
        {/* Decorative gradient overlay */}
        <span
          className="
            pointer-events-none
            absolute inset-0
            bg-gradient-to-br
            from-white/50
            via-transparent
            to-white/20
          "
        />

        {/* Sliding active pill */}
        <span
          className={`
            pointer-events-none
            absolute bottom-1.5 top-1.5
            w-[calc(50%-6px)]
            overflow-hidden
            rounded-full
            transition-[left,background,box-shadow,transform]
            duration-500
            ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${
              isStudyActive
                ? `
                  left-1.5
                  bg-darkPrimary
                  shadow-[0_7px_18px_rgba(99,26,51,0.38)]
                `
                : `
                  left-[calc(50%+3px)]
                  bg-gradient-to-r
                  from-[#0B5294]
                  via-[#0072B8]
                  to-[#1F87C9]
                  shadow-[0_7px_18px_rgba(0,114,184,0.38)]
                `
            }
            ${isSwitching ? "scale-[1.02]" : "scale-100"}
          `}
        >
          {/* Glass highlight */}
          <span
            className="
              absolute inset-0
              bg-gradient-to-b
              from-white/20
              via-transparent
              to-black/10
            "
          />

          {/* Moving shine */}
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span
              className="
                website-switch-shine
                absolute inset-y-0
                -left-1/2
                w-[42%]
                skew-x-[-22deg]
                bg-gradient-to-r
                from-transparent
                via-white/35
                to-transparent
              "
            />
          </span>
        </span>

        <div className="relative z-10 grid grid-cols-2 gap-1.5">
          {/* Study Abroad */}
          <button
            type="button"
            onClick={handleStudyAbroad}
            disabled={isSwitching}
            aria-pressed={isStudyActive}
            className={`
              group/study
              relative
              flex h-10
              min-w-0
              items-center
              justify-center
              gap-2
              overflow-hidden
              rounded-full
              px-4
              text-sm
              font-bold
              transition-all
              duration-200
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-darkPrimary/40 hover:cursor-pointer
              ${
                isStudyActive
                  ? "text-white"
                  : "cursor-pointer text-darkPrimary hover:text-darkPrimary"
              }
              ${
                pressedTab === "study"
                  ? "scale-95"
                  : "scale-100 hover:scale-[1.015]"
              }
              disabled:cursor-default
            `}
          >
            {!isStudyActive && (
              <span
                className="
                  pointer-events-none
                  absolute inset-1
                  scale-90
                  rounded-full
                  bg-gradient-to-r
                  from-darkPrimary/0
                  to-primary/0
                  opacity-0
                  transition-all
                  duration-300
                  group-hover/study:scale-100
                  group-hover/study:from-darkPrimary/[0.08]
                  group-hover/study:to-primary/[0.05]
                  group-hover/study:opacity-100
                "
              />
            )}

            <span
              className={`
                relative z-10
                flex h-7 w-7
                shrink-0
                items-center
                justify-center
                rounded-full
                transition-all
                duration-300
                ${
                  isStudyActive
                    ? `
                      bg-white/15
                      text-white
                      shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]
                    `
                    : `
                      bg-darkPrimary/10
                      text-darkPrimary
                      group-hover/study:rotate-12
                      group-hover/study:scale-105
                      group-hover/study:bg-darkPrimary/15
                    `
                }
              `}
            >
              {isSwitching && isStudyActive ? (
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <Globe2
                  size={17}
                  strokeWidth={2.2}
                />
              )}
            </span>

            <span className="relative z-10 whitespace-nowrap">
              Study Abroad
            </span>
          </button>

          {/* Academy */}
          <button
            type="button"
            onClick={handleAcademy}
            disabled={isSwitching}
            aria-pressed={isAcademyActive}
            className={`
              group/academy
              relative
              flex h-10
              min-w-0
              items-center
              justify-center
              gap-2
              overflow-hidden
              rounded-full
              px-4
              text-sm
              font-bold
              transition-all
              duration-200
              focus:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#0072B8]/40
              ${
                isAcademyActive
                  ? "text-white"
                  : "cursor-pointer text-[#0B5294] hover:text-[#0B5294]"
              }
              ${
                pressedTab === "academy"
                  ? "scale-95"
                  : "scale-100 hover:scale-[1.015]"
              }
              disabled:cursor-default
            `}
          >
            {!isAcademyActive && (
              <span
                className="
                  pointer-events-none
                  absolute inset-1
                  scale-90
                  rounded-full
                  bg-gradient-to-r
                  from-[#0B5294]/0
                  via-[#0072B8]/0
                  to-[#1F87C9]/0
                  opacity-0
                  transition-all
                  duration-300
                  group-hover/academy:scale-100
                 
                  group-hover/academy:opacity-100
                "
              />
            )}

            <span
              className={`
                relative z-10
                flex h-7 w-7
                shrink-0
                items-center
                justify-center
                rounded-full
                border
                transition-all
                duration-300
                ${
                  isAcademyActive
                    ? `
                      border-[#FFE422]
                      bg-[#FFE422]
                      text-[#0B5294]
                      shadow-[0_3px_10px_rgba(255,228,34,0.4)]
                    `
                    : `
                      border-[#0072B8]/15
                      bg-[#0b5294]
                      text-[#FFF]
                      group-hover/academy:-rotate-12
                      group-hover/academy:scale-105
                      group-hover/academy:border-[#FFE422]
                      group-hover/academy:bg-[#FFE422]
                      group-hover/academy:text-[#0B5294]
                    `
                }
              `}
            >
              {isSwitching && isAcademyActive ? (
                <LoaderCircle
                  size={17}
                  className="animate-spin"
                />
              ) : (
                <GraduationCap
                  size={17}
                  strokeWidth={2.2}
                />
              )}
            </span>

            <span className="relative z-10 whitespace-nowrap">
              Academy
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WebsiteSwitch;