import {
  memo,
  useMemo,
} from "react";

import { Helmet } from "react-helmet-async";

const SITE_URL =
  "https://medcityoverseas.com";

const PAGE_PATH = "/community-posts";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const SEO_TITLE =
  "Study Abroad Community Posts | Medcity Study Abroad";

const SEO_DESCRIPTION =
  "Explore the latest study abroad updates, student stories, opportunities, announcements and community posts from Medcity Study Abroad.";

const SEO_KEYWORDS = [
  "study abroad community",
  "study abroad updates",
  "student success stories",
  "overseas education news",
  "study abroad opportunities",
  "international student community",
  "Medcity Study Abroad community",
].join(", ");

const OG_IMAGE =
  `${SITE_URL}/images/community-posts-og.webp`;

const ORGANIZATION_ID =
  `${SITE_URL}/#organization`;

const WEBSITE_ID =
  `${SITE_URL}/#website`;

const WEBPAGE_ID =
  `${PAGE_URL}#webpage`;

const BREADCRUMB_ID =
  `${PAGE_URL}#breadcrumb`;

const POSTS_LIST_ID =
  `${PAGE_URL}#community-post-list`;

const ROBOTS =
  "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

const cleanText = (value) =>
  String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const truncateText = (
  value,
  maxLength = 180
) => {
  const text = cleanText(value);

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1).trim()}…`;
};

const getPostId = (post, index) =>
  post?.id ||
  post?.post_id ||
  `community-post-${index + 1}`;

const getPostTitle = (post, index) => {
  const title =
    post?.title ||
    post?.post_title ||
    "";

  if (cleanText(title)) {
    return cleanText(title);
  }

  const postText = truncateText(
    post?.post,
    70
  );

  return (
    postText ||
    `Community Post ${index + 1}`
  );
};

const getPostDescription = (post) =>
  truncateText(
    post?.post ||
      post?.description ||
      post?.content ||
      SEO_DESCRIPTION
  );

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
    return OG_IMAGE;
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
    return OG_IMAGE;
  }

  return `${normalizedBasePath}/${normalizedFile}`;
};

const CommunityPostsSEO = ({
  posts = [],
  imagePath = "",
  currentPage = 1,
}) => {
  const validPosts = useMemo(
    () =>
      Array.isArray(posts)
        ? posts.filter(Boolean)
        : [],
    [posts]
  );

  const pageCanonical =
    currentPage > 1
      ? `${PAGE_URL}?page=${currentPage}`
      : PAGE_URL;

  const pageTitle =
    currentPage > 1
      ? `Study Abroad Community Posts – Page ${currentPage} | Medcity`
      : SEO_TITLE;

  const structuredData = useMemo(() => {
    const postListSchema = {
      "@type": "ItemList",
      "@id": POSTS_LIST_ID,
      name:
        "Medcity Study Abroad Community Posts",
      description: SEO_DESCRIPTION,
      numberOfItems:
        validPosts.length,
      itemListOrder:
        "https://schema.org/ItemListOrderDescending",
      itemListElement:
        validPosts.map(
          (post, index) => {
            const postId = getPostId(
              post,
              index
            );

            const postUrl =
              `${PAGE_URL}#community-post-${postId}`;

            return {
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type":
                  "SocialMediaPosting",
                "@id": postUrl,
                url:
                  post?.link ||
                  postUrl,
                headline:
                  getPostTitle(
                    post,
                    index
                  ),
                articleBody:
                  getPostDescription(
                    post
                  ),
                image: {
                  "@type":
                    "ImageObject",
                  url: getPostImage(
                    post,
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
                inLanguage: "en-IN",
              },
            };
          }
        ),
    };

    const webPageSchema = {
      "@type": "CollectionPage",
      "@id": WEBPAGE_ID,
      url: pageCanonical,
      name: pageTitle,
      headline: pageTitle,
      description: SEO_DESCRIPTION,
      inLanguage: "en-IN",
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      publisher: {
        "@id": ORGANIZATION_ID,
      },
      about: {
        "@type": "Thing",
        name:
          "Study Abroad Community Updates",
      },
      mainEntity: {
        "@id": POSTS_LIST_ID,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: OG_IMAGE,
        contentUrl: OG_IMAGE,
        width: 1200,
        height: 630,
      },
      breadcrumb: {
        "@id": BREADCRUMB_ID,
      },
    };

    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": BREADCRUMB_ID,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${SITE_URL}/`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Community Posts",
          item: PAGE_URL,
        },
      ],
    };

    return {
      "@context":
        "https://schema.org",
      "@graph": [
        webPageSchema,
        breadcrumbSchema,
        postListSchema,
      ],
    };
  }, [
    imagePath,
    pageCanonical,
    pageTitle,
    validPosts,
  ]);

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en-IN" />

      <title>{pageTitle}</title>

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
        href={pageCanonical}
      />

      {/* Open Graph */}
      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:title"
        content={pageTitle}
      />

      <meta
        property="og:description"
        content={SEO_DESCRIPTION}
      />

      <meta
        property="og:url"
        content={pageCanonical}
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
        content="Medcity Study Abroad community posts"
      />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={pageTitle}
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
        content="Medcity Study Abroad community posts"
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
  CommunityPostsSEO
);