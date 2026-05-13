import {
  Cog,
  Computer,
  HeartPlus,
  Palette,
  ShoppingCart,
  BriefcaseBusiness,
} from "lucide-react";

import art_img from "../assets/art_img.png";
import engg_img from "../assets/engg_img.png";
import mba_img from "../assets/mba_img.png";
import cse_img from "../assets/cse_img.png";
import health_img from "../assets/health_img.png";
import commerce_img from "../assets/commerce_img.png";

const StudyTabContent = () => {
  const studyData = [
    {
      image: art_img,
      title: "Arts",
      icon: <Palette size={20} />,
    },
    {
      image: engg_img,
      title: "Engineering",
      icon: <Cog size={20} />,
    },
    {
      image: mba_img,
      title: "Business Administration",
      icon: <BriefcaseBusiness size={20} />,
    },
    {
      image: cse_img,
      title: "Computer Science & Information Technology",
      icon: <Computer size={20} />,
    },
    {
      image: health_img,
      title: "Health",
      icon: <HeartPlus size={20} />,
    },
    {
      image: commerce_img,
      title: "Commerce",
      icon: <ShoppingCart size={20} />,
    },
  ];

  return (
    <section className="py-4">

  {/* reduced overall width */}
  <div className="max-w-6xl mx-auto">

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {studyData.map((item, index) => (

        <div
          key={index}
          className="group bg-white rounded-[22px] shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 overflow-visible w-[92%] mx-auto"
        >

          {/* image */}
          <div className="relative overflow-visible rounded-t-[22px]">

            <img
              src={item.image}
              alt={item.title}
              className="w-full h-[210px] object-cover rounded-t-[22px] group-hover:scale-105 transition duration-500"
            />

            {/* floating icon */}
            <div className="absolute bottom-[-28px] left-1/2 -translate-x-1/2 z-50">

              <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center border-[4px] border-white">

                <div className="w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center">
                  {item.icon}
                </div>

              </div>

            </div>

          </div>

          {/* content */}
          <div className="pt-11 pb-6 px-5 text-center relative z-10">

            <h1 className="font-bold text-base text-secondary leading-snug min-h-[55px] flex items-center justify-center">
              {item.title}
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

  </div>

</section>
  );
};

export default StudyTabContent;