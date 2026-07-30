import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import {
  buildImageUrl,
  FALLBACK_IMAGE,
  getProgramName,
} from "./germanProgramUtils";

export default function GermanProgramCard({
  program,
  programId,
  imagePath,
  priority = false,
}) {
  const name = getProgramName(program);

  const mainImage = buildImageUrl(
    imagePath,
    program?.icon
  );

  const secondaryImage = buildImageUrl(
    imagePath,
    program?.image
  );

  return (
    <article
      id={`german-program-${programId}`}
      itemScope
      itemType="https://schema.org/Course"
      className="
        group flex h-full flex-col
        overflow-hidden rounded-[28px]
        bg-white shadow-lg
        transition duration-300
        hover:-translate-y-2
        hover:shadow-2xl
      "
    >
      <div className="relative h-60 overflow-hidden bg-slate-100">
        <img
          itemProp="image"
          src={mainImage}
          alt={`${name} German program`}
          width="800"
          height="500"
          loading={
            priority ? "eager" : "lazy"
          }
          fetchPriority={
            priority ? "high" : "auto"
          }
          decoding="async"
          className="
            h-full w-full object-cover
            transition duration-700
            group-hover:scale-110
          "
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src =
              FALLBACK_IMAGE;
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <span
          className="
            absolute left-5 top-5
            max-w-[75%] truncate
            rounded-full bg-white/90
            px-4 py-1.5 text-xs
            font-bold uppercase
            text-darkPrimary
          "
        >
          {name}
        </span>

        {program?.image && (
          <img
            src={secondaryImage}
            alt=""
            loading="lazy"
            className="
              absolute bottom-3 right-3
              size-20 rounded-2xl
              border-4 border-white
              object-cover shadow-xl
            "
          />
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h2
          itemProp="name"
          className="text-2xl font-extrabold text-slate-950"
        >
          {name}
        </h2>

        {program?.titleWhy && (
          <p className="mt-2 text-xs font-bold uppercase tracking-widest text-primary">
            {program.titleWhy}
          </p>
        )}

        {program?.why && (
          <p
            itemProp="description"
            className="mt-4 line-clamp-4 text-sm leading-7 text-gray-600"
          >
            {program.why}
          </p>
        )}

        <Link
          itemProp="url"
          to={`/german-programs/${programId}`}
          className="mt-auto inline-flex items-center gap-2 pt-6 font-bold text-primary"
        >
          Learn More
          <ArrowRight size={17} />
        </Link>
      </div>
    </article>
  );
}