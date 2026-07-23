import { ArrowRight } from "lucide-react";
import ButtonPrimary from "../components/ButtonPrimary";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useEffect, useState } from "react";
import axios from "axios";

import fallbackImage from "../assets/avatarFallback.png";

function DotPattern({ className = "" }) {
  return (
    <div className={`grid grid-cols-5 gap-4 ${className}`}>
      {Array.from({ length: 20 }).map((_, index) => (
        <span key={index} className="h-1.5 w-1.5 rounded-full bg-red-400" />
      ))}
    </div>
  );
}

function RingPattern({ className = "" }) {
  return (
    <div
      className={`pointer-events-none absolute rounded-full border-[18px] border-red-200/60 ${className}`}
    >
      <div className="absolute inset-6 rounded-full border-[18px] border-red-300/40" />
    </div>
  );
}

export default function Testimonial() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const imageBaseUrl =
    "https://overseas.technocitysolutions.com/public/images/testimonial/";

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const formData = new FormData();
        formData.append("api", "overseas@Miak2023");

        const response = await axios.post(
          "https://overseas.technocitysolutions.com/public/api/getTestimonial",
          formData
        );

        const data = response.data?.testimonial;

        setTestimonials(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section
      className="relative isolate mx-auto max-w-9xl overflow-hidden bg-[#fff0f0] px-4 py-20 sm:px-6 lg:px-8"
      data-aos="fade-up"
    >
      <div className="relative z-10 mx-auto max-w-9xl">
        <DotPattern className="absolute left-8 top-10 hidden sm:grid" />
        <DotPattern className="absolute bottom-0 right-10 hidden opacity-80 md:grid" />

        <RingPattern className="-right-20 -top-10 h-[180px] w-[180px] opacity-50" />
        <RingPattern className="-bottom-10 -left-20 h-[240px] w-[240px] opacity-60" />

        <div className="text-center">
          <div className="my-5">
            <span className="mx-auto rounded-full bg-gray-100 px-4 py-2 text-center text-xs font-semibold text-primary">
              Our Students, Their Success Stories
            </span>
          </div>

          <h1 className="font-nunito text-3xl font-bold text-darkPrimary sm:text-4xl lg:text-5xl">
            What people say <span className="bg-gradient-to-r
        from-primary
        to-secondary
        bg-clip-text
        text-transparent">about us</span>
          </h1>

          <div className="mx-auto mt-6 h-1.5 w-16 rounded-full bg-primary" />
        </div>

        {loading ? (
          <div className="mt-14 text-center text-gray-500">
            Loading testimonials...
          </div>
        ) : testimonials.length === 0 ? (
          <div className="mt-14 text-center text-gray-500">
            No testimonials found.
          </div>
        ) : (
          <div className="mt-14">
            <Swiper
              key={testimonials.length}
              modules={[Autoplay]}
              spaceBetween={28}
              loop={testimonials.length > 3}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              observer={true}
              observeParents={true}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {testimonials.map((item, index) => {
                const name = item.name || "Student";
                const role = item.country || "";
                const text = item.text || item.description || "";
                const image = item.image
                  ? `${imageBaseUrl}${item.image}`
                  : fallbackImage;

                return (
<SwiperSlide key={item.id || index} className="h-auto py-10">
  <article className="group relative mx-auto flex h-[540px] w-full max-w-[390px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.16)] transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_28px_65px_rgba(4,102,175,0.24)]">
    {/* Blue header */}
    <div className="relative h-[185px] overflow-hidden">
      {/* Soft gradient */}
      <div className="absolute inset-0 bg-darkPrimary" />

      {/* Dot pattern */}
      <div
        className="absolute inset-y-0 right-0 w-[58%] opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.9) 1.4px, transparent 1.4px)",
          backgroundSize: "12px 12px",
        }}
      />

      {/* Header title */}
      <div className="relative z-10 flex h-full flex-col items-center pt-7 text-center text-white">
       

   
      </div>
    </div>

    {/* Profile image overlapping header */}
    <div className="absolute left-1/2 top-[25px] z-20 -translate-x-1/2">
      <div className="relative rounded-xl bg-white p-[7px] shadow-xl">
        <div className="absolute -inset-2 rounded-xl border-2 border-dashed border-primary/30 transition-transform duration-700 group-hover:rotate-180" />

        <img
          src={image}
          alt={name}
          onError={(e) => {
            e.currentTarget.src = fallbackImage;
          }}
          className="relative h-[205px] w-[205px] sm:w-[225px] sm:h-[225px] rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    </div>

    {/* Small side blue tabs */}
    <div className="absolute left-0 top-[290px] h-8 w-3 rounded-r-md bg-primary/20" />
    <div className="absolute right-0 top-[290px] h-8 w-3 rounded-l-md bg-primary/20" />

    {/* Testimonial content */}
    <div className="relative z-10 flex flex-1 flex-col items-center px-10 pb-9 pt-[112px] text-center">
      {/* Quote decoration */}
      <div className="mb-2 text-[48px] font-black leading-none text-primary/20">
        “
      </div>

      {text && (
        <p className="line-clamp-5 text-[13px] italic leading-6 text-slate-600">
          {text.length > 220 ? `${text.slice(0, 220)}...` : text}
        </p>
      )}

      <div className="mt-auto">
        <h4 className="text-[17px] font-extrabold uppercase tracking-wide text-slate-900 mt-5">
          {name}
        </h4>

        {role && (
          <p className="mt-1 text-[11px] font-medium uppercase tracking-widest text-slate-500">
            {role}
          </p>
        )}

        <div className="mt-3 flex justify-center gap-1 text-[16px] text-yellow-400">
          {[...Array(5)].map((_, starIndex) => (
            <span key={starIndex}>★</span>
          ))}
        </div>
      </div>
    </div>

    {/* Bottom-left curved decoration */}
    <div className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full border-[14px] border-primary/20" />

    {/* Bottom-right curved decoration */}
    <div className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 rounded-full border-[14px] border-primary/20" />

    {/* Bottom center line */}
    <div className="absolute bottom-0 left-1/2 h-1 w-24 -translate-x-1/2 rounded-t-full bg-darkPrimary" />
  </article>
</SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}

        <div className="mt-4 flex justify-center">
          <Link to="/testimonials">
            <ButtonPrimary className="w-auto px-6 bg-primary">
              View all
              <ArrowRight className="h-5 w-5" />
            </ButtonPrimary>
          </Link>
        </div>
      </div>
    </section>
  );
}