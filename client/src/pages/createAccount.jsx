import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRight, CalendarDays, Home, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { userRegister } from "../redux/slices/authSlice";
import login_bg from "../assets/login_bg.png";

export default function CreateAccount() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uid = useSelector((state) => state.auth.uid);
  const email = useSelector((state) => state.auth.email);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const [countryCode, setCountryCode] = useState("in");
  const [dialCode, setDialCode] = useState("91");

  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("Female");
  const [dob, setDob] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || name.trim().length < 3) {
      return Swal.fire("Invalid Name", "Enter valid full name", "warning");
    }

    if (!phone || phone.replace(/\D/g, "").length < 4) {
      return Swal.fire("Invalid Phone", "Enter valid phone number", "warning");
    }

    if (!dob) {
      return Swal.fire("DOB Required", "Please select date of birth", "warning");
    }

    const today = new Date();
    const selectedDob = new Date(dob);

    let age = today.getFullYear() - selectedDob.getFullYear();
    const m = today.getMonth() - selectedDob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < selectedDob.getDate())) age--;

    if (age < 16) {
      return Swal.fire("Age Restriction", "Must be 16+ years old", "warning");
    }

    if (!address.trim() || address.trim().length < 10) {
      return Swal.fire("Invalid Address", "Enter full address", "warning");
    }

    if (!acceptedTerms) {
      return Swal.fire("Accept Terms", "Please accept terms", "warning");
    }

    if (!uid) {
      return Swal.fire("Session Expired", "Please login again", "error");
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("api", "overseas@Miak2023");
      formData.append("name", name.trim());
      formData.append("mobile", phone); // ✅ ONLY THIS
      formData.append("country", countryCode);
      formData.append("code", dialCode);
      formData.append("address", address.trim());
      formData.append("gender", gender);
      formData.append("uid", uid);
      formData.append("dob", dob);

      const res = await axios.post(
        "https://overseas.technocitysolutions.com/public/api/setUserProfile",
        formData
      );



      if (res.data.status) {
    dispatch(
   userRegister({
    uid,
    name: name.trim(),
    mobile: phone,
    country: countryCode,
    code: dialCode,
    address: address.trim(),
    gender,
    dob,
    email, // ✅ keep existing email
    token: null,
  })
);

       Swal.fire({
  icon: "success",
  title: "Success",
  text: "Account Created",
  confirmButtonColor: "#c01f53", // Your primary color
});
        navigate("/student");
      } else {
        Swal.fire("Failed", res.data.msg || "Error", "error");
      }
    } catch (err) {
      Swal.fire("Server Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-6" style={{ backgroundImage: `url(${login_bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div className="w-full max-w-3xl bg-white/85 p-8 rounded-3xl shadow-xl my-10">

        <h2 className="text-3xl font-bold text-center mb-8 text-darkPrimary">
          Create <span className="text-darkPrimary">Account</span>
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2">

          {/* NAME */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold">Full Name</label>
            <div className="flex items-center border rounded-xl p-3 mt-1">
              <User size={18} />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full ml-2 outline-none"
              />
            </div>
          </div>

          {/* DOB */}
          <div>
            <label className="text-sm font-semibold">Date of Birth</label>
            <div className="flex items-center border rounded-xl p-3 mt-1">
              <CalendarDays size={18} />
              <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="ps-3 w-full outline-none"/>
            </div>
          </div>

          {/* PHONE */}
        <div>
  <label className="text-sm font-semibold">
    Contact Number
  </label>

  <div className="mt-1 w-full rounded-xl bg-white border px-3 py-2">
    <PhoneInput
      defaultCountry="in"
      value={phone}
      onChange={(value, meta) => {
        setPhone(value);
        setCountryCode(meta?.country?.iso2 || "in");
        // setDialCode(meta?.country?.dialCode || "91");
        setDialCode(meta?.country?.dialCode);
      }}
      className="w-full border-0"
      inputClassName="!w-full !border-0 !bg-transparent !shadow-none !outline-none"
      countrySelectorStyleProps={{
        buttonClassName:
          "!border-0 !bg-transparent",
      }}
    />
  </div>
</div>

          {/* GENDER */}
          <div className="md:col-span-2 flex gap-3">
            {["Male", "Female", "Other"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`flex-1 p-3 rounded-xl border hover:cursor-pointer ${
                  gender === g ? "bg-primary text-white" : ""
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* ADDRESS */}
          <div className="md:col-span-2">
            <label className="text-sm font-semibold">Address</label>
            <div className="flex border rounded-xl p-3 mt-1">
              <Home size={18} />
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3} className="w-full outline-none border-0 ps-3"
              />
            </div>
          </div>

          {/* TERMS */}
          <div className="md:col-span-2 flex items-center gap-2">
         <label className="md:col-span-2 flex cursor-pointer items-center gap-2 select-none">
  <input
    type="checkbox"
    checked={acceptedTerms}
    onChange={(e) => setAcceptedTerms(e.target.checked)}
    className="h-4 w-4 accent-primary"
  />

  <span className="text-sm">
    I Accept Terms & Conditions
    
  </span>
</label>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 bg-darkPrimary text-white p-4 rounded-xl font-bold hover:cursor-pointer hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Creating..." : "Continue"}
          </button>

        </form>
      </div>
    </main>
  );
}