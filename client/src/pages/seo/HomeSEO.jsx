import SEO from "./SEO";

const SITE_URL = "https://medcityoverseas.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${SITE_URL}/#organization`,
  name: "Medcity International Overseas Corporation",
  alternateName: "Medcity Study Abroad",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  image: `${SITE_URL}/images/medcity-og-image.webp`,
  telephone: "+91-9048059999",
  email: "medcitykochi@miak.in",

  address: {
    "@type": "PostalAddress",
    streetAddress: "Add the exact office address",
    addressLocality: "Kochi",
    addressRegion: "Kerala",
    postalCode: "Add the real postal code",
    addressCountry: "IN",
  },

  areaServed: {
    "@type": "State",
    name: "Kerala",
  },

  sameAs: [
    "https://www.instagram.com/medcitystudyabroad",
    "https://www.facebook.com/share/1D8vQXJskS/",
    "https://in.linkedin.com/company/medcity-study-abroad",
    "https://youtube.com/@medcitystudyabroad",
  ],

  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+91-9048059999",
    email: "medcitykochi@miak.in",
    areaServed: "IN",
    availableLanguage: ["English", "Malayalam"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Medcity Study Abroad",
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
  inLanguage: "en-IN",
};

const HomeSEO = () => {
  return (
    <SEO
      title="Study Abroad Consultants in Kerala | Medcity Study Abroad"
      description="Get expert guidance for studying in Germany, the UK, Canada, Australia, Ireland and New Zealand with Medcity Study Abroad."
      canonical={SITE_URL}
      image={`${SITE_URL}/images/medcity-og-image.webp`}
      structuredData={{
        "@context": "https://schema.org",
        "@graph": [organizationSchema, websiteSchema],
      }}
    />
  );
};

export default HomeSEO;