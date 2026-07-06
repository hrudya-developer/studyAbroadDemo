import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const GermanPopularCourses = () => {
  const [cards, setCards] = useState([]);
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHomeResponses = async () => {
      try {
        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("api", "overseas@Miak2023");
        formData.append("uid", "0");

        const res = await axios.post(
          "https://overseas.technocitysolutions.com/public/api/getHomeResponses",
          formData,
          { headers: { Accept: "application/json" } }
        );

        setCards(res.data?.home_tile_new || []);
        setImagePath(res.data?.hometile_image_path || "");
      } catch (err) {
        console.log("Home response error:", err.response?.data || err);
        setError("Failed to load German programs.");
      } finally {
        setLoading(false);
      }
    };

    fetchHomeResponses();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-pink-50 py-16">
      <div className="absolute -left-24 top-20 h-72 w-72 rounded-full bg-pink-100 blur-3xl" />
      <div className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-blue-100 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4">
        <div className="mb-10 flex flex-col items-center text-center">
          <span className="mb-3 rounded-full bg-pink-100 px-5 py-2 text-xs font-bold uppercase tracking-widest text-primary">
            Explore Programs
          </span>

          <h2 className="text-3xl font-extrabold text-darkPrimary md:text-5xl">
            German Popular Courses
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
            Discover top German career pathways designed for study, work and
            international experience.
          </p>
        </div>

        {loading && (
          <div className="flex justify-center py-16">
            <Loader2 className="animate-spin text-darkPrimary" size={40} />
          </div>
        )}

        {!loading && error && (
          <p className="text-center font-semibold text-red-600">{error}</p>
        )}

        {!loading && !error && cards.length === 0 && (
          <p className="text-center text-gray-500">No programs found.</p>
        )}

        {!loading && !error && cards.length > 0 && (
          <div className="relative">
            <button className="german-prev absolute -left-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-darkPrimary shadow-xl transition hover:bg-darkPrimary hover:text-white md:-left-5">
              <ChevronLeft size={22} />
            </button>

            <button className="german-next absolute -right-2 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white text-darkPrimary shadow-xl transition hover:bg-darkPrimary hover:text-white md:-right-5">
              <ChevronRight size={22} />
            </button>

            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation={{
                prevEl: ".german-prev",
                nextEl: ".german-next",
              }}
              pagination={{ clickable: true }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              loop={cards.length > 4}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
                1280: { slidesPerView: 4 },
              }}
              className="german-popular-courses !px-1 !pb-16"
            >
              {cards.map((item) => (
                <SwiperSlide key={item.id} className="!h-auto py-2">
                  <div className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-white/80 bg-white shadow-[0_15px_40px_rgba(15,23,42,0.10)] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(99,26,51,0.22)]">
                    <div className="relative h-60 overflow-hidden">
                      <img
                        src={`${imagePath}${item.icon}`}
                        alt={item.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/600x400?text=Medcity";
                        }}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

                      <div className="absolute left-5 top-5 rounded-full bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-darkPrimary backdrop-blur">
                        German Program
                      </div>

                      <div className="absolute bottom-2 right-2 h-20 w-20 overflow-hidden rounded-2xl border-4 border-white bg-white shadow-2xl">
                        <img
                          src={`${imagePath}${item.image}`}
                          alt={item.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-2xl font-extrabold text-black">
                        {item.name}
                      </h3>

                      <h5 className="mt-2 text-xs font-bold uppercase tracking-widest text-primary">
                        {item.titleWhy}
                      </h5>

                      <p className="mt-4 line-clamp-4 text-sm leading-7 text-gray-600">
                        {item.why}
                      </p>

                      <Link
                        to={`/germanPrograms/${item.id}`}
                        className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl bg-darkPrimary px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-primary hover:shadow-xl"
                      >
                        Learn More
                        <ArrowRight size={17} />
                      </Link>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
};

export default GermanPopularCourses;