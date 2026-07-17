import {
  FileText,
  GraduationCap,
  Plane,
  Search,
  Star,
} from "lucide-react";

const services = [
  {
    number: "01",
    title: "Find Universities",
    description: "Discover top universities worldwide.",
    icon: Search,
    iconColor: "text-secondary",
    cardBackground: "bg-secondary/20",
    lineColor: "bg-secondary",
  },
  {
    number: "02",
    title: "Scholarships",
    description:
      "Find scholarships and financial assistance.",
    icon: GraduationCap,
    iconColor: "text-red-600",
    cardBackground: "bg-red-100",
    lineColor: "bg-red-500",
  },
  {
    number: "03",
    title: "Visa Guidance",
    description:
      "Get expert help with the visa process.",
    icon: FileText,
    iconColor: "text-violet-600",
    cardBackground: "bg-violet-100",
    lineColor: "bg-violet-500",
  },
  {
    number: "04",
    title: "Pre-Departure",
    description:
      "Get ready for your journey abroad.",
    icon: Plane,
    iconColor: "text-pink-600",
    cardBackground: "bg-pink-100",
    lineColor: "bg-pink-500",
  },
];

export default function MainSectionOne() {
  return (
    <section
      aria-labelledby="essential-services-title"
      className="
        relative overflow-hidden bg-white
        px-4 py-14
        [content-visibility:auto]
        [contain-intrinsic-size:700px]
        sm:px-6 sm:py-16
        lg:px-8 lg:py-20
      "
    >
      {/* Decorative elements */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute left-0 top-10
          h-72 w-72 rounded-full
          bg-primary/10 blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute bottom-0 right-0
          h-80 w-80 rounded-full
          bg-rose-200/30 blur-3xl
        "
      />

      <div className="relative mx-auto max-w-7xl" data-aos="fade-up">
        <header className="mx-auto max-w-4xl text-center">
          <p
            className="
              mb-4 inline-flex items-center gap-2
              rounded-full bg-primary/10
              px-4 py-2
              text-sm font-bold uppercase
              text-primary shadow-sm
            "
          >
            <Star
              aria-hidden="true"
              size={16}
              className="fill-primary"
            />

            Your Global Education Partner
          </p>

          <h2
            id="essential-services-title"
            className="
              text-3xl font-bold leading-tight
              text-darkPrimary
              md:text-4xl lg:text-5xl
            "
          >
            Everything You Need, All in{" "}
            <span className="text-primary">One</span>{" "}
            Place
          </h2>

          <p
            className="
              mx-auto mt-4 max-w-2xl
              text-sm leading-7 text-gray-600
              sm:text-base md:text-lg
            "
          >
            From shortlisting to visa guidance, we
            are with you at every step.
          </p>

          <div
            aria-hidden="true"
            className="
              mx-auto mt-5 h-1.5 w-16
              rounded-full bg-primary
            "
          />
        </header>

        <div
          className="
            mt-10 grid grid-cols-1 gap-5
            sm:grid-cols-2
            lg:mt-14 lg:grid-cols-4
          "
        >
          {services.map(
            ({
              number,
              title,
              description,
              icon: Icon,
              iconColor,
              cardBackground,
              lineColor,
            }) => (
              <article
                key={number}
                className={`
                  group relative overflow-hidden
                  rounded-3xl p-6 text-center
                  shadow-md
                  transition-transform duration-300
                  hover:-translate-y-2
                  hover:shadow-xl
                  sm:p-7
                  ${cardBackground}
                `}
              >
                <div
                  aria-hidden="true"
                  className="
                    absolute -right-12 -top-12
                    h-32 w-32 rounded-full
                    bg-white/70
                  "
                />

                <div
                  aria-hidden="true"
                  className="
                    absolute -bottom-16 -left-16
                    h-36 w-36 rounded-full
                    bg-white/40
                  "
                />

                <span
                  aria-hidden="true"
                  className="
                    absolute right-5 top-4 z-10
                    text-xl font-black
                    text-darkPrimary/80
                    transition-colors duration-300
                    group-hover:text-primary
                  "
                >
                  {number}
                </span>

                <div
                  aria-hidden="true"
                  className={`
                    relative z-10 mx-auto mb-6
                    flex h-16 w-16
                    items-center justify-center
                    rounded-full bg-white shadow-sm
                    transition-transform duration-300
                    group-hover:scale-110
                    ${iconColor}
                  `}
                >
                  <Icon size={30} strokeWidth={2.2} />
                </div>

                <h3
                  className="
                    relative z-10
                    text-xl font-extrabold
                    text-slate-950
                  "
                >
                  {title}
                </h3>

                <p
                  className="
                    relative z-10 mx-auto mt-3
                    max-w-[230px]
                    text-sm leading-6 text-gray-600
                  "
                >
                  {description}
                </p>

                <div
                  aria-hidden="true"
                  className={`
                    relative z-10 mx-auto mt-6
                    h-1 w-12 rounded-full
                    ${lineColor}
                  `}
                />
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}