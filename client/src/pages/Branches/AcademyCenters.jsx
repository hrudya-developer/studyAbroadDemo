import { useMemo, useState } from "react";

import AcademyCentersHeader from "./AcademyCentersHeader";
import BranchControls from "./BranchControls";
import BranchGrid from "./BranchGrid";
import { centers } from "./centersData";

const INITIAL_VISIBLE = 6;
const LOAD_COUNT = 3;

const AcademyCenters = () => {
  const [visibleCount, setVisibleCount] =
    useState(INITIAL_VISIBLE);

  const visibleCenters = useMemo(() => {
    return centers.slice(0, visibleCount);
  }, [visibleCount]);

  const hasMore = visibleCount < centers.length;
  const canHideRows = visibleCount > INITIAL_VISIBLE;

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
        .getElementById("academy-centers")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  };

  return (
    <section
      id="academy-centers"
      className="
        relative isolate overflow-hidden
        bg-gradient-to-b
        from-white via-[#fffafd] to-white
        max-w-9xl mx-auto
       mb-10
      "
    >
      <BackgroundDecorations />

      <div className="relative mx-auto max-w-9xl">
        <AcademyCentersHeader />

        <BranchGrid centers={visibleCenters} />

        <BranchControls
          hasMore={hasMore}
          canHideRows={canHideRows}
          onShowMore={handleShowMore}
          onHidePrevious={handleHidePrevious}
        />

        {!hasMore && (
          <p className="mt-5 text-center text-sm font-medium text-slate-500">
            All {centers.length} centers are displayed.
          </p>
        )}
      </div>
    </section>
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