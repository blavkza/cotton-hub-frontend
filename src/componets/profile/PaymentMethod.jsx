import React from 'react'
import { RiVisaLine, RiDeleteBin7Line } from "react-icons/ri";


function PaymentMethod() {

  return (
    <div className="w-full px-5 ">
      <div>
        <div className="flex items-center justify-between text-lg pb-2 mb-4">
          <h1>Payments</h1>
          <button
            type="submit"
            className="text-sm bg-black hover:bg-[red] text-white font-bold py-1 px-3 rounded-3xl transition duration-300 ease-in-out transform"
          >
            Add New
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-4 ">
          <div className="flex gap-1 w-full items-center justify-between sm:text-sm text-xs font-ligh">
            <div className="flex gap-3 items-center ">
              <div className="text-2xl pr-2">
                <RiVisaLine />
              </div>
              <p>N Vhuhwavho</p>
            </div>
            <div className="flex gap-3">
              <p className=" truncate">1234 *** ***</p>
              <p className="hidden sm:flex"> 08/2028</p>
            </div>
            <div className="flex pl-1">
              <div className="sm:text-2xl cursor-pointer">
                <RiDeleteBin7Line />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default PaymentMethod