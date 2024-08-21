import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoArrowBackSharp } from "react-icons/io5";
import { otpVerification } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifiedUser = useSelector((state) => state.auth.verifiedUser || {});

  const { success } = verifiedUser;
  useEffect(() => {
    if (success === true) {
      navigate("/login");
    }
  }, [success, navigate]);

  const handleVerify = async () => {
    try {
      await dispatch(otpVerification({ otp }));
    } catch (error) {
      console.error("Error during OTP verification:", error);
      if (error.response) {
        setMessage(error.response.data.message);
      } else if (error.request) {
        setMessage("No response received from the server.");
      } else {
        setMessage("Error occurred while sending the request.");
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="bg-[#e2e2eeee] flex flex-col pt-10 sm:px-6 lg:px-8 h-[100vh]">
  
      <div
        onClick={handleGoBack}
        className="flex gap-3 justify-start items-center px-6 cursor-pointer"
      >
        <IoArrowBackSharp />
        <span>Go Back</span>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="my-6 text-center text-3xl font-bold text-gray-900">
          Enter OTP
        </h2>
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 w-[90%] ml-5 shadow-xl rounded-3xl sm:px-10 mb-16">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mb-4"
          />
          <button
            onClick={handleVerify}
            className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent font-medium rounded-full text-l text-white bg-black hover:bg-gray-900"
          >
            Verify OTP
          </button>
          <p className="mt-4 text-red-600">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
