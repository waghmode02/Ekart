import React from 'react';
import { IoIosAddCircle } from "react-icons/io";
import { GrSubtractCircle } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems, selectCartTotalPrice, increaseQuantity, decreaseQuantity, deleteItem } from "../slice/cartSlice"; 
import { selectIsAuthenticated } from "../slice/authSlice";
import { Link } from 'react-router-dom'; 
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const cartItems = useSelector(selectCartItems);
  const total = useSelector(selectCartTotalPrice);

  const handleIncrement = (id) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decreaseQuantity(id)); 
  };

  if (!isAuthenticated) {
    return (
      <div className=' bg-gray-900 min-h-screen flex items-center justify-center'>
        <div className='text-center'>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl mb-4">
            Please log in to view your cart
          </h2>
          <Link to="/login" className="text-lg font-semibold text-blue-500 hover:underline">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className=' bg-gray-900 min-h-screen'>
      <ToastContainer />
      <section className='py-8 antialiased dark:bg-gray-900  md:py-16'>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl p-5 align-text-top items-center ">
          Shopping Cart
        </h2>
        <div className="lg:flex lg:justify-between lg:space-x-4 m-4">
          <div className="lg:w-2/3 space-y-4  mb-5 p-4">
            {cartItems.length === 0 && (
              <>
                <Link to="/" className="text-xl font-semibold tracking-tight dark:text-white ">
                  Continue Shopping...
                </Link>
              </>
            )}
            {cartItems.map((obj) => (
              <div key={obj.id} className="max-w-sm mx-auto lg:max-w-full border border-gray-200 rounded-xl shadow-md p-6 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-between">
                  <img src={obj.imgSrc} className="h-40 rounded-md p-4 text-white" alt={obj.title} />
                  <p className="text-gray-900 dark:text-white p-1 text-white">{obj.description}</p>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-900 dark:text-white p-2">
                    <button className='m-2 p-1 hover:bg-slate-500 hover-bounce text-white' onClick={() => handleIncrement(obj.id)}>
                      <IoIosAddCircle size={20} />
                    </button>
                    {obj.quantity}
                    <button onClick={() => handleDecrement(obj.id)} className='m-2 p-1 hover:bg-slate-500 hover-bounce text-white'>
                      <GrSubtractCircle size={20} />
                    </button>
                  </span>
                  <p className="text-gray-900 dark:text-white p-1 text-white">{obj.price} ₹</p>
                  <button className='bg-red-700 text-white px-4 py-2 rounded-md transition-colors duration-300 hover:bg-red-600' onClick={() =>{ dispatch(deleteItem(obj.id)) ,toast.success("Cart Cleared", {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                  })} }>Clear</button>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:w-1/3 space-y-4">
            <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
              <p className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <dl className="flex items-center justify-between gap-4">
                    <dt className="text-base font-normal text-gray-500 dark:text-gray-400">Original price</dt>
                    <dd className="text-base font-medium text-gray-900 dark:text-white">{ total} ₹</dd>
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
                  <dd className="text-base font-bold text-gray-900 dark:text-white">{ (total*1.18*0.90).toFixed(2)} ₹</dd>
                </dl>
                <div className="flex justify-center">
                 <Link to={"/checkout"}>
                 <button className="text-base font-bold bg-blue-800 text-white p-2 rounded-md hover:bg-blue-600 hover-bounce">
                    Proceed to Checkout
                  </button>
                 </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
