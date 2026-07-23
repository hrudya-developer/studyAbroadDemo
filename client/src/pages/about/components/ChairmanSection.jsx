import {
  ArrowUpRight,
  Award,
  Building2,
  Globe2,
  GraduationCap,
  Plane,
  Quote,
  Sparkles,
  UsersRound,
} from "lucide-react";

import chairmanImage from "../images/chairmanPic.webp";
import {Link} from "react-router-dom";

const principles = [
  {
    icon: GraduationCap,
    title: "Quality Learning",
    description: "Industry-focused training",
  },
  {
    icon: Globe2,
    title: "Global Readiness",
    description: "Skills for international success",
  },
  {
    icon: Sparkles,
    title: "Personal Mentorship",
    description: "Guidance at every stage",
  },
];

const ChairmanSection = () => {
  return (
    <section
      className="
        relative isolate overflow-hidden
        px-4 py-14
        sm:px-6 sm:py-18
        lg:px-8 lg:py-24
      "
    >
      <SectionBackground />

      <div
        className="
          relative mx-auto max-w-[1500px]
          overflow-hidden rounded-[30px]
          border border-white/10
          bg-gradient-to-br
          from-[#a70f46]
          via-darkPrimary
          to-[#071f5c]
          shadow-[0_35px_90px_rgba(49,20,72,0.3)]
          sm:rounded-[40px]
        "
      >
        <CardPatterns />

        <div
          className="
            relative z-10 grid
            items-stretch
            lg:grid-cols-[0.43fr_0.57fr]
          "
        >
          <ChairmanVisual />
          <ChairmanMessage />
        </div>
      </div>
    </section>
  );
};

const ChairmanVisual = () => {
  return (
    <div
      className="
        relative flex min-h-[500px]
        items-center justify-center
        overflow-hidden
        px-5 py-10
        sm:min-h-[590px]
        sm:px-8 sm:py-12
        lg:min-h-[720px]
        lg:px-6 lg:py-14
      "
    >
      <PortraitBackground />

      {/* Large decorative quote */}
      <div
        aria-hidden="true"
        className="
          absolute left-5 top-5 z-20
          font-serif text-[78px] font-black
          leading-none text-logoYellow/90
          sm:left-8 sm:top-7 sm:text-[105px]
        "
      >
        “
      </div>

      {/* Leadership label */}
      <div
        className="
          absolute right-4 top-7 z-30
          hidden items-center gap-2
          rounded-full
          border border-white/15
          bg-white/10 px-4 py-2
          text-xs font-bold text-white/90
          shadow-[0_12px_30px_rgba(0,0,0,0.14)]
          backdrop-blur-xl
          sm:flex
        "
      >
        <Sparkles className="h-4 w-4 text-logoYellow" />
        Inspiring Leadership
      </div>

      {/* Chairman portrait wrapper */}
      <div
        className="
          relative z-20
          flex h-full w-full
          items-center justify-center
        "
      >
        {/* Soft glow only—no circles */}
        <div
          aria-hidden="true"
          className="
            pointer-events-none
            absolute left-1/2 top-1/2
            h-[62%] w-[68%]
            -translate-x-1/2 -translate-y-1/2
            rounded-[44%_56%_51%_49%/54%_43%_57%_46%]
            bg-gradient-to-br
            from-logoYellow/14
            via-white/[0.05]
            to-secondary/18
            blur-3xl
          "
        />

        <img
          src={chairmanImage}
          alt="Rahul Chakrapani, Chairman of Medcity International Academy"
          className="
            relative z-10 rounded-4xl
            max-h-[390px] w-full
            object-contain object-center
            drop-shadow-[0_30px_45px_rgba(0,0,0,0.34)]
            sm:max-h-[480px]
            lg:max-h-[590px]
          "
        />
      </div>

   


      {/* Chairman identity */}
      <div
        className="
          absolute bottom-5 left-1/2 z-40
          w-[calc(100%-2rem)]
          max-w-[390px]
          -translate-x-1/2
          rounded-2xl border border-white/15
          bg-[#07162f]/50
          px-5 py-4
          text-center
          shadow-[0_18px_45px_rgba(0,0,0,0.25)]
          backdrop-blur-xl
          sm:bottom-7
        "
      >
        <p
          className="
            font-nunito text-xl font-black
            text-logoYellow sm:text-2xl
          "
        >
          Rahul Chakrapani
        </p>

        <p className="mt-1 text-xs font-semibold text-white/75">
          Chairman, Medcity International Academy
        </p>

        <div className="mx-auto mt-3 flex items-center justify-center gap-2">
          <span className="h-px w-10 bg-white/20" />
          <Quote className="h-3.5 w-3.5 text-logoYellow" />
          <span className="h-px w-10 bg-white/20" />
        </div>
      </div>
    </div>
  );
};

const PortraitBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute inset-0 overflow-hidden
      "
    >
      {/* Soft left glow */}
      <div
        className="
          absolute -left-24 top-1/3
          h-72 w-72
          rounded-full bg-logoYellow/10
          blur-3xl
        "
      />

      {/* Soft lower blue glow */}
      <div
        className="
          absolute -bottom-20 right-0
          h-80 w-80
          rounded-full bg-secondary/15
          blur-3xl
        "
      />

      {/* Subtle vertical light behind portrait */}
      <div
        className="
          absolute left-1/2 top-1/2
          h-[72%] w-[58%]
          -translate-x-1/2 -translate-y-1/2
          rounded-[40px]
          bg-gradient-to-b
          from-white/[0.07]
          via-white/[0.025]
          to-transparent
          blur-xl
        "
      />

      {/* Vertical decorative line */}
      <div
        className="
          absolute bottom-36 left-4
          hidden items-center gap-3
          lg:flex
        "
      >
        <span className="h-20 border-l border-dashed border-white/20" />

        <span
          className="
            -rotate-90 whitespace-nowrap
            text-[9px] font-extrabold
            uppercase tracking-[0.3em]
            text-white/25
          "
        >
          Believe · Learn · Achieve
        </span>
      </div>

      {/* Dots */}
      <div
        className="
          absolute bottom-24 right-4
          h-28 w-28 opacity-15
          [background-image:radial-gradient(#ffffff_1.2px,transparent_1.2px)]
          [background-size:12px_12px]
        "
      />

      {/* Plane path */}
      <svg
        viewBox="0 0 340 240"
        className="
          absolute right-0 top-20
          hidden h-60 w-72
          text-logoYellow/14
          sm:block
        "
        fill="none"
      >
        <path
          d="M15 208C73 144 132 170 166 105C201 38 267 68 325 18"
          stroke="currentColor"
          strokeWidth="2"
          strokeDasharray="7 9"
          strokeLinecap="round"
        />
      </svg>

      <Plane
        className="
          absolute right-6 top-16
          hidden h-6 w-6
          -rotate-12 text-logoYellow/30
          sm:block
        "
      />
    </div>
  );
};

const ChairmanMessage = () => {
  return (
    <div
      className="
        relative flex flex-col justify-center
        border-t border-white/10
        px-6 py-10
        text-white
        sm:px-10 sm:py-14
        lg:border-l lg:border-t-0
        lg:px-14 lg:py-16
        xl:px-18 xl:py-20
      "
    >
      <div
        className="
          inline-flex w-fit items-center gap-2
          rounded-full
          border border-logoYellow/25
          bg-logoYellow/10
          px-4 py-2
          text-[10px] font-extrabold
          uppercase tracking-[0.18em]
          text-logoYellow
          sm:text-xs
        "
      >
        <Award className="h-4 w-4" />
        A Message From Our Chairman
      </div>

      <h2
        className="
          mt-6 max-w-3xl
          font-nunito
          text-3xl font-bold
          leading-[1.08]
          tracking-[-0.025em]
          text-white
          sm:text-4xl
          lg:text-5xl
        "
      >
        Let&apos;s Shape Your{" "}
        <span
          className="
            bg-gradient-to-r
            from-logoYellow
            via-white
            to-[#8cc8ff]
            bg-clip-text
            text-transparent
          "
        >
          Global Future
        </span>
        , Together.
      </h2>

      <div className="mt-5 flex items-center gap-2">
        <span className="h-1 w-14 rounded-full bg-logoYellow" />
        <span className="h-1 w-8 rounded-full bg-white/50" />
        <span className="h-1 w-4 rounded-full bg-secondary" />
      </div>

      <blockquote
        className="
          relative mt-7 max-w-3xl
          border-l-2 border-logoYellow/70
          pl-5
          text-sm leading-7
          text-white/85
          sm:text-base sm:leading-8
        "
      >
        At Medcity, every programme is built on three principles:
        quality learning, personal mentorship and real-world readiness.
      </blockquote>

      <p
        className="
          mt-5 max-w-3xl
          text-sm leading-7
          text-white/75
          sm:text-base sm:leading-8
        "
      >
        Whether you are taking your first step in language learning or
        preparing for advanced licensure, our team is here to guide you
        with expert support, practical training and personal attention at
        every stage.
      </p>

      <div
        className="
          mt-8 grid gap-3
          sm:grid-cols-3
        "
      >
        {principles.map((item) => (
          <PrincipleCard
            key={item.title}
            {...item}
          />
        ))}
      </div>

      <div
        className="
          mt-9 flex flex-col gap-5
          border-t border-white/10
          pt-7
          sm:flex-row sm:items-end
          sm:justify-between
        "
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/50">
            With warm regards
          </p>

          <p className="mt-2 font-nunito text-2xl font-black text-logoYellow">
            Rahul Chakrapani
          </p>

          <p className="mt-1 text-xs font-semibold text-white/65">
            Chairman, Medcity International Academy
          </p>
        </div>

        <Link to="/contact"
          className="
            group inline-flex min-h-[48px]
            items-center justify-center gap-2
            rounded-xl
            bg-white px-5 py-3
            text-sm font-extrabold
            text-darkPrimary
            shadow-[0_14px_30px_rgba(0,0,0,0.16)]
            transition-all duration-300
            hover:-translate-y-0.5
            hover:bg-logoYellow
            focus-visible:outline-none
            focus-visible:ring-4
            focus-visible:ring-white/20
          "
        >
          Start Your Journey

          <ArrowUpRight
            className="
              h-4 w-4
              transition-transform duration-300
              group-hover:-translate-y-0.5
              group-hover:translate-x-0.5
            "
          />
        </Link>
      </div>

      <div
        className="
          pointer-events-none absolute
          bottom-5 right-6
          hidden items-center gap-2
          text-white/20
          xl:flex
        "
      >
        <span className="w-24 border-t border-dashed border-white/30" />
        <Plane className="h-6 w-6 -rotate-12" />
      </div>
    </div>
  );
};

const PrincipleCard = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div
      className="
        group rounded-2xl
        border border-white/10
        bg-white/[0.06]
        p-4
        backdrop-blur-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:border-logoYellow/25
        hover:bg-white/[0.1]
      "
    >
      <span
        className="
          flex h-10 w-10
          items-center justify-center
          rounded-xl
          bg-white/10
          text-logoYellow
          transition-transform duration-300
          group-hover:scale-110
        "
      >
        <Icon className="h-5 w-5" />
      </span>

      <p className="mt-3 text-sm font-extrabold text-white">
        {title}
      </p>

      <p className="mt-1 text-xs leading-5 text-white/60">
        {description}
      </p>
    </div>
  );
};

const CardPatterns = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="
          absolute -left-24 -top-24
          h-72 w-72 rounded-full
          bg-logoYellow/10 blur-3xl
        "
      />

      <div
        className="
          absolute -bottom-32 right-10
          h-96 w-96 rounded-full
          bg-secondary/20 blur-3xl
        "
      />

      <div
        className="
          absolute inset-0 opacity-[0.07]
          [background-image:radial-gradient(#ffffff_1px,transparent_1px)]
          [background-size:20px_20px]
        "
      />

      <div
        className="
          absolute -right-24 top-10
          h-72 w-72 rounded-full
          border border-white/10
        "
      />

      <div
        className="
          absolute -right-10 top-24
          h-52 w-52 rounded-full
          border border-white/10
        "
      />
    </div>
  );
};

const SectionBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div
        className="
          absolute -left-28 top-10
          h-80 w-80 rounded-full
          bg-primary/[0.06] blur-3xl
        "
      />

      <div
        className="
          absolute -right-32 bottom-0
          h-96 w-96 rounded-full
          bg-secondary/[0.07] blur-3xl
        "
      />

      <div
        className="
          absolute left-6 top-12
          h-32 w-32 opacity-20
          [background-image:radial-gradient(#c01f53_1.3px,transparent_1.3px)]
          [background-size:12px_12px]
        "
      />
    </div>
  );
};

export default ChairmanSection;