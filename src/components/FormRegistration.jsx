import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";

const FormRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { password, confirmPassword, ...rest } = formData;
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    setPasswordError("");

    try {
      const response = await fetch("https://e-commerce-backend-pr7n.onrender.com/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
        setTimeout(() => {
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
          })
        }, 2000);
        navigate('/login');
      } else {
        const errorData = await response.json();
        alert(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-[100vh] px-5 bg-gray-900">
      <div className="xl:max-w-3xl bg-white w-full p-5 sm:p-10 rounded-md">
        <h1 className="text-center text-xl sm:text-3xl font-semibold text-black">
          Register for a free account
        </h1>
        <div className="w-full mt-8">
          <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
            <input
              className="w-full px-5 py-3 rounded-lg font-medium p-2 border-2 border-red-300 placeholder-gray-500 text-sm"
              type="text"
              placeholder="Your full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className="w-full px-5 py-3 rounded-lg font-medium p-2 border-2 border-red-300 placeholder-gray-500 text-sm"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              className="w-full px-5 py-3 rounded-lg font-medium p-2 border-2 border-red-300 placeholder-gray-500 text-sm"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              className="w-full px-5 py-3 rounded-lg font-medium p-2 border-2 border-red-300 placeholder-gray-500 text-sm"
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
            <button
              className="mt-5 tracking-wide font-semibold bg-[#E9522C] text-gray-100 w-full py-4 rounded-lg hover:bg-[#E9522C]/90 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
              onClick={handleRegister}
            >
              <svg
                className="w-6 h-6 -ml-2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                <circle cx="8.5" cy="7" r="4" />
                <path d="M20 8v6M23 11h-6" />
              </svg>
              <span className="ml-3">Register</span>
            </button>
            <p className="mt-6 text-xs text-gray-600 text-center">
              Already have an account?{" "}
              <Link to={"/login"}>
                <span className="text-[#E9522C] font-semibold">Login</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormRegistration;
