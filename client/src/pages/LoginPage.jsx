import axios from "axios";
import { useState } from "react";
import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserOtp } from "../redux/slices/authSlice";

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
    <div className="min-h-screen grid place-content-center bg-secondary max-w-7xl mx-auto">
      <div className="w-[600px] bg-white p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-center">
          Login
        </h2>

        <form onSubmit={sendOtp} className="mt-6 space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter email"
            className="w-full h-12 border px-4 rounded-lg"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-red-600 text-white rounded-lg disabled:opacity-60"
          >
            {loading ? "Sending..." : "Get OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;