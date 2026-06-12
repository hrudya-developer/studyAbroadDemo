import React, { useEffect, useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const API_KEY = "overseas@Miak2023";
const API_URL =
  "https://overseas.technocitysolutions.com/public/api/updateQualifications";

const initialForm = {
  highest: "",
  tenth_syllabus: "",
  tenth_overall: "",
  twelth_stream: "",
  twelth_overall: "",
  twelth_english: "",
  degree_stream: "",
  degree_overall: "",
  degree_english: "",
  pg_stream: "",
  pg_overall: "",
  pg_english: "",
  ielts_overall: "",
  ielts_l: "",
  ielts_r: "",
  ielts_w: "",
  ielts_s: "",
};

const SDBQualificationUpdate = ({ open, onClose, onUpdated }) => {
  const { uid, user } = useSelector((state) => state.auth);

  const loggedUid =
    uid || user?.uid || user?.id || user?.student_id || user?.userid || "";

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;

    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = oldOverflow;
    };
  }, [open]);

  if (!open) return null;

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};

    Object.entries(form).forEach(([key, value]) => {
      if (!String(value || "").trim()) {
        nextErrors[key] = "This field is required";
      }
    });

    if (!loggedUid) {
      nextErrors.uid = "User ID missing. Please login again.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildFormData = () => {
    const formData = new FormData();

    formData.append("api", API_KEY);
    formData.append("uid", String(loggedUid));

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, String(value || "").trim());
    });

    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      Swal.fire({
        icon: "warning",
        title: "Please fill all fields",
        text: "Every qualification field is required.",
        confirmButtonColor: "#cb0e10",
      });
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      setSubmitting(true);

      const formData = buildFormData();

      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      const text = await response.text();

      let result;
      try {
        result = JSON.parse(text);
      } catch {
        throw new Error(text || "Server returned invalid response.");
      }

      if (!response.ok || result?.status === false) {
        throw new Error(
          result?.msg || result?.message || "Failed to update qualifications"
        );
      }

     

    //   window.dispatchEvent(
    //     new CustomEvent("studentQualificationUpdated", {
    //       detail: form,
    //     })
    //   );

if (result?.status) {
  onUpdated?.(form);

  await Swal.fire({
    icon: "success",
    title: "Qualification Updated",
    text: "You have updated qualification successfully. Now you can continue Apply.",
    confirmButtonText: "Continue",
    confirmButtonColor: "#cb0e10",
  });

  onClose?.(); // close modal only
  return;
}
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error.name === "AbortError"
            ? "Request timed out. Please try again."
            : error.message || "Something went wrong",
        confirmButtonColor: "#cb0e10",
      });
    } finally {
      clearTimeout(timeoutId);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-primary px-5 py-4 text-white sm:px-7">
          <div className="flex items-center gap-3">
            <button type="button" onClick={onClose}>
              <ArrowLeft size={24} />
            </button>

            <h2 className="text-xl font-bold">Update Qualifications</h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 hover:bg-white/10"
          >
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="max-h-[80vh] overflow-y-auto bg-slate-50 p-5 sm:p-7"
        >
          {errors.uid && (
            <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
              {errors.uid}
            </p>
          )}

          <div className="grid gap-5 lg:grid-cols-2">
            <Fieldset title="Highest Qualification">
              <RadioGroup
                name="highest"
                value={form.highest}
                options={["plus two", "degree", "masters"]}
                labels={["Plus Two", "Degree", "Masters"]}
                onChange={updateField}
                error={errors.highest}
              />
            </Fieldset>

            <Fieldset title="Tenth Level">
              <RadioGroup
                name="tenth_syllabus"
                value={form.tenth_syllabus}
                options={["state syllabus", "CBSE"]}
                labels={["State syllabus", "CBSE"]}
                onChange={updateField}
                error={errors.tenth_syllabus}
              />

              <Input
                label="Overall %"
                value={form.tenth_overall}
                onChange={(value) => updateField("tenth_overall", value)}
                error={errors.tenth_overall}
                placeholder="Enter tenth overall percentage"
              />
            </Fieldset>

            <Fieldset title="Twelfth Level">
              <Select
                label="Stream"
                value={form.twelth_stream}
                onChange={(value) => updateField("twelth_stream", value)}
                error={errors.twelth_stream}
                options={[
                  "science",
                  "commerce",
                  "humanities",
                  "computer science",
                ]}
              />

              <Input
                label="Overall %"
                value={form.twelth_overall}
                onChange={(value) => updateField("twelth_overall", value)}
                error={errors.twelth_overall}
                placeholder="Enter twelfth overall percentage"
              />

              <Input
                label="English %"
                value={form.twelth_english}
                onChange={(value) => updateField("twelth_english", value)}
                error={errors.twelth_english}
                placeholder="Enter English percentage"
              />
            </Fieldset>

            <Fieldset title="Degree Details">
              <Input
                label="Degree Stream"
                value={form.degree_stream}
                onChange={(value) => updateField("degree_stream", value)}
                error={errors.degree_stream}
                placeholder="Example: CSE, BCom, BA English"
              />

              <Input
                label="Degree Overall %"
                value={form.degree_overall}
                onChange={(value) => updateField("degree_overall", value)}
                error={errors.degree_overall}
                placeholder="Enter degree overall percentage"
              />

              <Input
                label="Degree English %"
                value={form.degree_english}
                onChange={(value) => updateField("degree_english", value)}
                error={errors.degree_english}
                placeholder="Enter degree English percentage"
              />
            </Fieldset>

            <Fieldset title="Post Graduation Details">
              <Input
                label="PG Stream"
                value={form.pg_stream}
                onChange={(value) => updateField("pg_stream", value)}
                error={errors.pg_stream}
                placeholder="Example: MBA, MSc, MCom"
              />

              <Input
                label="PG Overall %"
                value={form.pg_overall}
                onChange={(value) => updateField("pg_overall", value)}
                error={errors.pg_overall}
                placeholder="Enter PG overall percentage"
              />

              <Input
                label="PG English %"
                value={form.pg_english}
                onChange={(value) => updateField("pg_english", value)}
                error={errors.pg_english}
                placeholder="Enter PG English percentage"
              />
            </Fieldset>

            <Fieldset title="IELTS Score">
              <Input
                label="IELTS Overall"
                value={form.ielts_overall}
                onChange={(value) => updateField("ielts_overall", value)}
                error={errors.ielts_overall}
                placeholder="Enter IELTS overall score"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label="Listening"
                  value={form.ielts_l}
                  onChange={(value) => updateField("ielts_l", value)}
                  error={errors.ielts_l}
                  placeholder="Listening"
                />

                <Input
                  label="Reading"
                  value={form.ielts_r}
                  onChange={(value) => updateField("ielts_r", value)}
                  error={errors.ielts_r}
                  placeholder="Reading"
                />

                <Input
                  label="Writing"
                  value={form.ielts_w}
                  onChange={(value) => updateField("ielts_w", value)}
                  error={errors.ielts_w}
                  placeholder="Writing"
                />

                <Input
                  label="Speaking"
                  value={form.ielts_s}
                  onChange={(value) => updateField("ielts_s", value)}
                  error={errors.ielts_s}
                  placeholder="Speaking"
                />
              </div>
            </Fieldset>
          </div>

          <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-black text-slate-700 hover:bg-slate-100 disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-secondary px-8 py-3 font-black text-white shadow-lg hover:bg-green-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function Fieldset({ title, children }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-black text-primary">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function RadioGroup({ name, value, options, labels, onChange, error }) {
  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {options.map((option, index) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 text-sm font-bold text-slate-700"
          >
            <input
              type="radio"
              name={name}
              checked={value === option}
              onChange={() => onChange(name, option)}
              className="h-5 w-5 accent-primary"
            />
            {labels?.[index] || option}
          </label>
        ))}
      </div>

      {error && <p className="mt-2 text-xs font-bold text-red-500">{error}</p>}
    </div>
  );
}

function Input({ label, value, onChange, placeholder, error }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
            : "border-slate-300 focus:border-primary focus:ring-red-100"
        }`}
      />

      {error && <p className="mt-2 text-xs font-bold text-red-500">{error}</p>}
    </label>
  );
}

function Select({ label, value, onChange, options, error }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
            : "border-slate-300 focus:border-primary focus:ring-red-100"
        }`}
      >
        <option value="">Select stream</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && <p className="mt-2 text-xs font-bold text-red-500">{error}</p>}
    </label>
  );
}

export default SDBQualificationUpdate;