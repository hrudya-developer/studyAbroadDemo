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

const programs = [
  {
    title: "IELTS",
    desc: "World's most popular English language test for study, work and migration.",
    icon: Globe,
    color: "red",
  },
  {
    title: "OET",
    desc: "English test designed for healthcare professionals worldwide.",
    icon: Stethoscope,
    color: "blue",
  },
  {
    title: "PTE",
    desc: "Fast computer-based English proficiency test accepted globally.",
    icon: Monitor,
    color: "red",
  },
  {
    title: "German A1 & A2",
    desc: "Build strong German language foundations for study and work.",
    icon: GraduationCap,
    color: "blue",
  },
  {
    title: "DHA",
    desc: "Gateway examination for healthcare professionals in Dubai.",
    icon: Award,
    color: "red",
  },
  {
    title: "Prometric",
    desc: "Global assessment provider for healthcare professionals.",
    icon: BookOpen,
    color: "blue",
  },
  {
    title: "NCLEX-RN",
    desc: "Licensure exam for registered nurses in the USA and Canada.",
    icon: Stethoscope,
    color: "red",
  },
  {
    title: "CBT",
    desc: "Computer-based testing solutions for healthcare certifications.",
    icon: Monitor,
    color: "blue",
  },
];

export default function LanguagePrograms() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white py-16 md:py-24 max-w-7xl mx-auto">
      {/* Background Decorations */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-red-500/5 blur-3xl" />
      <div className="absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-blue-900/5 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-4xl text-center" data-aos="fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-100 bg-red-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-red-600">
            Our Language Programs
          </span>

          <h2 className="mt-6 text-4xl font-bold leading-tight text-darkPrimary md:text-5xl lg:text-5xl font-nunito" data-aos="fade-up">
            Empowering You To{" "}
            <span className="text-primary">Communicate Globally</span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-base text-slate-600 md:text-lg" data-aos="fade-up">
            Industry-focused language and healthcare certification programs
            designed to help you achieve your global education, migration and
            career goals.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4" data-aos="fade-up">
          {programs.map((program, index) => {
            const Icon = program.icon;

            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* Corner Accent */}
                <div
                  className={`absolute left-0 top-0 h-16 w-16 ${
                    program.color === "red"
                      ? "bg-primary"
                      : "bg-secondary"
                  }`}
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 0 100%)",
                  }}
                />

                <div
                  className={`mb-6 flex h-20 w-20 items-center justify-center mx-auto rounded-full ${
                    program.color === "red"
                      ? "bg-red-50"
                      : "bg-blue-50"
                  }`}
                >
                  <Icon
                    size={38}
                    className={
                      program.color === "red"
                        ? "text-primary"
                        : "text-secondary"
                    }
                  />
                </div>

                <h3 className="text-lg font-bold text-secondary text-center">
                  {program.title}
                </h3>

                <div
                  className={`mt-3 h-1 w-12 rounded-full mx-auto ${
                    program.color === "red"
                      ? "bg-primary"
                      : "bg-secondary"
                  }`}
                />

                <p className="mt-4 text-sm leading-7 text-slate-600 text-center">
                  {program.desc}
                </p>

                {/* <button
                  className={`mt-6 flex items-center gap-2 text-sm font-bold ${
                    program.color === "red"
                      ? "text-primary"
                      : "text-secondary"
                  }`}
                >
                  Learn More
                  <ArrowRight
                    size={16}
                    className="transition group-hover:translate-x-1"
                  />
                </button> */}
              </div>
            );
          })}

          {/* Featured CTA Card */}
          {/* <div className="sm:col-span-2 xl:col-span-2 overflow-hidden rounded-3xl bg-secondary p-8 text-white shadow-2xl">
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
                  <Globe size={32} />
                </div>

                <h3 className="mt-6 text-3xl font-bold">
                  Your Global Future
                  <span className="text-primary"> Starts Here</span>
                </h3>

                <p className="mt-4 max-w-lg text-white/80">
                  Expert guidance, structured training and proven strategies to
                  help you succeed in your chosen pathway.
                </p>
              </div>

              <button className="mt-8 flex w-fit items-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-white transition hover:opacity-90">
                Explore Programs
                <ArrowRight size={18} />
              </button>
            </div>
          </div> */}
        </div>

        {/* Bottom Features */}
        <div className="mt-14 grid gap-6 rounded-3xl border border-slate-100 bg-secondary p-6 shadow-lg md:grid-cols-4">
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
    <div className="flex items-start gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-white">
        <Icon size={22} />
      </div>

      <div>
        <h4 className="font-bold text-white">{title}</h4>
        <p className="mt-1 text-sm text-white">{desc}</p>
      </div>
    </div>
  );
}