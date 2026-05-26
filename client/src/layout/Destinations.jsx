import { MdFlight } from "react-icons/md";
import { GiChurch } from "react-icons/gi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

import uk_img from "../assets/uk_img.png";
import germany_img from "../assets/germany_img.png";

const Destinations = () => {
  const destinationInfo = [
    {
      number: "01",
      image: uk_img,
      place: "UK",
      icon: <GiChurch />,
      desc1: "World-class education",
      desc2: "Rich cultural heritage",
    },
    {
      number: "02",
      image: germany_img,
      place: "Germany",
      icon: <GiChurch />,
      desc1: "Affordable education",
      desc2: "Top engineering universities",
    },
    {
      number: "03",
      image: uk_img,
      place: "Australia",
      icon: <GiChurch />,
      desc1: "Student-friendly cities",
      desc2: "Excellent lifestyle",
    },
    {
      number: "04",
      image: uk_img,
      place: "USA",
      icon: <GiChurch />,
      desc1: "Global career opportunities",
      desc2: "Best research universities",
    },
    {
      number: "05",
      image: germany_img,
      place: "Canada",
      icon: <GiChurch />,
      desc1: "High quality education",
      desc2: "Safe and welcoming",
    },
  ];

  return (
    <section id="_destinationWrapper" className="py-20  overflow-hidden">
      <div className="max-w-7xl mx-auto px-5" data-aos="fade-left">

        {/* Header */}
        <div className="text-center mb-12 flex justify-center flex-col">
          <p className="text-primary mb-4 flex justify-center gap-3 items-center text-md font-bold">
            <span>
              <MdFlight className="text-primary" />
            </span>
            EXPLORE. LEARN. GROW
          </p>

          <h1 className="font-ubuntu font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 text-secondary">
            Dream <span className="text-primary">Destinations</span>
          </h1>

          <p className="textColor w-[90%] sm:w-[90%] md:w-[65%] lg:w-[60%] mx-auto pt-3 text-md">
            Choose your perfect study abroad destination and unlock a world of opportunities.
          </p>

          <p className="w-[65px] h-[3px] bg-[#008297] mx-auto mt-3"></p>
        </div>

        {/* Carousel */}
        <Swiper
          modules={[Autoplay, FreeMode]}
          loop={true}
          freeMode={true}
          grabCursor={true}
          allowTouchMove={false}
          speed={4000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
          }}
          className="destinationSwiper"
        >
          {destinationInfo.map((destination) => (
            <SwiperSlide key={destination.number}>
              <div className="rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-2xl transition-all duration-500 group cursor-pointer my-2">

                {/* Image */}
                <div className="relative overflow-hidden">
                  <img
                    src={destination.image}
                    alt={destination.place}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500"></div>

                  {/* Number Badge */}
                  <span className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    {destination.number}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">

                  {/* Title */}
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-bold text-secondary">
                      {destination.place}
                    </h2>

                    <span className="text-primary text-3xl">
                      {destination.icon}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="w-12 h-[3px] bg-primary mb-4 rounded-full"></div>

                  {/* Description */}
                  <ul className="space-y-2">
                    <li className="text-gray-700 text-sm">
                      • {destination.desc1}
                    </li>

                    <li className="text-gray-700 text-sm">
                      • {destination.desc2}
                    </li>
                  </ul>
                </div>

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Destinations;