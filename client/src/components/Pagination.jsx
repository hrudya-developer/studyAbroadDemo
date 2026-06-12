export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  loading = false,
  onPrevious,
  onNext,
  onPageChange,
}) {
  const safeTotalPages = Math.max(Number(totalPages) || 1, 1);

  const pages = Array.from({ length: safeTotalPages }, (_, index) => index + 1);

  return (
    <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
      <button
        type="button"
        disabled={currentPage <= 1 || loading}
        onClick={onPrevious}
        className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          disabled={loading}
          onClick={() => onPageChange(page)}
          className={`rounded-lg px-3 py-2 text-sm font-semibold ${
            currentPage === page
              ? "bg-red-600 text-white"
              : "border border-slate-300 bg-white text-slate-700"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage >= safeTotalPages || loading}
        onClick={onNext}
        className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}