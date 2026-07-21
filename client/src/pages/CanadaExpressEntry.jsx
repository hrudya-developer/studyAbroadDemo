import {
  FileText,
  MapPin,
  Star,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

const expressEntryFeatures = [
  {
    number: "01",
    title: "Federal Programs",
    description: "FSWP, FSTP and CEC immigration programs.",
    icon: Target,
  },
  {
    number: "02",
    title: "Federal CRS Score",
    description:
      "The score is calculated using age, education, work experience and language ability.",
    icon: FileText,
  },
  {
    number: "03",
    title: "Invitation to Apply",
    description:
      "An ITA is issued to the highest-ranked candidates during regular Express Entry draws.",
    icon: Star,
  },
  {
    number: "04",
    title: "CRS Enhancement",
    description:
      "A provincial nomination can add up to 600 points to your CRS score.",
    icon: TrendingUp,
  },
];

const CanadaExpressEntry = () => {
  return (
    <article
      className="
        flex min-w-0 flex-col
        rounded-[24px]
        border border-primary/15
        bg-white
        p-4
        shadow-[0_12px_35px_rgba(99,26,51,0.07)]
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-[0_20px_50px_rgba(99,26,51,0.12)]
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
          from-primary/[0.08]
          via-white
          to-primary/[0.03]
          p-5
          sm:p-6
        "
      >
        <div
          aria-hidden="true"
          className="
            absolute -left-16 -top-16
            h-44 w-44 rounded-full
            border-[24px] border-white/60
            bg-primary/[0.06]
          "
        />

        <div
          aria-hidden="true"
          className="
            absolute -bottom-14 -right-10
            text-primary/[0.04]
          "
        >
          <MapPin size={190} strokeWidth={1} />
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
              from-primary to-darkPrimary
              text-white
              shadow-[0_14px_30px_rgba(192,31,83,0.28)]
              sm:h-24 sm:w-24
            "
          >
            <div className="relative">
              <Users size={38} strokeWidth={2.2} />

              <span
                className="
                  absolute -bottom-3 left-1/2
                  flex h-7 w-7
                  -translate-x-1/2
                  items-center justify-center
                  rounded-full border-2 border-white
                  bg-white text-primary shadow
                "
              >
                <MapPin size={13} strokeWidth={2.5} />
              </span>
            </div>
          </div>

          <div className="min-w-0">
            <span
              className="
                inline-flex items-center gap-2
                rounded-full
                border border-primary/10
                bg-white/80
                px-3 py-1.5
                text-[10px] font-bold uppercase
                tracking-[0.14em]
                text-darkPrimary shadow-sm
                sm:text-xs
              "
            >
              <MapPin size={13} className="text-primary" />
              Canada Immigration
            </span>

            <h3
              className="
                mt-4 text-xl font-extrabold
                leading-tight tracking-[-0.03em]
                text-primary
                sm:text-2xl
              "
            >
              Canada Express Entry Program
            </h3>

            <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-primary sm:mx-0" />

            <p
              className="
                mt-4 text-sm font-medium
                leading-6 text-slate-600
                sm:text-[15px] sm:leading-7
              "
            >
              A points-based immigration system managed by IRCC that selects
              skilled workers for permanent residence in Canada.
            </p>
          </div>
        </div>
      </div>

      {/* Feature cards */}
      <div
        className="
          mt-5 grid grid-cols-1 gap-3
          sm:grid-cols-2
          xl:grid-cols-1
          2xl:grid-cols-2
        "
      >
        {expressEntryFeatures.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.number}
              className="
                group relative min-w-0
                rounded-2xl
                border border-primary/10
                bg-white p-4
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-primary/25
                hover:shadow-[0_12px_28px_rgba(192,31,83,0.10)]
              "
            >
              <div className="flex min-w-0 items-start gap-3">
                <div
                  className="
                    flex h-11 w-11 shrink-0
                    items-center justify-center
                    rounded-xl
                    bg-primary/[0.08]
                    text-primary
                    transition-all duration-300
                    group-hover:bg-primary
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
                        leading-5 text-primary
                        sm:text-[15px]
                      "
                    >
                      {feature.title}
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
                      {feature.number}
                    </span>
                  </div>

                  <p
                    className="
                      mt-2 break-words
                      text-sm leading-6 text-slate-600
                    "
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div
        className="
          mt-auto pt-5
              items-center justify-center
        "
      >
        <div
          className="
            flex flex-col items-center justify-between
            gap-4 rounded-2xl
            border border-primary/10
            bg-primary/[0.04]
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
                bg-primary/10 text-primary
              "
            >
              <TrendingUp size={19} />
            </span>

            <p className="text-sm font-semibold leading-5 text-darkPrimary">
              Improve your CRS score and increase your opportunity to receive
              permanent residence.
            </p>
          </div>

          
        </div>
      </div>
    </article>
  );
};

export default CanadaExpressEntry;