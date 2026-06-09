import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { fetchCountries } from "../redux/slices/countrySlice";

const SDBDestinations = () => {
  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth);

  const { countries, imagePath } = useSelector(
    (state) => state.countryData
  );

  useEffect(() => {
    if (uid && countries.length === 0) {
      dispatch(fetchCountries(uid));
    }
  }, [uid, dispatch, countries.length]);

  return (
    <section className="bg-white shadow-md p-3 rounded-[32px]">
      <h2 className="mb-6 text-3xl font-extrabold text-start p-2 border-b border-b-gray-100 rounded-lg text-secondary">
        Destinations
      </h2>

      {countries?.length > 0 ? (
        <Swiper
          modules={[Autoplay]}
          navigation
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={countries.length > 2}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
        >
     {countries.map((item) => {
  const countryImage = item.image
    ? `${imagePath}/${item.image}`
    : "";

  const flagImage = item.flag
    ? `${imagePath}/${item.flag}`
    : null;

  return (
    <SwiperSlide key={item.id}>
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-lg">

        <img
          src={countryImage}
          alt={item.country || item.name}
          className="h-52 w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        <div className="absolute left-4 top-4 rounded-full bg-white/90 p-2 backdrop-blur">
          {flagImage ? (
            <img
              src={flagImage}
              alt={item.country || "flag"}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            "🌍"
          )}
        </div>

        <div className="absolute bottom-4 left-4">
          <h3 className="text-xl font-bold text-white">
            {item.country || item.name}
          </h3>
        </div>

      </div>
    </SwiperSlide>
  );
})}
        </Swiper>
      ) : (
        <div className="py-10 text-center text-slate-500">
          No destinations found
        </div>
      )}
    </section>
  );
};

export default SDBDestinations;