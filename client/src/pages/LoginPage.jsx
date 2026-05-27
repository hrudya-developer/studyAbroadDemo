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
    <div className="h-[calc(100vh-132px)] grid place-content-center max-w-7xl mx-auto" style={{backgroundImage:`url(${login_bg})`}}>
      <div className="w-[600px] bg-white p-8 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.5)] py-10">
        <div className="flex justify-center items-center mb-8"><span className="bg-gray-100 text-primary p-5 rounded-full shadow-sm"><Globe size={28}/></span></div>
        <h2 className="text-3xl font-extrabold text-center text-primary my-5">
         <span className="text-secondary">Welcome</span> Back !
        </h2>
        <p className="text-center text-gray-500 text-lg">Sign in to continue to your account.</p>



<form onSubmit={sendOtp} className="mt-6 space-y-6">




  {/* Email Input */}
  <div className="relative">
    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />

    <input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      type="email"
      placeholder="Enter email"
      className="w-full h-12 border border-gray-200 pl-10 pr-4 rounded-lg"
    />
  </div>

  {/* Button */}
  <button
    type="submit"
    disabled={loading}
    className="w-full h-12 bg-red-600 text-white rounded-lg disabled:opacity-60 flex gap-4 justify-center items-center shadow-sm"
  >
   <span><LockKeyhole size={17}/></span> {loading ? "Sending..." : "Get OTP"}
  </button>

  <p className="text-gray-400 text-center flex gap-3 justify-center items-center"><span><ShieldCheck /></span>Secure Login. Your data is protected.</p>

</form>
      </div>
    </div>
  );
};

export default LoginPage;