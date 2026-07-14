import { ArrowRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularCourses } from "../redux/slices/courseSlice";
import FreeCounsellingForm from "./FreeCounsellingForm";

export default function PopularCoursesPublic() {
  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth || {});

  const {
    popularCourses = [],
    courseImagePath,
    loading,
    error,
  } = useSelector((state) => state.courseData || {});

  const [showCounsellingForm, setShowCounsellingForm] = useState(false);

  useEffect(() => {
    dispatch(fetchPopularCourses(uid || 0));
  }, [dispatch, uid]);

  useEffect(() => {
    if (!showCounsellingForm) return;

    const bodyOverflow = document.body.style.overflow;
    const htmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = htmlOverflow;
    };
  }, [showCounsellingForm]);

  if (loading) {
    return (
      <div className="py-20 text-center font-semibold text-slate-500">
        Loading courses...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 text-center font-semibold text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      <section className="relative mx-auto max-w-9xl overflow-hidden bg-[#f5fbff] px-4 py-20">
        <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-secondary/5 blur-3xl" />

        <div className="container relative mx-auto px-4 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-bold tracking-wider text-primary">
              Explore Your Path
            </span>

            <h2 className="mt-5 text-3xl font-extrabold md:text-4xl">
              <span className="text-darkPrimary">Popular</span>{" "}
              <span className="text-primary">Courses</span>
            </h2>

            <p className="mt-5 text-lg text-slate-700">
              Discover in-demand programs and kickstart your study abroad journey.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {popularCourses.map((course) => (
              <div
                key={course.id}
                className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <img
                  src={`${courseImagePath}${course.icon}`}
                  alt={course.name}
                  className="h-56 w-full object-cover"
                />
              
            

            

                <div className="p-6">
                  <h3 className="text-lg font-bold text-black">
                    {course.name}
                  </h3>

                  {/* <p className="mt-3 text-slate-500">
                    Explore this course and start your study abroad journey.
                  </p> */}

                  <button
                    type="button"
                    onClick={() => setShowCounsellingForm(true)}
                    className="mt-5 flex items-center gap-2 rounded-md bg-primary p-2 text-sm font-semibold text-white transition hover:bg-primary"
                  >
                    Get Free Counselling
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        
        </div>
      </section>

      {showCounsellingForm && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 px-4 py-6"
          onClick={() => setShowCounsellingForm(false)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-[30px] bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowCounsellingForm(false)}
              className="absolute right-4 top-4 z-20 grid size-10 place-content-center rounded-full bg-primary text-white shadow-lg transition hover:bg-darkPrimary"
            >
              <X size={20} />
            </button>

            <FreeCounsellingForm
              onSuccess={() => setShowCounsellingForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}