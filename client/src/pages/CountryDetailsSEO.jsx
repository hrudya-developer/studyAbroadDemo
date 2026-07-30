import { Helmet } from "react-helmet-async";

const SITE_URL = "https://medcityoverseas.com";

const cleanText = (value = "") =>
  String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const limitText = (value, maxLength = 160) => {
  const text = cleanText(value);

  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength - 1).trim()}…`;
};

const CountryDetailsSEO = ({
  country,
  countryId,
  image,
  flag,
  attractions = [],
}) => {
  const countryName = cleanText(country?.country) || "Study Abroad";

  const title = `Study in ${countryName} | Universities, Courses & Visa Guidance | Medcity`;

  const description = limitText(
    country?.description ||
      `Study in ${countryName} with Medcity Study Abroad. Explore universities, courses, eligibility, admissions, scholarships, student visas and career opportunities.`
  );

  const canonicalUrl = `${SITE_URL}/destination/${countryId}`;

  const ogImage =
    image || `${SITE_URL}/images/study-abroad-og.webp`;

  const keywords = [
    `study in ${countryName}`,
    `${countryName} universities`,
    `${countryName} courses for international students`,
    `${countryName} student visa`,
    `${countryName} education consultants Kerala`,
    `universities in ${countryName}`,
    `admission in ${countryName}`,
    `scholarships in ${countryName}`,
    `overseas education ${countryName}`,
    "Medcity Study Abroad",
  ].join(", ");

  const attractionNames = attractions
    .map((item) => cleanText(item?.text || item?.name))
    .filter(Boolean);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Study Destinations",
        item: `${SITE_URL}/destinationList`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Study in ${countryName}`,
        item: canonicalUrl,
      },
    ],
  };

  const placeSchema = {
    "@context": "https://schema.org",
    "@type": "Country",
    name: countryName,
    description,
    url: canonicalUrl,
    image: ogImage,
    containedInPlace: country?.continent
      ? {
          "@type": "Place",
          name: cleanText(country.continent),
        }
      : undefined,
  };

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: canonicalUrl,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: ogImage,
    },
    about: {
      "@type": "Country",
      name: countryName,
    },
    publisher: {
      "@type": "Organization",
      name: "Medcity Study Abroad",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.png`,
      },
    },
  };

  const faqSchema =
    attractionNames.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: `Why should students study in ${countryName}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: attractionNames.join(", "),
              },
            },
            {
              "@type": "Question",
              name: `What can students explore in ${countryName}?`,
              acceptedAnswer: {
                "@type": "Answer",
                text: `Students can explore universities, career-focused courses, admissions, scholarships, visa guidance and international career opportunities in ${countryName}.`,
              },
            },
          ],
        }
      : null;

  return (
    <Helmet>
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Medcity Study Abroad" />

      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Medcity Study Abroad" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta
        property="og:image:alt"
        content={`Study in ${countryName}`}
      />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta
        name="twitter:image:alt"
        content={`Study in ${countryName}`}
      />

      {flag && (
        <link
          rel="preload"
          as="image"
          href={flag}
        />
      )}

      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(placeSchema)}
      </script>

      <script type="application/ld+json">
        {JSON.stringify(webpageSchema)}
      </script>

      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default CountryDetailsSEO;