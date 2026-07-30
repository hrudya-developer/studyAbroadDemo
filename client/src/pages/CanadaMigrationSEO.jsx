import { Helmet } from "react-helmet-async";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/canada-migration`;
const OG_IMAGE = `${SITE_URL}/images/canada-migration-og.webp`;

const SEO_TITLE =
  "Canada Migration and PR Assistance | Medcity Study Abroad";

const SEO_DESCRIPTION =
  "Explore Canada migration pathways, permanent residency programs, eligibility guidance and application support with Medcity Study Abroad.";

const SEO_KEYWORDS = [
  "Canada migration",
  "Canada PR",
  "Canada permanent residency",
  "Canada immigration consultants Kerala",
  "Canada migration consultants",
  "Canada PR process",
  "Canada immigration programs",
  "Express Entry Canada",
  "Canada provincial nominee program",
  "Canada migration assistance",
].join(", ");

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: SEO_TITLE,
      headline: "Canada Migration and Permanent Residency Assistance",
      description: SEO_DESCRIPTION,
      inLanguage: "en-IN",
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${PAGE_URL}#service`,
      },
      breadcrumb: {
        "@id": `${PAGE_URL}#breadcrumb`,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: OG_IMAGE,
        width: 1200,
        height: 630,
      },
    },

    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Canada Migration Assistance",
      description: SEO_DESCRIPTION,
      serviceType:
        "Canada migration and permanent residency guidance",
      provider: {
        "@type": "EducationalOrganization",
        "@id": `${SITE_URL}/#organization`,
        name: "Medcity Study Abroad",
        url: SITE_URL,
      },
      areaServed: {
        "@type": "Country",
        name: "Canada",
      },
      audience: {
        "@type": "Audience",
        audienceType:
          "Students, skilled professionals and migration applicants",
      },
      url: PAGE_URL,
    },

    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumb`,
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
          name: "Canada Migration",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

const CanadaMigrationSEO = () => {
  return (
    <Helmet>
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
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />

      <meta
        name="googlebot"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
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
        property="og:site_name"
        content="Medcity Study Abroad"
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
        content="Canada migration and permanent residency assistance"
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

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default CanadaMigrationSEO;