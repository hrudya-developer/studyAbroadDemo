import { useEffect } from "react";
import { CheckCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ButtonPrimary from "../components/ButtonPrimary";
import { fetchPopularCourses } from "../redux/slices/courseSlice";

const StudyTabContent = () => {
  const dispatch = useDispatch();

  const {
    popularCourses = [],
    loading,
    courseImagePath = "",
  } = useSelector((state) => state.courseData);

  useEffect(() => {
    if (popularCourses.length === 0 && !loading) {
      dispatch(fetchPopularCourses(0));
    }
  }, [dispatch, popularCourses.length, loading]);

  if (loading) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="py-10 text-center text-slate-600"
      >
        Loading popular study abroad courses...
      </div>
    );
  }

  const visibleCourses = popularCourses.slice(6, 12);

  return (
    <section
      aria-labelledby="popular-courses-heading"
      className="py-10"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <header className="mx-auto mb-10 max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary bg-gray-100 rounded-full py-2 px-3 inline-block">
            Explore Study Options
          </p>

          <h2
            id="popular-courses-heading"
            className="
              mt-3
              font-nunito
              text-3xl
              font-extrabold
              text-darkPrimary
              sm:text-4xl lg:text-5xl
            "
          >
            Popular <span className="bg-gradient-to-r
        from-primary
        to-secondary
        bg-clip-text
        text-transparent">Study</span> Abroad Courses
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-800 sm:text-base md:text-base lg:text-lg">
            Explore popular international courses that match your academic goals, career plans, and study abroad ambitions.
          </p>
        </header>

        {visibleCourses.length > 0 ? (
          <div
            className="
              grid
              grid-cols-1
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
            "
            data-aos="fade-up"
          >
            {visibleCourses.map((item) => {
              const courseName =
                item.name?.trim() || "Study Abroad Course";

              const imageUrl = item.icon
                ? `${courseImagePath}/${item.icon}`
                : "";

              return (
                <article
                  key={item.id ?? courseName}
                  aria-labelledby={`course-${item.id ?? courseName}`}
                  className="
                    group
                    relative
                    mx-auto
                    w-full
                    max-w-[380px]
                    overflow-visible
                    rounded-[22px]
                    border
                    border-gray-100
                    bg-white
                    shadow-md
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    hover:shadow-xl
                  "
                >
                  <div className="relative rounded-t-[22px]">
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={`${courseName} study abroad course`}
                        width="380"
                        height="210"
                        loading="lazy"
                        decoding="async"
                        className="
                          h-[210px]
                          w-full
                          rounded-t-[22px]
                          object-cover
                        "
                      />
                    ) : (
                      <div
                        aria-hidden="true"
                        className="
                          flex
                          h-[210px]
                          w-full
                          items-center
                          justify-center
                          rounded-t-[22px]
                          bg-slate-100
                          text-sm
                          font-semibold
                          text-slate-500
                        "
                      >
                        Course image unavailable
                      </div>
                    )}

                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        bottom-[-28px]
                        left-1/2
                        z-20
                        -translate-x-1/2
                      "
                    >
                      <div
                        className="
                          flex
                          h-16
                          w-16
                          items-center
                          justify-center
                          rounded-full
                          border-4
                          border-white
                          bg-white
                          shadow-lg
                        "
                      >
                        <div
                          className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-full
                            bg-primary
                            text-white
                          "
                        >
                          <CheckCheck className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative px-5 pb-6 pt-11 text-center">
                    <h3
                      id={`course-${item.id ?? courseName}`}
                      className="
                        flex
                        min-h-[55px]
                        items-center
                        justify-center
                        text-base
                        font-bold
                        leading-snug
                        text-secondary
                      "
                    >
                      {courseName}
                    </h3>

                    <div
                      aria-hidden="true"
                      className="
                        mx-auto
                        mt-3
                        h-1
                        w-14
                        rounded-full
                        bg-primary
                      "
                    />

                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        bottom-4
                        right-4
                        grid
                        grid-cols-4
                        gap-1
                        opacity-20
                      "
                    >
                      {Array.from({ length: 12 }).map((_, index) => (
                        <span
                          key={index}
                          className="h-1 w-1 rounded-full bg-primary"
                        />
                      ))}
                    </div>

                    <div
                      aria-hidden="true"
                      className="
                        absolute
                        bottom-0
                        left-0
                        h-16
                        w-16
                        rounded-tr-full
                        bg-primary/5
                      "
                    />
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <p
            role="status"
            className="py-10 text-center text-slate-600"
          >
            No popular courses are available at the moment.
          </p>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            to="/courseSearch"
            aria-label="View all study abroad courses"
            className="inline-flex"
          >
            <ButtonPrimary>
              View All Study Abroad Courses
            </ButtonPrimary>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default StudyTabContent;