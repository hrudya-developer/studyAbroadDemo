import {
  ChevronLeft,
  ChevronRight,
  PlayCircle,
} from "lucide-react";

import {
  Swiper,
  SwiperSlide,
} from "swiper/react";

import { Navigation } from "swiper/modules";

import AusbildungVideoCard from "./AusbildungVideoCard";
import StatusMessage from "./StatusMessage";

export default function AusbildungVideoSection({
  program,
  videos,
  loading,
  error,
}) {
  if (!program) return null;

  return (
    <section
      aria-labelledby="ausbildung-videos-title"
      className="
        relative mt-14 overflow-hidden
        rounded-[32px]
        border border-slate-200
        bg-white/80 px-5 py-10
        shadow-xl sm:px-8
      "
    >
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="mb-3 flex items-center gap-3 text-primary">
            <PlayCircle size={23} />

            <span className="text-xs font-bold uppercase tracking-[0.2em]">
              Watch and Explore
            </span>
          </div>

          <h2
            id="ausbildung-videos-title"
            className="text-2xl font-extrabold text-black sm:text-3xl"
          >
            Ausbildung – Germany&apos;s Most
            In-Demand Career Path
          </h2>

          <p className="mt-2 text-sm leading-7 text-gray-600">
            Watch videos about Ausbildung,
            careers and student life in Germany.
          </p>
        </div>

        {videos.length > 1 && (
          <div className="flex gap-3">
            <button
              className="ausbildung-video-prev grid size-11 place-items-center rounded-full bg-darkPrimary text-white"
              aria-label="Previous video"
            >
              <ChevronLeft size={21} />
            </button>

            <button
              className="ausbildung-video-next grid size-11 place-items-center rounded-full bg-darkPrimary text-white"
              aria-label="Next video"
            >
              <ChevronRight size={21} />
            </button>
          </div>
        )}
      </div>

      <StatusMessage
        loading={loading}
        error={
          error
            ? "Failed to load Ausbildung videos."
            : ""
        }
        empty={!videos.length}
        emptyText="Ausbildung videos are not available."
        type="video"
      />

      {!loading &&
        !error &&
        videos.length > 0 && (
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl:
                ".ausbildung-video-prev",
              nextEl:
                ".ausbildung-video-next",
            }}
            spaceBetween={20}
            slidesPerView={1}
            watchOverflow
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="!pb-10"
          >
            {videos.map((video, index) => (
              <SwiperSlide
                key={
                  video?.id ||
                  video?.link ||
                  index
                }
                className="!h-auto"
              >
                <AusbildungVideoCard
                  video={video}
                  index={index}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
    </section>
  );
}