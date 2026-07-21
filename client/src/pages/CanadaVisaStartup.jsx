import {
  ArrowRight,
  BadgeCheck,
  Building2,
  FileCheck2,
  Rocket,
  Send,
  UsersRound,
} from "lucide-react";

const startupVisaSteps = [
  {
    number: "01",
    title: "Meet Eligibility",
    description:
      "Confirm that you meet the basic requirements for Canada’s Start-Up Visa Program.",
    icon: BadgeCheck,
  },
  {
    number: "02",
    title: "Submit Your Profile",
    description:
      "Prepare and submit your business profile for assessment and review.",
    icon: Send,
  },
  {
    number: "03",
    title: "Receive ITA",
    description:
      "Receive an Invitation to Apply after your profile and proposal are accepted.",
    icon: FileCheck2,
  },
  {
    number: "04",
    title: "Build Your Business",
    description:
      "Establish an innovative business in Canada with the potential to create jobs.",
    icon: Building2,
  },
  {
    number: "05",
    title: "Secure Organization Support",
    description:
      "Obtain support from a designated Canadian fund, investor or business incubator.",
    icon: UsersRound,
  },
];

const CanadaVisaStartup = () => {
  return (
    <article
      id="canada-startup-visa"
      className="
        flex min-w-0 flex-col
        rounded-[24px]
        border border-secondary/15
        bg-white
        p-4
        shadow-[0_12px_35px_rgba(4,102,175,0.07)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_20px_50px_rgba(4,102,175,0.12)]
        sm:p-5
        lg:p-6
      "
    >
      {/* Header */}
      <div
        className="
          relative overflow-hidden
          rounded-[22px]
          border border-secondary/10
          bg-gradient-to-br
          from-secondary/[0.08]
          via-white
          to-secondary/[0.03]
          p-5
          sm:p-6
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute -right-16 -top-16
            h-44 w-44 rounded-full
            border-[24px] border-white/60
            bg-secondary/[0.06]
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute -bottom-14 -right-8
            text-secondary/[0.04]
          "
        >
          <Rocket size={190} strokeWidth={1} />
        </div>

        <div
          className="
            relative z-10
            flex flex-col items-center gap-5
            text-center
            sm:flex-row sm:items-center sm:text-left
          "
        >
          <div
            className="
              flex h-20 w-20 shrink-0
              items-center justify-center
              rounded-2xl
              border-4 border-white
              bg-gradient-to-br
              from-secondary to-[#063a72]
              text-white
              shadow-[0_14px_30px_rgba(4,102,175,0.28)]
              sm:h-24 sm:w-24
            "
          >
            <Rocket size={40} strokeWidth={2} />
          </div>

          <div className="min-w-0">
            <span
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-secondary/10
                bg-white/80
                px-3 py-1.5
                text-[10px] font-bold uppercase
                tracking-[0.14em]
                text-secondary shadow-sm
                sm:text-xs
              "
            >
              <Rocket size={13} />
              Canada Business Immigration
            </span>

            <h3
              className="
                mt-4 text-xl font-extrabold
                leading-tight tracking-[-0.03em]
                text-secondary
                sm:text-2xl
              "
            >
              Start-Up Visa for Entrepreneurs
            </h3>

            <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-secondary sm:mx-0" />

            <p
              className="
                mt-4 text-sm font-medium
                leading-6 text-slate-600
                sm:text-[15px] sm:leading-7
              "
            >
              A pathway for business-minded migrants who want to establish an
              innovative company in Canada and create employment opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Step cards */}
      <div
        className="
          mt-5 grid grid-cols-1 gap-3
          sm:grid-cols-2
          xl:grid-cols-1
          2xl:grid-cols-2
        "
      >
        {startupVisaSteps.map((step) => {
          const Icon = step.icon;

          return (
            <div
              key={step.number}
              className="
                group relative min-w-0
                rounded-2xl
                border border-secondary/10
                bg-white p-4
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-secondary/25
                hover:shadow-[0_12px_28px_rgba(4,102,175,0.10)]
              "
            >
              <div className="flex min-w-0 items-start gap-3">
                <div
                  className="
                    flex h-11 w-11 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-secondary/[0.08]
                    text-secondary
                    transition-all duration-300
                    group-hover:bg-secondary
                    group-hover:text-white
                  "
                >
                  <Icon size={21} strokeWidth={2.2} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h4
                      className="
                        min-w-0 text-sm font-bold
                        leading-5 text-secondary
                        sm:text-[15px]
                      "
                    >
                      {step.title}
                    </h4>

                    <span
                      className="
                        flex h-7 w-7 shrink-0
                        items-center justify-center
                        rounded-full
                        bg-secondary/10
                        text-[10px] font-bold
                        text-secondary
                      "
                    >
                      {step.number}
                    </span>
                  </div>

                  <p
                    className="
                      mt-2 break-words
                      text-sm leading-6 text-slate-600
                    "
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-auto pt-5">
        <div
          className="
            flex flex-col items-center justify-between
            gap-4 rounded-2xl
            border border-secondary/10
            bg-secondary/[0.04]
            px-4 py-4 text-center
            sm:flex-row sm:text-left
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                bg-secondary/10 text-secondary
              "
            >
              <Rocket size={19} />
            </span>

            <p className="text-sm font-semibold leading-5 text-[#063a72]">
              Turn your innovative business idea into a pathway toward Canadian
              permanent residence.
            </p>
          </div>

         
        </div>
      </div>
    </article>
  );
};

export default CanadaVisaStartup;