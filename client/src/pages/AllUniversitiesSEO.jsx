import { Helmet } from "react-helmet-async";

const SITE_URL = "https://medcityoverseas.com";
const LOGO_URL = `${SITE_URL}/logo.png`;
const OG_IMAGE_URL = `${SITE_URL}/images/all-universities-og.jpg`;

const getCountryName = (country) =>
  country?.country || country?.country_name || country?.name || "Global";

const getUniversityName = (university) =>
  university?.university ||
  university?.university_name ||
  university?.name ||
  "University";

const getUniversityId = (university) =>
  university?.id ?? university?.university_id ?? university?.u_id;

const AllUniversitiesSEO = ({
  activeCountry,
  universities = [],
  universityImagePath = "",
}) => {
  const countryName = getCountryName(activeCountry);
  const countryId = activeCountry?.id ?? activeCountry?.d_id;

  const pagePath = countryId
    ? `/all-universities/${countryId}`
    : "/all-universities";

  const pageUrl = `${SITE_URL}${pagePath}`;

  const seoTitle =
    countryName === "Global"
      ? "Study Abroad Universities | Medcity Study Abroad"
      : `Universities in ${countryName} | Medcity Study Abroad`;

  const seoDescription =
    countryName === "Global"
      ? "Explore international universities, courses and study opportunities with expert admission and visa support from Medcity Study Abroad."
      : `Explore universities in ${countryName}, available courses and study opportunities with expert admission and visa support from Medcity Study Abroad.`;

  const validUniversities = Array.isArray(universities)
    ? universities.filter(Boolean)
    : [];

  const cleanUniversityImagePath = universityImagePath?.replace(/\/$/, "");

  const organizationSchema = {
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "Medcity Study Abroad",
    alternateName: "Medcity International Overseas Corporation",
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
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: seoTitle,
    headline:
      countryName === "Global"
        ? "Explore Study Abroad Universities"
        : `Explore Universities in ${countryName}`,
    description: seoDescription,
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
      "@id": `${pageUrl}#primaryimage`,
      url: OG_IMAGE_URL,
      contentUrl: OG_IMAGE_URL,
      width: 1200,
      height: 630,
    },
    breadcrumb: {
      "@id": `${pageUrl}#breadcrumb`,
    },
    mainEntity: {
      "@id": `${pageUrl}#university-list`,
    },
    inLanguage: "en-IN",
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
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
        name: "All Universities",
        item: `${SITE_URL}/all-universities`,
      },
      ...(countryId
        ? [
            {
              "@type": "ListItem",
              position: 3,
              name: countryName,
              item: pageUrl,
            },
          ]
        : []),
    ],
  };

  const universityItemListSchema = {
    "@type": "ItemList",
    "@id": `${pageUrl}#university-list`,
    name:
      countryName === "Global"
        ? "Study Abroad Universities"
        : `Universities in ${countryName}`,
    numberOfItems: validUniversities.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: validUniversities.map((university, index) => {
      const universityId = getUniversityId(university);
      const universityName = getUniversityName(university);
      const universityUrl = universityId
        ? `${SITE_URL}/universityDetails/${universityId}`
        : pageUrl;

      const logoUrl =
        university?.logo && cleanUniversityImagePath
          ? `${cleanUniversityImagePath}/${university.logo}`
          : undefined;

      return {
        "@type": "ListItem",
        position: index + 1,
        name: universityName,
        url: universityUrl,
        item: {
          "@type": "CollegeOrUniversity",
          "@id": `${universityUrl}#university`,
          name: universityName,
          url: universityUrl,
          ...(logoUrl
            ? {
                logo: {
                  "@type": "ImageObject",
                  url: logoUrl,
                },
              }
            : {}),
          address: {
            "@type": "PostalAddress",
            addressLocality:
              university?.location || university?.city || countryName,
            addressCountry: countryName,
          },
        },
      };
    }),
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      organizationSchema,
      websiteSchema,
      collectionPageSchema,
      breadcrumbSchema,
      universityItemListSchema,
    ],
  };

  const safeStructuredData = JSON.stringify(structuredData).replace(
    /</g,
    "\\u003c",
  );

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en-IN" />

      <title>{seoTitle}</title>

      <meta name="description" content={seoDescription} />
      <meta
        name="robots"
        content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
      />
      <meta name="author" content="Medcity Study Abroad" />
      <meta name="theme-color" content="#c01f53" />

      <link rel="canonical" href={pageUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content="Medcity Study Abroad" />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={OG_IMAGE_URL} />
      <meta property="og:image:secure_url" content={OG_IMAGE_URL} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta
        property="og:image:alt"
        content={`Study abroad universities in ${countryName}`}
      />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={OG_IMAGE_URL} />
      <meta
        name="twitter:image:alt"
        content={`Study abroad universities in ${countryName}`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeStructuredData,
        }}
      />
    </Helmet>
  );
};

export default AllUniversitiesSEO;