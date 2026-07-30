import {
  Loader2,
  PlayCircle,
} from "lucide-react";

export default function StatusMessage({
  loading,
  error,
  empty,
  loadingText = "Loading...",
  emptyText = "No items found.",
  type = "program",
}) {
  if (loading) {
    return (
      <div
        role="status"
        className="flex justify-center py-16"
      >
        <Loader2 className="size-10 animate-spin text-primary" />

        <span className="sr-only">
          {loadingText}
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="
          rounded-2xl border border-red-200
          bg-red-50 px-5 py-8 text-center
          font-semibold text-red-600
        "
      >
        {error}
      </div>
    );
  }

  if (empty) {
    return (
      <div
        className="
          rounded-2xl border
          border-dashed border-slate-300
          bg-white px-5 py-10 text-center
          text-slate-500
        "
      >
        {type === "video" && (
          <PlayCircle className="mx-auto mb-4 size-10 text-slate-300" />
        )}

        {emptyText}
      </div>
    );
  }

  return null;
}