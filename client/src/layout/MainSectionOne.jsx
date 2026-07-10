import {
  Search,
  GraduationCap,
  FileText,
  Plane,
  Star,
} from "lucide-react";

const services = [
  {
    number: "01",
    title: "Find Universities",
    desc: "Discover top universities worldwide.",
    icon: Search,
    color: "text-secondary",
    cardBg: "bg-secondary/20",
    iconBg: "bg-white",
    // border: "border-primary/20",
    line: "bg-secondary",
  },
  {
    number: "02",
    title: "Scholarships",
    desc: "Find scholarships & financial assistance.",
    icon: GraduationCap,
    color: "text-red-600",
    cardBg: "bg-red-100",
    iconBg: "bg-white",
    // border: "border-rose-200",
    line: "bg-red-500",
  },
  {
    number: "03",
    title: "Visa Guidance",
    desc: "Get expert help for visa process.",
    icon: FileText,
    color: "text-violet-600",
    cardBg: "bg-violet-100",
    iconBg: "bg-white",
    // border: "border-violet-200",
    line: "bg-violet-500",
  },
  {
    number: "04",
    title: "Pre-Departure",
    desc: "Get ready for your journey abroad.",
    icon: Plane,
    color: "text-pink-600",
    cardBg: "bg-pink-100",
    iconBg: "bg-white",
    // border: "border-amber-200",
    line: "bg-pink-500",
  },
];

export default function EssentialServices() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-rose-200/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center uppercase gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-bold text-primary shadow-sm">
            <Star size={16} className="fill-primary" />
            Your Global Education Partner
          </div>

          <h2 className="text-3xl font-bold leading-tight text-darkPrimary sm:text-3xl md:text-4xl lg:text-5xl">
            Everything You Need, All in{" "}
            <span className="text-primary">One</span> Place
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-600 sm:text-base md:text-lg">
            From shortlisting to visa guidance — we&apos;re with you at every
            step.
          </p>

          <div className="mx-auto mt-5 h-1.5 w-16 rounded-full bg-primary" />
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {services.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.number}
                className={`group relative overflow-hidden rounded-3xl ${item.cardBg} p-6 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl sm:p-7`}
              >
                <div className="absolute -right-12 -top-12 z-0 h-32 w-32 rounded-full bg-white/70 transition-all duration-300 group-hover:bg-white" />
                <div className="absolute -bottom-16 -left-16 z-0 h-36 w-36 rounded-full bg-white/40" />

                <div className="absolute right-5 top-4 z-20 text-xl font-black text-darkPrimary/80 transition-colors duration-300 group-hover:text-primary">
                  {item.number}
                </div>

                <div
                  className={`relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full ${item.iconBg} ${item.color} shadow-sm transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon size={30} strokeWidth={2.2} />
                </div>

                <h3 className="relative z-10 text-xl font-extrabold text-slate-950">
                  {item.title}
                </h3>

                <p className="relative z-10 mx-auto mt-3 max-w-[230px] text-sm leading-6 text-gray-600">
                  {item.desc}
                </p>

                <div
                  className={`relative z-10 mx-auto mt-6 h-1 w-12 rounded-full ${item.line}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}