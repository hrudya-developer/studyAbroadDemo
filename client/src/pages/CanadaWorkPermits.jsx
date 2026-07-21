import {
  BadgeCheck,
  BriefcaseBusiness,
  FileCheck2,
  FileText,
  Globe2,
  ShieldCheck,
  Users,
} from "lucide-react";

const workPermitHighlights = [
  {
    number: "01",
    title: "Eligibility",
    description:
      "Applicants must demonstrate financial stability, meet temporary-residence requirements and hold a valid job offer when required.",
    icon: ShieldCheck,
  },
  {
    number: "02",
    title: "Types of Work Permits",
    description:
      "Available options include employer-specific permits, open work permits and bridging open work permits.",
    icon: Users,
  },
  {
    number: "03",
    title: "Application Process",
    description:
      "Applicants generally apply online, provide biometrics, submit supporting documents and attend an interview when requested.",
    icon: FileText,
  },
];

const CanadaWorkPermits = () => {
  return (
    <article
      id="canada-work-permits"
      className="
        flex min-w-0 flex-col
        rounded-[24px]
        border border-rose-200/80
        bg-white
        p-4
        shadow-[0_12px_35px_rgba(225,29,72,0.08)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_20px_50px_rgba(225,29,72,0.13)]
        sm:p-5
        lg:p-6
      "
    >
      {/* Header */}
      <div
        className="
          relative overflow-hidden
          rounded-[22px]
          border border-rose-200/70
          bg-gradient-to-br
          from-rose-50
          via-white
          to-red-50
          p-5
          sm:p-6
        "
      >
        {/* Decorative circle */}
        <div
          aria-hidden="true"
          className="
            absolute -right-16 -top-16
            h-44 w-44 rounded-full
            border-[24px] border-white/70
            bg-rose-300/20
          "
        />

        {/* Decorative background icon */}
        <div
          aria-hidden="true"
          className="
            absolute -bottom-14 -right-8
            text-rose-700/[0.04]
          "
        >
          <BriefcaseBusiness
            size={190}
            strokeWidth={1}
          />
        </div>

        <div
          className="
            relative z-10
            flex flex-col items-center gap-5
            text-center
            sm:flex-row sm:items-center sm:text-left
          "
        >
          {/* Main icon */}
          <div
            className="
              flex h-20 w-20 shrink-0
              items-center justify-center
              rounded-2xl
              border-4 border-white
              bg-gradient-to-br
              from-rose-400 to-rose-700
              text-white
              shadow-[0_14px_30px_rgba(225,29,72,0.24)]
              sm:h-24 sm:w-24
            "
          >
            <BriefcaseBusiness
              size={40}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <span
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-rose-200
                bg-white/90
                px-3 py-1.5
                text-[10px] font-bold uppercase
                tracking-[0.14em]
                text-rose-700
                shadow-sm
                sm:text-xs
              "
            >
              <BadgeCheck size={13} />
              Employment in Canada
            </span>

            <h3
              className="
                mt-4 text-xl font-extrabold
                leading-tight tracking-[-0.03em]
                text-rose-900
                sm:text-2xl
              "
            >
              Canada Work Permits
            </h3>

            <div
              className="
                mx-auto mt-4
                h-1 w-14 rounded-full
                bg-rose-600
                sm:mx-0
              "
            />

            <p
              className="
                mt-4
                text-sm font-medium
                leading-6 text-slate-600
                sm:text-[15px]
                sm:leading-7
              "
            >
              Canada offers multiple work-permit options to support temporary
              foreign workers and skilled professionals.
            </p>
          </div>
        </div>
      </div>

      {/* Work-permit highlight cards */}
      <div
        className="
          mt-5 grid grid-cols-1 gap-3
          sm:grid-cols-2
          xl:grid-cols-1
          2xl:grid-cols-2
        "
      >
        {workPermitHighlights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.number}
              className="
                group relative min-w-0
                overflow-hidden rounded-2xl
                border border-rose-200/70
                bg-gradient-to-br
                from-white to-rose-50/60
                p-4
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-rose-300
                hover:shadow-[0_12px_28px_rgba(225,29,72,0.11)]
              "
            >
              <div className="flex min-w-0 items-start gap-3">
                {/* Icon */}
                <div
                  className="
                    flex h-11 w-11 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-rose-100
                    p-2.5
                    text-rose-700
                    transition-all duration-300
                    group-hover:bg-rose-600
                    group-hover:text-white
                  "
                >
                  <Icon
                    size={19}
                    strokeWidth={2.1}
                    aria-hidden="true"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h4
                      className="
                        min-w-0
                        text-sm font-bold
                        leading-5 text-rose-950
                        sm:text-[15px]
                      "
                    >
                      {item.title}
                    </h4>

                    <span
                      className="
                        flex h-7 w-7 shrink-0
                        items-center justify-center
                        rounded-full
                        bg-rose-100
                        text-[10px] font-bold
                        text-rose-700
                      "
                    >
                      {item.number}
                    </span>
                  </div>

                  <p
                    className="
                      mt-2 break-words
                      text-sm leading-6
                      text-slate-600
                    "
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom details */}
      <div className="mt-auto pt-5">
        <div
          className="
            grid overflow-hidden
            rounded-2xl
            border border-rose-200/70
            bg-rose-50
            sm:grid-cols-2
          "
        >
          {/* Permit Includes */}
          <div
            className="
              flex min-w-0 items-start gap-3
              border-b border-rose-200/70
              px-4 py-4
              sm:border-b-0
              sm:border-r
            "
          >
            <span
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                bg-rose-100
                text-rose-700
              "
            >
              <FileCheck2
                size={19}
                aria-hidden="true"
              />
            </span>

            <div className="min-w-0">
              <h4
                className="
                  text-sm font-bold
                  leading-5 text-rose-950
                "
              >
                Permit Includes
              </h4>

              <p
                className="
                  mt-1.5 text-sm
                  leading-5 text-slate-600
                "
              >
                Work type, employer, employment location and permit duration.
              </p>
            </div>
          </div>

          {/* Global Skills Strategy */}
          <div
            className="
              flex min-w-0 items-start
              gap-3 px-4 py-4
            "
          >
            <span
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                bg-rose-100
                text-rose-700
              "
            >
              <Globe2
                size={19}
                aria-hidden="true"
              />
            </span>

            <div className="min-w-0">
              <h4
                className="
                  text-sm font-bold
                  leading-5 text-rose-950
                "
              >
                Global Skills Strategy
              </h4>

              <p
                className="
                  mt-1.5 text-sm
                  leading-5 text-slate-600
                "
              >
                Fast-track processing may be available for eligible highly
                skilled roles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CanadaWorkPermits;