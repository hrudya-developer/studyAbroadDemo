import TestimonialCard from "./TestimonialCard";

export default function TestimonialsGrid({
  testimonials,
  currentPage,
}) {
  return (
    <div
      aria-live="polite"
      className="mt-14 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3"
    >
      {testimonials.map(
        (item, index) => (
          <TestimonialCard
            key={
              item?.id ||
              `${currentPage}-${index}`
            }
            item={item}
          />
        )
      )}
    </div>
  );
}