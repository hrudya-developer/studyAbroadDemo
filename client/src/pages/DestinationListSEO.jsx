import { Helmet } from "react-helmet-async";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/destination-list`;

const LOGO_URL = `${SITE_URL}/logo.png`;

const OG_IMAGE_URL =
  `${SITE_URL}/images/study-abroad-destinations-og.jpg`;

const SEO_TITLE =
  "Study Abroad Destinations | Explore Countries with Medcity";

const SEO_DESCRIPTION =
  "Explore popular study abroad destinations with Medcity Study Abroad. Compare countries, universities, courses and international education opportunities.";

const OG_DESCRIPTION =
  "Discover leading study abroad destinations, global universities and international education opportunities with expert support from Medcity Study Abroad.";

const createDestinationUrl = (destination) => {
  const destinationId =
    destination?.id ??
    destination?.d_id ??
    destination?.country_id;

  if (!destinationId) {
    return PAGE_URL;
  }

  return `${SITE_URL}/destination/${destinationId}`;
};

const createDestinationName = (destination) => {
  return (
    destination?.country ??
    destination?.country_name ??
    destination?.name ??
    "Study Abroad Destination"
  );
};

const DestinationListSEO = ({
  countries = [],
}) => {
  const validCountries = Array.isArray(countries)
    ? countries.filter(Boolean)
    : [];

  const organizationSchema = {
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,

    name: "Medcity Study Abroad",

    alternateName:
      "Medcity International Overseas Corporation",

    url: `${SITE_URL}/`,

    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: LOGO_URL,
      contentUrl: LOGO_URL,
      caption: "Medcity Study Abroad",
    },

    description:
      "Medcity Study Abroad provides overseas education counselling, university admission support, visa guidance, language preparation and international career support.",

    areaServed: {
      "@type": "Country",
      name: "India",
    },

    sameAs: [
      "https://www.instagram.com/medcitystudyabroad",
      "https://www.facebook.com/share/1D8vQXJskS/",
      "https://in.linkedin.com/company/medcity-study-abroad",
      "https://youtube.com/@medcitystudyabroad",
    ],
  };

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,

    url: `${SITE_URL}/`,
    name: "Medcity Study Abroad",

    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },

    inLanguage: "en-IN",
  };

  const collectionPageSchema = {
    "@type": "CollectionPage",
    "@id": `${PAGE_URL}#webpage`,

    url: PAGE_URL,
    name: SEO_TITLE,

    headline:
      "Explore Study Abroad Destinations",

    description: SEO_DESCRIPTION,

    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },

    about: {
      "@id": `${SITE_URL}/#organization`,
    },

    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },

    primaryImageOfPage: {
      "@type": "ImageObject",
      "@id": `${PAGE_URL}#primaryimage`,
      url: OG_IMAGE_URL,
      contentUrl: OG_IMAGE_URL,
      width: 1200,
      height: 630,
    },

    breadcrumb: {
      "@id": `${PAGE_URL}#breadcrumb`,
    },

    mainEntity: {
      "@id": `${PAGE_URL}#destination-list`,
    },

    inLanguage: "en-IN",
  };

  const breadcrumbSchema = {
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
        name: "Study Abroad Destinations",
        item: PAGE_URL,
      },
    ],
  };

  const destinationItemListSchema = {
    "@type": "ItemList",
    "@id": `${PAGE_URL}#destination-list`,

    name: "Study Abroad Destinations",

    description:
      "Explore international study destinations available through Medcity Study Abroad.",

    numberOfItems: validCountries.length,

    itemListOrder:
      "https://schema.org/ItemListOrderAscending",

    itemListElement: validCountries.map(
      (destination, index) => {
        const destinationName =
          createDestinationName(destination);

        const destinationUrl =
          createDestinationUrl(destination);

        return {
          "@type": "ListItem",
          position: index + 1,
          name: destinationName,
          url: destinationUrl,

          item: {
            "@type": "Place",
            "@id": `${destinationUrl}#destination`,
            name: destinationName,
            url: destinationUrl,

            description:
              `Explore study opportunities, universities and courses in ${destinationName}.`,
          },
        };
      }
    ),
  };

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      organizationSchema,
      websiteSchema,
      collectionPageSchema,
      breadcrumbSchema,
      destinationItemListSchema,
    ],
  };

  const safeStructuredData = JSON.stringify(
    structuredData
  ).replace(/</g, "\\u003c");

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en-IN" />

      <title>{SEO_TITLE}</title>

      <meta
        name="description"
        content={SEO_DESCRIPTION}
      />

      <meta
        name="robots"
        content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
      />

      <meta
        name="author"
        content="Medcity Study Abroad"
      />

      <meta
        name="theme-color"
        content="#c01f53"
      />

      {/* Canonical URL */}
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
        property="og:locale"
        content="en_IN"
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
        content={OG_DESCRIPTION}
      />

      <meta
        property="og:url"
        content={PAGE_URL}
      />

      <meta
        property="og:image"
        content={OG_IMAGE_URL}
      />

      <meta
        property="og:image:secure_url"
        content={OG_IMAGE_URL}
      />

      <meta
        property="og:image:type"
        content="image/jpeg"
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
        content="Study abroad destinations with Medcity Study Abroad"
      />

      {/* X / Twitter */}
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
        content={OG_DESCRIPTION}
      />

      <meta
        name="twitter:image"
        content={OG_IMAGE_URL}
      />

      <meta
        name="twitter:image:alt"
        content="Study abroad destinations with Medcity Study Abroad"
      />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeStructuredData,
        }}
      />
    </Helmet>
  );
};

export default DestinationListSEO;