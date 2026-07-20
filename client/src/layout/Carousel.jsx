import { useEffect, useRef, useState } from "react";
import WebsiteSwitchVertical from "./WebsiteSwitchVertical";

const DESKTOP_VIDEO =
  "/videos/medcity2025.15f1bf21a50a5d60cdae.mp4";

const MOBILE_VIDEO =
  "/videos/mobilemedcity2.e47b58ad13ce13294963.mp4";

const MOBILE_QUERY = "(max-width: 767px)";
const DESKTOP_QUERY = "(min-width: 1024px)";

const getInitialVideo = () => {
  if (typeof window === "undefined") {
    return DESKTOP_VIDEO;
  }

  return window.matchMedia(MOBILE_QUERY).matches
    ? MOBILE_VIDEO
    : DESKTOP_VIDEO;
};

const Carousel = () => {
  const heroRef = useRef(null);

  /*
   * Select the correct video during the first render.
   * This avoids waiting for useEffect before assigning the source.
   */
  const [videoSource, setVideoSource] = useState(getInitialVideo);

  const [topbarVisible, setTopbarVisible] = useState(true);
  const [heroVisible, setHeroVisible] = useState(true);

  /*
   * Change the video only when the viewport crosses
   * the mobile breakpoint.
   */
  useEffect(() => {
    const mobileMediaQuery = window.matchMedia(MOBILE_QUERY);

    const handleBreakpointChange = (event) => {
      setVideoSource(
        event.matches ? MOBILE_VIDEO : DESKTOP_VIDEO
      );
    };

    mobileMediaQuery.addEventListener(
      "change",
      handleBreakpointChange
    );

    return () => {
      mobileMediaQuery.removeEventListener(
        "change",
        handleBreakpointChange
      );
    };
  }, []);

  /*
   * Track whether the desktop topbar is visible.
   */
  useEffect(() => {
    const topbarElement =
      document.getElementById("website-topbar");

    if (!topbarElement) {
      setTopbarVisible(false);
      return undefined;
    }

    let animationFrameId = null;

    const checkTopbarVisibility = () => {
      if (animationFrameId !== null) return;

      animationFrameId = window.requestAnimationFrame(() => {
        const rect =
          topbarElement.getBoundingClientRect();

        const styles =
          window.getComputedStyle(topbarElement);

        const isDesktop =
          window.matchMedia(DESKTOP_QUERY).matches;

        const isRendered =
          styles.display !== "none" &&
          styles.visibility !== "hidden" &&
          styles.opacity !== "0";

        const isInsideViewport =
          rect.bottom > 0 &&
          rect.top < window.innerHeight;

        setTopbarVisible(
          isDesktop &&
            isRendered &&
            isInsideViewport
        );

        animationFrameId = null;
      });
    };

    checkTopbarVisibility();

    window.addEventListener(
      "scroll",
      checkTopbarVisibility,
      { passive: true }
    );

    window.addEventListener(
      "resize",
      checkTopbarVisibility
    );

    return () => {
      window.removeEventListener(
        "scroll",
        checkTopbarVisibility
      );

      window.removeEventListener(
        "resize",
        checkTopbarVisibility
      );

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  /*
   * Hide the floating switch when the hero
   * leaves the viewport.
   */
  useEffect(() => {
    const heroElement = heroRef.current;

    if (!heroElement) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.05,
      }
    );

    observer.observe(heroElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  const showVerticalIcons =
    !topbarVisible && heroVisible;

  return (
    <section
      ref={heroRef}
      id="hero-section"
      className="
        relative
        mx-auto
        w-full
        max-w-9xl
        overflow-hidden"
    >
      <div className="relative w-full overflow-hidden">
        <div
          aria-hidden={!showVerticalIcons}
          className={`
            absolute left-0 top-1/2 z-30
            hidden -translate-y-1/2
            transition-all duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            lg:block
            ${
              showVerticalIcons
                ? "translate-x-0 opacity-100"
                : "pointer-events-none -translate-x-[120%] opacity-0"
            }
          `}
        >
          <WebsiteSwitchVertical />
        </div>

        <video
          key={videoSource}
          src={videoSource}
          className="
            block
            h-screen
            w-screen
            object-cover
          "
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate"
          aria-label="Medcity Study Abroad introduction video"
        />
      </div>
    </section>
  );
};

export default Carousel;