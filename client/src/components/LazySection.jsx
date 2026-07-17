import { Suspense, useEffect, useRef, useState } from "react";

const DefaultFallback = ({ minHeight }) => (
  <div
    aria-hidden="true"
    className="w-full animate-pulse bg-slate-50"
    style={{ minHeight }}
  />
);

const LazySection = ({
  children,
  minHeight = "500px",
  rootMargin = "500px 0px",
  fallback,
  className = "",
}) => {
  const sectionRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;

    if (!element || shouldRender) return undefined;

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setShouldRender(true);
        observer.disconnect();
      },
      {
        rootMargin,
        threshold: 0.01,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, shouldRender]);

  const loadingFallback = fallback ?? (
    <DefaultFallback minHeight={minHeight} />
  );

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        minHeight: shouldRender ? undefined : minHeight,
      }}
    >
      {shouldRender ? (
        <Suspense fallback={loadingFallback}>
          {children}
        </Suspense>
      ) : (
        loadingFallback
      )}
    </div>
  );
};

export default LazySection;