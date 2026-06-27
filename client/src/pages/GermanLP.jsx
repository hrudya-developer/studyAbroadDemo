import {
  BookOpen,
  GraduationCap,
  Mic,
  Award,
  Globe,
  Target,
  Users,
  MonitorPlay,
  MessageCircle,
  Plane,
  CheckCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import FreeCounsellingForm from "../pages/FreeCounsellingForm";

import heroStudent from "../assets/german-hero-student.png";
import overviewImg from "../assets/german-overview.jpg";
import a1Img from "../assets/german-a1.jpg";
import a2Img from "../assets/german-a2.jpg";
import b1Img from "../assets/german-b1.jpg";
import b2Img from "../assets/german-b2.jpg";
import videoThumb from "../assets/german-video.jpg";
import successImg from "../assets/german-success.jpg";

const highlights = [
  { icon: GraduationCap, title: "Expert Trainers" },
  { icon: BookOpen, title: "CEFR Based Training" },
  { icon: Mic, title: "Speaking Practice" },
  { icon: Award, title: "Exam Preparation" },
];

const stats = [
  { icon: GraduationCap, title: "A1 to B2", desc: "All Levels" },
  { icon: BookOpen, title: "Goethe & TELC", desc: "Exam Prep" },
  { icon: MessageCircle, title: "Daily Speaking", desc: "Practice" },
  { icon: Target, title: "Personalized", desc: "Attention" },
  { icon: MonitorPlay, title: "Flexible", desc: "Batches" },
  { icon: Globe, title: "Pathway to", desc: "Germany" },
];

const levels = [
  {
    title: "A1 Level German",
    image: a1Img,
    desc: "Start your German journey from scratch. Learn basic vocabulary, grammar, and simple communication.",
  },
  {
    title: "A2 Level German",
    image: a2Img,
    desc: "Build confidence in daily conversations, sentence formation, listening, and reading skills.",
  },
  {
    title: "B1 Level German",
    image: b1Img,
    desc: "Reach intermediate German for Ausbildung, nursing, jobs, and daily professional use.",
  },
  {
    title: "B2 Level German",
    image: b2Img,
    desc: "Advanced German for professional communication, nursing, higher studies, and career growth.",
  },
];

// const faqs = [
//   "What is the fastest way to learn German from A1 to B2?",
//   "Is German language necessary to go to Germany?",
//   "Can I learn German at Medicity if I am a complete beginner?",
//   "Is Medicity a government-approved German language institute?",
//   "What does CEFR mean in German language learning?",
//   "What German levels are available at Medicity?",
//   "What is the difference between German A1, A2, B1 and B2?",
//   "Which German level should I start with?",
//   "How long does it take to complete German A1 to B2?",
// ];

export default function GermanLanguagePage() {
      const [showCounsellingPopup, setShowCounsellingPopup] = useState(false);

  useEffect(() => {
    if (!showCounsellingPopup) return;

    const originalBodyOverflow = document.body.style.overflow;
    const originalHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalHtmlOverflow;
    };
  }, [showCounsellingPopup]);
  return (
    <>
    <main className="overflow-hidden bg-white font-nunito text-slate-900">
      {/* HERO */}
    {/* HERO */}
<section
  className="relative overflow-hidden bg-no-repeat bg-cover bg-[right_top] lg:bg-[100%_0%]"
  style={{
    backgroundImage: `url(${heroStudent})`,
  }}
>
  {/* Light overlay for left text */}
  <div className="absolute inset-0 bg-black/85 block lg:hidden" />

  {/* Decorative blur */}
  <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />

  <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-auto">
      <div className="max-w-xl mx-auto lg:mx-0 lg:max-w-2xl">
        <span className="w-fit flex mx-auto lg:mx-0 mt-12 items-center gap-2 rounded-full bg-logoYellow px-4 py-2 text-sm font-bold text-black backdrop-blur">
          🇩🇪 German Language Program
        </span>

        <h1 className="mt-6 text-2xl font-extrabold leading-tight text-center lg:text-left text-white lg:text-slate-900 sm:text-2xl lg:text-3xl">
          German Language Course In Kerala For{" "} <br />
          <span className="text-primary text-2xl lg:text-3xl font-bold">A1 To B2</span>
        </h1>

        <div className="mt-5 h-1 w-20 rounded-full bg-logoYellow mx-auto lg:mx-0" />

        <p className="mt-6 max-w-lg text-base text-center lg:text-left leading-loose text-white lg:text-slate-800 sm:text-base">
          CEFR aligned German training for students, nurses,
          healthcare professionals, Au-pairs and Germany aspirants.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="rounded-2xl bg-white/90 p-4 text-center shadow-lg backdrop-blur"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={22} />
                </div>

                <p className="mt-3 text-sm font-bold text-slate-900">
                  {item.title}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap gap-4 mb-10 justify-center lg:justify-start">
          <button
  type="button"
  onClick={() => setShowCounsellingPopup(true)}
  className="rounded-xl bg-darkPrimary px-5 py-2 text-sm md:text-md font-bold text-white shadow-lg hover:bg-primary transition"
>
  Book Free Counselling
</button>

          <button className="rounded-xl border-2 text-sm md:text-md border-darkPrimary px-5 py-2 font-bold text-darkPrimary bg-white/80 backdrop-blur">
           <a href="#course-overview" className="h-full w-full"> Read More</a>
          </button>
        </div>
      </div>
    </div>
  </div>
</section>

      {/* OVERVIEW */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <img
              src={overviewImg}
              alt="Students"
              className="h-full max-h-[420px] w-full rounded-3xl object-cover shadow-xl"
            />
          </div>

          <div>
            <div className="mb-5 h-1.5 w-16 rounded-full bg-secondary" />
            <h2 className="text-2xl md:text-2xl font-extrabold text-slate-950 scroll-mt-24 transition ease-in-out" id="course-overview">
              Course Overview: German Language Training From A1 To B2
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-slate-600 sm:text-base">
              <p>
                At Medicity International Academy, our German Language Course in
                Kerala is designed for students, nurses, healthcare
                professionals, Ausbildung aspirants, job seekers, and anyone
                planning to study, work, or build a future in Germany.
              </p>

              <p>
                Our course follows the CEFR framework and focuses on speaking,
                listening, reading, writing, grammar, vocabulary and
                pronunciation. Each level is taught through structured lessons,
                daily practice, interactive speaking sessions and regular
                assessments.
              </p>

              <p>
                Medicity offers flexible online and classroom German batches
                across Kerala with expert trainers and continuous mentor support.
              </p>

              <p>
                <strong className="text-slate-950">Quick Answer:</strong>{" "}
                Medicity’s German Language Course in Kerala offers CEFR-aligned
                A1 to B2 training with Goethe, TELC and ÖSD exam preparation.
              </p>
            </div>

           <button
  type="button"
  onClick={() => setShowCounsellingPopup(true)}
  className="mt-7 rounded-xl bg-primary px-7 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-secondary"
>
  Get Free Counselling
</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {/* <section className="relative bg-secondary py-16 md:py-24">
        <div className="absolute left-0 top-0 h-40 w-40 rounded-br-full bg-white/10" />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 h-1.5 w-16 rounded-full bg-sky-300" />
          <h2 className="text-center text-2xl font-extrabold text-white md:text-3xl">
            German Course FAQs: A1 To B2, CEFR, Exams And Germany Pathways
          </h2>

          <div className="mx-auto mt-8 max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border-b border-slate-100 px-5 py-4 last:border-b-0"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-bold text-slate-900">
                  {faq}
                  <span className="transition group-open:rotate-180">⌄</span>
                </summary>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  Yes. Our trainers guide you with structured lessons, speaking
                  practice, exam preparation and step-by-step German pathway
                  support.
                </p>
              </details>
            ))}
          </div>
        </div>
      </section> */}

      {/* LEVELS */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
            German Language Course Levels{" "}
            <span className="text-primary">(A1 To B2)</span>
          </h2>
          <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-secondary" />
          <p className="mx-auto mt-6 max-w-4xl text-sm leading-7 text-slate-600 sm:text-base">
            Start from German A1 and progress step by step through A2, B1 and
            B2 with CEFR-based training, speaking practice, Goethe/TELC exam
            preparation and mock test support.
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {levels.map((level, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-3xl bg-white shadow-xl transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <img
                  src={level.image}
                  alt={level.title}
                  className="h-40 w-full object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-extrabold text-slate-950">
                    {level.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">
                    {level.desc}
                  </p>
                  {/* <button className="mt-5 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white">
                    Learn More
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO */}
      <section className="py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl">
            <img
              src={videoThumb}
              alt="German video"
              className="h-[260px] w-full object-cover sm:h-[360px]"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <button className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-primary shadow-xl">
                ▶
              </button>
            </div>
          </div>

          <div>
            <div className="mb-5 h-1.5 w-16 rounded-full bg-secondary" />
            <h2 className="text-2xl font-extrabold text-slate-950 md:text-3xl">
              Understand German A1 Before You Begin
            </h2>
            <p className="mt-6 leading-8 text-slate-600">
              Watch this Malayalam explainer to understand German A1 level,
              including syllabus basics, grammar foundation, pronunciation,
              speaking expectations, exam pattern and learning tips.
            </p>
            <p className="mt-4 leading-8 text-slate-600">
              This video helps beginners understand what to expect and how
              Medicity guides students step by step.
            </p>
            <button className="mt-8 rounded-xl bg-darkPrimary text-sm md:text-md px-8 py-2 font-bold text-white transition hover:bg-primary">
              Watch Video
            </button>
          </div>
        </div>
      </section>

      {/* SUCCESS + FEATURES */}
      <section className="bg-slate-50 py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-950 md:text-3xl">
              German B2 Winners: TELC And Goethe Success Stories
            </h2>
            <div className="mt-5 h-1.5 w-16 rounded-full bg-secondary" />
            <p className="mt-6 leading-8 text-slate-600">
              Celebrating Medicity students who successfully cleared German B2
              exams through structured training, speaking practice, writing
              correction, mock tests and exam-focused preparation.
            </p>
            <img
              src={successImg}
              alt="Success stories"
              className="mt-8 rounded-3xl object-cover shadow-xl"
            />
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-extrabold text-slate-950 md:text-3xl">
              Course Highlights
            </h2>
            <Feature
              icon={Users}
              title="Designed For All Levels (A1 To B2)"
              desc="A structured pathway that takes you from German A1 basics to B2 professional communication."
            />
            <Feature
              icon={MessageCircle}
              title="Hands-On Speaking Practice"
              desc="Daily conversation drills, pronunciation practice, role plays, listening labs and interactive tasks."
            />
            <Feature
              icon={CheckCircle}
              title="Exam-Ready System (Goethe / TELC)"
              desc="Mock tests, writing corrections and one-on-one speaking evaluations for confident exam preparation."
            />
            <Feature
              icon={Plane}
              title="Germany Pathway Guidance"
              desc="Guidance for studies, Ausbildung, jobs, visa and settlement opportunities in Germany."
            />
          </div>
        </div>
      </section>
    </main>
     {showCounsellingPopup &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4"
            onClick={() => setShowCounsellingPopup(false)}
          >
            <div
              className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[30px] bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setShowCounsellingPopup(false)}
                className="absolute right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-xl font-bold text-white hover:opacity-90"
              >
                ×
              </button>

              <FreeCounsellingForm
                onSuccess={() => setShowCounsellingPopup(false)}
              />
            </div>
          </div>,
          document.body
        )}</>
  );
}

function Feature({ icon: Icon, title, desc }) {
  return (
    <div className="flex gap-5 rounded-3xl bg-white p-6 shadow-lg">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-secondary text-white">
        <Icon size={25} />
      </div>
      <div>
        <h3 className="text-xl font-extrabold text-secondary">{title}</h3>
        <p className="mt-3 leading-7 text-slate-600">{desc}</p>
      </div>
    </div>
  );
}
