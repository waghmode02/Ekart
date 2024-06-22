import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { totalItems } from "../slice/cartSlice.js";
import { addSearch } from "../slice/cartSlice"; 
import { login, logout, selectIsAuthenticated, selectUser } from '../slice/authSlice.js'; 
import img1 from '../assets/ekart.webp';

const Navbar = () => {
  const cartItem = useSelector(totalItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const username = useSelector(selectUser);
  const dispatch = useDispatch();

  const handleSearchChange = (event) => {
    dispatch(addSearch(event.target.value));
  };

  const handleSearch = () => {
    dispatch(addSearch(''));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className='fixed top-0 left-0 right-0 flex items-center justify-between border-b border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 h-20 px-5 z-50 '>
      <Link to={"/"}>
        <img src={img1} className='h-12 mr-5' alt="Logo" />
      </Link>
      <div className='flex items-center space-x-2 hidden md:flex'>
        <div className='flex items-center border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700'>
          <FiSearch size={24} className='dark:bg-gray-700 dark:text-gray-300 ' />
          <input 
            type='text' 
            placeholder='search' 
            className='w-40 sm:w-60 lg:w-80 p-2 bg-gray-50 dark:bg-gray-700 text-black dark:text-white focus:outline-none'
            onChange={handleSearchChange} 
          />
          <button onClick={handleSearch} className='p-2 text-sm font-semibold tracking-tight text-black dark:text-white dark:bg-gray-800 rounded-r-md dark:hover:bg-slate-600'>
            Search
          </button>
        </div>
      </div>
      <div className='flex items-center space-x-10'>
        <span className='text-xl font-semibold tracking-tight text-black dark:text-white'>
          <Link to={"/"}>Explore</Link>
        </span>
        {isAuthenticated ? (
          <>
            <span className='text-xl font-semibold tracking-tight text-black dark:text-white'>
              {username}
            </span>
            <button 
              onClick={handleLogout} 
              className='text-xl font-semibold tracking-tight text-black dark:text-white'
            >
              Logout
            </button>
          </>
        ) : (
          <span className='text-xl font-semibold tracking-tight text-black dark:text-white'>
            <Link to={"/login"}>Login</Link>
          </span>
        )}
        <Link to={"/cart"}>
          <div className='relative text-black dark:text-white flex items-center'>
            <FaShoppingCart size={35} />
            <span className='absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>
              {cartItem}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
