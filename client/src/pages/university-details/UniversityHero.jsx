import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Globe,
  Landmark,
  MapPin,
  Trophy,
} from "lucide-react";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import {
  Autoplay,
  Pagination,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

import UniversityDetailsBreadcrumb from "./UniversityDetailsBreadcrumb";

export default function UniversityHero({
  data,
  onBack,
  onCourses,
}) {
  const {
    universityName,
    locationText,
    ranking,
    universityType,
    countryName,
    aboutText,
    logo,
    sliderImages,
  } = data;

  return (
    <section
      aria-labelledby="university-title"
      className="relative overflow-hidden bg-gradient-to-br from-[#071936] via-[#0b2853] to-darkPrimary px-4 py-10 sm:px-6 lg:px-10 lg:py-14"
    >
      <UniversityDetailsBreadcrumb
        universityName={universityName}
      />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="order-1 text-center lg:order-1 lg:text-left">
         

          <div className="flex flex-col items-center gap-5 lg:flex-row">
            <div className="grid size-20 shrink-0 place-content-center overflow-hidden rounded-2xl bg-white p-3 shadow-2xl">
              {logo ? (
                <img
                  src={logo}
                  alt={`${universityName} official logo`}
                  width="80"
                  height="80"
                  className="h-full w-full object-contain"
                />
              ) : (
                <Landmark
                  className="size-10 text-primary"
                  aria-hidden="true"
                />
              )}
            </div>

            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-logoYellow">
                University Profile
              </p>

              <h1
                id="university-title"
                className="text-3xl font-extrabold leading-tight text-white sm:text-4xl xl:text-5xl"
              >
                {universityName}

                <CheckCircle
                  className="ml-3 inline size-7 fill-primary text-white"
                  aria-hidden="true"
                />
              </h1>
            </div>
          </div>

          <p className="mt-6 flex items-center justify-center gap-2 font-bold text-logoYellow lg:justify-start">
            <MapPin
              className="size-5"
              aria-hidden="true"
            />

            {locationText}
          </p>

          <p className="mx-auto mt-5 line-clamp-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base lg:mx-0">
            {aboutText}
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
            <HeroBadge
              icon={Trophy}
              text={`Ranking ${ranking}`}
              solid
            />

            <HeroBadge
              icon={Landmark}
              text={universityType}
            />

            <HeroBadge
              icon={Globe}
              text={countryName}
            />
          </div>

          <button
            type="button"
            onClick={onCourses}
            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-primary px-6 py-4 font-bold text-white transition hover:bg-white hover:text-primary"
          >
            Explore Courses

            <ArrowRight
              className="size-5"
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="order-2 mx-auto w-full max-w-[400px] lg:order-2">
          <div className="relative aspect-square overflow-hidden rounded-[36px] border border-white/20 bg-white/10 p-3 shadow-2xl">
            {sliderImages.length ? (
              <Swiper
                modules={[
                  Autoplay,
                  Pagination,
                ]}
                loop={
                  sliderImages.length > 1
                }
                autoplay={
                  sliderImages.length > 1
                    ? {
                        delay: 3500,
                        disableOnInteraction:
                          false,
                      }
                    : false
                }
                pagination={{
                  clickable: true,
                }}
                className="h-full w-full overflow-hidden rounded-[28px]"
              >
                {sliderImages.map(
                  (image, index) => (
                    <SwiperSlide
                      key={`${image}-${index}`}
                    >
                      <img
                        src={image}
                        alt={`${universityName} campus image ${
                          index + 1
                        }`}
                        width="400"
                        height="400"
                        loading={
                          index === 0
                            ? "eager"
                            : "lazy"
                        }
                        className="h-full w-full object-cover"
                      />
                    </SwiperSlide>
                  )
                )}
              </Swiper>
            ) : (
              <div className="grid h-full place-content-center text-white">
                <Landmark
                  className="size-24"
                  aria-hidden="true"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroBadge({
  icon: Icon,
  text,
  solid = false,
}) {
  return (
    <span
      className={
        solid
          ? "inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-primary"
          : "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
      }
    >
      <Icon
        className="size-4"
        aria-hidden="true"
      />

      {text}
    </span>
  );
}