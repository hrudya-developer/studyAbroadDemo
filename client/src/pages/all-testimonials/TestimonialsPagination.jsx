import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function TestimonialsPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      aria-label="Testimonials pagination"
      className="mt-14 flex flex-wrap items-center justify-center gap-2"
    >
      <button
        type="button"
        onClick={() =>
          onPageChange(currentPage - 1)
        }
        disabled={currentPage === 1}
        className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft
          className="size-4"
          aria-hidden="true"
        />

        Previous
      </button>

      {Array.from(
        { length: totalPages },
        (_, index) => {
          const page = index + 1;
          const isActive =
            currentPage === page;

          return (
            <button
              key={page}
              type="button"
              onClick={() =>
                onPageChange(page)
              }
              aria-label={`Go to testimonials page ${page}`}
              aria-current={
                isActive
                  ? "page"
                  : undefined
              }
              className={`
                h-11 w-11 rounded-xl
                text-sm font-bold shadow
                transition
                ${
                  isActive
                    ? "bg-primary text-white"
                    : "bg-white text-slate-700 hover:bg-primary hover:text-white"
                }
              `}
            >
              {page}
            </button>
          );
        }
      )}

      <button
        type="button"
        onClick={() =>
          onPageChange(currentPage + 1)
        }
        disabled={
          currentPage === totalPages
        }
        className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-slate-700 shadow transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next

        <ChevronRight
          className="size-4"
          aria-hidden="true"
        />
      </button>
    </nav>
  );
}