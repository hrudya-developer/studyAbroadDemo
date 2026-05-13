import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// import CountUp from "react-countup";

import "swiper/css";

import sliderImg_1 from "../assets/sliderImg_1.png";
import sliderImg_2 from "../assets/sliderImg_2.png";
import sliderImg_3 from "../assets/sliderImg_3.png";

import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";

import {
  Globe,
  GraduationCap,
  Headset,
  School,
} from "lucide-react";

import { useEffect, useState } from "react";

const Counter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count}</span>;
};

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
      count: 11,
      suffix: "K+",
      desc: "Scholarships Awarded",
    },
    {
      icon: <Globe size={22} />,
      count: 30,
      suffix: "K+",
      desc: "Student went Abroad",
    },
    {
      icon: <School size={22} />,
      count: 50,
      suffix: "K+",
      desc: "Top Universities",
    },
    {
      icon: <Headset size={22} />,
      count: 100,
      suffix: "%",
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
        className="w-full h-[calc(100vh-90px)] md:h-[calc(100vh-134px)]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Content Container */}

              <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
                <div className="flex flex-col justify-center h-full pb-28 md:pb-40 pt-24 md:pt-0">

                  <h1
                    className={`text-4xl sm:text-5xl md:text-6xl animate__animated animate__bounceInLeft font-extrabold leading-tight text-center md:text-left font-ubuntu ${slide.textColor}`}
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
                    className={`mt-6 md:mt-8 font-bold animate__animated animate__bounceInLeft font-nunito text-center md:text-left text-base sm:text-lg md:text-xl ${slide.descColor}`}
                  >
                    Explore top universities, scholarships,
                    and study options across the world.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-10 justify-center md:justify-start animate__animated animate__bounceInLeft">
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

      <div className="absolute inset-x-0 bottom-3 z-20 flex justify-center px-4">

        <div className="w-full max-w-7xl flex justify-center md:justify-end">

          <div
            className="
              bg-white rounded-2xl shadow-xl animate__animated animate__zoomInLeft
              grid grid-cols-2 md:grid-cols-4
              overflow-hidden
              w-full md:w-auto
              max-w-2xl md:max-w-none
            "
          >
            {stats.map((item, index) => (
              <div
                key={index}
                className="
                  py-4 px-4 md:px-5
                  border-b md:border-b-0
                  border-r border-gray-200
                  even:border-r-0
                  md:even:border-r
                  md:last:border-r-0
                  flex flex-col items-center text-center font-nunito
                "
              >
                <div className="bg-secondary text-white size-12 rounded-full grid place-content-center">
                  {item.icon}
                </div>
<h3 className="text-primary font-bold text-lg md:text-xl mt-4">
  <Counter end={item.count} />
  {item.suffix}
</h3>

                <p className="text-xs sm:text-sm md:text-sm font-semibold text-black mt-2">
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