import React from 'react';

const Order = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-10 text-center animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-green-500 dark:text-green-400 animate-bounce">
          Yay! It's ordered 😃
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-2 animate-fadeIn">
          You will receive an invoice for your order shortly.
        </p>
        <p className="text-gray-700 dark:text-gray-300 animate-fadeIn">
          Your order will arrive in 7 business days.
        </p>
      </div>
    </div>
  );
};

export default Order;
