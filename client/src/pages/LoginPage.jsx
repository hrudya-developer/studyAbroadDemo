import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserOtp } from "../redux/slices/authSlice";
import login_bg from "../assets/login_bg.png";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { Globe, LockKeyhole, ShieldCheck } from "lucide-react";

  const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
 
  const [loading, setLoading] = useState(false);

  const sendOtp = async (e) => {
    e.preventDefault();

    if (!email) {
      Swal.fire({
        icon: "warning",
        title: "Email required",
        text: "Please enter your email",
      });

      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("api", "overseas@Miak2023");
      formData.append("email", email);

      const res = await axios.post(
        "https://overseas.technocitysolutions.com/public/api/sendOTPforLogin",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.status === true) {
        dispatch(
          setUserOtp({
            uid: res.data.uid,
            name,
            email,
          })
        );

        await Swal.fire({
          icon: "success",
          title: "OTP Sent",
          text: "Check your email",
          timer: 1000,
          showConfirmButton: false,
        });

        navigate("/verify-otp");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res.data.msg || "Failed to send OTP",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text:
          err.response?.data?.msg ||
          err.message ||
          "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
   <div
  className="min-h-[100dvh] w-full bg-cover bg-center bg-no-repeat px-4 py-8 sm:px-6"
  style={{ backgroundImage: `url(${login_bg})` }}
>
  <div className="mx-auto flex min-h-[calc(100dvh-4rem)] w-full max-w-7xl items-center justify-center">
    <div className="w-full max-w-[430px] sm:max-w-[500px] md:max-w-[600px]">
      <div className="rounded-3xl bg-white/95 p-5 shadow-2xl backdrop-blur sm:p-8 md:p-10">
        <div className="mb-6 flex items-center justify-center">
          <span className="rounded-full bg-primary p-3 text-white shadow-sm">
            <Globe size={28} />
          </span>
        </div>

        <h2 className="text-center text-2xl font-extrabold text-darkPrimary sm:text-3xl">
          <span className="text-darkPrimary">Welcome</span> Back!
        </h2>

        <p className="mt-3 text-center text-sm text-darkPrimary">
          Sign in to continue to your account.
        </p>

        <form onSubmit={sendOtp} className="mt-7 space-y-5">
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Enter email"
              className="h-11 w-full rounded-xl border border-gray-300 bg-white pl-10 pr-4 text-sm text-black outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex h-11 w-full items-center justify-center gap-3 rounded-xl bg-darkPrimary text-sm font-bold text-white shadow-sm transition hover:bg-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            <LockKeyhole size={17} />
            {loading ? "Sending..." : "Get OTP"}
          </button>

          <p className="flex items-center justify-center gap-2 text-center text-xs font-medium text-slate-500 sm:text-sm">
            <ShieldCheck className="h-4 w-4 shrink-0 text-primary" />
            Secure Login. Your data is protected.
          </p>
        </form>

        <div className="mt-7 flex flex-col items-center justify-center gap-4 border-t border-dashed border-gray-300 pt-6 text-center sm:flex-row sm:text-left">
          <h1 className="text-sm font-bold text-black sm:text-base">
            Download our Mobile App
          </h1>

          <a
            href="https://play.google.com/store/apps/details?id=com.medcity.overseas"
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary"
          >
            Download App
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
  );
};

export default LoginPage;