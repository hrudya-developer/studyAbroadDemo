import {
  ArrowRight,
  Plane,
  Sparkles,
} from "lucide-react";

import aboutStudent from "../images/aboutStudent.webp";
import {
  highlights,
  heroStats,
} from "../aboutData";
import FeatureCard from "./FeatureCard";

const AboutHero = () => {
  return (
    <section
      className="
        bg-gradient-to-br
        from-white via-[#fffafd] to-[#f0f7ff]
        px-4 py-8
        sm:px-6 sm:py-10
        lg:px-8 lg:py-12
      "
    >
      <div
        className="
          mx-auto grid w-full
          max-w-[1500px]
          items-center gap-10
          lg:min-h-[500px]
          lg:grid-cols-[1fr_0.9fr]
          lg:gap-12
          xl:gap-16
        "
      >
        <HeroContent />
        <HeroVisual />
      </div>
    </section>
  );
};

const HeroBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute inset-0 -z-10
        overflow-hidden
      "
    >
      <div
        className="
          absolute -left-20 top-10
          h-56 w-56 rounded-full
          bg-primary/[0.06]
          blur-3xl
        "
      />

      <div
        className="
          absolute -right-20 -top-20
          h-80 w-80 rounded-full
          bg-secondary/[0.08]
          blur-3xl
        "
      />

      <div
        className="
          absolute left-5 top-10
          hidden h-24 w-24
          opacity-[0.1]
          lg:block
          [background-image:radial-gradient(#c01f53_1.6px,transparent_1.6px)]
          [background-size:14px_14px]
        "
      />

      <div
        className="
          absolute bottom-5 right-5
          hidden h-28 w-28
          opacity-[0.08]
          lg:block
          [background-image:radial-gradient(#0466AF_1.6px,transparent_1.6px)]
          [background-size:15px_15px]
        "
      />
    </div>
  );
};

const HeroContent = () => {
  return (
    <div
      className="
        relative z-10
        flex flex-col
        items-center text-center
        lg:items-start
        lg:text-left
      "
    >
      <div
        className="
          inline-flex items-center gap-2
          rounded-full
          border border-primary/15
          bg-white/85
          px-3 py-1.5
          text-[10px] font-extrabold
          uppercase tracking-[0.15em]
          text-primary
          shadow-sm
          backdrop-blur-md
          sm:text-[11px]
        "
      >
        <Sparkles className="h-3.5 w-3.5" />
        About Us
      </div>

      <h1
        className="
          mt-4 max-w-3xl
          font-nunito
          font-extrabold
          leading-[1.06]
          tracking-[-0.04em]
          text-darkPrimary
          text-3xl sm:text-4xl lg:text-5xl
        "
      >
        Opening Doors to{" "}
        <span
          className="
            bg-gradient-to-r
            from-primary via-[#d72d62] to-secondary
            bg-clip-text text-transparent
          "
        >
          Global Opportunities
        </span>
      </h1>

      <div
        className="
          mt-4 flex items-center
          justify-center gap-2
          lg:justify-start
        "
      >
        <span className="h-1.5 w-12 rounded-full bg-logoYellow" />
        <span className="h-1.5 w-5 rounded-full bg-primary" />
        <span className="h-1.5 w-2 rounded-full bg-primary/30" />
      </div>

      <p
        className="
          mt-4 max-w-2xl
          text-sm leading-6
          text-slate-600
          sm:text-[15px]
          sm:leading-7
          lg:text-base
        "
      >
        Medcity Study Abroad is your trusted partner in achieving
        international education and career aspirations. We provide expert
        guidance, end-to-end support and world-class opportunities to help
        students succeed globally.
      </p>

      <div
        className="
          mt-5 grid w-full
          max-w-2xl grid-cols-2
          gap-2.5
          sm:grid-cols-4
        "
      >
        {highlights.map((item) => (
          <FeatureCard
            key={item.title}
            icon={item.icon}
            title={item.title}
          />
        ))}
      </div>

      <div
        className="
          mt-5 flex w-full
          flex-col items-center
          gap-2.5
          sm:w-auto sm:flex-row
          lg:items-start
        "
      >
        <a
          href="/destinationList"
          className="
            group inline-flex
            min-h-[46px] w-full
            items-center justify-center
            gap-2 rounded-xl
            bg-primary px-5 py-2.5
            text-sm font-extrabold
            text-white
            shadow-[0_12px_26px_rgba(192,31,83,0.22)]
            transition-all duration-300
            hover:-translate-y-0.5
            hover:bg-darkPrimary
            sm:w-auto
          "
        >
          Explore Destinations

          <ArrowRight
            className="
              h-4 w-4
              transition-transform
              group-hover:translate-x-1
            "
          />
        </a>

        <a
          href="#counselling"
          className="
            group inline-flex
            min-h-[46px] w-full
            items-center justify-center
            gap-2 rounded-xl
            border border-primary/30
            bg-white/90 px-5 py-2.5
            text-sm font-extrabold
            text-primary
            transition-all duration-300
            hover:-translate-y-0.5
            hover:border-primary
            hover:bg-primary
            hover:text-white
            sm:w-auto
          "
        >
          Book Free Counselling

          <ArrowRight
            className="
              h-4 w-4
              transition-transform
              group-hover:translate-x-1
            "
          />
        </a>
      </div>
    </div>
  );
};

const HeroVisual = () => {
  return (
    <div
      className="
        relative mx-auto
        w-full max-w-[560px]
        pb-32
        sm:pb-20
        lg:max-w-[620px]
      "
    >
      {/* Main image only */}
      <div
        className="
          relative
          h-[360px] w-full
          overflow-hidden
          rounded-[28px]
        
          sm:h-[430px]
          lg:h-[500px]
        "
      >
        <img
          src={aboutStudent}
          alt="Student preparing to study abroad"
          className="
            h-full w-full
            object-cover object-center
            transition-transform duration-700
            hover:scale-[1.025]
          "
        />
      </div>

      {/* Global reach floating card */}
      <div
        className="
          absolute -left-2 top-[42%] z-20
          hidden items-center gap-3
          rounded-2xl
          border border-slate-200/80
          bg-white
          px-4 py-3
          shadow-[0_16px_38px_rgba(15,23,42,0.14)]
          sm:flex
          lg:-left-6
        "
      >
        <span
          className="
            flex h-11 w-11 shrink-0
            items-center justify-center
            rounded-xl
            bg-secondary/10
            text-secondary
          "
        >
          <Plane className="h-5 w-5 -rotate-12" />
        </span>

        <div>
          <p className="text-[10px] font-semibold text-slate-500">
            Global Reach
          </p>

          <p className="text-sm font-extrabold text-[#10204a]">
            25+ Countries
          </p>
        </div>
      </div>

      {/* Statistic floating cards */}
      <div
        className="
          absolute -bottom-2 right-3 z-30
          grid w-[calc(100%-1.5rem)]
          grid-cols-1 gap-2.5
          sm:bottom-5 sm:right-[-10px]
          sm:w-[215px]
          lg:right-[-24px]
        "
      >
        {heroStats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.label}
              className={`
                group flex items-center gap-3
                rounded-2xl
                border border-slate-200/80
                bg-white
                px-3.5 py-3
                shadow-[0_14px_34px_rgba(15,23,42,0.14)]
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_20px_42px_rgba(15,23,42,0.18)]
                ${
                  index === 0
                    ? "sm:-translate-x-4"
                    : index === 2
                      ? "sm:-translate-x-8"
                      : ""
                }
              `}
            >
              <span
                className={`
                  flex h-10 w-10 shrink-0
                  items-center justify-center
                  rounded-xl
                  transition-transform duration-300
                  group-hover:scale-105
                  ${item.background}
                  ${item.color}
                `}
              >
                <Icon
                  className="h-5 w-5"
                  strokeWidth={2.2}
                />
              </span>

              <div>
                <p className="text-sm font-black text-[#10204a]">
                  {item.value}
                </p>

                <p className="mt-0.5 text-[9px] leading-4 text-slate-500">
                  {item.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AboutHero;