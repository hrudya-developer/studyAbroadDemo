import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  FileText,
  Globe2,
  Headphones,
  ShieldCheck,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  useDispatch,
  useSelector,
} from "react-redux";
import { Link } from "react-router-dom";

import { fetchCountries } from "../redux/slices/countrySlice";

const INITIAL_VISIBLE_COUNT = 8;
const LOAD_MORE_COUNT = 4;

const features = [
  {
    icon: Headphones,
    title: "Expert Guidance",
    text: "Personalized support every step of the way.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted by Thousands",
    text: "12+ years of experience and global presence.",
  },
  {
    icon: FileText,
    title: "Visa Assistance",
    text: "End-to-end help for a hassle-free process.",
  },
  {
    icon: Globe2,
    title: "Global Opportunities",
    text: "Unlock your future with world-class education.",
  },
];

const getDestinationImage = (item, imagePath) => {
  const image =
    item?.image ||
    item?.country_image ||
    item?.countryImage ||
    item?.destination_image ||
    item?.destinationImage ||
    item?.banner ||
    item?.banner_image ||
    item?.thumb ||
    item?.thumbnail ||
    item?.flag;

  if (!image) return "";

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  const cleanBase = imagePath?.replace(/\/+$/, "") || "";
  const cleanImage = image.replace(/^\/+/, "");

  return cleanBase
    ? `${cleanBase}/${cleanImage}`
    : `/${cleanImage}`;
};

const DestinationCard = ({
  item,
  index,
  imagePath,
}) => {
  const destinationImage = getDestinationImage(
    item,
    imagePath
  );

  return (
    <Link
      to={`/destination/${item.id}`}
      state={{ country: item }}
      aria-label={`Explore study opportunities in ${item.country}`}
      className="
        group
        relative
        isolate
        min-h-[270px]
        overflow-hidden
        rounded-[26px]
        border
        border-slate-200/70
        bg-slate-900
        shadow-[0_14px_36px_rgba(15,23,42,0.13)]
        transition-all
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:-translate-y-2
        hover:border-primary/30
        hover:shadow-[0_26px_60px_rgba(99,26,51,0.24)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
        focus-visible:ring-offset-2
        sm:min-h-[300px]
      "
    >
      {destinationImage ? (
        <img
          src={destinationImage}
          alt={`${item.country} study destination`}
          loading={index < 4 ? "eager" : "lazy"}
          width={450}
          height={520}
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-110
          "
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
      ) : (
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-primary
            via-darkPrimary
            to-secondary
          "
        />
      )}

      {/* Main image overlay */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-gradient-to-t
          from-black/95
          via-black/40
          to-black/5
        "
      />

      {/* Brand overlay */}
      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          bg-gradient-to-br
          from-primary/20
          via-transparent
          to-secondary/20
          opacity-60
          transition-opacity
          duration-500
          group-hover:opacity-100
        "
      />

      {/* Top glow */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-12
          -top-12
          h-36
          w-36
          rounded-full
          bg-white/10
          blur-3xl
          transition-transform
          duration-700
          group-hover:scale-150
        "
      />

      {/* Sliding shine */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-1/2
          top-0
          h-full
          w-1/3
          -skew-x-12
          bg-gradient-to-r
          from-transparent
          via-white/15
          to-transparent
          transition-all
          duration-700
          group-hover:left-[125%]
        "
      />

      {/* Top destination badge */}
      <div
        className="
          absolute
          left-4
          top-4
          z-10
          inline-flex
          items-center
          gap-2
          rounded-full
          border
          border-white/20
          bg-black/25
          px-3
          py-1.5
          text-[10px]
          font-bold
          uppercase
          tracking-[0.14em]
          text-white
          shadow-sm
          backdrop-blur-md
          sm:text-[11px]
        "
      >
        <Globe2
          className="h-3.5 w-3.5"
          strokeWidth={2.4}
        />

        Study Destination
      </div>

      {/* Card index */}
      <span
        aria-hidden="true"
        className="
          absolute
          right-4
          top-4
          z-10
          text-4xl
          font-black
          leading-none
          text-white/20
          transition-all
          duration-500
          group-hover:-translate-y-0.5
          group-hover:text-white/35
        "
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Bottom content */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-10
          p-5
          sm:p-6
        "
      >
        <div
          className="
            translate-y-2
            transition-transform
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            group-hover:translate-y-0
          "
        >
          <p
            className="
              text-[11px]
              font-semibold
              uppercase
              tracking-[0.17em]
              text-white/65
            "
          >
            Explore opportunities in
          </p>

          <h3
            className="
              mt-1
              truncate
              font-nunito
              text-2xl
              font-extrabold
              text-white
              drop-shadow-sm
              sm:text-[28px]
            "
          >
            {item.country}
          </h3>

          <div
            className="
              mt-3
              h-1
              w-12
              rounded-full
              bg-logoYellow
              transition-all
              duration-500
              group-hover:w-20
            "
          />

          <div
            className="
              mt-5
              flex
              items-center
              justify-between
              gap-3
            "
          >
            <span
              className="
                max-w-[150px]
                text-sm
                font-semibold
                leading-5
                text-white/85
                sm:max-w-none
              "
            >
              View universities and courses
            </span>

            <span
              className="
                flex
                h-11
                w-11
                shrink-0
                items-center
                justify-center
                rounded-full
                bg-white
                text-primary
                shadow-[0_8px_22px_rgba(0,0,0,0.22)]
                transition-all
                duration-300
                group-hover:translate-x-1
                group-hover:bg-primary
                group-hover:text-white
              "
            >
              <ChevronRight
                className="h-5 w-5"
                strokeWidth={2.5}
              />
            </span>
          </div>
        </div>
      </div>

      {/* Inner border */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          rounded-[26px]
          ring-1
          ring-inset
          ring-white/10
          transition-all
          duration-500
          group-hover:ring-2
          group-hover:ring-primary/40
        "
      />
    </Link>
  );
};

export default function StudyDestinations() {
  const dispatch = useDispatch();

  const {
    countries = [],
    imagePath = "",
    loading,
  } = useSelector((state) => state.countryData);

  const { uid } = useSelector((state) => state.auth);

  const [visibleCount, setVisibleCount] = useState(
    INITIAL_VISIBLE_COUNT
  );

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries(uid || 0));
    }
  }, [
    countries.length,
    dispatch,
    uid,
  ]);

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [countries.length]);

  const visibleCountries = useMemo(
    () => countries.slice(0, visibleCount),
    [countries, visibleCount]
  );

  const hasMore =
    visibleCount < countries.length;

  const hasExpanded =
    visibleCount > INITIAL_VISIBLE_COUNT;

  const handleViewMore = () => {
    setVisibleCount((currentCount) =>
      Math.min(
        currentCount + LOAD_MORE_COUNT,
        countries.length
      )
    );
  };

  const handleHideDestinations = () => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);

    requestAnimationFrame(() => {
      document
        .getElementById("study-destinations-grid")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  };

  if (loading && countries.length === 0) {
    return (
      <section
        className="
          flex
          min-h-[480px]
          items-center
          justify-center
          bg-white
          px-4
        "
      >
        <div className="text-center">
          <div
            className="
              relative
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
            "
          >
            <span
              className="
                absolute
                inset-0
                animate-ping
                rounded-full
                bg-primary/10
              "
            />

            <span
              className="
                h-12
                w-12
                animate-spin
                rounded-full
                border-4
                border-primary/15
                border-t-primary
              "
            />
          </div>

          <p
            className="
              mt-5
              text-base
              font-bold
              text-darkPrimary
            "
          >
            Loading destinations...
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Preparing global opportunities for you.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className="
        relative
        isolate
        overflow-hidden
        bg-white
        px-4
        py-14
        sm:px-6
        sm:py-16
        lg:px-8
        lg:py-20
      "
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
            -left-24
            top-12
            h-72
            w-72
            rounded-full
            bg-primary/5
            blur-3xl
          "
        />

        <div
          className="
            absolute
            -right-28
            top-28
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
            [background-size:24px_24px]
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-[38%]
            h-40
            w-[70%]
            -translate-x-1/2
            rounded-full
            bg-primary/[0.03]
            blur-3xl
          "
        />
      </div>

      <div
        className="relative mx-auto max-w-7xl"
        data-aos="fade-up"
      >
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="
              mx-auto
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-primary/15
              bg-primary/5
              px-4
              py-2
              text-sm
              font-bold
              text-primary
              shadow-sm
            "
          >
            <Globe2 className="h-4 w-4" />
            Explore the world
          </div>

          <h2
            className="
              mt-5
              font-nunito
              text-3xl
              font-extrabold
              leading-tight
              text-darkPrimary
              sm:text-4xl
              lg:text-5xl
            "
          >
            Explore Top{" "}
            <span className="text-primary bg-gradient-to-r
        from-primary
        to-secondary
        bg-clip-text
        text-transparent">
              Study Destinations
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-base
              leading-7
              text-slate-600
              sm:text-lg
            "
          >
            Choose your dream destination and begin your
            global education journey with trusted guidance
            from our experienced study abroad team.
          </p>

          <div
            className="
              mx-auto
              mt-6
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <span
              className="
                h-1.5
                w-8
                rounded-full
                bg-logoYellow
              "
            />

            <span
              className="
                h-1.5
                w-16
                rounded-full
                bg-primary
              "
            />

            <span
              className="
                h-1.5
                w-8
                rounded-full
                bg-secondary
              "
            />
          </div>
        </div>

        {/* Destination grid */}
        <div
          id="study-destinations-grid"
          className="
            mx-auto
            mt-12
            grid
            max-w-6xl
            scroll-mt-28
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:grid-cols-4
            lg:gap-6
          "
        >
          {visibleCountries.map((item, index) => (
            <DestinationCard
              key={item.id}
              item={item}
              index={index}
              imagePath={imagePath}
            />
          ))}
        </div>

        {/* Action buttons */}
        {countries.length > INITIAL_VISIBLE_COUNT && (
          <div
            className="
              mt-10
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
                  px-7
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_12px_28px_rgba(192,31,83,0.24)]
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:cursor-pointer
                  hover:shadow-[0_17px_36px_rgba(192,31,83,0.35)]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-primary
                  focus-visible:ring-offset-2
                  sm:w-auto
                "
              >
                View More Destinations

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
                onClick={handleHideDestinations}
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
                  border-primary/40
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
                Hide Destinations

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

        {/* Features */}
        <div
          className="
            relative
            mt-16
            overflow-hidden
            rounded-[30px]
            bg-gradient-to-br
            from-darkPrimary
            via-[#54152c]
            to-[#35101e]
            px-5
            py-8
            shadow-[0_24px_60px_rgba(99,26,51,0.26)]
            sm:px-8
            lg:px-10
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-16
              -top-24
              h-72
              w-72
              rounded-full
              bg-primary/30
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -bottom-24
              left-1/4
              h-64
              w-64
              rounded-full
              bg-secondary/20
              blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              inset-0
              opacity-[0.04]
              [background-image:radial-gradient(white_1px,transparent_1px)]
              [background-size:20px_20px]
            "
          />

          <div
            className="
              relative
              grid
              gap-5
              sm:grid-cols-2
              lg:grid-cols-4
              lg:gap-0
            "
          >
            {features.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className={`
                    group
                    flex
                    items-start
                    gap-4
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.06]
                    p-5
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:bg-white/[0.10]
                    lg:rounded-none
                    lg:border-y-0
                    lg:border-l-0
                    lg:bg-transparent
                    lg:px-6
                    lg:py-2
                    lg:backdrop-blur-none
                    ${
                      index < features.length - 1
                        ? "lg:border-r lg:border-white/15"
                        : "lg:border-r-0"
                    }
                  `}
                >
                  <span
                    className="
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      rounded-2xl
                      bg-white
                      text-primary
                      shadow-[0_8px_20px_rgba(0,0,0,0.15)]
                      transition-all
                      duration-300
                      group-hover:-rotate-3
                      group-hover:scale-105
                      group-hover:bg-logoYellow
                      group-hover:text-darkPrimary
                    "
                  >
                    <Icon
                      className="h-7 w-7"
                      strokeWidth={2}
                    />
                  </span>

                  <div>
                    <h3
                      className="
                        text-base
                        font-bold
                        text-logoYellow
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-sm
                        leading-6
                        text-white/80
                      "
                    >
                      {item.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}