import {
  BadgeCheck,
  FileText,
  Landmark,
  Link2,
  Medal,
  UsersRound,
} from "lucide-react";

const pnpHighlights = [
  {
    number: "01",
    title: "Provincial Categories",
    description:
      "Provincial categories vary and candidates are selected based on local labour-market demand.",
    icon: UsersRound,
  },
  {
    number: "02",
    title: "Express Entry Connection",
    description:
      "Some PNP streams are linked with Express Entry, while others use a separate application process.",
    icon: Link2,
  },
  {
    number: "03",
    title: "Additional CRS Points",
    description:
      "A provincial nomination gives Express Entry applicants an additional 600 CRS points.",
    icon: Medal,
  },
];

const CanadaPNPOverview = () => {
  return (
    <article
      id="canada-pnp-overview"
      className="
        flex min-w-0 flex-col
        rounded-[24px]
        border border-purple-200/80
        bg-white
        p-4
        shadow-[0_12px_35px_rgba(126,34,206,0.08)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_20px_50px_rgba(126,34,206,0.13)]
        sm:p-5
        lg:p-6
      "
    >
      {/* Header */}
      <div
        className="
          relative overflow-hidden
          rounded-[22px]
          border border-purple-200/70
          bg-gradient-to-br
          from-purple-50
          via-white
          to-violet-50
          p-5
          sm:p-6
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute -right-16 -top-16
            h-44 w-44 rounded-full
            border-[24px] border-white/70
            bg-purple-300/20
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute -bottom-14 -right-8
            text-purple-700/[0.04]
          "
        >
          <Landmark size={190} strokeWidth={1} />
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
              from-purple-400 to-purple-700
              text-white
              shadow-[0_14px_30px_rgba(126,34,206,0.24)]
              sm:h-24 sm:w-24
            "
          >
            <Landmark
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
                border border-purple-200
                bg-white/90
                px-3 py-1.5
                text-[10px] font-bold uppercase
                tracking-[0.14em]
                text-purple-700
                shadow-sm
                sm:text-xs
              "
            >
              <BadgeCheck size={13} />
              Provincial Immigration
            </span>

            <h3
              className="
                mt-4 text-xl font-extrabold
                leading-tight tracking-[-0.03em]
                text-purple-900
                sm:text-2xl
              "
            >
              Provincial Nominee Program (PNP) Overview
            </h3>

            <div
              className="
                mx-auto mt-4
                h-1 w-14 rounded-full
                bg-purple-600
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
              An immigration route aligned with provincial and territorial
              labour-market needs across Canada.
            </p>
          </div>
        </div>
      </div>

      {/* Highlight cards */}
      <div
        className="
          mt-5 grid grid-cols-1 gap-3
          sm:grid-cols-2
          xl:grid-cols-1
          2xl:grid-cols-2
        "
      >
        {pnpHighlights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.number}
              className="
                group relative min-w-0
                overflow-hidden rounded-2xl
                border border-purple-200/70
                bg-gradient-to-br
                from-white to-purple-50/60
                p-4
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-purple-300
                hover:shadow-[0_12px_28px_rgba(126,34,206,0.11)]
              "
            >
              <div className="flex min-w-0 items-start gap-3">
                <div
                  className="
                    flex h-11 w-11 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-purple-100
                    p-2.5
                    text-purple-700
                    transition-all duration-300
                    group-hover:bg-purple-600
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
                        leading-5 text-purple-950
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
                        bg-purple-100
                        text-[10px] font-bold
                        text-purple-700
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

      {/* Bottom note */}
      <div className="mt-auto pt-5">
        <div
          className="
            flex flex-col items-center justify-between
            gap-4 rounded-2xl
            border border-purple-200/70
            bg-purple-50
            px-4 py-4
            text-center
            sm:flex-row
            sm:text-left
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-xl
                bg-purple-100
                text-purple-700
              "
            >
              <FileText
                size={19}
                aria-hidden="true"
              />
            </span>

            <p
              className="
                text-sm font-semibold
                leading-5 text-purple-950
              "
            >
              A provincial nomination can significantly improve your chance of
              receiving Canadian permanent residence.
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CanadaPNPOverview;