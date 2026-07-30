export default function TestimonialsLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from(
        { length: 6 },
        (_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-[34px] bg-white p-4 shadow-xl ring-1 ring-slate-100"
          >
            <div className="rounded-[28px] bg-slate-100 p-6 text-center">
              <div className="mx-auto mt-4 size-36 rounded-[32px] bg-slate-200" />

              <div className="mx-auto mt-5 h-5 w-36 rounded bg-slate-200" />

              <div className="mx-auto mt-3 h-4 w-24 rounded bg-slate-200" />

              <div className="mx-auto mt-6 h-20 w-full rounded-xl bg-slate-200" />
            </div>
          </div>
        )
      )}

      <span className="sr-only">
        Loading testimonials
      </span>
    </div>
  );
}