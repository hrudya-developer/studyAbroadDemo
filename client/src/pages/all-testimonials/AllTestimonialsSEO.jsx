import { Helmet } from "react-helmet-async";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/testimonials`;
const OG_IMAGE = `${SITE_URL}/images/testimonials-og.webp`;

const SEO_TITLE =
  "Student Testimonials | Medcity Study Abroad";

const SEO_DESCRIPTION =
  "Read real student testimonials and success stories from students who received study abroad counselling, admissions and visa support from Medcity Study Abroad.";

const SEO_KEYWORDS = [
  "Medcity Study Abroad testimonials",
  "student testimonials Kerala",
  "study abroad student reviews",
  "overseas education student reviews",
  "study abroad success stories",
  "Medcity student reviews",
  "study abroad consultants Kerala reviews",
].join(", ");

const getPlainText = (value = "") =>
  String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

export default function AllTestimonialsSEO({
  testimonials = [],
}) {
  const validTestimonials = Array.isArray(
    testimonials
  )
    ? testimonials.filter(
        (item) =>
          item?.name ||
          item?.text
      )
    : [];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${PAGE_URL}#webpage`,
        url: PAGE_URL,
        name: SEO_TITLE,
        headline:
          "Student Testimonials and Success Stories",
        description: SEO_DESCRIPTION,
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
        mainEntity: {
          "@id": `${PAGE_URL}#testimonial-list`,
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
            name: "Student Testimonials",
            item: PAGE_URL,
          },
        ],
      },

      {
        "@type": "ItemList",
        "@id": `${PAGE_URL}#testimonial-list`,
        name: "Medcity Study Abroad Student Testimonials",
        numberOfItems:
          validTestimonials.length,
        itemListElement:
          validTestimonials.map(
            (item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Review",
                "@id": `${PAGE_URL}#review-${
                  item?.id || index + 1
                }`,
                name: `${
                  item?.name || "Student"
                } testimonial`,
                reviewBody: getPlainText(
                  item?.text
                ),
                author: {
                  "@type": "Person",
                  name:
                    item?.name ||
                    "Medcity Student",
                },
                itemReviewed: {
                  "@type":
                    "EducationalOrganization",
                  "@id": `${SITE_URL}/#organization`,
                  name: "Medcity Study Abroad",
                  url: SITE_URL,
                },
              },
            })
          ),
      },
    ],
  };

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
        property="og:image:width"
        content="1200"
      />

      <meta
        property="og:image:height"
        content="630"
      />

      <meta
        property="og:image:alt"
        content="Medcity Study Abroad student testimonials"
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

      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}