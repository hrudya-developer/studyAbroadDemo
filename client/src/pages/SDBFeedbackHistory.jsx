import {
  ArrowRight,
  CalendarDays,
  Clock3,
  Loader2,
  MessageSquareText,
  RefreshCcw,
} from "lucide-react";

const formatCreatedAt = (createdAt) => {
  if (!createdAt) {
    return {
      date: "Date unavailable",
      time: "",
    };
  }

  /*
   * The API returns:
   * 2026-07-14 13:32:56
   *
   * Replacing the space improves browser compatibility.
   */
  const parsedDate = new Date(
    String(createdAt).replace(" ", "T")
  );

  if (Number.isNaN(parsedDate.getTime())) {
    return {
      date: String(createdAt),
      time: "",
    };
  }

  return {
    date: parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }),

    time: parsedDate.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }),
  };
};

const getTypeLabel = (type) => {
  const normalizedType = String(
    type || "feedback"
  ).toLowerCase();

  if (normalizedType === "suggestion") {
    return "Suggestion";
  }

  if (normalizedType === "issue") {
    return "Issue";
  }

  return "Feedback";
};

export default function SDBFeedbackHistory({
  feedbacks = [],
  loading = false,
  error = "",
  showAll = false,
  onToggleShowAll = () => {},
  onRefresh = () => {},
}) {
  const safeFeedbacks = Array.isArray(feedbacks)
    ? feedbacks
    : [];

  const visibleFeedbacks = showAll
    ? safeFeedbacks
    : safeFeedbacks.slice(0, 2);

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-blue-50/60 p-4 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-6 lg:p-8">
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10">
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <span className="mb-2 inline-flex rounded-full bg-secondary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-secondary">
              Feedback History
            </span>

            <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
              Earlier Feedbacks, Suggestions &amp; Issues
            </h2>

            <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
              Review your recently submitted feedback and reported
              issues.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {!loading &&
              !error &&
              safeFeedbacks.length > 0 && (
                <div className="flex w-fit shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />

                  <span className="text-xs font-semibold text-slate-600">
                    {safeFeedbacks.length}{" "}
                    {safeFeedbacks.length === 1
                      ? "Submission"
                      : "Submissions"}
                  </span>
                </div>
              )}

            <button
              type="button"
              onClick={onRefresh}
              disabled={loading}
              aria-label="Refresh feedback history"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-secondary/30 hover:bg-secondary hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCcw
                size={15}
                className={loading ? "animate-spin" : ""}
              />
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white/70 px-5 py-10 text-center shadow-sm">
              <Loader2
                size={30}
                className="mb-4 animate-spin text-primary"
              />

              <h3 className="text-sm font-bold text-slate-800 sm:text-base">
                Loading feedback history
              </h3>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Please wait while we retrieve your submissions.
              </p>
            </div>
          ) : error ? (
            <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-red-200 bg-red-50/70 px-5 py-10 text-center">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100 text-red-500">
                <MessageSquareText size={25} />
              </div>

              <h3 className="text-sm font-bold text-red-700 sm:text-base">
                Unable to load feedback
              </h3>

              <p className="mt-1 max-w-md text-xs leading-relaxed text-red-600 sm:text-sm">
                {error}
              </p>

              <button
                type="button"
                onClick={onRefresh}
                disabled={loading}
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <RefreshCcw size={14} />
                Try Again
              </button>
            </div>
          ) : visibleFeedbacks.length > 0 ? (
            visibleFeedbacks.map((item, index) => {
              const { date, time } = formatCreatedAt(
                item.created_at
              );

              const message =
                item.message ||
                item.problem ||
                "No message available.";

              return (
                <article
                  key={item.id ?? `feedback-${index}`}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_10px_35px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-secondary/30 hover:shadow-[0_18px_45px_rgba(15,23,42,0.13)] sm:p-5"
                >
                  <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-secondary to-primary" />

                  <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1 pl-2 sm:pl-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex rounded-md bg-primary/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary sm:text-xs">
                          {getTypeLabel(item.type)}
                        </span>

                        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-500 sm:hidden">
                          <CalendarDays size={11} />
                          {date}
                        </span>

                        {time && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2.5 py-1 text-[10px] font-medium text-slate-500 sm:hidden">
                            <Clock3 size={11} />
                            {time}
                          </span>
                        )}
                      </div>

                      <p className="mt-3 whitespace-pre-wrap break-words text-sm font-medium leading-6 text-slate-700 sm:text-[15px]">
                        {message}
                      </p>

                      {item.reply?.trim() && (
                        <div className="mt-4 rounded-xl border border-secondary/15 bg-secondary/5 p-3">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-secondary">
                            Team reply
                          </p>

                          <p className="mt-1 whitespace-pre-wrap break-words text-sm leading-6 text-slate-700">
                            {item.reply}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="hidden shrink-0 space-y-2 border-l border-slate-100 pl-5 text-right text-xs text-slate-500 sm:block">
                      <p className="flex items-center justify-end gap-1.5 whitespace-nowrap">
                        <CalendarDays
                          size={14}
                          className="text-secondary"
                        />
                        {date}
                      </p>

                      {time && (
                        <p className="flex items-center justify-end gap-1.5 whitespace-nowrap">
                          <Clock3
                            size={14}
                            className="text-secondary"
                          />
                          {time}
                        </p>
                      )}
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white/70 px-5 py-10 text-center shadow-sm">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <MessageSquareText size={25} />
              </div>

              <h3 className="text-sm font-bold text-slate-800 sm:text-base">
                No feedback available
              </h3>

              <p className="mt-1 max-w-xs text-xs leading-relaxed text-slate-500 sm:text-sm">
                Your submitted feedback, suggestions and issues will
                appear here.
              </p>
            </div>
          )}
        </div>

        {!loading &&
          !error &&
          safeFeedbacks.length > 2 && (
            <div className="mt-7 flex justify-center sm:justify-start">
              <button
                type="button"
                onClick={onToggleShowAll}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary bg-white px-6 py-3 text-sm font-semibold text-primary shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-lg sm:w-auto"
              >
                {showAll
                  ? "Show Less"
                  : `View All Feedback (${safeFeedbacks.length})`}

                <ArrowRight
                  size={16}
                  className={`transition-transform duration-300 ${
                    showAll
                      ? "rotate-180"
                      : "group-hover:translate-x-1"
                  }`}
                />
              </button>
            </div>
          )}
      </div>
    </div>
  );
}