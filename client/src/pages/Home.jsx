import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

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
 * Mia components are also lazy-loaded.
 * Since they are overlays, they do not need LazySection.
 */
const MiaModal = lazy(() =>
  import("./MiaAgentModal")
);

const MiaButton = lazy(() =>
  import("./MiaButton")
);

const MiaAgentChatbox = lazy(() =>
  import("./MiaAgentChatbox")
);

const SectionFallback = ({ minHeight = "500px" }) => (
  <div
    aria-hidden="true"
    className="
      relative w-full overflow-hidden
      bg-gradient-to-b from-white to-slate-50
    "
    style={{ minHeight }}
  >
    <div
      className="
        absolute inset-x-4 top-12 mx-auto
        h-8 max-w-md animate-pulse
        rounded-xl bg-slate-200/70
      "
    />

    <div
      className="
        absolute inset-x-6 top-28 mx-auto
        h-4 max-w-xl animate-pulse
        rounded-lg bg-slate-200/50
      "
    />

    <div
      className="
        absolute inset-x-4 top-44 mx-auto
        h-52 max-w-7xl animate-pulse
        rounded-3xl bg-slate-200/40
      "
    />
  </div>
);

const OverlayFallback = () => null;

const Home = () => {
  const [showMiaModal, setShowMiaModal] = useState(false);
  const [showMiaButton, setShowMiaButton] = useState(false);
  const [showMiaChatBox, setShowMiaChatBox] =
    useState(false);

  const autoPopupShownRef = useRef(false);

  const openMiaChatBox = useCallback(() => {
    setShowMiaModal(false);
    setShowMiaButton(false);
    setShowMiaChatBox(true);
  }, []);

  const closeMiaChatBox = useCallback(() => {
    setShowMiaChatBox(false);
    setShowMiaButton(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowMiaModal(false);
    setShowMiaButton(true);
  }, []);

  /*
   * Show the Mia popup once the user reaches
   * the end of the hero section.
   */
  useEffect(() => {
    const heroElement =
      document.getElementById("hero-section");

    if (!heroElement) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting ||
          autoPopupShownRef.current ||
          showMiaModal ||
          showMiaChatBox
        ) {
          return;
        }

        autoPopupShownRef.current = true;
        setShowMiaModal(true);
        setShowMiaButton(false);

        observer.disconnect();
      },
      {
        threshold: 0,
        rootMargin: "0px 0px 100px 0px",
      }
    );

    observer.observe(heroElement);

    return () => {
      observer.disconnect();
    };
  }, [showMiaModal, showMiaChatBox]);

  return (
    <>
      {/* Carousel is the only eagerly loaded component */}
      <Carousel />

      <LazySection
        minHeight="420px"
        rootMargin="700px 0px"
        fallback={<SectionFallback minHeight="420px" />}
      >
        <SearchSection />
      </LazySection>

      <LazySection
        minHeight="650px"
        rootMargin="600px 0px"
        fallback={<SectionFallback minHeight="650px" />}
      >
        <MainSectionOne />
      </LazySection>

      <LazySection
        minHeight="700px"
        rootMargin="600px 0px"
        fallback={<SectionFallback minHeight="700px" />}
      >
        <ProgramsSection />
      </LazySection>

      <LazySection
        minHeight="650px"
        rootMargin="600px 0px"
        fallback={<SectionFallback minHeight="650px" />}
      >
        <Destinations />
      </LazySection>

      <LazySection
        minHeight="600px"
        rootMargin="600px 0px"
        fallback={<SectionFallback minHeight="600px" />}
      >
        <MobileApp />
      </LazySection>

      <LazySection
        minHeight="700px"
        rootMargin="600px 0px"
        fallback={<SectionFallback minHeight="700px" />}
      >
        <GermanCoursesLayout />
      </LazySection>

      <LazySection
        minHeight="600px"
        rootMargin="600px 0px"
        fallback={<SectionFallback minHeight="600px" />}
      >
        <EssentialService />
      </LazySection>

      <LazySection
        minHeight="650px"
        rootMargin="600px 0px"
        fallback={<SectionFallback minHeight="650px" />}
      >
        <SASteps />
      </LazySection>

      <LazySection
        minHeight="700px"
        rootMargin="600px 0px"
        fallback={<SectionFallback minHeight="700px" />}
      >
        <Testimonial />
      </LazySection>

      <LazySection
        minHeight="650px"
        rootMargin="600px 0px"
        fallback={<SectionFallback minHeight="650px" />}
      >
        <GridBackgroundView />
      </LazySection>

      <LazySection
        minHeight="650px"
        rootMargin="600px 0px"
        fallback={<SectionFallback minHeight="650px" />}
      >
        <Counselling />
      </LazySection>

      <LazySection
        minHeight="700px"
        rootMargin="600px 0px"
        fallback={<SectionFallback minHeight="700px" />}
      >
        <StudyDestinations />
      </LazySection>

      {/* Load popup component only when opened */}
      {showMiaModal && (
        <Suspense fallback={<OverlayFallback />}>
          <MiaModal
            isOpen={showMiaModal}
            onClose={closeModal}
            onTalk={openMiaChatBox}
          />
        </Suspense>
      )}

      {/* Load floating button only when displayed */}
      {showMiaButton && !showMiaChatBox && (
        <Suspense fallback={<OverlayFallback />}>
          <MiaButton onClick={openMiaChatBox} />
        </Suspense>
      )}

      {/* Load chatbot only when opened */}
      {showMiaChatBox && (
        <Suspense fallback={<OverlayFallback />}>
          <MiaAgentChatbox
            onClose={closeMiaChatBox}
          />
        </Suspense>
      )}
    </>
  );
};

export default Home;