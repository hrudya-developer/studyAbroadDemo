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

export default function SDBLanguagePrograms() {
  return (
    <div className="w-full">
      
      {/* TITLE */}
      <h1 className="text-lg sm:text-xl text-center font-extrabold mt-10 mb-5 text-secondary">
        Our Language Programs
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {programs.map((program, index) => {
          const Icon = program.icon;

          return (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-sm hover:shadow-md transition"
            >
              {/* TOP CORNER ACCENT */}
              <div
                className={`absolute left-0 top-0 h-12 w-12 ${
                  program.color === "red"
                    ? "bg-primary"
                    : "bg-secondary"
                }`}
                style={{
                  clipPath: "polygon(0 0, 100% 0, 0 100%)",
                }}
              />

              {/* ICON */}
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${
                  program.color === "red"
                    ? "bg-red-50"
                    : "bg-blue-50"
                }`}
              >
                <Icon
                  size={26}
                  className={
                    program.color === "red"
                      ? "text-primary"
                      : "text-secondary"
                  }
                />
              </div>

              {/* TITLE */}
              <h3 className="text-sm sm:text-sm font-bold text-secondary leading-snug">
                {program.title}
              </h3>

              {/* UNDERLINE */}
              <div
                className={`mt-2 h-1 w-10 rounded-full ${
                  program.color === "red"
                    ? "bg-primary"
                    : "bg-secondary"
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

