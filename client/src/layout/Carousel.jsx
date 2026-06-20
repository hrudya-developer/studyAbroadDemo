import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import sliderImg2 from "../assets/sliderImg2.png";
import studentImg from "../assets/studentImg.png";
import sliderImg3 from "../assets/sliderImg3.png";
import sliderImg4 from "../assets/sliderImg4.png";
import mobileAppBg from "../assets/mobileAppBg.png";



import ButtonPrimary from "../components/ButtonPrimary";
import ButtonSecondary from "../components/ButtonSecondary";

import {
  Globe,
  GraduationCap,
  Headset,
  HeadsetIcon,
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
    image: sliderImg2,
    // mobileImage: mobSlider1,
    textColor: "text-black",
    descColor: "text-black",
    // mobileDescColor: "text-white",
    heading: (
      <>
        Your <span className="text-primary">International</span>
        <br />
        Journey
        <br />
        <span className="text-primary">Begins</span> Here
      </>
    ),
    description: (<><span className="text-white md:text-black">Explore top universities and global scholarships.</span></>),
  },
    {
    image: mobileAppBg,
    // mobileImage: mobSlider1,
    textColor: "text-black",
    descColor: "text-black",
    // mobileDescColor: "text-white",
    heading: (
      <>
        Your <span className="text-primary">International</span>
        <br />
        Journey
        <br />
        <span className="text-primary">Begins</span> Here
      </>
    ),
    description: (<><span className="text-white md:text-black">Explore top universities and global scholarships.</span></>),
  },
 {
    image: studentImg,
    // mobileImage: mobSlider1,
    textColor: "text-black",
    descColor: "text-black",
    // mobileDescColor: "text-white",
    heading: (
      <>
        Your <span className="text-primary">International</span>
        <br />
        Journey
        <br />
        <span className="text-primary">Begins</span> Here
      </>
    ),
    description: (<><span className="text-white md:text-black">Explore top universities and global scholarships.</span></>),
  },

    {
    image: sliderImg3,
    // mobileImage: mobSlider1,
    textColor: "text-black",
    descColor: "text-black",
    // mobileDescColor: "text-white",
    heading: (
      <>
        Study <span className="text-primary">Abroad</span>
        <br />
        With Expert
        <br />
        <span className="text-primary">Guidance</span>
      </>
    ),
    description: (<><span className="text-black">Get personalized counselling for your dream destination.</span></>),
  },
  {
    image: sliderImg4,
    // mobileImage: mobSlider1,
    textColor: "text-black",
    descColor: "text-black",
    // mobileDescColor: "text-white",
    heading: (
      <>
        Study <span className="text-primary">Abroad</span>
        <br />
        With Expert
        <br />
        <span className="text-primary">Guidance</span>
      </>
    ),
    description: (<><span className="text-black">Get personalized counselling for your dream destination.</span></>),
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
      desc: "Students Abroad",
    },
    {
      icon: <School size={22} />,
      count: 5,
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
    <div className="relative mx-auto max-w-7xl overflow-hidden">
      
   <div className="top-3 right-3 absolute z-50 animate__animated animate__pulse">
  <button className="talk-btn bg-black p-6 text-yellow-300 flex gap-3 text-lg font-bold rounded-3xl items-center hover:cursor-pointer">
  <span className="grid place-items-center p-1 rounded-lg shadow-[0_0_10px_rgba(255,215,0,0.8)]"><HeadsetIcon className="text-yellow-300"/></span>
  Talk to Mia
</button>
</div>

      {/* SWIPER */}
    <Swiper
  modules={[Autoplay]}
  autoplay={{ delay: 4000000 }}
  loop
  className="h-[800px] md:h-100dvh w-full"
>
        {slides.map((slide, index) => (
         <SwiperSlide key={index} className="h-full">

            <div className="relative h-full min-h-[650px] md:min-h-0">

              {/* Desktop Background */}
              <div
                className="hidden md:block h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />

              {/* Mobile Background */}
              <div
                className="block md:hidden h-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${slide.mobileImage})`,
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/10"></div>

              {/* Content */}
              <div className="absolute inset-0">

       <div className="mx-auto flex h-full w-full max-w-7xl items-center px-4 sm:px-6 lg:px-8 pb-40 md:pb-0">
  <div className="flex w-full flex-col items-center text-center md:items-start lg:items-start xl:items-start md:text-left">

<h1
  className={`
    font-nunito text-4xl sm:text-5xl md:text-5xl lg:6xl font-extrabold leading-tight
    animate__animated animate__bounceInLeft
    text-white md:text-black
  `}
>
  {slide.heading}
</h1>

<p
  className={`
    mt-5 text-base sm:text-lg md:text-lg font-bold font-nunito
    animate__animated animate__bounceInLeft
    ${slide.mobileDescColor || "text-white"}
md:${slide.descColor || "text-black"}
   text-white md:text-black
  `}
>
  {slide.description}
</p>

                    {/* BUTTONS */}
                   <div className="mt-6 md:mt-8 mb-6 md:mb-10 flex w-full flex-col items-center gap-4 sm:flex-row md:justify-start">
                      <ButtonPrimary className="transition ease-in-out">
                       <a href="#gfc_wrapper" className="w-full h-full hover:cursor-pointer">Get Free Counselling</a> 
                      </ButtonPrimary>

                      <button className="cursor-pointer transition ease-in-out p-2.5 rounded-xl
        text-[14px] sm:text-[14px] md:text-[13px] lg:text-[14px] xl:text-[15px]
        bg-transparent text-darkPrimary
        group
        hover:cursor-pointer hover:bg-primary hover:text-white hover:border-primary border-2 border-darkPrimary

        flex items-center justify-center">
                        <a href="#ep_section" className="w-full h-full">Get Started</a>
                      </button>

                    </div>

                    {/* STATS BOX */}
     <div
  className="
    relative
    inset-x-0
  
    flex
    justify-center
    
   
    md:mt-0
  "
>
       

        <div className="flex w-full max-w-7xl justify-center md:justify-end">

      <div
  className="mt-10
    grid
    w-full
    max-w-2xl
    grid-cols-2 sm:grid-cols-4
    overflow-hidden
    rounded-2xl
    md:shadow-xl
    animate__animated
    animate__zoomInLeft
    md:w-auto
    md:max-w-none
  "
>
            {stats.map((item, index) => (
              <div
                key={index} className="flex flex-col items-center bg-black/40
  md:bg-white/20
  rounded-xl
  md:rounded-none
  md:border-r
  md:border-gray-200
  px-2
  py-4
  text-center
  font-nunito
  last:border-r-0
  md:px-5">
                <div className="grid size-14 place-content-center rounded-2xl shadow-lg md:bg-primary md:shadow-sm text-white text-lg">
                  {item.icon}
                </div>

                <h3 className="mt-4 text-lg text-white md:text-darkPrimary md:text-xl lg:text-xl font-extrabold">
                  <Counter end={item.count} />
                  {item.suffix}
                </h3>

                <p className="mt-2 hidden text-sm font-bold text-black sm:block md:text-sm">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>

      </div>

                  </div>

                </div>
 
              </div>

            </div>

          </SwiperSlide>
        ))}
      </Swiper>

     
    </div>
  );
};

export default Carousel;