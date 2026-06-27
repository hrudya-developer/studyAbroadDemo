import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { login } from "../redux/slices/authSlice";
import login_bg from "../assets/login_bg.png";

export default function VerifyOtpPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uid = useSelector((state) => state.auth.uid);
  const email = useSelector((state) => state.auth.email);

  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const inputs = useRef([]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedValue = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 4);

    if (!pastedValue) return;

    const newOtp = ["", "", "", ""];

    pastedValue.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);

    inputs.current[Math.min(pastedValue.length, 3)]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const enteredOtp = otp.join("");

    if (!uid) {
      Swal.fire("Error", "UID missing", "error");
      return;
    }

    if (!email) {
      Swal.fire("Error", "Email missing", "error");
      return;
    }

    if (enteredOtp.length !== 4) {
      Swal.fire("Warning", "Enter 4 digit OTP", "warning");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("api", "overseas@Miak2023");
      formData.append("email", email);
      formData.append("otp", enteredOtp);
      formData.append("type", "login");
      formData.append("model", "web");
      formData.append("manufacture", "web");
      formData.append("brand", "web");
      formData.append("sdk", "web");
      formData.append("release", "web");
      formData.append("token", "web");

      const res = await axios.post(
        "https://overseas.technocitysolutions.com/public/api/VerifyOTP",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

    if (res.data.status === true) {

  dispatch(
    login({
      user: {
        uid: res.data.uid,
        email,
      },
      token: res.data.token || null,
    })
  );

  await Swal.fire({
    icon: "success",
    title: "OTP Verified",
    text: "Redirecting...",
    timer: 1000,
    showConfirmButton: false,
  });

  // EXISTING USER
  if (res.data.stage === "completed") {

    navigate("/student", {
      replace: true,
    });

  } else {

    // NEW USER
    navigate("/createAccount", {
      replace: true,
    });

  }
}else {
        Swal.fire(
          "Error",
          res.data.msg || "Invalid OTP",
          "error"
        );
      }
    } catch (err) {
      Swal.fire(
        "Server Error",
        err.response?.data?.msg ||
          err.message ||
          "Something went wrong",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-100dvh flex items-center justify-center p-4 py-20 max-w-7xl mx-auto" style={{backgroundImage:`url(${login_bg})`}}>
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="relative overflow-hidden bg-darkPrimary px-8 py-10 text-center text-white">
          <div className="absolute -left-12 -bottom-12 h-36 w-36 rounded-full bg-white/10" />
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10" />

          <div className="relative z-1">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold shadow-lg">
              OTP
            </div>

            <h2 className="text-xl sm:text-2xl font-bold">
              OTP Verification
            </h2>

            <p className="mt-2 text-sm text-white">
              Enter the 4 digit code sent to
            </p>

            <p className="mt-1 break-all font-semibold text-logoYellow">
              {email}
            </p>
          </div>
        </div>

        <div className="p-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-8 flex justify-center gap-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleChange(e.target.value, index)
                  }
                  onKeyDown={(e) =>
                    handleBackspace(e, index)
                  }
                  onPaste={handlePaste}
                  disabled={loading}
                  className="h-14 w-14 rounded-xl border-2 border-slate-200 text-center text-2xl font-bold text-[#081c47] outline-none transition focus:border-[#cb0e10] focus:ring-4 focus:ring-red-100 disabled:cursor-not-allowed disabled:bg-slate-100"
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-darkPrimary py-2 text-sm sm:text-md font-semibold text-white shadow-lg shadow-red-200 transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}