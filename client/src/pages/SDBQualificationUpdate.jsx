import React, { useEffect, useState } from "react";
import { X, ArrowLeft } from "lucide-react";
<<<<<<< HEAD
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

import {
  updateStudentQualifications,
  fetchStudentProfile,
} from "../redux/slices/studentSlice";
=======
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

const API_KEY = "overseas@Miak2023";
const API_URL =
  "https://overseas.technocitysolutions.com/public/api/updateQualifications";
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e

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
<<<<<<< HEAD
  const dispatch = useDispatch();
=======
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
  const { uid, user } = useSelector((state) => state.auth);

  const loggedUid =
    uid || user?.uid || user?.id || user?.student_id || user?.userid || "";

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

<<<<<<< HEAD
  const showTenth = ["plus two", "degree", "masters"].includes(form.highest);
  const showTwelfth = ["plus two", "degree", "masters"].includes(form.highest);
  const showDegree = ["degree", "masters"].includes(form.highest);
  const showPG = form.highest === "masters";
  const showIELTS = Boolean(form.highest);

=======
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
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
<<<<<<< HEAD
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

=======
    setForm((prev) => ({ ...prev, [name]: value }));
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
<<<<<<< HEAD
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
=======

    Object.entries(form).forEach(([key, value]) => {
      if (!String(value || "").trim()) {
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
        nextErrors[key] = "This field is required";
      }
    });

    if (!loggedUid) {
      nextErrors.uid = "User ID missing. Please login again.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

<<<<<<< HEAD
=======
  const buildFormData = () => {
    const formData = new FormData();

    formData.append("api", API_KEY);
    formData.append("uid", String(loggedUid));

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, String(value || "").trim());
    });

    return formData;
  };

>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      Swal.fire({
        icon: "warning",
<<<<<<< HEAD
        title: "Please fill required fields",
        text: "Please fill the visible qualification fields.",
=======
        title: "Please fill all fields",
        text: "Every qualification field is required.",
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
        confirmButtonColor: "#cb0e10",
      });
      return;
    }

<<<<<<< HEAD
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
        confirmButtonColor: "#cb0e10",
      });

      onClose?.();
=======
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
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
<<<<<<< HEAD
          typeof error === "string"
            ? error
            : error?.message || "Something went wrong",
        confirmButtonColor: "#cb0e10",
      });
    } finally {
=======
          error.name === "AbortError"
            ? "Request timed out. Please try again."
            : error.message || "Something went wrong",
        confirmButtonColor: "#cb0e10",
      });
    } finally {
      clearTimeout(timeoutId);
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
      setSubmitting(false);
    }
  };

  return (
<<<<<<< HEAD
    <div className="fixed inset-0 z-[9999] bg-[#061c2a]">
      <div className="flex h-full flex-col">
        <div className="flex items-center gap-5 bg-primary px-5 py-4 text-white">
          <button type="button" onClick={onClose}>
            <ArrowLeft size={28} />
          </button>

          <h2 className="text-2xl font-bold">Update qualifications</h2>
=======
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between bg-primary px-5 py-4 text-white sm:px-7">
          <div className="flex items-center gap-3">
            <button type="button" onClick={onClose}>
              <ArrowLeft size={24} />
            </button>

            <h2 className="text-xl font-bold">Update Qualifications</h2>
          </div>
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e

          <button
            type="button"
            onClick={onClose}
<<<<<<< HEAD
            className="ml-auto rounded-full p-2 hover:bg-white/10"
=======
            className="rounded-full p-2 hover:bg-white/10"
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
          >
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
<<<<<<< HEAD
          className="flex-1 overflow-y-auto px-4 py-7"
        >
          <div className="mx-auto max-w-4xl rounded-xl bg-black p-5 text-white sm:p-7">
            {errors.uid && (
              <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
                {errors.uid}
              </p>
            )}

            <div className="space-y-7">
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
                </Fieldset>
              )}

              {showIELTS && (
                <>
                  <Input
                    label="IELTS overall score"
                    value={form.ielts_overall}
                    onChange={(value) => updateField("ielts_overall", value)}
                    error={errors.ielts_overall}
                  />

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Input
                      label="IELTS Listening score"
                      value={form.ielts_l}
                      onChange={(value) => updateField("ielts_l", value)}
                      error={errors.ielts_l}
                    />

                    <Input
                      label="IELTS Reading score"
                      value={form.ielts_r}
                      onChange={(value) => updateField("ielts_r", value)}
                      error={errors.ielts_r}
                    />

                    <Input
                      label="IELTS Writing score"
                      value={form.ielts_w}
                      onChange={(value) => updateField("ielts_w", value)}
                      error={errors.ielts_w}
                    />

                    <Input
                      label="IELTS Speaking score"
                      value={form.ielts_s}
                      onChange={(value) => updateField("ielts_s", value)}
                      error={errors.ielts_s}
                    />
                  </div>
                </>
              )}

              <div className="flex justify-center pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-xl bg-green-400 px-10 py-3 text-lg font-black text-black hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "UPDATING..." : "UPDATE"}
                </button>
              </div>
            </div>
=======
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
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
          </div>
        </form>
      </div>
    </div>
  );
};

function Fieldset({ title, children }) {
  return (
<<<<<<< HEAD
    <fieldset className="rounded-2xl border border-slate-400 px-5 pb-5 pt-4">
      <legend className="px-3 text-lg font-black text-primary">{title}</legend>
      <div className="space-y-5">{children}</div>
    </fieldset>
=======
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="mb-4 text-lg font-black text-primary">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
  );
}

function RadioGroup({ name, value, options, labels, onChange, error }) {
  return (
    <div>
<<<<<<< HEAD
      <div className="flex flex-wrap gap-5">
        {options.map((option, index) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 text-lg font-bold text-white"
=======
      <div className="flex flex-wrap gap-4">
        {options.map((option, index) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-2 text-sm font-bold text-slate-700"
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
          >
            <input
              type="radio"
              name={name}
              checked={value === option}
              onChange={() => onChange(name, option)}
<<<<<<< HEAD
              className="h-6 w-6 accent-primary"
=======
              className="h-5 w-5 accent-primary"
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
            />
            {labels?.[index] || option}
          </label>
        ))}
      </div>

<<<<<<< HEAD
      {error && <p className="mt-2 text-xs font-bold text-red-400">{error}</p>}
=======
      {error && <p className="mt-2 text-xs font-bold text-red-500">{error}</p>}
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
    </div>
  );
}

<<<<<<< HEAD
function Input({ label, value, onChange, error }) {
  return (
    <label className="block">
      <span className="mb-2 block text-lg font-bold text-white">{label} :</span>
=======
function Input({ label, value, onChange, placeholder, error }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </span>
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
<<<<<<< HEAD
        className={`w-full rounded-2xl border bg-black px-4 py-3 text-white outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:ring-red-500"
            : "border-slate-400 focus:ring-primary"
        }`}
      />

      {error && <p className="mt-2 text-xs font-bold text-red-400">{error}</p>}
=======
        placeholder={placeholder}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
            : "border-slate-300 focus:border-primary focus:ring-red-100"
        }`}
      />

      {error && <p className="mt-2 text-xs font-bold text-red-500">{error}</p>}
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
    </label>
  );
}

function Select({ label, value, onChange, options, error }) {
  return (
    <label className="block">
<<<<<<< HEAD
      <span className="mb-2 block text-lg font-bold text-white">{label} :</span>
=======
      <span className="mb-2 block text-sm font-black text-slate-700">
        {label}
      </span>
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
<<<<<<< HEAD
        className={`w-full rounded-2xl border bg-black px-4 py-3 text-white outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:ring-red-500"
            : "border-slate-400 focus:ring-primary"
=======
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm font-semibold outline-none focus:ring-2 ${
          error
            ? "border-red-400 focus:border-red-500 focus:ring-red-100"
            : "border-slate-300 focus:border-primary focus:ring-red-100"
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
        }`}
      >
        <option value="">Select stream</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

<<<<<<< HEAD
      {error && <p className="mt-2 text-xs font-bold text-red-400">{error}</p>}
=======
      {error && <p className="mt-2 text-xs font-bold text-red-500">{error}</p>}
>>>>>>> c96e84eba6b33b7f18f3a15db5029d90e32e553e
    </label>
  );
}

export default SDBQualificationUpdate;