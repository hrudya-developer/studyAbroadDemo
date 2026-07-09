import React from "react";

export default function SDBFindCourseInfo({ icon, label, value }) {
  return (
  <div
      className="
        flex min-w-0 flex-row gap-2 text-sm
        min-[1024px]:flex-col
        min-[1113px]:flex-row
      "
    >
      {React.cloneElement(icon, {
        size: 16,
        className: "mt-0.5 shrink-0 text-red-600",
      })}

      <p className="min-w-0 flex-1 whitespace-normal break-all [overflow-wrap:anywhere] leading-5">
        <span className="font-bold">{label}:</span>{" "}
        {value || "N/A"}
      </p>
    </div>
  );
}