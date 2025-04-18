import React, { useState, useEffect } from "react";
import { FaUserShield, FaCloudUploadAlt, FaLock } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Logo from "../assets/logo_1.png";
import { useNavigate } from "react-router-dom";

const features = [
  {
    icon: <FaUserShield size={50} className="text-white" />,
    title: "Secure Access",
    description: "Your data is safe with end-to-end encryption.",
  },
  {
    icon: <FaCloudUploadAlt size={50} className="text-white" />,
    title: "Cloud Storage",
    description: "Access your files anytime from anywhere.",
  },
  {
    icon: <FaLock size={50} className="text-white" />,
    title: "Privacy Protection",
    description: "We ensure complete privacy and security.",
  },
];

const LoginPage = () => {
  const [featureIndex, setFeatureIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setFeatureIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Side - Features Section */}
      <div className="relative w-full md:w-[40%] bg-primary text-white flex flex-col justify-center items-center p-8 md:p-10">
        <div
          key={featureIndex}
          className="text-center transition-all duration-[1500ms] ease-in-out opacity-100 transform scale-105"
        >
          <div className="flex justify-center mb-4">
            {features[featureIndex].icon}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            {features[featureIndex].title}
          </h2>
          <p className="mt-2 text-base md:text-lg max-w-[90%] mx-auto">
            {features[featureIndex].description}
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="relative w-full md:w-[60%] flex flex-col justify-center items-center p-6 sm:p-10">
        <div
          className="hidden md:block absolute top-0 left-0 h-full w-[100px] bg-primary"
          style={{ clipPath: "ellipse(100px 50% at 0% 50%)" }}
        ></div>

        {/* Logo */}
        <div className="mb-6 z-10">
          <img src={Logo} alt="Logo" className="w-20 sm:w-24" />
        </div>

        {/* Login Form */}
        <form className="w-full max-w-sm z-10">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Email
            </label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Enter email address"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-12"
              placeholder="Enter password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 text-sm gap-2 sm:gap-0">
            <label className="flex items-center space-x-2 text-gray-600">
              <input type="checkbox" className="form-checkbox" />
              <span>Remember Me</span>
            </label>
            <a href="/forgot-password" className="text-primary hover:underline">
              Forgot Password?
            </a>
          </div>

          <button className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary/80 transition-all">
            Login
          </button>
        </form>

        <button
          className="text-primary mt-4 z-10 hover:underline"
          onClick={() => navigate("/signup")}
        >
          Don’t Have an Account?
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
