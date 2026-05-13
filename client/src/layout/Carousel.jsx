import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

import sliderImg_1 from "../assets/sliderImg_1.png";
import sliderImg_2 from "../assets/sliderImg_2.png";
import sliderImg_3 from "../assets/sliderImg_3.png";

import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";

import { Globe, GraduationCap, Headset, School } from "lucide-react";

const Carousel = () => {
  const slides = [
    {
      image: sliderImg_1,
      textColor: "text-black",
      descColor: "text-black",
    },
    {
      image: sliderImg_2,
      textColor: "text-white",
      descColor: "text-white",
    },
    {
      image: sliderImg_3,
      textColor: "text-white",
      descColor: "text-white",
    },
  ];

  const stats = [
    {
      icon: <GraduationCap size={22} />,
      count: "11K+",
      desc: "Scholarships Awarded",
    },
    {
      icon: <Globe size={22} />,
      count: "30K+",
      desc: "Student went Abroad",
    },
    {
      icon: <School size={22} />,
      count: "50K+",
      desc: "Top Universities",
    },
    {
      icon: <Headset size={22} />,
      count: "Free",
      desc: "Free Counselling",
    },
  ];

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Swiper */}

      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="w-full h-[calc(100vh-134px)]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Content Container */}

              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex flex-col justify-center h-full pb-40 pt-24 md:pt-0">
                  
                  <h1
                    className={`text-5xl md:text-6xl animate__animated animate__bounceInLeft font-extrabold leading-tight text-center md:text-left font-ubuntu ${slide.textColor}`}
                  >
                    Your{" "}
                    <span className="text-primary">
                      International
                    </span>
                    <br />
                    Journey <br />
                    <span className="text-primary">
                      Begins
                    </span>{" "}
                    Here
                  </h1>

                  <p
                    className={`mt-8 font-bold animate__animated animate__bounceInLeft font-nunito text-center md:text-left text-lg md:text-xl ${slide.descColor}`}
                  >
                    Explore top universities, scholarships,
                    and study options across the world.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center md:justify-start animate__animated animate__bounceInLeft">
                    <ButtonPrimary>
                      Get Free Counselling
                    </ButtonPrimary>

                    <ButtonSecondary>
                      Get Started
                    </ButtonSecondary>
                  </div>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Stats Box */}

      <div className="absolute inset-x-0 bottom-3 z-20 hidden sm:flex justify-center px-4">
        
        <div className="w-full max-w-7xl flex justify-end">
          
          <div
            className="
              bg-white rounded-2xl shadow-xl animate__animated animate__zoomInLeft
              grid grid-cols-4
              overflow-hidden
            "
          >
            {stats.map((item, index) => (
              <div
                key={index}
                className="
                  py-4 px-5
                  border-r border-gray-200
                  last:border-r-0
                  flex flex-col items-center text-center font-nunito
                "
              >
                <div className="bg-secondary text-white size-12 rounded-full grid place-content-center">
                  {item.icon}
                </div>

                <h3 className="text-primary font-bold text-lg md:text-lg mt-4">
                  {item.count}
                </h3>

                <p className="text-sm md:text-sm font-semibold text-black mt-2">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Carousel;