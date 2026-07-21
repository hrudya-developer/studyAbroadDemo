import {
  BadgeCheck,
  CircleDollarSign,
  FileCheck2,
  FileText,
  Hourglass,
  Languages,
  Laptop2,
  Mail,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const prSteps = [
  {
    number: "01",
    title: "Eligibility",
    description:
      "Check if you qualify for Express Entry or PNP programs.",
    icon: UserCheck,
  },
  {
    number: "02",
    title: "Documents",
    description:
      "Gather ID, education, funds, language test, and work experience documents.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Language Test",
    description:
      "Take IELTS, CELPIP, or TEF based on language preference.",
    icon: Languages,
  },
  {
    number: "04",
    title: "Create Profile",
    description:
      "Submit an online profile to receive your CRS score in the system.",
    icon: Laptop2,
  },
  {
    number: "05",
    title: "Receive ITA",
    description:
      "Join the Express Entry pool and wait for your Invitation to Apply.",
    icon: Mail,
  },
  {
    number: "06",
    title: "Application",
    description:
      "Upload documents and submit your PR application through the IRCC portal.",
    icon: FileCheck2,
  },
  {
    number: "07",
    title: "Fees",
    description:
      "Pay application charges and the Right of Permanent Residence fee.",
    icon: CircleDollarSign,
  },
  {
    number: "08",
    title: "Medical & Security Checks",
    description:
      "Complete medical tests and submit police clearance for verification.",
    icon: ShieldCheck,
  },
  {
    number: "09",
    title: "Await Decision",
    description:
      "Wait for the final decision on your permanent residence application.",
    icon: Hourglass,
  },
];

const CanadaPRSteps = () => {
  return (
    <section
      id="canada-pr-steps"
      className="
        relative overflow-hidden scroll-mt-24
        bg-gradient-to-b from-white via-[#fffafb] to-white
        py-10 sm:py-10 lg:py-10
      " data-aos="fade-up">
      {/* Decorative background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="
            absolute -left-24 top-10
            h-64 w-64 rounded-full
            bg-primary/5 blur-3xl
          "
        />

        <div
          className="
            absolute -right-24 bottom-0
            h-72 w-72 rounded-full
            bg-secondary/5 blur-3xl
          "
        />

        <div
          className="
            absolute inset-0 opacity-[0.025]
            [background-image:radial-gradient(#631A33_1px,transparent_1px)]
            [background-size:24px_24px]
          "
        />
      </div>

      <div
        className="
          relative z-10 mx-auto
          w-full max-w-7xl
          px-4 sm:px-6 lg:px-8
        "
      >
        {/* Section heading */}
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
          <div
            className="
              mb-4 flex items-center justify-center
              gap-3 sm:gap-5
            "
          >
            <span
              className="
                hidden h-px w-14
                bg-gradient-to-r
                from-transparent to-primary/40
                sm:block lg:w-24
              "
            />

            <span className="h-2 w-2 rounded-full bg-primary" />

            <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />

            <span
              className="
                hidden h-px w-14
                bg-gradient-to-l
                from-transparent to-primary/40
                sm:block lg:w-24
              "
            />
          </div>

          <h2
            className="
              text-2xl font-bold
              tracking-[-0.03em] text-darkPrimary
              sm:text-3xl
              md:text-4xl
              lg:text-[42px]
            "
          >
            Steps involved in{" "}
            <span className="text-primary">Canada PR</span>
          </h2>

          <p
            className="
              mx-auto mt-4
              max-w-2xl
              text-sm leading-6
              text-slate-600
              sm:text-base sm:leading-7
            "
          >
            Follow these essential stages to complete your Canadian permanent
            residence journey.
          </p>
        </div>

        {/* Steps grid */}
        <div
          className="
            grid grid-cols-1
            gap-4
            sm:grid-cols-2
            lg:grid-cols-3
            lg:gap-5
          "
        >
          {prSteps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.number}
                className="
                  group relative
                  min-h-[190px]
                  overflow-hidden
                  rounded-2xl
                  border border-slate-200/90
                  bg-white/90
                  p-5
                  shadow-[0_10px_30px_rgba(15,23,42,0.06)]
                  backdrop-blur-sm
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:border-primary/20
                  hover:shadow-[0_18px_45px_rgba(99,26,51,0.12)]
                  sm:min-h-[205px]
                  sm:p-6
                  lg:min-h-[210px]
                "
              >
                {/* Decorative top accent */}
                <div
                  className="
                    absolute inset-x-0 top-0
                    h-1
                    origin-left scale-x-0
                    bg-gradient-to-r
                    from-darkPrimary to-primary
                    transition-transform duration-300
                    group-hover:scale-x-100
                  "
                />

                <div className="flex h-full items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    {/* Step number and title */}
                    <div className="flex items-center gap-3">
                      <span
                        className="
                          inline-flex h-10 w-10
                          shrink-0 items-center justify-center
                          rounded-lg
                          bg-gradient-to-br
                          from-darkPrimary to-primary
                          px-3
                          text-sm font-semibold
                          text-white
                          shadow-[0_8px_20px_rgba(192,31,83,0.25)]
                          sm:h-11 sm:min-w-14
                          sm:text-base
                        "
                      >
                        {step.number}
                      </span>

                      <h3
                        className="
                          text-base font-semibold
                          leading-5 text-slate-950
                          sm:text-lg
                        "
                      >
                        {step.title}
                      </h3>
                    </div>

                    <p
                      className="
                        mt-4
                        text-sm font-medium
                        leading-6 text-slate-700
                        sm:text-[15px]
                        sm:leading-6
                      "
                    >
                      {step.description}
                    </p>
                  </div>

                  {/* Icon */}
                {/* Icon */}
<div
  className="
    flex h-12 w-12
    shrink-0 items-center justify-center
    rounded-full
    bg-primary/[0.08]
    p-2
    text-primary
    shadow-sm
    transition-all duration-300
    group-hover:scale-105
    group-hover:border-primary/20
    group-hover:bg-primary
    group-hover:text-white
    sm:h-11 sm:w-11
    sm:p-2
  "
>
  <Icon
    size={22}
    strokeWidth={1.9}
    aria-hidden="true"
  />
</div>
                  </div>
                

                {/* Background step number */}
                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none
                    absolute -bottom-5 right-3
                    text-7xl font-black
                    text-primary/8
                    transition-colors duration-300
                    group-hover:text-primary/[0.05]
                  "
                >
                  {step.number}
                </span>
              </article>
            );
          })}
        </div>

        {/* Completion message */}
        <div
          className="
            ms-auto mt-1
            flex max-w-2xl
            items-center justify-center
            gap-2 rounded-full
            border border-primary/10
            bg-primary/[0.04]
            px-4 py-3
            text-center
            text-xs font-semibold
            text-darkPrimary
            sm:mt-10
            sm:w-fit
            sm:px-6
            sm:text-sm
          "
        >
          <BadgeCheck
            size={18}
            aria-hidden="true"
            className="shrink-0 text-primary"
          />

          Complete every stage carefully for a smooth Canada PR process.
        </div>
      </div>
    </section>
  );
};

export default CanadaPRSteps;