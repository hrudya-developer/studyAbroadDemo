import { Helmet } from "react-helmet-async";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/australia-migration`;
const OG_IMAGE = `${SITE_URL}/images/australia-migration-og.webp`;

const SEO_TITLE =
  "Australia Migration and PR Assistance | Medcity Study Abroad";

const SEO_DESCRIPTION =
  "Explore Australia migration pathways, permanent residency options, eligibility guidance and post-migration support with Medcity Study Abroad.";

const SEO_KEYWORDS = [
  "Australia migration",
  "Australia PR",
  "Australia permanent residency",
  "Australia immigration consultants Kerala",
  "Australia migration consultants",
  "Australia PR process",
  "Australia skilled migration",
  "Australia immigration pathways",
  "Australia post migration support",
  "Australia migration assistance",
].join(", ");

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: SEO_TITLE,
      headline:
        "Australia Migration and Permanent Residency Assistance",
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
        "@id": `${PAGE_URL}#primaryimage`,
        url: OG_IMAGE,
        contentUrl: OG_IMAGE,
        width: 1200,
        height: 630,
        caption:
          "Australia migration and permanent residency assistance",
      },
    },
    {
      "@type": "Service",
      "@id": `${PAGE_URL}#service`,
      name: "Australia Migration Assistance",
      description: SEO_DESCRIPTION,
      serviceType:
        "Australia migration and permanent residency guidance",
      url: PAGE_URL,
      provider: {
        "@type": "EducationalOrganization",
        "@id": `${SITE_URL}/#organization`,
        name: "Medcity Study Abroad",
        url: SITE_URL,
      },
      areaServed: {
        "@type": "Country",
        name: "Australia",
      },
      audience: {
        "@type": "Audience",
        audienceType:
          "Students, skilled professionals and migration applicants",
      },
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
          name: "Australia Migration",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

const AustraliaMigrationSEO = () => {
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
        property="og:locale"
        content="en_IN"
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
        property="og:image:secure_url"
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
        property="og:image:type"
        content="image/webp"
      />

      <meta
        property="og:image:alt"
        content="Australia migration and permanent residency assistance"
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
        content="Australia migration and permanent residency assistance"
      />

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default AustraliaMigrationSEO;