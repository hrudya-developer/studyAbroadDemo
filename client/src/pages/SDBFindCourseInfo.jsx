import React from "react";

export default function SDBFindCourseInfo({ icon, label, value }) {
  return (
    <div className="flex
  flex-row
  min-[1024px]:flex-col
  min-[1113px]:flex-row gap-2 text-sm">
      {React.cloneElement(icon, {
        size: 16,
        className: "mt-0.5 shrink-0 text-red-600",
      })}

      <p className="leading-5">
        <span className="font-bold">{label}:</span> {value || "N/A"}
      </p>
    </div>
  );
}