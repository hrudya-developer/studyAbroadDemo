import {
  BadgeCheck,
  Clock3,
  Heart,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

const sponsoredMembers = [
  {
    number: "01",
    title: "Spouse or Partner",
    description: "Spouse or common-law partner",
    icon: Heart,
  },
  {
    number: "02",
    title: "Dependent Children",
    description: "Dependent children under 22 and unmarried",
    icon: UserRound,
  },
  {
    number: "03",
    title: "Other Relatives",
    description: "Other eligible relatives in certain cases",
    icon: UserRound,
  },
  {
    number: "04",
    title: "Parents and Grandparents",
    description:
      "Parents and grandparents may require income proof and a sponsorship agreement",
    icon: Users,
  },
  {
    number: "05",
    title: "Processing Time",
    description:
      "Processing time varies by relationship type and visa office location",
    icon: Clock3,
  },
];

const CanadaFamilySponsorship = () => {
  return (
    <article
      id="canada-family-sponsorship"
      className="
        flex min-w-0 flex-col
        rounded-[24px]
        border border-orange-200/80
        bg-white
        p-4
        shadow-[0_12px_35px_rgba(234,88,12,0.08)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_20px_50px_rgba(234,88,12,0.13)]
        sm:p-5
        lg:p-6
      "
    >
      {/* Header */}
      <div
        className="
          relative overflow-hidden
          rounded-[22px]
          border border-orange-200/70
          bg-gradient-to-br
          from-orange-50
          via-white
          to-amber-50
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
            bg-orange-300/20
          "
        />

        {/* Decorative background icon */}
        <div
          aria-hidden="true"
          className="
            absolute -bottom-14 -right-8
            text-orange-700/[0.04]
          "
        >
          <Users size={190} strokeWidth={1} />
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
              from-orange-400 to-orange-600
              text-white
              shadow-[0_14px_30px_rgba(234,88,12,0.24)]
              sm:h-24 sm:w-24
            "
          >
            <Users
              size={42}
              strokeWidth={2}
              aria-hidden="true"
            />
          </div>

          <div className="min-w-0">
            <span
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-orange-200
                bg-white/90
                px-3 py-1.5
                text-[10px] font-bold uppercase
                tracking-[0.14em]
                text-orange-700
                shadow-sm
                sm:text-xs
              "
            >
              <BadgeCheck size={13} />
              Family Immigration
            </span>

            <h3
              className="
                mt-4 text-xl font-extrabold
                leading-tight tracking-[-0.03em]
                text-orange-950
                sm:text-2xl
              "
            >
              Family Sponsorship
            </h3>

            <div
              className="
                mx-auto mt-4
                h-1 w-14 rounded-full
                bg-orange-500
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
              Canada promotes family reunification through flexible family
              sponsorship programs.
            </p>
          </div>
        </div>
      </div>

      {/* Eligible sponsors */}
      <div
        className="
          mt-5 rounded-2xl
          border border-orange-200/70
          bg-orange-50/70
          p-4
          sm:p-5
        "
      >
        <div className="flex min-w-0 items-start gap-4">
          <span
            className="
              flex h-11 w-11 shrink-0
              items-center justify-center
              rounded-xl
              bg-orange-100
              text-orange-700
            "
          >
            <ShieldCheck
              size={21}
              strokeWidth={2.1}
              aria-hidden="true"
            />
          </span>

          <div className="min-w-0">
            <h4
              className="
                text-sm font-bold
                text-orange-950
                sm:text-[15px]
              "
            >
              Eligible Sponsors
            </h4>

            <p
              className="
                mt-2 text-sm leading-6
                text-slate-600
              "
            >
              Sponsors must be at least 18 years old, be a Canadian citizen or
              permanent resident, and meet the applicable financial
              requirements.
            </p>
          </div>
        </div>
      </div>

      {/* Sponsored members */}
      <div className="mt-5">
        <div className="mb-4 flex items-center gap-3">
          <span className="h-px flex-1 bg-orange-200" />

          <h4
            className="
              shrink-0 text-sm font-extrabold
              uppercase tracking-[0.08em]
              text-orange-800
            "
          >
            Who Can Be Sponsored
          </h4>

          <span className="h-px flex-1 bg-orange-200" />
        </div>

        <div
          className="
            grid grid-cols-1 gap-3
            sm:grid-cols-2
          "
        >
          {sponsoredMembers.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.number}
                className="
                  group relative min-w-0
                  overflow-hidden rounded-2xl
                  border border-orange-200/70
                  bg-gradient-to-br
                  from-white to-orange-50/60
                  p-4
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:border-orange-300
                  hover:shadow-[0_12px_28px_rgba(234,88,12,0.11)]
                "
              >
                <div className="flex min-w-0 items-start gap-3">
                  {/* Item icon */}
                  <div
                    className="
                      flex h-11 w-11 shrink-0
                      items-center justify-center
                      rounded-xl
                      bg-orange-100
                      text-orange-700
                      transition-all duration-300
                      group-hover:bg-orange-500
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
                      <h5
                        className="
                          min-w-0
                          text-sm font-bold
                          leading-5 text-orange-950
                          sm:text-[15px]
                        "
                      >
                        {item.title}
                      </h5>

                      <span
                        className="
                          flex h-7 w-7 shrink-0
                          items-center justify-center
                          rounded-full
                          bg-orange-100
                          text-[10px] font-bold
                          text-orange-700
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
      </div>

      {/* Bottom note */}
      <div className="mt-auto pt-5">
        <div
          className="
            flex items-start gap-3
            rounded-2xl
            border border-orange-200/70
            bg-orange-50
            px-4 py-4
          "
        >
          <span
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              bg-orange-100
              text-orange-700
            "
          >
            <Heart
              size={19}
              aria-hidden="true"
            />
          </span>

          <p
            className="
              text-sm font-semibold
              leading-6 text-orange-950
            "
          >
            Family sponsorship helps eligible Canadian citizens and permanent
            residents reunite with close family members in Canada.
          </p>
        </div>
      </div>
    </article>
  );
};

export default CanadaFamilySponsorship;