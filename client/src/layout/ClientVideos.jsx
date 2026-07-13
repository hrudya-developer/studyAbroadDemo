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
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

const API_URL =
  "https://overseas.technocitysolutions.com/public/api/getHomeResponses";

const AUTOPLAY_DELAY = 7000;
const DRAG_THRESHOLD = 55;

const FALLBACK =
  'data:image/svg+xml;charset=UTF-8,' +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="720" height="1280">
      <defs>
        <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f172a"/>
          <stop offset="100%" stop-color="#020617"/>
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#background)"/>

      <circle
        cx="360"
        cy="575"
        r="92"
        fill="#0466AF"
        opacity="0.95"
      />

      <polygon
        points="335,530 335,620 410,575"
        fill="#ffffff"
      />

      <text
        x="50%"
        y="720"
        dominant-baseline="middle"
        text-anchor="middle"
        fill="#cbd5e1"
        font-family="Arial, sans-serif"
        font-size="38"
      >
        Departure Video
      </text>
    </svg>
  `);

const getWrappedIndex = (index, length) => {
  if (!length) return 0;

  return ((index % length) + length) % length;
};

const getMediaUrl = (path, file) => {
  if (!file) return "";

  const value = String(file).trim();

  if (
    value.startsWith("http://") ||
    value.startsWith("https://") ||
    value.startsWith("data:") ||
    value.startsWith("blob:")
  ) {
    return value;
  }

  const normalizedPath = path
    ? path.endsWith("/")
      ? path
      : `${path}/`
    : "";

  return `${normalizedPath}${value.replace(/^\/+/, "")}`;
};

const ClientVideos = () => {
  const [videos, setVideos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const [selectedVideo, setSelectedVideo] = useState(null);
  const [previewMuted, setPreviewMuted] = useState(true);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const dragStartXRef = useRef(0);
  const dragOffsetRef = useRef(0);
  const isDraggingRef = useRef(false);
  const autoplayRef = useRef(null);
  const previewVideoRef = useRef(null);

  const totalVideos = videos.length;

  /*
   * Fetch video data.
   */
  useEffect(() => {
    const controller = new AbortController();

    const fetchVideos = async () => {
      try {
        setLoading(true);
        setError("");

        const formData = new FormData();

        formData.append("api", "overseas@Miak2023");
        formData.append("uid", "0");

        const response = await axios.post(API_URL, formData, {
          signal: controller.signal,
        });

        const responseData = response?.data ?? {};
        const shortsPath = responseData?.shorts_path ?? "";

        const shorts = Array.isArray(responseData?.shorts)
          ? responseData.shorts
          : [];

        const formattedVideos = shorts
          .filter((item) => {
            const isActive = String(item?.status) === "1";
            const hasVideo = Boolean(item?.link);

            return isActive && hasVideo;
          })
          .map((item, index) => {
            const posterFile =
              item?.thumb ||
              item?.thumbnail ||
              item?.placeholder ||
              "";

            const placeholderFile =
              item?.placeholder || item?.thumb || "";

            return {
              id: item?.id ?? `video-${index}`,
              type: item?.type ?? "",
              countryId: item?.country ?? "",

              title:
                item?.title?.trim() ||
                "Student Departure",

              destination:
                item?.destination?.trim() ||
                item?.title?.trim() ||
                "International Destination",

              videoUrl: getMediaUrl("", item?.link),

              poster:
                getMediaUrl(shortsPath, posterFile) ||
                FALLBACK,

              placeholder:
                getMediaUrl(
                  shortsPath,
                  placeholderFile
                ) || FALLBACK,
            };
          });

        setVideos(formattedVideos);
        setActiveIndex(0);
      } catch (requestError) {
        if (
          requestError?.name === "CanceledError" ||
          requestError?.name === "AbortError" ||
          requestError?.code === "ERR_CANCELED"
        ) {
          return;
        }

        console.error(
          "Unable to fetch departure videos:",
          requestError
        );

        setError(
          "Unable to load departure videos. Please try again later."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchVideos();

    return () => {
      controller.abort();
    };
  }, []);

  /*
   * Lock document scrolling when modal is open.
   */
  useEffect(() => {
    if (!selectedVideo) return undefined;

    const previousBodyOverflow =
      document.body.style.overflow;

    const previousHtmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedVideo(null);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow =
        previousBodyOverflow;

      document.documentElement.style.overflow =
        previousHtmlOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [selectedVideo]);

  /*
   * Try to play the active preview whenever the active card changes.
   */
  useEffect(() => {
    const videoElement = previewVideoRef.current;

    if (!videoElement || selectedVideo) return;

    videoElement.currentTime = 0;

    const playPromise = videoElement.play();

    if (playPromise?.catch) {
      playPromise.catch(() => {
        // Browser may block autoplay until interaction.
      });
    }
  }, [activeIndex, selectedVideo]);

  const stopAutoplay = useCallback(() => {
    if (!autoplayRef.current) return;

    window.clearInterval(autoplayRef.current);
    autoplayRef.current = null;
  }, []);

  const startAutoplay = useCallback(() => {
    stopAutoplay();

    if (
      totalVideos <= 1 ||
      selectedVideo ||
      document.hidden
    ) {
      return;
    }

    autoplayRef.current = window.setInterval(() => {
      setActiveIndex((currentIndex) =>
        getWrappedIndex(
          currentIndex + 1,
          totalVideos
        )
      );
    }, AUTOPLAY_DELAY);
  }, [selectedVideo, stopAutoplay, totalVideos]);

  useEffect(() => {
    startAutoplay();

    return stopAutoplay;
  }, [startAutoplay, stopAutoplay]);

  /*
   * Pause carousel autoplay when the browser tab is hidden.
   */
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [startAutoplay, stopAutoplay]);

  const goToIndex = useCallback(
    (index) => {
      if (!totalVideos) return;

      setActiveIndex(
        getWrappedIndex(index, totalVideos)
      );

      setDragOffset(0);
      dragOffsetRef.current = 0;

      startAutoplay();
    },
    [startAutoplay, totalVideos]
  );

  const goToPrevious = useCallback(() => {
    if (totalVideos <= 1) return;

    setActiveIndex((currentIndex) =>
      getWrappedIndex(
        currentIndex - 1,
        totalVideos
      )
    );

    setDragOffset(0);
    dragOffsetRef.current = 0;

    startAutoplay();
  }, [startAutoplay, totalVideos]);

  const goToNext = useCallback(() => {
    if (totalVideos <= 1) return;

    setActiveIndex((currentIndex) =>
      getWrappedIndex(
        currentIndex + 1,
        totalVideos
      )
    );

    setDragOffset(0);
    dragOffsetRef.current = 0;

    startAutoplay();
  }, [startAutoplay, totalVideos]);

  const handleDragStart = useCallback(
    (clientX) => {
      if (totalVideos <= 1) return;

      isDraggingRef.current = true;
      dragStartXRef.current = clientX;
      dragOffsetRef.current = 0;

      setDragOffset(0);
      stopAutoplay();
    },
    [stopAutoplay, totalVideos]
  );

  const handleDragMove = useCallback((clientX) => {
    if (!isDraggingRef.current) return;

    const newOffset =
      clientX - dragStartXRef.current;

    dragOffsetRef.current = newOffset;
    setDragOffset(newOffset);
  }, []);

  const handleDragEnd = useCallback(() => {
    if (!isDraggingRef.current) return;

    const finalOffset = dragOffsetRef.current;

    if (finalOffset > DRAG_THRESHOLD) {
      setActiveIndex((currentIndex) =>
        getWrappedIndex(
          currentIndex - 1,
          totalVideos
        )
      );
    } else if (
      finalOffset < -DRAG_THRESHOLD
    ) {
      setActiveIndex((currentIndex) =>
        getWrappedIndex(
          currentIndex + 1,
          totalVideos
        )
      );
    }

    isDraggingRef.current = false;
    dragOffsetRef.current = 0;

    setDragOffset(0);
    startAutoplay();
  }, [startAutoplay, totalVideos]);

  const visibleCards = useMemo(() => {
    if (!totalVideos) return [];

    if (totalVideos === 1) {
      return [
        {
          position: "center",
          video: videos[0],
          videoIndex: 0,
        },
      ];
    }

    const previousIndex = getWrappedIndex(
      activeIndex - 1,
      totalVideos
    );

    const nextIndex = getWrappedIndex(
      activeIndex + 1,
      totalVideos
    );

    return [
      {
        position: "left",
        video: videos[previousIndex],
        videoIndex: previousIndex,
      },
      {
        position: "center",
        video: videos[activeIndex],
        videoIndex: activeIndex,
      },
      {
        position: "right",
        video: videos[nextIndex],
        videoIndex: nextIndex,
      },
    ];
  }, [activeIndex, totalVideos, videos]);

  const openVideo = useCallback(
    (video) => {
      if (
        Math.abs(dragOffsetRef.current) > 6 ||
        isDraggingRef.current
      ) {
        return;
      }

      stopAutoplay();

      const previewElement = previewVideoRef.current;

      if (previewElement) {
        previewElement.pause();
      }

      setSelectedVideo(video);
    },
    [stopAutoplay]
  );

  const closeVideo = useCallback(() => {
    setSelectedVideo(null);
  }, []);

  const handleImageError = useCallback(
    (event, placeholder) => {
      const imageElement = event.currentTarget;

      if (
        placeholder &&
        placeholder !== imageElement.src &&
        imageElement.dataset.fallback !==
          "placeholder"
      ) {
        imageElement.dataset.fallback =
          "placeholder";

        imageElement.src = placeholder;
        return;
      }

      if (
        imageElement.dataset.fallback !== "final"
      ) {
        imageElement.dataset.fallback = "final";
        imageElement.src = FALLBACK;
      }
    },
    []
  );

  const handlePreviewVideoError = useCallback(
    (event) => {
      const videoElement = event.currentTarget;

      videoElement.style.display = "none";

      const fallbackImage =
        videoElement.parentElement?.querySelector(
          "[data-video-fallback]"
        );

      if (fallbackImage) {
        fallbackImage.style.display = "block";
      }
    },
    []
  );

  const togglePreviewSound = useCallback(
    (event) => {
      event.stopPropagation();

      setPreviewMuted((currentValue) => {
        const nextValue = !currentValue;

        if (previewVideoRef.current) {
          previewVideoRef.current.muted =
            nextValue;

          if (!nextValue) {
            previewVideoRef.current
              .play()
              .catch(() => {});
          }
        }

        return nextValue;
      });
    },
    []
  );

  if (loading) {
    return (
      <div className="flex min-h-[480px] w-full items-center justify-center px-5">
        <div className="flex flex-col items-center gap-3 text-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />

          <p className="text-sm font-medium text-slate-300">
            Loading departure videos...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[480px] w-full items-center justify-center px-5 text-center">
        <div className="max-w-md rounded-2xl border border-red-400/20 bg-red-500/10 px-6 py-5">
          <p className="text-sm leading-6 text-red-200">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!totalVideos) {
    return (
      <div className="flex min-h-[480px] w-full items-center justify-center px-5">
        <p className="text-center text-slate-300">
          No departure videos are currently
          available.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="relative mx-auto w-full max-w-[1100px] overflow-hidden px-2 py-5 sm:px-4 sm:py-8 lg:py-10"
        onMouseEnter={stopAutoplay}
        onMouseLeave={() => {
          if (isDraggingRef.current) {
            handleDragEnd();
          } else {
            startAutoplay();
          }
        }}
      >
        <div
          className="relative h-[500px] w-full cursor-grab overflow-hidden active:cursor-grabbing sm:h-[620px] lg:h-[680px]"
          onMouseDown={(event) => {
            event.preventDefault();
            handleDragStart(event.clientX);
          }}
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
          onTouchCancel={handleDragEnd}
          style={{
            userSelect: "none",
            touchAction: "pan-y",
            perspective: "1500px",
          }}
        >
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[58%] w-[56%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.07] blur-[100px]" />

          {/* Ground line */}
          <div className="pointer-events-none absolute bottom-[6%] left-1/2 h-px w-[65%] -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan-300/35 to-transparent shadow-[0_0_20px_rgba(34,211,238,0.35)]" />

          {visibleCards.map(
            ({
              position,
              video,
              videoIndex,
            }) => {
              const isCenter =
                position === "center";

              const isLeft = position === "left";

              const leftPosition = isCenter
                ? "50%"
                : isLeft
                  ? "20%"
                  : "80%";

              const rotationY = isCenter
                ? 0
                : isLeft
                  ? 12
                  : -12;

              const rotationZ = isCenter
                ? 0
                : isLeft
                  ? -1.2
                  : 1.2;

              const horizontalDrag =
                dragOffset *
                (isCenter ? 0.22 : 0.1);

              return (
                <article
                  key={`${position}-${video.id}-${videoIndex}`}
                  className={[
                    "absolute top-1/2 overflow-hidden",
                    "rounded-[28px] bg-black",
                    "transition-[left,transform,opacity,box-shadow]",
                    "duration-700",
                    "ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isCenter
                      ? "z-30 border border-cyan-200/80 opacity-100"
                      : "z-20 border border-white/15 opacity-75",
                  ].join(" ")}
                  style={{
                    left: leftPosition,

                    width: isCenter
                      ? "clamp(265px,34vw,390px)"
                      : "clamp(185px,25vw,285px)",

                    height: isCenter
                      ? "clamp(420px,54vw,610px)"
                      : "clamp(320px,42vw,455px)",

                    transform: `
                      translate(
                        calc(-50% + ${horizontalDrag}px),
                        -50%
                      )
                      scale(${isCenter ? 1 : 0.88})
                      rotateY(${rotationY}deg)
                      rotateZ(${rotationZ}deg)
                      translateZ(0)
                    `,

                    transformOrigin: "center",
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",

                    boxShadow: isCenter
                      ? `
                        0 25px 65px rgba(0,0,0,0.52),
                        0 0 22px rgba(34,211,238,0.22)
                      `
                      : `
                        0 18px 45px rgba(0,0,0,0.42)
                      `,
                  }}
                >
                  <button
                    type="button"
                    onClick={() => openVideo(video)}
                    aria-label={`Play ${video.title}`}
                    className="group relative block h-full w-full overflow-hidden rounded-[27px] bg-black text-left"
                  >
                    {isCenter ? (
                      <>
                        {/* Actual video preview for maximum clarity */}
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
                          onError={
                            handlePreviewVideoError
                          }
                          className="absolute inset-0 h-full w-full bg-black object-cover object-center [transform:translateZ(0)]"
                        />

                        {/* Used only if video preview fails */}
                        <img
                          data-video-fallback
                          src={video.poster}
                          alt=""
                          draggable={false}
                          className="absolute inset-0 hidden h-full w-full bg-black object-cover object-center"
                          onError={(event) =>
                            handleImageError(
                              event,
                              video.placeholder
                            )
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
                        className="absolute inset-0 h-full w-full bg-black object-cover object-center [image-rendering:auto] [transform:translateZ(0)]"
                        onError={(event) =>
                          handleImageError(
                            event,
                            video.placeholder
                          )
                        }
                      />
                    )}

                    {/* Very light gradient only for controls */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                    {/* Inner crisp border */}
                    <div className="pointer-events-none absolute inset-0 rounded-[27px] border border-white/10" />

                    {/* Play button */}
                    <span
                      className={[
                        "absolute left-1/2 top-1/2",
                        "flex -translate-x-1/2 -translate-y-1/2",
                        "items-center justify-center",
                        "rounded-full border border-white/70",
                        "bg-secondary/90 text-white",
                        "shadow-[0_12px_35px_rgba(0,0,0,0.38)]",
                        "transition-all duration-300",
                        "group-hover:scale-110",
                        "group-hover:bg-primary",
                        isCenter
                          ? "h-16 w-16 opacity-90 sm:h-20 sm:w-20"
                          : "h-12 w-12 sm:h-14 sm:w-14",
                      ].join(" ")}
                    >
                      <Play
                        className="ml-1"
                        fill="currentColor"
                        size={isCenter ? 28 : 20}
                      />
                    </span>

                    {/* Title */}
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                      <p
                        className={[
                          "line-clamp-2 font-semibold text-white",
                          "drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]",
                          isCenter
                            ? "text-base sm:text-lg"
                            : "text-xs sm:text-sm",
                        ].join(" ")}
                      >
                        {video.title}
                      </p>
                    </div>

                    {/* Video badge */}
                    <span className="absolute right-3 top-3 rounded-full border border-white/25 bg-black/45 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white shadow-lg">
                      Video
                    </span>

                    {/* Preview sound */}
                    {isCenter && (
                      <span
                        role="button"
                        tabIndex={0}
                        aria-label={
                          previewMuted
                            ? "Enable preview sound"
                            : "Mute preview sound"
                        }
                        onClick={togglePreviewSound}
                        onKeyDown={(event) => {
                          if (
                            event.key === "Enter" ||
                            event.key === " "
                          ) {
                            togglePreviewSound(event);
                          }
                        }}
                        className="absolute left-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/50 text-white shadow-lg transition hover:bg-black/75"
                      >
                        {previewMuted ? (
                          <VolumeX size={18} />
                        ) : (
                          <Volume2 size={18} />
                        )}
                      </span>
                    )}
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

        {totalVideos > 1 && (
          <div className="mt-3 flex max-w-full items-center justify-center gap-2 overflow-hidden px-5 pb-3">
            {videos.map((video, index) => (
              <button
                key={`${video.id}-${index}`}
                type="button"
                aria-label={`Show departure video ${
                  index + 1
                }`}
                onClick={() => goToIndex(index)}
                className={[
                  "shrink-0 rounded-full",
                  "transition-all duration-500",
                  index === activeIndex
                    ? "h-2.5 w-9 bg-gradient-to-r from-primary to-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.45)]"
                    : "h-2.5 w-2.5 bg-white/25 hover:bg-white/60",
                ].join(" ")}
              />
            ))}
          </div>
        )}
      </div>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedVideo.title} video player`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeVideo();
            }
          }}
        >
          <div className="video-modal relative w-full max-w-[470px] overflow-hidden rounded-[26px] border border-white/20 bg-black shadow-[0_30px_120px_rgba(0,0,0,0.9)]">
            <button
              type="button"
              onClick={closeVideo}
              aria-label="Close video"
              className="absolute right-3 top-3 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white shadow-xl backdrop-blur-md transition duration-300 hover:rotate-90 hover:bg-primary"
            >
              <X size={22} />
            </button>

            <video
              key={selectedVideo.videoUrl}
              src={selectedVideo.videoUrl}
              poster={selectedVideo.poster}
              controls
              autoPlay
              playsInline
              preload="auto"
              controlsList="nodownload"
              className="max-h-[90vh] min-h-[420px] w-full bg-black object-contain"
              onError={(event) => {
                console.error(
                  "Video playback failed:",
                  event
                );
              }}
            >
              Your browser does not support video
              playback.
            </video>
          </div>
        </div>
      )}

      <style>{`
        @keyframes clientVideoModalOpen {
          from {
            opacity: 0;
            transform: scale(0.94) translateY(16px);
          }

          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .video-modal {
          animation: clientVideoModalOpen 0.32s
            cubic-bezier(0.22, 1, 0.36, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          .video-modal {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default ClientVideos;