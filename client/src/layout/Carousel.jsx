import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import HeroSocialLinks from "./HeroSocialLinks";
import WebsiteSwitchVertical from "./WebsiteSwitchVertical";

const DESKTOP_VIDEO =
  "/videos/medcity2025.15f1bf21a50a5d60cdae.mp4";

const MOBILE_VIDEO =
  "/videos/mobilemedcity2.e47b58ad13ce13294963.mp4";

const MOBILE_QUERY = "(max-width: 767px)";
const DESKTOP_QUERY = "(min-width: 1024px)";
const REDUCED_MOTION_QUERY =
  "(prefers-reduced-motion: reduce)";

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
  const videoRef = useRef(null);
  const animationFrameRef = useRef(null);

  const [videoSource, setVideoSource] =
    useState(getInitialVideo);

  const [topbarVisible, setTopbarVisible] =
    useState(true);

  const [heroVisible, setHeroVisible] =
    useState(true);

  const [videoFailed, setVideoFailed] =
    useState(false);

  const [reducedMotion, setReducedMotion] =
    useState(false);

  useEffect(() => {
    const mediaQuery =
      window.matchMedia(MOBILE_QUERY);

    const handleBreakpointChange = (event) => {
      setVideoFailed(false);

      setVideoSource(
        event.matches
          ? MOBILE_VIDEO
          : DESKTOP_VIDEO
      );
    };

    mediaQuery.addEventListener(
      "change",
      handleBreakpointChange
    );

    return () => {
      mediaQuery.removeEventListener(
        "change",
        handleBreakpointChange
      );
    };
  }, []);

  useEffect(() => {
    const motionQuery = window.matchMedia(
      REDUCED_MOTION_QUERY
    );

    const handleMotionPreference = (event) => {
      setReducedMotion(event.matches);
    };

    setReducedMotion(motionQuery.matches);

    motionQuery.addEventListener(
      "change",
      handleMotionPreference
    );

    return () => {
      motionQuery.removeEventListener(
        "change",
        handleMotionPreference
      );
    };
  }, []);

  useEffect(() => {
    const topbarElement =
      document.getElementById("website-topbar");

    if (!topbarElement) {
      setTopbarVisible(false);
      return undefined;
    }

    const checkTopbarVisibility = () => {
      if (animationFrameRef.current !== null) {
        return;
      }

      animationFrameRef.current =
        window.requestAnimationFrame(() => {
          const rect =
            topbarElement.getBoundingClientRect();

          const styles =
            window.getComputedStyle(topbarElement);

          const isDesktop =
            window.matchMedia(
              DESKTOP_QUERY
            ).matches;

          const isRendered =
            styles.display !== "none" &&
            styles.visibility !== "hidden" &&
            Number(styles.opacity) > 0;

          const isInsideViewport =
            rect.bottom > 0 &&
            rect.top < window.innerHeight;

          setTopbarVisible(
            isDesktop &&
              isRendered &&
              isInsideViewport
          );

          animationFrameRef.current = null;
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
      checkTopbarVisibility,
      { passive: true }
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

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(
          animationFrameRef.current
        );

        animationFrameRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const heroElement = heroRef.current;

    if (!heroElement) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroVisible(entry.isIntersecting);
      },
      {
        threshold: 0.08,
        rootMargin: "100px 0px",
      }
    );

    observer.observe(heroElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (!videoElement || videoFailed) {
      return;
    }

    if (!heroVisible || reducedMotion) {
      videoElement.pause();
      return;
    }

    const playPromise = videoElement.play();

    if (
      playPromise &&
      typeof playPromise.catch === "function"
    ) {
      playPromise.catch(() => {});
    }
  }, [
    heroVisible,
    reducedMotion,
    videoFailed,
    videoSource,
  ]);

  const handleVideoError = useCallback(() => {
    setVideoFailed(true);
  }, []);

  const showVerticalIcons =
    !topbarVisible && heroVisible;

  return (
    <section
      ref={heroRef}
      id="hero-section"
      aria-labelledby="hero-heading"
      aria-describedby="hero-description"
      className="
        relative
        isolate
        w-full
        overflow-hidden
      "
    >
      <div className="sr-only">
        <h1 id="hero-heading">
          Study Abroad with Medcity
        </h1>

        <p id="hero-description">
          Explore international universities,
          courses, admissions support and study
          abroad counselling with Medcity Study
          Abroad.
        </p>
      </div>

      <div
        className="
          relative
          min-h-[100svh]
          w-full
          overflow-hidden
          bg-black
          supports-[height:100dvh]:min-h-[100dvh]
        "
      >
        {!videoFailed && (
          <video
            ref={videoRef}
            key={videoSource}
            src={videoSource}
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              object-center
            "
            autoPlay={!reducedMotion}
            muted
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            controlsList="nodownload noplaybackrate nofullscreen"
            onError={handleVideoError}
            aria-hidden="true"
            tabIndex={-1}
          />
        )}

        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute
            inset-0
            z-10
            bg-gradient-to-b
            from-black/5
            via-transparent
            to-black/20
          "
        />

        <div
          aria-hidden={!showVerticalIcons}
          className={`
            absolute
            left-0
            top-1/2
            z-30
            hidden
            -translate-y-1/2
            will-change-transform
            transition-[transform,opacity]
            duration-500
            ease-[cubic-bezier(0.22,1,0.36,1)]
            lg:block
            ${
              showVerticalIcons
                ? "translate-x-0 opacity-100"
                : "pointer-events-none -translate-x-[110%] opacity-0"
            }
          `}
        >
          <WebsiteSwitchVertical />
        </div>

        <HeroSocialLinks visible={heroVisible} />
      </div>
    </section>
  );
};

export default Carousel;