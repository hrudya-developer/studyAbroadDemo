import React from "react";
import { CheckCircle2 } from "lucide-react";
import mobilApp from "../assets/appImage.png";

const MobileApp = () => {
  return (
    <section className="relative overflow-hidden py-16 bg-gradient-to-br from-slate-50 via-white to-red-50 mx-auto max-w-7xl" data-aos="fade-up">

      {/* Top wave */}
    

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d70707_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12">

        {/* LEFT IMAGE */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute -inset-6 bg-red-200 blur-3xl opacity-30 rounded-full" />
            <img
              src={mobilApp}
              alt="Mobile App"
              className="relative w-[280px] md:w-[360px] drop-shadow-2xl"
            />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-secondary font-ubuntu">
            Study Abroad Mobile App
          </h1>

          <p className="mt-4 text-slate-600 leading-7">
            Your complete guide for studying abroad — courses, universities, visas, and counseling in one app.
          </p>

          {/* FEATURES */}
          <div className="mt-6 space-y-3">
            {[
              "Explore top universities worldwide",
              "Get instant course recommendations",
              "Track applications in real-time",
              "Direct counselor support",
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <CheckCircle2 className="text-primary mt-1" />
                <p className="text-slate-700">{item}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="https://play.google.com/store/apps/details?id=com.medcity.overseas"
              target="_blank"
              className="bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:bg-secondary transition"
            >
              Download App
            </a>

            <button className="border border-primary text-primary px-6 py-3 rounded-xl font-bold hover:bg-secondary hover:text-white transition">
              <a href="#gfc_wrapper" className="w-full h-full">Get Free Counselling</a>
            </button>
          </div>

          {/* STATS */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white shadow-sm rounded-xl p-3">
              <p className="text-xl font-bold text-primary">10K+</p>
              <p className="text-xs text-slate-500">Students</p>
            </div>

            <div className="bg-white shadow-sm rounded-xl p-3">
              <p className="text-xl font-bold text-primary">50+</p>
              <p className="text-xs text-slate-500">Countries</p>
            </div>

            <div className="bg-white shadow-sm rounded-xl p-3">
              <p className="text-xl font-bold text-primary">100+</p>
              <p className="text-xs text-slate-500">Universities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
    

    </section>
  );
};

export default MobileApp;