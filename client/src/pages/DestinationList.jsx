import {
  ArrowDown,
  ArrowUp,
  Globe2,
  MapPin,
  Plane,
  Sparkles,
} from "lucide-react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { fetchCountries } from "../redux/slices/countrySlice";
import mapBg from "../assets/mapBg.png";
import DestinationExcerpts from "./DestinationExcerpts";

const getCardsPerRow = () => {
  if (typeof window === "undefined") {
    return 3;
  }

  if (window.innerWidth >= 1024) {
    return 3;
  }

  if (window.innerWidth >= 640) {
    return 2;
  }

  return 1;
};

const DestinationList = () => {
  const dispatch = useDispatch();

  const {
    countries = [],
    imagePath,
    loading,
  } = useSelector((state) => state.countryData);

  const { uid } = useSelector((state) => state.auth);

  const safeUid = uid ?? 0;

  const [cardsPerRow, setCardsPerRow] = useState(
    getCardsPerRow
  );

  const initialVisibleCount = cardsPerRow * 2;

  const [visibleCount, setVisibleCount] = useState(
    initialVisibleCount
  );

  useEffect(() => {
    dispatch(fetchCountries(safeUid));
  }, [dispatch, safeUid]);

  useEffect(() => {
    const handleResize = () => {
      const updatedCardsPerRow = getCardsPerRow();

      setCardsPerRow((currentCardsPerRow) => {
        if (currentCardsPerRow !== updatedCardsPerRow) {
          setVisibleCount(updatedCardsPerRow * 2);
        }

        return updatedCardsPerRow;
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener(
        "resize",
        handleResize
      );
    };
  }, []);

  useEffect(() => {
    setVisibleCount(cardsPerRow * 2);
  }, [cardsPerRow]);

  const visibleCountries = useMemo(() => {
    return countries.slice(0, visibleCount);
  }, [countries, visibleCount]);

  const canShowMore = visibleCount < countries.length;

  const canShowLess =
    visibleCount > initialVisibleCount;

  const handleViewMore = () => {
    setVisibleCount((currentCount) =>
      Math.min(
        currentCount + cardsPerRow,
        countries.length
      )
    );
  };

  const handleShowLess = () => {
    setVisibleCount((currentCount) =>
      Math.max(
        currentCount - cardsPerRow,
        initialVisibleCount
      )
    );
  };

  if (loading) {
    return <DestinationLoading />;
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8fafc]">
      <DestinationHero />

      <section
        className="
          relative
          px-4 pb-16 pt-12
          sm:px-6 sm:pb-20
          lg:px-8 lg:pb-24 lg:pt-16
        "
      >
        <SectionBackground />

        <div className="relative z-10 mx-auto max-w-[1500px]">
          <DestinationSectionHeader
            destinationCount={countries.length}
          />

          {visibleCountries.length > 0 ? (
            <>
              <div
                className="
                  grid grid-cols-1
                  gap-5
                  sm:grid-cols-2 sm:gap-6
                  lg:grid-cols-3
                  xl:gap-8
                "
              >
                {visibleCountries.map(
                  (item, index) => (
                    <DestinationCard
                      key={item.id}
                      item={item}
                      index={index}
                      imagePath={imagePath}
                    />
                  )
                )}
              </div>

              <DestinationControls
                canShowMore={canShowMore}
                canShowLess={canShowLess}
                handleViewMore={handleViewMore}
                handleShowLess={handleShowLess}
                visibleCount={visibleCountries.length}
                totalCount={countries.length}
              />
            </>
          ) : (
            <EmptyDestinations />
          )}
        </div>
      </section>
    </main>
  );
};

const DestinationHero = () => {
  return (
    <section
      className="
        relative isolate
        flex min-h-[430px]
        items-center overflow-hidden
        bg-gradient-to-br
        from-white via-[#fff9fb] to-[#edf6ff]
        px-4 py-16
        sm:min-h-[480px]
        sm:px-6
        lg:min-h-[520px]
        lg:px-8
      "
      style={{
        backgroundImage: `url(${mapBg})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <div
        aria-hidden="true"
        className="
          absolute inset-0 -z-10
          bg-gradient-to-b
          from-white/40
          via-white/65
          to-white
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute -left-20 top-10 -z-10
          h-72 w-72 rounded-full
          bg-primary/10 blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute -right-20 bottom-0 -z-10
          h-80 w-80 rounded-full
          bg-secondary/10 blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute left-[8%] top-16
          hidden h-28 w-28
          opacity-[0.13]
          sm:block
          [background-image:radial-gradient(#c01f53_1.5px,transparent_1.5px)]
          [background-size:14px_14px]
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute bottom-14 right-[8%]
          hidden h-28 w-28
          opacity-[0.12]
          sm:block
          [background-image:radial-gradient(#0466af_1.5px,transparent_1.5px)]
          [background-size:14px_14px]
        "
      />

      <div
        className="
          mx-auto flex w-full
          max-w-5xl flex-col
          items-center text-center
        "
      >
        <div
          className="
            inline-flex items-center gap-2
            rounded-full
            border border-secondary/20
            bg-white/90
            p-1.5 pr-4
            text-xs font-extrabold
            uppercase tracking-[0.14em]
            text-secondary
            shadow-[0_12px_35px_rgba(15,23,42,0.08)]
            backdrop-blur-xl
          "
        >
          <span
            className="
              flex h-9 w-9 items-center
              justify-center rounded-full
              bg-gradient-to-br
              from-secondary to-[#034b82]
              text-white
              shadow-md shadow-secondary/20
            "
          >
            <Globe2 className="h-4 w-4" />
          </span>

          Explore · Learn · Succeed
        </div>

        <h1
          className="
            mt-6 max-w-4xl
            font-nunito
            text-4xl font-black
            leading-[1.08]
            tracking-[-0.04em]
            text-darkPrimary
            sm:text-5xl
            lg:text-6xl
          "
        >
          Explore Inspiring{" "}
          <span
            className="
              bg-gradient-to-r
              from-primary via-[#df376c]
              to-secondary
              bg-clip-text text-transparent
            "
          >
            Study Abroad Destinations
          </span>
        </h1>

        <div
          aria-hidden="true"
          className="
            mt-5 flex items-center
            justify-center gap-2
          "
        >
          <span className="h-1.5 w-16 rounded-full bg-primary" />
          <span className="h-1.5 w-7 rounded-full bg-secondary" />
          <span className="h-1.5 w-3 rounded-full bg-logoYellow" />
        </div>

        <p
          className="
            mt-6 max-w-3xl
            text-sm leading-7
            text-slate-600
            sm:text-base
            lg:text-lg lg:leading-8
          "
        >
          Discover world-class education, diverse
          cultures and rewarding international
          opportunities across leading global study
          destinations.
        </p>

        <div
          className="
            mt-7 flex flex-wrap
            items-center justify-center
            gap-3
          "
        >
          <div
            className="
              inline-flex items-center gap-2
              rounded-xl border border-primary/10
              bg-white/85 px-4 py-2.5
              text-sm font-bold text-slate-700
              shadow-sm backdrop-blur
            "
          >
            <Plane className="h-4 w-4 text-primary" />
            Global education options
          </div>

          <div
            className="
              inline-flex items-center gap-2
              rounded-xl border border-secondary/10
              bg-white/85 px-4 py-2.5
              text-sm font-bold text-slate-700
              shadow-sm backdrop-blur
            "
          >
            <Sparkles className="h-4 w-4 text-secondary" />
            Expert application support
          </div>
        </div>
      </div>
    </section>
  );
};

const DestinationSectionHeader = ({
  destinationCount,
}) => {
  return (
    <div
      className="
        mb-8 flex flex-col
        items-center justify-between
        gap-5 text-center
        sm:mb-10
        md:flex-row md:text-left
      "
    >
      <div>
        <span
          className="
            inline-flex items-center gap-2
            text-xs font-extrabold
            uppercase tracking-[0.16em]
            text-primary
          "
        >
          <MapPin className="h-4 w-4" />
          Choose your destination
        </span>

        <h2
          className="
            mt-2 font-nunito
            text-2xl font-black
            text-[#10204a]
            sm:text-3xl
            lg:text-4xl
          "
        >
          Where will your journey take you?
        </h2>

        <p
          className="
            mt-2 max-w-2xl
            text-sm leading-6
            text-slate-600
            sm:text-base
          "
        >
          Compare popular destinations and discover
          the country that best matches your
          education and career goals.
        </p>
      </div>

      <div
        className="
          flex shrink-0 items-center
          gap-3 rounded-2xl
          border border-slate-200/80
          bg-white px-4 py-3
          shadow-[0_12px_30px_rgba(15,23,42,0.06)]
        "
      >
        <span
          className="
            flex h-11 w-11 items-center
            justify-center rounded-xl
            bg-primary/10 text-primary
          "
        >
          <Globe2 className="h-5 w-5" />
        </span>

        <div className="text-left">
          <p className="text-xl font-black text-[#10204a]">
            {destinationCount}+
          </p>

          <p className="text-xs font-semibold text-slate-500">
            Study destinations
          </p>
        </div>
      </div>
    </div>
  );
};

const DestinationCard = ({
  item,
  index,
  imagePath,
}) => {
  const destinationImage = `${imagePath}/${item.image}`;
  const flagImage = item.flag
    ? `${imagePath}/${item.flag}`
    : null;

  const formattedNumber = String(index + 1).padStart(
    2,
    "0"
  );

  return (
    <article
      className="
        group relative
        flex h-full flex-col
        overflow-hidden rounded-[28px]
        border border-slate-200/70
        bg-white
        shadow-[0_16px_50px_rgba(15,23,42,0.08)]
        transition-all duration-500
        hover:-translate-y-2
        hover:border-primary/20
        hover:shadow-[0_28px_70px_rgba(15,23,42,0.14)]
      "
    >
      <div className="relative h-[245px] overflow-hidden">
        <img
          src={destinationImage}
          alt={`Study abroad in ${item.country}`}
          width={600}
          height={420}
          loading="lazy"
          decoding="async"
          className="
            h-full w-full object-cover
            transition-transform duration-700
            ease-out
            group-hover:scale-110
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute inset-0
            bg-gradient-to-t
            from-[#071a38]/90
            via-[#071a38]/10
            to-transparent
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute inset-0
            bg-gradient-to-br
            from-primary/5
            via-transparent
            to-secondary/10
          "
        />

        <span
          className="
            absolute left-4 top-4
            inline-flex h-10 min-w-10
            items-center justify-center
            rounded-xl border border-white/30
            bg-black/20 px-2
            text-xs font-black
            tracking-[0.12em]
            text-white
            backdrop-blur-md
          "
        >
          {formattedNumber}
        </span>

        {flagImage && (
          <div
            className="
              absolute right-4 top-4
              flex h-12 w-12
              items-center justify-center
              rounded-2xl border-2
              border-white/70
              bg-white p-1
              shadow-[0_10px_25px_rgba(0,0,0,0.2)]
            "
          >
            <img
              src={flagImage}
              alt={`${item.country} national flag`}
              width={42}
              height={42}
              loading="lazy"
              decoding="async"
              className="
                h-full w-full rounded-xl
                object-cover
              "
            />
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 p-5">
          <div
            className="
              inline-flex items-center gap-1.5
              rounded-full border
              border-white/20
              bg-white/15 px-2.5 py-1
              text-[10px] font-bold
              uppercase tracking-[0.12em]
              text-white backdrop-blur-md
            "
          >
            <MapPin className="h-3 w-3" />
            Study destination
          </div>

          <h3
            className="
              mt-2 font-nunito
              text-2xl font-black
              text-white
              sm:text-[26px]
            "
          >
            {item.country}
          </h3>
        </div>
      </div>

      <div
        className="
          relative flex flex-1
          flex-col p-5
          sm:p-6
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute -right-8 -top-8
            h-24 w-24 rounded-full
            bg-secondary/[0.05]
          "
        />

        <p
          className="
            relative flex-1
            text-sm leading-7
            text-slate-600
            sm:text-[15px]
          "
        >
          {DestinationExcerpts(item.country)}
        </p>

        <div
          className="
            relative mt-5 flex
            items-center justify-between
            border-t border-slate-100
            pt-4
          "
        >
          <Link
            to={`/destination/${item.id}`}
            aria-label={`Learn more about studying in ${item.country}`}
            className="
              group/button inline-flex
              min-h-11 items-center
              gap-2 rounded-xl
              bg-darkPrimary
              px-4 py-2.5
              text-sm font-extrabold
              text-white
              shadow-[0_10px_25px_rgba(99,26,51,0.2)]
              transition-all duration-300
              hover:bg-primary
              hover:shadow-[0_14px_30px_rgba(192,31,83,0.25)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
              focus-visible:ring-offset-2
            "
          >
            Explore country

            <FaArrowRight
              className="
                text-xs transition-transform
                duration-300
                group-hover/button:translate-x-1
              "
            />
          </Link>

          <span
            aria-hidden="true"
            className="
              flex h-10 w-10 items-center
              justify-center rounded-full
              bg-slate-100 text-slate-400
              transition-all duration-300
              group-hover:bg-secondary/10
              group-hover:text-secondary
            "
          >
            <Globe2 className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="
          absolute inset-x-0 bottom-0
          h-1 origin-left scale-x-0
          bg-gradient-to-r
          from-primary to-secondary
          transition-transform duration-500
          group-hover:scale-x-100
        "
      />
    </article>
  );
};

const DestinationControls = ({
  canShowMore,
  canShowLess,
  handleViewMore,
  handleShowLess,
  visibleCount,
  totalCount,
}) => {
  if (!canShowMore && !canShowLess) {
    return null;
  }

  return (
    <div
      className="
        mt-10 flex flex-col
        items-center justify-center
        gap-4
        sm:mt-12
      "
    >
      <p className="text-sm font-semibold text-slate-500">
        Showing{" "}
        <span className="font-black text-darkPrimary">
          {visibleCount}
        </span>{" "}
        of{" "}
        <span className="font-black text-darkPrimary">
          {totalCount}
        </span>{" "}
        destinations
      </p>

      <div
        className="
          flex flex-col items-center
          justify-center gap-3
          sm:flex-row
        "
      >
        {canShowLess && (
          <button
            type="button"
            onClick={handleShowLess}
            className="
              group inline-flex min-h-12
              items-center justify-center
              gap-2 rounded-xl
              border border-slate-300
              bg-white px-5 py-3
              text-sm font-extrabold
              text-slate-700
              shadow-sm
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-darkPrimary
              hover:text-darkPrimary
              hover:shadow-md
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-darkPrimary
              focus-visible:ring-offset-2
            "
          >
            <ArrowUp
              className="
                h-4 w-4
                transition-transform duration-300
                group-hover:-translate-y-0.5
              "
            />

            Show Less
          </button>
        )}

        {canShowMore && (
          <button
            type="button"
            onClick={handleViewMore}
            className="
              group inline-flex min-h-12
              items-center justify-center
              gap-2 rounded-xl
              bg-gradient-to-r
              from-primary to-darkPrimary
              px-6 py-3
              text-sm font-extrabold
              text-white
              shadow-[0_14px_32px_rgba(192,31,83,0.24)]
              transition-all duration-300
              hover:-translate-y-0.5
              hover:shadow-[0_18px_38px_rgba(99,26,51,0.3)]
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-primary
              focus-visible:ring-offset-2
            "
          >
            View More Destinations

            <ArrowDown
              className="
                h-4 w-4
                transition-transform duration-300
                group-hover:translate-y-0.5
              "
            />
          </button>
        )}
      </div>
    </div>
  );
};

const SectionBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute inset-0 overflow-hidden
      "
    >
      <div
        className="
          absolute -left-40 top-40
          h-80 w-80 rounded-full
          bg-primary/[0.04] blur-3xl
        "
      />

      <div
        className="
          absolute -right-40 bottom-20
          h-96 w-96 rounded-full
          bg-secondary/[0.05] blur-3xl
        "
      />
    </div>
  );
};

const DestinationLoading = () => {
  return (
    <div
      className="
        flex min-h-screen
        items-center justify-center
        bg-slate-50 px-4
      "
    >
      <div className="flex flex-col items-center">
        <div
          className="
            relative flex h-16 w-16
            items-center justify-center
            rounded-2xl
            bg-white
            shadow-[0_15px_40px_rgba(15,23,42,0.1)]
          "
        >
          <Globe2 className="h-7 w-7 animate-pulse text-primary" />

          <span
            className="
              absolute inset-0
              animate-spin rounded-2xl
              border-2 border-transparent
              border-t-secondary
            "
          />
        </div>

        <p
          className="
            mt-5 text-sm font-bold
            text-slate-600
          "
        >
          Loading study destinations...
        </p>
      </div>
    </div>
  );
};

const EmptyDestinations = () => {
  return (
    <div
      className="
        flex min-h-[300px]
        flex-col items-center
        justify-center rounded-3xl
        border border-dashed
        border-slate-300
        bg-white px-5 text-center
      "
    >
      <span
        className="
          flex h-14 w-14 items-center
          justify-center rounded-2xl
          bg-primary/10 text-primary
        "
      >
        <Globe2 className="h-6 w-6" />
      </span>

      <h3
        className="
          mt-4 text-xl font-black
          text-darkPrimary
        "
      >
        No destinations available
      </h3>

      <p
        className="
          mt-2 max-w-md
          text-sm leading-6
          text-slate-500
        "
      >
        Study destinations are currently unavailable.
        Please check again later.
      </p>
    </div>
  );
};

export default DestinationList;