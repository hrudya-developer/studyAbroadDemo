import { useEffect, useState } from "react";
import axios from "axios";
import fallbackImage from "../assets/avatarFallback.png";
import bg_map from "../assets/mapBg.png";
import { PiUsersThreeFill } from "react-icons/pi";
import { Quote } from "lucide-react";

const AllTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const imageBaseUrl =
    "https://overseas.technocitysolutions.com/public/images/testimonial/";

  const testimonialsPerPage = 6;

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

  const totalPages = Math.ceil(testimonials.length / testimonialsPerPage);
  const startIndex = (currentPage - 1) * testimonialsPerPage;

  const currentTestimonials = testimonials.slice(
    startIndex,
    startIndex + testimonialsPerPage
  );

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [currentPage]);

  if (loading) {
    return (
      <section className="py-20 text-center text-gray-500">
        Loading testimonials...
      </section>
    );
  }

  return (
    <section
      className="relative overflow-hidden bg-[#f8fbff] bg-no-repeat bg-center bg-contain px-4 py-20 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${bg_map})` }}
    >
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 top-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-logoYellow/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <div className="flex justify-center">
            <span className="rounded-3xl bg-white p-5 shadow-xl ring-1 ring-slate-100">
              <PiUsersThreeFill className="text-5xl text-primary" />
            </span>
          </div>

          <p className="mt-6 text-sm font-black uppercase tracking-[0.3em] text-primary">
            What Our Students Say
          </p>

          <h1 className="mt-4 font-nunito text-3xl font-black text-secondary sm:text-4xl lg:text-5xl">
            Real Stories From Our{" "}
            <span className="text-primary">Students</span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600">
            Discover how our students started their global education journey
            with Medcity Study Abroad.
          </p>

          <div className="mx-auto mt-7 h-1.5 w-24 rounded-full bg-primary" />
        </div>

        {testimonials.length === 0 ? (
          <p className="mt-14 text-center text-gray-500">
            No testimonials found.
          </p>
        ) : (
          <>
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {currentTestimonials.map((item, index) => {
                const name = item.name || "Student";
                const role = item.country || "";
                const text = item.text || "";

                const image = item.image
                  ? `${imageBaseUrl}${item.image}`
                  : fallbackImage;

                return (
                 <article
  key={item.id || index}
  className="group relative overflow-hidden rounded-[34px] bg-white p-4 shadow-xl ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
>
  <div className="absolute -right-14 -top-14 h-32 w-32 rounded-full bg-primary/10" />
  <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-secondary/10" />

  <div className="relative rounded-[28px] bg-gradient-to-br from-pink-50 via-white to-blue-50 p-6 text-center">
    <div className="absolute right-5 top-5 grid size-11 place-content-center rounded-2xl bg-primary text-white shadow-lg">
      <Quote size={20} />
    </div>

    <div className="mx-auto mt-4 flex h-36 w-36 items-center justify-center rounded-[32px] bg-white p-2 shadow-xl ring-4 ring-white">
      <img
        src={image}
        alt={name}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = fallbackImage;
        }}
        className="h-full w-full rounded-[26px] object-cover transition duration-500 group-hover:scale-105"
      />
    </div>

    <h3 className="mt-5 break-words text-lg font-black text-darkPrimary">
      {name}
    </h3>

    {role && (
      <p className="mt-1 text-sm font-bold text-primary">
        {role}
      </p>
    )}

    <div className="mx-auto my-5 h-1 w-14 rounded-full bg-primary" />

    {text && (
      <p className="line-clamp-5 text-sm italic leading-7 text-slate-600">
        “{text}”
      </p>
    )}
  </div>
</article>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="rounded-xl bg-white px-5 py-2 text-sm font-bold text-slate-700 shadow disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => {
                  const page = index + 1;

                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`h-11 w-11 rounded-xl text-sm font-bold shadow transition ${
                        currentPage === page
                          ? "bg-primary text-white"
                          : "bg-white text-slate-700 hover:bg-primary hover:text-white"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="rounded-xl bg-white px-5 py-2 text-sm font-bold text-slate-700 shadow disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default AllTestimonials;