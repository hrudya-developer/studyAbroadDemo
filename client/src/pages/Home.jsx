import { lazy } from "react";

import Carousel from "../layout/Carousel";
import LazySection from "../components/LazySection";

/*
 * Every homepage component except Carousel
 * is loaded as a separate JavaScript chunk.
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
  import("../layout/GermanCoursesLayout")
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

const StudyDestinations = lazy(() =>
  import("../layout/StudyDestinations")
);

/*
 * MIA feature is temporarily disabled.
 *
 * To enable it again, uncomment these imports
 * and restore the MIA state, callbacks and JSX.
 */

// const MiaModal = lazy(() =>
//   import("./MiaAgentModal")
// );

// const MiaButton = lazy(() =>
//   import("./MiaButton")
// );

// const MiaAgentChatbox = lazy(() =>
//   import("./MiaAgentChatbox")
// );

const SectionFallback = ({ minHeight = "500px" }) => {
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
      {/* Hero carousel is loaded immediately */}
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
        minHeight="700px"
        rootMargin="600px 0px"
        fallback={
          <SectionFallback minHeight="700px" />
        }
      >
        <StudyDestinations />
      </LazySection>

      {/*
       * MIA popup, floating button and chatbox
       * are temporarily disabled.
       *
       * MIA JSX can be restored here later.
       */}
    </>
  );
};

export default Home;