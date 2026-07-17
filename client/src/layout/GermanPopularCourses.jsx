import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Play,
  PlayCircle,
} from "lucide-react";

import axios from "axios";

import { fetchGermanPrograms } from "../redux/slices/germanProgramSlice";

import "swiper/css";
import "swiper/css/navigation";

const HOME_API_URL =
  "https://overseas.technocitysolutions.com/public/api/getHomeResponses";

const FALLBACK_IMAGE =
  "https://placehold.co/800x500?text=Medcity+German+Program";

const getSearchableProgramText = (item) => {
  return `
    ${item?.name || ""}
    ${item?.titleWhy || ""}
    ${item?.why || ""}
  `.toLowerCase();
};

const isAusbildungProgram = (item) => {
  return getSearchableProgramText(item).includes("ausbildung");
};

const buildImageUrl = (basePath, image) => {
  if (!image) return FALLBACK_IMAGE;

  if (
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  return `${basePath || ""}${image}`;
};

const getYouTubeVideoId = (url = "") => {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.hostname.includes("youtu.be")) {
      return parsedUrl.pathname.replace("/", "").split("?")[0];
    }

    if (
      parsedUrl.hostname.includes("youtube.com") ||
      parsedUrl.hostname.includes("youtube-nocookie.com")
    ) {
      if (parsedUrl.pathname.startsWith("/shorts/")) {
        return parsedUrl.pathname.split("/shorts/")[1]?.split("/")[0] || "";
      }

      if (parsedUrl.pathname.startsWith("/embed/")) {
        return parsedUrl.pathname.split("/embed/")[1]?.split("/")[0] || "";
      }

      return parsedUrl.searchParams.get("v") || "";
    }

    return "";
  } catch {
    return "";
  }
};

const getYouTubeThumbnail = (video) => {
  if (video?.thumbnailUrl) {
    return video.thumbnailUrl;
  }

  const videoId = getYouTubeVideoId(video?.link);

  if (!videoId) return FALLBACK_IMAGE;

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
};

const GermanPopularCourses = () => {
  const dispatch = useDispatch();

  const [cards, setCards] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [programsLoading, setProgramsLoading] = useState(true);
  const [programsError, setProgramsError] = useState("");

  const {
    youtube = [],
    loading: videosLoading = false,
    error: videosError = null,
  } = useSelector(
    (state) => state.germanProgramData || {}
  );

  useEffect(() => {
    const controller = new AbortController();

    const fetchHomeResponses = async () => {
      try {
        setProgramsLoading(true);
        setProgramsError("");

        const formData = new FormData();
        formData.append("api", "overseas@Miak2023");
        formData.append("uid", "0");

        const response = await axios.post(
          HOME_API_URL,
          formData,
          {
            headers: {
              Accept: "application/json",
            },
            signal: controller.signal,
          }
        );

        const programs = Array.isArray(
          response.data?.home_tile_new
        )
          ? response.data.home_tile_new
          : [];

        const sortedPrograms = [...programs].sort(
          (firstProgram, secondProgram) => {
            const firstIsAusbildung =
              isAusbildungProgram(firstProgram);

            const secondIsAusbildung =
              isAusbildungProgram(secondProgram);

            if (
              firstIsAusbildung &&
              !secondIsAusbildung
            ) {
              return -1;
            }

            if (
              !firstIsAusbildung &&
              secondIsAusbildung
            ) {
              return 1;
            }

            return 0;
          }
        );

        setCards(sortedPrograms);
        setImagePath(
          response.data?.hometile_image_path || ""
        );
      } catch (error) {
        if (
          error?.name === "CanceledError" ||
          error?.code === "ERR_CANCELED"
        ) {
          return;
        }

        console.error(
          "Home response error:",
          error.response?.data || error
        );

        setProgramsError(
          "Failed to load German programs."
        );
      } finally {
        if (!controller.signal.aborted) {
          setProgramsLoading(false);
        }
      }
    };

    fetchHomeResponses();

    return () => {
      controller.abort();
    };
  }, []);

  const ausbildungProgram = useMemo(() => {
    return (
      cards.find(isAusbildungProgram) ||
      cards[0] ||
      null
    );
  }, [cards]);

  useEffect(() => {
    if (!ausbildungProgram?.id) return;

    dispatch(
      fetchGermanPrograms({
        uid: 0,
        id: ausbildungProgram.id,
      })
    );
  }, [dispatch, ausbildungProgram?.id]);

  return (
    <section
      className="
        relative overflow-hidden
        bg-gradient-to-br
        from-slate-50 via-white to-blue-50
        py-14 sm:py-16 lg:py-20
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -left-24 top-20
          h-72 w-72 rounded-full
          bg-pink-100 blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-24 bottom-10
          h-72 w-72 rounded-full
          bg-blue-100 blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 opacity-[0.35]
          [background-image:radial-gradient(circle_at_1px_1px,rgba(99,26,51,0.12)_1px,transparent_0)]
          [background-size:24px_24px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-[8%] top-24
          h-24 w-24 rotate-12 rounded-[28px]
          border border-primary/10 bg-white/40
          shadow-[0_20px_50px_rgba(99,26,51,0.08)]
          backdrop-blur-sm
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute right-[7%] top-40
          h-16 w-16 -rotate-12 rounded-full
          border-[10px] border-secondary/10
        "
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="mb-10 flex flex-col items-center text-center sm:mb-12">
          <span
            className="
              mb-3 rounded-full
              bg-pink-100 px-5 py-2
              text-xs font-bold uppercase
              tracking-widest text-primary
            "
          >
            Explore Programs
          </span>

          <h2 className="text-3xl font-extrabold text-darkPrimary md:text-5xl">
            German Popular Courses
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
            Discover top German career pathways designed
            for study, work and international experience.
          </p>
        </header>

        {programsLoading && (
          <div className="flex justify-center py-16">
            <Loader2
              size={42}
              className="animate-spin text-darkPrimary"
            />
          </div>
        )}

        {!programsLoading && programsError && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-8 text-center">
            <p className="font-semibold text-red-600">
              {programsError}
            </p>
          </div>
        )}

        {!programsLoading &&
          !programsError &&
          cards.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-10 text-center">
              <p className="font-medium text-gray-500">
                No German programs found.
              </p>
            </div>
          )}

        {!programsLoading &&
          !programsError &&
          cards.length > 0 && (
            <div className="relative">
              <button
                type="button"
                aria-label="Previous German program"
                className="
                  german-program-prev
                  absolute -left-2 top-1/2 z-20
                  grid h-11 w-11
                  -translate-y-1/2
                  place-items-center rounded-full
                  border border-slate-100
                  bg-white text-darkPrimary
                  shadow-xl transition
                  hover:bg-darkPrimary hover:text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-40
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
                  grid h-11 w-11
                  -translate-y-1/2
                  place-items-center rounded-full
                  border border-slate-100
                  bg-white text-darkPrimary
                  shadow-xl transition
                  hover:bg-darkPrimary hover:text-white
                  disabled:cursor-not-allowed
                  disabled:opacity-40
                  md:-right-5
                "
              >
                <ChevronRight size={22} />
              </button>

              <Swiper
                key={cards
                  .map((item) => item.id)
                  .join("-")}
                modules={[Navigation]}
                navigation={{
                  prevEl: ".german-program-prev",
                  nextEl: ".german-program-next",
                }}
                loop={false}
                spaceBetween={24}
                slidesPerView={1}
                grabCursor
                watchOverflow
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                className="german-popular-courses !px-1 !pb-14"
              >
                {cards.map((item) => {
                  const mainImage = buildImageUrl(
                    imagePath,
                    item?.icon
                  );

                  const secondaryImage = buildImageUrl(
                    imagePath,
                    item?.image
                  );

                  return (
                    <SwiperSlide
                      key={item.id}
                      className="!h-auto py-2"
                    >
                      <article
                        className="
                          group flex h-full flex-col
                          overflow-hidden rounded-[28px]
                          border border-white/80
                          bg-white
                          shadow-[0_15px_40px_rgba(15,23,42,0.10)]
                          transition-all duration-300
                          hover:-translate-y-2
                          hover:shadow-[0_25px_60px_rgba(99,26,51,0.22)]
                        "
                      >
                        <div className="relative h-60 overflow-hidden bg-slate-100">
                          <img
                            src={mainImage}
                            alt={
                              item?.name ||
                              "German program"
                            }
                            loading="lazy"
                            className="
                              h-full w-full object-cover
                              transition duration-700
                              group-hover:scale-110
                            "
                            onError={(event) => {
                              event.currentTarget.onerror =
                                null;

                              event.currentTarget.src =
                                FALLBACK_IMAGE;
                            }}
                          />

                          <div
                            aria-hidden="true"
                            className="
                              absolute inset-0
                              bg-gradient-to-t
                              from-black/60
                              via-black/10
                              to-transparent
                            "
                          />

                          <div
                            className="
                              absolute left-5 top-5
                              max-w-[75%] truncate
                              rounded-full
                              bg-white/90
                              px-4 py-1.5
                              text-xs font-bold uppercase
                              tracking-wide text-darkPrimary
                              shadow-sm backdrop-blur
                            "
                            title={item?.name || "German Program"}
                          >
                            {item?.name || "German Program"}
                          </div>

                          {item?.image && (
                            <div
                              className="
                                absolute bottom-3 right-3
                                h-20 w-20
                                overflow-hidden rounded-2xl
                                border-4 border-white
                                bg-white shadow-2xl
                              "
                            >
                              <img
                                src={secondaryImage}
                                alt=""
                                loading="lazy"
                                className="h-full w-full object-cover"
                                onError={(event) => {
                                  event.currentTarget
                                    .parentElement?.remove();
                                }}
                              />
                            </div>
                          )}
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                          <h3 className="text-2xl font-extrabold text-slate-950">
                            {item?.name ||
                              "German Program"}
                          </h3>

                          {item?.titleWhy && (
                            <p
                              className="
                                mt-2 text-xs font-bold
                                uppercase tracking-widest
                                text-primary
                              "
                            >
                              {item.titleWhy}
                            </p>
                          )}

                          {item?.why && (
                            <p className="mt-4 line-clamp-4 text-sm leading-7 text-gray-600">
                              {item.why}
                            </p>
                          )}

                          <Link
                            to={`/germanPrograms/${item.id}`}
                            className="
                              mt-auto inline-flex w-fit
                              items-center gap-2
                              pt-6
                              text-sm font-bold
                              text-primary transition
                              hover:text-darkPrimary
                            "
                          >
                            Learn More

                            <ArrowRight
                              size={17}
                              className="
                                transition-transform
                                group-hover:translate-x-1
                              "
                            />
                          </Link>
                        </div>
                      </article>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          )}

        {/* Ausbildung video slider */}
        {!programsLoading &&
          !programsError &&
          ausbildungProgram && (
            <section
              aria-labelledby="ausbildung-videos-title"
              className="
                relative mt-10 overflow-hidden rounded-[32px]
                border border-slate-200/80
                bg-white/80 px-4 py-10
                shadow-[0_24px_70px_rgba(15,23,42,0.08)]
                backdrop-blur-xl
                sm:mt-14 sm:px-7 sm:py-12
                lg:px-9
              "
            >
              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute -right-14 -top-14
                  h-40 w-40 rounded-full border-[28px]
                  border-primary/5
                "
              />

              <div
                aria-hidden="true"
                className="
                  pointer-events-none absolute -bottom-16 -left-16
                  h-44 w-44 rotate-12 rounded-[42px]
                  bg-secondary/5
                "
              />

              <div
                className="
                  relative mb-8 flex flex-col gap-5
                  sm:flex-row
                  sm:items-end
                  sm:justify-between
                "
              >
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className="
                        grid h-11 w-11
                        place-items-center
                        rounded-xl bg-primary
                        text-white shadow-lg
                      "
                    >
                      <PlayCircle size={23} />
                    </div>

                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                      Watch and Explore
                    </span>
                  </div>

                  <h3
                    id="ausbildung-videos-title"
                    className="text-2xl font-extrabold text-black sm:text-3xl"
                  >
                    Ausbildung - Germany's Most In-Demand Career Path

                  </h3>

                  <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-600">
                    Watch useful videos about Ausbildung,
                    career opportunities and student life in
                    Germany.
                  </p>
                </div>

                {youtube.length > 1 && (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Previous Ausbildung video"
                      className="
                        ausbildung-video-prev
                        grid h-11 w-11
                        place-items-center rounded-full
                        border border-slate-200
                        bg-darkPrimary text-white
                        shadow-md transition
                        hover:bg-darkPrimary
                        hover:text-white
                        disabled:cursor-not-allowed
                        disabled:opacity-40 hover:cursor-pointer hover:bg-primary
                      "
                    >
                      <ChevronLeft size={21} />
                    </button>

                    <button
                      type="button"
                      aria-label="Next Ausbildung video"
                      className="
                        ausbildung-video-next
                        grid h-11 w-11
                        place-items-center rounded-full
                        border border-slate-200
                        bg-darkPrimary text-white
                        shadow-md transition
                        hover:bg-darkPrimary
                        hover:text-white
                        disabled:cursor-not-allowed
                        disabled:opacity-40 hover:cursor-pointer hover:bg-primary
                      "
                    >
                      <ChevronRight size={21} />
                    </button>
                  </div>
                )}
              </div>

              {videosLoading && (
                <div className="flex justify-center py-14">
                  <Loader2
                    size={38}
                    className="animate-spin text-primary"
                  />
                </div>
              )}

              {!videosLoading && videosError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-8 text-center">
                  <p className="font-semibold text-red-600">
                    Failed to load Ausbildung videos.
                  </p>
                </div>
              )}

              {!videosLoading &&
                !videosError &&
                youtube.length === 0 && (
                  <div
                    className="
                      rounded-3xl
                      border border-dashed
                      border-slate-300
                      bg-white px-6 py-12
                      text-center
                    "
                  >
                    <PlayCircle
                      size={44}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-4 font-semibold text-slate-500">
                      Ausbildung videos are not available.
                    </p>
                  </div>
                )}

              {!videosLoading &&
                !videosError &&
                youtube.length > 0 && (
                  <Swiper
                    key={`ausbildung-videos-${ausbildungProgram.id}`}
                    modules={[Navigation]}
                    navigation={{
                      prevEl:
                        ".ausbildung-video-prev",
                      nextEl:
                        ".ausbildung-video-next",
                    }}
                    loop={false}
                    grabCursor
                    watchOverflow
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                      640: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      1024: {
                        slidesPerView: 3,
                      },
                    }}
                    className="ausbildung-video-swiper !overflow-hidden !pb-10"
                  >
                    {youtube.map((video, index) => {
                      const thumbnail =
                        getYouTubeThumbnail(video);

                      return (
                        <SwiperSlide
                          key={video?.id || index}
                          className="!h-auto"
                        >
                          <a
                            href={video?.link || "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Watch ${
                              video?.title ||
                              `Ausbildung video ${
                                index + 1
                              }`
                            }`}
                            className="
                              group/video
                              flex h-full flex-col
                              overflow-hidden rounded-3xl
                              border border-slate-200
                              bg-white
                              shadow-[0_14px_40px_rgba(15,23,42,0.10)]
                              transition duration-300
                              hover:-translate-y-2
                              hover:border-primary/30
                              hover:shadow-[0_24px_55px_rgba(99,26,51,0.18)]
                            "
                          >
                            <div className="relative aspect-video overflow-hidden bg-black">
                              <img
                                src={thumbnail}
                                alt={
                                  video?.title ||
                                  "Ausbildung video"
                                }
                                loading="lazy"
                                className="
                                  h-full w-full object-cover
                                  transition duration-500
                                  group-hover/video:scale-105
                                "
                                onError={(event) => {
                                  event.currentTarget.onerror =
                                    null;

                                  event.currentTarget.src =
                                    FALLBACK_IMAGE;
                                }}
                              />

                              <div
                                aria-hidden="true"
                                className="
                                  absolute inset-0
                                  bg-gradient-to-t
                                  from-black/60
                                  via-black/10
                                  to-transparent
                                "
                              />

                              <span
                                className="
                                  absolute left-1/2 top-1/2
                                  grid h-16 w-16
                                  -translate-x-1/2
                                  -translate-y-1/2
                                  place-items-center
                                  rounded-full
                                  bg-primary text-white
                                  shadow-2xl transition
                                  group-hover/video:scale-110
                                  group-hover/video:bg-darkPrimary
                                "
                              >
                                <Play
                                  size={25}
                                  className="ml-1 fill-current"
                                />
                              </span>

                              <span
                                className="
                                  absolute left-4 top-4
                                  rounded-full
                                  bg-white/90 px-3 py-1.5
                                  text-[11px] font-bold
                                  uppercase tracking-wider
                                  text-darkPrimary
                                  backdrop-blur
                                "
                              >
                                Ausbildung
                              </span>
                            </div>

                            <div className="flex flex-1 flex-col p-5">
                              <h4 className="line-clamp-2 text-md font-extrabold text-black">
                                {video?.title ||
                                  `Ausbildung Video ${
                                    index + 1
                                  }`}
                              </h4>

                              {video?.description && (
                                <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
                                  {video.description}
                                </p>
                              )}

                              <span
                                className="
                                  mt-auto inline-flex
                                  items-center gap-2
                                  pt-5 text-sm font-bold
                                  text-primary
                                "
                              >
                                Watch Video

                                <ArrowRight
                                  size={17}
                                  className="
                                    transition-transform
                                    group-hover/video:translate-x-1
                                  "
                                />
                              </span>
                            </div>
                          </a>
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                )}
            </section>
          )}
      </div>
    </section>
  );
};

export default GermanPopularCourses;