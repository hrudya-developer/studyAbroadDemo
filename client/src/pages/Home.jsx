import { lazy } from "react";

import SEO from "./seo/SEO";
import Carousel from "../layout/Carousel";
import LazySection from "../components/LazySection";
import OurBranches from "../layout/OurBranches";
import FAQ from "../layout/FAQ/FAQ";

import { faqItems } from "../layout/FAQ/faqData";
import HomeSEO from "./seo/HomeSEO";

/*
 * Homepage sections below the hero are split
 * into separate JavaScript chunks.
 */
const SearchSection = lazy(() =>
  import("../layout/SearchSection")
);

const MainSectionOne = lazy(() =>
  import("../layout/MainSectionOne")
);

const ProgramsSection = lazy(() =>
  import("../layout/ProgramsSection")
);

const Destinations = lazy(() =>
  import("../layout/Destinations")
);

const MobileApp = lazy(() =>
  import("../layout/MobileApp")
);

const GermanCoursesLayout = lazy(() =>
  import("../layout/german-programs/GermanCoursesLayout")
);

const EssentialService = lazy(() =>
  import("../layout/EssentialService")
);

const SASteps = lazy(() =>
  import("../layout/SASteps")
);

const Testimonial = lazy(() =>
  import("../layout/Testimonial")
);

const GridBackgroundView = lazy(() =>
  import("../layout/GridBackgroundView")
);

const Counselling = lazy(() =>
  import("../layout/Counselling")
);

/*
 * FAQ schema is generated from the same data
 * used by the visible FAQ section.
 */
const faqStructuredData = {
  "@type": "FAQPage",
  "@id": "https://medcityoverseas.com/#faq",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

/*
 * Homepage JSON-LD structured data.
 */
const homeStructuredData = {
  "@context": "https://schema.org",

  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id":
        "https://medcityoverseas.com/#organization",

      name: "Medcity Study Abroad",
      alternateName: "MedCity Overseas",

      url: "https://medcityoverseas.com/",

      logo: {
        "@type": "ImageObject",
        "@id":
          "https://medcityoverseas.com/#logo",

        url:
          "https://medcityoverseas.com/logo.png",

        contentUrl:
          "https://medcityoverseas.com/logo.png",

        width: 150,
        height: 50,

        caption: "Medcity Study Abroad",
      },

      image: {
        "@type": "ImageObject",
        url:
          "https://medcityoverseas.com/images/medcity-og-image.webp",
        width: 1200,
        height: 630,
      },

      description:
        "Medcity Study Abroad helps students pursue international education through counselling, university admissions, visa assistance and language training.",

      foundingDate: "2012",

      address: {
        "@type": "PostalAddress",
        streetAddress: "Chettipeedika",
        addressLocality: "Kannur",
        addressRegion: "Kerala",
        postalCode: "670004",
        addressCountry: "IN",
      },

      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+91-89432-80333",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: [
            "English",
            "Malayalam",
          ],
        },
        {
          "@type": "ContactPoint",
          telephone: "+91-96450-20503",
          contactType: "customer service",
          areaServed: "IN",
          availableLanguage: [
            "English",
            "Malayalam",
          ],
        },
      ],

      sameAs: [
        "https://www.instagram.com/medcitystudyabroad",
        "https://www.facebook.com/share/1D8vQXJskS/",
        "https://in.linkedin.com/company/medcity-study-abroad",
        "https://youtube.com/@medcitystudyabroad",
      ],
    },

    {
      "@type": "WebSite",
      "@id":
        "https://medcityoverseas.com/#website",

      url: "https://medcityoverseas.com/",

      name: "Medcity Study Abroad",
      alternateName: "MedCity Overseas",

      description:
        "Study abroad counselling, university admission and student visa assistance.",

      publisher: {
        "@id":
          "https://medcityoverseas.com/#organization",
      },

      inLanguage: "en-IN",
    },

    {
      "@type": "WebPage",
      "@id":
        "https://medcityoverseas.com/#webpage",

      url: "https://medcityoverseas.com/",

      name:
        "Study Abroad Consultants in Kerala | Medcity Study Abroad",

      description:
        "Medcity Study Abroad helps students study in Germany, the UK, Canada, Australia, Ireland, New Zealand and other destinations with counselling, admissions and visa assistance.",

      isPartOf: {
        "@id":
          "https://medcityoverseas.com/#website",
      },

      about: {
        "@id":
          "https://medcityoverseas.com/#organization",
      },

      publisher: {
        "@id":
          "https://medcityoverseas.com/#organization",
      },

      primaryImageOfPage: {
        "@type": "ImageObject",
        "@id":
          "https://medcityoverseas.com/#primaryimage",

        url:
          "https://medcityoverseas.com/images/medcity-og-image.webp",

        contentUrl:
          "https://medcityoverseas.com/images/medcity-og-image.webp",

        width: 1200,
        height: 630,
      },

      breadcrumb: {
        "@id":
          "https://medcityoverseas.com/#breadcrumb",
      },

      inLanguage: "en-IN",
    },

    {
      "@type": "BreadcrumbList",
      "@id":
        "https://medcityoverseas.com/#breadcrumb",

      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item:
            "https://medcityoverseas.com/",
        },
      ],
    },

    faqStructuredData,
  ],
};

const SectionFallback = ({
  minHeight = "500px",
}) => {
  return (
    <div
      aria-hidden="true"
      className="
        relative
        w-full
        overflow-hidden
        bg-gradient-to-b
        from-white
        to-slate-50
      "
      style={{ minHeight }}
    >
      <div
        className="
          absolute
          inset-x-4
          top-12
          mx-auto
          h-8
          max-w-md
          animate-pulse
          rounded-xl
          bg-slate-200/70
        "
      />

      <div
        className="
          absolute
          inset-x-6
          top-28
          mx-auto
          h-4
          max-w-xl
          animate-pulse
          rounded-lg
          bg-slate-200/50
        "
      />

      <div
        className="
          absolute
          inset-x-4
          top-44
          mx-auto
          h-52
          max-w-7xl
          animate-pulse
          rounded-3xl
          bg-slate-200/40
        "
      />
    </div>
  );
};

const Home = () => {
  return (
    <>
    <HomeSEO />
      {/*
       * SEO should not be lazy-loaded.
       * It should render immediately.
       */}
      <SEO
        title="Study Abroad Consultants in Kerala | Medcity Study Abroad"
        description="Medcity Study Abroad helps students study in Germany, the UK, Canada, Australia, Ireland, New Zealand and other destinations with counselling, admissions and visa assistance."
        canonical="https://medcityoverseas.com/"
        image="https://medcityoverseas.com/images/medcity-og-image.webp"
        keywords="study abroad consultants in Kerala, overseas education consultants in Kerala, study in Germany, study in UK, study in Canada, study in Australia, student visa assistance, university admissions"
        structuredData={homeStructuredData}
      />

      {/* Above-the-fold hero */}
      <Carousel />

      <LazySection
        minHeight="420px"
        rootMargin="700px 0px"
        fallback={
          <SectionFallback minHeight="420px" />
        }
      >
        <SearchSection />
      </LazySection>

      <LazySection
        minHeight="650px"
        rootMargin="600px 0px"
        fallback={
          <SectionFallback minHeight="650px" />
        }
      >
        <MainSectionOne />
      </LazySection>

      <LazySection
        minHeight="700px"
        rootMargin="600px 0px"
        fallback={
          <SectionFallback minHeight="700px" />
        }
      >
        <ProgramsSection />
      </LazySection>

      <LazySection
        minHeight="650px"
        rootMargin="600px 0px"
        fallback={
          <SectionFallback minHeight="650px" />
        }
      >
        <Destinations />
      </LazySection>

      <LazySection
        minHeight="600px"
        rootMargin="600px 0px"
        fallback={
          <SectionFallback minHeight="600px" />
        }
      >
        <MobileApp />
      </LazySection>

      <LazySection
        minHeight="700px"
        rootMargin="600px 0px"
        fallback={
          <SectionFallback minHeight="700px" />
        }
      >
        <GermanCoursesLayout />
      </LazySection>

      <LazySection
        minHeight="600px"
        rootMargin="600px 0px"
        fallback={
          <SectionFallback minHeight="600px" />
        }
      >
        <EssentialService />
      </LazySection>

      <LazySection
        minHeight="650px"
        rootMargin="600px 0px"
        fallback={
          <SectionFallback minHeight="650px" />
        }
      >
        <SASteps />
      </LazySection>

      <LazySection
        minHeight="700px"
        rootMargin="600px 0px"
        fallback={
          <SectionFallback minHeight="700px" />
        }
      >
        <Testimonial />
      </LazySection>

      <LazySection
        minHeight="650px"
        rootMargin="600px 0px"
        fallback={
          <SectionFallback minHeight="650px" />
        }
      >
        <GridBackgroundView />
      </LazySection>

      <LazySection
        minHeight="650px"
        rootMargin="600px 0px"
        fallback={
          <SectionFallback minHeight="650px" />
        }
      >
        <Counselling />
      </LazySection>

      <LazySection
        minHeight="500px"
        rootMargin="500px 0px"
        fallback={
          <SectionFallback minHeight="500px" />
        }
      >
        <FAQ />
      </LazySection>

      <LazySection
        minHeight="600px"
        rootMargin="500px 0px"
        fallback={
          <SectionFallback minHeight="600px" />
        }
      >
        <OurBranches />
      </LazySection>
    </>
  );
};

export default Home;