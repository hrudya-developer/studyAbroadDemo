import { Helmet } from "react-helmet-async";

import OurBranches from "../../layout/OurBranches";
import ContactForm from "./ContactForm";
import ContactHero from "./ContactHero";
import ContactInfo from "./ContactInfo";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/contact-us`;
const OG_IMAGE = `${SITE_URL}/images/contact-us-og.webp`;

// Corporate office (Kochi) — used as the primary contact point in schema.
const BUSINESS_PHONE = "+91-9048059999";
const BUSINESS_EMAIL = "medcitykochi@miak.in";

// Pulled from BottomBar.jsx — keep these in sync if that component's
// social links ever change.
const SOCIAL_PROFILES = [
  "https://www.instagram.com/medcitystudyabroad?igsh=Nmt2dGZqbjNrZDVk&utm_source=qr",
  "https://www.facebook.com/share/1D8vQXJskS/?mibextid=wwXIfr",
  "https://in.linkedin.com/company/medcity-study-abroad",
  "https://youtube.com/@medcitystudyabroad?si=eU1G7UToEzt_H2yj",
];

// No Twitter/X profile currently listed in BottomBar's socialLinks —
// twitter:site meta tag omitted below until a real handle is confirmed.

const ContactUs = () => {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${PAGE_URL}#contact-page`,
    url: PAGE_URL,
    name: "Contact Medcity Study Abroad",
    // Fixed: no longer promises "book now" — matches the real page (form + phone call only)
    description:
      "Contact Medcity Study Abroad, Kerala's trusted overseas education consultants. Get free counselling on admissions, courses & visas — call us or fill out our form.",
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Medcity Study Abroad",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": PAGE_URL,
    },
    about: {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      // Legal entity name — must match Google Business Profile / official
      // registrations exactly for NAP consistency (see BottomBar.jsx
      // copyright line, which already uses this name).
      name: "Medcity International Overseas Corporation",
      alternateName: "Medcity Study Abroad",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.png`,
      image: OG_IMAGE,
      telephone: BUSINESS_PHONE,
      email: BUSINESS_EMAIL,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Kozhikode",
        addressRegion: "Kerala",
        addressCountry: "IN",
      },
      sameAs: SOCIAL_PROFILES,
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "customer service",
          telephone: BUSINESS_PHONE,
          email: BUSINESS_EMAIL,
          areaServed: "IN",
          availableLanguage: ["en", "ml"],
        },
      ],
    },
    // This mirrors the visible breadcrumb rendered inside ContactHero —
    // keep them in sync if that component's breadcrumb ever changes.
    breadcrumb: {
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
  };

  return (
    <>
      <Helmet prioritizeSeoTags>
        <html lang="en" />

        <title>Contact Study Abroad Consultants in Kerala | Medcity</title>

        <meta
          name="description"
          content="Contact Medcity Study Abroad, Kerala's trusted overseas education consultants. Get free counselling on admissions, courses & visas — call us or fill out our form."
        />

        <meta
          name="keywords"
          content="contact study abroad consultants Kerala, overseas education consultants Kerala, study abroad counselling, university admission assistance, student visa guidance, Medcity Study Abroad"
        />

        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />

        <link rel="canonical" href={PAGE_URL} />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Contact Study Abroad Consultants in Kerala | Medcity"
        />
        <meta
          property="og:description"
          content="Speak with Medcity Study Abroad experts for personalised overseas education, admission and visa guidance — call us or send us your details."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content={OG_IMAGE} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/webp" />
        <meta
          property="og:image:alt"
          content="Contact Medcity Study Abroad consultants"
        />
        <meta property="og:site_name" content="Medcity Study Abroad" />
        <meta property="og:locale" content="en_IN" />

        {/* X / Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        {/* twitter:site omitted — no confirmed X/Twitter handle for this business */}
        <meta
          name="twitter:title"
          content="Contact Study Abroad Consultants in Kerala | Medcity"
        />
        <meta
          name="twitter:description"
          content="Get expert support with course selection, university applications and student visa guidance — call us or fill out our form."
        />
        <meta name="twitter:image" content={OG_IMAGE} />
        <meta
          name="twitter:image:alt"
          content="Contact Medcity Study Abroad consultants"
        />

        <script type="application/ld+json">
          {JSON.stringify(contactPageSchema)}
        </script>
      </Helmet>

      <main id="main-content">
        {/* Breadcrumb lives inside ContactHero, right above the h1 —
            do not add a second one here. */}
        <ContactHero />

        <section id="contact-form" aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading" className="sr-only">
            Contact our study abroad counsellors
          </h2>

          <ContactForm />
        </section>

        <section id="our-branches" aria-labelledby="branches-heading">
          <h2 id="branches-heading" className="sr-only">
            Find a Medcity Study Abroad branch near you
          </h2>

          <OurBranches />
          <ContactInfo />
        </section>
      </main>
    </>
  );
};

export default ContactUs;