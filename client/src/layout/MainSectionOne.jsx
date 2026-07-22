import {
  FileText,
  GraduationCap,
  Plane,
  Search,
  Star,
} from "lucide-react";

const services = [
  {
    id: "find-universities",
    number: "01",
    title: "Find Universities",
    description:
      "Discover top-ranked universities and leading educational institutions across the world's most popular study abroad destinations.",
    icon: Search,
    iconColor: "text-secondary",
    cardBackground: "bg-secondary/10",
    lineColor: "bg-secondary",
    patternColor: "bg-secondary/10",
  },
  {
    id: "study-abroad-scholarships",
    number: "02",
    title: "Scholarships",
    description:
      "Explore scholarships, grants, and financial aid opportunities available for students planning to study abroad.",
    icon: GraduationCap,
    iconColor: "text-red-600",
    cardBackground: "bg-red-50",
    lineColor: "bg-red-500",
    patternColor: "bg-red-500/10",
  },
  {
    id: "student-visa-guidance",
    number: "03",
    title: "Visa Guidance",
    description:
      "Get expert student visa guidance and documentation support to complete your overseas education application with confidence.",
    icon: FileText,
    iconColor: "text-violet-600",
    cardBackground: "bg-violet-50",
    lineColor: "bg-violet-500",
    patternColor: "bg-violet-500/10",
  },
  {
    id: "pre-departure-support",
    number: "04",
    title: "Pre-Departure",
    description:
      "Prepare for your study abroad journey with expert support for accommodation, travel arrangements, and student life abroad.",
    icon: Plane,
    iconColor: "text-pink-600",
    cardBackground: "bg-pink-50",
    lineColor: "bg-pink-500",
    patternColor: "bg-pink-500/10",
  },
];

export default function MainSectionOne() {
  return (
    <section
      id="study-abroad-services" data-aos="fade-up"
      aria-labelledby="essential-services-title"
      aria-describedby="essential-services-description"
      className="
        relative
        isolate
        overflow-hidden
        bg-white
        px-4
        py-14
        [content-visibility:auto]
        [contain-intrinsic-size:700px]
        sm:px-6
        sm:py-16
        lg:px-8
        lg:py-20
      "
    >
      {/* Main dotted background pattern */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-30
          opacity-[0.42]
          [background-image:radial-gradient(circle,rgba(99,26,51,0.14)_1px,transparent_1px)]
          [background-size:24px_24px]
          [mask-image:linear-gradient(to_bottom,black,transparent_82%)]
        "
      />

      {/* Subtle diagonal line pattern */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          -z-20
          opacity-[0.18]
          [background-image:repeating-linear-gradient(135deg,rgba(192,31,83,0.08)_0,rgba(192,31,83,0.08)_1px,transparent_1px,transparent_24px)]
        "
      />

      {/* Soft gradient shapes */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-32
          top-12
          -z-10
          h-80
          w-80
          rounded-full
          bg-primary/10
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-32
          bottom-0
          -z-10
          h-96
          w-96
          rounded-full
          bg-secondary/10
          blur-3xl
        "
      />

   

      <div className="relative mx-auto max-w-7xl" data-aos="fade-up">
        
        <header className="mx-auto max-w-4xl text-center">
          <p
            className="
              mb-4
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-full
              border
              border-primary/15
              bg-primary/10
              px-4
              py-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.12em]
              text-primary
              shadow-sm
              sm:text-xs
            "
          >
            <Star
              aria-hidden="true"
              size={16}
              strokeWidth={2}
              className="fill-primary hidden sm:block"
            />

            Overseas Education Consultants
          </p>

          <h2
            id="essential-services-title"
            className="
              text-balance
              text-3xl
              font-extrabold
              leading-tight
              tracking-tight
              text-darkPrimary
              sm:text-4xl
              lg:text-5xl
            "
          >
            Complete Study Abroad Support, All in{" "}
            <span className="bg-gradient-to-r
        from-primary
        to-secondary
        bg-clip-text
        text-transparent">
              One Place
            </span>
          </h2>

          <p
            id="essential-services-description"
            className="
              mx-auto
              mt-4
              max-w-3xl
              text-pretty
              text-sm
              leading-7
              text-gray-800
              sm:text-base
              md:text-lg
            "
          >
          Medcity offers end-to-end study abroad guidance, including international university selection, scholarship assistance, student visa support, and pre-departure services for students planning overseas education.
          </p>

          <div
            aria-hidden="true"
            className="
              relative
              mx-auto
              mt-6
              flex
              items-center
              justify-center
              gap-2
            "
          >
            <span className="h-1.5 w-4 rounded-full bg-primary/30" />
            <span className="h-1.5 w-16 rounded-full bg-primary" />
            <span className="h-1.5 w-4 rounded-full bg-primary/30" />
          </div>
        </header>

        <div
          role="list"
          aria-label="Study abroad consulting services"
          className="
            mt-10
            grid
            grid-cols-1
            gap-5
            sm:grid-cols-2
            lg:mt-14
            lg:grid-cols-4
          " data-aos="fade-up"
        >
          {services.map(
            ({
              id,
              number,
              title,
              description,
              icon: Icon,
              iconColor,
              cardBackground,
              lineColor,
              patternColor,
            }) => (
              <article
                key={id}
                id={id}
                role="listitem"
                aria-labelledby={`${id}-title`}
                aria-describedby={`${id}-description`}
                className={`
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  p-6
                  text-center
                  shadow-md
                  transition-[transform,box-shadow]
                  duration-300
                  ease-out
                  hover:-translate-y-2 hover:cursor-pointer transition-all ease-out duration-400
                  hover:shadow-xl
                  motion-reduce:transform-none
                  motion-reduce:transition-none
                  sm:p-7
                  ${cardBackground}
                `}
              >
                {/* Original top-right white circle */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    -right-12
                    -top-12
                    h-32
                    w-32
                    rounded-full
                    bg-white/70
                  "
                />

                {/* Original bottom-left white circle */}
                <div
                  aria-hidden="true"
                  className="
                    absolute
                    -bottom-16
                    -left-16
                    h-36
                    w-36
                    rounded-full
                    bg-white/40
                  "
                />

                {/* New subtle card dot pattern */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    inset-0
                    opacity-50
                    [background-image:radial-gradient(circle,rgba(255,255,255,0.75)_1px,transparent_1px)]
                    [background-size:18px_18px]
                    [mask-image:linear-gradient(to_bottom_right,transparent,black,transparent)]
                  "
                />

                {/* New decorative ring */}
                <div
                  aria-hidden="true"
                  className={`
                    pointer-events-none
                    absolute
                    -bottom-10
                    right-5
                    h-24
                    w-24
                    rounded-full
                    border-[12px]
                    border-white/25
                    ${patternColor}
                  `}
                />

                {/* New curved line pattern */}
                <div
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute
                    -left-5
                    top-1/2
                    h-16
                    w-16
                    -translate-y-1/2
                    rounded-full
                    border
                    border-white/45
                  "
                />

                <span
                  aria-hidden="true"
                  className="
                    absolute
                    right-5
                    top-4
                    z-10
                    text-xl
                    font-black
                    text-darkPrimary/80
                    transition-colors
                    duration-300
                    group-hover:text-primary
                    motion-reduce:transition-none
                  "
                >
                  {number}
                </span>

                <div
                  aria-hidden="true"
                  className={`
                    relative
                    z-10
                    mx-auto
                    mb-6
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-white
                    shadow-sm
                    transition-transform
                    duration-300
                    group-hover:scale-110
                    motion-reduce:transform-none
                    motion-reduce:transition-none
                    ${iconColor}
                  `}
                >
                  <Icon
                    size={30}
                    strokeWidth={2.2}
                  />
                </div>

                <h3
                  id={`${id}-title`}
                  className="
                    relative
                    z-10
                    text-xl
                    font-extrabold
                    text-slate-950
                  "
                >
                  {title}
                </h3>

                <p
                  id={`${id}-description`}
                  className="
                    relative
                    z-10
                    mx-auto
                    mt-3
                    max-w-[245px]
                    text-sm sm:text-base
                    leading-6
                    text-gray-800
                  "
                >
                  {description}
                </p>

                <div
                  aria-hidden="true"
                  className={`
                    relative
                    z-10
                    mx-auto
                    mt-6
                    h-1
                    w-12
                    rounded-full
                    transition-[width]
                    duration-300
                    group-hover:w-20
                    motion-reduce:transition-none
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