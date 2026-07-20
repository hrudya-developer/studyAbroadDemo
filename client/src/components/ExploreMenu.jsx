import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowRight,
  BookOpenText,
  ChevronDown,
  Compass,
  HandHelping,
  Search,
  StickyNote,
} from "lucide-react";

import { Link } from "react-router-dom";

const exploreItems = [
  {
    title: "Popular Courses",
    description: "Find trending study programs",
    path: "/popularCoursePublic",
    icon: BookOpenText,
  },
  {
    title: "Add On Services",
    description: "Get complete student support",
    path: "/addOnServices",
    icon: HandHelping,
  },
  {
    title: "Community Posts",
    description: "Connect with fellow students",
    path: "/communityPosts",
    icon: StickyNote,
  },
];

const ExploreMenu = ({
  mobile = false,
  onNavigate,
}) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const closeExploreMenu = () => {
    setOpen(false);
    onNavigate?.();
  };

  useEffect(() => {
    if (mobile) return undefined;

    const handleOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutside
    );

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutside
      );

      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [mobile]);

  return (
    <li
      ref={menuRef}
      className={`
        relative
        min-w-0
        list-none
        ${mobile ? "w-full" : "flex items-center"}
      `}
    >
      {/* Explore main button */}
      <button
        type="button"
        onClick={() =>
          setOpen((previous) => !previous)
        }
        aria-expanded={open}
        aria-haspopup="menu"
        className={`
          group
          flex
          min-w-0
          items-center
          justify-between
          transition-all
          duration-300
          active:scale-[0.985]

          ${
            mobile
              ? `
                min-h-[62px]
                w-full
                gap-2
                overflow-hidden
                rounded-xl
                bg-white
                px-2.5
                py-2.5
                text-slate-800
                ring-1
                ring-inset
                ring-slate-100
                shadow-[0_5px_18px_rgba(15,23,42,0.045)]
                hover:ring-primary/15
                hover:shadow-[0_10px_24px_rgba(192,31,83,0.10)]
                min-[380px]:min-h-[66px]
                min-[380px]:rounded-2xl
                min-[380px]:px-3
              `
              : `
                h-10
                gap-2
                rounded-xl
                px-3
                text-white
                hover:bg-white/10
              `
          }
        `}
      >
        <span
          className="
            flex
            min-w-0
            flex-1
            items-center
            gap-2.5
            min-[380px]:gap-3
          "
        >
          {mobile && (
            <span
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-primary/10
                text-primary
                transition-all
                duration-300
                group-hover:-rotate-3
                group-hover:scale-105
                group-hover:bg-primary
                group-hover:text-white
                min-[380px]:h-11
                min-[380px]:w-11
                min-[380px]:rounded-2xl
              "
            >
              <Search
                size={18}
                strokeWidth={2.2}
              />
            </span>
          )}

          <span
            className={`
              min-w-0
              ${
                mobile
                  ? "flex-1 text-left"
                  : ""
              }
            `}
          >
            <span
              className={`
                block
                truncate

                ${
                  mobile
                    ? `
                      text-[13px]
                      font-bold
                      text-slate-800
                      transition-colors
                      group-hover:text-primary
                      min-[380px]:text-sm
                    `
                    : `
                      text-sm
                      font-semibold
                    `
                }
              `}
            >
              Explore
            </span>

            {mobile && (
              <span
                className="
                  mt-0.5
                  block
                  truncate
                  text-[10px]
                  font-normal
                  leading-4
                  text-slate-500
                  min-[380px]:text-[11px]
                "
              >
                More services and resources
              </span>
            )}
          </span>
        </span>

        <span
          className={`
            flex
            shrink-0
            items-center
            justify-center
            transition-all
            duration-300

            ${
              mobile
                ? `
                  h-7
                  w-7
                  rounded-full
                  bg-slate-50
                  text-slate-400
                  group-hover:bg-primary
                  group-hover:text-white
                  min-[380px]:h-8
                  min-[380px]:w-8
                `
                : ""
            }
          `}
        >
          <ChevronDown
            size={16}
            className={`
              transition-transform
              duration-300
              ${open ? "rotate-180" : ""}
            `}
          />
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          role="menu"
          className={`
            animate-[exploreDropdownIn_.2s_ease-out]

            ${
              mobile
                ? `
                  relative
                  mt-2
                  w-full
                  min-w-0
                  overflow-hidden
                  rounded-xl
                  bg-darkPrimary
                  p-2
                  shadow-[0_14px_32px_rgba(99,26,51,0.28)]
                  min-[380px]:rounded-2xl
                `
                : `
                  absolute
                  left-1/2
                  top-full
                  z-[100]
                  mt-3
                  w-[min(370px,calc(100vw-24px))]
                  -translate-x-1/2
                  overflow-hidden
                  rounded-3xl
                  bg-white
                  p-3
                  shadow-[0_24px_70px_rgba(15,23,42,0.20)]
                  ring-1
                  ring-black/5
                `
            }
          `}
        >
          {!mobile && (
            <div
              className="
                relative
                mb-2
                overflow-hidden
                rounded-2xl
                bg-gradient-to-r
                from-primary
                to-darkPrimary
                px-4
                py-3.5
                text-white
              "
            >
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-5
                  -top-8
                  h-24
                  w-24
                  rounded-full
                  border-[16px]
                  border-white/10
                "
              />

              <div className="relative flex items-center gap-3">
                <span
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/15
                  "
                >
                  <Compass size={19} />
                </span>

                <div>
                  <p className="text-sm font-extrabold">
                    Explore Medcity
                  </p>

                  <p className="mt-0.5 text-[11px] text-white/70">
                    Discover more useful resources
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            {exploreItems.map((item) => (
              <MenuCard
                key={item.path}
                {...item}
                mobile={mobile}
                onClick={closeExploreMenu}
              />
            ))}
          </div>
        </div>
      )}
    </li>
  );
};

const MenuCard = ({
  title,
  description,
  path,
  icon: Icon,
  mobile,
  onClick,
}) => {
  return (
    <Link
      to={path}
      role="menuitem"
      onClick={onClick}
      className={`
        group
        flex
        min-w-0
        items-center
        justify-between
        gap-2
        overflow-hidden
        rounded-xl
        px-2.5
        py-2.5
        transition-all
        duration-300
        active:scale-[0.985]
        min-[380px]:rounded-2xl
        min-[380px]:px-3

        ${
          mobile
            ? `
              min-h-[58px]
              bg-white/[0.09]
              text-white
              ring-1
              ring-inset
              ring-white/10
              hover:bg-white/[0.16]
              hover:ring-white/20
            `
            : `
              min-h-[64px]
              bg-white
              text-slate-800
              hover:-translate-y-0.5
              hover:bg-primary/[0.035]
              hover:shadow-[0_8px_22px_rgba(192,31,83,0.08)]
            `
        }
      `}
    >
      <div
        className="
          flex
          min-w-0
          flex-1
          items-center
          gap-2.5
          min-[380px]:gap-3
        "
      >
        <span
          className={`
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-xl
            transition-all
            duration-300
            group-hover:-rotate-3
            group-hover:scale-105
            min-[380px]:h-10
            min-[380px]:w-10

            ${
              mobile
                ? `
                  bg-white/10
                  text-white
                  group-hover:bg-white/20
                `
                : `
                  bg-primary/10
                  text-primary
                  group-hover:bg-primary
                  group-hover:text-white
                `
            }
          `}
        >
          <Icon
            size={17}
            strokeWidth={2.2}
          />
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={`
              block
              truncate
              text-[12px]
              font-bold
              min-[380px]:text-sm

              ${
                mobile
                  ? "text-white"
                  : "text-slate-800 group-hover:text-primary"
              }
            `}
          >
            {title}
          </span>

          <span
            className={`
              mt-0.5
              block
              truncate
              text-[10px]
              leading-4
              min-[380px]:text-[11px]

              ${
                mobile
                  ? "text-white/60"
                  : "text-slate-500"
              }
            `}
          >
            {description}
          </span>
        </span>
      </div>

      <span
        className={`
          flex
          h-7
          w-7
          shrink-0
          items-center
          justify-center
          rounded-full
          transition-all
          min-[380px]:h-8
          min-[380px]:w-8

          ${
            mobile
              ? `
                bg-white/10
                text-white/70
                group-hover:bg-white
                group-hover:text-darkPrimary
              `
              : `
                bg-slate-50
                text-slate-400
                group-hover:bg-primary
                group-hover:text-white
              `
          }
        `}
      >
        <ArrowRight
          size={14}
          className="
            transition-transform
            group-hover:translate-x-0.5
          "
        />
      </span>
    </Link>
  );
};

export default ExploreMenu;