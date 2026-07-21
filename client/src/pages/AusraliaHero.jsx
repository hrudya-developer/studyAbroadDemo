import {
  ArrowRight,
  Plane,
  Sparkles,
} from "lucide-react";

import australiaHero from "../assets/australiaHero.webp";

const highlights = [
  "High quality of life",
  "Career opportunities",
  "Permanent residency",
];

const AustraliaHero = () => {
  return (
    <section
      className="
        relative isolate
        -mt-px
        overflow-hidden
        border-0
        bg-gradient-to-br
        from-[#fff7f8]
        via-white
        to-[#edf7ff]
      "
    >
      {/* Background image: large screens only */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-0
          hidden
          bg-no-repeat

          lg:block
          lg:bg-[length:auto_100%]
          lg:bg-[position:right_center]

          xl:bg-[length:auto_105%]
          xl:bg-[position:right_center]

          2xl:bg-[length:auto_110%]
          2xl:bg-[position:right_center]
        "
        style={{
          backgroundImage: `url(${australiaHero})`,
        }}
      />

      {/* Desktop text readability overlay */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-[1]
          hidden

          lg:block
          lg:bg-gradient-to-r
          lg:from-white
          lg:from-0%
          lg:via-white/95
          lg:via-[42%]
          lg:to-white/5
          lg:to-[69%]

          xl:via-[39%]
          xl:to-transparent
          xl:to-[66%]
        "
      />

      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute inset-0 z-[2]
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            -left-24 -top-24
            h-52 w-52
            rounded-full
            bg-primary/10
            blur-3xl

            sm:h-64 sm:w-64
          "
        />

        <div
          className="
            absolute
            -bottom-24 left-1/3
            h-56 w-56
            rounded-full
            bg-secondary/10
            blur-3xl

            lg:left-[38%]
          "
        />

        <div
          className="
            absolute inset-0
            opacity-[0.025]
            [background-image:radial-gradient(#631A33_1px,transparent_1px)]
            [background-size:22px_22px]
          "
        />
      </div>

      {/* Main hero content */}
      <div
        className="
          relative z-10
          mx-auto flex
          w-full max-w-7xl
          items-center justify-center

          px-5 py-9

          sm:px-8
          sm:py-10

          md:px-10
          md:py-11

          lg:min-h-[430px]
          lg:justify-start
          lg:px-10
          lg:py-10

          xl:min-h-[450px]
          xl:px-6

          2xl:max-w-[1400px]
        "
      >
        <div
          className="
            w-full
            max-w-[640px]
            text-center

            lg:w-[50%]
            lg:max-w-[590px]
            lg:text-left

            xl:w-[48%]
          "
        >
          {/* Badge */}
          <div
            className="
              mx-auto inline-flex
              items-center justify-center
              gap-2
              rounded-full
              border border-primary/15
              bg-white/90
              px-3.5 py-2
              shadow-[0_8px_24px_rgba(99,26,51,0.10)]
              backdrop-blur-md

              lg:mx-0
            "
          >
            <Sparkles
              size={13}
              aria-hidden="true"
              className="shrink-0 text-primary"
            />

            <span
              className="
                text-[10px]
                font-bold uppercase
                tracking-[0.15em]
                text-darkPrimary

                sm:text-xs
              "
            >
              Live. Work. Thrive.
            </span>
          </div>

          {/* Heading */}
          <h1
            className="
              mt-4
              font-bold
              leading-[1.04]
              tracking-[-0.04em]
              text-slate-950

              sm:mt-5
              lg:mt-5
            "
          >
            <span
              className="
                block
                text-3xl
                text-black/90

                sm:text-4xl
                md:text-[2.75rem]
                lg:text-[2.65rem]
                xl:text-5xl
              "
            >
              Why Migrate to
            </span>

            <span
              className="
                mt-1 block
                text-3xl
                tracking-[-0.05em]
                text-primary

                sm:text-4xl
                md:text-[2.75rem]
                lg:text-[2.65rem]
                xl:text-5xl
              "
            >
              Australia?
            </span>
          </h1>

          {/* Description */}
          <p
            className="
              mx-auto mt-4
              max-w-[580px]
              text-sm
              font-medium
              leading-6
              text-slate-600

              sm:text-base
              sm:leading-7

              lg:mx-0
              lg:mt-5
              lg:max-w-[540px]
            "
          >
            Australia offers an exceptional quality of life,
            world-class healthcare and education, cultural
            diversity, a stable economy, and excellent
            opportunities for personal and professional growth.
          </p>

          {/* Highlights */}
          <div
            className="
              mt-4 flex
              flex-wrap
              items-center justify-center
              gap-2

              sm:mt-5
              lg:justify-start
            "
          >
            {highlights.map((item) => (
              <span
                key={item}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-full
                  border border-darkPrimary/10
                  bg-white/85
                  px-2.5 py-1.5
                  text-[10px]
                  font-semibold
                  text-slate-700
                  shadow-sm
                  backdrop-blur-md

                  sm:px-3
                  sm:text-xs
                "
              >
                <Sparkles
                  size={12}
                  aria-hidden="true"
                  className="shrink-0 text-primary"
                />

                {item}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div
            className="
              mx-auto mt-5
              flex w-full
              max-w-[430px]
              flex-col
              gap-3

              sm:mt-6
              sm:max-w-none
              sm:flex-row
              sm:items-center
              sm:justify-center

              lg:mx-0
              lg:justify-start
            "
          >
            <a
              href="#immigration-pathway"
              className="
                group inline-flex
                min-h-11 w-full
                items-center justify-center
                gap-2
                rounded-xl
                bg-primary
                px-5 py-2.5
                text-sm
                font-bold
                text-white
                shadow-[0_14px_30px_rgba(192,31,83,0.25)]
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:shadow-[0_18px_38px_rgba(192,31,83,0.35)]

                focus-visible:outline-none
                focus-visible:ring-4
                focus-visible:ring-primary/20

                sm:w-auto
                sm:px-6
              "
            >
              Explore Australia

              <Plane
                size={16}
                aria-hidden="true"
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </a>

            <a
              href="#post-migration-support"
              className="
                group inline-flex
                min-h-11 w-full
                items-center justify-center
                gap-2
                rounded-xl
                border border-darkPrimary
                bg-white/90
                px-5 py-2.5
                text-sm
                font-bold
                text-darkPrimary
                shadow-[0_8px_22px_rgba(15,23,42,0.07)]
                backdrop-blur-md
                transition-all
                duration-300

                hover:-translate-y-0.5
                hover:border-primary/30
                hover:bg-white

                focus-visible:outline-none
                focus-visible:ring-4
                focus-visible:ring-darkPrimary/10

                sm:w-auto
                sm:px-6
              "
            >
              Read More

              <ArrowRight
                size={16}
                aria-hidden="true"
                className="
                  text-primary
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AustraliaHero;