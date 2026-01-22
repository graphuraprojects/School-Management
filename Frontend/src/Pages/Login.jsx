import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${apiUrl}/users/login`, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      toast.success("Login successful");
      window.dispatchEvent(new Event("storage"));
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1500);
    } catch (error) {
      toast.error("Login failed", error);
    }
  };
  return (
    <div 
      className="flex items-center justify-center flex-col p-5 py-10 lg:py-20"
      style={{
        background: "linear-gradient(180deg, #0c3031 0%, #0f3730 50%, #1a472d 100%)"
      }}
    >
      <div className="bg-white p-6 sm:p-8 flex flex-col items-center max-w-[500px] shadow-2xl rounded-2xl border-2 border-white/20 hover:border-[#6fd513] transition-all duration-300 w-full backdrop-blur-sm lg:mt-10">
        <div className="text-center mb-6">
          <div className="mb-4 flex justify-center">
            <div className="w-16 h-16 bg-[#6fd513] bg-opacity-10 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faSignInAlt} className="text-3xl text-[#1a472d]" />
            </div>
          </div>
          <h1 className="font-bold text-3xl text-gray-800 mb-2">Welcome Back</h1>
          <p className="text-gray-600 font-medium text-center">
            Log in to continue exploring school updates and student resources.
          </p>
        </div>

        <form className="w-full space-y-5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="email" className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
              <i className="fa-solid fa-envelope text-[#6fd513] text-sm"></i>
              Email
            </label>
            <input
              type="email"
              name="email"
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

          <div className="flex flex-col relative">
            <label htmlFor="password" className="font-semibold mb-2 text-gray-700 flex items-center gap-2">
              <i className="fa-solid fa-lock text-[#6fd513] text-sm"></i>
              Password
            </label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              minLength={8}
              className="border-2 border-gray-200 px-4 py-3 pr-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6fd513] focus:border-[#6fd513] transition-all duration-200"
              onChange={handleChange}
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
            className="bg-[#6fd513] text-white w-full py-3 rounded-xl font-semibold hover:bg-[#53a110] transition-all duration-300 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 mt-6 cursor-pointer"
          >
            <i className="fa-solid fa-sign-in-alt"></i>
            Login
          </button>
        </form>

        <p className="text-gray-600 font-medium mt-6">
          Do not have an Account?{" "}
          <Link to="/register" className="text-[#6fd513] hover:text-[#53a110] font-semibold transition-colors flex items-center gap-1 inline-flex">
            Register
            <i className="fa-solid fa-arrow-right text-sm"></i>
          </Link>
        </p>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
