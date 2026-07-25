import { Helmet } from "react-helmet-async";

import OurBranches from "../../layout/OurBranches";
import ContactForm from "./ContactForm";
import ContactHero from "./ContactHero";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/contact-us`;

const ContactUs = () => {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${PAGE_URL}#contact-page`,
    url: PAGE_URL,
    name: "Contact Medcity Study Abroad",
    description:
      "Contact Medcity Study Abroad for expert overseas education counselling, university admissions, course selection and student visa guidance.",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Medcity Study Abroad",
    },
    about: {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: "Medcity Study Abroad",
      url: SITE_URL,
      logo: `${SITE_URL}/favicon.png`,
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
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

        <title>
          Contact Study Abroad Consultants in Kerala | Medcity
        </title>

        <meta
          name="description"
          content="Contact Medcity Study Abroad consultants in Kerala for overseas education counselling, university admissions, course selection and student visa guidance."
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
          content="Speak with Medcity Study Abroad experts for personalised overseas education, admission and visa guidance."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={PAGE_URL} />
        <meta
          property="og:image"
          content={`${SITE_URL}/images/contact-us-og.webp`}
        />
        <meta
          property="og:image:alt"
          content="Contact Medcity Study Abroad consultants"
        />
        <meta property="og:site_name" content="Medcity Study Abroad" />
        <meta property="og:locale" content="en_IN" />

        {/* X / Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Contact Study Abroad Consultants in Kerala | Medcity"
        />
        <meta
          name="twitter:description"
          content="Get expert support with course selection, university applications and student visa guidance."
        />
        <meta
          name="twitter:image"
          content={`${SITE_URL}/images/contact-us-og.webp`}
        />

        <script type="application/ld+json">
          {JSON.stringify(contactPageSchema)}
        </script>
      </Helmet>

      <main id="main-content">
        <ContactHero />

        <section
          id="contact-form"
          aria-labelledby="contact-form-heading"
        >
          <h2 id="contact-form-heading" className="sr-only">
            Contact our study abroad counsellors
          </h2>

          <ContactForm />
        </section>

        <section
          id="our-branches"
          aria-labelledby="branches-heading"
        >
          <h2 id="branches-heading" className="sr-only">
            Find a Medcity Study Abroad branch near you
          </h2>

          <OurBranches />
        </section>
      </main>
    </>
  );
};

export default ContactUs;