import {
  Globe2,
  GraduationCap,
  Send,
  ShieldCheck,
} from "lucide-react";

import mapBg from "../assets/mapBg.png";
import Tabs from "./Tabs";

const programs = [
  {
    id: "global-education",
    icon: GraduationCap,
    title: "Global Education",
    description:
      "Explore leading universities, internationally recognized courses, and study abroad opportunities that support your academic and career goals.",
    theme: "pink",
  },
  {
    id: "global-exposure",
    icon: Globe2,
    title: "Global Exposure",
    description:
      "Study in an international environment, experience diverse cultures, and develop the global skills employers value.",
    theme: "blue",
  },
  {
    id: "secure-future",
    icon: ShieldCheck,
    title: "Secure Your Future",
    description:
      "Receive professional guidance for university admissions, student visas, documentation, and your international education journey.",
    theme: "pink",
  },
];

const ProgramsSection = () => {
  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="scroll-mt-28"
    >
      <div
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        data-aos="fade-up"
      >
        <div
          className="
            mb-14
            w-full
            bg-contain
            bg-top
            bg-no-repeat
            pb-4
          "
          style={{
            backgroundImage: `url(${mapBg})`,
          }}
        >
          <header className="mx-auto max-w-4xl text-center">
            <p className="flex justify-center pb-8 pt-16">
              <span
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  rounded-full
                  bg-blue-100
                  px-4
                  py-2
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.12em]
                  text-darkPrimary
                "
              >
                <Send
                  aria-hidden="true"
                  className="h-4 w-4 text-darkPrimary"
                />

                Explore Our Programs
              </span>
            </p>

            <h2
              id="programs-heading"
              className="
                font-nunito
                text-3xl
                font-bold
                leading-tight
                text-darkPrimary
                sm:text-4xl
                lg:text-5xl
              "
            >
              Unlock Global Education and{" "}
              <span className="text-primary">
                Study Abroad Opportunities
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-3xl text-lg font-bold text-secondary">
              Your trusted gateway to international education, university
              admissions, student visa assistance, and immigration support.
            </p>

            <p
              className="
                mx-auto
                mt-4
                max-w-3xl
                text-sm
                leading-7
                text-slate-700
                sm:text-base
              "
            >
              Begin your international education journey with professional
              study abroad counselling and personalised support. From choosing
              the right university and course to completing admission and
              student visa procedures, our experts help make the process
              simple, secure, and stress-free.
            </p>
          </header>

      <div
  className="
    mt-16
    grid
    grid-cols-1
    gap-x-5
    gap-y-16
    px-1
    sm:grid-cols-2
    sm:px-4
    md:grid-cols-3
  "
>
  {programs.map((program) => {
    const Icon = program.icon;
    const isPink = program.theme === "pink";

    return (
      <article
        key={program.id}
        aria-labelledby={`${program.id}-title`}
        className={`
          group
          relative
          mx-auto
          min-h-[320px]
          w-full
          max-w-[380px]
          rounded-[28px]
          border
          bg-white
          px-6
          pb-8
          pt-20
          text-center
          shadow-lg
          transition-all
          duration-500
          hover:-translate-y-2
          hover:shadow-2xl

          sm:last:col-span-2
          sm:last:max-w-[380px]
          sm:last:justify-self-center

          md:last:col-span-1
          md:last:max-w-none

          ${
            isPink
              ? "border-primary/20"
              : "border-secondary/20"
          }
        `}
      >
        <div
          aria-hidden="true"
          className={`
            absolute
            left-1/2
            top-0
            z-20
            flex
            h-[72px]
            w-[72px]
            -translate-x-1/2
            -translate-y-1/2
            items-center
            justify-center
            rounded-full
            text-white
            shadow-xl
            transition-transform
            duration-500
            group-hover:scale-110
            ${
              isPink
                ? "bg-gradient-to-br from-primary to-darkPrimary"
                : "bg-gradient-to-br from-secondary to-blue-800"
            }
          `}
        >
          <Icon className="h-9 w-9" strokeWidth={1.8} />
        </div>

        <div
          aria-hidden="true"
          className={`
            absolute
            left-7
            top-8
            grid
            grid-cols-4
            gap-1
            opacity-25
            ${isPink ? "text-primary" : "text-secondary"}
          `}
        >
          {Array.from({ length: 16 }).map((_, index) => (
            <span
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-current"
            />
          ))}
        </div>

        <div
          aria-hidden="true"
          className={`
            absolute
            bottom-8
            right-7
            grid
            grid-cols-4
            gap-1
            opacity-25
            ${isPink ? "text-primary" : "text-secondary"}
          `}
        >
          {Array.from({ length: 16 }).map((_, index) => (
            <span
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-current"
            />
          ))}
        </div>

        <h3
          id={`${program.id}-title`}
          className={`
            relative
            mb-4
            text-xl
            font-extrabold
            ${isPink ? "text-darkPrimary" : "text-secondary"}
          `}
        >
          {program.title}
        </h3>

        <div
          aria-hidden="true"
          className={`
            relative
            mx-auto
            mb-6
            h-1
            w-16
            rounded-full
            ${isPink ? "bg-primary" : "bg-secondary"}
          `}
        />

        <p className="relative mx-auto max-w-[290px] text-sm leading-7 text-slate-800 sm:text-base">
          {program.description}
        </p>
      </article>
    );
  })}
</div>
        </div>

        <div aria-label="Explore international education programs">
          <Tabs />
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;