import {
  Lightbulb,
  MapPin,
  FileEdit,
  Mail,
  Briefcase,
  Plane,
  Headphones,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import candidate_2 from "../assets/candidate_2.png";
import ButtonPrimary from "../components/ButtonPrimary";
import { ScrollToCounselling } from "./ScrollToCounselling";

const steps = [
  {
    id: "01",
    title: "Why study abroad?",
    desc: "Explore the benefits of studying abroad and how it shapes your future.",
    icon: Lightbulb,
  },
  {
    id: "02",
    title: "Where and what to study?",
    desc: "Find the right country, university and program that match your goals.",
    icon: MapPin,
  },
  {
    id: "03",
    title: "How do I apply?",
    desc: "Know the application process, required documents and key timelines.",
    icon: FileEdit,
  },
  {
    id: "04",
    title: "After receiving an offer",
    desc: "Review your offer, accept and complete the next steps.",
    icon: Mail,
  },
  {
    id: "05",
    title: "Prepare to depart",
    desc: "Plan your finances, arrange documents and get ready for your journey.",
    icon: Briefcase,
  },
  {
    id: "06",
    title: "Arrive and thrive",
    desc: "Get settled, adapt to your new environment and make the most of your experience.",
    icon: Plane,
  },
];

export default function SASteps() {
  return (
    <section className="w-full h-auto mb-20">
      <div className="relative max-w-7xl px-4 sm:px-5 md:px-8 flex justify-center mx-auto mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-8 p-6 sm:p-8 lg:p-12 xl:p-14">
          {/* Left Section */}
          <div className="relative flex min-h-[760px] flex-col items-center lg:items-left" data-aos="fade-up">
            <div className="relative z-20 max-w-xl">
              <p className="text-sm font-extrabold uppercase tracking-wide text-primary">
                Study Abroad
              </p>
              <div className="mt-3 h-1 w-14 rounded-full bg-primary" />

           <h1 className="font-nunito font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-center lg:text-left text-darkPrimary mt-5">
                Your Path to <br />
                Global <br />
                <span className="bg-gradient-to-r
        from-primary
        to-secondary
        bg-clip-text
        text-transparent">Education</span>
              </h1>

              <p className="mt-5 text-base leading-relaxed text-black sm:text-lg text-center lg:text-left">
                Begin your study abroad journey with confidence. From choosing the
  right destination and university to managing applications, visas, and
  travel preparations, this guide walks you through every important step
  to help you achieve your global education goals smoothly and successfully.
              </p>
            </div>

            {/* Student Visual */}
            <div className="relative z-10 mt-auto flex flex-1 items-end justify-center pt-3 lg:justify-start">
             

              <img
                src={candidate_2}
                alt="Student holding notebooks"
                className="relative z-20 mb-[70px] w-[360px] max-w-[92%] object-contain sm:w-[440px] lg:w-[490px]"
              />
            </div>

            {/* CTA Card */}
            <div className="absolute bottom-0 left-0 right-0 z-30 rounded-[26px] bg-darkPrimary p-5 shadow-2xl sm:p-6 lg:left-0 lg:right-auto lg:w-[96%]">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                 

                  <div>
                    <h3 className="text-sm font-bold text-logoYellow">
                      Need guidance?
                    </h3>
                    <p className="mt-1 max-w-[260px] text-sm leading-relaxed text-white">
                      Our experts are here to help you every step of the way.
                    </p>
                  </div>
                </div>

                {/* <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-red-700 sm:shrink-0">
                  Talk to an Advisor
                  <ArrowRight size={18} />
                </button> */}
             <button
  type="button"
  onClick={ScrollToCounselling}
  className="p-3 rounded-xl border border-logoYellow grid place-content-center text-logoYellow transition-all duration-300 hover:cursor-pointer hover:border-white hover:bg-logoYellow hover:text-darkPrimary"
>
  Talk to an advisor
</button>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="relative flex items-center" data-aos="fade-up">
            <div className="absolute left-3 top-8 bottom-8 hidden w-px bg-[#001b66]/20 lg:block" />

            <div className="w-full space-y-5 lg:pl-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isRed = index % 2 === 1;

                return (
                  <div key={step.id} className="relative lg:pl-0">
                    <span
                      className={`absolute -left-[34px] top-1/2 hidden h-4 w-4 -translate-y-1/2 rounded-full ring-8 ring-white lg:block ${
                        isRed ? "bg-primary" : "bg-secondary"
                      }`}
                    />

                    <div className="group flex items-center gap-4 rounded-[26px] bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_48px_rgba(0,0,0,0.12)] sm:gap-6 sm:p-5">
                      <div className="flex h-[24px] w-[24px] shrink-0 items-center justify-center rounded-full bg-[#f6f6f6] shadow-inner sm:h-[48px] sm:w-[48px]">
                        <Icon className="h-6 w-8 text-secondary sm:h-8 sm:w-8" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-black leading-none text-darkPrimary sm:text-md">
                          {step.id}
                        </p>
                        <h3 className="mt-2 text-sm font-semibold leading-tight text-primary sm:text-lg">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-sm">
                          {step.desc}
                        </p>
                      </div>

                      <ChevronRight className="hidden h-6 w-6 shrink-0 text-secondary transition group-hover:translate-x-1 sm:block" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
