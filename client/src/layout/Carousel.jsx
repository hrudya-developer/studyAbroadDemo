import { useEffect, useRef, useState } from "react";
import WebsiteSwitchVertical from "./WebsiteSwitchVertical";

const heroVideoDesktop =
  "/videos/medcity2025.15f1bf21a50a5d60cdae.mp4";

const heroVideoMobile =
  "/videos/mobilemedcity2.e47b58ad13ce13294963.mp4";

const Carousel = () => {
  const heroRef = useRef(null);

  const [topbarVisible, setTopbarVisible] = useState(true);
  const [heroVisible, setHeroVisible] = useState(true);

  /*
   * Watch the Topbar.
   * Icons appear only after the Topbar completely leaves the viewport.
   */
  useEffect(() => {
    const topbarElement =
      document.getElementById("website-topbar");

    if (!topbarElement) {
      setTopbarVisible(true);
      return undefined;
    }

    const checkTopbarVisibility = () => {
      const rect = topbarElement.getBoundingClientRect();
      const styles = window.getComputedStyle(topbarElement);

      const isDesktop = window.matchMedia(
        "(min-width: 1024px)"
      ).matches;

      const isRendered =
        styles.display !== "none" &&
        styles.visibility !== "hidden";

      const isVisibleInViewport =
        rect.bottom > 0 &&
        rect.top < window.innerHeight;

      setTopbarVisible(
        isDesktop &&
          isRendered &&
          isVisibleInViewport
      );
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
    };
  }, []);

  /*
   * Watch the hero.
   * The vertical icons disappear after the carousel leaves the viewport.
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
        relative mx-auto
        w-full max-w-9xl
        overflow-hidden
        bg-white
      "
    >
      <div className="relative w-full overflow-hidden bg-white">
        {/* Vertical icons */}
        <div
          aria-hidden={!showVerticalIcons}
          className={`
            absolute left-0 top-1/2
            z-20
            hidden
            -translate-y-1/2
            transition-all duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            lg:block
            ${
              showVerticalIcons
                ? `
                  translate-x-0
                  opacity-100
                `
                : `
                  pointer-events-none
                  -translate-x-[120%]
                  opacity-0
                `
            }
          `}
        >
          <WebsiteSwitchVertical />
        </div>

        {/* Mobile video */}
        <video
          className="
            block h-auto w-full
            object-cover
            md:hidden
          "
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Medcity Study Abroad introduction"
        >
          <source
            src={heroVideoMobile}
            type="video/mp4"
          />

          Your browser does not support the video tag.
        </video>

        {/* Desktop video */}
        <video
          className="
            hidden h-auto w-full
            object-cover
            md:block
          "
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Medcity Study Abroad introduction"
        >
          <source
            src={heroVideoDesktop}
            type="video/mp4"
          />

          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default Carousel;