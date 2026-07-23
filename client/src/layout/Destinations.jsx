import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import {
  ChevronLeft,
  ChevronRight,
  MoveRight,
} from "lucide-react";

import { MdFlight } from "react-icons/md";
import { GiChurch } from "react-icons/gi";

import { fetchCountries } from "../redux/slices/countrySlice";

import "swiper/css";
import "swiper/css/navigation";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop";

const buildImageUrl = (basePath, image) => {
  if (!image) return "";

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  const cleanBase =
    basePath?.replace(/\/+$/, "") || "";

  const cleanImage =
    image.replace(/^\/+/, "");

  return cleanBase
    ? `${cleanBase}/${cleanImage}`
    : `/${cleanImage}`;
};

const Destinations = () => {
  const dispatch = useDispatch();

  const previousButtonRef = useRef(null);
  const nextButtonRef = useRef(null);

  const {
    countries = [],
    imagePath = "",
    loading,
  } = useSelector((state) => state.countryData);

  const { uid } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries(uid || 0));
    }
  }, [uid, dispatch, countries.length]);

  if (
    loading &&
    countries.length === 0
  ) {
    return (
      <section className="mt-10 bg-[#f7fbff] px-5 py-20">
        <div className="flex min-h-[360px] items-center justify-center">
          <div className="text-center">
            <span
              className="
                mx-auto
                block
                h-11
                w-11
                animate-spin
                rounded-full
                border-4
                border-primary/15
                border-t-primary
              "
            />

            <p className="mt-4 text-base font-bold text-slate-700">
              Loading destinations...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="_destinationWrapper"
      className="mt-10 overflow-hidden"
    >
      <div
        className="
          mx-auto
          max-w-[1536px]
          bg-[#f7fbff]
          px-4
          py-14
          sm:px-6
          sm:py-16
          lg:px-8
          lg:py-20
        "
        data-aos="fade-left"
      >
        {/* Header */}
        <div
          className="
            mx-auto
            mb-10
            flex
            max-w-3xl
            flex-col
            items-center
            justify-center
            text-center
            sm:mb-12
          "
        >
          <p
            className="
              mb-4
              inline-flex
              w-fit
              items-center
              justify-center
              gap-2
              self-center
              rounded-full
              border
              border-primary/10
              bg-purple-100
              px-4
              py-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.12em]
              text-primary
              shadow-sm
            "
          >
            <MdFlight className="text-base text-primary" />

            Explore. Learn. Grow
          </p>

          <h1
            className="
              font-nunito
              text-3xl
              font-extrabold
              leading-tight
              text-darkPrimary
              sm:text-4xl
              lg:text-5xl
            "
          >
            Dream{" "}
            <span
              className="
                bg-gradient-to-r
                from-primary
                to-secondary
                bg-clip-text
                text-transparent
              "
            >
              Destinations
            </span>
          </h1>

          <p
            className="
              mx-auto
              max-w-2xl
              pt-3
              text-base
              leading-7
              text-slate-600
              sm:text-lg
            "
          >
            Choose your perfect study abroad
            destination and unlock a world of
            opportunities.
          </p>

          <span className="mt-6 h-1 w-16 rounded-full bg-primary" />
        </div>

        {countries.length > 0 ? (
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              slidesPerGroup={1}
              spaceBetween={14}
              speed={650}
              grabCursor
              allowTouchMove
              watchOverflow
              loop={countries.length > 3}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl =
                  previousButtonRef.current;

                swiper.params.navigation.nextEl =
                  nextButtonRef.current;
              }}
              onSwiper={(swiper) => {
                setTimeout(() => {
                  swiper.params.navigation.prevEl =
                    previousButtonRef.current;

                  swiper.params.navigation.nextEl =
                    nextButtonRef.current;

                  swiper.navigation.destroy();
                  swiper.navigation.init();
                  swiper.navigation.update();
                }, 0);
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  slidesPerGroup: 1,
                  spaceBetween: 14,
                },
                640: {
                  slidesPerView: 2,
                  slidesPerGroup: 1,
                  spaceBetween: 18,
                },
                1024: {
                  slidesPerView: 3,
                  slidesPerGroup: 1,
                  spaceBetween: 24,
                },
              }}
              className="destinationSwiper !overflow-hidden"
            >
              {countries.map(
                (item, index) => {
                  const countryImage =
                    buildImageUrl(
                      imagePath,
                      item.image
                    ) || FALLBACK_IMAGE;

                  const flagImage =
                    buildImageUrl(
                      imagePath,
                      item.flag
                    );

                  return (
                    <SwiperSlide
                      key={
                        item.id ||
                        item.country ||
                        index
                      }
                      className="!h-auto"
                    >
                      <Link
                        to={`/destination/${item.id}`}
                        state={{
                          country: item,
                        }}
                        aria-label={`Explore study opportunities in ${item.country}`}
                        className="block h-full py-2"
                      >
 <article
  className="
    group
    relative
    flex
    h-full
    min-h-[520px]
    flex-col
    overflow-hidden
    rounded-[30px]
    border
    border-slate-200/70
    bg-white
    shadow-[0_16px_45px_rgba(15,23,42,0.09)]
    transition-all
    duration-500
    ease-out
    hover:-translate-y-2
    hover:border-primary/20
    hover:shadow-[0_28px_70px_rgba(99,26,51,0.18)]
  "
>
  {/* Decorative glow */}
  <div
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      -right-20
      -top-20
      z-0
      h-48
      w-48
      rounded-full
      bg-primary/10
      blur-3xl
      transition-all
      duration-500
      group-hover:bg-primary/20
    "
  />

  <div
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      -bottom-20
      -left-20
      z-0
      h-48
      w-48
      rounded-full
      bg-secondary/10
      blur-3xl
    "
  />

  {/* Image area */}
  <div className="relative z-10 h-[285px] overflow-hidden">
    <img
      src={countryImage}
      alt={`${item.country} study destination`}
      loading="lazy"
      width={600}
      height={420}
      className="
        h-full
        w-full
        object-cover
        transition-transform
        duration-700
        ease-out
        group-hover:scale-110
      "
      onError={(event) => {
        event.currentTarget.src = FALLBACK_IMAGE;
      }}
    />

    {/* Dark overlay */}
    <div
      aria-hidden="true"
      className="
        absolute
        inset-0
        bg-gradient-to-t
        from-[#071827]/95
        via-[#071827]/35
        to-transparent
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
        opacity-70
        transition-opacity
        duration-500
        group-hover:opacity-100
      "
    />

    {/* Top badge */}
    <div
      className="
        absolute
        left-4
        top-4
        inline-flex
        max-w-[calc(100%-88px)]
        items-center
        gap-2
        rounded-full
        border
        border-white/25
        bg-black/25
        px-3.5
        py-2
        text-[10px]
        font-bold
        uppercase
        tracking-[0.12em]
        text-white
        shadow-lg
        backdrop-blur-md
        sm:text-[11px]
      "
    >
      <MdFlight className="shrink-0 text-sm" />

      <span className="truncate">
        Study Destination
      </span>
    </div>

    {/* Slide number */}
    <div
      className="
        absolute
        right-4
        top-4
        grid
        h-10
        min-w-10
        place-items-center
        rounded-full
        border
        border-white/25
        bg-white/15
        px-2
        text-xs
        font-extrabold
        text-white
        shadow-lg
        backdrop-blur-md
      "
    >
      {String(index + 1).padStart(2, "0")}
    </div>

    {/* Country information */}
    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
      <div className="min-w-0 flex-1">
        <p
          className="
            mb-1
            text-[10px]
            font-bold
            uppercase
            tracking-[0.2em]
            text-white/65
          "
        >
          Begin your journey
        </p>

        <h2
          className="
            truncate
            font-nunito
            text-2xl
            font-extrabold
            leading-tight
            text-white
            drop-shadow-md
            sm:text-[28px]
          "
        >
          {item.country}
        </h2>
      </div>

      {/* Flag */}
      <div
        className="
          flex
          h-14
          w-14
          shrink-0
          items-center
          justify-center
          overflow-hidden
          rounded-2xl
          border-[3px]
          border-white
          bg-white
          p-0.5
          shadow-[0_12px_28px_rgba(0,0,0,0.30)]
          transition-all
          duration-500
          group-hover:-rotate-3
          group-hover:scale-110
        "
      >
        {flagImage ? (
          <img
            src={flagImage}
            alt={`${item.country} flag`}
            loading="lazy"
            className="
              h-full
              w-full
              rounded-[11px]
              object-cover
            "
            onError={(event) => {
              event.currentTarget.style.display =
                "none";
            }}
          />
        ) : (
          <span className="text-2xl">🌍</span>
        )}
      </div>
    </div>
  </div>

  {/* Content area */}
  <div
    className="
      relative
      z-10
      flex
      flex-1
      flex-col
      px-5
      pb-5
      pt-6
      sm:px-6
      sm:pb-6
    "
  >
    {/* Small heading */}
    <div className="mb-4 flex items-center gap-3">
      <span
        className="
          grid
          h-10
          w-10
          shrink-0
          place-items-center
          rounded-2xl
          bg-gradient-to-br
          from-primary/10
          to-secondary/10
          text-primary
        "
      >
        <GiChurch className="text-xl" />
      </span>

      <div className="min-w-0">
        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.14em]
            text-slate-400
          "
        >
          International education
        </p>

        <h3
          className="
            truncate
            text-base
            font-extrabold
            text-darkPrimary
          "
        >
          Study in {item.country}
        </h3>
      </div>
    </div>

    {/* Description */}
    <p
      className="
        mb-5
        text-sm
        leading-6
        text-slate-600
      "
    >
      Discover quality education, leading institutions
      and exciting career opportunities in{" "}
      <span className="font-semibold text-slate-700">
        {item.country}
      </span>
      .
    </p>

    {/* Responsive tags */}
    <div className="mb-6 flex flex-wrap gap-2">
      <span
        className="
          inline-flex
          min-w-0
          items-center
          gap-1.5
          rounded-full
          border
          border-primary/10
          bg-primary/[0.06]
          px-3
          py-1.5
          text-[11px]
          font-bold
          text-primary
        "
      >
        <GiChurch className="shrink-0 text-sm" />

        <span className="whitespace-nowrap">
          Top Universities
        </span>
      </span>

      <span
        className="
          inline-flex
          min-w-0
          items-center
          gap-1.5
          rounded-full
          border
          border-secondary/10
          bg-secondary/[0.06]
          px-3
          py-1.5
          text-[11px]
          font-bold
          text-secondary
        "
      >
        <MdFlight className="shrink-0 text-sm" />

        <span className="whitespace-nowrap">
          Global Opportunities
        </span>
      </span>
    </div>

    {/* Divider */}
    <div
      className="
        mb-5
        h-px
        w-full
        bg-gradient-to-r
        from-transparent
        via-slate-200
        to-transparent
      "
    />

    {/* CTA */}
    <div
      className="
        mt-auto
        flex
        items-center
        justify-between
        gap-3
      "
    >
      <div className="min-w-0">
        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.16em]
            text-slate-400
          "
        >
          Explore destination
        </p>

        <p
          className="
            mt-0.5
            truncate
            text-sm
            font-extrabold
            text-darkPrimary
            transition-colors
            duration-300
            group-hover:text-primary
          "
        >
          View {item.country}
        </p>
      </div>

      <span
        className="
          inline-flex
          h-12
          shrink-0
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-gradient-to-r
          from-secondary
          to-[#084f86]
          px-4
          text-sm
          font-bold
          text-white
          shadow-[0_10px_25px_rgba(4,102,175,0.25)]
          transition-all
          duration-300
          group-hover:translate-x-1
          group-hover:from-primary
          group-hover:to-darkPrimary
          group-hover:shadow-[0_12px_30px_rgba(192,31,83,0.28)]
        "
      >
        <span className="hidden sm:inline">
          Explore
        </span>

        <MoveRight
          size={20}
          strokeWidth={2.4}
        />
      </span>
    </div>
  </div>

  {/* Dot pattern */}
  <div
    aria-hidden="true"
    className="
      pointer-events-none
      absolute
      bottom-4
      right-4
      z-0
      h-24
      w-24
      opacity-[0.05]
      [background-image:radial-gradient(#631A33_1px,transparent_1px)]
      [background-size:10px_10px]
    "
  />

  {/* Bottom animated line */}
  <div
    aria-hidden="true"
    className="
      absolute
      inset-x-0
      bottom-0
      z-20
      h-1
      origin-left
      scale-x-0
      bg-gradient-to-r
      from-primary
      via-secondary
      to-primary
      transition-transform
      duration-500
      group-hover:scale-x-100
    "
  />
</article>
                      </Link>
                    </SwiperSlide>
                  );
                }
              )}
            </Swiper>

            {/* Bottom-center navigation only */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                ref={previousButtonRef}
                type="button"
                aria-label="Show previous destinations"
                className="
                  destination-prev-button
                  grid
                  h-11
                  w-11
                  place-items-center
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  text-secondary
                  shadow-[0_8px_24px_rgba(15,23,42,0.08)]
                  transition-all
                  duration-300
                  hover:-translate-x-0.5
                  hover:border-primary
                  hover:bg-primary
                  hover:text-white
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-primary
                  focus-visible:ring-offset-2
                  disabled:cursor-not-allowed
                  disabled:opacity-35
                "
              >
                <ChevronLeft
                  size={21}
                  strokeWidth={2.5}
                />
              </button>

              <button
                ref={nextButtonRef}
                type="button"
                aria-label="Show next destinations"
                className="
                  destination-next-button
                  grid
                  h-11
                  w-11
                  place-items-center
                  rounded-full
                  border
                  border-slate-200
                  bg-white
                  text-secondary
                  shadow-[0_8px_24px_rgba(15,23,42,0.08)]
                  transition-all
                  duration-300
                  hover:translate-x-0.5
                  hover:border-primary
                  hover:bg-primary
                  hover:text-white
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-primary
                  focus-visible:ring-offset-2
                  disabled:cursor-not-allowed
                  disabled:opacity-35
                "
              >
                <ChevronRight
                  size={21}
                  strokeWidth={2.5}
                />
              </button>
            </div>
          </div>
        ) : (
          <div
            className="
              flex
              min-h-[280px]
              items-center
              justify-center
              rounded-[24px]
              border
              border-dashed
              border-slate-300
              bg-white/70
              px-5
              text-center
            "
          >
            <div>
              <MdFlight className="mx-auto text-4xl text-primary" />

              <h2 className="mt-4 text-xl font-bold text-darkPrimary">
                No destinations found
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                Study destinations are currently
                unavailable.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Destinations;