import {
  ArrowRight,
  Play,
} from "lucide-react";

import {
  FALLBACK_IMAGE,
  getYouTubeThumbnail,
} from "./germanProgramUtils";

export default function AusbildungVideoCard({
  video,
  index,
}) {
  if (!video?.link) return null;

  const title =
    video?.title ||
    `Ausbildung Video ${index + 1}`;

  return (
    <a
      href={video.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Watch ${title}`}
      className="
        group flex h-full flex-col
        overflow-hidden rounded-3xl
        border border-slate-200
        bg-white shadow-lg
        transition hover:-translate-y-2
      "
    >
      <div className="relative aspect-video overflow-hidden bg-black">
        <img
          src={getYouTubeThumbnail(video)}
          alt={`${title} thumbnail`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.src =
              FALLBACK_IMAGE;
          }}
        />

        <span
          className="
            absolute left-1/2 top-1/2
            grid size-16
            -translate-x-1/2
            -translate-y-1/2
            place-items-center rounded-full
            bg-primary text-white
          "
        >
          <Play
            size={25}
            className="ml-1 fill-current"
          />
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 font-extrabold text-black">
          {title}
        </h3>

        {video?.description && (
          <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
            {video.description}
          </p>
        )}

        <span className="mt-auto inline-flex items-center gap-2 pt-5 font-bold text-primary">
          Watch Video
          <ArrowRight size={17} />
        </span>
      </div>
    </a>
  );
}