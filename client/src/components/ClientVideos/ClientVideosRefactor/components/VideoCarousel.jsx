import { ChevronLeft, ChevronRight } from "lucide-react";
import VideoCard from "./VideoCard";

const VideoCarousel = ({
  videos,
  controller,
  previewMuted,
  previewVideoRef,
  onOpen,
  onToggleSound,
  onImageError,
  onPreviewError,
}) => {
  const {
    activeIndex,
    dragOffset,
    visibleCards,
    goToIndex,
    goToPrevious,
    goToNext,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    startAutoplay,
    stopAutoplay,
    isDraggingRef,
  } = controller;

  return (
    <div
      className="relative mx-auto w-full max-w-[1100px] overflow-hidden px-2 py-5 sm:px-4 sm:py-8 lg:py-10"
      onMouseEnter={stopAutoplay}
      onMouseLeave={() =>
        isDraggingRef.current ? handleDragEnd() : startAutoplay()
      }
    >
      <div
        className="relative h-[500px] w-full cursor-grab overflow-hidden active:cursor-grabbing sm:h-[620px] lg:h-[680px]"
        onMouseDown={(event) => {
          event.preventDefault();
          handleDragStart(event.clientX);
        }}
        onMouseMove={(event) => handleDragMove(event.clientX)}
        onMouseUp={handleDragEnd}
        onTouchStart={(event) =>
          handleDragStart(event.touches[0].clientX)
        }
        onTouchMove={(event) =>
          handleDragMove(event.touches[0].clientX)
        }
        onTouchEnd={handleDragEnd}
        onTouchCancel={handleDragEnd}
        style={{
          userSelect: "none",
          touchAction: "pan-y",
          perspective: "1500px",
        }}
      >
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[58%] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.07] blur-[100px]" />
        <div className="pointer-events-none absolute bottom-[6%] left-1/2 h-px w-[65%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent shadow-[0_0_20px_rgba(34,211,238,.35)]" />

        {visibleCards.map((card) => (
          <VideoCard
            key={`${card.position}-${card.video.id}-${card.videoIndex}`}
            {...card}
            dragOffset={dragOffset}
            previewMuted={previewMuted}
            previewVideoRef={previewVideoRef}
            onOpen={onOpen}
            onToggleSound={onToggleSound}
            onImageError={onImageError}
            onPreviewError={onPreviewError}
          />
        ))}

        {videos.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              aria-label="Previous departure video"
              className="absolute left-2 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-primary text-white shadow-xl transition duration-300 hover:scale-110 hover:bg-secondary sm:left-5 sm:h-12 sm:w-12"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next departure video"
              className="absolute right-2 top-1/2 z-40 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-primary text-white shadow-xl transition duration-300 hover:scale-110 hover:bg-secondary sm:right-5 sm:h-12 sm:w-12"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {videos.length > 1 && (
        <div className="mt-3 flex max-w-full items-center justify-center gap-2 overflow-hidden px-5 pb-3">
          {videos.map((video, index) => (
            <button
              key={`${video.id}-${index}`}
              type="button"
              aria-label={`Show departure video ${index + 1}`}
              onClick={() => goToIndex(index)}
              className={`shrink-0 rounded-full transition-all duration-500 ${
                index === activeIndex
                  ? "h-2.5 w-9 bg-gradient-to-r from-primary to-cyan-400 shadow-[0_0_14px_rgba(34,211,238,.45)]"
                  : "h-2.5 w-2.5 bg-white/25 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoCarousel;
