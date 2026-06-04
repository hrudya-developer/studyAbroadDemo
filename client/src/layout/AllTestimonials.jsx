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

  // Pagination
  const totalPages = Math.ceil(
    testimonials.length / testimonialsPerPage
  );

  const startIndex = (currentPage - 1) * testimonialsPerPage;

  const currentTestimonials = testimonials.slice(
    startIndex,
    startIndex + testimonialsPerPage
  );

  // Scroll to top of section when page changes
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
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 bg-no-repeat" style={{backgroundImage:`url(${bg_map})`}}>
      <div className="text-center">
        <div className="flex justify-center text-4xl p-3">
            <span className="bg-[#eee] p-4 rounded-full shadow-md">
            <PiUsersThreeFill className="text-primary size={20}"/></span></div>
        <p className="text-secondary font-extrabold py-5 text-lg">What Our Students Say</p>
        <h1 className="font-ubuntu text-3xl font-bold text-secondary sm:text-4xl lg:text-5xl">
          All <span className="text-red-600">Testimonials</span>
        </h1>

        <div className="mx-auto mt-6 h-1.5 w-16 rounded-full bg-red-600" />
      </div>

      {testimonials.length === 0 ? (
        <p className="mt-14 text-center text-gray-500">
          No testimonials found.
        </p>
      ) : (
        <>
          {/* Testimonials Grid */}
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
                  className="rounded-3xl bg-[#f5f9fd] p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                    <div className="grid place-content-center text-white bg-primary shadow-md size-12 rounded-xl ms-auto"><Quote /></div>
                    <div className="flex gap-2 flex-col md:flex-row items-center justify-items-start">
                 <span> <img
                    src={image}
                    alt={name}
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = fallbackImage;
                    }}
                    className="mx-auto h-[80px] w-[80px] rounded-full object-cover border-2 border-gray-100"
                  /></span>

                  <h3 className="mt-5 text-md font-bold text-secondary">
                    {name}
                  </h3></div>

                  {role && (
                    <p className="mt-1 text-sm text-gray-500">{role}</p>
                  )}

                  {text && (
                    <p className="mt-4 text-sm italic leading-6 text-gray-800">
                      {text}
                    </p>
                  )}
                </article>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-14 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPage === 1}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              {[...Array(totalPages)].map((_, index) => {
                const page = index + 1;

                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`h-10 w-10 rounded-lg text-sm font-semibold transition-all ${
                      currentPage === page
                        ? "bg-red-600 text-white shadow-md"
                        : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, totalPages)
                  )
                }
                disabled={currentPage === totalPages}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default AllTestimonials;