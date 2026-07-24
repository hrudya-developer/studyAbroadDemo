import {
  Check,
  Globe2,
  Plane,
  Target,
} from "lucide-react";

import { missionPoints } from "../aboutData";
import { Link } from "react-router-dom";

const StorySection = () => {
  return (
    <section className="relative px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div
        className="
          mx-auto grid
          max-w-[1600px]
          gap-6

          lg:grid-cols-[0.9fr_0.65fr_1fr]
        "
      >
        <StoryCard />
        <VisionCard />
        <MissionCard />
        <div>
          <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold">
  <Link
    to="/allUniversities"
    className="text-secondary hover:underline"
  >
    Explore partner universities
  </Link>

  <Link
    to="/courseSearch"
    className="text-primary hover:underline"
  >
    Search international courses
  </Link>

  <Link
    to="/branches"
    className="text-darkPrimary hover:underline"
  >
    Find a Medcity centre
  </Link>
</div>
        </div>
      </div>
    </section>
  );
};

const StoryCard = () => {
  return (
    <article
      aria-labelledby="our-story-heading"
      className="
        rounded-[28px]
        bg-gradient-to-br
        from-white to-[#fff8fb]
        p-6
        sm:p-8
      "
    >
      <p
        className="
          text-[10px] font-extrabold
          uppercase tracking-[0.16em]
          text-primary
        "
      >
        Our Story
      </p>

      <h2
        id="our-story-heading"
        className="
          mt-3 font-nunito
          text-3xl font-black
          leading-tight text-[#10204a]
          sm:text-4xl
        "
      >
        Trusted Guidance for Overseas Education
      </h2>

      <p className="mt-5 text-sm leading-7 text-slate-600">
        Medcity Study Abroad helps students make informed decisions about
        international education. We support students in identifying suitable
        countries, universities and courses based on their academic profile,
        career goals and personal preferences.
      </p>

      <p className="mt-4 text-sm leading-7 text-slate-600">
        Our services cover university applications, admission documentation,
        language preparation, education counselling, student visa assistance
        and pre-departure guidance. At every stage, our goal is to make the
        study-abroad process clear, transparent and student-focused.
      </p>

      <div
        aria-hidden="true"
        className="mt-7 flex items-center gap-3 text-primary"
      >
        <Plane className="h-6 w-6 -rotate-12" />
        <span className="h-px flex-1 border-t border-dashed border-primary/30" />
      </div>
    </article>
  );
};

const VisionCard = () => {
  return (
    <article aria-labelledby="vision-heading">
    <div
      className="
        relative overflow-hidden
        rounded-[28px]
        border border-slate-200/80
        bg-white p-6
        shadow-[0_14px_40px_rgba(15,23,42,0.08)]

        sm:p-8
      "
    >
      <div
        className="
          absolute bottom-0 left-0
          h-28 w-full
          opacity-[0.08]

          [background-image:radial-gradient(#0466AF_1.5px,transparent_1.5px)]
          [background-size:14px_14px]
        "
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <span
            className="
              flex h-11 w-11
              items-center justify-center
              rounded-2xl
              bg-secondary/10
              text-secondary
            "
          >
            <Globe2 className="h-5 w-5" />
          </span>

          <h2 id="vision-heading" className="text-xl font-black text-secondary">
            Our Vision
          </h2>
        </div>

        <p className="mt-6 text-sm leading-7 text-slate-600">
          To become one of India's most trusted global education and career
          guidance organizations by helping students achieve international
          academic excellence and lifelong success.
        </p>
      </div>
    </div>
    </article>
  );
};

const MissionCard = () => {
  return (
    <article aria-labelledby="mission-heading">
    <div
      className="
        rounded-[28px]
        border border-slate-200/80
        bg-white p-6
        shadow-[0_14px_40px_rgba(15,23,42,0.08)]

        sm:p-8
      "
    >
      <div className="flex items-center gap-3">
        <span
          className="
            flex h-11 w-11
            items-center justify-center
            rounded-2xl
            bg-primary/10
            text-primary
          "
        >
          <Target className="h-5 w-5" />
        </span>

        <h2 id="mission-heading" className="text-xl font-black text-primary">
          Our Mission
        </h2>
      </div>

      <div className="mt-6 space-y-4">
        {missionPoints.map((point) => (
          <div key={point} className="flex items-start gap-3">
            <span
              className="
                mt-0.5 flex
                h-5 w-5 shrink-0
                items-center justify-center
                rounded-full
                bg-primary text-white
              "
            >
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>

            <p className="text-sm leading-6 text-slate-600">
              {point}
            </p>
          </div>
        ))}
      </div>
    </div>
    </article>
  );
};

export default StorySection;