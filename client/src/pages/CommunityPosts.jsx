import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  ImageOff,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import axios from "axios";

import CommunityHero from "./CommunityHero";
import CommunityPostsSEO from "./CommunityPostsSEO";
import FAQ from "../layout/FAQ/FAQ";

const API_URL =
  "https://overseas.technocitysolutions.com/public/api/getCommunityPosts";

const getPostId = (post, index) =>
  post?.id ||
  post?.post_id ||
  `post-${index + 1}`;

const getPostTitle = (post, index) => {
  const title =
    post?.title ||
    post?.post_title ||
    "";

  if (String(title).trim()) {
    return String(title).trim();
  }

  const text = String(
    post?.post || ""
  )
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (text) {
    return text.length > 65
      ? `${text.slice(0, 65).trim()}…`
      : text;
  }

  return `Community Update ${index + 1}`;
};

const getPostImage = (
  post,
  imagePath
) => {
  const imageName =
    post?.attach ||
    post?.image ||
    post?.thumbnail ||
    "";

  if (!imageName) {
    return "";
  }

  const normalizedImage =
    String(imageName).trim();

  if (
    normalizedImage.startsWith(
      "http://"
    ) ||
    normalizedImage.startsWith(
      "https://"
    )
  ) {
    return normalizedImage;
  }

  const normalizedBasePath =
    String(imagePath || "").replace(
      /\/+$/,
      ""
    );

  const normalizedFile =
    normalizedImage.replace(/^\/+/, "");

  if (!normalizedBasePath) {
    return "";
  }

  return `${normalizedBasePath}/${normalizedFile}`;
};

const CommunityPosts = () => {
  const [posts, setPosts] = useState(
    []
  );

  const [imagePath, setImagePath] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [offsets, setOffsets] =
    useState([0]);

  const [nextOffset, setNextOffset] =
    useState(null);

  const postsSectionRef = useRef(null);

  useEffect(() => {
    const controller =
      new AbortController();

    const fetchCommunityPosts =
      async () => {
        try {
          setLoading(true);
          setError("");

          const offset =
            offsets[currentPage - 1] ??
            0;

          const formData =
            new FormData();

          formData.append(
            "api",
            "overseas@Miak2023"
          );

          formData.append("uid", "0");

          formData.append(
            "offset",
            String(offset)
          );

          const response =
            await axios.post(
              API_URL,
              formData,
              {
                signal:
                  controller.signal,
              }
            );

          const data =
            response?.data || {};

          if (data?.status === true) {
            const apiPosts =
              Array.isArray(data?.posts)
                ? data.posts
                : [];

            setPosts(apiPosts);

            setImagePath(
              data?.post_image_path ||
                data?.posts_image_path ||
                ""
            );

            const rawNextOffset =
              data?.nextoffset;

            const parsedNextOffset =
              rawNextOffset !==
                undefined &&
              rawNextOffset !== null &&
              rawNextOffset !== ""
                ? Number(
                    rawNextOffset
                  )
                : null;

            if (
              Number.isFinite(
                parsedNextOffset
              )
            ) {
              setNextOffset(
                parsedNextOffset
              );

              setOffsets(
                (previousOffsets) => {
                  if (
                    previousOffsets.includes(
                      parsedNextOffset
                    )
                  ) {
                    return previousOffsets;
                  }

                  return [
                    ...previousOffsets,
                    parsedNextOffset,
                  ];
                }
              );
            } else {
              setNextOffset(null);
            }

            if (
              apiPosts.length === 0
            ) {
              setError(
                "No community posts are currently available."
              );
            }
          } else {
            setPosts([]);
            setNextOffset(null);

            setError(
              "No community posts are currently available."
            );
          }
        } catch (requestError) {
          if (
            requestError?.name ===
              "CanceledError" ||
            requestError?.code ===
              "ERR_CANCELED"
          ) {
            return;
          }

          console.error(
            "Community posts error:",
            requestError
          );

          setPosts([]);
          setNextOffset(null);

          setError(
            "Failed to load community posts. Please try again later."
          );
        } finally {
          if (
            !controller.signal.aborted
          ) {
            setLoading(false);
          }
        }
      };

    fetchCommunityPosts();

    return () => {
      controller.abort();
    };
  }, [currentPage, offsets]);

  const pageNumbers = useMemo(
    () =>
      offsets.map(
        (_, index) => index + 1
      ),
    [offsets]
  );

  const scrollToPosts = () => {
    postsSectionRef.current?.scrollIntoView(
      {
        behavior: "smooth",
        block: "start",
      }
    );
  };

  const changePage = (page) => {
    if (
      page < 1 ||
      page === currentPage
    ) {
      return;
    }

    setCurrentPage(page);

    window.setTimeout(
      scrollToPosts,
      50
    );
  };

  const goPrev = () => {
    if (currentPage === 1) {
      return;
    }

    changePage(currentPage - 1);
  };

  const goNext = () => {
    if (
      nextOffset === null ||
      posts.length === 0
    ) {
      return;
    }

    changePage(currentPage + 1);
  };

  return (
    <>
      <CommunityPostsSEO
        posts={posts}
        imagePath={imagePath}
        currentPage={currentPage}
      />

      <main className="bg-[#f7f9fc]">
        <CommunityHero />

        <section
          ref={postsSectionRef}
          aria-labelledby="community-list-heading"
          className="
            min-h-screen
            scroll-mt-28
            px-4 py-14
            sm:px-6
            lg:px-8
            lg:py-20
          "
        >
          <div className="mx-auto max-w-7xl">
            <header
              className="
                mx-auto mb-12
                max-w-3xl text-center
              "
            >
              <p
                className="
                  text-sm font-bold
                  uppercase
                  tracking-[0.18em]
                  text-primary
                "
              >
                Community Updates
              </p>

              <h2
                id="community-list-heading"
                className="
                  mt-3 text-3xl
                  font-extrabold
                  text-secondary
                  md:text-4xl
                "
              >
                Latest Stories and{" "}
                <span className="text-primary">
                  Opportunities
                </span>
              </h2>

              <p
                className="
                  mx-auto mt-4
                  max-w-2xl
                  text-base leading-7
                  text-slate-600
                "
              >
                Read announcements,
                opportunities and inspiring
                updates from our student
                community.
              </p>
            </header>

            {loading && (
              <div
                role="status"
                aria-live="polite"
                className="
                  mx-auto max-w-md
                  rounded-3xl bg-white
                  px-6 py-16
                  text-center
                  shadow-sm
                "
              >
                <div
                  className="
                    mx-auto size-10
                    animate-spin
                    rounded-full
                    border-4
                    border-primary/20
                    border-t-primary
                  "
                />

                <p
                  className="
                    mt-4 font-semibold
                    text-slate-600
                  "
                >
                  Loading community posts...
                </p>
              </div>
            )}

            {!loading && error && (
              <div
                role="alert"
                className="
                  mx-auto max-w-xl
                  rounded-3xl
                  border border-red-100
                  bg-red-50
                  px-6 py-14
                  text-center
                  font-semibold
                  text-red-600
                "
              >
                {error}
              </div>
            )}

            {!loading &&
  !error &&
  posts.length > 0 && (
    <>
      <div
        className="
          grid items-start
          gap-6
          md:grid-cols-2
          xl:grid-cols-3
        "
      >
        {posts.map((post, index) => {
          const postId = getPostId(
            post,
            index
          );

          const postImage = getPostImage(
            post,
            imagePath
          );

          const postTitle = getPostTitle(
            post,
            index
          );

          const hasText = Boolean(
            String(post?.post || "").trim()
          );

          const hasLink = Boolean(
            String(post?.link || "").trim()
          );

          return (
            <article
              id={`community-post-${postId}`}
              key={postId}
              className="
                group flex w-full flex-col
                overflow-hidden rounded-[22px]
                border border-slate-200
                bg-white p-4
                shadow-[0_10px_30px_rgba(15,23,42,0.08)]
                transition-all duration-300
                hover:-translate-y-1
                hover:border-primary/20
                hover:shadow-[0_20px_45px_rgba(192,31,83,0.14)]
              "
            >
              {postImage ? (
                <div
                  className="
                    relative flex w-full
                    items-center justify-center
                    overflow-hidden rounded-[16px]
                    bg-slate-100
                  "
                >
                  <img
                    src={postImage}
                    alt={`${postTitle} community poster`}
                    width="800"
                    height="1000"
                    loading={
                      index === 0
                        ? "eager"
                        : "lazy"
                    }
                    fetchPriority={
                      index === 0
                        ? "high"
                        : "auto"
                    }
                    decoding="async"
                    className="
                      block h-auto
                      max-h-[620px]
                      w-full
                      object-contain
                      transition-transform
                      duration-500
                      group-hover:scale-[1.01]
                    "
                    onError={(event) => {
                      event.currentTarget.style.display =
                        "none";

                      const fallback =
                        event.currentTarget
                          .nextElementSibling;

                      fallback?.classList.remove(
                        "hidden"
                      );
                    }}
                  />

                  <div
                    className="
                      hidden min-h-[320px]
                      w-full place-content-center
                      bg-gradient-to-br
                      from-pink-50
                      to-slate-100
                    "
                  >
                    <div
                      className="
                        mx-auto grid size-20
                        place-content-center
                        rounded-3xl bg-white
                        text-primary shadow-md
                      "
                    >
                      <ImageOff
                        size={34}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="
                    grid min-h-[320px]
                    place-content-center
                    rounded-[16px]
                    bg-gradient-to-br
                    from-pink-50
                    to-slate-100
                  "
                >
                  <div
                    className="
                      grid size-20
                      place-content-center
                      rounded-3xl bg-white
                      text-primary shadow-md
                    "
                  >
                    <ImageOff
                      size={34}
                      aria-hidden="true"
                    />
                  </div>
                </div>
              )}

              {(hasText || hasLink) && (
                <div className="flex flex-1 flex-col px-2 pb-2 pt-5">
                  <p
                    className="
                      text-xs font-bold
                      uppercase tracking-[0.14em]
                      text-primary
                    "
                  >
                    Community Update
                  </p>

                  {hasText && (
                    <>
                      <h3
                        className="
                          mt-2 line-clamp-2
                          text-lg font-extrabold
                          leading-7 text-slate-900
                        "
                      >
                        {postTitle}
                      </h3>

                      <p
                        className="
                          mt-3 line-clamp-4
                          whitespace-pre-line
                          text-sm leading-6
                          text-slate-600
                        "
                      >
                        {post.post}
                      </p>
                    </>
                  )}

                  {hasLink && (
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Read more about ${postTitle}`}
                      className="
                        mt-5 inline-flex
                        items-center justify-between
                        gap-3 rounded-xl
                        bg-darkPrimary
                        px-4 py-3
                        text-sm font-bold
                        text-white
                        transition-all
                        hover:bg-primary
                      "
                    >
                      <span>Read More</span>

                      <ExternalLink
                        size={16}
                        aria-hidden="true"
                      />
                    </a>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>

      <nav
        aria-label="Community posts pagination"
        className="
          mt-12 flex flex-wrap
          items-center justify-center gap-2
        "
      >
        <button
          type="button"
          onClick={goPrev}
          disabled={currentPage === 1}
          className="
            inline-flex items-center gap-2
            rounded-xl border
            border-slate-200 bg-white
            px-4 py-2.5
            text-sm font-semibold
            text-[#081c47]
            shadow-sm transition
            hover:border-primary/30
            hover:text-primary
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <ArrowLeft
            size={16}
            aria-hidden="true"
          />

          Previous
        </button>

        {pageNumbers.map((page) => (
          <button
            type="button"
            key={page}
            onClick={() =>
              changePage(page)
            }
            aria-label={`Go to community posts page ${page}`}
            aria-current={
              currentPage === page
                ? "page"
                : undefined
            }
            className={`
              grid size-10
              place-content-center
              rounded-xl
              text-sm font-semibold
              transition
              ${
                currentPage === page
                  ? "bg-darkPrimary text-white shadow-lg shadow-primary/20"
                  : "border border-slate-200 bg-white text-[#081c47] hover:border-primary/30 hover:text-primary"
              }
            `}
          >
            {page}
          </button>
        ))}

        <button
          type="button"
          onClick={goNext}
          disabled={
            nextOffset === null ||
            posts.length === 0
          }
          className="
            inline-flex items-center gap-2
            rounded-xl border
            border-slate-200 bg-white
            px-4 py-2.5
            text-sm font-semibold
            text-[#081c47]
            shadow-sm transition
            hover:border-primary/30
            hover:text-primary
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          Next

          <ArrowRight
            size={16}
            aria-hidden="true"
          />
        </button>
      </nav>
    </>
  )}
          </div>

        </section>
        <FAQ />
      </main>
    </>
  );
};

export default CommunityPosts;