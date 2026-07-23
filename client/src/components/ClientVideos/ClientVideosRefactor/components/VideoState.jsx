import { Loader2 } from "lucide-react";

export const LoadingState = () => (
  <div className="flex min-h-[480px] w-full items-center justify-center px-5">
    <div className="flex flex-col items-center gap-3 text-center">
      <Loader2 className="h-10 w-10 animate-spin text-primary" />
      <p className="text-sm font-medium text-slate-300">
        Loading departure videos...
      </p>
    </div>
  </div>
);

export const ErrorState = ({ message }) => (
  <div className="flex min-h-[480px] w-full items-center justify-center px-5 text-center">
    <div className="max-w-md rounded-2xl border border-red-400/20 bg-red-500/10 px-6 py-5">
      <p className="text-sm leading-6 text-red-200">{message}</p>
    </div>
  </div>
);

export const EmptyState = () => (
  <div className="flex min-h-[480px] w-full items-center justify-center px-5">
    <p className="text-center text-slate-300">
      No departure videos are currently available.
    </p>
  </div>
);
