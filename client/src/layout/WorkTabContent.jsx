import {
  BriefcaseBusiness,
  Globe2,
  Users,
} from "lucide-react";

const workData = [
  {
    id: "international-destinations",
    icon: Globe2,
    title: "International Work Destinations",
    description:"Explore study abroad destinations where international students can gain valuable work experience while they learn.",
    color: "text-primary",
    border: "from-primary to-red-400",
    background: "bg-pink-50",
  },
  {
    id: "in-demand-jobs",
    icon: BriefcaseBusiness,
    title: "In-Demand Job Opportunities",
    description:
      "Explore high-demand industries and part-time job opportunities that can support your studies and help build your career abroad.",
    color: "text-secondary",
    border: "from-secondary to-blue-500",
    background: "bg-blue-50",
  },
  {
    id: "cultural-exchange",
    icon: Users,
    title: "Cultural Exchange and Networking",
    description:
      "Build a global professional network, gain international work experience, and develop skills valued by employers worldwide.",
    color: "text-primary",
    border: "from-primary to-red-400",
    background: "bg-rose-50",
  },
];

const WorkTabContent = () => {
  return (
    <section
      aria-labelledby="work-opportunities-heading"
      className="
        overflow-hidden
        bg-gradient-to-b
        from-white
        to-gray-100
        py-10
      "
    >
      <div className="mx-auto max-w-7xl px-3 sm:px-5 md:px-8">
        <header className="mx-auto max-w-4xl text-center">
          <div
            aria-hidden="true"
            className="mb-5 flex items-center justify-center gap-4"
          >
            <div className="h-[2px] w-16 bg-primary sm:w-24" />

            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border
                border-primary
                text-primary
              "
            >
              <BriefcaseBusiness className="h-6 w-6" />
            </div>

            <div className="h-[2px] w-16 bg-primary sm:w-24" />
          </div>

          <p
            className="
              text-xs
              font-semibold
              uppercase
              tracking-[0.14em]
              text-primary bg-secondary/8 p-2 px-3 rounded-full inline-block
            "
          >
            Study and Work Abroad
          </p>

          <h2
            id="work-opportunities-heading"
            className="
              mt-3
              text-3xl
              font-bold
              leading-tight
              text-darkPrimary
              sm:text-4xl
            "
          >
            International Job Opportunities for <br />
            <span className="text-primary">
              
               Study Abroad Students
            </span>
          </h2>

          <div
            aria-hidden="true"
            className="
              mx-auto
              mt-5
              h-1
              w-20
              rounded-full
              bg-primary
            "
          />

          <p
            className="
              mx-auto
              mt-8
              max-w-4xl
              text-sm
              leading-7
              text-slate-800
              sm:text-base
              md:text-lg
              md:leading-8
            "
          >
           Studying abroad offers more than an international degree. Many countries provide part-time work opportunities, post-study work pathways, and hands-on industry experience that help students manage expenses and build global career prospects.
          </p>
        </header>

        <div
          className="
            mt-16
            grid
            grid-cols-1
            gap-8
            md:grid-cols-2
            lg:grid-cols-3
          "
        >
          {workData.map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.id}
                aria-labelledby={`${item.id}-heading`}
                className="
                  group
                  relative
                  mx-auto
                  w-full
                  max-w-[420px]
                  overflow-hidden
                  rounded-[32px]
                  bg-white
                  p-8
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-2xl
                  lg:max-w-none
                "
              >
                <div className="flex justify-center">
                  <div
                    aria-hidden="true"
                    className={`
                      relative
                      flex
                      h-28
                      w-28
                      items-center
                      justify-center
                      rounded-full
                      ${item.background}
                    `}
                  >
                    <Icon
                      className={`h-10 w-10 ${item.color}`}
                      strokeWidth={1.8}
                    />

                    <div
                      className="
                        absolute
                        inset-0
                        animate-spin
                        rounded-full
                        border-2
                        border-dashed
                        border-primary/30
                        [animation-duration:12s]
                        motion-reduce:animate-none
                      "
                    />
                  </div>
                </div>

                <h3
                  id={`${item.id}-heading`}
                  className="
                    mt-8
                    text-center
                    text-xl
                    font-extrabold
                    text-black/90
                  "
                >
                  {item.title}
                </h3>

                <div
                  aria-hidden="true"
                  className="
                    mx-auto
                    mt-5
                    h-1
                    w-24
                    rounded-full
                    bg-primary
                  "
                />

                <p
                  className="
                    mt-6
                    text-center
                    text-sm
                    leading-7
                    text-slate-800
                    sm:text-base
                    md:text-base lg:text-base
                    sm:leading-8
                  "
                >
                  {item.description}
                </p>

                <div
                  aria-hidden="true"
                  className={`
                    absolute
                    bottom-0
                    left-0
                    h-3
                    w-full
                    bg-gradient-to-r
                    ${item.border}
                  `}
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WorkTabContent;