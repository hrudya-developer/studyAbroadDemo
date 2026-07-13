import React, { useEffect, useState } from "react";
import axios from "axios";
import ClientVideos from "./ClientVideos";
import {
  Loader2,
  Plane,
  Play,
  SquarePlay,
  X,
} from "lucide-react";

const API_URL =
  "https://overseas.technocitysolutions.com/public/api/getHomeResponses";

const FALLBACK =
  "https://placehold.co/400x600/0f172a/94a3b8?text=Video";

const getMediaUrl = (path, file) => {
  if (!file) return FALLBACK;

  if (
    file.startsWith("http://") ||
    file.startsWith("https://")
  ) {
    return file;
  }

  return `${path || ""}${file}`;
};

const GridBackground = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.clientX - window.innerWidth / 2;
      const y = event.clientY - window.innerHeight / 2;

      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute -inset-10 overflow-hidden transition-transform duration-300 ease-out"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(255,255,255,0.07) 1px,
            transparent 1px
          ),
          linear-gradient(
            to bottom,
            rgba(255,255,255,0.07) 1px,
            transparent 1px
          )
        `,
        backgroundSize: "40px 40px",
        animation: "moveGrid 20s linear infinite",
        transform: `translate(
          ${mousePosition.x / 35}px,
          ${mousePosition.y / 35}px
        )`,
      }}
    >
      <div className="absolute left-[65%] top-1/2 h-[55vmin] w-[55vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/15 blur-[140px]" />

      <div className="absolute left-[35%] top-1/2 h-[45vmin] w-[45vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[140px]" />

      <style>{`
        @keyframes moveGrid {
          from {
            background-position: 0 0;
          }

          to {
            background-position: 80px 80px;
          }
        }
      `}</style>
    </div>
  );
};

export default function GridBackgroundView() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] =
    useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);

        const formData = new FormData();
        formData.append("api", "overseas@Miak2023");
        formData.append("uid", "0");

        const response = await axios.post(
          API_URL,
          formData
        );

        const data = response?.data || {};
        const shortsPath = data?.shorts_path || "";

        const formattedVideos = Array.isArray(
          data?.shorts
        )
          ? data.shorts
              .filter(
                (item) =>
                  String(item.status) === "1" &&
                  item.link
              )
              .map((item) => ({
                id: item.id,
                title:
                  item.title || "Departure Story",
                destination:
                  item.title || "Study Abroad",
                videoUrl: item.link,
                poster: getMediaUrl(
                  shortsPath,
                  item.thumb || item.placeholder
                ),
                placeholder: getMediaUrl(
                  shortsPath,
                  item.placeholder
                ),
              }))
          : [];

        setVideos(formattedVideos);
      } catch (error) {
        console.error(
          "Unable to fetch departure videos:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    if (!selectedVideo) return;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [selectedVideo]);

  const recentVideos = videos.slice(0, 4);

  const scrollToVideos = () => {
    document
      .getElementById("departure-videos")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
  };

  return (
    <section className="relative mx-auto w-full max-w-9xl overflow-hidden bg-slate-950">
      <GridBackground />

      <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent" />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-950/60" />

      <div className="relative z-10 mx-auto grid min-h-[720px] w-full grid-cols-1 items-center gap-8 px-5 py-14 sm:px-8 md:py-16 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)] lg:gap-6 lg:px-10 xl:gap-10 xl:px-14">
        {/* Left content */}
        <div className="mx-auto w-full max-w-xl text-center text-white lg:mx-0 lg:text-left">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-100 backdrop-blur-md sm:text-sm">
            <Plane size={16} className="text-primary" />
            Departure Stories
          </div>

          <h2 className="mt-6 text-4xl font-bold leading-[1.08] sm:text-4xl xl:text-5xl">
            Departures Today,
            <span className="mt-2 block bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
              Dreams Taking Off
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-slate-300 sm:text-base lg:mx-0 lg:text-lg">
            Watch our students take the next big step
            toward their future. New destinations, new
            beginnings, and endless possibilities.
          </p>

          <button
            type="button"
            onClick={scrollToVideos}
            className="mx-auto mt-7 inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-primary to-blue-600 px-6 py-3 font-semibold text-white transition duration-300 hover:-translate-y-1 lg:mx-0"
          >
            <SquarePlay size={21} />
            Watch Departure Videos
          </button>

          {/* Recent departure videos */}
          <div className="mt-8 hidden md:block">
            <p className="mb-3 text-xs uppercase tracking-[0.18em] text-slate-400">
              Recent departures
            </p>

            {loading ? (
              <div className="flex justify-center py-5 lg:justify-start">
                <Loader2 className="animate-spin text-primary" />
              </div>
            ) : (
              <div className="grid grid-cols-4 gap-2 sm:gap-3">
                {recentVideos.map((video) => (
                  <button
                    key={video.id}
                    type="button"
                    onClick={() =>
                      setSelectedVideo(video)
                    }
                    aria-label={`Play ${video.title} video`}
                    className="group relative aspect-[4/5] min-w-0 overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-primary"
                  >
                    <img
                      src={video.poster}
                      alt={video.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      onError={(event) => {
                        if (
                          video.placeholder &&
                          event.currentTarget.src !==
                            video.placeholder
                        ) {
                          event.currentTarget.src =
                            video.placeholder;
                        } else {
                          event.currentTarget.src =
                            FALLBACK;
                        }
                      }}
                    />

                    <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    <span className="absolute left-1/2 top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-black/40 text-white backdrop-blur-md transition group-hover:scale-110 sm:h-10 sm:w-10">
                      <Play
                        size={16}
                        className="ml-0.5"
                        fill="currentColor"
                      />
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main carousel */}
        <div
          id="departure-videos"
          className="min-w-0 w-full overflow-hidden"
        >
          <ClientVideos
            videos={videos}
            onVideoClick={setSelectedVideo}
          />
        </div>
      </div>

      {/* Video modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setSelectedVideo(null);
            }
          }}
        >
          <div className="relative w-full max-w-[430px] overflow-hidden rounded-2xl border border-white/15 bg-black shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedVideo(null)}
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/70 text-white transition hover:bg-primary"
              aria-label="Close video"
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
            />
          </div>
        </div>
      )}
    </section>
  );
}