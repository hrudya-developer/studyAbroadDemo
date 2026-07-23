import {
  ChevronDown,
  ChevronUp,
  MapPin,
  Navigation,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Link } from "react-router-dom";

const branches = [
  "Kannur",
  "Kochi",
  "Trivandrum",
  "Kollam",
  "Thiruvalla",
  "Thiruvalla - KSRTC",
  "Mavelikkara",
  "Kottayam",
  "Kottayam - Kanjikuzhi",
  "Pala",
  "Pala - 2",
  "Thodupuzha",
  "Kattappana",
  "Kothamangalam",
  "Muvattupuzha",
  "Thrissur",
  "Calicut",
  "Mangalore",
];

const INITIAL_ROWS = 2;
const ROWS_PER_CLICK = 1;

const getColumnsByWidth = (width) => {
  if (width >= 1280) return 4;
  if (width >= 1024) return 4;
  if (width >= 768) return 3;
  if (width >= 640) return 2;
  return 1;
};

const OurBranches = () => {
  const [columns, setColumns] = useState(1);
  const [visibleRows, setVisibleRows] =
    useState(INITIAL_ROWS);

  const updateColumns = useCallback(() => {
    setColumns(getColumnsByWidth(window.innerWidth));
  }, []);

  useEffect(() => {
    updateColumns();

    window.addEventListener("resize", updateColumns);

    return () => {
      window.removeEventListener(
        "resize",
        updateColumns
      );
    };
  }, [updateColumns]);

  useEffect(() => {
    setVisibleRows(INITIAL_ROWS);
  }, [columns]);

  const initialVisibleCount =
    INITIAL_ROWS * columns;

  const visibleCount =
    visibleRows * columns;

  const visibleBranches = useMemo(
    () => branches.slice(0, visibleCount),
    [visibleCount]
  );

  const hasMore =
    visibleCount < branches.length;

  const hasExpanded =
    visibleCount > initialVisibleCount;

  const handleViewMore = () => {
    setVisibleRows((currentRows) => {
      const nextRows =
        currentRows + ROWS_PER_CLICK;

      return Math.min(
        nextRows,
        Math.ceil(branches.length / columns)
      );
    });
  };

  const handleHideLocations = () => {
    setVisibleRows((currentRows) =>
      Math.max(
        INITIAL_ROWS,
        currentRows - ROWS_PER_CLICK
      )
    );
  };

  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        bg-white pb-10"
    >
      {/* Background decorations */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            -left-28
            top-8
            h-80
            w-80
            rounded-full
            bg-primary/5
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-28
            bottom-4
            h-80
            w-80
            rounded-full
            bg-secondary/5
            blur-3xl
          "
        />

        <div
          className="
            absolute
            inset-0
            opacity-[0.025]
            [background-image:radial-gradient(#631A33_1px,transparent_1px)]
            [background-size:23px_23px]
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-48
            w-[75%]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-primary/[0.025]
            blur-3xl
          "
        />
      </div>

      <div
        className="
          relative
          mx-auto
          max-w-7xl
          overflow-hidden
          rounded-[30px]
          border
          border-slate-200/80
          bg-white/95
          px-5
          py-8
          shadow-[0_24px_65px_rgba(15,23,42,0.09)]
          backdrop-blur-sm
          sm:px-8
          sm:py-10
          lg:px-12
          lg:py-12
        "
      >
        {/* Decorative top line */}
        <div
          aria-hidden="true"
          className="
            absolute
            inset-x-10
            top-0
            h-px
            bg-gradient-to-r
            from-transparent
            via-primary/35
            to-transparent
          "
        />

        {/* Heading */}
    {/* Heading */}
<div
  className="
    relative
    mb-12
    text-center
  "
>
  {/* Decorative circles */}
  <div
    aria-hidden
    className="
      absolute
      left-1/2
      top-0
      -z-10
      h-64
      w-64
      -translate-x-1/2
      rounded-full
      bg-primary/5
      blur-3xl
    "
  />

  {/* Small badge */}
  <div
    className="
      mx-auto
      inline-flex
      items-center
      gap-2
      rounded-full
      border
      border-primary/15
      bg-white
      px-3
      py-1.5
      shadow-lg
    "
  >
    <span
      className="
        flex
        h-9
        w-9
        items-center
        justify-center
        rounded-full
        bg-primary
        text-white
      "
    >
      <MapPin className="h-4 w-4" />
    </span>

    <span
      className="
        text-xs
        font-semibold
        uppercase
        tracking-[0.14em]
        text-primary
      "
    >
      18 Branches Across South India
    </span>
  </div>

  <h2
    className="
      mt-7
      font-nunito
      text-3xl
      font-extrabold
      leading-tight
      text-darkPrimary
      sm:text-3xl
      md:text-4xl
      lg:text-5xl
    "
  >
    Find Your Nearest
    <br />

    <span
      className="
        bg-gradient-to-r
        from-primary
        to-secondary
        bg-clip-text
        text-transparent
      "
    >
      Medcity Branch
    </span>
  </h2>

  <p
    className="
      mx-auto
      mt-6
      max-w-3xl
      text-lg
      leading-8
      text-slate-600
    "
  >
    Our branches are strategically located to provide
    expert overseas education counselling, university
    admissions, visa assistance, and personalized support
    closer to you.
  </p>

  {/* Decorative divider */}
  <div
    className="
      mt-8
      flex
      items-center
      justify-center
      gap-4
    "
  >
    <span className="h-[2px] w-20 rounded-full bg-primary/20" />

    <span
      className="
        flex
        h-12
        w-12
        items-center
        justify-center
        rounded-full
        bg-gradient-to-br
        from-primary
        to-darkPrimary
        text-white
        shadow-[0_10px_25px_rgba(192,31,83,0.25)]
      "
    >
      <Navigation className="h-5 w-5" />
    </span>

    <span className="h-[2px] w-20 rounded-full bg-primary/20" />
  </div>
</div> 

        {/* Branch cards */}
        <div
          className="
            grid
            grid-cols-1
            gap-4
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
          "
        >
          {visibleBranches.map((branch, index) => (
            <article
              key={branch}
              className="
                group
                relative
                isolate
                flex
                min-h-[108px]
                items-center
                gap-4
                overflow-hidden
                rounded-[22px]
                border
                border-slate-200/80
                bg-white
                px-4
                py-4
                shadow-[0_10px_28px_rgba(15,23,42,0.07)]
                transition-all
                duration-300
                ease-out
                hover:-translate-y-1.5
                hover:border-primary/30
                hover:shadow-[0_18px_40px_rgba(192,31,83,0.15)]
                sm:px-5
              "
            >
              {/* Left brand line */}
              <span
                aria-hidden="true"
                className="
                  absolute
                  inset-y-0
                  left-0
                  w-1
                  origin-bottom
                  scale-y-0
                  bg-gradient-to-b
                  from-primary
                  to-darkPrimary
                  transition-transform
                  duration-300
                  group-hover:scale-y-100
                "
              />

              {/* Top-right accent */}
              <span
                aria-hidden="true"
                className="
                  absolute
                  -right-10
                  -top-10
                  h-24
                  w-24
                  rounded-full
                  bg-primary/5
                  transition-transform
                  duration-500
                  group-hover:scale-150
                "
              />

              {/* Dot pattern */}
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  bottom-2
                  right-3
                  h-9
                  w-9
                  opacity-20
                  [background-image:radial-gradient(#c01f53_1.4px,transparent_1.4px)]
                  [background-size:6px_6px]
                  transition-opacity
                  duration-300
                  group-hover:opacity-40
                "
              />

              {/* Icon */}
              <span
                className="
                  relative
                  z-10
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-primary/10
                  to-primary/5
                  text-primary
                  ring-1
                  ring-primary/10
                  shadow-[0_8px_20px_rgba(192,31,83,0.08)]
                  transition-all
                  duration-300
                  group-hover:-rotate-3
                  group-hover:scale-105
                  group-hover:bg-primary
                  group-hover:text-white
                  group-hover:ring-primary
                "
              >
                <MapPin
                  className="
                    h-7
                    w-7
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                  "
                  strokeWidth={2.3}
                />
              </span>

              {/* Content */}
              <div
                className="
                  relative
                  z-10
                  min-w-0
                  flex-1
                "
              >
                <span
                  className="
                    block
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-slate-400
                  "
                >
                  Medcity Branch
                </span>

                <h3
                  className="
                    mt-1
                    line-clamp-2
                    text-base
                    font-bold
                    leading-5
                    text-slate-900
                    transition-colors
                    duration-300
                    group-hover:text-primary
                    sm:text-base md:text-base lg:text-base xl:text-lg
                  "
                >
                  {branch}
                </h3>
              </div>

              {/* Number */}
              <span
                aria-hidden="true"
                className="
                  relative
                  z-10
                  self-start
                  text-2xl
                  font-black
                  leading-none
                  text-slate-100
                  transition-colors
                  duration-300
                  group-hover:text-primary/15
                "
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Hover glow */}
              <span
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -bottom-16
                  -left-16
                  h-32
                  w-32
                  rounded-full
                  bg-primary/5
                  transition-transform
                  duration-500
                  group-hover:scale-[2.2]
                "
              />
            </article>
          ))}
        </div>

        {/* Controls */}
        {(hasMore || hasExpanded) && (
          <div
            className="
              mt-9
              flex
              flex-col
              items-center
              justify-center
              gap-3
              sm:flex-row
            "
          >
            {hasMore && (
              <button
                type="button"
                onClick={handleViewMore}
                className="
                  group
                  inline-flex
                  min-h-[50px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-primary
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-[0_12px_28px_rgba(192,31,83,0.24)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:cursor-pointer
                  hover:shadow-[0_17px_36px_rgba(192,31,83,0.34)]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-primary
                  focus-visible:ring-offset-2
                  sm:w-auto
                "
              >
                View More Locations

                <ChevronDown
                  className="
                    h-5
                    w-5
                    transition-transform
                    duration-300
                    group-hover:translate-y-1
                  "
                />
              </button>
            )}

            {hasExpanded && (
              <button
                type="button"
                onClick={handleHideLocations}
                className="
                  group
                  inline-flex
                  min-h-[50px]
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  border
                  border-primary/35
                  bg-white
                  px-7
                  py-3
                  text-sm
                  font-bold
                  text-primary
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:cursor-pointer
                  hover:border-primary
                  hover:bg-primary/5
                  hover:shadow-md
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-primary
                  focus-visible:ring-offset-2
                  sm:w-auto
                "
              >
                Hide Locations

                <ChevronUp
                  className="
                    h-5
                    w-5
                    transition-transform
                    duration-300
                    group-hover:-translate-y-1
                  "
                />
              </button>
            )}
          </div>
        )}

        {/* Footer callout */}
        <div
          className="
            relative
            mt-9
            overflow-hidden
            rounded-2xl
            border
            border-primary/10
            bg-gradient-to-r
            from-primary/5
            via-white
            to-secondary/5
            px-5
            py-5
            sm:flex
            sm:items-center
            sm:justify-between
            sm:gap-5
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-12
              -top-12
              h-28
              w-28
              rounded-full
              bg-secondary/10
              blur-2xl
            "
          />

          <div className="relative">
            <p
              className="
                text-base
                font-extrabold
                text-darkPrimary
              "
            >
              Need complete branch information?
            </p>

            <p
              className="
                mt-1
                text-sm
                leading-6
                text-slate-600
              "
            >
              View branch addresses, contact details and
              available services.
            </p>
          </div>

          <Link to="/branches"
            target="_blank"
            rel="noopener noreferrer"
            className="
              relative
              mt-4
              inline-flex
              min-h-[48px]
              w-full
              shrink-0
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-secondary
              px-5
              py-2.5
              text-sm
              font-semibold
              text-white
              shadow-[0_10px_24px_rgba(4,102,175,0.22)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:bg-[#045894]
              hover:shadow-[0_14px_30px_rgba(4,102,175,0.3)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-secondary
              focus-visible:ring-offset-2
              sm:mt-0
              sm:w-auto
            "
          >
            View Branch Details

            <Navigation className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurBranches;