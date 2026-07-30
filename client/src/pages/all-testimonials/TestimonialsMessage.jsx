export default function TestimonialsMessage({
  title,
  message,
  error = false,
}) {
  return (
    <div
      role={error ? "alert" : undefined}
      className={`
        mx-auto mt-14 max-w-xl
        rounded-3xl bg-white p-8
        text-center shadow-lg
        ${
          error
            ? "border border-red-100"
            : "border border-slate-100"
        }
      `}
    >
      <h2 className="text-xl font-black text-slate-900">
        {title}
      </h2>

      {message && (
        <p className="mt-3 text-sm leading-7 text-slate-600">
          {message}
        </p>
      )}
    </div>
  );
}