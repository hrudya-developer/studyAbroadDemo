import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import { Navigation } from "swiper/modules";

import GermanProgramCard from "./GermanProgramCard";
import { getProgramId } from "./germanProgramUtils";

export default function GermanProgramsSlider({
  programs,
  imagePath,
}) {
  return (
    <div className="relative">
      <button
        type="button"
        aria-label="Previous German program"
        className="
          german-program-prev
          absolute -left-2 top-1/2 z-20
          grid size-11 -translate-y-1/2
          place-items-center rounded-full
          bg-white text-darkPrimary shadow-xl
          md:-left-5
        "
      >
        <ChevronLeft size={22} />
      </button>

      <button
        type="button"
        aria-label="Next German program"
        className="
          german-program-next
          absolute -right-2 top-1/2 z-20
          grid size-11 -translate-y-1/2
          place-items-center rounded-full
          bg-white text-darkPrimary shadow-xl
          md:-right-5
        "
      >
        <ChevronRight size={22} />
      </button>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".german-program-prev",
          nextEl: ".german-program-next",
        }}
        spaceBetween={24}
        slidesPerView={1}
        watchOverflow
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="!px-1 !pb-14"
      >
        {programs.map((program, index) => {
          const programId = getProgramId(
            program,
            index
          );

          return (
            <SwiperSlide
              key={programId}
              className="!h-auto py-2"
            >
              <GermanProgramCard
                program={program}
                programId={programId}
                imagePath={imagePath}
                priority={index === 0}
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}