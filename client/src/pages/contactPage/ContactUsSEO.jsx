import SEO from "../seo/SEO";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/contact-us`;
const OG_IMAGE = `${SITE_URL}/images/contact-us-og.webp`;

const BUSINESS_PHONE = "+91-9048059999";
const BUSINESS_EMAIL = "medcitykochi@miak.in";

const SOCIAL_PROFILES = [
  "https://www.instagram.com/medcitystudyabroad",
  "https://www.facebook.com/share/1D8vQXJskS/",
  "https://in.linkedin.com/company/medcity-study-abroad",
  "https://youtube.com/@medcitystudyabroad",
];

const TITLE =
  "Contact Study Abroad Consultants in Kerala | Medcity";

const DESCRIPTION =
  "Contact Medcity Study Abroad, Kerala's trusted overseas education consultants. Get free counselling for admissions, courses and student visas.";

const KEYWORDS = [
  "contact study abroad consultants Kerala",
  "overseas education consultants Kerala",
  "study abroad counselling Kerala",
  "university admission assistance",
  "student visa guidance",
  "Medcity Study Abroad contact",
].join(", ");

const contactPageSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: "en-IN",
      isPartOf: {
        "@id": `${SITE_URL}/#website`,
      },
      about: {
        "@id": `${SITE_URL}/#organization`,
      },
      breadcrumb: {
        "@id": `${PAGE_URL}#breadcrumb`,
      },
    },
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: "Medcity International Overseas Corporation",
      alternateName: "Medcity Study Abroad",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.png`,
      image: OG_IMAGE,
      telephone: BUSINESS_PHONE,
      email: BUSINESS_EMAIL,
      sameAs: SOCIAL_PROFILES,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer service",
        telephone: BUSINESS_PHONE,
        email: BUSINESS_EMAIL,
        areaServed: "IN",
        availableLanguage: ["English", "Malayalam"],
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
          name: "Contact Us",
          item: PAGE_URL,
        },
      ],
    },
  ],
};

const ContactUsSEO = () => {
  return (
    <SEO
      title={TITLE}
      description={DESCRIPTION}
      canonical={PAGE_URL}
      image={OG_IMAGE}
      keywords={KEYWORDS}
      structuredData={contactPageSchema}
      imageAlt="Contact Medcity Study Abroad consultants"
    />
  );
};

export default ContactUsSEO;