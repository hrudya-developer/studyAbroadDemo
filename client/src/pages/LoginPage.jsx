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
    <div className="h-100dvh grid place-content-center max-w-7xl mx-auto" style={{backgroundImage:`url(${login_bg})`}}>

      <div className="grid md:grid-cols-1 p-5 rounded-3xl w-auto md:w-[600px]">

       


      <div className="p-6 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.5)] py-10 bg-black/15">
        <div className="flex justify-center items-center mb-8"><span className="bg-primary text-white p-3 rounded-full shadow-sm"><Globe size={28}/></span></div>
        <h2 className="text-3xl font-extrabold text-center text-white my-5">
         <span className="text-white">Welcome</span> Back !
        </h2>
        <p className="text-center text-white text-md">Sign in to continue to your account.</p>



<form onSubmit={sendOtp} className="mt-6 space-y-6">




  {/* Email Input */}
  <div className="relative">
    <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" />

    <input
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      type="email"
      placeholder="Enter email"
      className="w-full h-10 border border-gray-200 text-white pl-10 pr-4 rounded-lg"
    />
  </div>

  {/* Button */}
  <button
    type="submit"
    disabled={loading}
    className="w-full h-10 bg-primary text-white rounded-lg disabled:opacity-60 flex gap-4 justify-center items-center shadow-sm hover:cursor-pointer hover:bg-white hover:text-primary"
  >
   <span><LockKeyhole size={17}/></span> {loading ? "Sending..." : "Get OTP"}
  </button>

  <p className="text-white text-center flex gap-3 justify-center items-center mb-5 text-sm"><span><ShieldCheck /></span>Secure Login. Your data is protected.</p>

</form>

<div className="border-t border-t-dashed border-t-gray-600 pt-5 flex justify-center gap-4 flex-col md:flex-row items-center">
 <h1 className="text-md font-bold text-logoYellow">Download our Mobile App</h1>
 <button className="bg-white text-secondary text-sm font-semibold p-2 px-3 hover:cursor-pointer rounded-xl hover:bg-primary hover:text-white">
  <a href="https://play.google.com/store/apps/details?id=com.medcity.overseas" target="_blank" className="w-full h-full">Download App</a></button>
  </div>
      </div>

   
</div>




    </div>
  );
};

export default LoginPage;