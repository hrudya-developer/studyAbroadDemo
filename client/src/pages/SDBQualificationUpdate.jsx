import React, { useEffect, useState } from "react";
import { X, ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";


import {
  updateStudentQualifications,
  fetchStudentProfile,
} from "../redux/slices/studentSlice";

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
  const dispatch = useDispatch();
  const { uid, user } = useSelector((state) => state.auth);

  const loggedUid =
    uid || user?.uid || user?.id || user?.student_id || user?.userid || "";

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const showTenth = ["plus two", "degree", "masters"].includes(form.highest);
  const showTwelfth = ["plus two", "degree", "masters"].includes(form.highest);
  const showDegree = ["degree", "masters"].includes(form.highest);
  const showPG = form.highest === "masters";
  const showIELTS = Boolean(form.highest);

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
    setForm((prev) => {
      const next = { ...prev, [name]: value };

      if (name === "highest") {
        if (value === "plus two") {
          next.degree_stream = "";
          next.degree_overall = "";
          next.degree_english = "";
          next.pg_stream = "";
          next.pg_overall = "";
          next.pg_english = "";
        }

        if (value === "degree") {
          next.pg_stream = "";
          next.pg_overall = "";
          next.pg_english = "";
        }
      }

      return next;
    });

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    const requiredFields = ["highest"];

    if (showTenth) {
      requiredFields.push("tenth_syllabus", "tenth_overall");
    }

    if (showTwelfth) {
      requiredFields.push(
        "twelth_stream",
        "twelth_overall",
        "twelth_english"
      );
    }

    if (showDegree) {
      requiredFields.push(
        "degree_stream",
        "degree_overall",
        "degree_english"
      );
    }

    if (showPG) {
      requiredFields.push("pg_stream", "pg_overall", "pg_english");
    }

    if (showIELTS) {
      requiredFields.push(
        "ielts_overall",
        "ielts_l",
        "ielts_r",
        "ielts_w",
        "ielts_s"
      );
    }

    requiredFields.forEach((key) => {
      if (!String(form[key] || "").trim()) {
        nextErrors[key] = "This field is required";
      }
    });

    if (!loggedUid) {
      nextErrors.uid = "User ID missing. Please login again.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      Swal.fire({
        icon: "warning",
        title: "Please fill required fields",
        text: "Please fill the visible qualification fields.",
        confirmButtonColor: "#c01f53",
      });
      return;
    }

    try {
      setSubmitting(true);

      await dispatch(
        updateStudentQualifications({
          uid: loggedUid,
          form,
        })
      ).unwrap();

      await dispatch(fetchStudentProfile(loggedUid)).unwrap();

      onUpdated?.(form);

      await Swal.fire({
        icon: "success",
        title: "Qualification Updated",
        text: "You have updated qualification successfully.",
        confirmButtonText: "Continue",
        confirmButtonColor: "#c01f53",
      });

      onClose?.();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          typeof error === "string"
            ? error
            : error?.message || "Something went wrong",
        confirmButtonColor: "#cb0e10",
      });
    } finally {
      setSubmitting(false);
    }
  };

 return (
  <div className="fixed inset-0 z-[9999] bg-black/80">
    <div className="flex flex-col max-w-4xl mx-auto my-10 rounded-3xl max-h-[500px] overflow-y-auto">
      <div className="flex items-center gap-4 bg-gray-50 px-4 py-3 shadow-lg border-b border-slate-100">
        <button
          type="button"
          onClick={onClose}
          className="grid size-8 place-content-center rounded-full bg-slate-100 text-darkPrimary hover:bg-primary hover:text-white"
        >
          <ArrowLeft size={22} />
        </button>

        <div className="">
          <h2 className="text-sm sm:text-md font-bold text-black">
            Update Qualifications
          </h2>
          <p className="text-xs text-slate-500 hidden sm:block">
            Complete your education details to apply for courses.
          </p>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="ml-auto grid size-6 sm:size-8 place-content-center rounded-full bg-primary text-white hover:cursor-pointer hover:bg-darkPrimary hover:text-white"
        >
          <X size={14} sm:size={18} />
        </button>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex-1 overflow-y-auto bg-gradient-to-br from-pink-50 via-white to-blue-50 px-4 py-6"
      >
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl">
          <div className="bg-white px-6 py-1 text-white">
           
            
          </div>

          <div className="space-y-6 p-5 sm:p-7">
            {errors.uid && (
              <p className="rounded-xl bg-secondary px-4 py-3 text-sm font-bold text-secondary">
                {errors.uid}
              </p>
            )}

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

            {showTenth && (
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
                />
              </Fieldset>
            )}

            {showTwelfth && (
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

                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Overall %"
                    value={form.twelth_overall}
                    onChange={(value) => updateField("twelth_overall", value)}
                    error={errors.twelth_overall}
                  />

                  <Input
                    label="English %"
                    value={form.twelth_english}
                    onChange={(value) => updateField("twelth_english", value)}
                    error={errors.twelth_english}
                  />
                </div>
              </Fieldset>
            )}

            {showDegree && (
              <Fieldset title="Degree Level">
                <Input
                  label="Subject"
                  value={form.degree_stream}
                  onChange={(value) => updateField("degree_stream", value)}
                  error={errors.degree_stream}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Overall %"
                    value={form.degree_overall}
                    onChange={(value) => updateField("degree_overall", value)}
                    error={errors.degree_overall}
                  />

                  <Input
                    label="English %"
                    value={form.degree_english}
                    onChange={(value) => updateField("degree_english", value)}
                    error={errors.degree_english}
                  />
                </div>
              </Fieldset>
            )}

            {showPG && (
              <Fieldset title="Masters Level">
                <Input
                  label="Stream"
                  value={form.pg_stream}
                  onChange={(value) => updateField("pg_stream", value)}
                  error={errors.pg_stream}
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    label="Overall %"
                    value={form.pg_overall}
                    onChange={(value) => updateField("pg_overall", value)}
                    error={errors.pg_overall}
                  />

                  <Input
                    label="English %"
                    value={form.pg_english}
                    onChange={(value) => updateField("pg_english", value)}
                    error={errors.pg_english}
                  />
                </div>
              </Fieldset>
            )}

            {showIELTS && (
              <Fieldset title="IELTS Score">
                <Input
                  label="Overall Score"
                  value={form.ielts_overall}
                  onChange={(value) => updateField("ielts_overall", value)}
                  error={errors.ielts_overall}
                />

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  <Input label="Listening" value={form.ielts_l} onChange={(v) => updateField("ielts_l", v)} error={errors.ielts_l} />
                  <Input label="Reading" value={form.ielts_r} onChange={(v) => updateField("ielts_r", v)} error={errors.ielts_r} />
                  <Input label="Writing" value={form.ielts_w} onChange={(v) => updateField("ielts_w", v)} error={errors.ielts_w} />
                  <Input label="Speaking" value={form.ielts_s} onChange={(v) => updateField("ielts_s", v)} error={errors.ielts_s} />
                </div>
              </Fieldset>
            )}
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 border-t border-t-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
          

            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-darkPrimary px-8 py-3 text-sm font-bold text-white shadow-lg shadow-pink-200 hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Updating..." : "Update Qualification"}
            </button>
              <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-slate-200 px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
);
};

function Fieldset({ title, children }) {
  return (
    <fieldset className="rounded-2xl border border-slate-400 px-5 pb-5 pt-4">
      <legend className="px-3 text-sm font-bold text-primary">{title}</legend>
      <div className="space-y-5">{children}</div>
    </fieldset>
  );
}

function RadioGroup({ name, value, options, labels, onChange, error }) {
  return (
    <div>
      <div className="flex flex-wrap gap-5">
        {options.map((option, index) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 text-sm font-bold text-black"
          >
            <input
              type="radio"
              name={name}
              checked={value === option}
              onChange={() => onChange(name, option)}
              className="h-4 w-4 accent-primary"
            />
            {labels?.[index] || option}
          </label>
        ))}
      </div>

      {error && <p className="mt-2 text-xs font-bold text-red-400">{error}</p>}
    </div>
  );
}

function Input({ label, value, onChange, error }) {
  return (
    <label className="block">
      <span className="mb-2 block text-md font-bold text-black">{label} :</span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-2xl border bg-white px-4 py-2 text-black outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:ring-red-500"
            : "border-slate-400 focus:ring-primary"
        }`}
      />

      {error && <p className="mt-2 text-xs font-bold text-red-400">{error}</p>}
    </label>
  );
}

function Select({ label, value, onChange, options, error }) {
  return (
    <label className="block">
      <span className="mb-2 block text-md font-bold text-black">{label} :</span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-2xl border bg-white px-4 py-2 text-black outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:ring-red-500"
            : "border-slate-400 focus:ring-primary"
        }`}
      >
        <option value="">Select stream</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      {error && <p className="mt-2 text-xs font-bold text-red-400">{error}</p>}
    </label>
  );
}

export default SDBQualificationUpdate;