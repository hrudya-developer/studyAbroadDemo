import {
  BadgeCheck,
  Leaf,
  ShieldCheck,
  TrendingUp,
  UsersRound,
} from "lucide-react";

import { FaCanadianMapleLeaf } from "react-icons/fa";

const canadaBenefits = [
  {
    number: "01",
    title: "High Quality of Life",
    description:
      "Enjoy world-class healthcare, education, and a safe, clean environment.",
    icon: BadgeCheck,
  },
  {
    number: "02",
    title: "Diverse & Inclusive",
    description:
      "A multicultural society that welcomes everyone and celebrates diversity.",
    icon: UsersRound,
  },
  {
    number: "03",
    title: "Strong Economy",
    description:
      "A stable and innovative economy with abundant career and business opportunities.",
    icon: TrendingUp,
  },
  {
    number: "04",
    title: "Safe & Secure",
    description:
      "One of the safest countries in the world with a strong focus on security and peace.",
    icon: ShieldCheck,
  },
];

const CanadaOpportunityCard = () => {
  return (
    <article
      id="canada-opportunities"
      className="
        flex min-w-0 flex-col
        rounded-[24px]
        border border-primary/10
        bg-white
        p-4
        shadow-[0_12px_35px_rgba(192,31,83,0.08)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_20px_50px_rgba(192,31,83,0.13)]
        sm:p-5
        lg:p-6
      "
    >
      {/* Header */}
      <div
        className="
          relative overflow-hidden
          rounded-[22px]
          border border-primary/10
          bg-gradient-to-br
          from-darkPrimary
          via-primary
          to-darkPrimary
          p-5
          text-white
          sm:p-6
        "
      >
        {/* Decorative circle */}
        <div
          aria-hidden="true"
          className="
            absolute -right-16 -top-16
            h-44 w-44 rounded-full
            border-[24px] border-white/10
            bg-white/[0.04]
          "
        />

        {/* Decorative background icon */}
        <div
          aria-hidden="true"
          className="
            absolute -bottom-14 -right-8
            text-white/[0.05]
          "
        >
          <FaCanadianMapleLeaf
            size={190}
            strokeWidth={1}
          />
        </div>

        <div
          className="
            relative z-10
            flex flex-col items-center gap-5
            text-center
            sm:flex-row
            sm:items-center
            sm:text-left
          "
        >
          {/* Main icon */}
          <div
            className="
              flex h-20 w-20 shrink-0
              items-center justify-center
              rounded-2xl
              border-4 border-white
              bg-white
              text-primary
              shadow-[0_14px_30px_rgba(99,26,51,0.26)]
              sm:h-24 sm:w-24
            "
          >
            <FaCanadianMapleLeaf
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
                border border-white/20
                bg-white/10
                px-3 py-1.5
                text-[10px] font-bold uppercase
                tracking-[0.14em]
                text-white
                shadow-sm
                backdrop-blur-sm
                sm:text-xs
              "
            >
              <Leaf size={13} />
              Canada Lifestyle
            </span>

            <h3
              className="
                mt-4
                text-xl font-extrabold
                leading-tight
                tracking-[-0.03em]
                text-white
                sm:text-2xl
              "
            >
              <span className="text-logoYellow">
                Canada
              </span>
              {" — "}A Land of Opportunities
            </h3>

            <div
              className="
                mx-auto mt-4
                h-1 w-14 rounded-full
                bg-white/85
                sm:mx-0
              "
            />

            <p
              className="
                mt-4
                text-sm font-medium
                leading-6 text-white/85
                sm:text-[15px]
                sm:leading-7
              "
            >
              Discover a welcoming country where quality of life, diversity,
              opportunity, and security come together.
            </p>
          </div>
        </div>
      </div>

      {/* Benefit cards */}
      <div
        className="
          mt-5 grid grid-cols-1 gap-3
          sm:grid-cols-2
          xl:grid-cols-1
          2xl:grid-cols-2
        "
      >
        {canadaBenefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div
              key={benefit.number}
              className="
                group relative min-w-0
                overflow-hidden
                rounded-2xl
                border border-primary/10
                bg-gradient-to-br
                from-white to-primary/[0.035]
                p-4
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-primary/25
                hover:shadow-[0_12px_28px_rgba(192,31,83,0.11)]
              "
            >
              <div className="flex min-w-0 items-start gap-3">
                {/* Icon */}
                <div
                  className="
                    flex h-11 w-11 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-primary/10
                    p-2.5
                    text-primary
                    transition-all duration-300
                    group-hover:bg-primary
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
                        leading-5 text-darkPrimary
                        sm:text-[15px]
                      "
                    >
                      {benefit.title}
                    </h4>

                    <span
                      className="
                        flex h-7 w-7 shrink-0
                        items-center justify-center
                        rounded-full
                        bg-primary/10
                        text-[10px] font-bold
                        text-primary
                      "
                    >
                      {benefit.number}
                    </span>
                  </div>

                  <p
                    className="
                      mt-2 break-words
                      text-sm leading-6
                      text-slate-600
                    "
                  >
                    {benefit.description}
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
            border border-primary/10
            bg-primary/[0.045]
            sm:grid-cols-2
          "
        >
          {/* Build Your Future */}
          <div
            className="
              flex min-w-0 items-start gap-3
              border-b border-primary/10
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
                bg-primary/10
                text-primary
              "
            >
              <FaCanadianMapleLeaf
                size={19}
                aria-hidden="true"
              />
            </span>

            <div className="min-w-0">
              <h4
                className="
                  text-sm font-bold
                  leading-5 text-darkPrimary
                "
              >
                Build Your Future
              </h4>

              <p
                className="
                  mt-1.5
                  text-sm leading-5
                  text-slate-600
                "
              >
                Canada is more than a destination—it is a place to create a
                better future.
              </p>
            </div>
          </div>

          {/* Better Quality of Life */}
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
                bg-primary/10
                text-primary
              "
            >
              <BadgeCheck
                size={19}
                aria-hidden="true"
              />
            </span>

            <div className="min-w-0">
              <h4
                className="
                  text-sm font-bold
                  leading-5 text-darkPrimary
                "
              >
                Better Quality of Life
              </h4>

              <p
                className="
                  mt-1.5
                  text-sm leading-5
                  text-slate-600
                "
              >
                Discover excellent services, opportunities, security, and a
                welcoming community.
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CanadaOpportunityCard;