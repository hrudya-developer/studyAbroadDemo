import {
  BriefcaseBusiness,
  Compass,
  Globe2,
  Handshake,
  Heart,
  Languages,
} from "lucide-react";

import australia from "../assets/australia.png";

const supportItems = [
  {
    icon: Compass,
    title: "Orientation Programs",
    description:
      "Assistance with understanding Australian culture and systems.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Employment Services",
    description:
      "Guidance on job searching and career development.",
  },
  {
    icon: Languages,
    title: "Language Support",
    description:
      "English language courses to improve communication skills.",
  },
];

const AustraliaPostMigration = () => {
  return (
    <section id="post-migration-support" className="relative overflow-hidden bg-white">
      <div
        className="
          mx-auto grid w-full max-w-[1600px]
          grid-cols-1 gap-5
          px-4 py-8
          sm:px-6
          lg:grid-cols-[1.45fr_0.95fr]
          lg:items-stretch
          lg:gap-6
          lg:px-8
          xl:px-10
        "
      >
        {/* Post-migration support card */}
        <article
          className="
            relative isolate overflow-hidden
            rounded-[24px]
            border border-slate-200/80
            bg-white
            shadow-[0_18px_50px_rgba(15,23,42,0.10)]
          "
        >
          <div
            className="
              grid min-h-full grid-cols-1
              lg:grid-cols-[minmax(0,1.15fr)_minmax(260px,0.85fr)]
            "
          >
            {/* Content */}
            <div className="relative z-10 flex flex-col">
              {/* Header */}
              <div
                className="
                  flex min-h-[54px] items-center gap-3
                  bg-gradient-to-r
                  from-[#0466AF] via-[#0759A1] to-[#0D3D88]
                  px-5 py-3 text-white
                  sm:min-h-[62px]
                  sm:px-7
                "
              >
                <span
                  className="
                    flex h-10 w-10 shrink-0 items-center justify-center
                    rounded-xl bg-white/15
                    backdrop-blur-sm
                    sm:h-12 sm:w-12
                  "
                >
                  <Handshake className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>

                <h2
                  className="
                    text-lg font-extrabold leading-tight
                    sm:text-xl
                    lg:text-xl
                  "
                >
                  Post-Migration Support
                </h2>
              </div>

              {/* Support list */}
              <div
                className="
                  flex flex-1 flex-col justify-center
                  gap-4
                  px-5 py-6
                  sm:px-7 sm:py-7
                  lg:pr-4
                "
              >
                {supportItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="
                        group flex min-w-0 items-start gap-3
                        rounded-2xl p-2
                        transition-colors duration-300
                        hover:bg-blue-50/70
                        sm:gap-4
                      "
                    >
                      <span
                        className="
                          flex h-10 w-10 shrink-0 items-center justify-center
                          rounded-full
                          bg-gradient-to-br
                          from-[#0466AF] to-[#0A3E87]
                          text-white
                          shadow-[0_8px_20px_rgba(4,102,175,0.22)]
                          sm:h-11 sm:w-11
                        "
                      >
                        <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                      </span>

                      <div className="min-w-0 flex-1">
                        <p
                          className="
                            text-sm leading-6 text-slate-600
                            sm:text-[15px]
                          "
                        >
                          <span className="font-extrabold text-slate-900">
                            {item.title}:
                          </span>{" "}
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Image area */}
            <div
              className="
                relative min-h-[230px] overflow-hidden
                sm:min-h-[280px]
                lg:min-h-full
              "
            >
              <img
                src={australia}
                alt="Australian city skyline"
                className="
                  absolute inset-0 h-full w-full object-cover
                  transition-transform duration-700
                  hover:scale-105
                "
              />

              <div
                className="
                  pointer-events-none absolute inset-0
                  bg-gradient-to-t
                  from-black/20 via-transparent to-transparent
                  lg:bg-gradient-to-r
                  lg:from-white/20 lg:to-transparent
                "
              />

            
            </div>
          </div>
        </article>

        {/* Quote card */}
        <aside
          className="
            relative isolate flex min-h-[260px] flex-col
            justify-between overflow-hidden
            rounded-[24px]
            border border-dashed border-[#C01F53]/40
            bg-gradient-to-br from-white via-white to-rose-50
            p-6
            shadow-[0_18px_50px_rgba(15,23,42,0.08)]
            sm:min-h-[300px]
            sm:p-8
            lg:min-h-full
          "
        >
          {/* Background pattern */}
          <div
            className="
              pointer-events-none absolute
              -bottom-8 -right-5
              text-[#C01F53]/10
            "
          >
            <Globe2 className="h-44 w-44 sm:h-56 sm:w-56" />
          </div>

          <div className="relative z-10">
            <span
              className="
                block font-serif
                text-6xl font-black leading-none text-[#C01F53]
                sm:text-7xl
              "
              aria-hidden="true"
            >
              “
            </span>

            <blockquote
              className="
                -mt-2 max-w-xl
                text-xl font-extrabold leading-snug
                text-slate-900
                sm:text-2xl
                lg:text-[clamp(1.25rem,1.7vw,1.75rem)]
              "
            >
              Australia isn’t just a destination, it’s a place to
              build a better future for you and your loved ones.
            </blockquote>

            <span
              className="
                mt-5 block h-[3px] w-14
                rounded-full bg-[#F7EC22]
                sm:w-20
              "
            />
          </div>

          <div
            className="
              relative z-10 mt-8
              flex items-center gap-3
              border-t border-[#C01F53]/15
              pt-5
            "
          >
            <Heart
              className="
                h-5 w-5 shrink-0
                fill-[#C01F53] text-[#C01F53]
              "
            />

            <p className="text-sm font-semibold text-slate-800 sm:text-base">
              A new beginning awaits!
            </p>
          </div>
        </aside>
      </div>

      {/* Contact bar */}
      <div
        className="
          bg-gradient-to-r
          from-[#C01F53] via-[#D10D4A] to-[#C01F53]
          text-white
        "
      >
        <div
          className="
            mx-auto flex w-full max-w-[1600px]
            flex-col items-start gap-3
            px-4 py-4
            sm:flex-row
            sm:items-center
            sm:gap-4
            sm:px-6
            lg:px-8
            xl:px-10
          "
        >
          <span
            className="
              flex h-11 w-11 shrink-0 items-center justify-center
              rounded-full
              border-2 border-white
              bg-white/10
              shadow-[0_8px_20px_rgba(99,26,51,0.25)]
              sm:h-12 sm:w-12
            "
          >
            <Globe2 className="h-5 w-5 sm:h-6 sm:w-6" />
          </span>

          <p
            className="
              max-w-3xl
              text-sm font-semibold leading-6
              sm:text-base
            "
          >
            For personalized assistance and more information on
            migrating to Australia, feel free to contact Medcity
            Overseas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AustraliaPostMigration;