import {
  Cog,
  Computer,
  HeartPlus,
  Palette,
  ShoppingCart,
  BriefcaseBusiness,
  Check,
  CheckCheck,
} from "lucide-react";

import ButtonPrimary from "../components/ButtonPrimary";
import { useDispatch, useSelector } from "react-redux";
import { fetchPopularCourses } from "../redux/slices/courseSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";


const StudyTabContent = () => {

  const dispatch = useDispatch();

  const { popularCourses, loading, courseImagePath } = useSelector(
  (state) => state.courseData
);



useEffect(() => {
  if (!popularCourses?.length && !loading) {
    dispatch(fetchPopularCourses(0));
  }
}, [dispatch, popularCourses.length, loading]);

if (loading) {
  return (
    <div className="text-center py-10">
      Loading courses...
    </div>
  );
}


  return (
    <section className="">


  <div className="max-w-6xl mx-auto">

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" data-aos="fade-up">

      {popularCourses.slice(6, 12).map((item, index) => (

        <div
          key={index}
          className="group bg-white rounded-[22px] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-visible w-[92%] mx-auto"
        >

          {/* image */}
          <div className="relative overflow-visible rounded-t-[22px]">

          <img
  src={`${courseImagePath}/${item.icon}`}
  alt={item.name}
  className="w-full h-[210px] object-cover rounded-t-[22px]"
/>

            {/* floating icon */}
            <div className="absolute bottom-[-28px] left-1/2 -translate-x-1/2 z-50">

              <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center border-[4px] border-white">

                <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center">
                  <CheckCheck size={20} />
                </div>

              </div>

            </div>

          </div>

          {/* content */}
          <div className="pt-11 pb-6 px-5 text-center relative z-10">

            <h1 className="font-bold text-base text-secondary leading-snug min-h-[55px] flex items-center justify-center">
              {item.name}
            </h1>

            {/* divider */}
            <div className="w-14 h-1 bg-primary rounded-full mx-auto mt-3"></div>

            {/* decorative dots */}
            <div className="absolute bottom-4 right-4 grid grid-cols-4 gap-1 opacity-20">

              {[...Array(12)].map((_, i) => (
                <span
                  key={i}
                  className="w-1 h-1 rounded-full bg-primary"
                ></span>
              ))}

            </div>

            {/* corner decoration */}
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-primary/5 rounded-tr-full"></div>

          </div>

        </div>

      ))}

    </div>
    <Link to="/courseSearch">
      <ButtonPrimary className="my-10 mx-auto">
        View All Courses
      </ButtonPrimary>
    </Link>
  </div>

</section>
  );
};

export default StudyTabContent;