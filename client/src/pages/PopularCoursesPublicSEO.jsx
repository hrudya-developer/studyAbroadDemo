import { Helmet } from "react-helmet-async";

const SITE_URL = "https://medcityoverseas.com";
const PAGE_URL = `${SITE_URL}/study-popular-courses`;

const SEO_TITLE =
  "Popular Study Abroad Courses | Medcity Study Abroad";

const SEO_DESCRIPTION =
  "Explore popular study abroad courses, international programs and university opportunities with expert counselling from Medcity Study Abroad.";

const OG_IMAGE =
  `${SITE_URL}/images/study-popular-courses-og.webp`;

const normalizeUrl = (value = "") => {
  if (!value) return "";

  if (
    value.startsWith("http://") ||
    value.startsWith("https://")
  ) {
    return value;
  }

  return `${SITE_URL}${
    value.startsWith("/") ? value : `/${value}`
  }`;
};

const getCourseName = (course) =>
  course?.name ||
  course?.course_name ||
  course?.course ||
  course?.title ||
  "Study Abroad Course";

const getCourseId = (course, index) =>
  course?.id ||
  course?.course_id ||
  course?.c_id ||
  index + 1;

const getCourseImage = (
  course,
  courseImagePath
) => {
  const imageName =
    course?.icon ||
    course?.image ||
    course?.course_image ||
    course?.thumbnail ||
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
    courseImagePath || ""
  ).replace(/\/+$/, "");

  const filePath = String(imageName).replace(
    /^\/+/,
    ""
  );

  if (!basePath) {
    return normalizeUrl(filePath);
  }

  return `${basePath}/${filePath}`;
};

const PopularCoursesPublicSEO = ({
  popularCourses = [],
  courseImagePath = "",
  standalone = false,
}) => {
  const validCourses = Array.isArray(
    popularCourses
  )
    ? popularCourses.filter(Boolean)
    : [];

  const itemListElements = validCourses.map(
    (course, index) => {
      const courseName = getCourseName(course);
      const courseId = getCourseId(
        course,
        index
      );

      const courseUrl =
        course?.slug
          ? `${SITE_URL}/course/${course.slug}`
          : `${PAGE_URL}#course-${courseId}`;

      return {
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Course",
          "@id": courseUrl,
          url: courseUrl,
          name: courseName,
          description:
            course?.description ||
            course?.short_description ||
            `Explore ${courseName} study abroad opportunities with guidance from Medcity Study Abroad.`,
          image: getCourseImage(
            course,
            courseImagePath
          ),
          provider: {
            "@type": "Organization",
            name: "Medcity Study Abroad",
            url: SITE_URL,
          },
        },
      };
    }
  );

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${PAGE_URL}#course-list`,
    name: "Popular Study Abroad Courses",
    description: SEO_DESCRIPTION,
    numberOfItems: validCourses.length,
    itemListOrder:
      "https://schema.org/ItemListOrderAscending",
    itemListElement: itemListElements,
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${PAGE_URL}#webpage`,
    url: PAGE_URL,
    name: SEO_TITLE,
    description: SEO_DESCRIPTION,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Medcity Study Abroad",
    },
    about: {
      "@type": "Thing",
      name: "Study Abroad Courses",
    },
    mainEntity: {
      "@id": `${PAGE_URL}#course-list`,
    },
  };

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
        name: "Popular Courses",
        item: PAGE_URL,
      },
    ],
  };

  return (
    <Helmet>
      {standalone && (
        <>
          <title>{SEO_TITLE}</title>

          <meta
            name="description"
            content={SEO_DESCRIPTION}
          />

          <meta
            name="keywords"
            content="popular study abroad courses, overseas education courses, international university programs, courses abroad, study abroad programs, Medcity Study Abroad"
          />

          <meta
            name="robots"
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
            content="Popular study abroad courses offered by Medcity Study Abroad"
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
            {JSON.stringify(webPageSchema)}
          </script>

          <script type="application/ld+json">
            {JSON.stringify(
              breadcrumbSchema
            )}
          </script>
        </>
      )}

      {validCourses.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify(itemListSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default PopularCoursesPublicSEO;