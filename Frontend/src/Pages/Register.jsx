import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShield, faUserPlus } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminSecret, setShowAdminSecret] = useState(false);
  const navigate = useNavigate();
  const [otpScreen, setOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    role: "user",
    admin_secret: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole, admin_secret: "" });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!formData.email.endsWith("@gmail.com")) {
      toast.warn("Only Gmail accounts are allowed!");
      return;
    }

    try {
      await axios.post(`/api/users/send-otp`, { email: formData.email });
      setOtpScreen(true);
      toast.success("OTP sent to your email!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`/api/users/verify-otp`, {
        email: formData.email,
        otp: otp,
      });

      if (res.data.message === "OTP verified successfully") {
        const registerRes = await axios.post(`/api/users/register`, formData);
        console.log("Register response:", registerRes.data);

        toast.success("Account created successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch (error) {
      console.error("Error response:", error.response?.data);
      toast.error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "OTP verification failed, phone number or email may already be registered",
      );
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
              {/* ── ROLE SELECTOR ── */}
              <div className="flex flex-col">
                <label className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
                  <i className="fa-solid fa-user-tag text-[#6fd513] text-sm"></i>
                  Register As
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => handleRoleChange("user")}
                    className={`flex-1 py-3 rounded-xl font-semibold border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                      formData.role === "user"
                        ? "bg-[#6fd513] text-white border-[#6fd513]"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#6fd513]"
                    }`}
                  >
                    <i className="fa-solid fa-user text-sm"></i>
                    User
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange("admin")}
                    className={`flex-1 py-3 rounded-xl font-semibold border-2 transition-all duration-200 flex items-center justify-center gap-2 ${
                      formData.role === "admin"
                        ? "bg-[#1a472d] text-white border-[#1a472d]"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#1a472d]"
                    }`}
                  >
                    <i className="fa-solid fa-user-shield text-sm"></i>
                    Admin
                  </button>
                </div>
              </div>

              {/* Username */}
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
                  required
                />
              </div>

              {/* Email */}
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
                  required
                />
                <span className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                  <i className="fa-solid fa-info-circle"></i>
                  Only Gmail accounts are allowed
                </span>
              </div>

              {/* Phone */}
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
                  required
                />
              </div>

              {/* Password */}
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
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-11 text-gray-500 hover:text-[#6fd513] transition-colors"
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

              {/* ── ADMIN SECRET (only when admin role selected) ── */}
              {formData.role === "admin" && (
                <div className="flex flex-col relative">
                  <label className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
                    <i className="fa-solid fa-key text-[#1a472d] text-sm"></i>
                    Admin Secret Key
                  </label>
                  <input
                    name="admin_secret"
                    type={showAdminSecret ? "text" : "password"}
                    placeholder="Enter admin secret key"
                    className="border-2 border-[#1a472d] px-4 py-3 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1a472d] focus:border-[#1a472d] transition-all duration-200 bg-green-50"
                    onChange={handleChange}
                    value={formData.admin_secret}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminSecret(!showAdminSecret)}
                    className="absolute right-3 top-11 text-gray-500 hover:text-[#1a472d] transition-colors"
                  >
                    {showAdminSecret ? (
                      <i className="fa-solid fa-eye text-lg"></i>
                    ) : (
                      <i className="fa-solid fa-eye-slash text-lg"></i>
                    )}
                  </button>
                  <span className="text-xs text-amber-600 mt-1 flex items-center gap-1">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    Required to register as an administrator
                  </span>
                </div>
              )}

              <button
                type="submit"
                className="bg-[#6fd513] cursor-pointer text-white w-full py-3 rounded-xl font-semibold hover:bg-[#53a110] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 mt-6"
              >
                <i className="fa-solid fa-paper-plane"></i>
                Send OTP
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
            {/* OTP Screen — unchanged */}
            <div className="text-center mb-6 w-full">
              <div className="mb-4 flex justify-center">
                <div className="w-16 h-16 bg-[#6fd513] bg-opacity-10 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faShield}
                    className="text-3xl text-[#1a472d]"
                  />
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

            <div className="w-full space-y-4">
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
                />
              </div>

              <button
                type="button"
                onClick={handleVerifyOtp}
                className="bg-[#6fd513] text-white w-full py-3 rounded-xl font-semibold hover:bg-[#53a110] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-check-circle"></i>
                Verify OTP & Register
              </button>

              <button
                onClick={() => {
                  setOtpScreen(false);
                  setOtp("");
                }}
                className="bg-gray-200 text-gray-700 w-full py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-times"></i>
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;

