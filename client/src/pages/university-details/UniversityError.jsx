import { ArrowLeft } from "lucide-react";

export default function UniversityError({
  title,
  message,
  onBack,
}) {
  return (
    <main className="grid min-h-screen place-content-center bg-[#f7f9fd] px-4">
      <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        <h1 className="text-2xl font-black text-[#081c47]">
          {title}
        </h1>

        {message && (
          <p className="mt-3 text-sm leading-6 text-slate-500">
            {message}
          </p>
        )}

        <button
          type="button"
          onClick={onBack}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-bold text-white transition hover:bg-darkPrimary"
        >
          <ArrowLeft
            className="size-4"
            aria-hidden="true"
          />

          Go Back
        </button>
      </div>
    </main>
  );
}