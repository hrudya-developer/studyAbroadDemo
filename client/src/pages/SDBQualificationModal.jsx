import { useEffect, useState } from "react";
import {
  X,
  GraduationCap,
  ClipboardList,
  BarChart3,
  Target,
  Award,
} from "lucide-react";

import SDBQualificationUpdate from "./SDBQualificationUpdate";

export default function SDBQualificationModal({ open, onClose, onUpdate }) {
  const [showQualificationForm, setShowQualificationForm] = useState(false);

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      setShowQualificationForm(false);
    }
  }, [open]);

  if (!open) return null;

  const handleClose = () => {
    setShowQualificationForm(false);
    onClose?.();
  };

  const handleQualificationUpdated = (data) => {
    onUpdate?.(data);
    handleClose();
  };

  if (showQualificationForm) {
    return (
      <SDBQualificationUpdate
        open={showQualificationForm}
        onClose={handleClose}
        onUpdated={handleQualificationUpdated}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-700 shadow-md transition hover:bg-slate-100"
          aria-label="Close"
        >
          <X size={24} />
        </button>

<<<<<<< HEAD
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-1 lg:p-10">
          <div>
            <div className="mb-6 flex items-center gap-4 pr-10">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-primary sm:h-16 sm:w-16">
=======
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
          <div>
            <div className="mb-6 flex items-center gap-4 pr-10">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-100 text-red-600 sm:h-16 sm:w-16">
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
                <GraduationCap size={32} />
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-900 sm:text-xl">
<<<<<<< HEAD
                  UPDATE <span className="text-primary">QUALIFICATIONS</span>
                </h2>

                <div className="mt-3 h-1 w-24 rounded-full bg-primary" />
=======
                  UPDATE <span className="text-red-600">QUALIFICATIONS</span>
                </h2>

                <div className="mt-3 h-1 w-24 rounded-full bg-red-600" />
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
              </div>
            </div>

            <p className="max-w-2xl text-lg font-extrabold leading-relaxed text-slate-900 sm:text-lg">
              Update your educational qualifications and academic scores for
<<<<<<< HEAD
              tailoprimary analysis and suggestions from our counsellors.
=======
              tailored analysis and suggestions from our counsellors.
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              This helps us recommend better universities, courses, admission
              options, and eligibility-based opportunities.
            </p>

<<<<<<< HEAD
            <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-4">
              <Feature
                icon={<ClipboardList size={22} />}
                title="Personalized Analysis"
            
=======
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Feature
                icon={<ClipboardList size={22} />}
                title="Personalized Analysis"
                text="Get course suggestions that match your profile."
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
              />

              <Feature
                icon={<BarChart3 size={22} />}
                title="Better Shortlisting"
<<<<<<< HEAD
              
=======
                text="Improve accuracy in university shortlisting."
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
              />

              <Feature
                icon={<Target size={22} />}
                title="Higher Success Rate"
<<<<<<< HEAD
                
=======
                text="Boost your chances of admission."
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
              />

              <Feature
                icon={<Award size={22} />}
                title="Expert Guidance"
<<<<<<< HEAD
                
=======
                text="Our counsellors provide the best guidance."
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
              />
            </div>
          </div>

<<<<<<< HEAD
         
=======
          <div className="hidden items-center justify-center lg:flex">
            <div className="relative w-full max-w-xs">
              <div className="absolute inset-0 rounded-full bg-red-100 blur-3xl" />

              <div className="relative rounded-3xl bg-gradient-to-br from-red-50 via-white to-blue-50 p-8 shadow-inner">
                <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-white text-red-600 shadow-lg">
                  <GraduationCap size={72} />
                </div>

                <div className="mt-8 space-y-3">
                  <div className="h-3 w-full rounded bg-slate-200" />
                  <div className="h-3 w-4/5 rounded bg-slate-200" />
                  <div className="h-3 w-5/6 rounded bg-slate-200" />
                </div>

                <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-xs font-black uppercase text-slate-400">
                    Profile Strength
                  </p>

                  <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div className="h-full w-2/3 rounded-full bg-red-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
        </div>

        <div className="grid gap-4 border-t bg-slate-50 p-5 sm:grid-cols-2 sm:p-7">
          <button
            type="button"
            onClick={() => setShowQualificationForm(true)}
<<<<<<< HEAD
            className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white shadow-lg transition hover:bg-secondary"
=======
            className="rounded-xl bg-red-600 px-6 py-4 text-base font-black text-white shadow-lg transition hover:bg-red-700"
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
          >
            UPDATE NOW →
          </button>

          <button
            type="button"
            onClick={handleClose}
<<<<<<< HEAD
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:bg-slate-100"
=======
            className="rounded-xl border border-slate-300 bg-white px-6 py-4 text-base font-black text-slate-800 transition hover:bg-slate-100"
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
          >
            MAYBE LATER
          </button>
        </div>
      </div>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
<<<<<<< HEAD
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
=======
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-red-100 text-red-600">
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
        {icon}
      </div>

      <h3 className="text-sm font-black text-slate-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}