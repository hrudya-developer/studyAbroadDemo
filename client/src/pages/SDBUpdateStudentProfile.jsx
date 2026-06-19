import { useEffect, useState } from "react";
import { X, Save } from "lucide-react";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { fetchStudentProfile } from "../redux/slices/studentSlice";

const API_KEY = "overseas@Miak2023";

export default function SDBUpdateStudentProfile({ open, onClose }) {
  const dispatch = useDispatch();

  const { uid } = useSelector((state) => state.auth);
  const { profile = {} } = useSelector((state) => state.studentData);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    code: "",
    country: "",
    address: "",
    gender: "",
    dob: "",
  });

  useEffect(() => {
    if (!open) return;

    setForm({
      name: profile?.name || profile?.student_name || "",
      mobile: profile?.mobile || profile?.phone || "",
      code: profile?.code || profile?.country_code || "+91",
      country: profile?.country || "",
      address: profile?.address || profile?.place || "",
      gender: profile?.gender || "",
      dob: profile?.dob || profile?.date_of_birth || "",
    });
  }, [open, profile]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!uid) {
      Swal.fire({
        icon: "error",
        title: "User Missing",
        text: "Please login again.",
        confirmButtonColor: "#cb0e10",
      });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("api", API_KEY);
      formData.append("uid", String(uid));
      formData.append("name", form.name.trim());
      formData.append("mobile", form.mobile.trim());
      formData.append("code", form.code.trim());
      formData.append("country", form.country.trim());
      formData.append("address", form.address.trim());
      formData.append("gender", form.gender);
      formData.append("dob", form.dob);

      const response = await fetch(
        "https://overseas.technocitysolutions.com/public/api/updateUserProfile2",
        {
          method: "POST",
          body: formData,
        }
      );

      const text = await response.text();

      let result = {};
      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        throw new Error("Invalid server response.");
      }

      if (!response.ok || result?.status === false) {
        throw new Error(
          result?.msg || result?.message || "Failed to update profile."
        );
      }

      await dispatch(fetchStudentProfile(uid));

      Swal.fire({
        icon: "success",
        title: "Updated Successfully",
        text: "Profile details updated.",
        confirmButtonColor: "#cb0e10",
      });

      onClose?.();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error?.message || "Something went wrong.",
        confirmButtonColor: "#cb0e10",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 px-4">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-2xl font-black text-slate-900">
            Update Profile
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-slate-200"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <Input label="Name" name="name" value={form.name} onChange={handleChange} />

          <Input label="Country Code" name="code" value={form.code} onChange={handleChange} />

          <Input label="Mobile" name="mobile" value={form.mobile} onChange={handleChange} />

          <Input label="Country" name="country" value={form.country} onChange={handleChange} />

          <Input label="Date of Birth" name="dob" type="date" value={form.dob} onChange={handleChange} />

          <div>
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Gender
            </label>

            <select
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-bold text-slate-700">
              Address
            </label>

            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              rows={3}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div className="flex gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={18} />
              {loading ? "Updating..." : "Update Profile"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-300 px-5 py-3 text-sm font-bold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange, type = "text" }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}