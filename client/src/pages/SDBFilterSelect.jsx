import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export default function SDBFilterSelect({
  label,
  value,
  onChange,
  placeholder,
  options = [],
  disabled = false,
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full min-w-0 mb-5">
      {label && (
        <label className="mb-2 block text-sm font-bold text-slate-900">
          {label}
        </label>
      )}

      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-full min-w-0 items-center justify-between rounded-xl border border-slate-200 bg-white px-4 text-left text-sm text-slate-600 shadow-sm outline-none transition hover:border-primary focus:border-primary disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
      >
        <span className="min-w-0 flex-1 truncate">
          {selected?.label || placeholder}
        </span>

        <ChevronDown
          size={18}
          className={`ml-3 shrink-0 transition duration-200 ${
            open ? "rotate-180 text-primary" : "text-slate-400"
          }`}
        />
      </button>

      {open && !disabled && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-60 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1 shadow-xl">
          <button
            type="button"
            onClick={() => {
              onChange("");
              setOpen(false);
            }}
            className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-400 transition hover:bg-slate-100"
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
              className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold transition ${
                String(item.value) === String(value)
                  ? "bg-primary text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}