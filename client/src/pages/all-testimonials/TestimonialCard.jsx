import { Quote } from "lucide-react";

import fallbackImage from "../../assets/avatarFallback.png";

import {
  getSafeText,
  getTestimonialImage,
} from "./testimonialsConfig";

export default function TestimonialCard({
  item,
}) {
  const name = getSafeText(
    item?.name,
    "Student"
  );

  const country = getSafeText(
    item?.country
  );

  const testimonialText =
    getSafeText(item?.text);

  const image =
    getTestimonialImage(item?.image);

  return (
    <article
      itemScope
      itemType="https://schema.org/Review"
      className="group relative overflow-hidden rounded-[34px] bg-white p-4 shadow-xl ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
    >
      <meta
        itemProp="itemReviewed"
        content="Medcity Study Abroad"
      />

      <div className="absolute -right-14 -top-14 size-32 rounded-full bg-primary/10" />

      <div className="absolute -bottom-16 -left-16 size-40 rounded-full bg-secondary/10" />

      <div className="relative h-full rounded-[28px] bg-gradient-to-br from-pink-50 via-white to-blue-50 p-6 text-center">
        <div className="absolute right-5 top-5 grid size-11 place-content-center rounded-2xl bg-primary text-white shadow-lg">
          <Quote
            size={20}
            aria-hidden="true"
          />
        </div>

        <div className="mx-auto mt-4 flex size-36 items-center justify-center rounded-[32px] bg-white p-2 shadow-xl ring-4 ring-white">
          <img
            src={image}
            alt={`${name}, Medcity Study Abroad student`}
            width="144"
            height="144"
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.onerror =
                null;

              event.currentTarget.src =
                fallbackImage;
            }}
            className="h-full w-full rounded-[26px] object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div
          itemProp="author"
          itemScope
          itemType="https://schema.org/Person"
        >
          <h2
            itemProp="name"
            className="mt-5 break-words text-lg font-black text-darkPrimary"
          >
            {name}
          </h2>
        </div>

        {country && (
          <p className="mt-1 text-sm font-bold text-primary">
            {country}
          </p>
        )}

        <div className="mx-auto my-5 h-1 w-14 rounded-full bg-primary" />

        {testimonialText && (
          <blockquote
            itemProp="reviewBody"
            className="line-clamp-5 text-sm italic leading-7 text-slate-600"
          >
            “{testimonialText}”
          </blockquote>
        )}
      </div>
    </article>
  );
}