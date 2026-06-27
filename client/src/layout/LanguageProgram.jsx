import {
  Globe,
  GraduationCap,
  BookOpen,
  Headphones,
  ArrowRight,
  Award,
  Monitor,
  Stethoscope,
} from "lucide-react";
import { Link } from "react-router-dom";

const programs = [
  {
    title: "German Language",
    desc: "Learn German from A1 to B2 with CEFR-based training, speaking practice, Goethe/TELC exam preparation and Germany pathway guidance.",
    icon: GraduationCap,
    color: "blue",
    link:"/germanLanguage"
  },
  {
    title: "IELTS",
    desc: "Prepare for IELTS Academic and General Training with mock tests, speaking practice, writing correction and band score improvement support.",
    icon: Globe,
    color: "red",
  },
  {
    title: "OET",
    desc: "Join OET coaching for nurses, doctors and pharmacists with writing correction, speaking role-play practice and computerised test support.",
    icon: Stethoscope,
    color: "blue",
  },
  {
    title: "PTE",
    desc: "Get PTE Academic and PTE Core coaching with AI-evaluated mock tests, speaking and writing feedback and exam booking guidance.",
    icon: Monitor,
    color: "red",
  },
  {
    title: "DHA / HAAD / MOH",
    desc: "Prepare for DHA, Prometric, HAAD and MOH healthcare exams with structured training for Gulf career opportunities.",
    icon: Award,
    color: "blue",
  },
  {
    title: "NCLEX-RN",
    desc: "Build NCLEX-RN exam readiness with nursing concept review, practice questions, test strategies and international nursing career guidance.",
    icon: Stethoscope,
    color: "red",
  },
];

export default function LanguagePrograms() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-white py-16 md:py-24">
      <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -right-28 top-1/3 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute bottom-10 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-logoYellow/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/10 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-primary">
            Our Language Programs
          </span>

          <h2
            className="mt-6 font-nunito text-3xl font-extrabold leading-tight text-darkPrimary sm:text-4xl md:text-5xl"
            data-aos="fade-up"
          >
            Empowering You To{" "}
            <span className="text-primary">Communicate Globally</span>
          </h2>

          <p
            className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base md:text-lg"
            data-aos="fade-up"
          >
            Industry-focused language and healthcare certification programs
            designed to help you achieve your global education, migration and
            career goals.
          </p>
        </div>

        <div
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          data-aos="fade-up"
        >
          {programs.map((program, index) => {
            const Icon = program.icon;
            const isRed = program.color === "red";

            return (
              <div
                key={index}
                className="group relative flex min-h-[330px] flex-col overflow-hidden rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-2 hover:border-primary/20 hover:shadow-[0_30px_80px_rgba(192,31,83,0.18)]"
              >
                <div
                  className={`absolute inset-x-0 top-0 h-1.5 ${
                    isRed ? "bg-primary" : "bg-secondary"
                  }`}
                />

                <div
                  className={`absolute -right-12 -top-12 h-32 w-32 rounded-full transition-all duration-500 group-hover:scale-125 ${
                    isRed ? "bg-primary/10" : "bg-secondary/10"
                  }`}
                />

                <div
                  className={`absolute -bottom-16 -left-16 h-36 w-36 rounded-full transition-all duration-500 group-hover:scale-125 ${
                    isRed ? "bg-primary/5" : "bg-secondary/5"
                  }`}
                />

                <div className="relative z-10 flex flex-1 flex-col">
                  <div
                    className={`mx-auto flex h-20 w-20 items-center justify-center rounded-3xl shadow-inner transition-all duration-500 group-hover:rotate-3 group-hover:scale-105 ${
                      isRed
                        ? "bg-primary/10 text-primary"
                        : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    <Icon size={38} strokeWidth={2.2} />
                  </div>

                  <h3 className="mt-6 text-center text-xl font-extrabold text-darkPrimary">
                    {program.title}
                  </h3>

                  <div
                    className={`mx-auto mt-3 h-1 w-12 rounded-full ${
                      isRed ? "bg-primary" : "bg-secondary"
                    }`}
                  />

                  <p className="mt-5 flex-1 text-center text-sm leading-7 text-slate-600">
                    {program.desc}
                  </p>

                 <div>
                 <Link to={program.link}>
                 <button
                    type="button"
                    className={`mx-auto mt-6 flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-bold text-white shadow-lg transition-all duration-300 hover:gap-3 ${
                      isRed
                        ? "bg-primary shadow-primary/20"
                        : "bg-secondary shadow-secondary/20"
                    }`}
                  >
                    Learn More
                    <ArrowRight
                      size={16}
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </button></Link> </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-14 grid gap-5 rounded-[30px] bg-gradient-to-r from-darkPrimary via-primary to-secondary p-6 shadow-[0_25px_80px_rgba(99,26,51,0.25)] md:grid-cols-4">
          <Feature
            icon={GraduationCap}
            title="Expert Trainers"
            desc="Certified instructors with industry experience."
          />
          <Feature
            icon={BookOpen}
            title="Updated Materials"
            desc="Latest resources and practice tests."
          />
          <Feature
            icon={Award}
            title="Proven Results"
            desc="Thousands of successful students."
          />
          <Feature
            icon={Headphones}
            title="Continuous Support"
            desc="Guidance throughout your journey."
          />
        </div>
      </div>
    </section>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="flex items-start gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/15">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-primary shadow-lg">
        <Icon size={22} />
      </div>

      <div>
        <h4 className="font-bold text-white">{title}</h4>
        <p className="mt-1 text-sm leading-6 text-white/80">{desc}</p>
      </div>
    </div>
  );
}