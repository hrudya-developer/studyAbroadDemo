import { BookOpen } from "lucide-react";
import { useSelector } from "react-redux";

const UniversityMainCourses = ({ onSelectMainCourse, selectedMainCourseId }) => {
  const {
    universityMainCourses = [],
    universityMainCoursesLoading,
    universityMainCoursesError,
    courseImagePath,
  } = useSelector((state) => state.courseData);

  const imageBasePath = courseImagePath || "";

  if (universityMainCoursesLoading) {
    return <p className="py-6 text-center font-bold">Loading main courses...</p>;
  }

  if (universityMainCoursesError) {
    return (
      <p className="py-6 text-center font-bold text-[#cb0e10]">
        {universityMainCoursesError}
      </p>
    );
  }

  if (universityMainCourses.length === 0) return null;

  return (
    <div className="mb-8">
     

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-5">
        {universityMainCourses.map((course) => {
          const isActive = String(selectedMainCourseId) === String(course.c_id);
          const imageUrl =
            imageBasePath && course.icon ? `${imageBasePath}${course.icon}` : "";

          return (
            <button
              type="button"
              key={course.c_id}
              onClick={() => onSelectMainCourse?.(course.c_id)}
              className={`rounded-xl p-3 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-md ${
                isActive
                  ? "bg-red-100"
                  : "bg-gray-100"
              }`}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-white">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={course.name}
                    className="h-7 w-7 object-contain"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling.style.display = "block";
                    }}
                  />
                ) : null}

                <BookOpen
                  className="h-6 w-6"
                  style={{ display: imageUrl ? "none" : "block" }}
                />
              </div>

              <h4 className="text-md font-black text-[#081c47]">
                {course.name}
              </h4>

              <p className="mt-2 text-sm font-bold text-slate-700">
                {course.courses} Courses
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default UniversityMainCourses;