import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import sliderImg2 from "../assets/sliderImg2.png";
import studentImg from "../assets/studentImg.png";
import sliderImg3 from "../assets/sliderImg3.png";
import sliderImg4 from "../assets/sliderImg4.png";


import sliderImg8 from "../assets/sliderImg8.png";
import sliderImg9 from "../assets/sliderImg9.png";

import ButtonPrimary from "../components/ButtonPrimary";

import {
  Globe,
  GraduationCap,
  Headset,
  HeadsetIcon,
  Plane,
  School,
  UsersRound,
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
      label: "Learn Beyond Borders",
      mobileLabel: "Study Abroad",
      image: sliderImg8,
      mobileImage: sliderImg8,
      heading: (
        <>
          Your <span className="text-primary lg:text-black">International</span>
          <br />
          Journey
          <br />
          <span className="text-primary lg:text-black">Begins</span> Here
        </>
      ),
      description: "Explore top universities and global scholarships.",
    },
     {
      label: "Learn Beyond Borders",
      mobileLabel: "Study Abroad",
      image: sliderImg2,
      mobileImage: sliderImg2,
      heading: (
        <>
          Your <span className="text-primary lg:text-black">International</span>
          <br />
          Journey
          <br />
          <span className="text-primary lg:text-black">Begins</span> Here
        </>
      ),
      description: "Explore top universities and global scholarships.",
    },
   
     {
      label: "Learn Beyond Borders",
      mobileLabel: "Study Abroad",
      image: sliderImg9,
      mobileImage: sliderImg9,
      heading: (
        <>
          Your <span className="text-primary lg:text-black">International</span>
          <br />
          Journey
          <br />
          <span className="text-primary lg:text-black">Begins</span> Here
        </>
      ),
      description: "Explore top universities and global scholarships.",
    },
   
    {
      label: "Learn Beyond Borders",
      mobileLabel: "Study Abroad",
      image: studentImg,
      mobileImage: studentImg,
      heading: (
        <>
          Your <span className="text-primary lg:text-black">International</span>
          <br />
          Journey
          <br />
          <span className="text-primary lg:text-black">Begins</span> Here
        </>
      ),
      description: "Explore top universities and global scholarships.",
    },
    {
      label: "Learn Beyond Borders",
      mobileLabel: "Study Abroad",
      image: sliderImg3,
      mobileImage: sliderImg3,
      heading: (
        <>
          Study <span className="text-primary lg:text-black">Abroad</span>
          <br />
          With Expert
          <br />
          <span className="text-primary lg:text-black">Guidance</span>
        </>
      ),
      description: "Get personalized counselling for your dream destination.",
    },
    {
      label: "Learn Beyond Borders",
      mobileLabel: "Study Abroad",
      image: sliderImg4,
      mobileImage: sliderImg4,
      heading: (
        <>
          Study <span className="text-primary lg:text-black">Abroad</span>
          <br />
          With Expert
          <br />
          <span className="text-primary lg:text-black">Guidance</span>
        </>
      ),
      description: "Get personalized counselling for your dream destination.",
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
    <section className="relative mx-auto w-full max-w-7xl overflow-hidden">
      {/* Floating CTA */}
      <div className="absolute right-3 top-3 z-9 animate__animated animate__pulse sm:right-4 sm:top-4">
        <button
          type="button"
          className="
            talk-btn
            flex items-center gap-1 rounded-2xl bg-logoYellow px-3 py-2
            text-xs font-bold text-black shadow-xl
            hover:cursor-pointer
            sm:gap-3 sm:rounded-3xl sm:px-5 sm:py-4 sm:text-base
            lg:bg-black lg:px-6 lg:py-5 lg:text-lg lg:text-yellow-300
          "
        >
          <span className="grid place-items-center rounded-lg p-1 shadow-[0_0_10px_rgba(255,215,0,0.8)]">
            <HeadsetIcon className="size-4 text-black sm:size-5 lg:size-6 lg:text-yellow-300" />
          </span>
          <span className="whitespace-nowrap">Talk to Mia</span>
        </button>
      </div>

    <Swiper
  modules={[Autoplay]}
  autoplay={{ delay: 4000, disableOnInteraction: false }}
  loop={slides.length > 1}
  className="h-auto min-h-[520px] w-full sm:min-h-[600px] md:min-h-[620px] lg:min-h-[620px] xl:min-h-[650px]"
>
  {slides.map((slide, index) => (
    <SwiperSlide key={index} className="h-auto">
      <div className="relative min-h-[520px] w-full overflow-hidden sm:min-h-[600px] md:min-h-[620px] lg:min-h-[620px] xl:min-h-[650px]">
        {/* Responsive image */}
        <picture className="absolute inset-0 block h-full w-full">
          <source media="(min-width: 768px)" srcSet={slide.image} />
          <img
            src={slide.mobileImage || slide.image}
            alt="Study abroad banner"
            className="h-full w-full object-cover object-right md:object-center"
          />
        </picture>

        {/* Readability overlay */}
        <div className="absolute inset-0 bg-black/80 lg:hidden" />

        {/* Content */}
        <div className="relative z-10 flex min-h-[520px] w-full items-center sm:min-h-[600px] md:min-h-[620px] lg:min-h-[620px] xl:min-h-[650px]">
  <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-16 sm:px-6 sm:py-20 md:items-start md:px-8 md:py-20 lg:px-10 xl:px-12">
    <div className="flex w-full max-w-xl flex-col items-center text-center md:items-start md:text-left">
      <span className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-white px-4 py-2 text-xs font-bold text-white shadow-md sm:text-sm lg:border-0 lg:bg-logoYellow/90 lg:text-darkPrimary">
        <Plane className="size-4 shrink-0 sm:size-5" />
        <span className="whitespace-nowrap sm:hidden">
          {slide.mobileLabel || "Study Abroad"}
        </span>
        <span className="hidden whitespace-nowrap sm:inline">
          {slide.label}
        </span>
      </span>

      <h1 className="animate__animated animate__bounceInLeft font-nunito text-[34px] font-extrabold leading-[1.08] text-white min-[390px]:text-4xl sm:text-5xl md:text-5xl lg:text-6xl lg:text-primary">
        {slide.heading}
      </h1>

      <p className="mx-auto mt-4 max-w-md font-nunito text-sm font-bold leading-relaxed text-white sm:text-base md:mx-0 md:text-lg lg:text-black">
        {slide.description}
      </p>

      <div className="mt-6 mb-6 flex w-full flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
        <ButtonPrimary className="w-[70%] bg-primary border-2 border-primary transition ease-in-out sm:w-auto">
          <a className="flex h-full w-full items-center justify-center hover:cursor-pointer"
          >
            Get Free Counselling
          </a>
        </ButtonPrimary>

        <a
          href="#ep_section"
          className="flex w-[70%] items-center justify-center rounded-xl border-2 border-white bg-white px-5 py-3 text-sm font-bold text-darkPrimary transition ease-in-out hover:cursor-pointer hover:border-primary hover:bg-primary hover:text-white sm:w-auto lg:border-2 lg:border-darkPrimary lg:bg-transparent"
        >
          Get Started
        </a>
      </div>

      <div className="mt-4 w-full animate__animated animate__zoomInLeft sm:mt-6">
        <div className="grid w-full grid-cols-2 overflow-hidden rounded-2xl bg-black/35 shadow-xl backdrop-blur-sm sm:grid-cols-4 md:max-w-2xl lg:bg-white/70">
          {stats.map((item, statIndex) => (
            <div
              key={statIndex}
              className="flex min-w-0 flex-col items-center border-white/10 px-2 py-3 text-center font-nunito odd:border-r sm:border-r sm:last:border-r-0 lg:border-gray-200 lg:px-4 lg:py-4 xl:px-5"
            >
              <div className="grid size-10 place-content-center rounded-full bg-logoYellow text-darkPrimary shadow-sm sm:size-11 lg:size-12 lg:bg-primary lg:text-white xl:size-14">
                {item.icon}
              </div>

              <h3 className="mt-2 text-base font-extrabold text-white sm:text-lg lg:text-xl lg:text-secondary">
                <Counter end={item.count} />
                {item.suffix}
              </h3>

              <p className="mt-1 text-[11px] font-bold leading-tight text-white sm:text-xs lg:text-darkPrimary xl:text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-3 right-10 hidden gap-2 rounded-2xl bg-secondary p-5 py-6 text-white lg:flex">
        <span className="grid h-12 w-12 place-content-center rounded-full bg-white p-2 shadow-xl">
          <UsersRound className="text-primary" />
        </span>
        <span className="flex flex-col text-sm">
          10k +<br />
          Students <br />
          Guided Successfully
        </span>
      </div>
    </div>
  </div>
</div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
    </section>
  );
};

export default Carousel;
