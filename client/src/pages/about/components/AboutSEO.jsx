import { Helmet } from "react-helmet-async";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/about-us`;

const LOGO_URL = `${SITE_URL}/logo.png`;
const ABOUT_IMAGE_URL =
  `${SITE_URL}/images/about-student.webp`;
const OG_IMAGE_URL =
  `${SITE_URL}/images/about-study-abroad-og.jpg`;

const SEO_TITLE =
  "About Medcity Study Abroad | Overseas Education Consultants";

const SEO_DESCRIPTION =
  "Learn about Medcity Study Abroad, our mission, leadership, values and expert support for overseas education, admissions, visas and international careers.";

const OG_DESCRIPTION =
  "Discover Medcity Study Abroad's story, mission, leadership and commitment to helping students achieve international education goals.";

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

  image: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#organization-image`,
    url: ABOUT_IMAGE_URL,
    contentUrl: ABOUT_IMAGE_URL,
    caption: "Medcity Study Abroad",
  },

  description:
    "Medcity Study Abroad provides overseas education counselling, university admission support, language preparation, visa assistance and international career guidance for students.",

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

const aboutPageSchema = {
  "@type": "AboutPage",
  "@id": `${PAGE_URL}#webpage`,

  url: PAGE_URL,
  name: SEO_TITLE,

  headline:
    "About Medcity Study Abroad – Overseas Education Consultants",

  description: SEO_DESCRIPTION,

  isPartOf: {
    "@id": `${SITE_URL}/#website`,
  },

  about: {
    "@id": `${SITE_URL}/#organization`,
  },

  mainEntity: {
    "@id": `${SITE_URL}/#organization`,
  },

  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },

  primaryImageOfPage: {
    "@type": "ImageObject",
    "@id": `${PAGE_URL}#primaryimage`,
    url: ABOUT_IMAGE_URL,
    contentUrl: ABOUT_IMAGE_URL,
    caption: "About Medcity Study Abroad",
  },

  breadcrumb: {
    "@id": `${PAGE_URL}#breadcrumb`,
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
      name: "About Us",
      item: PAGE_URL,
    },
  ],
};

const structuredData = {
  "@context": "https://schema.org",

  "@graph": [
    organizationSchema,
    websiteSchema,
    aboutPageSchema,
    breadcrumbSchema,
  ],
};

const safeStructuredData = JSON.stringify(
  structuredData
).replace(/</g, "\\u003c");

const AboutSEO = () => {
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
        content="Medcity Study Abroad overseas education consultants"
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
        content="Medcity Study Abroad overseas education consultants"
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

export default AboutSEO;