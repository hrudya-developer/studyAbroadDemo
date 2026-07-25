import { useMemo, useState } from "react";

import SEO from "../seo/SEO";
import AcademyCentersHeader from "./AcademyCentersHeader";
import BranchControls from "./BranchControls";
import BranchGrid from "./BranchGrid";
import { centers } from "./centersData";

const INITIAL_VISIBLE = 6;
const LOAD_COUNT = 3;

const PAGE_URL =
  "https://medcityoverseas.com/branches";

const SEO_TITLE =
  "Medcity Study Abroad Branches Across Kerala | Find Your Nearest Branch";

const SEO_DESCRIPTION =
  "Explore Medcity Study Abroad branches across Kerala. Find your nearest branch for overseas education counselling, university admissions, visa guidance, language training and study abroad support.";

const SEO_KEYWORDS = [
  "Medcity Study Abroad branches",
  "Medcity branches Kerala",
  "study abroad branches Kerala",
  "study abroad consultants Kerala",
  "overseas education consultants Kerala",
  "overseas education branches Kerala",
  "study abroad counselling Kerala",
  "student visa guidance Kerala",
  "university admission support Kerala",
].join(", ");

const branchesStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#webpage`,
      url: PAGE_URL,
      name: SEO_TITLE,
      description: SEO_DESCRIPTION,
      inLanguage: "en-IN",

      isPartOf: {
        "@type": "WebSite",
        "@id":
          "https://medcityoverseas.com/#website",
        url: "https://medcityoverseas.com/",
        name: "Medcity Study Abroad",
      },

      about: {
        "@type": "Organization",
        "@id":
          "https://medcityoverseas.com/#organization",
        name: "Medcity Study Abroad",
        url: "https://medcityoverseas.com/",
      },

      breadcrumb: {
        "@id": `${PAGE_URL}#breadcrumb`,
      },

      mainEntity: {
        "@id": `${PAGE_URL}#branches-list`,
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
          item:
            "https://medcityoverseas.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Study Abroad Branches",
          item: PAGE_URL,
        },
      ],
    },

    {
      "@type": "ItemList",
      "@id": `${PAGE_URL}#branches-list`,
      name: "Medcity Study Abroad Branches",
      description:
        "List of Medcity Study Abroad branches across Kerala.",
      numberOfItems: centers.length,

      itemListElement: centers.map(
        (center, index) => ({
          "@type": "ListItem",
          position: index + 1,

          item: {
            "@type": "EducationalOrganization",

            name:
              center.name ||
              center.title ||
              center.branch ||
              `Medcity Study Abroad Branch ${
                index + 1
              }`,

            parentOrganization: {
              "@type": "Organization",
              "@id":
                "https://medcityoverseas.com/#organization",
              name: "Medcity Study Abroad",
            },

            ...(center.address && {
              address: {
                "@type": "PostalAddress",
                streetAddress: center.address,
                addressRegion: "Kerala",
                addressCountry: "IN",
              },
            }),

            ...(center.phone && {
              telephone: center.phone,
            }),

            ...(center.email && {
              email: center.email,
            }),

            ...(center.mapLink && {
              hasMap: center.mapLink,
            }),
          },
        })
      ),
    },
  ],
};

const AcademyCenters = () => {
  const [visibleCount, setVisibleCount] =
    useState(INITIAL_VISIBLE);

  const visibleCenters = useMemo(() => {
    return centers.slice(0, visibleCount);
  }, [visibleCount]);

  const hasMore =
    visibleCount < centers.length;

  const canHideRows =
    visibleCount > INITIAL_VISIBLE;

  const handleShowMore = () => {
    setVisibleCount((currentCount) =>
      Math.min(
        currentCount + LOAD_COUNT,
        centers.length
      )
    );
  };

  const handleHidePrevious = () => {
    setVisibleCount((currentCount) =>
      Math.max(
        currentCount - LOAD_COUNT,
        INITIAL_VISIBLE
      )
    );

    requestAnimationFrame(() => {
      document
        .getElementById(
          "medcity-study-abroad-branches"
        )
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  };

  return (
    <>
      <SEO
        title={SEO_TITLE}
        description={SEO_DESCRIPTION}
        canonical={PAGE_URL}
        image="https://medcityoverseas.com/images/medcity-og-image.webp"
        keywords={SEO_KEYWORDS}
        structuredData={branchesStructuredData}
      />

      <main>
        <section
          id="medcity-study-abroad-branches"
          aria-labelledby="branches-heading"
          className="
            relative isolate
            mx-auto mb-10
            max-w-9xl overflow-hidden
            bg-gradient-to-b
            from-white via-[#fffafd] to-white
          "
        >
          <BackgroundDecorations />

          <div
            className="
              relative mx-auto
              w-full max-w-9xl
            "
          >
            <AcademyCentersHeader
              totalBranches={centers.length}
            />

            <BranchGrid
              centers={visibleCenters}
            />

            <BranchControls
              hasMore={hasMore}
              canHideRows={canHideRows}
              onShowMore={handleShowMore}
              onHidePrevious={
                handleHidePrevious
              }
            />

            {!hasMore && (
              <p
                role="status"
                aria-live="polite"
                className="
                  mt-5 text-center
                  text-sm font-medium
                  text-slate-500
                "
              >
                All {centers.length} Medcity
                Study Abroad branches are
                displayed.
              </p>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

const BackgroundDecorations = () => {
  return (
    <>
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-32 -top-28
          h-80 w-80 rounded-full
          bg-primary/10 blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-28 top-0
          h-96 w-96 rounded-full
          bg-secondary/10 blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0
          opacity-[0.025]
          [background-image:radial-gradient(#631A33_1px,transparent_1px)]
          [background-size:22px_22px]
        "
      />
    </>
  );
};

export default AcademyCenters;