import {
  ArrowRight,
  BookOpenText,
  ChevronDown,
  ChevronUp,
  Globe2,
  GraduationCap,
  Sparkles,
  X,
} from "lucide-react";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import { fetchPopularCourses } from "../redux/slices/courseSlice";
import FreeCounsellingForm from "./FreeCounsellingForm";
import FAQ from "../layout/FAQ/FAQ";
import PopularCoursesPublicSEO from "./PopularCoursesPublicSEO";

const INITIAL_VISIBLE_COUNT = 6;
const LOAD_COUNT = 3;

export default function PopularCoursesPublic() {
  const dispatch = useDispatch();

  const { uid } = useSelector(
    (state) => state.auth || {}
  );

  const {
    popularCourses = [],
    courseImagePath = "",
    loading = false,
    error = null,
  } = useSelector(
    (state) => state.courseData || {}
  );

  const [visibleCount, setVisibleCount] = useState(
    INITIAL_VISIBLE_COUNT
  );

  const [
    showCounsellingForm,
    setShowCounsellingForm,
  ] = useState(false);

  const visibleCourses = useMemo(
    () => popularCourses.slice(0, visibleCount),
    [popularCourses, visibleCount]
  );

  const canLoadMore =
    visibleCount < popularCourses.length;

  const canShowLess =
    visibleCount > INITIAL_VISIBLE_COUNT;

  useEffect(() => {
    dispatch(fetchPopularCourses(uid || 0));
  }, [dispatch, uid]);

  /*
   * Reset the number of visible cards whenever
   * a fresh list of courses is loaded.
   */
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [popularCourses.length]);

  useEffect(() => {
    if (!showCounsellingForm) return undefined;

    const bodyOverflow =
      document.body.style.overflow;

    const htmlOverflow =
      document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow =
      "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowCounsellingForm(false);
      }
    };

    window.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.body.style.overflow =
        bodyOverflow;

      document.documentElement.style.overflow =
        htmlOverflow;

      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [showCounsellingForm]);

  const handleLoadMore = () => {
    setVisibleCount((previousCount) =>
      Math.min(
        previousCount + LOAD_COUNT,
        popularCourses.length
      )
    );
  };

  const handleShowLess = () => {
    setVisibleCount((previousCount) =>
      Math.max(
        INITIAL_VISIBLE_COUNT,
        previousCount - LOAD_COUNT
      )
    );
  };

const getCourseImage = (course) => {
  const imageName =
    course?.icon ||
    course?.image ||
    course?.course_image ||
    course?.thumbnail ||
    "";

  if (!imageName) return "";

  if (
    imageName.startsWith("http://") ||
    imageName.startsWith("https://")
  ) {
    return imageName;
  }

  const basePath = String(courseImagePath || "").replace(/\/+$/, "");
  const filePath = String(imageName).replace(/^\/+/, "");

  return `${basePath}/${filePath}`;
};
  if (loading) {
    return (
      <section
        aria-label="Popular courses loading"
        className="bg-[#f5fbff] py-20"
      >
        <p className="text-center font-semibold text-slate-500">
          Loading courses...
        </p>
      </section>
    );
  }

  if (error) {
    return (
      <section
        aria-label="Popular courses error"
        className="bg-[#f5fbff] py-20"
      >
        <p className="text-center font-semibold text-red-500">
          {error}
        </p>
      </section>
    );
  }

  return (
    <>
        <PopularCoursesPublicSEO
      popularCourses={popularCourses}
      courseImagePath={courseImagePath}
    />
      <section
        aria-labelledby="popular-courses-heading"
        className="
          relative mx-auto max-w-9xl
          overflow-hidden bg-[#f5fbff]
          px-4 py-20
        "
      >
        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            left-0 top-0 h-64 w-64
            rounded-full bg-primary/5 blur-3xl
          "
        />

        <div
          aria-hidden="true"
          className="
            pointer-events-none absolute
            bottom-0 right-0 h-72 w-72
            rounded-full bg-secondary/5 blur-3xl
          "
        />

        <div className="container relative mx-auto px-4 lg:px-8">
          <header className="mx-auto mb-16 max-w-3xl text-center">
            <p
              className="
                inline-block rounded-full
                bg-primary/10 px-4 py-2
                text-sm font-bold tracking-wider
                text-primary
              "
            >
              Explore Your Path
            </p>

            <h2
              id="popular-courses-heading"
              className="mt-5 text-3xl font-extrabold md:text-4xl"
            >
              <span className="text-darkPrimary">
                Popular
              </span>{" "}
              <span className="text-primary">
                Courses
              </span>
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-700 md:text-lg">
              Discover in-demand study abroad
              programs and find a course that
              supports your academic and career
              goals.
            </p>
          </header>

          {popularCourses.length > 0 ? (
            <>
<div
  id="popular-courses-list"
  className="
    grid gap-6
    md:grid-cols-2
    xl:grid-cols-3
  "
>
  {visibleCourses.map((course, index) => {
    const courseName =
      course?.name ||
      course?.course_name ||
      course?.course ||
      "Popular course";

    const imageUrl = getCourseImage(course);

    return (
      <article
        key={
          course?.id ||
          course?.course_id ||
          course?.c_id ||
          `${courseName}-${index}`
        }
        className="
          group relative
          overflow-hidden rounded-[28px]
          border border-slate-200/80
          bg-white
          shadow-[0_10px_35px_rgba(15,23,42,0.08)]
          transition-all duration-500
          hover:-translate-y-2
          hover:border-primary/25
          hover:shadow-[0_22px_55px_rgba(192,31,83,0.16)]
        "
      >
        {/* Image section */}
        <div className="relative overflow-hidden">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${courseName} study abroad course`}
              width="640"
              height="360"
              loading={index < 3 ? "eager" : "lazy"}
              decoding="async"
              className="
                h-60 w-full object-cover
                transition-transform duration-700
                group-hover:scale-110
              "
            />
          ) : (
            <div
              aria-hidden="true"
              className="
                grid h-60 w-full place-content-center
                bg-gradient-to-br
                from-primary/10
                via-white
                to-secondary/10
              "
            >
              <GraduationCap
                className="h-14 w-14 text-primary/60"
                strokeWidth={1.6}
              />
            </div>
          )}

          {/* Image overlay */}
          <div
            className="
              pointer-events-none absolute inset-0
              bg-gradient-to-t
              from-black/70
              via-black/10
              to-transparent
            "
          />

          {/* Popular badge */}
          <div
            className="
              absolute left-4 top-4
              inline-flex items-center gap-2
              rounded-full
              border border-white/30
              bg-white/90
              px-3 py-1.5
              text-xs font-bold
              text-darkPrimary
              shadow-lg
              backdrop-blur-md
            "
          >
            <Sparkles
              className="h-3.5 w-3.5 text-primary"
              aria-hidden="true"
            />
            Popular Course
          </div>

          {/* Course number */}
          <span
            className="
              absolute right-4 top-4
              grid h-9 min-w-9 place-content-center
              rounded-full
              border border-white/30
              bg-black/35 px-2
              text-xs font-bold text-white
              backdrop-blur-md
            "
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Image-bottom label */}
          <div className="absolute bottom-4 left-4 right-4">
            <p
              className="
                inline-flex items-center gap-2
                rounded-full
                bg-secondary
                px-3 py-1.5
                text-xs font-semibold
                text-white
                shadow-lg
                backdrop-blur-md
              "
            >
              <BookOpenText
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
              Study Abroad Program
            </p>
          </div>
        </div>

        {/* Content section */}
        <div className="relative p-6">
          {/* Decorative glow */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              -right-10 -top-10
              h-28 w-28
              rounded-full
              bg-primary/5
              blur-2xl
            "
          />

          <h3
            className="
              relative min-h-[56px]
              text-lg font-extrabold
              leading-7 text-slate-900
              transition-colors duration-300
              group-hover:text-primary
            "
          >
            {courseName}
          </h3>

          <p className="relative mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
            Explore course options, university opportunities and
            expert guidance for your study abroad journey.
          </p>

          {/* Feature row */}
          <div
            className="
              relative mt-5
              flex flex-wrap items-center gap-2
            "
          >
            <span
              className="
                inline-flex items-center gap-1.5
                rounded-full bg-secondary/10
                px-3 py-1.5
                text-xs font-semibold
                text-secondary
              "
            >
              <Globe2
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
              International
            </span>

            <span
              className="
                inline-flex items-center gap-1.5
                rounded-full bg-primary/10
                px-3 py-1.5
                text-xs font-semibold
                text-primary
              "
            >
              <GraduationCap
                className="h-3.5 w-3.5"
                aria-hidden="true"
              />
              Expert Support
            </span>
          </div>

          <div className="relative mt-6 border-t border-slate-100 pt-5">
            <button
              type="button"
              onClick={() => setShowCounsellingForm(true)}
              className="
                group/button
                flex w-full items-center
                justify-between
                rounded-xl
                bg-darkPrimary
                px-5 py-2.5
                text-sm font-semibold
                text-white
                shadow-lg shadow-primary/20
                transition-all duration-300
                hover:-translate-y-0.5
                hover:shadow-xl
                hover:shadow-primary/25
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-primary
                focus-visible:ring-offset-2
              "
            >
              <span>Get Free Counselling</span>

              <span
                className="
                  grid size-8 place-content-center
                  rounded-lg bg-white/15
                  transition-all duration-300
                  group-hover/button:translate-x-1
                  group-hover/button:bg-white/25
                "
              >
                <ArrowRight
                  className="h-4 w-4"
                  aria-hidden="true"
                />
              </span>
            </button>
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          aria-hidden="true"
          className="
            absolute bottom-0 left-1/2
            h-1 w-0
            -translate-x-1/2
            rounded-full
            bg-gradient-to-r
            from-secondary
            via-primary
            to-darkPrimary
            transition-all duration-500
            group-hover:w-3/4
          "
        />
      </article>
    );
  })}
</div>

              <p
                className="sr-only"
                aria-live="polite"
              >
                Showing {visibleCourses.length} of{" "}
                {popularCourses.length} popular
                courses.
              </p>

              {(canLoadMore || canShowLess) && (
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                  {canLoadMore && (
                    <button
                      type="button"
                      onClick={handleLoadMore}
                      aria-controls="popular-courses-list"
                      className="
                        inline-flex min-w-40
                        items-center justify-center
                        gap-2 rounded-xl
                        bg-primary px-6 py-3
                        text-sm font-bold text-white
                        shadow-lg shadow-primary/20
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:bg-darkPrimary
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-primary
                        focus-visible:ring-offset-2
                      "
                    >
                      Load More

                      <ChevronDown
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  )}

                  {canShowLess && (
                    <button
                      type="button"
                      onClick={handleShowLess}
                      aria-controls="popular-courses-list"
                      className="
                        inline-flex min-w-40
                        items-center justify-center
                        gap-2 rounded-xl
                        border border-primary
                        bg-white px-6 py-3
                        text-sm font-bold
                        text-primary
                        transition-all duration-300
                        hover:-translate-y-1
                        hover:bg-primary
                        hover:text-white
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-primary
                        focus-visible:ring-offset-2
                      "
                    >
                      Show Less

                      <ChevronUp
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  )}
                </div>
              )}
            </>
          ) : (
            <p
              className="
                rounded-2xl bg-white
                py-12 text-center
                text-sm font-semibold
                text-slate-500
                shadow-sm
              "
            >
              No popular courses are currently
              available.
            </p>
          )}
        </div>
        <FAQ />
      </section>

      {showCounsellingForm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Free counselling form"
          className="
            fixed inset-0 z-[99999]
            flex items-center justify-center
            bg-black/70 px-4 py-6
          "
          onClick={() =>
            setShowCounsellingForm(false)
          }
        >
          <div
            className="
              relative max-h-[90vh]
              w-full max-w-5xl
              overflow-y-auto
              rounded-[30px] bg-white
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              aria-label="Close counselling form"
              onClick={() =>
                setShowCounsellingForm(false)
              }
              className="
                absolute right-4 top-4 z-20
                grid size-10 place-content-center
                rounded-full bg-primary
                text-white shadow-lg
                transition hover:bg-darkPrimary
              "
            >
              <X
                size={20}
                aria-hidden="true"
              />
            </button>

            <FreeCounsellingForm
              onSuccess={() =>
                setShowCounsellingForm(false)
              }
            />
          </div>
        </div>
      )}
    </>
  );
}