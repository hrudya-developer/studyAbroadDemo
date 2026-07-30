import {
  memo,
  useMemo,
} from "react";

import { Helmet } from "react-helmet-async";

const SITE_URL =
  "https://medcityoverseas.com";

const PAGE_PATH =
  "/studyAbroadBlog";

const PAGE_URL =
  `${SITE_URL}${PAGE_PATH}`;

const SEO_TITLE =
  "Study Abroad Blog | Visa, Scholarships & Student Guides";

const SEO_DESCRIPTION =
  "Read Medcity Study Abroad blogs covering student visas, scholarships, university admissions, destination guides and international education updates.";

const SEO_KEYWORDS = [
  "study abroad blog",
  "student visa guidance",
  "study abroad scholarships",
  "international education blog",
  "study abroad destination guides",
  "overseas education updates",
  "Medcity Study Abroad blog",
].join(", ");

const OG_IMAGE =
  `${SITE_URL}/images/study-abroad-blog-og.webp`;

const ORGANIZATION_ID =
  `${SITE_URL}/#organization`;

const WEBSITE_ID =
  `${SITE_URL}/#website`;

const WEBPAGE_ID =
  `${PAGE_URL}#webpage`;

const BLOG_LIST_ID =
  `${PAGE_URL}#blog-list`;

const BREADCRUMB_ID =
  `${PAGE_URL}#breadcrumb`;

const ROBOTS =
  "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

const cleanText = (value) =>
  String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getBlogId = (
  blog,
  index
) =>
  blog?.id ||
  blog?.blog_id ||
  `blog-${index + 1}`;

const getBlogTitle = (
  blog,
  index
) =>
  cleanText(
    blog?.title ||
      blog?.blog_title ||
      `Study Abroad Blog ${index + 1}`
  );

const getBlogDescription = (
  blog
) =>
  cleanText(
    blog?.description ||
      blog?.short_description ||
      blog?.content ||
      SEO_DESCRIPTION
  ).slice(0, 220);

const getBlogImage = (
  blog,
  imagePath
) => {
  const imageName =
    blog?.image ||
    blog?.thumbnail ||
    blog?.featured_image ||
    "";

  if (!imageName) {
    return OG_IMAGE;
  }

  const imageValue =
    String(imageName).trim();

  if (
    imageValue.startsWith("http://") ||
    imageValue.startsWith("https://")
  ) {
    return imageValue;
  }

  const basePath =
    String(imagePath || "").replace(
      /\/+$/,
      ""
    );

  const filePath =
    imageValue.replace(/^\/+/, "");

  if (!basePath) {
    return OG_IMAGE;
  }

  return `${basePath}/${filePath}`;
};

const getPublishedDate = (
  blog
) => {
  const rawDate =
    blog?.date ||
    blog?.published_at ||
    blog?.created_at;

  if (!rawDate) {
    return undefined;
  }

  const parsedDate =
    new Date(rawDate);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return undefined;
  }

  return parsedDate.toISOString();
};

const StudyAbroadBlogsSEO = ({
  blogs = [],
  imagePath = "",
}) => {
  const validBlogs = useMemo(
    () =>
      Array.isArray(blogs)
        ? blogs.filter(Boolean)
        : [],
    [blogs]
  );

  const structuredData =
    useMemo(() => {
      const blogListSchema = {
        "@type": "ItemList",
        "@id": BLOG_LIST_ID,
        name:
          "Medcity Study Abroad Blog",
        description:
          SEO_DESCRIPTION,
        numberOfItems:
          validBlogs.length,
        itemListOrder:
          "https://schema.org/ItemListOrderDescending",
        itemListElement:
          validBlogs.map(
            (blog, index) => {
              const blogId =
                getBlogId(
                  blog,
                  index
                );

              const title =
                getBlogTitle(
                  blog,
                  index
                );

              const url =
                blog?.link ||
                `${PAGE_URL}#blog-${blogId}`;

              const datePublished =
                getPublishedDate(
                  blog
                );

              const article = {
                "@type":
                  "BlogPosting",
                "@id":
                  `${PAGE_URL}#blog-${blogId}`,
                url,
                headline: title,
                description:
                  getBlogDescription(
                    blog
                  ),
                image: {
                  "@type":
                    "ImageObject",
                  url:
                    getBlogImage(
                      blog,
                      imagePath
                    ),
                },
                author: {
                  "@id":
                    ORGANIZATION_ID,
                },
                publisher: {
                  "@id":
                    ORGANIZATION_ID,
                },
                inLanguage:
                  "en-IN",
              };

              if (datePublished) {
                article.datePublished =
                  datePublished;
              }

              return {
                "@type":
                  "ListItem",
                position:
                  index + 1,
                item: article,
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
          "Study Abroad Blog",
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
        mainEntity: {
          "@id":
            BLOG_LIST_ID,
        },
        primaryImageOfPage: {
          "@type":
            "ImageObject",
          url: OG_IMAGE,
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
              "Study Abroad Blog",
            item:
              PAGE_URL,
          },
        ],
      };

      return {
        "@context":
          "https://schema.org",
        "@graph": [
          webPageSchema,
          breadcrumbSchema,
          blogListSchema,
        ],
      };
    }, [
      imagePath,
      validBlogs,
    ]);

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
        name="theme-color"
        content="#c01f53"
      />

      <link
        rel="canonical"
        href={PAGE_URL}
      />

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
        property="og:image:width"
        content="1200"
      />

      <meta
        property="og:image:height"
        content="630"
      />

      <meta
        property="og:image:alt"
        content="Medcity Study Abroad blog"
      />

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
        content="Medcity Study Abroad blog"
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
  StudyAbroadBlogsSEO
);