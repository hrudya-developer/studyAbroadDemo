import { Helmet } from "react-helmet-async";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/course-search`;
const OG_IMAGE = `${SITE_URL}/images/course-search-og.webp`;

const SEO_TITLE =
  "Search Study Abroad Courses and Universities | Medcity Study Abroad";

const SEO_DESCRIPTION =
  "Search study abroad courses by destination, university and subject. Explore popular overseas programs and get admission and visa guidance from Medcity Study Abroad.";

const SEO_KEYWORDS = [
  "study abroad course search",
  "overseas university courses",
  "search courses abroad",
  "international university courses",
  "study abroad consultants Kerala",
  "popular study abroad courses",
  "Medcity Study Abroad",
].join(", ");

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: SEO_TITLE,
  description: SEO_DESCRIPTION,
  url: PAGE_URL,
  isPartOf: {
    "@type": "WebSite",
    name: "Medcity Study Abroad",
    url: SITE_URL,
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Course Search",
        item: PAGE_URL,
      },
    ],
  },
};

export default function CourseSearchSEO() {
  return (
    <Helmet>
      <title>{SEO_TITLE}</title>
      <meta name="description" content={SEO_DESCRIPTION} />
      <meta name="keywords" content={SEO_KEYWORDS} />
      <meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />

      <link rel="canonical" href={PAGE_URL} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content={SEO_TITLE} />
      <meta property="og:description" content={SEO_DESCRIPTION} />
      <meta property="og:url" content={PAGE_URL} />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Medcity Study Abroad" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={SEO_TITLE} />
      <meta name="twitter:description" content={SEO_DESCRIPTION} />
      <meta name="twitter:image" content={OG_IMAGE} />

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}