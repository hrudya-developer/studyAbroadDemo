import {
  ArrowRight,
  Plane,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import studyAbroadStudent from "../images/about-medcity-study-abroad-student.webp";
import {
  highlights,
  heroStats,
} from "../aboutData";

import AboutBreadcrumb from "./AboutBreadcrumb";
import FeatureCard from "./FeatureCard";

const AboutHero = () => {
  return (
    <section
      className="
        relative isolate overflow-hidden
        bg-gradient-to-br
        from-white via-[#fffafd] to-[#f0f7ff]
        px-4 py-8
        sm:px-6 sm:py-10
        lg:px-8 lg:py-12
      "
    >
      <HeroBackground />

      <div
        className="
          relative z-10
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
        absolute inset-0
        -z-10 overflow-hidden
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
          absolute bottom-[-120px] left-[35%]
          h-72 w-72 rounded-full
          bg-logoYellow/[0.08]
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
        flex flex-col
        items-center text-center
        lg:items-start
        lg:text-left
      "
    >
      <AboutBreadcrumb />



      <h1
        className="
          mt-4 max-w-3xl
          font-nunito
          text-3xl font-extrabold
          leading-[1.08]
          tracking-[-0.04em]
          text-darkPrimary
          sm:text-4xl
          lg:text-5xl
          xl:text-[56px]
        "
      >
        About Medcity Study Abroad:{" "}
        <span
          className="
            bg-gradient-to-r
            from-primary
            via-[#d72d62]
            to-secondary
            bg-clip-text
            text-transparent
          "
        >
          Opening Doors to Global Education
        </span>
      </h1>

      <div
        aria-hidden="true"
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
        Medcity Study Abroad is an overseas education consultancy
        helping students pursue higher education and international
        career opportunities. Our counsellors provide personalized
        support for course and university selection, applications,
        language preparation, student visas and pre-departure
        planning.
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
          mt-6 flex w-full
          flex-col items-center
          gap-3
          sm:w-auto
          sm:flex-row
          lg:items-start
        "
      >
        <Link
          to="/destinationList"
          className="
            group inline-flex
            min-h-[46px] w-full
            items-center justify-center
            gap-2 rounded-xl
            bg-primary
            px-5 py-2.5
            text-sm font-extrabold
            text-white
            shadow-[0_12px_26px_rgba(192,31,83,0.22)]
            transition-all duration-300
            hover:-translate-y-0.5
            hover:bg-darkPrimary
            hover:shadow-[0_16px_30px_rgba(99,26,51,0.25)]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
            focus-visible:ring-offset-2
            sm:w-auto
          "
        >
          Explore Destinations

          <ArrowRight
            className="
              h-4 w-4
              transition-transform duration-300
              group-hover:translate-x-1
            "
          />
        </Link>

        <Link
          to="/contact"
          className="
            group inline-flex
            min-h-[46px] w-full
            items-center justify-center
            gap-2 rounded-xl
            border border-primary/30
            bg-white/90
            px-5 py-2.5
            text-sm font-extrabold
            text-primary
            shadow-sm
            transition-all duration-300
            hover:-translate-y-0.5
            hover:border-primary
            hover:bg-primary
            hover:text-white
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-primary
            focus-visible:ring-offset-2
            sm:w-auto
          "
        >
          Contact Us

          <ArrowRight
            className="
              h-4 w-4
              transition-transform duration-300
              group-hover:translate-x-1
            "
          />
        </Link>
      </div>
    </div>
  );
};

const HeroVisual = () => {
  const visibleStats = heroStats.slice(0, 2);

  return (
    <div
      className="
        relative mx-auto
        w-full max-w-[430px]
        sm:max-w-[480px]
        lg:max-w-[520px]
      "
    >
      {/* Decorative background shape */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -inset-5
          hidden rounded-[42px]
          bg-gradient-to-br
          from-primary/[0.08]
          via-white
          to-secondary/[0.1]
          sm:block
        "
      />

      {/* Decorative dotted pattern */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -right-7 -top-7
          hidden h-28 w-28
          opacity-30
          sm:block
          [background-image:radial-gradient(#0466AF_1.5px,transparent_1.5px)]
          [background-size:12px_12px]
        "
      />

      {/* Decorative circle */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute -bottom-8 -left-8
          hidden h-32 w-32
          rounded-full
          border-[18px] border-primary/[0.07]
          sm:block
        "
      />

      {/* Main visual card */}
      <div
        className="
          group relative
          overflow-hidden
          rounded-[28px]
          border-[6px] border-white
          bg-white
          shadow-[0_30px_80px_rgba(15,23,42,0.18)]
          sm:rounded-[36px]
        "
      >
        <div
          className="
            relative
            h-[350px]
            overflow-hidden
            sm:h-[430px]
            lg:h-[480px]
          "
        >
          <img
            src={studyAbroadStudent}
            alt="Student representing Medcity Study Abroad and international education"
            width={520}
            height={480}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="
              h-full w-full
              object-cover object-center
              transition-transform
              duration-700 ease-out
              group-hover:scale-[1.035]
            "
          />

          {/* Readability overlay */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute inset-0
              bg-gradient-to-t
              from-[#10204a]/75
              via-[#10204a]/5
              to-transparent
            "
          />

          {/* Image content */}
          <div
            className="
              absolute inset-x-0 bottom-0
              p-5
              sm:p-6
            "
          >
            <div
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-white/30
                bg-white/15
                px-3 py-1.5
                text-[10px] font-bold
                uppercase tracking-[0.14em]
                text-white
                backdrop-blur-md
              "
            >
              <Sparkles className="h-3.5 w-3.5 text-logoYellow" />
              Your global journey starts here
            </div>

            <h2
              className="
                mt-3 max-w-sm
                font-nunito
                text-xl font-extrabold
                leading-tight text-white
                sm:text-2xl
              "
            >
              Discover education opportunities beyond borders
            </h2>
          </div>
        </div>
      </div>

    </div>
      
  );
};

export default AboutHero;