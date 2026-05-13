import { ArrowRight, Play, Quote } from "lucide-react";
import ButtonPrimary from "../components/ButtonPrimary";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const testimonials = [
  {
    name: "Nolan George",
    role: "CEO Fintech Company",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Rayna Aminof",
    role: "Founder, Sisyphus Ventures",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Robert Fox",
    role: "Manager At Amazon",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Sarah Williams",
    role: "Marketing Director",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80",
  },
];

function DotPattern({ className = "" }) {
  return (
    <div className={`grid grid-cols-5 gap-4 ${className}`}>
      {Array.from({ length: 20 }).map((_, index) => (
        <span
          key={index}
          className="h-1.5 w-1.5 rounded-full bg-red-400"
        />
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
  return (
    <section className="relative isolate bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Background decorations */}
      <DotPattern className="absolute left-8 top-10 hidden sm:grid" />

      <DotPattern className="absolute bottom-0 right-10 hidden opacity-80 md:grid" />

     <RingPattern className="-right-20 -top-10 h-[180px] w-[180px] opacity-50" />

<RingPattern className="-bottom-10 -left-20 h-[240px] w-[240px] opacity-60" />

      <div className="relative z-10 mx-auto max-w-7xl">
        
        {/* Heading */}
        <div className="text-center">
          <h1 className="font-ubuntu font-bold text-3xl sm:text-4xl lg:text-5xl text-secondary">
            What people says{" "}
            <span className="text-red-600">about us</span>
          </h1>

          <div className="mx-auto mt-6 h-1.5 w-16 rounded-full bg-red-600" />
        </div>

        {/* Swiper Carousel */}
        <div className="mt-14">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={28}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.name}>
                <article className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden sm:h-80 lg:h-[305px]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Play Button */}
                    <button
                      type="button"
                      className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white text-white transition hover:scale-110 hover:bg-white hover:text-red-600"
                    >
                      <Play className="ml-1 h-8 w-8 fill-current" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex items-center justify-between gap-4 px-6 py-6">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {item.role}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/30">
                      <Quote className="h-6 w-6 fill-current" />
                    </div>
                  </div>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Button */}
        <div className="mt-12 flex justify-center">
          <ButtonPrimary className="w-auto px-6">
            View all
            <ArrowRight className="h-5 w-5" />
          </ButtonPrimary>
        </div>
      </div>
    </section>
  );
}