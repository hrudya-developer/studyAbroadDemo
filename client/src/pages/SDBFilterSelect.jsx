import { useState } from "react";

export default function SDBFilterSelect({
  label,
  value,
  onChange,
  placeholder,
  options = [],
  disabled = false,
}) {
  const [open, setOpen] = useState(false);

  const validOptions = options.filter(
    (item) =>
      item.value !== undefined &&
      item.value !== null &&
      String(item.value).trim() !== "" &&
      item.label !== undefined &&
      item.label !== null &&
      String(item.label).trim() !== ""
  );

  const selected = validOptions.find(
    (item) => String(item.value) === String(value)
  );

  return (
    <div className="relative mt-5">
      <label className="text-sm font-bold">{label}</label>

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className="mt-2 flex h-12 w-full items-center justify-between border-b bg-white px-1 text-left text-sm text-slate-500 outline-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        <span className="truncate">{selected?.label || placeholder}</span>
        <span className="ml-2">⌄</span>
      </button>

      {open && !disabled && (
        <div className="absolute left-0 top-full z-50 mt-1 max-h-52 w-full overflow-y-auto rounded-md border border-slate-200 bg-white shadow-lg">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="block w-full px-3 py-2 text-left text-sm text-slate-500 hover:bg-slate-100"
          >
            {placeholder}
          </button>

          {validOptions.map((item) => (
            <button
              key={`${item.value}-${item.label}`}
              type="button"
              onClick={() => {
                onChange(item.value);
                setOpen(false);
              }}
              className="block w-full px-3 py-2 text-left text-sm text-slate-600 hover:bg-slate-100"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}