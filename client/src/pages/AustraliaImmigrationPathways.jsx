import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Heart,
  Landmark,
  MapPin,
  Route,
  UserRound,
  UsersRound,
} from "lucide-react";

const pathwayGroups = [
  {
    id: 1,
    title: "Skilled Migration",
    description:
      "Australia offers several migration programs for professionals with in-demand experience.",
    icon: BriefcaseBusiness,

    theme: {
      accent: "#0466AF",
      darkAccent: "#0A3E87",
      soft: "bg-[#0466AF]/[0.07]",
      icon: "from-[#0466AF] to-[#0A3E87]",
      text: "text-[#0466AF]",
      border: "hover:border-[#0466AF]/30",
      ring: "group-hover:ring-[#0466AF]/10",
      badge: "bg-[#0466AF]/10 text-[#0466AF]",
    },

    items: [
      {
        title: "Class 189",
        subtitle: "Skilled Independent Visa",
        description:
          "For accomplished workers who are not supported by an employer or family member.",
        icon: UsersRound,
      },
      {
        title: "Class 190",
        subtitle: "Skilled Nominated Visa",
        description:
          "For professionals nominated by an Australian state or territory government.",
        icon: Landmark,
      },
      {
        title: "Class 491",
        subtitle: "Skilled Work Regional Visa",
        description:
          "For professionals nominated by a state, territory or eligible family member to live and work in regional Australia.",
        icon: MapPin,
      },
    ],
  },

  {
    id: 2,
    title: "Employer-Sponsored Visas",
    description:
      "These visas allow Australian employers to employ skilled foreign workers.",
    icon: Building2,

    theme: {
      accent: "#C01F53",
      darkAccent: "#9C1240",
      soft: "bg-[#C01F53]/[0.07]",
      icon: "from-[#C01F53] to-[#9C1240]",
      text: "text-[#C01F53]",
      border: "hover:border-[#C01F53]/30",
      ring: "group-hover:ring-[#C01F53]/10",
      badge: "bg-[#C01F53]/10 text-[#C01F53]",
    },

    items: [
      {
        title: "Class 482",
        subtitle: "Temporary Skill Shortage Visa",
        description:
          "For skilled workers sponsored by an employer to fill an eligible position for a defined period.",
        icon: UserRound,
      },
      {
        title: "Class 186",
        subtitle: "Employer Nomination Scheme Visa",
        description:
          "For professional workers nominated by an employer for permanent employment in Australia.",
        icon: UsersRound,
      },
    ],
  },

  {
    id: 3,
    title: "Family Migration",
    description:
      "Australian citizens and permanent residents can sponsor eligible family members to join them.",
    icon: UsersRound,

    theme: {
      accent: "#631A33",
      darkAccent: "#9B2D55",
      soft: "bg-[#631A33]/[0.07]",
      icon: "from-[#631A33] to-[#9B2D55]",
      text: "text-[#631A33]",
      border: "hover:border-[#631A33]/30",
      ring: "group-hover:ring-[#631A33]/10",
      badge: "bg-[#631A33]/10 text-[#631A33]",
    },

    items: [
      {
        title: "Partner Visas",
        description:
          "For spouses or de facto partners of Australian citizens or permanent residents.",
        icon: Heart,
      },
      {
        title: "Parent Visas",
        description:
          "For eligible parents of Australian citizens or permanent residents.",
        icon: UsersRound,
      },
      {
        title: "Child Visas",
        description:
          "For dependent children of Australian citizens or permanent residents.",
        icon: UserRound,
      },
      {
        title: "Other Family Visas",
        description:
          "Explore additional pathways available for other eligible family members.",
        icon: UsersRound,
      },
    ],
  },
];

const AustraliaImmigrationPathways = () => {
  return (
    <section id="immigration-pathway"
      className="
        relative isolate overflow-hidden
        bg-white
        py-14 sm:py-16 lg:py- scroll-mt-24
      "
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-[#fff7fa]
            via-white
            to-[#f2f8ff]
          "
        />

        <div
          className="
            absolute -left-24 top-16
            h-64 w-64 rounded-full
            bg-primary/10 blur-3xl
            sm:h-80 sm:w-80
          "
        />

        <div
          className="
            absolute -right-24 top-0
            h-72 w-72 rounded-full
            bg-secondary/10 blur-3xl
            sm:h-96 sm:w-96
          "
        />

        <div
          className="
            absolute inset-0 opacity-[0.025]
            [background-image:radial-gradient(#0466AF_1px,transparent_1px)]
            [background-size:22px_22px]
            sm:[background-size:26px_26px]
          "
        />
      </div>

      <div
        className="
          mx-auto w-full max-w-[1500px]
          px-4 sm:px-6 lg:px-8 xl:px-10
        "
      >
        {/* Heading */}
        <header
          className="
            mx-auto mb-10 max-w-4xl
            text-center
            sm:mb-12
            lg:mb-14
          "
        >
          <div className="flex items-center justify-center gap-3">
            <span
              className="
                flex h-11 w-11
                items-center justify-center
                rounded-2xl
                bg-gradient-to-br
                from-darkPrimary to-primary
                text-white
                shadow-[0_12px_30px_rgba(99,26,51,0.25)]
                sm:h-14 sm:w-14
              "
            >
              <Route className="h-5 w-5 sm:h-7 sm:w-7" />
            </span>

            <h2
              className="
                text-left
                text-2xl font-bold
                leading-tight tracking-tight
                text-darkPrimary
                sm:text-3xl
                md:text-4xl
                lg:text-5xl
              "
            >
              Immigration Pathways
            </h2>
          </div>

          <p
            className="
              mx-auto mt-4 max-w-3xl
              text-sm leading-6
              text-slate-600
              sm:text-base sm:leading-7
              lg:text-lg
            "
          >
            Explore the best visa options to live, work and build your future
            in Australia.
          </p>

          <div className="mt-5 flex items-center justify-center gap-2">
            <span className="h-[3px] w-10 rounded-full bg-primary sm:w-16" />

            <span
              className="
                h-3 w-3 rounded-full
                bg-primary
                shadow-[0_0_0_5px_rgba(192,31,83,0.12)]
              "
            />

            <span className="h-[3px] w-10 rounded-full bg-primary sm:w-16" />
          </div>
        </header>

        {/* Groups */}
        <div
          className="
            grid grid-cols-1
            gap-6
            lg:grid-cols-2
            xl:grid-cols-3
            xl:items-stretch
            2xl:gap-8
          "
        >
          {pathwayGroups.map((group) => {
            const GroupIcon = group.icon;

            return (
              <article
                key={group.id}
                className="
                  group relative
                  flex min-w-0 flex-col
                  overflow-hidden
                  rounded-[26px]
                  border border-slate-200/80
                  bg-white/90
                  shadow-[0_20px_55px_rgba(15,23,42,0.08)]
                  backdrop-blur-xl
                  transition-all duration-500
                  hover:-translate-y-1.5
                  hover:border-white
                  hover:shadow-[0_28px_75px_rgba(15,23,42,0.14)]
                  sm:rounded-[30px]
                "
              >
                {/* Top accent */}
                <div
                  className="
                    absolute inset-x-0 top-0
                    h-1.5
                  "
                  style={{
                    background: `linear-gradient(90deg, ${group.theme.darkAccent}, ${group.theme.accent})`,
                  }}
                />

                {/* Glow */}
                <div
                  className="
                    pointer-events-none
                    absolute -right-20 -top-20
                    h-52 w-52 rounded-full
                    opacity-70 blur-3xl
                  "
                  style={{
                    backgroundColor: `${group.theme.accent}18`,
                  }}
                />

                {/* Header */}
                <div className="relative p-5 sm:p-6 lg:p-7">
                  <div
                    className="
                      flex items-start gap-4
                      rounded-2xl
                      border border-white/80
                      bg-white/70
                      p-4
                      shadow-[0_10px_30px_rgba(15,23,42,0.06)]
                      backdrop-blur-md
                      sm:p-5
                    "
                  >
                    <div
                      className={`
                        flex h-14 w-14 shrink-0
                        items-center justify-center
                        rounded-2xl
                        bg-gradient-to-br
                        ${group.theme.icon}
                        text-white
                        shadow-[0_12px_28px_rgba(15,23,42,0.16)]
                        transition-transform duration-500
                        group-hover:scale-105
                        group-hover:rotate-3
                        sm:h-16 sm:w-16
                      `}
                    >
                      <GroupIcon className="h-6 w-6 sm:h-7 sm:w-7" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span
                        className={`
                          inline-flex rounded-full
                          px-2.5 py-1
                          text-[10px] font-bold
                          uppercase tracking-[0.15em]
                          ${group.theme.badge}
                        `}
                      >
                        Pathway {String(group.id).padStart(2, "0")}
                      </span>

                      <h3
                        className="
                          mt-2 break-words
                          text-lg font-bold
                          leading-tight text-slate-950
                          sm:text-xl
                        "
                      >
                        {group.title}
                      </h3>
                    </div>
                  </div>

                  <p
                    className="
                      mt-5
                      text-sm leading-6
                      text-slate-600
                      sm:text-[15px]
                      sm:leading-7
                    "
                  >
                    {group.description}
                  </p>
                </div>

                {/* Visa cards */}
                <div
                  className="
                    flex flex-1 flex-col
                    gap-4
                    px-4 pb-5
                    sm:px-6 sm:pb-6
                    lg:px-7 lg:pb-7
                  "
                >
                  {group.items.map((item, itemIndex) => {
                    const ItemIcon = item.icon;

                    return (
                      <div
                        key={`${group.id}-${item.title}`}
                        className={`
                          group/item relative
                          overflow-hidden
                          rounded-2xl
                          border border-slate-200/90
                          bg-white
                          p-4
                          shadow-[0_8px_25px_rgba(15,23,42,0.055)]
                          ring-0
                          transition-all duration-300
                          hover:-translate-y-1
                          hover:shadow-[0_18px_40px_rgba(15,23,42,0.11)]
                          ${group.theme.border}
                          ${group.theme.ring}
                          sm:p-5
                        `}
                      >
                        {/* Hover background */}
                        <div
                          className="
                            pointer-events-none
                            absolute inset-0
                            opacity-0
                            transition-opacity duration-300
                            group-hover/item:opacity-100
                          "
                          style={{
                            background: `linear-gradient(135deg, ${group.theme.accent}0D, transparent 58%)`,
                          }}
                        />

                        <div
                          className="
                            relative flex
                            flex-col gap-4
                            min-[430px]:flex-row
                            min-[430px]:items-start
                          "
                        >
                          <div
                            className={`
                              flex h-12 w-12 shrink-0
                              items-center justify-center
                              rounded-2xl
                              bg-gradient-to-br
                              ${group.theme.icon}
                              text-white
                              shadow-[0_10px_24px_rgba(15,23,42,0.15)]
                              transition-all duration-300
                              group-hover/item:scale-105
                              sm:h-14 sm:w-14
                            `}
                          >
                            <ItemIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div
                              className="
                                flex items-start
                                justify-between gap-3
                              "
                            >
                              <div className="min-w-0">
                                <h4
                                  className={`
                                    break-words
                                    text-base font-bold
                                    leading-6
                                    ${group.theme.text}
                                    sm:text-[17px]
                                  `}
                                >
                                  {item.title}
                                </h4>

                                {item.subtitle && (
                                  <p
                                    className="
                                      mt-0.5
                                      text-xs font-semibold
                                      leading-5
                                      text-slate-700
                                      sm:text-[13px]
                                    "
                                  >
                                    {item.subtitle}
                                  </p>
                                )}
                              </div>

                              <span
                                className="
                                  flex h-8 w-8 shrink-0
                                  items-center justify-center
                                  rounded-full
                                  border border-slate-200
                                  bg-slate-50
                                  text-slate-400
                                  transition-all duration-300
                                  group-hover/item:rotate-12
                                  group-hover/item:border-transparent
                                  group-hover/item:text-white
                                "
                                style={{
                                  "--hover-bg": group.theme.accent,
                                }}
                              >
                                <ArrowUpRight
                                  className="
                                    h-4 w-4
                                    transition-transform duration-300
                                    group-hover/item:translate-x-0.5
                                    group-hover/item:-translate-y-0.5
                                  "
                                />
                              </span>
                            </div>

                            <p
                              className="
                                mt-2.5 break-words
                                text-[13px] leading-5
                                text-slate-600
                                sm:text-sm
                                sm:leading-6
                              "
                            >
                              {item.description}
                            </p>

                            <div
                              className="
                                mt-3 flex items-center
                                gap-2
                                text-[11px] font-semibold
                                text-slate-500
                              "
                            >
                              <span
                                className={`
                                  flex h-5 w-5
                                  items-center justify-center
                                  rounded-full
                                  ${group.theme.soft}
                                  ${group.theme.text}
                                `}
                              >
                                <Check className="h-3 w-3" />
                              </span>

                              Visa option {itemIndex + 1}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Bottom decoration */}
                <div
                  className="
                    pointer-events-none
                    absolute bottom-0 right-0
                    h-24 w-24
                    translate-x-8 translate-y-8
                    rounded-full
                    opacity-40 blur-2xl
                  "
                  style={{
                    backgroundColor: `${group.theme.accent}22`,
                  }}
                />
              </article>
            );
          })}
        </div>
      </div>

      <style>
        {`
          .group\\/item:hover span[style*="--hover-bg"] {
            background-color: var(--hover-bg);
          }
        `}
      </style>
    </section>
  );
};

export default AustraliaImmigrationPathways;