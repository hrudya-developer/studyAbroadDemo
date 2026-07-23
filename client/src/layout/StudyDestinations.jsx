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

const INITIAL_VISIBLE_COUNT = 4;
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
        flex
        min-h-[245px]
        flex-col
        items-center
        overflow-hidden
        rounded-[24px]
        border
        border-slate-200/80
        bg-white
        px-4
        pb-5
        pt-6
        text-center
        shadow-[0_12px_34px_rgba(15,23,42,0.08)]
        transition-all
        duration-500
        ease-[cubic-bezier(0.22,1,0.36,1)]
        hover:-translate-y-2
        hover:border-primary/25
        hover:shadow-[0_22px_50px_rgba(99,26,51,0.16)]
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-primary
        focus-visible:ring-offset-2
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-24
          bg-gradient-to-br
          from-primary/[0.10]
          via-white
          to-secondary/[0.10]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          bg-primary/10
          blur-2xl
          transition-transform
          duration-500
          group-hover:scale-125
        "
      />

      <span
        aria-hidden="true"
        className="
          absolute
          right-4
          top-4
          z-10
          text-xs
          font-black
          tracking-widest
          text-darkPrimary/20
        "
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div
        className="
          relative
          z-10
          flex
          h-28
          w-28
          items-center
          justify-center
          rounded-full
          bg-white
          p-1.5
          shadow-[0_12px_28px_rgba(15,23,42,0.16)]
          ring-1
          ring-slate-200/80
          transition-all
          duration-500
          group-hover:scale-105
          group-hover:ring-primary/30
        "
      >
        <div className="h-full w-full overflow-hidden rounded-full bg-slate-100">
          {destinationImage ? (
            <img
              src={destinationImage}
              alt={`${item.country} study destination`}
              loading={index < 4 ? "eager" : "lazy"}
              width={180}
              height={180}
              className="
                h-full
                w-full
                object-cover
                transition-transform
                duration-700
                group-hover:scale-110
              "
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div
              className="
                flex
                h-full
                w-full
                items-center
                justify-center
                bg-gradient-to-br
                from-primary
                via-darkPrimary
                to-secondary
                text-white
              "
            >
              <Globe2 className="h-10 w-10" />
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 mt-5 w-full">
        <p
          className="
            text-[10px]
            font-extrabold
            uppercase
            tracking-[0.18em]
            text-primary/70
          "
        >
          Study Destination
        </p>

        <h3
          className="
            mt-1
            truncate
            font-nunito
            text-xl
            font-extrabold
            text-darkPrimary
          "
        >
          {item.country}
        </h3>

        <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-16" />

        <div
          className="
            mt-4
            inline-flex
            items-center
            gap-2
            text-sm
            font-bold
            text-slate-600
            transition-colors
            duration-300
            group-hover:text-primary
          "
        >
          Explore courses

          <span
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-primary/10
              text-primary
              transition-all
              duration-300
              group-hover:translate-x-1
              group-hover:bg-primary
              group-hover:text-white
            "
          >
            <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
          </span>
        </div>
      </div>
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
            mt-10
            grid
            max-w-5xl
            scroll-mt-28
            grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-4
            lg:gap-5
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
                View More

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