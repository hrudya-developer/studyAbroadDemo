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

        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-1 lg:p-10">
          <div>
            <div className="mb-6 flex items-center gap-4 pr-10">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gray-100 text-primary sm:h-16 sm:w-16">
                <GraduationCap size={32} />
              </div>

              <div>
                <h2 className="text-xl font-black text-slate-900 sm:text-xl">
                  UPDATE <span className="text-primary">QUALIFICATIONS</span>
                </h2>

                <div className="mt-3 h-1 w-24 rounded-full bg-primary" />
              </div>
            </div>

            <p className="max-w-2xl text-lg font-extrabold leading-relaxed text-slate-900 sm:text-lg">
              Update your educational qualifications and academic scores for
              tailoprimary analysis and suggestions from our counsellors.
            </p>

            <p className="mt-4 text-sm leading-6 text-slate-500">
              This helps us recommend better universities, courses, admission
              options, and eligibility-based opportunities.
            </p>

            <div className="mt-8 grid gap-4 grid-cols-1 sm:grid-cols-4">
              <Feature
                icon={<ClipboardList size={22} />}
                title="Personalized Analysis"
            
              />

              <Feature
                icon={<BarChart3 size={22} />}
                title="Better Shortlisting"
              
              />

              <Feature
                icon={<Target size={22} />}
                title="Higher Success Rate"
                
              />

              <Feature
                icon={<Award size={22} />}
                title="Expert Guidance"
                
              />
            </div>
          </div>

         
        </div>

        <div className="grid gap-4 border-t bg-slate-50 p-5 sm:grid-cols-2 sm:p-7">
          <button
            type="button"
            onClick={() => setShowQualificationForm(true)}
            className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white shadow-lg transition hover:bg-secondary"
          >
            UPDATE NOW →
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-bold text-slate-800 transition hover:bg-slate-100"
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
      <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white">
        {icon}
      </div>

      <h3 className="text-sm font-black text-slate-900">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
    </div>
  );
}