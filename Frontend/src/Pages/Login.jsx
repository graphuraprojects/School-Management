import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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
    <div className="bg-[#f6f7f8] h-screen flex items-center justify-center flex-col p-5">
      <div className="bg-white p-3 sm:p-5 flex flex-col items-center max-w-[450px] shadow-lg rounded-lg w-full">
        <h1 className="font-extrabold text-2xl">Login</h1>
        <p className="text-gray-500 font-semibold text-center mt-2">
          Welcome back! Log in to continue exploring school updates and student
          resources.
        </p>
        <form className="w-full p-4" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="font-semibold">
              Email<span>*</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter gmail"
              className="border border-gray-400 px-3 py-1.5 rounded-md shadow-sm focus:outline-blue-500"
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-4 relative">
            <label htmlFor="password" className="font-semibold">
              Password<span>*</span>
            </label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              minLength={8}
              className="border border-gray-400 px-3 py-1.5 rounded-md shadow-sm focus:outline-blue-500"
              onChange={handleChange}
              required
            />
            {showPassword ? (
              <i
                className="fa-solid fa-eye absolute right-2.5 top-10 z-10 cursor-pointer"
                onClick={() => {
                  setShowPassword(false);
                }}
              ></i>
            ) : (
              <i
                className="fa-solid fa-eye-slash absolute right-2.5 top-10 z-10 cursor-pointer"
                onClick={() => {
                  setShowPassword(true);
                }}
              ></i>
            )}
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white w-full p-2 rounded-lg cursor-pointer hover:bg-blue-900 hover:scale-105 active:bg-blue-900 hover:shadow-lg transition-transform duration-300"
          >
            Login
          </button>
        </form>
        <span className="text-gray-500 font-semibold">
          Do not have an Account?{" "}
          <Link to={"/register"} className="text-blue-500 cursor-pointer">
            Register
          </Link>
        </span>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
