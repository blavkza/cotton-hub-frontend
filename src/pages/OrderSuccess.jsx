import React from "react";
import { useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full text-center">
        <div className="text-green-500 text-5xl flex items-center justify-center mb-4">
          <GiConfirmed />
        </div>
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">Order Successful!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your purchase. Your order has been placed successfully and is now being processed.
        </p>
        <div className="flex items-center justify-center "><button
          onClick={handleHomeRedirect}
          className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white text-lg font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300 ease-in-out"
        >
          <IoHomeOutline className="mr-2 text-2xl" />
          COTTON.HUB
        </button></div>
        
      </div>
    </div>
  );
};

export default OrderSuccess;
