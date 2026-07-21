import {
  BadgeDollarSign,
  GraduationCap,
  HeartPulse,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";

const benefits = [
  {
    id: 1,
    title: "High-Quality Healthcare",
    icon: HeartPulse,
  },
  {
    id: 2,
    title: "World-Renowned Education",
    icon: GraduationCap,
  },
  {
    id: 3,
    title: "Affordable Living",
    icon: BadgeDollarSign,
  },
  {
    id: 4,
    title: "Safe & Inclusive Society",
    icon: ShieldCheck,
  },
  {
    id: 5,
    title: "Economic Opportunities",
    icon: TrendingUp,
  },
  {
    id: 6,
    title: "Pathways to PR & Citizenship",
    icon: Users,
  },
];

const CanadaMigrationBenefits = () => {
  return (
    <section
      id="canada-benefits"
      className="
        relative overflow-hidden bg-white
        px-4 py-10
        sm:px-6 sm:py-12
        lg:px-8 lg:py-14
      " data-aos="fade-up">
      <div className="mx-auto max-w-7xl">
        <div
          className="
            relative rounded-[26px]
            border border-slate-200
            bg-white
            px-4 pb-5 pt-12
            shadow-[0_18px_45px_rgba(15,23,42,0.12)]
            sm:px-6 sm:pb-6
            lg:px-8 lg:pb-7
          "
        >
          {/* Section label */}
          <div
            className="
              absolute left-4 top-0
              -translate-y-1/2
              rounded-md
              bg-darkPrimary
              px-5 py-2.5
              text-sm font-semibold text-white
              shadow-[0_10px_25px_rgba(192,31,83,0.28)]
              sm:left-6 sm:px-6 sm:text-base
              lg:left-8
            "
          >
            Benefits of Migrating to Canada
          </div>

          <div
            className="
              grid grid-cols-1
              sm:grid-cols-3
              lg:grid-cols-6
              lg:gap-y-0 gap-2
            "
          >
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.id}
                  className={`
                    group relative flex min-h-[140px]
                    flex-col items-center justify-center
                    px-3 py-4 text-center bg-gray-50 rounded-xl
                    ${index !== benefits.length - 1 ? "lg:border-r lg:border-slate-200" : ""}
                  `}
                >
                  <div
                    className="
                      flex h-12 w-12 items-center justify-center
                      rounded-2xl bg-primary/10
                      text-primary
                      transition-all duration-300
                      group-hover:-translate-y-1
                      group-hover:bg-primary
                      group-hover:text-white
                      group-hover:shadow-[0_12px_25px_rgba(192,31,83,0.25)]
                    "
                  >
                    <Icon size={25} strokeWidth={2.2} />
                  </div>

                  <p
                    className="
                      mt-4 max-w-[140px]
                      text-sm font-semibold leading-5
                      text-slate-800
                      sm:text-[14px]
                    "
                  >
                    {benefit.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CanadaMigrationBenefits;