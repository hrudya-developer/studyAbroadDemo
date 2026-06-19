import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularCourses } from "../redux/slices/courseSlice";
import { useNavigate } from "react-router-dom";

export default function PopularCoursesPublic() {
  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const {
    popularCourses = [],
    courseImagePath,
    loading,
    error,
  } = useSelector((state) => state.courseData);

  useEffect(() => {
    dispatch(fetchPopularCourses(uid || 0));
  }, [dispatch, uid]);

  

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
    <section className="relative overflow-hidden bg-[#f5fbff] py-20 max-w-7xl px-4 mx-auto">
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-secondary/5 blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8">
        {/* Heading */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-bold uppercase tracking-wider text-primary">
            Explore Your Path
          </span>

          <h2 className="mt-5 text-4xl font-extrabold md:text-5xl">
            <span className="text-secondary">Popular</span>{" "}
            <span className="text-primary">Courses</span>
          </h2>

          <p className="mt-5 text-lg text-slate-500">
            Discover in-demand programs and kickstart your study abroad journey.
          </p>
        </div>

        {/* Cards */}
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
                <h3 className="text-xl font-bold text-secondary">
                  {course.name}
                </h3>

                <p className="mt-3 text-slate-500">
                  Explore this course and start your study abroad journey.
                </p>

                <button className="mt-5 flex items-center gap-2 font-semibold text-primary" onClick={() => navigate("/courseSearch")}>
                  Explore Courses
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <button className="group inline-flex items-center gap-3 rounded-full bg-secondary px-8 py-4 font-bold text-white shadow-lg transition-all duration-300 hover:bg-primary">
            Contact Our Team
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </section>
  );
}