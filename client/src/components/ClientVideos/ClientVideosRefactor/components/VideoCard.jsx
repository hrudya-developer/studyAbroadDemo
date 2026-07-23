import { Play, Volume2, VolumeX } from "lucide-react";

const VideoCard = ({
  position,
  video,
  videoIndex,
  dragOffset,
  previewMuted,
  previewVideoRef,
  onOpen,
  onToggleSound,
  onImageError,
  onPreviewError,
}) => {
  const isCenter = position === "center";
  const isLeft = position === "left";

  const left = isCenter ? "50%" : isLeft ? "20%" : "80%";
  const rotateY = isCenter ? 0 : isLeft ? 12 : -12;
  const rotateZ = isCenter ? 0 : isLeft ? -1.2 : 1.2;
  const drag = dragOffset * (isCenter ? 0.22 : 0.1);

  return (
    <article
      className={`absolute top-1/2 overflow-hidden rounded-[28px] bg-black
        transition-[left,transform,opacity,box-shadow] duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          isCenter
            ? "z-30 border border-cyan-200/80 opacity-100"
            : "z-20 border border-white/15 opacity-75"
        }`}
      style={{
        left,
        width: isCenter
          ? "clamp(265px,34vw,390px)"
          : "clamp(185px,25vw,285px)",
        height: isCenter
          ? "clamp(420px,54vw,610px)"
          : "clamp(320px,42vw,455px)",
        transform: `translate(calc(-50% + ${drag}px), -50%) scale(${isCenter ? 1 : 0.88}) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) translateZ(0)`,
        transformOrigin: "center",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden",
        boxShadow: isCenter
          ? "0 25px 65px rgba(0,0,0,.52), 0 0 22px rgba(34,211,238,.22)"
          : "0 18px 45px rgba(0,0,0,.42)",
      }}
    >
      <button
        type="button"
        onClick={() => onOpen(video)}
        aria-label={`Play ${video.title}`}
        className="group relative block h-full w-full overflow-hidden rounded-[27px] bg-black text-left"
      >
        {isCenter ? (
          <>
            <video
              ref={previewVideoRef}
              key={video.videoUrl}
              src={video.videoUrl}
              poster={video.poster}
              muted={previewMuted}
              autoPlay
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              onError={onPreviewError}
              className="absolute inset-0 h-full w-full bg-black object-cover object-center [transform:translateZ(0)]"
            />
            <img
              data-video-fallback
              src={video.poster}
              alt=""
              draggable={false}
              className="absolute inset-0 hidden h-full w-full bg-black object-cover object-center"
              onError={(event) =>
                onImageError(event, video.placeholder)
              }
            />
          </>
        ) : (
          <img
            src={video.poster}
            alt={`${video.title} video`}
            draggable={false}
            loading="eager"
            decoding="async"
            className="absolute inset-0 h-full w-full bg-black object-cover object-center [transform:translateZ(0)]"
            onError={(event) =>
              onImageError(event, video.placeholder)
            }
          />
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="pointer-events-none absolute inset-0 rounded-[27px] border border-white/10" />

        <span
          className={`absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2
            items-center justify-center rounded-full border border-white/70
            bg-secondary/90 text-white shadow-[0_12px_35px_rgba(0,0,0,.38)]
            transition-all duration-300 group-hover:scale-110 group-hover:bg-primary
            ${isCenter ? "h-16 w-16 sm:h-20 sm:w-20" : "h-12 w-12 sm:h-14 sm:w-14"}`}
        >
          <Play
            className="ml-1"
            fill="currentColor"
            size={isCenter ? 28 : 20}
          />
        </span>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
          <p
            className={`line-clamp-2 font-semibold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,.85)]
              ${isCenter ? "text-base sm:text-lg" : "text-xs sm:text-sm"}`}
          >
            {video.title}
          </p>
        </div>

        <span className="absolute right-3 top-3 rounded-full border border-white/25 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[.14em] text-white shadow-lg">
          Video
        </span>

        {isCenter && (
          <span
            role="button"
            tabIndex={0}
            aria-label={previewMuted ? "Enable preview sound" : "Mute preview sound"}
            onClick={onToggleSound}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                onToggleSound(event);
              }
            }}
            className="absolute left-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white shadow-lg transition hover:bg-black/75"
          >
            {previewMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </span>
        )}
      </button>
    </article>
  );
};

export default VideoCard;
