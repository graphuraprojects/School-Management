import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [otpScreen, setOtpScreen] = useState(false);
  const [otp, setOtp] = useState("");

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
      alert("Only Gmail accounts are allowed!");
      return;
    }

    try {
      await axios.post(`${apiUrl}/users/send-otp`, { email: formData.email });
      setOtpScreen(true);
      alert("OTP sent to your email!");
    } catch (error) {
      console.log(error);
      alert("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
  try {
    const res = await axios.post(`${apiUrl}/users/verify-otp`, {
      email: formData.email,
      otp: otp,
    });

    if (res.data.message === "OTP verified successfully") {
      // Now register user
      await axios.post(`${apiUrl}/users/register`, formData);

      alert("Account created successfully!");
      navigate("/login");
    }
  } catch (error) {
    alert("OTP verification failed",error);
  }
};


  return (
    <div className="bg-[#f6f7f8] h-screen flex items-center justify-center flex-col p-5">
      <div className="bg-white p-3 sm:p-5 flex flex-col items-center max-w-[450px] shadow-lg rounded-lg w-full">
        {!otpScreen ? (
          <>
            <h1 className="font-extrabold text-2xl">Create Your Account</h1>
            <p className="text-gray-500 font-semibold text-center">
              Create your account to stay connected with school updates,
              admissions, and student resources.
            </p>

            <form className="w-full p-4" onSubmit={handleSendOtp}>
              <div className="flex flex-col mb-4">
                <label className="font-semibold">Username</label>
                <input
                  name="username"
                  type="text"
                  placeholder="Enter your name"
                  className="border border-gray-400 px-3 py-1.5 rounded-md shadow-sm"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="font-semibold">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="border border-gray-400 px-3 py-1.5 rounded-md shadow-sm"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col mb-4">
                <label className="font-semibold">Phone Number</label>
                <input
                  name="mobile"
                  type="tel"
                  placeholder="Enter your number"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  className="border border-gray-400 px-3 py-1.5 rounded-md shadow-sm"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex flex-col mb-4 relative">
                <label className="font-semibold">Password</label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="border border-gray-400 px-3 py-1.5 rounded-md shadow-sm"
                  minLength={8}
                  onChange={handleChange}
                  required
                />

                <span className="text-gray-400 p-1">
                  Must be at least 8 characters long.
                </span>

                {showPassword ? (
                  <i
                    className="fa-solid fa-eye absolute right-2.5 top-9 cursor-pointer"
                    onClick={() => setShowPassword(false)}
                  ></i>
                ) : (
                  <i
                    className="fa-solid fa-eye-slash absolute right-2.5 top-9 cursor-pointer"
                    onClick={() => setShowPassword(true)}
                  ></i>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white w-full p-2 rounded-lg cursor-pointer"
              >
                Send OTP
              </button>
            </form>

            <p className="text-gray-500 font-semibold">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500">
                Log In
              </Link>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold">Verify OTP</h2>
            <p className="text-gray-500">
              Enter the 6-digit code sent to {formData.email}
            </p>

            <input
              type="text"
              placeholder="Enter OTP"
              maxLength={6}
              className="border border-gray-400 px-3 py-2 mt-4 text-center rounded-md w-full"
              onChange={(e) => setOtp(e.target.value)}
            />

            <button
              onClick={handleVerifyOtp}
              className="bg-green-600 text-white w-full p-2 mt-3 rounded-lg cursor-pointer"
            >
              Verify OTP & Register
            </button>

            <button
              onClick={() => {
                setOtpScreen(false);
                setOtp("");
              }}
              className="bg-red-500 text-white w-full p-2 mt-3 rounded-lg cursor-pointer"
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Register;
