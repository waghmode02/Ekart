import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { selectCartTotalPrice } from "../slice/cartSlice";
import { selectIsAuthenticated } from "../slice/authSlice";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const total = useSelector(selectCartTotalPrice);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.name.trim() === '' ||
      formData.address.trim() === '' ||
      formData.city.trim() === '' ||
      formData.state.trim() === '' ||
      formData.zip.trim() === ''
    ) {
      alert('Please fill in all the required fields.');
      return;
    }
  
    navigate('/order');
  };

  if (!isAuthenticated) {
    return (
      <div className='bg-gray-900 min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-4">
            Please log in to proceed with the checkout
          </h2>
          <Link to="/login" className="text-lg font-semibold text-blue-500 hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gray-900 min-h-screen'>
      <section className='py-8 antialiased dark:bg-gray-900 mt-20 md:py-16'>
        <div className="flex flex-col md:flex-row md:gap-8 px-4 md:px-0">
          <div className="w-full md:w-1/2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
            <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
            <div className="space-y-4">
              <div className="space-y-2">
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">{total} ₹</dd>
                </dl>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Savings</dt>
                  <dd className="text-base font-medium text-green-600">10%</dd>
                </dl>
                <dl className="flex items-center justify-between gap-4">
                  <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                  <dd className="text-base font-medium text-gray-900 dark:text-white">18%</dd>
                </dl>
              </div>
              <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                <dt className="text-base font-bold text-gray-900 dark:text-white">Total</dt>
                <dd className="text-base font-bold text-gray-900 dark:text-white">{(total * 1.18 * 0.90).toFixed(2)} ₹</dd>
              </dl>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 mt-10 md:mt-0">
            <form onSubmit={handleSubmit} className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="address">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="city">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="state">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={formData.state}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="zip">
                  Zip Code
                </label>
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  value={formData.zip}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-600"
                  onClick={ handleSubmit}
                >
                  Pay {(total * 1.18 * 0.90).toFixed(2)} ₹

                </button>
             
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
