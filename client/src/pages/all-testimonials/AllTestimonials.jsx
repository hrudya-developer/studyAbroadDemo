import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import axios from "axios";

import bgMap from "../../assets/mapBg.png";

import AllTestimonialsSEO from "./AllTestimonialsSEO";
import TestimonialsGrid from "./TestimonialsGrid";
import TestimonialsHeader from "./TestimonialsHeader";
import TestimonialsLoading from "./TestimonialsLoading";
import TestimonialsMessage from "./TestimonialsMessage";
import TestimonialsPagination from "./TestimonialsPagination";

import {
  API_URL,
  TESTIMONIALS_PER_PAGE,
} from "./testimonialsConfig";
import FAQ from "../../layout/FAQ/FAQ";

export default function AllTestimonials() {
  const [testimonials, setTestimonials] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [currentPage, setCurrentPage] =
    useState(1);

  const sectionRef = useRef(null);

  useEffect(() => {
    const controller =
      new AbortController();

    const fetchTestimonials =
      async () => {
        try {
          const formData =
            new FormData();

          formData.append(
            "api",
            "overseas@Miak2023"
          );

          const response =
            await axios.post(
              API_URL,
              formData,
              {
                signal:
                  controller.signal,
              }
            );

          const data =
            response.data
              ?.testimonial;

          setTestimonials(
            Array.isArray(data)
              ? data
              : []
          );
        } catch (requestError) {
          if (
            requestError?.code ===
            "ERR_CANCELED"
          ) {
            return;
          }

          setError(
            "We could not load the student testimonials."
          );
        } finally {
          if (
            !controller.signal.aborted
          ) {
            setLoading(false);
          }
        }
      };

    fetchTestimonials();

    return () =>
      controller.abort();
  }, []);

  const totalPages = Math.ceil(
    testimonials.length /
      TESTIMONIALS_PER_PAGE
  );

  const currentTestimonials =
    useMemo(() => {
      const start =
        (currentPage - 1) *
        TESTIMONIALS_PER_PAGE;

      return testimonials.slice(
        start,
        start +
          TESTIMONIALS_PER_PAGE
      );
    }, [
      currentPage,
      testimonials,
    ]);

  const handlePageChange = (
    page
  ) => {
    setCurrentPage(page);

    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView(
        {
          behavior: "smooth",
          block: "start",
        }
      );
    });
  };

  return (
    <>
      <AllTestimonialsSEO
        testimonials={testimonials}
      />

      <main>
        <section
          ref={sectionRef}
          aria-labelledby="testimonials-heading"
          className="relative overflow-hidden bg-[#f8fbff] bg-center bg-no-repeat px-4 py-16 sm:px-6 sm:py-20 lg:px-8"
          style={{
            backgroundImage: `url(${bgMap})`,
            backgroundSize: "contain",
          }}
        >
          <div className="pointer-events-none absolute -left-24 top-20 size-72 rounded-full bg-primary/10 blur-3xl" />

          <div className="pointer-events-none absolute -right-24 top-40 size-80 rounded-full bg-secondary/10 blur-3xl" />

          <div className="relative mx-auto max-w-7xl">
            <TestimonialsHeader />

            {loading && (
              <TestimonialsLoading />
            )}

            {!loading && error && (
              <TestimonialsMessage
                title="Testimonials unavailable"
                message={error}
                error
              />
            )}

            {!loading &&
              !error &&
              testimonials.length ===
                0 && (
                <TestimonialsMessage
                  title="No testimonials found"
                  message="New student stories will be available here soon."
                />
              )}

            {!loading &&
              !error &&
              testimonials.length >
                0 && (
                <>
                  <TestimonialsGrid
                    testimonials={
                      currentTestimonials
                    }
                    currentPage={
                      currentPage
                    }
                  />

                  <TestimonialsPagination
                    currentPage={
                      currentPage
                    }
                    totalPages={
                      totalPages
                    }
                    onPageChange={
                      handlePageChange
                    }
                  />
                </>
              )}
          </div>
        </section>
        <FAQ />
      </main>
    </>
  );
}