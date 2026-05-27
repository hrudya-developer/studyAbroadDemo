import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { BookOpen } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

import { fetchPopularCourses } from "../redux/slices/courseSlice";

const PopularCourses = () => {
  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth);

  const { popularCourses, courseImagePath, loading, error } = useSelector(
    (state) => state.courseData
  );

  useEffect(() => {
    if (uid) {
      dispatch(fetchPopularCourses(uid));
    }
  }, [uid, dispatch]);

  if (loading) {
    return <p className="font-semibold text-slate-500">Loading courses...</p>;
  }

  if (error) {
    return <p className="font-semibold text-red-500">{error}</p>;
  }

  return (
    <div className="rounded-[32px] bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-3xl font-black text-slate-950">
        Popular Courses
      </h2>

      {popularCourses?.length > 0 ? (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={16}
          slidesPerView={3}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={popularCourses.length > 3}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {popularCourses.map((course) => {
            const imageName =
              course.image ||
              course.course_image ||
              course.thumbnail ||
              course.icon;

            const courseImage = imageName
              ? `${courseImagePath}${imageName}`
              : null;

            return (
              <SwiperSlide key={course.id || course.course_id}>
                <div className="h-full rounded-3xl border border-slate-100 bg-white p-4 shadow-sm transition hover:shadow-md">
                  <div className="mb-4 grid h-40 place-items-center overflow-hidden rounded-2xl bg-slate-50">
                    {courseImage ? (
                      <img
                        src={courseImage}
                        alt={course.name || course.course || "Course"}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <BookOpen size={44} className="text-primary" />
                    )}
                  </div>

                  <h3 className="text-xl font-black text-slate-950">
                    {course.name ||
                      course.course_name ||
                      course.title ||
                      course.course ||
                      "Course"}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm font-medium leading-6 text-slate-500">
                    {course.description ||
                      course.short_description ||
                      "Explore this course and start your study abroad journey."}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <p className="text-sm font-semibold text-slate-500">
          No courses found
        </p>
      )}
    </div>
  );
};

export default PopularCourses;