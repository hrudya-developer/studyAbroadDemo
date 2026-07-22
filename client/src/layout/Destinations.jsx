import { MdFlight } from "react-icons/md";
import { GiChurch } from "react-icons/gi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/free-mode";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchCountries } from "../redux/slices/countrySlice";
import { MoveRight } from "lucide-react";

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

  const cleanBase = basePath?.replace(/\/+$/, "") || "";
  const cleanImage = image.replace(/^\/+/, "");

  return cleanBase
    ? `${cleanBase}/${cleanImage}`
    : `/${cleanImage}`;
};

const Destinations = () => {
  const dispatch = useDispatch();

  const {
    countries = [],
    imagePath = "",
    loading,
  } = useSelector((state) => state.countryData);

  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries(uid || 0));
    }
  }, [uid, dispatch, countries.length]);

  if (loading && countries.length === 0) {
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
            mb-12
            flex
            max-w-3xl
            flex-col
            items-center
            justify-center
            text-center
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
            Choose your perfect study abroad destination and
            unlock a world of opportunities.
          </p>

          <span className="mt-6 h-1 w-16 rounded-full bg-primary" />
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Autoplay, FreeMode]}
          loop={countries.length > 4}
          freeMode={{
            enabled: true,
            momentum: false,
          }}
          grabCursor
          allowTouchMove
          speed={4000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.08,
              spaceBetween: 14,
            },
            480: {
              slidesPerView: 1.4,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 18,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="destinationSwiper"
        >
          {countries.map((item, index) => {
            const countryImage =
              buildImageUrl(imagePath, item.image) ||
              FALLBACK_IMAGE;

            const flagImage = buildImageUrl(
              imagePath,
              item.flag
            );

            return (
              <SwiperSlide key={item.id || index}>
                <Link
                  to={`/destination/${item.id}`}
                  state={{ country: item }}
                  aria-label={`Explore study opportunities in ${item.country}`}
                  className="block py-2"
                >
                  <article
                    className="
                      group
                      overflow-hidden
                      rounded-[24px]
                      border
                      border-slate-200/80
                      bg-white
                      shadow-[0_10px_28px_rgba(15,23,42,0.08)]
                      transition-all
                      duration-500
                      hover:-translate-y-1.5
                      hover:border-primary/25
                      hover:shadow-[0_20px_45px_rgba(192,31,83,0.15)]
                    "
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={countryImage}
                        alt={`${item.country} study destination`}
                        loading="lazy"
                        width={500}
                        height={360}
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
                          event.currentTarget.src =
                            FALLBACK_IMAGE;
                        }}
                      />

                      {/* Overlays */}
                      <div
                        aria-hidden="true"
                        className="
                          absolute
                          inset-0
                          bg-gradient-to-t
                          from-black/55
                          via-black/10
                          to-transparent
                        "
                      />

                      <div
                        aria-hidden="true"
                        className="
                          absolute
                          inset-0
                          bg-black/10
                          transition-colors
                          duration-500
                          group-hover:bg-black/25
                        "
                      />

                      {/* Flag */}
                      <div
                        className="
                          absolute
                          left-4
                          top-4
                          flex
                          h-12
                          w-12
                          items-center
                          justify-center
                          overflow-hidden
                          rounded-full
                          border-2
                          border-white
                          bg-white
                          shadow-[0_8px_20px_rgba(15,23,42,0.2)]
                        "
                      >
                        {flagImage ? (
                          <img
                            src={flagImage}
                            alt={`${item.country} flag`}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <span className="text-xl">🌍</span>
                        )}
                      </div>

                      {/* Number */}
                      <span
                        className="
                          absolute
                          right-4
                          top-4
                          rounded-full
                          border
                          border-white/20
                          bg-primary/90
                          px-3
                          py-1
                          text-xs
                          font-bold
                          text-white
                          shadow-sm
                          backdrop-blur-sm
                        "
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <h2
                          className="
                            min-w-0
                            truncate
                            text-xl
                            font-bold
                            text-secondary
                            transition-colors
                            duration-300
                            group-hover:text-primary
                          "
                        >
                          {item.country}
                        </h2>

                        <span
                          className="
                            shrink-0
                            text-3xl
                            text-primary
                            transition-transform
                            duration-300
                            group-hover:-rotate-6
                            group-hover:scale-110
                          "
                        >
                          <GiChurch />
                        </span>
                      </div>

                      <div
                        className="
                          mb-5
                          h-[3px]
                          w-12
                          rounded-full
                          bg-primary
                          transition-all
                          duration-300
                          group-hover:w-20
                        "
                      />

                      <div className="flex items-center justify-between gap-3">
                        <span
                          className="
                            inline-flex
                            min-h-[38px]
                            items-center
                            justify-center
                            rounded-full
                            bg-slate-100
                            px-4
                            text-sm
                            font-semibold
                            text-secondary
                            transition-all
                            duration-300
                            group-hover:bg-primary
                            group-hover:text-white
                          "
                        >
                          View destination
                        </span>

                        <span
                          className="
                            grid
                            h-10
                            w-10
                            shrink-0
                            place-content-center
                            rounded-full
                            bg-slate-100
                            text-secondary
                            transition-all
                            duration-300
                            group-hover:translate-x-1
                            group-hover:bg-primary
                            group-hover:text-white
                          "
                        >
                          <MoveRight size={20} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Destinations;