import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f6f7f8] flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-3xl p-8 max-w-lg w-full text-center shadow-[0_8px_40px_rgba(0,0,0,0.08)] border border-[#e8f0e0] mt-20">

        {/* Icon */}
        <div className="w-16 h-16 bg-[#f3fde8] border border-[#d8f0b8] rounded-2xl flex items-center justify-center mx-auto mb-7">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#6fd513" strokeWidth="1.5" />
            <path d="M12 8v5" stroke="#1a472d" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="0.8" fill="#1a472d" />
          </svg>
        </div>

        {/* 404 */}
        <h1
          className="text-[130px] font-bold leading-none tracking-tight mb-1"
          style={{
            background: "linear-gradient(135deg, #1a472d, #6fd513)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </h1>

        <div className="w-12 h-[3px] bg-[#6fd513] rounded-full mx-auto" />

        <h2 className="text-2xl font-bold text-[#1a2a1a] mb-3">
          Page Not Found
        </h2>

        <p className="text-[#6b7c6b] text-sm leading-relaxed mb-9 font-light max-w-xs mx-auto">
          Oops! The page you're looking for doesn't exist or may have been moved.
          Let's get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex gap-3 justify-center flex-wrap mb-8">
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2.5 rounded-xl border-[1.5px] border-[#d0e8c0] text-[#1a472d] text-sm font-medium bg-transparent hover:border-[#6fd513] hover:bg-[#f3fde8] transition-all duration-200 cursor-pointer"
          >
            ← Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2.5 rounded-xl text-white text-sm font-medium bg-[#6fd513] shadow-[0_4px_14px_rgba(26,71,45,0.25)] hover:bg-[#53a110] transition-all duration-200 cursor-pointer"
          >
            Go to Home
          </button>
        </div>


      </div>
    </div>
  );
};

export default NotFound;