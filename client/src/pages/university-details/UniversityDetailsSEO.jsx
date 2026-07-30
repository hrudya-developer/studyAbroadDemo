import { memo, useMemo } from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL =
  "https://medcityoverseas.com";

const ORGANIZATION_ID =
  `${SITE_URL}/#organization`;

const WEBSITE_ID =
  `${SITE_URL}/#website`;

const DEFAULT_OG_IMAGE =
  `${SITE_URL}/images/university-details-og.webp`;

const ROBOTS =
  "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1";

const cleanText = (value) =>
  String(value || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const truncateText = (
  value,
  maxLength = 160
) => {
  const text = cleanText(value);

  if (text.length <= maxLength) {
    return text;
  }

  return `${text
    .slice(0, maxLength - 1)
    .trim()}…`;
};

const buildImageUrl = (
  basePath,
  image
) => {
  if (!image) {
    return DEFAULT_OG_IMAGE;
  }

  const imageValue =
    String(image).trim();

  if (
    imageValue.startsWith("http://") ||
    imageValue.startsWith("https://")
  ) {
    return imageValue;
  }

  const normalizedBase =
    String(basePath || "").replace(
      /\/+$/,
      ""
    );

  const normalizedFile =
    imageValue.replace(/^\/+/, "");

  if (!normalizedBase) {
    return DEFAULT_OG_IMAGE;
  }

  return `${normalizedBase}/${normalizedFile}`;
};

const getUniversityId = (
  university,
  fallbackId
) =>
  university?.id ||
  university?.u_id ||
  university?.university_id ||
  fallbackId;

const getUniversityName = (
  university
) =>
  cleanText(
    university?.name ||
      university?.university_name ||
      "University"
  );

const getCourseId = (
  course,
  index
) =>
  course?.id ||
  course?.course_id ||
  course?.c_id ||
  `course-${index + 1}`;

const getCourseName = (
  course,
  index
) =>
  cleanText(
    course?.name ||
      course?.course ||
      course?.course_name ||
      course?.title ||
      `Course ${index + 1}`
  );

const UniversityDetailsSEO = ({
  university,
  universityId,
  countryName = "",
  locationText = "",
  universityType = "",
  ranking = "",
  aboutText = "",
  logo = "",
  universityImagePath = "",
  sliderImages = [],
  courses = [],
}) => {
  const id = getUniversityId(
    university,
    universityId
  );

  const universityName =
    getUniversityName(university);

  /*
    Must exactly match the live React Router URL.

    Example route:
    /universityDetails/:id
  */
  const pageUrl =
    `${SITE_URL}/university-details/${id}`;

  const universitySchemaId =
    `${pageUrl}#university`;

  const webpageSchemaId =
    `${pageUrl}#webpage`;

  const breadcrumbSchemaId =
    `${pageUrl}#breadcrumb`;

  const courseListSchemaId =
    `${pageUrl}#courses`;

  const description = truncateText(
    aboutText ||
      `${universityName} is located in ${locationText}. Explore courses, rankings, scholarships and admission requirements.`
  );

  const pageTitle =
    `${universityName} Courses, Ranking & Admissions | Medcity`;

  const primaryImage =
    sliderImages?.[0] ||
    logo ||
    buildImageUrl(
      universityImagePath,
      university?.logo
    );

  const validCourses = useMemo(
    () =>
      Array.isArray(courses)
        ? courses.filter(Boolean)
        : [],
    [courses]
  );

  const structuredData = useMemo(() => {
    const universitySchema = {
      "@type": [
        "CollegeOrUniversity",
        "EducationalOrganization",
      ],

      "@id": universitySchemaId,

      name: universityName,

      url: pageUrl,

      description,

      image: {
        "@type": "ImageObject",
        url: primaryImage,
      },

      logo: logo || primaryImage,

      address: {
        "@type": "PostalAddress",
        addressLocality:
          locationText || undefined,
        addressCountry:
          countryName || undefined,
      },

      location: {
        "@type": "Place",
        name:
          locationText ||
          countryName ||
          universityName,
      },

      areaServed:
        countryName || undefined,

      organizationType:
        universityType || undefined,

      sameAs:
        university?.website
          ? [university.website]
          : undefined,
    };

    const breadcrumbSchema = {
      "@type": "BreadcrumbList",
      "@id": breadcrumbSchemaId,

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
          name: "Universities",
          item:
            `${SITE_URL}/allUniversities`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: universityName,
          item: pageUrl,
        },
      ],
    };

    const webpageSchema = {
      "@type": "WebPage",
      "@id": webpageSchemaId,

      url: pageUrl,

      name: pageTitle,

      headline: universityName,

      description,

      inLanguage: "en-IN",

      isPartOf: {
        "@id": WEBSITE_ID,
      },

      publisher: {
        "@id": ORGANIZATION_ID,
      },

      about: {
        "@id": universitySchemaId,
      },

      mainEntity: {
        "@id": universitySchemaId,
      },

      primaryImageOfPage: {
        "@type": "ImageObject",
        url: primaryImage,
      },

      breadcrumb: {
        "@id": breadcrumbSchemaId,
      },
    };

    const courseListSchema = {
      "@type": "ItemList",
      "@id": courseListSchemaId,

      name:
        `Courses at ${universityName}`,

      numberOfItems:
        validCourses.length,

      itemListElement:
        validCourses.map(
          (course, index) => {
            const courseId =
              getCourseId(
                course,
                index
              );

            const courseName =
              getCourseName(
                course,
                index
              );

            const courseUrl =
              `${SITE_URL}/courseDetailsOfUniv/${courseId}`;

            return {
              "@type": "ListItem",

              position: index + 1,

              item: {
                "@type": "Course",

                "@id":
                  `${courseUrl}#course`,

                url: courseUrl,

                name: courseName,

                description:
                  truncateText(
                    course?.description ||
                      course?.about ||
                      `${courseName} at ${universityName}.`,
                    220
                  ),

                provider: {
                  "@id":
                    universitySchemaId,
                },
              },
            };
          }
        ),
    };

    const graph = [
      webpageSchema,
      universitySchema,
      breadcrumbSchema,
    ];

    if (validCourses.length > 0) {
      graph.push(
        courseListSchema
      );
    }

    return {
      "@context":
        "https://schema.org",

      "@graph": graph,
    };
  }, [
    aboutText,
    breadcrumbSchemaId,
    countryName,
    description,
    locationText,
    logo,
    pageTitle,
    pageUrl,
    primaryImage,
    university,
    universityName,
    universitySchemaId,
    universityType,
    validCourses,
    webpageSchemaId,
  ]);

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en-IN" />

      <title>{pageTitle}</title>

      <meta
        name="description"
        content={description}
      />

      <meta
        name="keywords"
        content={[
          universityName,
          `${universityName} courses`,
          `${universityName} admissions`,
          `${universityName} ranking`,
          `${universityName} scholarships`,
          `study at ${universityName}`,
          `universities in ${countryName}`,
          "study abroad universities",
        ].join(", ")}
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
        name="theme-color"
        content="#c01f53"
      />

      <link
        rel="canonical"
        href={pageUrl}
      />

      {/* Open Graph */}
      <meta
        property="og:type"
        content="website"
      />

      <meta
        property="og:title"
        content={pageTitle}
      />

      <meta
        property="og:description"
        content={description}
      />

      <meta
        property="og:url"
        content={pageUrl}
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
        property="og:image"
        content={primaryImage}
      />

      <meta
        property="og:image:secure_url"
        content={primaryImage}
      />

      <meta
        property="og:image:alt"
        content={`${universityName} university`}
      />

      {/* Twitter */}
      <meta
        name="twitter:card"
        content="summary_large_image"
      />

      <meta
        name="twitter:title"
        content={pageTitle}
      />

      <meta
        name="twitter:description"
        content={description}
      />

      <meta
        name="twitter:image"
        content={primaryImage}
      />

      <meta
        name="twitter:image:alt"
        content={`${universityName} university`}
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
  UniversityDetailsSEO
);