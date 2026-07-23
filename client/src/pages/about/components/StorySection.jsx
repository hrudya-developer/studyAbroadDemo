import {
  Check,
  Globe2,
  Plane,
  Target,
} from "lucide-react";

import { missionPoints } from "../aboutData";

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
      </div>
    </section>
  );
};

const StoryCard = () => {
  return (
    <div
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
        className="
          mt-3 font-nunito
          text-3xl font-black
          leading-tight text-[#10204a]

          sm:text-4xl
        "
      >
        Your Trusted Partner for Global Education
      </h2>

      <p className="mt-5 text-sm leading-7 text-slate-600">
        Medcity has been dedicated to helping students build successful
        international careers through quality education guidance and
        personalized support.
      </p>

      <p className="mt-4 text-sm leading-7 text-slate-600">
        From university admissions and language preparation to visa assistance
        and career counselling, we focus on making every student's overseas
        journey simple, transparent and successful.
      </p>

      <div className="mt-7 flex items-center gap-3 text-primary">
        <Plane className="h-6 w-6 -rotate-12" />
        <span className="h-px flex-1 border-t border-dashed border-primary/30" />
      </div>
    </div>
  );
};

const VisionCard = () => {
  return (
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

          <h3 className="text-xl font-black text-secondary">
            Our Vision
          </h3>
        </div>

        <p className="mt-6 text-sm leading-7 text-slate-600">
          To become one of India's most trusted global education and career
          guidance organizations by helping students achieve international
          academic excellence and lifelong success.
        </p>
      </div>
    </div>
  );
};

const MissionCard = () => {
  return (
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

        <h3 className="text-xl font-black text-primary">
          Our Mission
        </h3>
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
  );
};

export default StorySection;