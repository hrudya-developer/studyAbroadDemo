import {
  memo,
  useMemo,
} from "react";

import { Helmet } from "react-helmet-async";

const SITE_URL =
  "https://medcityoverseas.com";

/*
  This must exactly match your live React Router path.

  Current route:
  /germanPopularCourses

  Recommended future route:
  /german-popular-courses
*/
const PAGE_PATH =
  "/german-popular-courses";

const PAGE_URL =
  `${SITE_URL}${PAGE_PATH}`;

const ORGANIZATION_ID =
  `${SITE_URL}/#organization`;

const WEBSITE_ID =
  `${SITE_URL}/#website`;

const WEBPAGE_ID =
  `${PAGE_URL}#webpage`;

const BREADCRUMB_ID =
  `${PAGE_URL}#breadcrumb`;

const PROGRAM_LIST_ID =
  `${PAGE_URL}#german-program-list`;

const VIDEO_LIST_ID =
  `${PAGE_URL}#ausbildung-video-list`;

const SEO_TITLE =
  "German Popular Courses & Ausbildung Programs | Medcity";

const SEO_DESCRIPTION =
  "Explore popular German courses and Ausbildung programs with Medcity Study Abroad. Discover career pathways, program details and opportunities to study and work in Germany.";

const SEO_KEYWORDS = [
  "German popular courses",
  "Ausbildung programs Germany",
  "study in Germany",
  "Germany career programs",
  "vocational training Germany",
  "Ausbildung courses",
  "German study abroad programs",
  "Medcity Study Abroad Germany",
].join(", ");

const OG_IMAGE =
  `${SITE_URL}/images/german-popular-courses-og.webp`;

const ROBOTS =
  "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

const cleanText = (value) =>
  String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const truncateText = (
  value,
  maxLength = 200
) => {
  const text = cleanText(value);

  if (text.length <= maxLength) {
    return text;
  }

  return `${text
    .slice(0, maxLength - 1)
    .trim()}…`;
};

const getProgramId = (
  program,
  index
) =>
  program?.id ||
  program?.program_id ||
  `program-${index + 1}`;

const getProgramName = (
  program,
  index
) =>
  cleanText(
    program?.name ||
      program?.title ||
      `German Program ${index + 1}`
  );

const getProgramDescription = (
  program
) =>
  truncateText(
    program?.why ||
      program?.description ||
      program?.titleWhy ||
      "German study and career program offered through Medcity Study Abroad."
  );

const buildImageUrl = (
  basePath,
  image
) => {
  if (!image) {
    return OG_IMAGE;
  }

  const imageValue =
    String(image).trim();

  if (
    imageValue.startsWith(
      "http://"
    ) ||
    imageValue.startsWith(
      "https://"
    )
  ) {
    return imageValue;
  }

  const normalizedBase =
    String(basePath || "").replace(
      /\/+$/,
      ""
    );

  const normalizedFile =
    imageValue.replace(/^\/+/, "");

  if (!normalizedBase) {
    return OG_IMAGE;
  }

  return `${normalizedBase}/${normalizedFile}`;
};

const getYouTubeVideoId = (
  url = ""
) => {
  if (!url) {
    return "";
  }

  try {
    const parsedUrl = new URL(url);

    if (
      parsedUrl.hostname.includes(
        "youtu.be"
      )
    ) {
      return parsedUrl.pathname
        .replace("/", "")
        .split("?")[0];
    }

    if (
      parsedUrl.hostname.includes(
        "youtube.com"
      ) ||
      parsedUrl.hostname.includes(
        "youtube-nocookie.com"
      )
    ) {
      if (
        parsedUrl.pathname.startsWith(
          "/shorts/"
        )
      ) {
        return parsedUrl.pathname
          .split("/shorts/")[1]
          ?.split("/")[0];
      }

      if (
        parsedUrl.pathname.startsWith(
          "/embed/"
        )
      ) {
        return parsedUrl.pathname
          .split("/embed/")[1]
          ?.split("/")[0];
      }

      return (
        parsedUrl.searchParams.get(
          "v"
        ) || ""
      );
    }

    return "";
  } catch {
    return "";
  }
};

const getVideoThumbnail = (
  video
) => {
  if (video?.thumbnailUrl) {
    return video.thumbnailUrl;
  }

  const videoId =
    getYouTubeVideoId(video?.link);

  return videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : OG_IMAGE;
};

const getUploadDate = (video) => {
  const rawDate =
    video?.uploadDate ||
    video?.published_at ||
    video?.created_at ||
    video?.date;

  if (!rawDate) {
    return undefined;
  }

  const date = new Date(rawDate);

  if (
    Number.isNaN(date.getTime())
  ) {
    return undefined;
  }

  return date.toISOString();
};

const GermanPopularCoursesSEO = ({
  programs = [],
  imagePath = "",
  videos = [],
}) => {
  const validPrograms = useMemo(
    () =>
      Array.isArray(programs)
        ? programs.filter(Boolean)
        : [],
    [programs]
  );

  const validVideos = useMemo(
    () =>
      Array.isArray(videos)
        ? videos.filter(
            (video) =>
              video &&
              String(
                video?.link || ""
              ).trim()
          )
        : [],
    [videos]
  );

  const structuredData = useMemo(
    () => {
      const programListSchema = {
        "@type": "ItemList",
        "@id": PROGRAM_LIST_ID,

        name:
          "Popular German Courses and Programs",

        description:
          SEO_DESCRIPTION,

        numberOfItems:
          validPrograms.length,

        itemListOrder:
          "https://schema.org/ItemListOrderAscending",

        itemListElement:
          validPrograms.map(
            (program, index) => {
              const programId =
                getProgramId(
                  program,
                  index
                );

              const programName =
                getProgramName(
                  program,
                  index
                );

              const programUrl =
                `${SITE_URL}/germanPrograms/${programId}`;

              return {
                "@type":
                  "ListItem",

                position:
                  index + 1,

                item: {
                  "@type":
                    "Course",

                  "@id":
                    `${programUrl}#course`,

                  url: programUrl,

                  name:
                    programName,

                  description:
                    getProgramDescription(
                      program
                    ),

                  image:
                    buildImageUrl(
                      imagePath,
                      program?.icon ||
                        program?.image
                    ),

                  provider: {
                    "@id":
                      ORGANIZATION_ID,
                  },

                  inLanguage:
                    "en-IN",

                  about: {
                    "@type":
                      "Thing",

                    name:
                      "Study and career opportunities in Germany",
                  },
                },
              };
            }
          ),
      };

      const videoListSchema = {
        "@type": "ItemList",
        "@id": VIDEO_LIST_ID,

        name:
          "Ausbildung Program Videos",

        description:
          "Videos about Ausbildung programs, career opportunities and student life in Germany.",

        numberOfItems:
          validVideos.length,

        itemListElement:
          validVideos.map(
            (video, index) => {
              const videoId =
                video?.id ||
                getYouTubeVideoId(
                  video?.link
                ) ||
                `video-${index + 1}`;

              const uploadDate =
                getUploadDate(video);

              const videoObject = {
                "@type":
                  "VideoObject",

                "@id":
                  `${PAGE_URL}#video-${videoId}`,

                name:
                  cleanText(
                    video?.title ||
                      `Ausbildung Video ${
                        index + 1
                      }`
                  ),

                description:
                  truncateText(
                    video?.description ||
                      "Learn about Ausbildung programs and career opportunities in Germany."
                  ),

                thumbnailUrl: [
                  getVideoThumbnail(
                    video
                  ),
                ],

                contentUrl:
                  video?.link,

                embedUrl:
                  video?.link,

                publisher: {
                  "@id":
                    ORGANIZATION_ID,
                },
              };

              if (uploadDate) {
                videoObject.uploadDate =
                  uploadDate;
              }

              return {
                "@type":
                  "ListItem",

                position:
                  index + 1,

                item:
                  videoObject,
              };
            }
          ),
      };

      const webPageSchema = {
        "@type":
          "CollectionPage",

        "@id": WEBPAGE_ID,

        url: PAGE_URL,

        name: SEO_TITLE,

        headline:
          "Popular German Courses and Ausbildung Programs",

        description:
          SEO_DESCRIPTION,

        inLanguage:
          "en-IN",

        isPartOf: {
          "@id": WEBSITE_ID,
        },

        publisher: {
          "@id":
            ORGANIZATION_ID,
        },

        about: [
          {
            "@type": "Thing",
            name:
              "Study in Germany",
          },
          {
            "@type": "Thing",
            name:
              "Ausbildung programs",
          },
          {
            "@type": "Thing",
            name:
              "German career pathways",
          },
        ],

        mainEntity: {
          "@id":
            PROGRAM_LIST_ID,
        },

        primaryImageOfPage: {
          "@type":
            "ImageObject",

          url: OG_IMAGE,

          contentUrl:
            OG_IMAGE,

          width: 1200,

          height: 630,
        },

        breadcrumb: {
          "@id":
            BREADCRUMB_ID,
        },
      };

      const breadcrumbSchema = {
        "@type":
          "BreadcrumbList",

        "@id":
          BREADCRUMB_ID,

        itemListElement: [
          {
            "@type":
              "ListItem",

            position: 1,

            name: "Home",

            item:
              `${SITE_URL}/`,
          },
          {
            "@type":
              "ListItem",

            position: 2,

            name:
              "German Popular Courses",

            item:
              PAGE_URL,
          },
        ],
      };

      const graph = [
        webPageSchema,
        breadcrumbSchema,
        programListSchema,
      ];

      if (
        validVideos.length > 0
      ) {
        graph.push(
          videoListSchema
        );
      }

      return {
        "@context":
          "https://schema.org",

        "@graph": graph,
      };
    },
    [
      imagePath,
      validPrograms,
      validVideos,
    ]
  );

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en-IN" />

      <title>{SEO_TITLE}</title>

      <meta
        name="description"
        content={SEO_DESCRIPTION}
      />

      <meta
        name="keywords"
        content={SEO_KEYWORDS}
      />

      <meta
        name="robots"
        content={ROBOTS}
      />

      <meta
        name="googlebot"
        content={ROBOTS}
      />

      <meta
        name="author"
        content="Medcity Study Abroad"
      />

      <meta
        name="publisher"
        content="Medcity Study Abroad"
      />

      <meta
        name="application-name"
        content="Medcity Study Abroad"
      />

      <meta
        name="theme-color"
        content="#c01f53"
      />

      <link
        rel="canonical"
        href={PAGE_URL}
      />

      {/* Open Graph */}
      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:title"
        content={SEO_TITLE}
      />

      <meta
        property="og:description"
        content={SEO_DESCRIPTION}
      />

      <meta
        property="og:url"
        content={PAGE_URL}
      />

      <meta
        property="og:site_name"
        content="Medcity Study Abroad"
      />

      <meta
        property="og:locale"
        content="en_IN"
      />

      <meta
        property="og:image"
        content={OG_IMAGE}
      />

      <meta
        property="og:image:secure_url"
        content={OG_IMAGE}
      />

      <meta
        property="og:image:type"
        content="image/webp"
      />

      <meta
        property="og:image:width"
        content="1200"
      />

      <meta
        property="og:image:height"
        content="630"
      />

      <meta
        property="og:image:alt"
        content="Popular German courses and Ausbildung programs offered by Medcity Study Abroad"
      />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={SEO_TITLE}
      />

      <meta
        name="twitter:description"
        content={SEO_DESCRIPTION}
      />

      <meta
        name="twitter:image"
        content={OG_IMAGE}
      />

      <meta
        name="twitter:image:alt"
        content="Popular German courses and Ausbildung programs"
      />

      <script type="application/ld+json">
        {JSON.stringify(
          structuredData
        )}
      </script>
    </Helmet>
  );
};

export default memo(
  GermanPopularCoursesSEO
);