import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [otpScreen, setOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!formData.email.endsWith("@gmail.com")) {
      toast.warn("Only Gmail accounts are allowed!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/users/send-otp`, {
        email: formData.email,
      });

      console.log("Send OTP Response:", response.data);
      setOtpScreen(true);
      toast.success("OTP sent to your email!");
    } catch (error) {
      console.error("Send OTP Error:", error.response?.data || error);
      toast.error(error.response?.data?.error || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Verify OTP
      const verifyResponse = await axios.post(`${apiUrl}/users/verify-otp`, {
        email: formData.email,
        otp: otp,
      });

      console.log("Verify OTP Response:", verifyResponse.data);

      if (verifyResponse.data.message === "OTP verified successfully") {
        // Step 2: Register user
        const registerResponse = await axios.post(
          `${apiUrl}/users/register`,
          formData,
        );

        console.log("Register Response:", registerResponse.data);

        toast.success("Account created successfully!");

        // Navigate after a short delay to show the success message
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.error(
        "Verification/Registration Error:",
        error.response?.data || error,
      );

      // Show specific error message
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Verification failed. Please try again.";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center flex-col p-5 py-10 lg:py-20"
      style={{
        background:
          "linear-gradient(180deg, #0c3031 0%, #0f3730 50%, #1a472d 100%)",
      }}
    >
      <div className="bg-white p-6 sm:p-8 flex flex-col items-center max-w-[500px] shadow-2xl rounded-2xl border-2 border-white/20 hover:border-[#6fd513] transition-all duration-300 w-full mt-15 backdrop-blur-sm">
        {!otpScreen ? (
          <>
            <div className="text-center mb-6">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-[#6fd513] bg-opacity-10 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="text-3xl text-[#1a472d]"
                  />
                </div>
              </div>
              <h1 className="font-bold text-3xl text-gray-800 mb-2">
                Create Your Account
              </h1>
              <p className="text-gray-600 font-medium text-center">
                Create your account to stay connected with school updates,
                admissions, and student resources.
              </p>
            </div>

            <form className="w-full space-y-5" onSubmit={handleSendOtp}>
              <div className="flex flex-col">
                <label className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
                  <i className="fa-solid fa-user text-[#6fd513] text-sm"></i>
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  placeholder="Enter your name"
                  className="border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6fd513] focus:border-[#6fd513] transition-all duration-200"
                  onChange={handleChange}
                  value={formData.username}
                  required
                />
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
                  <i className="fa-solid fa-envelope text-[#6fd513] text-sm"></i>
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6fd513] focus:border-[#6fd513] transition-all duration-200"
                  onChange={handleChange}
                  value={formData.email}
                  required
                />
                <span className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <i className="fa-solid fa-info-circle"></i>
                  Only Gmail accounts are allowed
                </span>
              </div>

              <div className="flex flex-col">
                <label className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
                  <i className="fa-solid fa-phone text-[#6fd513] text-sm"></i>
                  Phone Number
                </label>
                <input
                  name="mobile"
                  type="tel"
                  placeholder="Enter your number"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  className="border-2 border-gray-200 px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6fd513] focus:border-[#6fd513] transition-all duration-200"
                  onChange={handleChange}
                  value={formData.mobile}
                  required
                />
              </div>

              <div className="flex flex-col relative">
                <label className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
                  <i className="fa-solid fa-lock text-[#6fd513] text-sm"></i>
                  Password
                </label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="border-2 border-gray-200 px-4 py-3 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6fd513] focus:border-[#6fd513] transition-all duration-200"
                  minLength={8}
                  onChange={handleChange}
                  value={formData.password}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-10 text-gray-500 hover:text-[#6fd513] transition-colors"
                >
                  {showPassword ? (
                    <i className="fa-solid fa-eye text-lg"></i>
                  ) : (
                    <i className="fa-solid fa-eye-slash text-lg"></i>
                  )}
                </button>

                <span className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <i className="fa-solid fa-shield-halved"></i>
                  Must be at least 8 characters long
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#6fd513] cursor-pointer text-white w-full py-3 rounded-xl font-semibold hover:bg-[#53a110] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-paper-plane"></i>
                    Send OTP
                  </>
                )}
              </button>
            </form>

            <p className="text-gray-600 font-medium mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-[#6fd513] hover:text-[#53a110] font-semibold transition-colors flex items-center gap-1 inline-flex"
              >
                Log In
                <i className="fa-solid fa-arrow-right text-sm"></i>
              </Link>
            </p>
          </>
        ) : (
          <>
            <div className="text-center mb-6 w-full">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-[#6fd513] bg-opacity-10 rounded-full flex items-center justify-center">
                  <i className="fa-solid fa-shield-check text-3xl text-[#6fd513]"></i>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Verify OTP
              </h2>
              <p className="text-gray-600 font-medium">
                Enter the 6-digit code sent to
              </p>
              <p className="text-[#6fd513] font-semibold break-all">
                {formData.email}
              </p>
            </div>

            <form className="w-full space-y-4" onSubmit={handleVerifyOtp}>
              <div className="flex flex-col">
                <label className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
                  <i className="fa-solid fa-key text-[#6fd513] text-sm"></i>
                  OTP Code
                </label>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  value={otp}
                  className="border-2 border-gray-200 px-4 py-3 text-center text-2xl tracking-widest font-semibold rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6fd513] focus:border-[#6fd513] transition-all duration-200"
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="bg-[#6fd513] text-white w-full py-3 rounded-xl font-semibold hover:bg-[#53a110] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    Verifying...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-check-circle"></i>
                    Verify OTP & Register
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setOtpScreen(false);
                  setOtp("");
                }}
                disabled={loading}
                className="bg-gray-200 text-gray-700 w-full py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <i className="fa-solid fa-times"></i>
                Cancel
              </button>
            </form>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;
