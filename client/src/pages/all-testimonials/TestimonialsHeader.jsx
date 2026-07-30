import { PiUsersThreeFill } from "react-icons/pi";

export default function TestimonialsHeader() {
  return (
    <header className="text-center">
      <div className="flex justify-center">
        <span className="grid size-20 place-content-center rounded-3xl bg-white shadow-xl ring-1 ring-slate-100">
          <PiUsersThreeFill
            className="text-5xl text-primary"
            aria-hidden="true"
          />
        </span>
      </div>

      <p className="mt-6 text-sm font-black uppercase tracking-[0.3em] text-primary">
        What Our Students Say
      </p>

      <h1
        id="testimonials-heading"
        className="mt-4 font-nunito text-3xl font-black text-secondary sm:text-4xl lg:text-5xl"
      >
        Real Stories From Our{" "}
        <span className="text-primary">
          Students
        </span>
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
        Discover how our students started their
        global education journey with Medcity
        Study Abroad.
      </p>

      <div
        aria-hidden="true"
        className="mx-auto mt-7 h-1.5 w-24 rounded-full bg-primary"
      />
    </header>
  );
}