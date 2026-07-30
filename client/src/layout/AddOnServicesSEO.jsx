import {
  memo,
  useMemo,
} from "react";

import { Helmet } from "react-helmet-async";

const SITE_URL =
  "https://medcityoverseas.com";

/*
  This must exactly match the live route.

  Recommended route:
  /add-on-services

  If your current route is still /addOnServices,
  change PAGE_PATH accordingly.
*/
const PAGE_PATH = "/add-on-services";
const PAGE_URL = `${SITE_URL}${PAGE_PATH}`;

const ORGANIZATION_ID =
  `${SITE_URL}/#organization`;

const WEBSITE_ID =
  `${SITE_URL}/#website`;

const WEBPAGE_ID =
  `${PAGE_URL}#webpage`;

const BREADCRUMB_ID =
  `${PAGE_URL}#breadcrumb`;

const SERVICE_LIST_ID =
  `${PAGE_URL}#service-list`;

const SEO_TITLE =
  "Study Abroad Add-On Services | Medcity Study Abroad";

const SEO_DESCRIPTION =
  "Explore Medcity Study Abroad support services for university admissions, student visas, education loans, accommodation, travel and pre-departure preparation.";

const SEO_KEYWORDS = [
  "study abroad services",
  "student visa assistance Kerala",
  "education loan assistance",
  "study abroad accommodation support",
  "pre departure guidance",
  "overseas education services Kerala",
  "university admission support",
  "Medcity Study Abroad services",
].join(", ");

const OG_IMAGE =
  `${SITE_URL}/images/add-on-services-og.webp`;

const ROBOTS =
  "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

const getServiceName = (service) =>
  service?.name?.trim() ||
  service?.service_name?.trim() ||
  service?.title?.trim() ||
  "Study Abroad Support Service";

const getServiceDescription = (
  service
) =>
  service?.description?.trim() ||
  service?.short_description?.trim() ||
  "Study abroad support service provided by Medcity Study Abroad.";

const getServiceId = (
  service,
  index
) =>
  service?.id ||
  service?.service_id ||
  `service-${index + 1}`;

const getServiceImage = (
  service,
  imageBaseUrl
) => {
  const imageName =
    service?.image ||
    service?.icon ||
    service?.thumbnail ||
    "";

  if (!imageName) {
    return OG_IMAGE;
  }

  if (
    imageName.startsWith("http://") ||
    imageName.startsWith("https://")
  ) {
    return imageName;
  }

  const basePath = String(
    imageBaseUrl || ""
  ).replace(/\/+$/, "");

  const filePath = String(
    imageName
  ).replace(/^\/+/, "");

  if (!basePath) {
    return OG_IMAGE;
  }

  return `${basePath}/${filePath}`;
};

const AddOnServicesSEO = ({
  services = [],
  imageBaseUrl = "",
}) => {
  const validServices = useMemo(
    () =>
      Array.isArray(services)
        ? services.filter(Boolean)
        : [],
    [services]
  );

  const structuredData = useMemo(() => {
    const serviceListSchema = {
      "@type": "ItemList",
      "@id": SERVICE_LIST_ID,
      name:
        "Medcity Study Abroad Add-On Services",
      description: SEO_DESCRIPTION,
      numberOfItems:
        validServices.length,
      itemListOrder:
        "https://schema.org/ItemListOrderAscending",
      itemListElement:
        validServices.map(
          (service, index) => {
            const id = getServiceId(
              service,
              index
            );

            const serviceName =
              getServiceName(service);

            const serviceUrl =
              `${PAGE_URL}#service-${id}`;

            return {
              "@type": "ListItem",
              position: index + 1,
              item: {
                "@type": "Service",
                "@id": serviceUrl,
                url: serviceUrl,
                name: serviceName,
                description:
                  getServiceDescription(
                    service
                  ),
                image: {
                  "@type": "ImageObject",
                  url: getServiceImage(
                    service,
                    imageBaseUrl
                  ),
                },
                serviceType:
                  serviceName,
                provider: {
                  "@id":
                    ORGANIZATION_ID,
                },
                areaServed: {
                  "@type": "Country",
                  name: "India",
                },
              },
            };
          }
        ),
    };

    const webPageSchema = {
      "@type": "CollectionPage",
      "@id": WEBPAGE_ID,
      url: PAGE_URL,
      name: SEO_TITLE,
      headline: SEO_TITLE,
      description: SEO_DESCRIPTION,
      inLanguage: "en-IN",
      isPartOf: {
        "@id": WEBSITE_ID,
      },
      publisher: {
        "@id": ORGANIZATION_ID,
      },
      about: {
        "@type": "Thing",
        name:
          "Study Abroad Support Services",
      },
      mainEntity: {
        "@id": SERVICE_LIST_ID,
      },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: OG_IMAGE,
        contentUrl: OG_IMAGE,
        width: 1200,
        height: 630,
      },
      breadcrumb: {
        "@id": BREADCRUMB_ID,
      },
    };

    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": BREADCRUMB_ID,
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
          name: "Add-On Services",
          item: PAGE_URL,
        },
      ],
    };

    return {
      "@context":
        "https://schema.org",
      "@graph": [
        webPageSchema,
        breadcrumbSchema,
        serviceListSchema,
      ],
    };
  }, [
    imageBaseUrl,
    validServices,
  ]);

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en-IN" />

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
        content={ROBOTS}
      />

      <meta
        name="googlebot"
        content={ROBOTS}
      />

      <meta
        name="author"
        content="Medcity Study Abroad"
      />

      <meta
        name="publisher"
        content="Medcity Study Abroad"
      />

      <meta
        name="application-name"
        content="Medcity Study Abroad"
      />

      <meta
        name="theme-color"
        content="#c01f53"
      />

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
        property="og:site_name"
        content="Medcity Study Abroad"
      />

      <meta
        property="og:locale"
        content="en_IN"
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
        property="og:image:secure_url"
        content={OG_IMAGE}
      />

      <meta
        property="og:image:type"
        content="image/webp"
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
        content="Medcity Study Abroad add-on services"
      />

      {/* Twitter */}
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

      <meta
        name="twitter:image:alt"
        content="Medcity Study Abroad add-on services"
      />

      <script type="application/ld+json">
        {JSON.stringify(
          structuredData
        )}
      </script>
    </Helmet>
  );
};

export default memo(
  AddOnServicesSEO
);