import { MdFlight } from "react-icons/md";
import { GiChurch } from "react-icons/gi";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchCountries } from "../redux/slices/countrySlice";

const Destinations = () => {
  const dispatch = useDispatch();

  const { countries, imagePath, loading } = useSelector(
    (state) => state.countryData
  );

  const { uid } = useSelector((state) => state.auth);

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries(uid || 0));
    }
  }, [uid, dispatch, countries.length]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-lg font-bold text-slate-700">
          Loading destinations...
        </p>
      </div>
    );
  }

  return (
    <section id="_destinationWrapper" className="overflow-hidden py-20">
      <div className="mx-auto max-w-7xl px-5" data-aos="fade-left">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-center text-center">
          <p className="mb-4 flex items-center justify-center gap-3 text-md font-bold text-primary">
            <span>
              <MdFlight className="text-primary" />
            </span>
            EXPLORE. LEARN. GROW
          </p>

          <h1 className="mb-3 font-ubuntu text-3xl font-bold text-secondary sm:text-3xl md:text-4xl lg:text-5xl">
            Dream <span className="text-primary">Destinations</span>
          </h1>

          <p className="textColor mx-auto w-[90%] pt-3 text-md sm:w-[90%] md:w-[65%] lg:w-[60%]">
            Choose your perfect study abroad destination and unlock a world of
            opportunities.
          </p>

          <p className="mx-auto mt-3 h-[3px] w-[65px] bg-[#008297]"></p>
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
          {countries?.map((item, index) => {
            const countryImage = item.image
              ? `${imagePath}/${item.image}`
              : "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800&auto=format&fit=crop";

            const flagImage = item.flag
              ? `${imagePath}/${item.flag}`
              : null;

            return (
              <SwiperSlide key={item.id || index}>
                <div className="group my-2 cursor-pointer overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-500 hover:shadow-2xl">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img
                      src={countryImage}
                      alt={item.country}
                      className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 transition-all duration-500 group-hover:bg-black/40"></div>

                    {/* Flag */}
                    <div className="absolute left-4 top-4 rounded-full bg-white p-1 shadow-md">
                      {flagImage ? (
                        <img
                          src={flagImage}
                          alt={item.country}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-xl">
                          🌍
                        </div>
                      )}
                    </div>

                    {/* Number Badge */}
                    <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    {/* Title */}
                    <div className="mb-3 flex items-center justify-between">
                      <h2 className="text-xl font-bold text-secondary">
                        {item.country}
                      </h2>

                      <span className="text-3xl text-primary">
                        <GiChurch />
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="mb-4 h-[3px] w-12 rounded-full bg-primary"></div>

                    {/* Description */}
                    {/* <ul className="space-y-2">
                      <li className="text-sm text-gray-700">
                        • World-class education opportunities
                      </li>

                      <li className="text-sm text-gray-700">
                        • Popular destination for international students
                      </li>
                    </ul> */}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Destinations;