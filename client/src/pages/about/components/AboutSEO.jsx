import { Helmet } from "react-helmet-async";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/about-us`;

const LOGO_URL = `${SITE_URL}/logo.png`;
const ABOUT_IMAGE_URL = `${SITE_URL}/images/about-student.webp`;
const OG_IMAGE_URL = `${SITE_URL}/images/about-study-abroad-og.jpg`;

const AboutSEO = () => {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: "Medcity Study Abroad",
    alternateName: "Medcity International Overseas Corporation",
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },
    image: ABOUT_IMAGE_URL,
    description:
      "Medcity Study Abroad provides overseas education counselling, university admission support, language preparation, visa assistance and international career guidance for students.",
    areaServed: {
      "@type": "Country",
      name: "India",
    },

    // Add only when you have verified URLs:
    // sameAs: [
    //   "https://www.facebook.com/...",
    //   "https://www.instagram.com/...",
    //   "https://www.linkedin.com/company/...",
    // ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
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
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: "About Medcity Study Abroad",
    headline:
      "About Medcity Study Abroad – Overseas Education Consultants",
    description:
      "Learn about Medcity Study Abroad, our mission, vision, leadership, values and commitment to helping students achieve global education and international career goals.",
    isPartOf: {
      "@id": `${SITE_URL}/#website`,
    },
    about: {
      "@id": `${SITE_URL}/#organization`,
    },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ABOUT_IMAGE_URL,
    },
    breadcrumb: {
      "@id": `${PAGE_URL}#breadcrumb`,
    },
    inLanguage: "en-IN",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
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

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en-IN" />

      <title>
        About Medcity Study Abroad | Overseas Education Consultants
      </title>

      <meta
        name="description"
        content="Learn about Medcity Study Abroad, our mission, leadership, values and expert support for overseas education, admissions, visas and international careers."
      />

      <meta
        name="robots"
        content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
      />

      <meta name="author" content="Medcity Study Abroad" />

      <link rel="canonical" href={PAGE_URL} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:site_name" content="Medcity Study Abroad" />

      <meta
        property="og:title"
        content="About Medcity Study Abroad | Overseas Education Consultants"
      />

      <meta
        property="og:description"
        content="Discover Medcity Study Abroad's story, mission, leadership and commitment to helping students achieve international education goals."
      />

      <meta property="og:url" content={PAGE_URL} />
      <meta property="og:image" content={OG_IMAGE_URL} />
      <meta property="og:image:secure_url" content={OG_IMAGE_URL} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta
        property="og:image:alt"
        content="Medcity Study Abroad overseas education consultants"
      />

      {/* X / Twitter */}
      <meta name="twitter:card" content="summary_large_image" />

      <meta
        name="twitter:title"
        content="About Medcity Study Abroad | Overseas Education Consultants"
      />

      <meta
        name="twitter:description"
        content="Discover the mission, leadership and values behind Medcity Study Abroad."
      />

      <meta name="twitter:image" content={OG_IMAGE_URL} />

      <meta
        name="twitter:image:alt"
        content="Medcity Study Abroad overseas education consultants"
      />

      {/* Structured data */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(websiteSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(aboutPageSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export default AboutSEO;