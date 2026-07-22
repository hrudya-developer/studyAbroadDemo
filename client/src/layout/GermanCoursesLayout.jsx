import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import axios from "axios";

import "swiper/css";
import "swiper/css/navigation";

const GermanCoursesLayout = () => {
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

        const sortedCards = [...(res.data?.home_tile_new || [])].sort(
          (a, b) => {
            const aName = String(a?.name || "").toLowerCase();
            const bName = String(b?.name || "").toLowerCase();

            const aAusbildung = aName.includes("ausbildung");
            const bAusbildung = bName.includes("ausbildung");

            if (aAusbildung && !bAusbildung) return -1;
            if (!aAusbildung && bAusbildung) return 1;

            return 0;
          }
        );

        setCards(sortedCards);
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
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-blue-50 py-14 sm:py-16 lg:py-20" data-aos="fade-up">
      <div className="absolute -left-28 top-12 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl" />
      <div className="absolute -right-28 bottom-8 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[0.85fr_1.65fr] lg:px-8">
        <div className="text-center lg:text-left">
          <span className="inline-flex rounded-full border border-pink-200 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary shadow-sm">
            Study. Work. Settle in Germany
          </span>

          <h2 className="mt-5 font-nunito text-3xl font-extrabold leading-tight text-darkPrimary sm:text-3xl md:text-4xl lg:text-5xl">
            German <br />
            Popular <span className="bg-gradient-to-r
                  from-primary
                  via-[#a83d8b]
                  to-secondary
                  bg-clip-text
                  text-transparent">Courses</span>
          </h2>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-gray-600 sm:text-base lg:mx-0">
            Discover top German career pathways designed for study, work and
            international experience.
          </p>

          <Link
            to="/germanPopularCourses"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-5 py-3 text-sm text-white shadow-lg shadow-pink-200 transition hover:-translate-y-1 hover:bg-primary sm:text-base"
          >
            View All Programs
            <ArrowRight size={20} />
          </Link>
        </div>

        <div className="relative min-w-0">
          {loading && (
            <div className="flex min-h-[360px] items-center justify-center">
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
            <>
              <div className="mb-5 flex justify-center gap-3 lg:justify-end">
                <button
                  type="button"
                  className="german-home-prev grid h-11 w-11 place-items-center rounded-full bg-gray-100 text-darkPrimary shadow-md transition hover:bg-primary hover:text-white"
                >
                  <ChevronLeft size={22} />
                </button>

                <button
                  type="button"
                  className="german-home-next grid h-11 w-11 place-items-center rounded-full bg-primary text-white shadow-md transition hover:bg-darkPrimary"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              <Swiper
                key={cards.map((item) => item.id).join("-")}
                modules={[Navigation]}
                navigation={{
                  prevEl: ".german-home-prev",
                  nextEl: ".german-home-next",
                }}
                loop={cards.length > 2}
                spaceBetween={24}
                slidesPerView={1}
                breakpoints={{
                  540: { slidesPerView: 1 },
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 2 },
                  1024: { slidesPerView: 2 },
                }}
                className="!pb-5"
              >
                {cards.map((item) => (
                  <SwiperSlide key={item.id} className="!h-auto py-2">
                    <div className="group flex h-full flex-col overflow-hidden rounded-[30px] bg-slate-50 shadow-xl shadow-slate-200/70 ring-1 ring-slate-100 transition duration-300 hover:-translate-y-2 hover:shadow-2xl">
                      <div className="relative h-56 overflow-hidden sm:h-64">
                        <img
                          src={`${imagePath}${item.icon}`}
                          alt={item.name}
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://placehold.co/600x400?text=Medcity";
                          }}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                        <div className="absolute left-5 top-5 rounded-2xl bg-white p-1 text-white shadow-xl">
                          <img
                            src={`${imagePath}${item.image}`}
                            alt={item.name}
                            className="h-20 w-20 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <h3 className="text-2xl font-extrabold text-black/90">
                          {item.name}
                        </h3>

                        <div className="mt-3 h-1 w-14 rounded-full bg-primary" />

                        <p className="mt-5 line-clamp-3 text-sm leading-7 text-gray-600">
                          {item.why}
                        </p>

                        <Link
                          to={`/germanPrograms/${item.id}`}
                          className="mt-6 inline-flex w-fit items-center gap-2 rounded-xl border border-primary px-5 py-3 text-sm font-bold text-primary transition hover:bg-primary hover:text-white"
                        >
                          Explore Program
                          <ArrowRight size={17} />
                        </Link>
                      </div>

                      <div className="h-2 bg-darkPrimary" />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default GermanCoursesLayout;