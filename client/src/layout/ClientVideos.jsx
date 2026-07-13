import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import axios from "axios";
import {
  ChevronLeft,
  ChevronRight,
  Loader2,
  Play,
  X,
} from "lucide-react";

const API_URL =
  "https://overseas.technocitysolutions.com/public/api/getHomeResponses";

const FALLBACK =
  'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="500">' +
  '<rect width="100%" height="100%" fill="%230f172a"/>' +
  '<text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" ' +
  'fill="%2394a3b8" font-size="22">Video</text></svg>';

const getWrappedIndex = (index, length) => {
  return ((index % length) + length) % length;
};

const getMediaUrl = (path, file) => {
  if (!file) return FALLBACK;

  if (
    file.startsWith("http://") ||
    file.startsWith("https://") ||
    file.startsWith("data:")
  ) {
    return file;
  }

  return `${path || ""}${file}`;
};

const ClientVideos = () => {
  const [videos, setVideos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [slideDirection, setSlideDirection] =
    useState("next");

  const [selectedVideo, setSelectedVideo] =
    useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dragStartXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const autoplayRef = useRef(null);

  const totalVideos = videos.length;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("api", "overseas@Miak2023");
        formData.append("uid", "0");

        const response = await axios.post(
          API_URL,
          formData
        );

        const data = response?.data || {};
        const shortsPath = data?.shorts_path || "";

        const shorts = Array.isArray(data?.shorts)
          ? data.shorts
          : [];

        const formattedVideos = shorts
          .filter(
            (item) =>
              String(item?.status) === "1" &&
              item?.link
          )
          .map((item) => ({
            id: item.id,
            type: item.type || "",
            countryId: item.country || "",
            title:
              item.title || "Student Departure",
            destination:
              item.title ||
              "International Destination",
            videoUrl: item.link,

            poster: getMediaUrl(
              shortsPath,
              item.thumb || item.placeholder
            ),

            placeholder: getMediaUrl(
              shortsPath,
              item.placeholder
            ),
          }));

        setVideos(formattedVideos);
        setActiveIndex(0);
      } catch (err) {
        console.error(
          "Unable to fetch departure videos:",
          err
        );

        setError(
          "Unable to load departure videos. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    if (!selectedVideo) return undefined;

    const previousBodyOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedVideo(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        previousBodyOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [selectedVideo]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();

    if (totalVideos <= 1 || selectedVideo) {
      return;
    }

    autoplayRef.current = setInterval(() => {
      setSlideDirection("next");

      setActiveIndex((current) =>
        getWrappedIndex(
          current + 1,
          totalVideos
        )
      );
    }, 4000);
  }, [
    selectedVideo,
    stopAutoplay,
    totalVideos,
  ]);

  useEffect(() => {
    startAutoplay();

    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  const goToPrevious = useCallback(() => {
    if (!totalVideos) return;

    setSlideDirection("previous");

    setActiveIndex((current) =>
      getWrappedIndex(
        current - 1,
        totalVideos
      )
    );

    startAutoplay();
  }, [startAutoplay, totalVideos]);

  const goToNext = useCallback(() => {
    if (!totalVideos) return;

    setSlideDirection("next");

    setActiveIndex((current) =>
      getWrappedIndex(
        current + 1,
        totalVideos
      )
    );

    startAutoplay();
  }, [startAutoplay, totalVideos]);

  const handleDragStart = useCallback(
    (clientX) => {
      isDraggingRef.current = true;
      dragStartXRef.current = clientX;

      setDragOffset(0);
      stopAutoplay();
    },
    [stopAutoplay]
  );

  const handleDragMove = useCallback(
    (clientX) => {
      if (!isDraggingRef.current) return;

      setDragOffset(
        clientX - dragStartXRef.current
      );
    },
    []
  );

  const handleDragEnd = useCallback(() => {
    if (!isDraggingRef.current) return;

    if (dragOffset > 60) {
      setSlideDirection("previous");

      setActiveIndex((current) =>
        getWrappedIndex(
          current - 1,
          totalVideos
        )
      );
    } else if (dragOffset < -60) {
      setSlideDirection("next");

      setActiveIndex((current) =>
        getWrappedIndex(
          current + 1,
          totalVideos
        )
      );
    }

    isDraggingRef.current = false;

    setDragOffset(0);
    startAutoplay();
  }, [
    dragOffset,
    startAutoplay,
    totalVideos,
  ]);

  const visibleCards = useMemo(() => {
    if (!totalVideos) return [];

    if (totalVideos === 1) {
      return [
        {
          position: "center",
          video: videos[0],
        },
      ];
    }

    return [
      {
        position: "left",
        video:
          videos[
            getWrappedIndex(
              activeIndex - 1,
              totalVideos
            )
          ],
      },
      {
        position: "center",
        video: videos[activeIndex],
      },
      {
        position: "right",
        video:
          videos[
            getWrappedIndex(
              activeIndex + 1,
              totalVideos
            )
          ],
      },
    ];
  }, [activeIndex, totalVideos, videos]);

  const openVideo = (video) => {
    stopAutoplay();
    setSelectedVideo(video);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-[420px] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-white">
          <Loader2 className="h-9 w-9 animate-spin text-primary" />

          <p className="text-sm text-slate-300">
            Loading departure videos...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[420px] w-full items-center justify-center px-5 text-center">
        <p className="rounded-xl border border-red-400/20 bg-red-500/10 px-5 py-4 text-sm text-red-200">
          {error}
        </p>
      </div>
    );
  }

  if (!totalVideos) {
    return (
      <div className="flex min-h-[420px] w-full items-center justify-center">
        <p className="text-slate-300">
          No departure videos are available.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="relative mx-auto w-full max-w-[920px] overflow-hidden"
        onMouseEnter={stopAutoplay}
        onMouseLeave={() => {
          handleDragEnd();
          startAutoplay();
        }}
      >
        <div
          className="relative h-[390px] w-full overflow-hidden sm:h-[480px] lg:h-[570px]"
          onMouseDown={(event) =>
            handleDragStart(event.clientX)
          }
          onMouseMove={(event) =>
            handleDragMove(event.clientX)
          }
          onMouseUp={handleDragEnd}
          onTouchStart={(event) =>
            handleDragStart(
              event.touches[0].clientX
            )
          }
          onTouchMove={(event) =>
            handleDragMove(
              event.touches[0].clientX
            )
          }
          onTouchEnd={handleDragEnd}
          style={{
            userSelect: "none",
            touchAction: "pan-y",
            perspective: "1400px",
          }}
        >
          {/* Decorative glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[65%] w-[55%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[90px]" />

          <div className="pointer-events-none absolute bottom-[10%] left-1/2 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent shadow-[0_0_30px_rgba(34,211,238,0.8)]" />

          {visibleCards.map(
            ({ position, video }) => {
              const isCenter =
                position === "center";

              const isLeft =
                position === "left";

              const leftPosition = isCenter
                ? "50%"
                : isLeft
                  ? "22%"
                  : "78%";

              const rotationY = isCenter
                ? 0
                : isLeft
                  ? 16
                  : -16;

              const rotationZ = isCenter
                ? 0
                : isLeft
                  ? -2
                  : 2;

              return (
                <article
                  key={`${position}-${video.id}-${activeIndex}`}
                  className={[
                    "video-card absolute top-1/2 overflow-hidden rounded-[28px]",
                    "border bg-slate-900",
                    "transition-[left,transform,opacity,filter] duration-700",
                    "ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isCenter
                      ? "z-30 border-cyan-300/90 opacity-100"
                      : "z-20 border-fuchsia-400/50 opacity-70",
                    slideDirection === "next"
                      ? "animate-card-next"
                      : "animate-card-previous",
                  ].join(" ")}
                  style={{
                    left: leftPosition,

                    width: isCenter
                      ? "clamp(210px,36vw,340px)"
                      : "clamp(175px,29vw,285px)",

                    height: isCenter
                      ? "clamp(340px,52vw,520px)"
                      : "clamp(300px,46vw,460px)",

                    transform: `
                      translate(
                        calc(-50% + ${
                          dragOffset *
                          (isCenter ? 0.18 : 0.1)
                        }px),
                        -50%
                      )
                      scale(${isCenter ? 1 : 0.88})
                      rotateY(${rotationY}deg)
                      rotateZ(${rotationZ}deg)
                    `,

                    transformOrigin: "center",

                    boxShadow: isCenter
                      ? `
                        0 30px 90px rgba(0,0,0,0.6),
                        0 0 35px rgba(34,211,238,0.35),
                        0 0 65px rgba(59,130,246,0.2)
                      `
                      : `
                        0 22px 65px rgba(0,0,0,0.5),
                        0 0 28px rgba(217,70,239,0.18)
                      `,

                    filter: isCenter
                      ? "brightness(1)"
                      : "brightness(0.72) saturate(0.85)",

                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="pointer-events-none absolute inset-0 z-20 rounded-[28px] border border-white/10" />

                  <div
                    className={[
                      "pointer-events-none absolute -inset-[2px] z-0 rounded-[30px]",
                      "bg-gradient-to-br from-cyan-400/50 via-transparent to-fuchsia-500/50",
                      isCenter
                        ? "opacity-100"
                        : "opacity-40",
                    ].join(" ")}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      openVideo(video)
                    }
                    className="group relative z-10 block h-full w-full overflow-hidden rounded-[26px]"
                  >
                    <img
                      src={video.poster}
                      alt={`${video.title} departure video`}
                      draggable={false}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-1000 ease-out group-hover:scale-110"
                      onError={(event) => {
                        const image =
                          event.currentTarget;

                        if (
                          video.placeholder &&
                          image.src !==
                            video.placeholder
                        ) {
                          image.src =
                            video.placeholder;

                          return;
                        }

                        image.src = FALLBACK;
                      }}
                    />

                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30" />

                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-fuchsia-500/10 opacity-0 transition duration-500 group-hover:opacity-100" />

                    {/* Moving shine */}
                    <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 rotate-[18deg] bg-gradient-to-r from-transparent via-white/25 to-transparent blur-sm transition-all duration-1000 group-hover:left-[130%]" />

                    {/* Play button */}
                    <span
                      className={[
                        "absolute left-1/2 top-1/2",
                        "flex -translate-x-1/2 -translate-y-1/2",
                        "items-center justify-center rounded-full",
                        "border border-white/60",
                        "bg-secondary text-white",
                        "shadow-[0_15px_45px_rgba(0,0,0,0.45)]",
                        "backdrop-blur-md",
                        "transition duration-500",
                        "group-hover:scale-110",
                        "group-hover:border-secondary",
                        "group-hover:bg-cyan-500/20",
                        isCenter
                          ? "h-20 w-20 sm:h-24 sm:w-24"
                          : "h-14 w-14 sm:h-16 sm:w-16",
                      ].join(" ")}
                    >
                      <span className="absolute inset-0 animate-ping rounded-full border border-white/25 opacity-40" />

                      <Play
                        className="relative z-10 ml-1"
                        fill="currentColor"
                        size={isCenter ? 32 : 22}
                      />
                    </span>

                    {/* Small video badge */}
                    <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/90 backdrop-blur-md">
                      Video
                    </span>
                  </button>
                </article>
              );
            }
          )}

          {totalVideos > 1 && (
            <>
              <button
                type="button"
                onClick={goToPrevious}
                aria-label="Previous departure video"
                className="absolute left-2 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-primary text-white shadow-xl backdrop-blur-xl transition duration-300 hover:scale-110 hover:border-cyan-400 hover:bg-cyan-500/15 hover:text-cyan-300 sm:left-4 sm:h-12 sm:w-12"
              >
                <ChevronLeft size={22} />
              </button>

              <button
                type="button"
                onClick={goToNext}
                aria-label="Next departure video"
                className="absolute right-2 top-1/2 z-40 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-primary text-white shadow-xl backdrop-blur-xl transition duration-300 hover:scale-110 hover:border-fuchsia-400 hover:bg-fuchsia-500/15 hover:text-fuchsia-300 sm:right-4 sm:h-12 sm:w-12"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
        </div>

        {totalVideos > 1 && (
          <div className="flex items-center justify-center gap-2 pb-3">
            {videos.map((video, index) => (
              <button
                key={video.id}
                type="button"
                aria-label={`Show departure video ${
                  index + 1
                }`}
                onClick={() => {
                  setSlideDirection(
                    index > activeIndex
                      ? "next"
                      : "previous"
                  );

                  setActiveIndex(index);
                  startAutoplay();
                }}
                className={`rounded-full transition-all duration-500 ${
                  index === activeIndex
                    ? "h-2.5 w-8 bg-gradient-to-r from-primary to-cyan-400 shadow-[0_0_16px_rgba(34,211,238,0.55)]"
                    : "h-2.5 w-2.5 bg-white/25 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeVideo();
            }
          }}
        >
          <div className="relative w-full max-w-[430px] animate-modal-open overflow-hidden rounded-3xl border border-white/15 bg-black shadow-[0_30px_120px_rgba(0,0,0,0.8)]">
            <button
              type="button"
              onClick={closeVideo}
              aria-label="Close video"
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/65 text-white backdrop-blur-md transition hover:rotate-90 hover:bg-primary"
            >
              <X size={21} />
            </button>

            <video
              key={selectedVideo.videoUrl}
              src={selectedVideo.videoUrl}
              poster={selectedVideo.poster}
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="max-h-[88vh] w-full bg-black object-contain"
            >
              Your browser does not support video playback.
            </video>
          </div>
        </div>
      )}

      <style>{`
        @keyframes cardNext {
          0% {
            opacity: 0.45;
            transform: translate(-50%, -50%)
              scale(0.82)
              rotateY(-20deg);
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes cardPrevious {
          0% {
            opacity: 0.45;
            transform: translate(-50%, -50%)
              scale(0.82)
              rotateY(20deg);
          }

          100% {
            opacity: 1;
          }
        }

        @keyframes modalOpen {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }

          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .animate-card-next {
          animation: cardNext 0.65s
            cubic-bezier(0.22, 1, 0.36, 1);
        }

        .animate-card-previous {
          animation: cardPrevious 0.65s
            cubic-bezier(0.22, 1, 0.36, 1);
        }

        .animate-modal-open {
          animation: modalOpen 0.35s
            cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-card-next,
          .animate-card-previous,
          .animate-modal-open {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default ClientVideos;