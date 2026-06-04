import { ArrowRight, Play, Quote } from "lucide-react";
import ButtonPrimary from "../components/ButtonPrimary";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { useEffect, useState } from "react";
import axios from "axios";

import fallbackImage from "../assets/avatarFallback.png";
import routeImg from "../assets/aeroplanePath.png";

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
    "https://overseas.technocitysolutions.com/public/uploads/testimonial/";

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const formData = new FormData();
        formData.append("api", "overseas@Miak2023");

        const response = await axios.post(
          "https://overseas.technocitysolutions.com/public/api/getTestimonial",
          formData
        );

        const data = response.data?.testimonial || [];
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

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-500">
        Loading testimonials...
      </section>
    );
  }

  return (
    <section
      className="relative isolate mx-auto max-w-7xl overflow-hidden bg-[#fff0f0] px-4 py-20 sm:px-6 lg:px-8"
      data-aos="fade-up"
    >
        <div className="relative z-10 mx-auto max-w-7xl">
      <DotPattern className="absolute left-8 top-10 hidden sm:grid" />
      <DotPattern className="absolute bottom-0 right-10 hidden opacity-80 md:grid" />

      <RingPattern className="-right-20 -top-10 h-[180px] w-[180px] opacity-50" />
      <RingPattern className="-bottom-10 -left-20 h-[240px] w-[240px] opacity-60" />

    
       
        <div className="text-center"> 
         <div className="my-5"><span className="bg-gray-50 text-primary rounded-full text-center p-2 px-4 mx-auto text-sm mb-4">Our Students, Their Success Stories</span></div> 
          <h1 className="font-ubuntu text-3xl font-bold text-secondary sm:text-4xl lg:text-5xl">
            What people say <span className="text-primary">about us</span>
          </h1>

          <div className="mx-auto mt-6 h-1.5 w-16 rounded-full bg-primary" />
        </div>

        {testimonials.length === 0 ? (
          <div className="mt-14 text-center text-gray-500">
            No testimonials found.
          </div>
        ) : (
          <div className="mt-14">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={28}
              loop={testimonials.length > 3}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              breakpoints={{
                0: { slidesPerView: 1 },
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {testimonials.map((item, index) => {
                const name = item.name || "Student";
                const role = item.country || "";
                const text = item.text || "";
const imageBaseUrl =
  "https://overseas.technocitysolutions.com/public/images/testimonial/";
             const image = item.image
  ? `${imageBaseUrl}${item.image}`
  : fallbackImage;

  
  
                return (
                  <SwiperSlide key={item.id || index}>
                    <article className="my-10 h-full overflow-hidden rounded-3xl bg-gray-50 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  
                  <div className="relative overflow-hidden grid place-content-center">
 <img
  src={image}
  alt="test" className="h-[150px] w-[150px] p-2 object-cover transition duration-500 hover:scale-105 mt-10 rounded-full border-2 border-dashed border-primary/20"
  />

  
</div>

                    

                      <div className="px-6 py-6">
                   
                          <div className="flex justify-center">
                            <h3 className="text-lg font-bold text-slate-900 text-center mx-auto">
                              {name}
                            </h3>

                            {role && (
                              <p className="mt-1 text-sm text-gray-500 text-center">
                                {role}
                              </p>
                            )}
                          </div>

                          
                        

                        {text && (
                          <p className="mt-4 text-sm leading-6 text-gray-800 text-center italic">
                            {text.length > 180
                              ? `${text.slice(0, 180)}...`
                              : text}
                          </p>
                        )}
                      </div>
                    </article>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        )}

        
       <div className="mt-12 flex justify-center">
  <Link to="/testimonials">
    <ButtonPrimary className="w-auto px-6">
      View all
      <ArrowRight className="h-5 w-5" />
    </ButtonPrimary>
  </Link>
</div>
        
      </div>
    </section>
  );
}