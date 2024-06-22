import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../slice/authSlice';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = { email, password };

    try {
      const response = await fetch("https://e-commerce-backend-pr7n.onrender.com/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), 
      });

      const contentType = response.headers.get("content-type");
      if (!response.ok) {
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const errorData = await response.json();
          toast.error(`Login failed: ${errorData.message}`);
        } else {
          const errorText = await response.text();
          toast.error(`Login failed: ${errorText}`);
        }
        return;
      }

      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await response.json();
        dispatch(login(data.user)); 
        toast.success(data.message);
        navigateTo('/cart'); 
      } else {
        toast.error("Login failed: Unexpected response format");
      }
    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex justify-center items-center">
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 md:p-8 m-2">
      <h1 className="text-xl md:text-2xl font-bold text-center  ">Sign in to your account</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-2 text-lg font-medium text-black">Your email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full px-4 py-2 rounded-lg font-medium border border-gray-300 focus:outline-none focus:border-blue-500"
            placeholder="name@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2 text-lg font-medium text-black">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="•••••••"
            className="w-full px-4 py-2 rounded-lg font-medium border border-gray-300 focus:outline-none focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-start">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-black">Remember me</label>
          </div>
          <Link to="#" className="text-sm font-medium text-primary-600 hover:underline">Forgot password?</Link>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-800 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-4"
        >
          Sign in
        </button>
        <p className="text-sm font-light text-black text-center mt-4">
          Don’t have an account yet? <Link to="/signup" className="font-medium text-primary-800 hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
    <ToastContainer />
  </section>
);
};



export default Login;
