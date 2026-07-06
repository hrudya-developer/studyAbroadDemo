import { useEffect, useState } from "react";
import {
  X,
  MessageCircle,
  GraduationCap,
  FileCheck,
  Plane,
  Sparkles,
} from "lucide-react";

import MiaAgent from "../assets/animatedMia.webm";
import agentModalBg from "../assets/agentModalBg.png";

export default function MiaModal({ isOpen, onClose, onTalk }) {
  const [showModal, setShowModal] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setClosing(false);
      document.body.style.overflow = "hidden";
    } else {
      setShowModal(false);
      setClosing(false);
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = () => {
    setClosing(true);

    setTimeout(() => {
      setShowModal(false);
      setClosing(false);
      document.body.style.overflow = "";
      onClose?.();
    }, 450);
  };

 const handleTalk = () => {
  setClosing(true);

  setTimeout(() => {
    setShowModal(false);
    setClosing(false);
    document.body.style.overflow = "";
    onTalk?.();
  }, 450);
};

  if (!showModal) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-md ${
        closing ? "animate-modalOverlayOut" : "animate-modalOverlayIn"
      }`}
    >
      <div
        className={`relative w-full max-w-[520px] overflow-hidden rounded-[34px] shadow-[0_30px_90px_rgba(0,0,0,.35)] animate__animated animate__fadeInBottomRight ${
          closing ? "animate-modalClose" : "animate-modalOpen"
        }`}
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(255,255,255,.96), rgba(255,235,244,.93), rgba(240,248,255,.9)), url(${agentModalBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 z-30 grid h-9 w-9 place-items-center rounded-full bg-white text-primary shadow-lg transition duration-300 hover:rotate-90 hover:bg-darkPrimary hover:text-white hover:cursor-pointer"
        >
          <X size={22} />
        </button>

        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-primary/25 blur-3xl" />
        <div className="absolute -bottom-28 -right-24 h-64 w-64 rounded-full bg-secondary/25 blur-3xl" />
        <div className="absolute left-1/2 top-10 h-24 w-24 -translate-x-1/2 rounded-full bg-logoYellow/30 blur-2xl" />

        <div className="relative z-10 flex max-h-[90vh] flex-col items-center overflow-y-auto px-5 py-8 text-center sm:px-8">
          <div className="mb-4 inline-flex animate-float items-center gap-2 rounded-full border border-white/70 bg-white/80 px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-primary shadow-lg backdrop-blur">
            <Sparkles size={16} />
            Your Study Abroad Assistant
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl" />

            <video
              src={MiaAgent}
              autoPlay
              muted
              loop
              playsInline
              className="relative z-10 h-40 w-auto animate-miaFlip object-contain drop-shadow-2xl sm:h-48"
            />
          </div>

          <h2 className="mt-4 text-3xl font-black leading-tight text-primary sm:text-4xl">
            Meet Mia
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Study Abroad Assistant
            </span>
          </h2>

          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
            Get quick help with courses, universities, admissions, visas,
            scholarships and travel guidance.
          </p>

          <div className="mt-6 grid w-full max-[450px]:grid-cols-1 grid-cols-3 gap-3 sm:grid-cols-3">
            <Feature icon={<GraduationCap size={23} />} title="Course Guidance" />
            <Feature icon={<FileCheck size={23} />} title="Admission Support" />
            <Feature icon={<Plane size={23} />} title="Visa & Travel Help" />
          </div>

          <button
            type="button"
            onClick={handleTalk}
            className="group mt-7 flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-primary to-darkPrimary px-5 py-3.5 text-base font-extrabold text-white shadow-xl shadow-primary/30 hover:cursor-pointer transition duration-300 hover:-translate-y-1 hover:shadow-2xl active:scale-95"
          >
            <MessageCircle
              size={24}
              className="transition duration-300 group-hover:rotate-12"
            />
            Talk to Mia
          </button>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title }) {
  return (
    <div className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-white/70 bg-white/75 p-4 text-center shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl">
      <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-blue-50 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
        {icon}
      </div>

      <h4 className="text-xs font-extrabold leading-5 text-slate-900 sm:text-sm">
        {title}
      </h4>
    </div>
  );
}