import { useState } from "react";
import { ExternalLink, X } from "lucide-react";

const PRIVACY_URL =
  "https://technocitysolutions.in/public/overseas/privacypolicy";

const SDBPrivacyPolicy = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <section className="flex min-h-[70vh] items-center justify-center bg-slate-50 p-6">
        <div className="max-w-xl rounded-2xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-2xl font-bold text-darkPrimary">
            Privacy Policy
          </h1>

          <p className="mt-4 text-slate-600">
            Read our privacy policy to understand how we collect, use and
            protect your information.
          </p>

          <button
            onClick={() => setOpen(true)}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-semibold text-white transition hover:bg-darkPrimary"
          >
            View Privacy Policy
            <ExternalLink size={18} />
          </button>
        </div>
      </section>

      {open && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4">
          <div className="relative flex h-[92vh] w-[90%] max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-b-primary/20 px-6 py-4">
              <h2 className="text-lg font-black text-black">
                Privacy Policy
              </h2>

              <button
                onClick={() => setOpen(false)}
                className="flex h-7 w-7 items-center justify-center text-white rounded-full bg-primary transition hover:bg-darkPrimary hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <iframe
              src={PRIVACY_URL}
              title="Privacy Policy"
              className="flex-1 w-full"
            />

            {/* Footer */}
           
          </div>
        </div>
      )}
    </>
  );
};

export default SDBPrivacyPolicy;