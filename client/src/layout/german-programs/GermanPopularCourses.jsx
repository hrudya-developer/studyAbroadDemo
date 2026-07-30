import GermanPopularCoursesSEO from "./GermanPopularCoursesSEO";
import GermanProgramsHeader from "./GermanProgramsHeader";
import GermanProgramsSlider from "./GermanProgramsSlider";
import AusbildungVideoSection from "./AusbildungVideoSection";
import StatusMessage from "./StatusMessage";
import useGermanPopularCourses from "./useGermanPopularCourses";
import GermanProgramsBreadcrumb from "./GermanProgramsBreadcrumb";

import "swiper/css";
import "swiper/css/navigation";
import FAQ from "../FAQ/FAQ";

export default function GermanPopularCourses() {
  const {
    programs,
    imagePath,
    loading,
    error,
    youtube,
    videosLoading,
    videosError,
    ausbildungProgram,
  } = useGermanPopularCourses();

  const showPrograms =
    !loading &&
    !error &&
    programs.length > 0;

  return (
    <>
      <GermanPopularCoursesSEO
        programs={programs}
        imagePath={imagePath}
        videos={youtube}
      />

      <main>
        <section
          aria-labelledby="german-programs-heading"
          className="
            relative overflow-hidden
            bg-gradient-to-br
            from-slate-50
            via-white
            to-blue-50
            py-14 sm:py-16 lg:py-20
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -left-24 top-20
              size-72 rounded-full
              bg-pink-100 blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute -right-24 bottom-10
              size-72 rounded-full
              bg-blue-100 blur-3xl
            "
          />

          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-0 opacity-35
              [background-image:radial-gradient(circle_at_1px_1px,rgba(99,26,51,0.12)_1px,transparent_0)]
              [background-size:24px_24px]
            "
          />

          <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
             <GermanProgramsBreadcrumb />
            <GermanProgramsHeader />

            <StatusMessage
              loading={loading}
              error={error}
              empty={
                !loading &&
                !error &&
                !programs.length
              }
              loadingText="Loading German programs..."
              emptyText="No German programs found."
            />

            {showPrograms && (
              <GermanProgramsSlider
                programs={programs}
                imagePath={imagePath}
              />
            )}

            {!loading &&
              !error &&
              ausbildungProgram && (
                <AusbildungVideoSection
                  program={ausbildungProgram}
                  videos={youtube}
                  loading={videosLoading}
                  error={videosError}
                />
              )}
          </div>
          <FAQ />
        </section>
      </main>
    </>
  );
}